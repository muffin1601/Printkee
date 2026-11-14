"""Verify production build against the connected backend, without writing data."""
import csv
import json
import sys
from concurrent.futures import ThreadPoolExecutor, as_completed
from urllib.parse import urlsplit
from xml.etree import ElementTree

import requests
from audit_gsc_coverage import PageParser
from inspect_gsc_rendered import VisibleText


LOCAL = "http://localhost:3005"


def inspect(url):
    path = urlsplit(url).path
    response = requests.get(LOCAL + path, timeout=25, allow_redirects=False)
    parsed = PageParser()
    visible = VisibleText()
    if "text/html" in response.headers.get("Content-Type", ""):
        parsed.feed(response.text)
        visible.feed(response.text)
    return {"url": url, "status": response.status_code, "robots": parsed.meta.get("robots", ""),
            "canonical": parsed.canonical, "h1": parsed.h1, "title": parsed.title,
            "description": parsed.meta.get("description", ""), "htmlBytes": len(response.content),
            "visibleWords": len(" ".join(visible.parts).split())}


def main():
    with open(sys.argv[1], encoding="utf-8-sig", newline="") as source:
        audit = list(csv.DictReader(source))
    products = json.load(open(sys.argv[2], encoding="utf-8"))["rows"]
    noindex_urls = [row["URL"] for row in audit if row["URL"] == row["Final URL"]
                    and row["Page Type"] == "Product detail page candidate"
                    and "noindex" in row["Robots/Noindex"].lower()]
    existing_indexable_urls = [row["URL"] for row in audit if row["Sitemap Inclusion"] == "Yes"]
    eligible_urls = []
    for product in products:
        if not product["quality"]["eligible"]:
            continue
        url = product["url"].replace("/steel%20mug/", "/steel-mug/").replace("/steel mug/", "/steel-mug/")
        eligible_urls.append(url)
    sitemap_response = requests.get(LOCAL + "/sitemap.xml", timeout=30)
    sitemap_response.raise_for_status()
    root = ElementTree.fromstring(sitemap_response.content)
    sitemap_urls = {node.text for node in root.iter() if node.tag.endswith("}loc") and node.text}
    targets = sorted(set(noindex_urls + existing_indexable_urls + eligible_urls))
    results = {}
    with ThreadPoolExecutor(max_workers=8) as pool:
        futures = {pool.submit(inspect, url): url for url in targets}
        for future in as_completed(futures):
            results[futures[future]] = future.result()
    errors = []
    for url in noindex_urls:
        row = results[url]
        if row["status"] != 200 or "noindex" not in row["robots"] or url in sitemap_urls:
            errors.append({"url": url, "issue": "excluded product status/robots/sitemap mismatch", "result": row})
    for url in eligible_urls:
        row = results[url]
        if row["status"] != 200 or "noindex" in row["robots"] or row["canonical"] != url or not row["h1"] or row["visibleWords"] < 200 or url not in sitemap_urls:
            errors.append({"url": url, "issue": "eligible product status/robots/canonical/H1/sitemap mismatch", "result": row})
    for url in existing_indexable_urls:
        row = results[url]
        if row["status"] != 200 or "noindex" in row["robots"] or row["canonical"] != url or not row["h1"]:
            errors.append({"url": url, "issue": "already-indexable URL signal mismatch", "result": row})
    summary = {"noindexProductsChecked": len(noindex_urls), "eligibleProductsChecked": len(eligible_urls),
               "existingIndexableUrlsChecked": len(existing_indexable_urls), "sitemapUrls": len(sitemap_urls),
               "errors": errors}
    print(json.dumps(summary, indent=2))
    if errors:
        sys.exit(1)


if __name__ == "__main__":
    main()
