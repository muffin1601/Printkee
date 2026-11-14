"""Read-only live crawl of the supplied GSC coverage export.

Usage: python scripts/audit_gsc_coverage.py INPUT.xlsx OUTPUT.csv
"""

import csv
import re
import sys
from collections import Counter
from concurrent.futures import ThreadPoolExecutor, as_completed
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote
from xml.etree import ElementTree

import openpyxl
import requests


class PageParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.title = ""
        self.h1 = []
        self.meta = {}
        self.canonical = ""
        self.links = set()
        self._capture = None
        self._buffer = []

    def handle_starttag(self, tag, attrs):
        values = dict(attrs)
        if tag in ("title", "h1"):
            self._capture = tag
            self._buffer = []
        elif tag == "meta" and values.get("name"):
            self.meta[values["name"].lower()] = values.get("content", "")
        elif tag == "link" and values.get("rel") == "canonical":
            self.canonical = values.get("href", "")
        elif tag == "a" and values.get("href"):
            self.links.add(values["href"])

    def handle_data(self, data):
        if self._capture:
            self._buffer.append(data)

    def handle_endtag(self, tag):
        if tag == self._capture:
            value = " ".join("".join(self._buffer).split())
            if tag == "title":
                self.title = value
            else:
                self.h1.append(value)
            self._capture = None


def get_sitemap_urls():
    urls = set()
    errors = []
    for path in ("/sitemap.xml", "/sitemap-index.xml"):
        try:
            response = requests.get("https://printkee.com" + path, timeout=25)
            response.raise_for_status()
            root = ElementTree.fromstring(response.content)
            locations = [node.text for node in root.iter() if node.tag.endswith("}loc") and node.text]
            for location in locations:
                if location.endswith(".xml"):
                    try:
                        part = requests.get(location, timeout=25)
                        part.raise_for_status()
                        part_root = ElementTree.fromstring(part.content)
                        urls.update(node.text for node in part_root.iter() if node.tag.endswith("}loc") and node.text)
                    except Exception as exc:
                        errors.append(f"{location}: {exc}")
                else:
                    urls.add(location)
        except Exception as exc:
            errors.append(f"{path}: {exc}")
    return urls, errors


def classify(url):
    parsed = urlsplit(url)
    parts = [unquote(piece) for piece in parsed.path.strip("/").split("/") if piece]
    if parsed.path.startswith("/uploads/") or parsed.path == "/favicon.ico":
        return "Static asset"
    if parsed.path == "/robots.txt":
        return "Robots file"
    if parts and parts[0] == "brands":
        return "Brand landing page"
    if parts and parts[0] in ("blog", "blogs", "post"):
        return "Blog or informational page"
    if parts and parts[0] in ("solutions", "corporate-gifting", "branding", "branding-solutions"):
        return "Corporate gifting solution page"
    if parts and parts[0] == "customize":
        return "Customization utility page"
    if len(parts) == 3:
        return "Product detail page candidate"
    if len(parts) in (1, 2):
        return "Category or subcategory candidate"
    return "Unknown"


def inspect(item):
    url, crawled = item
    result = {"URL": url, "Last crawled": crawled.date().isoformat() if hasattr(crawled, "date") else str(crawled),
              "Page Type": classify(url), "HTTP Status": "", "Final URL": "", "Redirect Chain": "",
              "Canonical URL": "", "Robots/Noindex": "", "Sitemap Inclusion": "", "Content Quality": "",
              "Internal Links": "", "Suspected Root Cause": "", "Evidence": "", "Priority": "",
              "Recommended Action": "", "Classification": "", "Title": "", "Meta Description": "", "H1": ""}
    try:
        response = requests.get(url, timeout=18, allow_redirects=True, headers={"User-Agent": "Mozilla/5.0 (compatible; PrintkeeSEOAudit/1.0)"})
        result["HTTP Status"] = str(response.status_code)
        result["Final URL"] = response.url
        result["Redirect Chain"] = " -> ".join(f"{r.status_code} {r.url}" for r in response.history)
        result["Robots/Noindex"] = response.headers.get("X-Robots-Tag", "")
        if "text/html" in response.headers.get("Content-Type", ""):
            parser = PageParser()
            parser.feed(response.text)
            result["Canonical URL"] = parser.canonical
            result["Title"] = parser.title
            result["Meta Description"] = parser.meta.get("description", "")
            result["H1"] = " | ".join(parser.h1)
            result["Robots/Noindex"] += " " + parser.meta.get("robots", "") + " " + parser.meta.get("googlebot", "")
            result["Internal Links"] = str(len([x for x in parser.links if x.startswith("/") or x.startswith("https://printkee.com/")]))
            result["Content Quality"] = f"H1={len(parser.h1)}; title={'yes' if parser.title else 'no'}; description={'yes' if result['Meta Description'] else 'no'}"
        else:
            result["Content Quality"] = response.headers.get("Content-Type", "")
    except Exception as exc:
        result["HTTP Status"] = "FETCH ERROR"
        result["Evidence"] = str(exc)
    return result


