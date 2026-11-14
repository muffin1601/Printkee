"""Reconcile dated SEO evidence with the current local staging sitemap, read-only."""
import csv
import json
import subprocess
import urllib.parse
import urllib.request
from collections import Counter
from pathlib import Path
from xml.etree import ElementTree

ROOT = Path(__file__).resolve().parents[1]
AUDIT = ROOT / "seo" / "05-technical-audits"
ORIGIN = "http://127.0.0.1:3005"
PARTS = ["static", "categories", "products", "brands", "blog", "locations", "seo-pages-1"]


def locs(path):
    with urllib.request.urlopen(ORIGIN + path, timeout=20) as response:
        xml = ElementTree.fromstring(response.read())
    return {node.text for node in xml.iter() if node.tag.endswith("loc") and node.text}


old = json.loads(subprocess.check_output(
    ["git", "show", "f070ce3:seo/05-technical-audits/SEO_CRAWL_REPORT.json"], cwd=ROOT))
current = json.loads((AUDIT / "SEO_CRAWL_REPORT.json").read_text(encoding="utf-8"))
with (AUDIT / "PRINTKEE_SEO_PAGE_INVENTORY.csv").open(encoding="utf-8-sig", newline="") as stream:
    inventory = list(csv.DictReader(stream))
aggregate = locs("/sitemap.xml")
partitions = {part: locs(f"/sitemaps/{part}.xml") for part in PARTS}
partition_urls = set().union(*partitions.values())
old_paths = {page["path"] for page in old["pages"]}
current_paths = {page["path"] for page in current["pages"]}
sitemap_paths = {urllib.parse.urlparse(url).path for url in aggregate}
inventory_by_path = {urllib.parse.urlparse(row["URL"]).path: row for row in inventory}
inventory_paths = set(inventory_by_path)
removed = old_paths - current_paths
added = current_paths - old_paths
result = {
    "historical410": {"date": old["generatedAt"], "urls": len(old_paths), "gitCommit": "f070ce3"},
    "currentCrawl": {"date": current["generatedAt"], "urls": len(current_paths),
                     "errors": current["summary"]["errors"], "warnings": current["summary"]["warnings"]},
    "crawlChange": {"shared": len(old_paths & current_paths), "removed": len(removed), "added": len(added),
                    "removedByInventoryType": dict(Counter(inventory_by_path.get(p, {}).get("Page Type", "NOT_IN_INVENTORY") for p in removed)),
                    "addedSolutionPages": sum(p.startswith("/solutions") for p in added)},
    "inventory": {"rows": len(inventory), "uniquePaths": len(inventory_paths),
                  "indexableAtInventoryTime": sum(r["Indexability"] == "INDEXABLE" for r in inventory),
                  "notVerifiedAtInventoryTime": sum(r["Indexability"] == "NOT VERIFIED" for r in inventory),
                  "overlapWithCurrentSitemap": len(inventory_paths & sitemap_paths),
                  "inventoryOnly": len(inventory_paths - sitemap_paths),
                  "currentSitemapOnly": len(sitemap_paths - inventory_paths),
                  "inventoryOnlyByType": dict(Counter(inventory_by_path[p]["Page Type"] for p in inventory_paths - sitemap_paths))},
    "generatedSitemap": {"aggregateUrls": len(aggregate), "partitionUrls": len(partition_urls),
                         "partitionCounts": {part: len(urls) for part, urls in partitions.items()},
                         "aggregateOnly": sorted(aggregate - partition_urls),
                         "partitionOnly": sorted(partition_urls - aggregate),
                         "crawlOnly": sorted(current_paths - sitemap_paths),
                         "sitemapOnly": sorted(sitemap_paths - current_paths)},
}
if (result["historical410"]["urls"], result["currentCrawl"]["urls"], result["inventory"]["rows"]) != (410, 225, 349):
    raise SystemExit("Unexpected source counts")
if any(result["generatedSitemap"][key] for key in ["aggregateOnly", "partitionOnly", "crawlOnly", "sitemapOnly"]):
    raise SystemExit("Current sitemap and crawl do not agree")
out = AUDIT / "GSC_SITEMAP_SCOPE_RECONCILIATION_2026-11-14.json"
out.write_text(json.dumps(result, indent=2) + "\n", encoding="utf-8")
print(json.dumps({"historical": 410, "current": 225, "inventory": 349,
                  "removed": len(removed), "added": len(added), "partitionParity": True}))
