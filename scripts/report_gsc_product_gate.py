"""Join live GSC coverage evidence to read-only product database diagnostics."""
import csv
import json
import sys
from collections import Counter
from concurrent.futures import ThreadPoolExecutor, as_completed

import requests


def image_status(url):
    if not url:
        return "NO IMAGE"
    target = url if url.startswith("http") else "https://printkee.com" + url
    try:
        response = requests.get(target, timeout=12, stream=True)
        return str(response.status_code)
    except Exception:
        return "FETCH ERROR"


def required_updates(record):
    fields = []
    quality = record["quality"]
    if record["longDescriptionWords"] < 40:
        fields.append("description.long: add product-specific visible details (at least 40 words)")
    if quality["wordCount"] < 80:
        fields.append("description.short/long: expand distinct, verified product content to 80 combined words")
    if quality["detailCount"] < 3:
        fields.append("attributes/features/idealFor/specifications: add at least 3 verified useful detail groups")
    if record["seoTitleLength"] < 30:
        fields.append("seo.metaTitle: write a distinct descriptive title")
    if record["seoDescriptionLength"] < 70:
        fields.append("seo.metaDescription: write a distinct accurate description of at least 70 characters")
    if not record["descriptiveImageCount"]:
        fields.append("images: provide an accessible primary URL and descriptive altText")
    if record["status"] != "published" or not record["isActive"] or record["deleted"]:
        fields.append("status/isActive/deletedAt: confirm publication state")
    if not record["relationshipValid"] or not record["categoryActive"] or not record["subcategoryActive"]:
        fields.append("category/subcategory: repair active parent relationship")
    return fields


def main():
    audit_path, baseline_path, after_path, output_path = sys.argv[1:5]
    with open(audit_path, encoding="utf-8-sig", newline="") as source:
        audit = list(csv.DictReader(source))
    baseline = {row["url"]: row for row in json.load(open(baseline_path, encoding="utf-8"))["rows"]}
    after = {row["url"]: row for row in json.load(open(after_path, encoding="utf-8"))["rows"]}
    affected = [row for row in audit if row["URL"] == row["Final URL"]
                and row["Page Type"] == "Product detail page candidate"
                and "noindex" in row["Robots/Noindex"].lower()]
    images = {row["URL"]: after.get(row["URL"], {}).get("primaryImageUrl", "") for row in affected}
    image_results = {}
    with ThreadPoolExecutor(max_workers=8) as pool:
        futures = {pool.submit(image_status, image): url for url, image in images.items()}
        for future in as_completed(futures):
            image_results[futures[future]] = future.result()
    rows = []
    for audit_row in affected:
        url = audit_row["URL"]
        before, now = baseline.get(url), after.get(url)
        if not before or not now:
            raise RuntimeError(f"Database record missing for {url}")
        updates = required_updates(now)
        if image_results[url] != "200":
            updates.append("images[0].url: check primary image availability")
        rows.append({
            "URL": url, "Last crawled": audit_row["Last crawled"],
            "Product name": now["name"], "Status": now["status"],
            "Before eligible": before["quality"]["eligible"], "After eligible": now["quality"]["eligible"],
            "Before reasons": "; ".join(before["quality"]["issues"]),
            "After reasons": "; ".join(now["quality"]["issues"]),
            "Visible long-description words": now["longDescriptionWords"],
            "Combined description words": now["quality"]["wordCount"],
            "Detail groups": now["quality"]["detailCount"],
            "Present detail fields": "; ".join(now["detailPresent"]),
            "SEO title characters": now["seoTitleLength"],
            "Meta description characters": now["seoDescriptionLength"],
            "Primary image HTTP": image_results[url],
            "Fields requiring update": "; ".join(updates),
            "Editorial review": "",
        })
    editorial = {
        "kitchen-apron": "Description says cotton; attributes say polyester cotton blend. Verify composition and customization claims.",
        "classic-steel-coffee-mug": "Product data says stainless steel; SEO title, meta description, and feature list say ceramic. Correct copy and image alt text.",
        "matte-black-corporate-mug": "Product name/description say spill-proof suction mug; SEO title says matte black corporate mug. Verify identity and copy.",
    }
    for row in rows:
        slug = row["URL"].rstrip("/").split("/")[-1]
        row["Editorial review"] = editorial.get(slug, "")
    with open(output_path, "w", encoding="utf-8-sig", newline="") as output:
        writer = csv.DictWriter(output, fieldnames=rows[0].keys())
        writer.writeheader()
        writer.writerows(rows)
    print(json.dumps({"affected": len(rows), "beforeEligible": sum(x["Before eligible"] for x in rows),
                      "afterEligible": sum(x["After eligible"] for x in rows),
                      "imageStatuses": dict(Counter(x["Primary image HTTP"] for x in rows)),
                      "afterReasons": dict(Counter(reason for x in rows for reason in x["After reasons"].split("; ") if reason))}))


if __name__ == "__main__":
    main()
