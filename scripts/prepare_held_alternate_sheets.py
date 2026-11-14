"""Contact sheets of existing alternate images for held product review."""
import csv
import json
from pathlib import Path
from PIL import Image, ImageDraw

root = Path(__file__).resolve().parents[1]
with (root / "seo/05-technical-audits/GSC_PRODUCT_SEO_FINAL_REVIEW_151_2026-11-14.csv").open(encoding="utf-8-sig", newline="") as source:
    held = [r for r in csv.DictReader(source) if r["review_status"] == "HOLD_FACT_VERIFICATION"]
catalog = json.loads((root / "seo/05-technical-audits/GSC_PRODUCT_GATE_HANDOFF_SNAPSHOT_2026-11-13.json").read_text(encoding="utf-8"))["rows"]
by_id = {p["id"]: p for p in catalog}
items = []
for row in held:
    product = by_id[row["product_id"]]
    images = product.get("images", []) + product.get("subImages", [])
    if len(images) < 2:
        continue
    for n, image in enumerate(images[:4]):
        if image["url"].startswith("/assets/"):
            filename = root / "frontend-next/public" / image["url"].lstrip("/")
            if filename.exists():
                items.append((row["slug"], n + 1, filename))
output = root / ".local-backups/content-image-review"
output.mkdir(parents=True, exist_ok=True)
for page, start in enumerate(range(0, len(items), 40), 1):
    sheet = Image.new("RGB", (2000, 2000), "white")
    draw = ImageDraw.Draw(sheet)
    for slot, (slug, number, filename) in enumerate(items[start:start + 40]):
        picture = Image.open(filename).convert("RGB")
        picture.thumbnail((360, 190))
        x = (slot % 5) * 400 + (400 - picture.width) // 2
        y = (slot // 5) * 250 + 5
        sheet.paste(picture, (x, y))
        draw.text(((slot % 5) * 400 + 6, y + 198), f"{slug[:36]} #{number}", fill="black")
    sheet.save(output / f"held-alternates-{page}.jpg", quality=86)
print(json.dumps({"images": len(items), "sheets": page if items else 0}))
