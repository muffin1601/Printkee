"""Read-only HTTP check for every product on a local Printkee build."""
import json
import sys
from concurrent.futures import ThreadPoolExecutor, as_completed
from html.parser import HTMLParser
from urllib.parse import quote
from xml.etree import ElementTree

import requests
from audit_gsc_coverage import PageParser

SITE = "http://localhost:3005"
API = "http://localhost:5031"
BASE = "https://printkee.com"
CONFLICTS = {"personalized-polo-t-shirts", "stainless-steel-double-wall-coffee-mug"}


class JsonLdParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.capture = False
        self.buffer = []
        self.items = []

    def handle_starttag(self, tag, attrs):
        if tag == "script" and dict(attrs).get("type") == "application/ld+json":
            self.capture = True
            self.buffer = []

    def handle_data(self, data):
        if self.capture:
            self.buffer.append(data)

    def handle_endtag(self, tag):
        if tag == "script" and self.capture:
            self.items.append(json.loads("".join(self.buffer)))
            self.capture = False


def public_path(product):
    sub = "steel-mug" if product["subcategory"]["slug"] == "steel mug" else product["subcategory"]["slug"]
    source_slug = product["slug"].strip()
    slug = "double-wall-insulated-mug" if source_slug == "double wall insulated mug" else source_slug
    return "/" + "/".join((product["category"]["slug"], sub, quote(slug)))


def check(product, flag):
    path = public_path(product)
    api_path = "/api/product/product-fetch/" + "/".join(quote(x) for x in (
        product["category"]["slug"], product["subcategory"]["slug"], product["slug"]))
    api_response = requests.get(API + api_path, timeout=25)
    page_response = requests.get(SITE + path, timeout=25, allow_redirects=False)
    if api_response.status_code != 200 or page_response.status_code != 200:
        return {"slug": product["slug"], "issue": "product route failed", "api": api_response.status_code,
                "page": page_response.status_code}
    api = api_response.json()
    parser = PageParser()
    parser.feed(page_response.text)
    structured = JsonLdParser()
    structured.feed(page_response.text)
    eligible = api.get("seoQuality", {}).get("eligible") is True
    current = product["slug"] in OLD_ELIGIBLE
    expected = current and (flag == "off" or product["slug"] not in CONFLICTS)
    expected_url = BASE + path
    problems = []
    if eligible != expected:
        problems.append(f"gate {eligible} vs expected {expected}")
    if parser.canonical != expected_url:
        problems.append(f"canonical {parser.canonical}")
    robots = parser.meta.get("robots", "").lower()
    if ("noindex" not in robots) != expected:
        problems.append(f"robots {robots}")
    if (expected_url in SITEMAP_URLS) != expected:
        problems.append("sitemap disagreement")
    if not parser.h1:
        problems.append("missing H1")
    product_schemas = [item for item in structured.items if item.get("@type") == "Product"]
    breadcrumb_schemas = [item for item in structured.items if item.get("@type") == "BreadcrumbList"]
    if len(product_schemas) != 1 or product_schemas[0].get("name") != product["name"]:
        problems.append("product structured data missing or wrong identity")
    if len(breadcrumb_schemas) != 1 or not breadcrumb_schemas[0].get("itemListElement") or \
            breadcrumb_schemas[0]["itemListElement"][-1].get("item") != expected_url:
        problems.append("breadcrumb structured data missing or wrong canonical")
    return {"slug": product["slug"], "issue": "; ".join(problems)} if problems else None


if __name__ == "__main__":
    flag = sys.argv[1] if len(sys.argv) > 1 else "off"
    if flag not in {"on", "off"}:
        raise SystemExit("Use on or off")
    products = json.load(open("seo/05-technical-audits/GSC_PRODUCT_GATE_HANDOFF_SNAPSHOT_2026-11-13.json",
                              encoding="utf-8"))["rows"]
    baseline = json.load(open("seo/05-technical-audits/GSC_PRODUCT_GATE_BASELINE_234_2026-11-13.json",
                              encoding="utf-8"))["rows"]
    OLD_ELIGIBLE = {row["slug"] for row in baseline if row["quality"]["eligible"]}
    xml = requests.get(SITE + "/sitemap.xml", timeout=30)
    xml.raise_for_status()
    SITEMAP_URLS = {node.text for node in ElementTree.fromstring(xml.content).iter()
                    if node.tag.endswith("}loc") and node.text}
    errors = []
    with ThreadPoolExecutor(max_workers=8) as pool:
        futures = [pool.submit(check, product, flag) for product in products]
        for future in as_completed(futures):
            result = future.result()
            if result:
                errors.append(result)
    print(json.dumps({"flag": flag, "productsChecked": len(products), "oldEligible": len(OLD_ELIGIBLE),
                      "expectedEligible": 18 if flag == "off" else 16, "sitemapUrls": len(SITEMAP_URLS),
                      "errors": errors}, indent=2))
    if errors:
        raise SystemExit(1)
