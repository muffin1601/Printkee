# Product content scripts

Loads the approved product-page wording from **"Product Page Content Printkee.docx"**
into the 22 representative DB products (MongoDB Atlas, `MONGO_URI` in `.env`).

## Files
- `productContent.js` — the approved content, one entry per product (keyed by DB `slug`).
  Holds `title`, `intro`, `idealFor`, `features`, `faqs`, `ctaTitle`, `cta`. Editing the
  wording here is the single source of truth.
- `updateProductContent.js` — writes the content into each product:
  - `description.long`  ← `intro` paragraphs (HTML `<p>` blocks)
  - `description.short` ← `intro[0]` (plain; used for meta + JSON-LD)
  - `idealFor`, `features`, `faqs` ← their own fields
  - `title` / `ctaTitle` / `cta` are **kept in source but not written** (no page slot today).
- `backups/` — every `--write` run snapshots the previous values to a timestamped JSON
  here, so any change is revertable.

## Run
```bash
node scripts/updateProductContent.js          # DRY RUN — prints the plan, writes nothing
node scripts/updateProductContent.js --write  # applies, after writing a backup
```

## Requirements / gotchas
- `idealFor`, `features`, `faqs` **must exist on the Product schema** (`models/product.js`).
  Without them, Mongoose strips the fields on save and the API won't return them.
- After a schema change, **restart the backend** so the API serializes the new fields.
- The product page (`frontend-next`) renders: `description.long` as HTML, plus `idealFor`,
  `features`, and `faqs` as their own sections (`components/SingleProductDisplay.jsx`).

## Mapping (doc product → DB slug)
Most are exact name matches; these were representative picks (closest product in the
subcategory, since no exact-named product exists): wall clock → `classic-round-promotional-wall-clock`,
mouse → `classic-optical-usb-mouse`, keyboard → `standard-wired-office-keyboard`,
mouse pad → `xl-desktop-mouse-pad`, trophy → `golden-excellence-award-trophy`.
