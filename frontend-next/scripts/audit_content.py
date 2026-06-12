#!/usr/bin/env python3
# Content audit: every source-document line vs the actual rendered content path.
# Rendered paths:
#   Category page    -> data/categorydescriptions.jsx + data/faqsdata.jsx (FAQs) + seoConfig h1/h2
#   Subcategory page -> data/subcategorydescriptions.jsx + data/productfaqs.jsx (FAQs) + seoConfig h2
#   Product page     -> MongoDB description.long/short + idealFor + features + faqs
import json, re, sys, html

DATA = json.load(open("C:/tmp/data.json", encoding="utf-8"))
DB   = json.load(open("C:/tmp/db.json", encoding="utf-8"))

def norm(s):
    s = html.unescape(s)
    s = re.sub(r"<[^>]+>", " ", s)            # strip HTML
    s = s.replace("’", "'").replace("‘", "'")
    s = s.replace("“", '"').replace("”", '"')
    s = s.replace("₹", "rs").replace("&", "and")
    s = s.lower()
    s = re.sub(r"[^a-z0-9 ]", " ", s)
    s = re.sub(r"\s+", " ", s).strip()
    return s

# Lines that are document markup / content-team instructions, not page content.
INSTR = re.compile(r"change hoga|kitne|cord ka content|old content remove|^\(h2|^\(h\d|^\[heading|^\(\d+\)|^subcategory|^category\b|^product page", re.I)
MARK = re.compile(r"^\[heading\d?\]|\(h2\s*\)?|\(h\d\)|\(\(.*?\)\)?", re.I)

def clean_doc_line(raw):
    s = raw.strip()
    if not s: return None
    if INSTR.search(s): return None
    # strip leading markers like "[Heading2] ", "(H2) ", numbered "3. "
    s = re.sub(r"^\[heading\d?\]\s*", "", s, flags=re.I)
    s = re.sub(r"^\(+\s*h\d\s*\)+\s*", "", s, flags=re.I)
    s = re.sub(r"\(\(\s*change hoga[^)]*\)?\)?", "", s, flags=re.I)
    s = re.sub(r"^\d+\.\s*", "", s)           # FAQ numbering "3. Question"
    s = s.strip()
    if not s: return None
    if INSTR.search(s): return None
    return s

def read_doc(path):
    return open(path, encoding="utf-8").read().split("\n")

def audit_block(lines, haystack_norm, label, results):
    """Check every cleaned doc line appears in the haystack."""
    missing = []
    for raw in lines:
        c = clean_doc_line(raw)
        if not c: continue
        n = norm(c)
        if len(n) < 4: continue
        if n not in haystack_norm:
            missing.append(c)
    results.append((label, missing))

# ---------------- CATEGORIES ----------------
cat_bounds = [
    ("apparel-and-accessories", 5), ("bags-and-travel", 106), ("drink-ware", 197),
    ("eco-products", 287), ("collection", 393), ("office-and-writing", 482),
    ("technology-accessories", 570), ("trophy-and-momento", 708),
]
cdoc = read_doc("C:/tmp/category.txt")
cat_results = []
for i,(slug,start) in enumerate(cat_bounds):
    end = cat_bounds[i+1][1]-1 if i+1 < len(cat_bounds) else len(cdoc)
    block = cdoc[start-1:end]
    hay = DATA["cat"].get(slug,"")
    f = DATA["faq"].get(slug,{})
    hay += " " + (f.get("heading","") or "") + " " + (f.get("description","") or "")
    for q in f.get("faqs",[]): hay += " " + q.get("question","") + " " + q.get("answer","")
    seo = DATA["seo"].get("/"+slug,{})
    hay += " " + (seo.get("h1","") or "") + " " + (seo.get("h2","") or "")
    audit_block(block, norm(hay), "CATEGORY "+slug, cat_results)

# ---------------- SUBCATEGORIES ----------------
sub_bounds = [
    ("polo-t-shirts",5),("backpacks",68),("sipper",133),("cork-sheet",205),
    ("welcome-kits",274),("promotional-clocks",355),("keychains",418),
    ("notebooks-and-diary-sets",482),("pen-and-writing-set",584),
    ("lanyard-and-id-card",646),("wireless-charging",701),("computer-accessories",766),
    ("power-banks",838),("desktop-and-mousepad",910),("trophy-and-momento",970),
]
sdoc = read_doc("C:/tmp/subcategory.txt")
sub_results = []
for i,(slug,start) in enumerate(sub_bounds):
    end = sub_bounds[i+1][1]-1 if i+1 < len(sub_bounds) else len(sdoc)
    block = sdoc[start-1:end]
    hay = DATA["sub"].get(slug,"")
    for q in DATA["pf"].get(slug,[]): hay += " " + q.get("question","") + " " + q.get("answer","")
    seo = DATA["seo"].get(slug,{})  # subcat seo keyed by full path; skip h2 contribution
    audit_block(block, norm(hay), "SUBCATEGORY "+slug, sub_results)

# ---------------- PRODUCTS ----------------
prod_order = ["personalized-polo-t-shirts","classic-navy-baseball-cap","black-corporate-shirt",
"classic-silk-tie","kitchen-apron","corporate-bomber-jacket","economy-corporate-backpack",
"premium-stainless-steel-sipper-bottle","classic-ceramic-coffee-mug","essential-employee-welcome-kit",
"classic-round-promotional-wall-clock","rectangle-metal-keychain","leather-executive-file-folder",
"a5-spiral-bound-notebook","executive-pen-gift-set","premium-polyester-lanyard-id-card",
"3-in-1-wireless-charging-dock","classic-optical-usb-mouse","standard-wired-office-keyboard",
"10000mah-slim-power-bank","xl-desktop-mouse-pad","golden-excellence-award-trophy"]
cta_lines = [36,100,137,177,214,252,287,320,358,390,423,461,495,528,563,595,630,663,696,731,765,799]
pdoc = read_doc("C:/tmp/product.txt")
prod_results = []
prev = 0
for i,slug in enumerate(prod_order):
    start = prev; end = cta_lines[i]; prev = cta_lines[i]
    block = pdoc[start:end]   # excludes the CTA heading line itself
    d = DB.get(slug,{})
    hay = d.get("long","") + " " + d.get("short","")
    for it in d.get("idealFor",[]): hay += " " + it
    for it in d.get("features",[]): hay += " " + it
    for q in d.get("faqs",[]): hay += " " + q.get("question","") + " " + q.get("answer","")
    audit_block(block, norm(hay), "PRODUCT "+slug, prod_results)

def report(title, results):
    print("="*70); print(title); print("="*70)
    p=f=0
    for label, missing in results:
        if not missing:
            p+=1; print(f"PASS  {label}")
        else:
            f+=1; print(f"FAIL  {label}  ({len(missing)} missing lines)")
            for m in missing[:40]:
                print(f"        - {m[:140]}")
    print(f"\n  {title}: {p} pass, {f} fail\n")
    return p,f

cp,cf = report("CATEGORIES", cat_results)
sp,sf = report("SUBCATEGORIES", sub_results)
pp,pf2 = report("PRODUCTS", prod_results)
print("#"*70)
print(f"TOTALS: categories {cp}/{cp+cf} | subcategories {sp}/{sp+sf} | products {pp}/{pp+pf2}")
