import csv
import json
import re
import subprocess
from collections import Counter, defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SEO_ROOT = ROOT / "seo"
KEYWORD_DIR = SEO_ROOT / "03-keywords-and-search-data"
PROGRAMMATIC_DIR = SEO_ROOT / "04-programmatic-seo"
AUDIT_DIR = SEO_ROOT / "05-technical-audits"
OPERATIONS_DIR = SEO_ROOT / "06-governance-and-operations"
STRATEGY_DIR = SEO_ROOT / "02-strategy-and-roadmap"
INPUT = KEYWORD_DIR / "PurplePalette_Printo_SEO_Keyword_Universe.csv"
SITE = "https://printkee.com"

MASTER_COLUMNS = [
    "Original Keyword", "Normalized Keyword", "Category", "Topic Cluster", "Primary Keyword",
    "Secondary Keyword Group", "Search Intent", "Buyer Persona", "Country", "City",
    "Source Relevance", "Evidence Type", "Existing URL", "Recommended URL", "Page Type",
    "Keyword Disposition", "Disposition Reason", "Priority", "Product Availability",
    "Content Readiness", "Cannibalization Risk", "Search Volume", "Ranking Difficulty",
    "Current Position", "Current Impressions", "Current Clicks", "Current CTR",
    "Target Ranking", "Implementation Status",
]

CITIES = [
    "greater noida", "new delhi", "delhi ncr", "saudi arabia", "united kingdom", "united states",
    "gurugram", "gurgaon", "delhi", "noida", "faridabad", "ghaziabad", "mumbai", "pune",
    "bangalore", "bengaluru", "hyderabad", "chennai", "kolkata", "ahmedabad", "jaipur",
    "lucknow", "kanpur", "chandigarh", "surat", "indore", "kochi", "dubai", "singapore",
    "canada", "australia", "qatar", "germany", "usa", "uk", "uae", "india",
]

EXISTING_LOCATION_PATHS = {
    "delhi": "/delhi/corporate-gifts",
    "new delhi": "/delhi/corporate-gifts",
    "noida": "/noida/corporate-gifts",
    "greater noida": "/greater-noida/corporate-gifts",
    "gurgaon": "/gurgaon/corporate-gifts",
    "gurugram": "/gurgaon/corporate-gifts",
    "faridabad": "/faridabad/corporate-gifts",
    "ghaziabad": "/ghaziabad/corporate-gifts",
}

INTERNATIONAL_MARKETS = {
    "usa", "united states", "uk", "united kingdom", "canada", "australia", "uae", "dubai",
    "singapore", "saudi arabia", "qatar", "germany",
}

UNSUPPORTED_CATEGORIES = {
    "Labels stickers", "Marketing print", "Packaging", "Photos gifts decor",
}


def normalize_keyword(value):
    value = value.casefold().strip()
    value = value.replace("&", " and ")
    value = re.sub(r"\b(customized|customised|personalized|personalised)\b", "custom", value)
    value = re.sub(r"\b(t[\s-]?shirts?)\b", "t shirt", value)
    value = re.sub(r"\bgurgaon\b", "gurugram", value)
    value = re.sub(r"\bbangalore\b", "bengaluru", value)
    value = re.sub(r"\bnew delhi\b", "delhi", value)
    value = re.sub(r"[^a-z0-9\s]", " ", value)
    value = re.sub(r"\s+", " ", value).strip()
    return value


def clean_url(value):
    if not value:
        return ""
    return value.replace(SITE, "").rstrip("/") or "/"


def first_match(text, values):
    for value in values:
        if re.search(rf"\b{re.escape(value)}\b", text):
            return value
    return ""


def infer_location(row, norm):
    market = row.get("Market", "").casefold().strip()
    detected = first_match(f"{market} {norm}", CITIES)
    city = detected
    country = "India"
    if detected in INTERNATIONAL_MARKETS:
        country = {
            "usa": "United States", "united states": "United States", "uk": "United Kingdom",
            "united kingdom": "United Kingdom", "uae": "United Arab Emirates", "dubai": "United Arab Emirates",
        }.get(detected, detected.title())
        city = "Dubai" if detected == "dubai" else ""
    elif detected == "india":
        city = ""
    elif detected:
        city = {"gurugram": "Gurugram (Gurgaon)", "gurgaon": "Gurugram (Gurgaon)", "bangalore": "Bengaluru"}.get(detected, detected.title())
    elif "global" in market:
        country = "India / Global research"
    return country, city, detected