def main():
    book = openpyxl.load_workbook(sys.argv[1], read_only=True, data_only=True)
    items = list(book["Table"].values)[1:]
    sitemap_urls, sitemap_errors = get_sitemap_urls()
    print("Sitemap URLs:", len(sitemap_urls), "errors:", sitemap_errors, flush=True)
    rows = []
    with ThreadPoolExecutor(max_workers=8) as pool:
        futures = [pool.submit(inspect, item) for item in items]
        for future in as_completed(futures):
            rows.append(future.result())
    rows.sort(key=lambda row: next(i for i, item in enumerate(items) if item[0] == row["URL"]))
    for row in rows:
        url, final, status = row["URL"], row["Final URL"], row["HTTP Status"]
        is_asset = row["Page Type"] in ("Static asset", "Robots file")
        row["Sitemap Inclusion"] = "Yes" if url in sitemap_urls else "No"
        if status == "FETCH ERROR":
            classification, cause, action, priority = "MANUAL REVIEW", "Live fetch failed", "Retry live inspection", "High"
        elif is_asset:
            classification, cause, action, priority = "KEEP EXCLUDED", "Non-HTML resource", "Keep out of page sitemap; verify asset is reachable", "Low"
        elif status != "200":
            classification, cause, action, priority = "MANUAL REVIEW", "Non-200 response", "Inspect route and record; restore or return genuine 404/410", "High"
        elif final != url:
            classification, cause, action, priority = "FIX / REDIRECT", "Redirected or normalized URL", "Verify target is relevant and canonical; link directly to target", "Medium"
        elif re.search(r"noindex", row["Robots/Noindex"], re.I):
            if row["Page Type"] == "Product detail page candidate":
                classification, cause, action, priority = "MANUAL REVIEW", "Explicit noindex; product quality gate likely", "Review actual product record and quality issues; improve verified details before changing indexability", "Medium"
            else:
                classification, cause, action, priority = "KEEP EXCLUDED", "Explicit noindex", "Confirm exclusion is intentional; keep out of sitemap", "Low"
        elif row["Canonical URL"] and row["Canonical URL"] != url:
            classification, cause, action, priority = "CONSOLIDATE / CANONICALIZE", "Canonical points elsewhere", "Confirm equivalent target; align links and sitemap", "Medium"
        elif not row["H1"] or not row["Meta Description"]:
            classification, cause, action, priority = "FIX & INDEX", "Missing visible SEO content", "Add accurate page-specific content, then inspect in GSC", "High"
        else:
            classification, cause, action, priority = "MANUAL REVIEW", "No blocking signal confirmed; Google/content decision unknown", "Compare with indexed peers and inspect URL in GSC", "Medium"
        row["Classification"] = classification
        row["Suspected Root Cause"] = cause
        row["Recommended Action"] = action
        row["Priority"] = priority
        row["Evidence"] = (row["Evidence"] + f" HTTP {status}; final={final}; canonical={row['Canonical URL']}; robots={row['Robots/Noindex'].strip()}; {row['Content Quality']}").strip()
    with open(sys.argv[2], "w", newline="", encoding="utf-8-sig") as output:
        writer = csv.DictWriter(output, fieldnames=rows[0].keys())
        writer.writeheader()
        writer.writerows(rows)
    print("Status:", Counter(row["HTTP Status"] for row in rows), flush=True)
    print("Classifications:", Counter(row["Classification"] for row in rows), flush=True)
    print("Types:", Counter(row["Page Type"] for row in rows), flush=True)
    print("Sitemap inclusions:", Counter(row["Sitemap Inclusion"] for row in rows), flush=True)


if __name__ == "__main__":
    main()
