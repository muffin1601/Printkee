#!/usr/bin/env python3
# Verify EVERY approved product-document line is visible in the ACTUAL rendered
# HTML served by the running frontend (http://localhost:3000), not just the DB.
import json, re, html, urllib.request

URLS = json.load(open("C:/tmp/prod_urls.json", encoding="utf-8"))
PC   = json.load(open("C:/tmp/prodcontent.json", encoding="utf-8"))  # approved doc content per slug
BASE = "http://localhost:3000"

def norm(s):
    s = html.unescape(s)
    s = re.sub(r"<[^>]+>", " ", s)
    s = s.replace("’","'").replace("‘","'").replace("“",'"').replace("”",'"')
    s = s.replace("₹","rs").replace("&","and")
    s = s.lower()
    s = re.sub(r"[^a-z0-9 ]", " ", s)
    s = re.sub(r"\s+", " ", s).strip()
    return s

def fetch(path):
    req = urllib.request.Request(BASE+path, headers={"User-Agent":"audit"})
    return urllib.request.urlopen(req, timeout=60).read().decode("utf-8","ignore")

rows = []
order = list(URLS.keys())
for slug in order:
    c = PC[slug]
    # Build the full list of approved content units for this product.
    units = []
    units.append(("SEO title", c["title"]))
    for p in c["intro"]:        units.append(("intro", p))
    for it in c["idealFor"]:    units.append(("idealFor", it))
    for it in c["features"]:    units.append(("features", it))
    for q,a in c["faqs"]:       units.append(("faq", q)); units.append(("faq", a))
    units.append(("CTA title", c["ctaTitle"]))
    units.append(("CTA desc", c["cta"]))

    hayn = norm(fetch(URLS[slug]))
    missing = [(sec,t) for sec,t in units if norm(t) not in hayn]
    total = len(units)
    rows.append((slug, total, total-len(missing), missing))

print(f"{'PAGE':40} {'DOC':>4} {'RENDERED':>9}  STATUS")
allpass = True
for slug,total,rendered,missing in rows:
    status = "PASS" if not missing else "FAIL"
    if missing: allpass = False
    print(f"{slug:40} {total:>4} {rendered:>9}  {status}")
    for sec,t in missing[:10]:
        print(f"       MISSING [{sec}] {t[:110]}")
print()
print("ALL 22 PRODUCTS PASS" if allpass else "SOME PRODUCTS FAILED")
