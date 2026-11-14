"""Make temporary contact sheets for visual QA of local primary product photos."""
import json
import sys
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

root = Path(__file__).resolve().parents[1]
source_path = Path(sys.argv[1]) if len(sys.argv) > 1 else root / 'seo/05-technical-audits/GSC_PRODUCT_CONTENT_SOURCE_BACKUP_2026-11-13.json'
rows = json.loads(source_path.read_text(encoding='utf-8'))['rows']
if len(sys.argv) > 2 and sys.argv[2] == '--currently-eligible':
    baseline = json.loads((root / 'seo/05-technical-audits/GSC_PRODUCT_GATE_BASELINE_234_2026-11-13.json').read_text(encoding='utf-8'))['rows']
    eligible_slugs = {row['slug'] for row in baseline if row['quality']['eligible']}
    rows = [row for row in rows if row['slug'] in eligible_slugs]
out_dir = root / 'seo/05-technical-audits/_image_qa'
out_dir.mkdir(exist_ok=True)
font = ImageFont.load_default()
for page in range((len(rows) + 24) // 25):
    sheet = Image.new('RGB', (1250, 1100), '#eeeeee')
    draw = ImageDraw.Draw(sheet)
    for slot, row in enumerate(rows[page * 25:(page + 1) * 25]):
        x, y = (slot % 5) * 250, (slot // 5) * 220
        url = row['images'][0]['url'] if row['images'] else ''
        image_path = root / 'frontend-next/public' / url.lstrip('/')
        try:
            with Image.open(image_path) as photo:
                photo.thumbnail((225, 165))
                sheet.paste(photo.convert('RGB'), (x + (250 - photo.width) // 2, y + 3))
        except (OSError, ValueError):
            draw.text((x + 5, y + 65), 'REMOTE/MISSING IMAGE', fill='red', font=font)
        draw.text((x + 5, y + 173), f"{page * 25 + slot + 1:03} {row['slug'][:30]}", fill='black', font=font)
        draw.text((x + 5, y + 189), (row['images'][0].get('altText') or 'NO ALT')[:33] if row['images'] else 'NO IMAGE', fill='#333333', font=font)
    sheet.save(out_dir / f'contact-{page + 1}.jpg', quality=88)
print(out_dir)
