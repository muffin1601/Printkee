# Category & subcategory content scripts

Loads the approved wording from the content docs into the frontend data files.
These are one-off generators kept for reproducibility — the data files they write
(`data/*.jsx`) are what the app actually reads.

## Subcategory content — "Subcategory Content printkee.docx"
- `apply_subcontent.py` — applies one or more batch modules in place, updating:
  - `data/subcategorydescriptions.jsx` — rich HTML body (intro, Features, Printing/
    Customization Options, Best Suitable For, Why Choose) per subcategory slug
  - `data/productfaqs.jsx` — FAQ arrays per subcategory slug
  - `data/seoConfig.js` — the on-page `h2` for each subcategory route
- `sub_batch1.py`, `sub_batch2.py`, `sub_batch3.py` — the approved content (15 subcategories).

```bash
python scripts/apply_subcontent.py scripts/sub_batch1.py scripts/sub_batch2.py scripts/sub_batch3.py
```

## Category content — "Category Page Content printkee.docx"
- `apply_categorycontent.py` — generates `data/categorydescriptions.jsx` (rich HTML body:
  intro, Range, Features, Customization, Best Suitable For, Why Choose, Bulk Benefits,
  Industries) and updates `data/faqsdata.jsx` (FAQs) + `data/seoConfig.js` (`h2`) for the
  8 categories. Content lives in `cat_content.py`.

```bash
python scripts/apply_categorycontent.py
```

## Rendering
- Category body → `components/category/CategoryDescription.jsx` (rendered in
  `components/SubcategoryDisplay.jsx`).
- Subcategory body → `components/category/SubcategoryDescription.jsx`; FAQs →
  `components/category/FAQSection.jsx`.

All generators are idempotent — re-running reproduces the same data files.
Edit the wording in the `*_batch*.py` / `cat_content.py` modules, then re-run.
