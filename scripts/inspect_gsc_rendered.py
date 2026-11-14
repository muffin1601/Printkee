"""Compare server HTML with Chrome-rendered DOM for the 19 GSC sitemap URLs."""
import csv
import subprocess
import sys
import tempfile
from collections import Counter
from html.parser import HTMLParser
from urllib.parse import urljoin, urlsplit

import requests
from audit_gsc_coverage import PageParser


LOCAL = "http://localhost:3005"
CHROME = r"C:\Program Files\Google\Chrome\Application\chrome.exe"


class VisibleText(HTMLParser):
    def __init__(self):
        super().__init__()
        self.skip = 0
        self.parts = []

    def handle_starttag(self, tag, attrs):
        if tag in ("script", "style", "noscript", "svg"):
            self.skip += 1

    def handle_endtag(self, tag):
        if tag in ("script", "style", "noscript", "svg"):
            self.skip = max(0, self.skip - 1)

    def handle_data(self, data):
        if self.skip == 0 and data.strip():
            self.parts.append(data.strip())


def parse(html):
    page = PageParser()
    page.feed(html)
    visible = VisibleText()
    visible.feed(html)
    return page, " ".join(visible.parts)


def main():
    with open(sys.argv[1], encoding="utf-8-sig", newline="") as source:
        audit = list(csv.DictReader(source))
    urls = [row["URL"] for row in audit if row["Sitemap Inclusion"] == "Yes"]
    parent_paths = {"/", "/sitemap", "/brands", "/blogs"}
    for url in urls:
        path = urlsplit(url).path
        segments = path.strip("/").split("/")
        if len(segments) >= 2:
            parent_paths.add("/" + "/".join(segments[:-1]))
        if len(segments) >= 3:
            parent_paths.add("/" + segments[0])
    source_links = {}
    for path in sorted(parent_paths):
        try:
            response = requests.get(LOCAL + path, timeout=20)
            parser, _ = parse(response.text)
            source_links[path] = {urljoin("https://printkee.com" + path, href).split("?")[0]
                                  for href in parser.links if href and not href.startswith("#")}
        except Exception:
            source_links[path] = set()
    rows = []
    with tempfile.TemporaryDirectory(prefix="gsc-render-") as profile:
        for index, url in enumerate(urls, 1):
            path = urlsplit(url).path
            response = requests.get(LOCAL + path, timeout=25)
            server, server_text = parse(response.text)
            command = [CHROME, "--headless=new", "--disable-gpu", "--no-sandbox", "--disable-extensions",
                       "--disable-background-networking", "--user-data-dir=" + profile,
                       "--virtual-time-budget=2000", "--dump-dom", LOCAL + path]
            rendered_response = subprocess.run(command, capture_output=True, text=True, encoding="utf-8", errors="replace", timeout=30)
            rendered, rendered_text = parse(rendered_response.stdout)
            rows.append({
                "URL": url, "HTTP": response.status_code,
                "Server title": server.title, "Rendered title": rendered.title,
                "Server H1": " | ".join(server.h1), "Rendered H1": " | ".join(rendered.h1),
                "Server canonical": server.canonical, "Rendered canonical": rendered.canonical,
                "Server visible words": len(server_text.split()), "Rendered visible words": len(rendered_text.split()),
                "Server internal links": len([href for href in server.links if href.startswith("/") or href.startswith("https://printkee.com/")]),
                "Linking checked pages": "; ".join(path for path, links in source_links.items() if url in links),
                "Chrome exit": rendered_response.returncode,
                "Signals match": server.title == rendered.title and server.h1 == rendered.h1 and server.canonical == rendered.canonical,
            })
            print(f"Rendered {index}/{len(urls)}: {path}", flush=True)
    with open(sys.argv[2], "w", encoding="utf-8-sig", newline="") as output:
        writer = csv.DictWriter(output, fieldnames=rows[0].keys())
        writer.writeheader()
        writer.writerows(rows)
    titles = Counter(row["Rendered title"] for row in rows)
    print({"total": len(rows), "signalMismatches": sum(not row["Signals match"] for row in rows),
           "missingH1": sum(not row["Rendered H1"] for row in rows),
           "duplicateTitles": {title: count for title, count in titles.items() if count > 1},
           "noCheckedInbound": [row["URL"] for row in rows if not row["Linking checked pages"]],
           "chromeFailures": sum(row["Chrome exit"] != 0 for row in rows)})


if __name__ == "__main__":
    main()
