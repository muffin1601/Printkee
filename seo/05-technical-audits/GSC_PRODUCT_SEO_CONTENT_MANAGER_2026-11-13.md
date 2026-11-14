# Product SEO Content Manager — implementation and current status

## Review outcome

The 151 direct product URLs in `GSC_PRODUCT_DATA_UPDATES_2026-11-13.csv` were reviewed against the connected 234-record MongoDB catalog. Their field-level failures remain as recorded: 149 have fewer than 80 combined description words, 149 have fewer than 40 visible long-description words, 56 have inadequate meta descriptions under the current site policy, 27 have fewer than three counted product detail groups, and one lacks descriptive image alt text. Counts overlap. These thresholds are **Printkee policy**, not Google requirements. Most excluded pages are genuinely thin; lowering the word thresholds across the catalog would not resolve sparse facts or conflicting copy.

No product record was edited or approved in this work. The current catalog has 18 quality-gate eligible products and 216 excluded products overall. Among the 151 GSC target products, **0 are newly eligible and 151 remain excluded**. The local XML sitemap contains **225 URLs**, unchanged. The 19 technically indexable URLs in `GSC_INDEXABLE_RENDERED_2026-11-13.csv` remain the only URLs from this audit ready for selective Search Console live inspection after deployment. They are not confirmed indexed.

## Admin workflow

The new `/admin/product-seo` page uses the existing admin layout and authentication. It provides product search; eligibility and issue filters; missing-field reasons; editable short and visible long descriptions, SEO title, meta description, and image alt text; a search preview; and a server-side quality preview. An admin can select database facts they have verified and request an AI draft. The draft appears separately and is copied into the editor only when the admin chooses to do so. No draft call writes to MongoDB.

Saving requires a separate review confirmation, validates content lengths and image alt text, checks for near-duplicate descriptions, and uses the product version to avoid overwriting another admin's change. Known fact conflicts require an additional verification confirmation. The save endpoint updates only approved content fields and records an admin audit event. It does not change price, route, taxonomy, product status, or customizer data.

The AI request uses the [Responses API with structured output](https://developers.openai.com/api/docs/guides/structured-outputs) and `store: false`. It sends only the admin-selected fields from the current database record; previous marketing descriptions and tax codes are excluded from the fact set. It instructs the model to avoid unsupported claims and padding, and returns source field keys and review notes. Human review remains necessary because structured output does not establish factual accuracy.

**AI configuration is currently blocked:** the existing `OPENAI_API_KEY` was rejected by the live API with HTTP 401. The manager reports that error without exposing the key. A valid backend API key is required before live draft generation can be used. A mocked draft call passed and confirmed no database write.

## Three unresolved product conflicts

- `kitchen-apron`: database copy says cotton; its material attribute says polyester cotton blend. The older seed content also contains both descriptions, so it cannot establish which is correct.
- `classic-steel-coffee-mug`: product name, long description, and material identify stainless steel; SEO copy and some features describe ceramic. The primary image alt text is empty. The long description duplicates another excluded mug record.
- `matte-black-corporate-mug`: the current name and long description describe a spill-proof suction mug, while SEO copy describes a matte black mug. An older seed file describes yet another ceramic version.

These records are flagged in the admin manager. Product identity, material, and supported branding claims require supplier or catalog-owner verification before correction. No conflicting product was silently rewritten.

## Verification

- Frontend production build passed and includes `/admin/product-seo`.
- Eight backend tests passed, including fact selection, validation, safe draft response handling, and no automatic mutation.
- Authenticated live read endpoint returned 234 products, 18 eligible, 216 excluded, and three flagged. Invalid previews returned 422; unreviewed saves returned 400; flagged drafting without verification returned 409.
- The local admin route returned HTTP 200 and its authenticated page rendered the queue and editor in headless Chrome. The visual check showed the existing admin layout intact.
- The local sitemap returned HTTP 200 with 225 URLs and no admin URLs; the backend sitemap API returned 18 eligible products.
- The configured AI key test returned HTTP 401, surfaced by the manager as a 503 configuration error. No database writes or deployment occurred.

## Files changed for this stage

- `backend-next/services/productSeoContent.js`: fact selection, validation, safe draft generation, and duplicate-content checks.
- `backend-next/routes/productSeoContentRoutes.js` and `backend-next/server.js`: authenticated list, detail, preview, draft, and approval endpoints.
- `backend-next/test/productSeoContent.test.js`: focused safety and validation tests.
- `frontend-next/app/admin/product-seo/page.jsx`, `frontend-next/components/Dashboard/ProductSeoContentManager.jsx`, and `frontend-next/styles/admin/ProductSeoContentManager.module.css`: admin review interface.
- `frontend-next/components/Dashboard/Sidebar.jsx`: navigation entry.

After an admin verifies supplier facts and approves individual records, rerun the live HTTP, robots, canonical, visible-content, sitemap, and internal-link checks for the changed URLs. Request indexing selectively in Search Console only after those checks pass. No indexing outcome can be claimed from this work.
