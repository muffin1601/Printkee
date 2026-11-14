"""Local contact sheets for visually reviewing the 60 existing product photos."""
import csv
import json
from pathlib import Path
from PIL import Image, ImageDraw

root = Path(__file__).resolve().parents[1]
review = root / "seo/05-technical-audits/GSC_PRODUCT_SEO_FINAL_REVIEW_151_2026-11-14.csv"
catalog = json.loads((root / "seo/05-technical-audits/GSC_PRODUCT_GATE_HANDOFF_SNAPSHOT_2026-11-13.json").read_text(encoding="utf-8"))["rows"]
by_id = {item["id"]: item for item in catalog}
with review.open(encoding="utf-8-sig", newline="") as source:
    rows = [row for row in csv.DictReader(source) if row["review_status"] == "DRAFT_REQUIRES_ADMIN_REVIEW"]
output = root / ".local-backups/content-image-review"
output.mkdir(parents=True, exist_ok=True)
for page in range(3):
    sheet = Image.new("RGB", (2000, 1480), "white")
    draw = ImageDraw.Draw(sheet)
    for slot, row in enumerate(rows[page * 20:(page + 1) * 20]):
        product = by_id[row["product_id"]]
        image = root / "frontend-next/public" / product["images"][0]["url"].lstrip("/")
        picture = Image.open(image).convert("RGB")
        picture.thumbnail((370, 215))
        x = (slot % 5) * 400 + (400 - picture.width) // 2
        y = (slot // 5) * 370 + 10
        sheet.paste(picture, (x, y))
        label = f'{page * 20 + slot + 1}. {row["slug"]}'
        draw.text(((slot % 5) * 400 + 10, y + 222), label[:46], fill="black")
        detail = f'{product["attributes"].get("material", "")}; {", ".join(product["attributes"].get("color", []))}'
        draw.text(((slot % 5) * 400 + 10, y + 244), detail[:48], fill="black")
    sheet.save(output / f"unheld-{page + 1}.jpg", quality=90)
print(f"{len(rows)} images in {output}")