def buyer_persona(norm):
    groups = [
        (("employee", "staff", "hr ", "human resources", "joining", "onboarding"), "HR / People teams"),
        (("client", "customer", "executive", "ceo", "leadership"), "Client relations / Leadership"),
        (("startup",), "Startup founders / Operations"),
        (("enterprise", "corporate office", "company"), "Enterprise procurement"),
        (("school", "college", "coaching", "student", "education"), "Education procurement"),
        (("hotel", "horeca", "hospitality"), "Hospitality procurement"),
        (("hospital", "healthcare", "clinic"), "Healthcare procurement"),
        (("event", "exhibition", "expo", "conference"), "Event / Marketing teams"),
        (("agency",), "Marketing agencies"),
    ]
    for terms, label in groups:
        if any(term in norm for term in terms):
            return label
    return "Business procurement / Marketing"


def modifiers(norm):
    buckets = []
    for label, terms in [
        ("Customization", ("custom", "logo printed", "with logo", "branded", "printing")),
        ("Bulk / sourcing", ("bulk", "wholesale", "supplier", "vendor", "manufacturer", "distributor", "factory")),
        ("Price research", ("price", "cost", "affordable", "cheap", "premium")),
        ("Local", ("near me", "supplier near me", "delhi", "noida", "gurugram", "mumbai", "pune")),
        ("Online", ("online",)),
    ]:
        if any(term in norm for term in terms):
            buckets.append(label)
    return "; ".join(buckets) or "Core product / use-case variants"


