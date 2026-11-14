"""Read-only Gate V2 HTTP verification after the approved 24-row staging import."""
import csv
import json
import re
from concurrent.futures import ThreadPoolExecutor, as_completed
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import quote, urlsplit
from xml.etree import ElementTree

import requests
from audit_gsc_coverage import PageParser
from inspect_gsc_rendered import VisibleText
from verify_local_product_seo import JsonLdParser

ROOT = Path(__file__).resolve().parents[1]
LOCAL = "http://127.0.0.1:3005"
API = "http://127.0.0.1:5031"
CANONICAL = "https://printkee.com"
AUDIT = ROOT / "seo" / "05-technical-audits"
APPROVAL = ROOT / ".local-backups" / "printkee-seo-staging-approval-2026-11-14" / "approved-24.csv"
LEDGER = ROOT / ".local-backups" / "printkee-seo-staging-2026-11-14" / "approved-gate-v2-ledger.json"
PARTITIONS = ["static", "categories", "products", "brands", "blog", "locations", "seo-pages-1"]


class ImageParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.alts = []

    def handle_starttag(self, tag, attrs):
        if tag == "img":
            self.alts.append(dict(attrs).get("alt", ""))


def xml_locs(path):
    response = requests.get(LOCAL + path, timeout=30)
    response.raise_for_status()
    return {node.text for node in ElementTree.fromstring(response.content).iter()
            if node.tag.endswith("loc") and node.text}


def public_path(product):
    sub = "steel-mug" if product["subcategory"]["slug"] == "steel mug" else product["subcategory"]["slug"]
    slug = "double-wall-insulated-mug" if product["slug"].strip() == "double wall insulated mug" else product["slug"].strip()
    return "/" + "/".join((product["category"]["slug"], sub, quote(slug)))


def normalize(value):
    return " ".join(re.sub(r"[^\w]+", " ", value.lower()).split())


def check_product(product, eligible_ids, approved_by_id, sitemap_urls):
    product_id = product["id"]
    path = public_path(product)
    canonical = CANONICAL + path
    api_path = "/api/product/product-fetch/" + "/".join(quote(x) for x in (
        product["category"]["slug"], product["subcategory"]["slug"], product["slug"]))
    api = requests.get(API + api_path, timeout=25)
    page = requests.get(LOCAL + path, timeout=25, allow_redirects=False)
    issues = []
    if api.status_code != 200 or page.status_code != 200:
        return {"slug": product["slug"], "issues": [f"HTTP API {api.status_code}, page {page.status_code}"]}
    data = api.json()
    parsed = PageParser(); parsed.feed(page.text)
    images = ImageParser(); images.feed(page.text)
    visible = VisibleText(); visible.feed(page.text)
    schemas = JsonLdParser(); schemas.feed(page.text)
    expected = product_id in eligible_ids
    if data.get("seoQuality", {}).get("eligible") is not expected:
        issues.append("API Gate V2 decision disagrees with approved/legacy ledger")
    if parsed.canonical != canonical:
        issues.append(f"canonical {parsed.canonical}")
    if ("noindex" not in parsed.meta.get("robots", "").lower()) is not expected:
        issues.append(f"robots {parsed.meta.get('robots', '')}")
    if expected and ("nofollow" in parsed.meta.get("robots", "").lower() or
                     "none" in parsed.meta.get("robots", "").lower()):
        issues.append("eligible page has a restrictive link robots directive")
    if (canonical in sitemap_urls) is not expected:
        issues.append("sitemap inclusion disagrees with robots")
    if not parsed.h1:
        issues.append("missing H1")
    product_schema = [s for s in schemas.items if s.get("@type") == "Product"]
    breadcrumb = [s for s in schemas.items if s.get("@type") == "BreadcrumbList"]
    if len(product_schema) != 1 or product_schema[0].get("name") != product["name"]:
        issues.append("Product JSON-LD identity mismatch")
    if len(breadcrumb) != 1 or not breadcrumb[0].get("itemListElement") or breadcrumb[0]["itemListElement"][-1].get("item") != canonical:
        issues.append("Breadcrumb JSON-LD canonical mismatch")
    if product_id in approved_by_id:
        row = approved_by_id[product_id]
        text = normalize(" ".join(visible.parts))
        if normalize(row["proposed_long_description"]) not in text:
            issues.append("approved visible description missing")
        if parsed.title != row["proposed_seo_title"] or parsed.meta.get("description") != row["proposed_meta_description"]:
            issues.append("approved SEO title or meta description mismatch")
        if json.loads(row["proposed_image_alt_text_json"])[0] not in images.alts:
            issues.append("approved primary image alt missing")
    return {"slug": product["slug"], "issues": issues} if issues else None


