# Product indexability follow-up — 13 November 2026

## Corrected scope and outcome

The earlier 153 `noindex` count comprised **151 direct product URLs**, **one legacy product URL that redirects to a `noindex` product**, and **the `/blogs/post` utility page**. It was not 153 distinct direct product pages. All 151 direct product URLs were matched to the connected MongoDB records. All 151 records are published, active, undeleted, and attached to active matching category and subcategory records.

**Previously `noindex` products now eligible: 0. Still excluded: 151 direct product URLs.** No database records were edited. The one redirected source remains a redirect and should not receive an indexing request. The current 234-record catalog has 18 products passing the gate, unchanged from the baseline.

The [product data update list](GSC_PRODUCT_DATA_UPDATES_2026-11-13.csv) gives the exact failing checks and fields to update for each of the 151 URLs. Counts overlap:

| Failing condition among 151 direct product URLs | Count |
| --- | ---: |
| Combined short and long product description under 80 words | 149 |
| Visible long description under 40 words (new safeguard) | 149 |
| Meta description under 70 characters | 56 |
| Fewer than three useful detail groups | 27 |
| No image with at least eight characters of alt text | 1 |

All 151 primary image URLs returned HTTP 200. Exact long-description hashes have no duplicates *within the 151 direct excluded URLs*. Across the 234-record catalog, one pair of excluded products shares an identical long description: `classic-steel-coffee-mug` and `stainless-steel-coffee-mug`. That pair needs editorial review before either page becomes indexable.

## Gate conditions and implementation

`backend-next/services/productSeoQuality.js` determines eligibility. `backend-next/routes/productRoutes.js` returns the result as `seoQuality`; the Next.js product route sets both standard and Googlebot robots metadata from `seoQuality.eligible`. `backend-next/routes/sitemap.js` filters through the same function before generating product sitemap entries.

The gate requires:

1. `isActive: true`, `status: published`, and no `deletedAt` value. The route also requires these before serving a product.
2. Nonempty `name` and `slug`.
3. An active category and subcategory with slugs, where the subcategory belongs to the product category. The route resolves the same relationship before serving the page.
4. No explicit `seo.indexable: false` override.
5. At least 40 words in `description.long`, which is the description rendered visibly in the product component. This closes a case where a long short description could pass the old 80-word total while the visible long description was empty.
6. At least 80 combined words in `description.short` and `description.long`.
7. At least three nonempty detail groups among material, sizes, colors, dimensions, weight, GSM, capacity, printing methods, branding areas, packaging, MOQ, lead time, sample availability, customization, care, features, intended uses, specifications, and additional information.
8. `seo.metaTitle` of at least 30 characters and `seo.metaDescription` of at least 70 characters.
9. At least one image with a URL and alt text of at least eight characters.

These thresholds are safeguards, not proof that copy is accurate or unique. The gate does not automatically detect semantic contradictions, near-duplicate copy, or a broken image URL; the audit checks the latter and flags known editorial conflicts. The current catalog provided no safe evidence to loosen the 80-word threshold: 148 of the 151 direct excluded products have at most 36 combined words, one has 42 words but a product identity mismatch, and the two longer records have other issues. No published product was automatically reclassified.

Three records especially need human verification before any indexability change:

- `kitchen-apron`: description calls the product cotton while attributes say polyester cotton blend. Its meta description misses the threshold by one character, but the material discrepancy matters more.
- `classic-steel-coffee-mug`: product data says stainless steel while SEO title, meta description, and features describe ceramic; the primary image alt text is empty. Its long description is duplicated on another excluded product.
- `matte-black-corporate-mug`: product name and description describe a spill-proof suction mug, while the SEO title describes a matte black corporate mug.

## The 19 already-indexable exported URLs

These are 11 product pages, four category or editorial landing pages, three brand pages, and one solution page. The [rendered-content check](GSC_INDEXABLE_RENDERED_2026-11-13.csv) compared server HTML with a headless Chrome DOM for all 19 against a production build connected to the database. All 19 returned HTTP 200, retained their title, H1, and self canonical after rendering, and had no `noindex` directive. The 19 titles were unique; normalized visible bodies had no exact duplicates or pairs with at least 90% text similarity in this sample. The sample pages had 421–802 visible words.

The internal-link check initially found no HTML links to product cards from their subcategory pages. `frontend-next/components/ProductDisplay.jsx` navigated with click handlers only. Product images and names now use real Next.js links, preserving the existing click actions and analytics. After rebuilding with the backend running, each of the 19 URLs had at least one incoming HTML link from a relevant checked page. The [rendered-content check](GSC_INDEXABLE_RENDERED_2026-11-13.csv) names the linking pages. This is a targeted link check, not a complete sitewide orphan crawl.

## Before and after verification

| Check | Before | After local build with connected DB |
| --- | --- | --- |
| Catalog products passing quality gate | 18 of 234 | 18 of 234 |
| Direct GSC product URLs excluded | 151 of 151 | 151 of 151; all 200, `noindex`, absent from sitemap |
| Eligible products | 18 | All 18 return 200, have no restrictive robots directive, self canonicals, H1s, and sitemap entries |
| Exported sitemap URLs | 19 | All 19 return 200, have indexable robots and self canonicals; server/rendered signals agree |
| Checked incoming links to 19 URLs | 14 had no link from the checked source pages | All 19 have at least one checked HTML link |
| Product primary images in the 151 | Not tested | 151 of 151 returned 200 |

`npm.cmd run build`, `node scripts/testSeoQuality.js`, and `npm.cmd test` passed. The route verification checked all 151 excluded products, all 18 eligible products, and all 19 exported sitemap URLs against the connected local backend with zero signal mismatches. Headless Chrome completed for all 19. The local build was rebuilt while the backend was available, avoiding an empty prerendered brand listing.

## Search Console requests and next data work

There are **zero newly eligible product URLs** to request indexing for. The 19 already-indexable URLs in the rendered-content check are candidates for selective live inspection and a single indexing request *after deployment* if Search Console still reports them excluded. Prioritize the commercially important product and category URLs; do not request indexing for the 151 still marked `noindex`, the legacy redirect, or `/blogs/post`.

Update the exact fields shown in the product data update list using verified catalog information. After each important record is improved, rerun the gate and check its live 200 response, robots directive, canonical, visible content, image, and sitemap entry together. Search Console may take time to recrawl, and only Search Console can confirm indexing. No code was deployed or database record changed in this work.