def cluster_for(row, norm, location_key):
    # Specific supported products take precedence over broad source categories.
    rules = [
        (("welcome kit", "onboarding kit", "joining kit", "new hire kit"), "Employee welcome kits", "employee welcome kits", "/collection/welcome-kits", "SUBCATEGORY", "AVAILABLE"),
        (("diwali", "deepavali"), "Diwali and seasonal gifting", "corporate Diwali gifts", "/diwali-special", "SEASONAL", "AVAILABLE"),
        (("polo", "collar t shirt"), "Polo shirts and uniforms", "custom polo T-shirts", "/apparel-and-accessories/polo-t-shirts", "SUBCATEGORY", "AVAILABLE"),
        (("round neck", "crew neck", "custom t shirt", "printed t shirt", "logo t shirt", "promotional t shirt", "branded t shirt"), "Custom T-shirts", "custom T-shirts with logo", "/apparel-and-accessories/round-neck-t-shirts", "SUBCATEGORY", "AVAILABLE"),
        (("hoodie", "jacket", "sweatshirt", "winter wear", "sweater"), "Custom hoodies and jackets", "custom corporate winter wear", "/apparel-and-accessories/winter-wear", "SUBCATEGORY", "AVAILABLE"),
        (("uniform", "corporate shirt", "formal shirt"), "Polo shirts and uniforms", "corporate uniforms and shirts", "/apparel-and-accessories/corporate-shirts", "SUBCATEGORY", "AVAILABLE"),
        (("apron",), "Apparel and uniforms", "custom aprons", "/apparel-and-accessories/aprons", "SUBCATEGORY", "AVAILABLE"),
        (("cap", "hat"), "Apparel and uniforms", "custom promotional caps", "/apparel-and-accessories/caps", "SUBCATEGORY", "AVAILABLE"),
        (("tie",), "Apparel and uniforms", "custom corporate ties", "/apparel-and-accessories/ties", "SUBCATEGORY", "AVAILABLE"),
        (("duffle", "duffel"), "Bags and travel merchandise", "custom duffle bags", "/bags-and-travel/duffle-bags", "SUBCATEGORY", "AVAILABLE"),
        (("tote bag",), "Bags and travel merchandise", "custom tote bags", "/bags-and-travel/tote-bags", "SUBCATEGORY", "AVAILABLE"),
        (("backpack", "laptop bag"), "Bags and travel merchandise", "custom corporate backpacks", "/bags-and-travel/backpacks", "SUBCATEGORY", "AVAILABLE"),
        (("foldable bag",), "Bags and travel merchandise", "custom foldable bags", "/bags-and-travel/foldable-bags", "SUBCATEGORY", "AVAILABLE"),
        (("bag", "travel"), "Bags and travel merchandise", "branded bags and travel merchandise", "/bags-and-travel", "CATEGORY", "AVAILABLE"),
        (("bamboo bottle",), "Drinkware and branded bottles", "custom bamboo bottles", "/drink-ware/bamboo-bottle", "SUBCATEGORY", "AVAILABLE"),
        (("sipper", "water bottle", "bottle"), "Drinkware and branded bottles", "custom branded bottles", "/drink-ware/sipper", "SUBCATEGORY", "AVAILABLE"),
        (("ceramic mug",), "Drinkware and branded bottles", "custom ceramic mugs", "/drink-ware/ceramic-mug", "SUBCATEGORY", "AVAILABLE"),
        (("mug", "drinkware", "tumbler", "flask"), "Drinkware and branded bottles", "custom corporate drinkware", "/drink-ware/coffee-mug", "SUBCATEGORY", "AVAILABLE"),
        (("notebook", "diary", "journal"), "Notebooks, diaries, and pens", "branded notebooks and diaries", "/office-and-writing/notebooks-and-diary-sets", "SUBCATEGORY", "AVAILABLE"),
        (("pen", "writing set"), "Notebooks, diaries, and pens", "custom pens and writing sets", "/office-and-writing/pen-and-writing-set", "SUBCATEGORY", "AVAILABLE"),
        (("lanyard", "id card"), "Office stationery", "custom lanyards and ID cards", "/office-and-writing/lanyard-and-id-card", "SUBCATEGORY", "AVAILABLE"),
        (("file folder", "file and folder", "office file", "presentation folder"), "Office stationery", "custom office files and folders", "/office-and-writing/file-and-folder", "SUBCATEGORY", "AVAILABLE"),
        (("power bank",), "Technology gifts", "custom power banks", "/technology-accessories/power-banks", "SUBCATEGORY", "AVAILABLE"),
        (("wireless charg",), "Technology gifts", "custom wireless chargers", "/technology-accessories/wireless-charging", "SUBCATEGORY", "AVAILABLE"),
        (("mouse pad", "mousepad", "computer accessor", "desktop accessor"), "Technology gifts", "branded computer accessories", "/technology-accessories/computer-accessories", "SUBCATEGORY", "AVAILABLE"),
        (("technology gift", "tech gift", "gadget", "electronic gift"), "Technology gifts", "corporate technology gifts", "/technology-accessories", "CATEGORY", "AVAILABLE"),
        (("cork",), "Eco-friendly gifting", "cork corporate gifts", "/eco-products", "CATEGORY", "AVAILABLE"),
        (("eco friendly", "sustainable", "recycled", "green gift"), "Eco-friendly gifting", "eco-friendly corporate gifts", "/eco-products", "CATEGORY", "PARTIALLY AVAILABLE"),
        (("trophy", "trophies", "memento", "momento", "award"), "Event and exhibition merchandise", "custom trophies and mementos", "/trophy-and-momento", "CATEGORY", "AVAILABLE"),
        (("keychain", "key chain"), "Promotional products", "custom promotional keychains", "/collection/keychains", "SUBCATEGORY", "AVAILABLE"),
        (("clock",), "Client and executive gifts", "custom promotional clocks", "/collection/promotional-clocks", "SUBCATEGORY", "AVAILABLE"),
    ]
    for terms, cluster, primary, url, page_type, availability in rules:
        if any(term in norm for term in terms):
            return cluster, primary, url, page_type, availability

    category = row["Category"]
    if category in UNSUPPORTED_CATEGORIES:
        cluster = {
            "Labels stickers": "Packaging and labels", "Marketing print": "Business printing",
            "Packaging": "Packaging and labels", "Photos gifts decor": "Printing and customization services",
        }[category]
        return cluster, cluster.casefold(), "/contact", "EXPANSION", "NOT CURRENTLY VERIFIED"
    if category == "Business stationery":
        return "Business printing", "business stationery printing", "/contact", "EXPANSION", "NOT CURRENTLY VERIFIED"
    if category == "Industry needs":
        return "Industry-specific gifting", "industry-specific corporate gifting", "/industries", "HUB", "PARTIALLY AVAILABLE"
    if category == "Content and questions":
        return "Resources and buying guides", "corporate gifting guides", "/blogs", "BLOG_HUB", "AVAILABLE"
    if "event" in norm or "exhibition" in norm or "expo" in norm:
        return "Event and exhibition merchandise", "event merchandise", "/use-cases", "HUB", "PARTIALLY AVAILABLE"
    if "client" in norm or "executive" in norm or "ceo" in norm:
        return "Client and executive gifts", "corporate gifts for clients", "/collection", "CATEGORY", "AVAILABLE"
    if "employee" in norm or "staff" in norm:
        return "Corporate gifting", "corporate gifts for employees", "/collection", "CATEGORY", "AVAILABLE"
    if "promotional" in norm or "merchandise" in norm or "giveaway" in norm:
        return "Promotional products", "promotional products and branded merchandise", "/", "HOME", "AVAILABLE"
    if category == "T shirts" or "t shirt" in norm:
        return "Custom T-shirts", "custom T-shirts with logo", "/apparel-and-accessories/round-neck-t-shirts", "SUBCATEGORY", "AVAILABLE"
    if category == "Apparel and uniforms":
        return "Apparel and uniforms", "custom corporate apparel", "/apparel-and-accessories", "CATEGORY", "AVAILABLE"
    if category == "Global search":
        return "International commercial research", "corporate gifts", "/corporate-gifting", "HUB", "SERVICE NOT VERIFIED"
    if category == "Printing and merchandise" and any(term in norm for term in ("print service", "printing service", "digital print", "offset print")):
        return "Printing and customization services", "commercial printing services", "/contact", "EXPANSION", "NOT CURRENTLY VERIFIED"
    if category == "Location search" and location_key in EXISTING_LOCATION_PATHS:
        return "Corporate gifting", "corporate gifts", EXISTING_LOCATION_PATHS[location_key], "LOCATION", "AVAILABLE"
    return "Corporate gifting", "corporate gifts and branded merchandise", "/", "HOME", "AVAILABLE"