def main():
    products = json.loads((AUDIT / "GSC_PRODUCT_GATE_HANDOFF_SNAPSHOT_2026-11-13.json").read_text(encoding="utf-8"))["rows"]
    targets = list(csv.DictReader((AUDIT / "GSC_PRODUCT_SEO_FINAL_REVIEW_151_2026-11-14.csv").open(encoding="utf-8-sig", newline="")))
    approved = list(csv.DictReader(APPROVAL.open(encoding="utf-8-sig", newline="")))
    ledger = json.loads(LEDGER.read_text(encoding="utf-8"))
    approved_by_id = {row["product_id"]: row for row in approved}
    eligible_ids = (set(ledger["legacyIndexedIds"]) - set(ledger["confirmedHolds"])) | set(ledger["approvals"])
    if len(products) != 234 or len(targets) != 151 or len(approved_by_id) != 24 or len(eligible_ids) != 40:
        raise SystemExit("Unexpected staging scope or approval count")
    if set(approved_by_id) != set(ledger["approvals"]):
        raise SystemExit("Approved CSV and ledger differ")
    held_ids = {r["product_id"] for r in targets} - set(approved_by_id)
    if len(held_ids) != 127 or any(item in eligible_ids for item in held_ids):
        raise SystemExit("A held product became eligible")
    sitemap = xml_locs("/sitemap.xml")
    partitions = set().union(*(xml_locs(f"/sitemaps/{part}.xml") for part in PARTITIONS))
    errors = []
    if sitemap != partitions:
        errors.append("aggregate and partition sitemap sets differ")
    if len(sitemap) != 247:
        errors.append(f"expected 247 sitemap URLs, found {len(sitemap)}")
    with ThreadPoolExecutor(max_workers=8) as pool:
        futures = [pool.submit(check_product, p, eligible_ids, approved_by_id, sitemap) for p in products]
        for future in as_completed(futures):
            item = future.result()
            if item:
                errors.append(item)
    incoming_checked = 0
    for row in approved:
        product = next(p for p in products if p["id"] == row["product_id"])
        subpath = f"/{product['category']['slug']}/{product['subcategory']['slug']}"
        response = requests.get(LOCAL + subpath, timeout=25)
        page = PageParser(); page.feed(response.text)
        product_path = public_path(product)
        if response.status_code != 200 or not any(urlsplit(href).path == product_path for href in page.links):
            errors.append({"slug": row["slug"], "issue": "subcategory has no working product link"})
        else:
            incoming_checked += 1
    result = {"productsChecked": len(products), "approvedNewlyEligible": len(approved),
              "legacyEligibleRetained": len(eligible_ids) - len(approved), "heldTargetsExcluded": len(held_ids),
              "sitemapUrls": len(sitemap), "productSitemapUrls": sum(CANONICAL + public_path(p) in sitemap for p in products),
              "subcategoryLinksChecked": incoming_checked, "errors": errors}
    (AUDIT / "GSC_STAGING_GATE_V2_HTTP_VERIFICATION_24_2026-11-14.json").write_text(
        json.dumps(result, indent=2) + "\n", encoding="utf-8")
    print(json.dumps(result))
    if errors:
        raise SystemExit(1)


if __name__ == "__main__":
    main()