def csv_rows(path):
    with path.open("r", encoding="utf-8-sig", newline="") as handle:
        return list(csv.DictReader(handle))


def write_csv(name, fieldnames, rows):
    directory = {
        "PRINTKEE_COMPLETE_KEYWORD_MASTER.csv": KEYWORD_DIR,
        "PRINTKEE_KEYWORD_URL_MAP.csv": KEYWORD_DIR,
        "PRINTKEE_CONTENT_GAP_REPORT.csv": AUDIT_DIR,
        "PRINTKEE_LOCATION_OPPORTUNITIES.csv": PROGRAMMATIC_DIR,
        "PRINTKEE_COMPETITOR_COMPARISON.csv": STRATEGY_DIR,
        "PRINTKEE_SEO_IMPLEMENTATION_BACKLOG.csv": OPERATIONS_DIR,
        "PRINTKEE_SEO_PAGE_INVENTORY.csv": AUDIT_DIR,
        "PRINTKEE_INTERNAL_LINK_AUDIT.csv": AUDIT_DIR,
    }.get(name, AUDIT_DIR)
    directory.mkdir(parents=True, exist_ok=True)
    with (directory / name).open("w", encoding="utf-8-sig", newline="") as handle:
        writer = csv.DictWriter(handle, fieldnames=fieldnames, extrasaction="ignore")
        writer.writeheader()
        writer.writerows(rows)


def load_gsc():
    data = {}
    for row in csv_rows(KEYWORD_DIR / "SEO_GSC_BASELINE.csv"):
        key = normalize_keyword(row["Query"])
        candidate = {
            "position": row["Position"], "impressions": row["Impressions"], "clicks": row["Clicks"],
            "ctr": row["CTR"], "url": clean_url(row["Target URL"]), "tier": row["Opportunity Tier"],
        }
        if key not in data or float(candidate["impressions"] or 0) > float(data[key]["impressions"] or 0):
            data[key] = candidate
    return data


def catalog_tree():
    source = """
const data=require('./data/categoryData');
console.log(JSON.stringify(data.map(c=>({name:c.name,slug:c.slug,subcategories:c.subcategories.map(s=>({name:s.name,slug:s.slug,products:(s.products||[]).map(p=>({name:p.name,slug:p.slug}))}))}))));
"""
    result = subprocess.run(["node", "-e", source], cwd=ROOT / "backend-next", check=True, capture_output=True, text=True)
    return json.loads(result.stdout)


def main():
    source_rows = csv_rows(INPUT)
    gsc = load_gsc()
    master = []

    primary_seen = Counter()
    for row in source_rows:
        original = row["Keyword"].strip()
        norm = normalize_keyword(original)
        country, city, location_key = infer_location(row, norm)
        cluster, primary, url, page_type, availability = cluster_for(row, norm, location_key)
        metric = gsc.get(norm)
        international = country not in {"India", "India / Global research"}
        unsupported = availability in {"NOT CURRENTLY VERIFIED", "SERVICE NOT VERIFIED"}
        nonlocal_city = row["Category"] == "Location search" and bool(location_key) and location_key not in EXISTING_LOCATION_PATHS
        claim_term = first_match(norm, [
            "manufacturers", "manufacturer", "factories", "factory", "wholesalers", "wholesaler",
            "wholesale", "distributors", "distributor",
        ])

        existing_url = url if not unsupported and not nonlocal_city and not international else ""
        recommended = url
        disposition_reason = ""
        if international:
            disposition = "DEFERRED - INTERNATIONAL VALIDATION"
            disposition_reason = "Country-specific service, delivery, currency and localisation are not verified; retain as research only."
            recommended = url if url != "/contact" else "/corporate-gifting"
        elif nonlocal_city:
            disposition = "DEFERRED - LOCATION VALIDATION"
            disposition_reason = "City demand is recorded, but unique service evidence and locally useful content are not yet sufficient for an indexable page."
            recommended = "/locations"
        elif unsupported:
            disposition = "EXPANSION OPPORTUNITY"
            disposition_reason = "The keyword is retained, but the referenced product/service is not verified in the current Printkee catalog."
        elif claim_term:
            disposition = "MERGED INTO EXISTING CLUSTER"
            disposition_reason = f"Mapped to the relevant product/category intent; '{claim_term}' is not adopted as a Printkee business claim without evidence."
        elif norm == normalize_keyword(primary):
            disposition = "ASSIGNED TO EXISTING URL"
            disposition_reason = "The existing canonical page is the strongest supported owner for this search intent."
        else:
            disposition = "MERGED INTO EXISTING CLUSTER"
            disposition_reason = "A close spelling, modifier, audience or location variant shares the canonical intent of the recommended page."

        primary_seen[(recommended, primary)] += 1
        source_priority = row["Suggested priority"].upper()
        if metric and int(float(metric["impressions"] or 0)) > 0 and not unsupported:
            position = float(metric["position"])
            priority = "P0" if 4 <= position <= 20 else "P1"
            implementation = "EXISTING PAGE - GSC MONITORING"
            target = "TOP 5" if position <= 10 else "TOP 10" if position <= 20 else "TOP 20"
        elif unsupported or international or nonlocal_city:
            priority = "P3"
            implementation = "RESEARCH / BUSINESS VALIDATION"
            target = "NOT SET"
        else:
            priority = "P1" if source_priority == "HIGH" else "P2"
            implementation = "MAPPED - NO NEW PAGE"
            target = "TOP 10" if priority == "P1" else "NOT SET"

        if unsupported:
            readiness = "NOT READY - OFFERING VERIFICATION REQUIRED"
        elif international:
            readiness = "NOT READY - SERVICE VALIDATION REQUIRED"
        elif nonlocal_city:
            readiness = "RESEARCH ONLY - UNIQUE LOCAL VALUE REQUIRED"
        elif claim_term:
            readiness = "EXISTING PAGE - CLAIM LANGUAGE EXCLUDED"
        else:
            readiness = "EXISTING PAGE - REVIEW AGAINST QUERY"

        cannibalization = "HIGH" if disposition == "MERGED INTO EXISTING CLUSTER" and any(t in norm for t in ("custom", "supplier", "manufacturer", "bulk", "wholesale")) else "MEDIUM" if disposition.startswith("DEFERRED") else "LOW"
        master.append({
            "Original Keyword": original,
            "Normalized Keyword": norm,
            "Category": row["Category"],
            "Topic Cluster": cluster,
            "Primary Keyword": primary,
            "Secondary Keyword Group": modifiers(norm),
            "Search Intent": row["Search intent"],
            "Buyer Persona": buyer_persona(norm),
            "Country": country,
            "City": city or "N/A",
            "Source Relevance": row["Source relevance"],
            "Evidence Type": row["Evidence type"],
            "Existing URL": existing_url or "NONE",
            "Recommended URL": recommended,
            "Page Type": page_type,
            "Keyword Disposition": disposition,
            "Disposition Reason": disposition_reason,
            "Priority": priority,
            "Product Availability": availability,
            "Content Readiness": readiness,
            "Cannibalization Risk": cannibalization,
            "Search Volume": "UNKNOWN",
            "Ranking Difficulty": "UNKNOWN",
            "Current Position": metric["position"] if metric else "UNKNOWN",
            "Current Impressions": metric["impressions"] if metric else "UNKNOWN",
            "Current Clicks": metric["clicks"] if metric else "UNKNOWN",
            "Current CTR": metric["ctr"] if metric else "UNKNOWN",
            "Target Ranking": target,
            "Implementation Status": implementation,
        })

    assert len(master) == len(source_rows)
    assert all(row["Recommended URL"] for row in master)
    write_csv("PRINTKEE_COMPLETE_KEYWORD_MASTER.csv", MASTER_COLUMNS, master)

    by_url = defaultdict(list)
    for row in master:
        by_url[row["Recommended URL"]].append(row)
    url_map = []
    rank = {"P0": 0, "P1": 1, "P2": 2, "P3": 3}
    for url, rows in sorted(by_url.items()):
        primary_counts = Counter(r["Primary Keyword"] for r in rows)
        dispositions = Counter(r["Keyword Disposition"] for r in rows)
        clusters = Counter(r["Topic Cluster"] for r in rows)
        url_map.append({
            "Recommended URL": url,
            "Page Type": Counter(r["Page Type"] for r in rows).most_common(1)[0][0],
            "Primary Keyword": primary_counts.most_common(1)[0][0],
            "Topic Cluster": clusters.most_common(1)[0][0],
            "Keyword Count": len(rows),
            "Top Secondary Keywords": "; ".join(r["Original Keyword"] for r in rows[:12]),
            "Disposition Mix": "; ".join(f"{k}: {v}" for k, v in dispositions.items()),
            "Existing URL": url if any(r["Existing URL"] != "NONE" for r in rows) else "NONE",
            "Product Availability": Counter(r["Product Availability"] for r in rows).most_common(1)[0][0],
            "Content Readiness": Counter(r["Content Readiness"] for r in rows).most_common(1)[0][0],
            "Priority": min((r["Priority"] for r in rows), key=lambda x: rank[x]),
            "Cannibalization Control": "One canonical owner; merge close modifiers and spelling variants",
        })
    write_csv("PRINTKEE_KEYWORD_URL_MAP.csv", list(url_map[0]), url_map)

    gap_groups = defaultdict(list)
    for row in master:
        if row["Keyword Disposition"] in {"EXPANSION OPPORTUNITY", "DEFERRED - LOCATION VALIDATION", "DEFERRED - INTERNATIONAL VALIDATION"}:
            gap_groups[(row["Topic Cluster"], row["Keyword Disposition"], row["Recommended URL"])].append(row)
    gaps = []
    for (cluster, disposition, url), rows in sorted(gap_groups.items()):
        gaps.append({
            "Topic Cluster": cluster, "Gap Type": disposition, "Keyword Count": len(rows),
            "Representative Keywords": "; ".join(r["Original Keyword"] for r in rows[:10]),
            "Recommended URL or Hub": url, "Product Availability": Counter(r["Product Availability"] for r in rows).most_common(1)[0][0],
            "Evidence Required": "Owner-confirmed offering/service area and useful distinct content; verified demand where available",
            "Recommended Action": "Keep non-indexable research record; validate before creating or expanding a page",
            "Priority": min((r["Priority"] for r in rows), key=lambda x: rank[x]),
        })
    write_csv("PRINTKEE_CONTENT_GAP_REPORT.csv", list(gaps[0]), gaps)

    location_groups = defaultdict(list)
    for row in master:
        if row["City"] != "N/A" or row["Country"] not in {"India", "India / Global research"}:
            location_groups[(row["Country"], row["City"])].append(row)
    locations = []
    for (country, city), rows in sorted(location_groups.items()):
        existing = next((r["Existing URL"] for r in rows if r["Existing URL"] != "NONE" and r["Page Type"] == "LOCATION"), "NONE")
        if country != "India":
            decision = "DEFER - INTERNATIONAL SERVICE VALIDATION"
        elif existing != "NONE":
            decision = "EXISTING LOCATION PAGE - MONITOR"
        else:
            decision = "RESEARCH ONLY - DO NOT PUBLISH DOORWAY PAGE"
        locations.append({
            "Country": country, "City": city, "Keyword Count": len(rows), "Existing URL": existing,
            "Recommended Hub": "/locations" if country == "India" else "/corporate-gifting",
            "Decision": decision, "Representative Keywords": "; ".join(r["Original Keyword"] for r in rows[:8]),
            "Unique Value Required": "Verified service coverage, ordering/delivery constraints, locally relevant FAQs, real examples, and product links",
            "Unsupported Claims Prohibited": "Office, local manufacturing, guaranteed delivery, testimonials, or worldwide service without evidence",
        })
    write_csv("PRINTKEE_LOCATION_OPPORTUNITIES.csv", list(locations[0]), locations)

    comparison = [
        ["Architecture", "Flat categories/subcategories plus ~130 location pages", "Nested catalog plus controlled editorial/location hubs", "ADOPT WITH IMPROVEMENTS", "Preserve catalog ownership and avoid cloned geography"],
        ["Keyword mapping", "Modifier × product × place", "2,796-row canonical cluster map", "ADOPT", "One owner per distinct intent"],
        ["Commercial modifiers", "Manufacturer/supplier/wholesale repeated", "Bulk/custom sourcing language; claims evidence-gated", "REQUIRES FURTHER EVIDENCE", "Do not imply manufacturer/wholesaler status"],
        ["Location pages", "Homepage-like city substitution", "Six differentiated Delhi NCR pages", "REJECT CLONING", "Validate service and unique value before expansion"],
        ["Content", "Short templated copy", "Product-led procurement guidance and FAQs", "ADOPT WITH IMPROVEMENTS", "Use verified facts, not filler"],
        ["Internal links", "Footer, breadcrumbs, HTML hubs", "Navigation, related modules, sitemap and controlled hubs", "ADOPT", "Add contextual blog-to-commercial links"],
        ["Schema", "Not verified in source report", "Organization, WebSite, Breadcrumb, Product, ItemList, FAQ, BlogPosting", "ADOPT WITH IMPROVEMENTS", "Only schema matching visible verified data"],
        ["Indexation", "Index/follow at scale", "Lifecycle and quality-gated indexability", "REJECT COMPETITOR METHOD", "Drafts/noindex/archives excluded"],
        ["Image SEO", "Geo-keyword-stuffed alt/title", "Descriptive alt text and modern formats", "REJECT COMPETITOR METHOD", "Describe the image rather than the query"],
        ["Trust", "Factsheet/logos and inconsistent off-site NAP", "Business details and requirement-led quote flow", "ADOPT WITH IMPROVEMENTS", "Verify all facts and third-party profiles"],
    ]
    comparison_rows = [dict(zip(["Dimension", "Purple Palette Evidence", "Printkee Current Position", "Decision", "Implementation Note"], row)) for row in comparison]
    write_csv("PRINTKEE_COMPETITOR_COMPARISON.csv", list(comparison_rows[0]), comparison_rows)

    backlog = [
        ["SEO-001", "P0", "Data", "Reconcile all 2,796 keyword rows", "Complete", "PRINTKEE_COMPLETE_KEYWORD_MASTER.csv", "Zero blank recommended URLs"],
        ["SEO-002", "P0", "Technical", "Run frontend production build and TypeScript checks", "Complete", "frontend-next", "Successful build/type generation"],
        ["SEO-003", "P0", "Technical", "Run backend syntax and SEO quality tests", "Complete", "backend-next", "All executed checks pass"],
        ["SEO-004", "P0", "Indexation", "Validate robots, sitemap eligibility, canonicals and 404 handling", "Complete", "Frontend regression suite", "No indexable draft/duplicate and no canonical errors"],
        ["SEO-005", "P1", "Analytics", "Add standard GA4 view_item, select_item, contact and search events", "Complete", "Frontend", "Events fire without PII"],
        ["SEO-006", "P1", "Admin", "Add validated CSV import/export to the existing SEO admin", "Complete", "Backend/frontend admin", "Dry-run validation and protected writes"],
        ["SEO-007", "P1", "Content", "Review high-impression GSC pages", "Ongoing", "Existing canonical pages", "Improved CTR/position in comparable 28-day windows"],
        ["SEO-008", "P1", "Internal links", "Connect relevant blogs to commercial categories/products", "Backlog", "/blogs and articles", "Every approved guide has relevant contextual links"],
        ["SEO-009", "P2", "Product data", "Verify MOQ, methods, materials, artwork and delivery constraints", "Requires owner input", "Catalog records", "Owner/supplier-approved specifications"],
        ["SEO-010", "P2", "Locations", "Validate non-Delhi-NCR city demand and service feasibility", "Research", "/locations", "Only differentiated approved pages proceed"],
        ["SEO-011", "P2", "Content", "Create reviewed briefs for supported content gaps", "Backlog", "/blogs", "Distinct intent and commercial links"],
        ["SEO-012", "P3", "Expansion", "Assess printing, labels, packaging, photo and decor offerings", "Requires business decision", "/contact", "Offering and operations confirmed before publication"],
        ["SEO-013", "P3", "International", "Validate UAE/US/UK/Canada/Australia/Singapore demand and fulfilment", "Research", "/corporate-gifting", "Service, currency, delivery and localisation confirmed"],
        ["SEO-014", "P3", "Off-page", "Audit legitimate directories and NAP consistency", "Research", "External profiles", "Accurate consistent business details"],
        ["SEO-015", "P1", "Measurement", "Refresh GSC query-by-page/country/device data monthly", "Backlog", "Search Console export", "Repeatable 30/60/90-day reporting"],
    ]
    backlog_columns = ["ID", "Priority", "Workstream", "Action", "Status", "Scope", "Acceptance Criteria"]
    write_csv("PRINTKEE_SEO_IMPLEMENTATION_BACKLOG.csv", backlog_columns, [dict(zip(backlog_columns, row)) for row in backlog])

    catalog = catalog_tree()
    crawl_path = AUDIT_DIR / "SEO_CRAWL_REPORT.json"
    crawl = json.loads(crawl_path.read_text(encoding="utf-8")) if crawl_path.exists() else {"pages": []}
    crawled_paths = {page.get("path") or "/" for page in crawl.get("pages", [])}
    inventory = []
    static_routes = [
        ("/", "HOME"), ("/about", "UTILITY"), ("/contact", "LEAD"), ("/privacy-policy", "POLICY"),
        ("/brands", "BRAND_HUB"), ("/blogs", "BLOG_HUB"), ("/locations", "LOCATION_HUB"),
        ("/corporate-gifting", "SEO_HUB"), ("/industries", "SEO_HUB"), ("/use-cases", "SEO_HUB"),
        ("/sitemap", "HTML_SITEMAP"), ("/diwali-special", "SEASONAL"),
    ] + [(path, "LOCATION") for path in EXISTING_LOCATION_PATHS.values()]
    seen = set()
    def add_inventory(path, page_type, title, source, product_availability="N/A"):
        if path in seen:
            return
        seen.add(path)
        verified_public = path in crawled_paths
        inventory.append({
            "URL": path, "Page Type": page_type, "Title / Entity": title, "Source": source,
            "Indexability": "INDEXABLE" if verified_public else "NOT VERIFIED",
            "Canonical": f"{SITE}{'' if path == '/' else path}",
            "Sitemap Eligibility": "YES" if verified_public else "REVIEW AGAINST ACTIVE DATABASE",
            "Product Availability": product_availability,
            "Content Readiness": "VERIFIED IN SEO CRAWL" if verified_public else "SOURCE RECORD - PUBLICATION NOT VERIFIED",
            "Notes": "Existing crawled URL; preserve search equity" if verified_public else "Present in code/seed inventory but absent from the latest sitemap crawl",
        })
    for path, page_type in static_routes:
        add_inventory(path, page_type, path, "Code-backed")
    for category in catalog:
        category_path = f"/{category['slug']}"
        add_inventory(category_path, "CATEGORY", category["name"], "MongoDB seed/catalog", "AVAILABLE")
        for sub in category["subcategories"]:
            sub_path = f"{category_path}/{sub['slug']}"
            add_inventory(sub_path, "SUBCATEGORY", sub["name"], "MongoDB seed/catalog", "AVAILABLE")
            for product in sub["products"]:
                slug = str(product.get("slug") or "").strip().replace(" ", "-")
                if slug:
                    add_inventory(f"{sub_path}/{slug}", "PRODUCT", product.get("name") or slug, "MongoDB seed/catalog", "AVAILABLE")
    if crawl_path.exists():
        for page in crawl.get("pages", []):
            path = page.get("path") or "/"
            if path in seen:
                continue
            if path.startswith("/blog/"):
                page_type = "BLOG"
            elif path.startswith("/brands/"):
                page_type = "BRAND"
            elif path.startswith("/diwali-special/hampers/"):
                page_type = "SEASONAL_PRODUCT"
            else:
                page_type = "DYNAMIC_PUBLIC"
            add_inventory(path, page_type, page.get("title") or path, "Verified prior SEO crawl")
    write_csv("PRINTKEE_SEO_PAGE_INVENTORY.csv", list(inventory[0]), inventory)

    internal = []
    for item in inventory:
        path = item["URL"]
        depth = 0 if path == "/" else len(path.strip("/").split("/"))
        if item["Page Type"] in {"HOME", "CATEGORY", "SEO_HUB", "LOCATION_HUB", "HTML_SITEMAP"}:
            risk = "LOW"
            action = "Retain navigation/footer/hub links"
        elif item["Page Type"] in {"SUBCATEGORY", "LOCATION", "SEASONAL"}:
            risk = "LOW TO MEDIUM"
            action = "Confirm parent, breadcrumb, related and HTML-sitemap links in crawl"
        else:
            risk = "MEDIUM"
            action = "Confirm parent grid, breadcrumb and at least one relevant related/contextual link"
        internal.append({
            "URL": path, "Page Type": item["Page Type"], "Estimated Click Depth": depth,
            "Inbound Internal Links": "NOT VERIFIED", "Outbound Internal Links": "NOT VERIFIED",
            "Orphan Risk": risk, "Known Discovery Path": "Global navigation / parent taxonomy / HTML sitemap" if depth <= 2 else "Parent product grid and breadcrumbs",
            "Recommended Action": action, "Audit Status": "SOURCE INVENTORY COMPLETE; LIVE LINK GRAPH REQUIRES CURRENT CRAWL",
        })
    write_csv("PRINTKEE_INTERNAL_LINK_AUDIT.csv", list(internal[0]), internal)

    dispositions = Counter(row["Keyword Disposition"] for row in master)
    metrics = sum(row["Current Impressions"] != "UNKNOWN" for row in master)
    summary = {
        "input_keyword_count": len(source_rows),
        "unique_original_keyword_count": len({row["Keyword"].strip().casefold() for row in source_rows}),
        "unique_normalized_keyword_count": len({row["Normalized Keyword"] for row in master}),
        "mapped_to_existing_pages": sum(row["Existing URL"] != "NONE" for row in master),
        "approved_new_pages": sum(row["Keyword Disposition"] == "APPROVED NEW PAGE" for row in master),
        "merged_into_existing_clusters": dispositions["MERGED INTO EXISTING CLUSTER"],
        "unsupported_or_expansion": dispositions["EXPANSION OPPORTUNITY"],
        "deferred_location": dispositions["DEFERRED - LOCATION VALIDATION"],
        "deferred_international": dispositions["DEFERRED - INTERNATIONAL VALIDATION"],
        "rejected": sum(count for name, count in dispositions.items() if name.startswith("REJECTED")),
        "unmapped": sum(not row["Recommended URL"] for row in master),
        "rows_with_exact_gsc_metrics": metrics,
        "recommended_url_count": len(by_url),
        "inventory_url_count": len(inventory),
        "dispositions": dict(dispositions),
    }
    (ROOT / "artifacts" / "printkee_keyword_reconciliation.json").write_text(json.dumps(summary, indent=2), encoding="utf-8")
    print(json.dumps(summary, indent=2))


if __name__ == "__main__":
    main()
