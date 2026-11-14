# Printkee SEO — local deployment package, 14 November 2026

## Current decision

Do **not deploy or enable Gate V2 yet**. The local code is complete and tested, but zero product-content rows have been approved. The first four still need supplier/catalog-owner confirmation of image-to-SKU match and facts. The two currently eligible contradictory records need source-of-truth correction or an explicit decision to accept their temporary exclusion under V2. The three cork-sheet variants remain on canonical hold.

## Counts and deliverables

| Measure | Result |
| --- | ---: |
| MongoDB products | 234 |
| Search Console target product drafts | 151 |
| Proposed descriptions, unique SEO titles and unique meta descriptions | 151 each |
| Four priority drafts refined for final review | 4 |
| Live product records updated or approved | **0** |
| Currently eligible, flag off | 18 |
| Gate V2 eligible with an empty real-approval ledger, flag on locally | 16 |
| Newly eligible now | **0** |
| Still excluded with V2 empty ledger | 218 of 234 |
| Target drafts on factual/image hold | 88, including 77 suspected primary-image mismatches |
| Cork-sheet variants on canonical hold | 3 |
| Target drafts awaiting individual editorial, identity and image approval | 60 |
| Target drafts mechanically passing V2 with **synthetic** approvals | 44; this is not approval |
| URLs ready for Search Console indexing request | **0** |

The 151-row [final review CSV](GSC_PRODUCT_SEO_FINAL_REVIEW_151_2026-11-14.csv) is the content handoff. It incorporates the four conservative revisions, keeps all 88 factual/image holds, marks the three cork sheets as canonical holds, and has `approved=NO` on every row. The [four-product packet](GSC_FOUR_PRODUCT_PUBLICATION_REVIEW_2026-11-13.json) provides source values, images, alt text, image hashes and exact draft copy. The [first-four checklist](GSC_GATE_V2_FIRST_FOUR_APPROVAL_2026-11-13.md) gives the specific facts to confirm. No image was automatically replaced; there is no verified alternate source for the 77 mismatches.

The five known contradictory records remain unresolved: `personalized-polo-t-shirts`, `stainless-steel-double-wall-coffee-mug`, `kitchen-apron`, `classic-steel-coffee-mug`, and `matte-black-corporate-mug`. The first two are current-indexing legacy conflicts; the other three are held target drafts. Corrections require supplier/catalog evidence. No specification or price was guessed or changed.

The prior coverage audit's valid redirect destinations remain in place. Its five missing routes still have no verified business replacement, so no speculative redirect was added. The local regression checked the configured redirects and found no broken internal path after the stale subcategory listing was fixed.

## Completed local implementation

- Gate V2 is selected by `PRODUCT_SEO_GATE_V2_ENABLED=true`; unset or any other value keeps the existing gate. Product fetch and sitemap filtering call the same selector. The enabled path requires a complete review ledger and rejects missing or simulated reviewer approvals. It compares exact content fingerprints and primary image bytes.
- The frontend product metadata uses the expected route canonical returned by V2 and does not mark an alternate request path indexable. The disabled path retains its prior canonical calculation.
- The subcategory product endpoint now selects published products by their authoritative category and subcategory IDs. This removed a stale coffee-mug listing link that led to a 404 for the steel-mug product. The site design and product routes did not change.
- The approved-content importer accepts a selected batch of 1–151 unique rows, refuses factual and cork canonical holds, checks per-product reviewer attestations and the current local primary-image digest, compares source timestamps, checks duplicate copy, and takes a fresh **full database backup** before its first write. It still requires `approved=YES`, an exact CSV hash, an explicit approval statement and an approval manifest. No approval manifest has been created.
- A separate read-only full backup was created at `.local-backups/printkee-2026-11-14-pre-seo`: 16 collections, 3,368 documents, including 234 products. All collection-file SHA-256 hashes matched its manifest. This folder is excluded from Git. A future approved import takes another full backup immediately before its write.

The Extended JSON export reads collections sequentially, so arrange a quiet maintenance window for an approved write and preserve a platform snapshot if one is available. The manifest verifies file integrity and collection counts; it does not claim a cross-collection transaction snapshot.

## Local verification

| Check | Result |
| --- | --- |
| Fresh MongoDB snapshot and post-test export | 234 products; all product records identical before and after local testing |
| Final 151-row batch | 151 unique product IDs, 151 unique titles, 151 unique snippets, no description pairs at similarity 0.5+, 0 approvals |
| Backend tests | 15 passed |
| Frontend production build | Passed |
| Flag-off HTTP check | 234/234 product routes: expected robots, canonical, sitemap, Product JSON-LD and breadcrumb signals; 18 eligible; 225 sitemap URLs |
| Flag-on HTTP check with empty ledger | 234/234 product routes: expected robots, canonical, sitemap, Product JSON-LD and breadcrumb signals; 16 eligible; 223 sitemap URLs |
| Search Console target route check, flag off | 151 `noindex` targets and 18 eligible products passed; 19 already-indexable exported URLs passed |
| Full local SEO crawl, flag off | 225 sitemap pages, 441 internal paths, zero broken links or signal errors |
| Importer safety preview | 151 rows, zero approved; `--apply` without an approval file refused before database connection |

The two flag-on exclusions are `personalized-polo-t-shirts` and `stainless-steel-double-wall-coffee-mug`; V2 identifies their confirmed field/copy contradictions. The 151 target product pages remain excluded in the current database. Google indexing itself has not been verified or requested.

## Required configuration

- Backend `PRODUCT_SEO_GATE_V2_ENABLED`: leave unset or `false` for the initial deployment.
- Backend `PRODUCT_SEO_GATE_V2_LEDGER_PATH`: required **only** for a separately approved V2 switch. Point to a trusted, versioned ledger outside public web assets. The [template](GSC_PRODUCT_GATE_V2_REVIEW_LEDGER_TEMPLATE_2026-11-13.json) has no approvals and is not a production-ready approval ledger.
- Existing backend `MONGO_URI`, frontend `BACKEND_URL`, and other current environment settings remain as configured. No production environment variable was changed here. No external AI service or API key was used.

## Single approval and deployment checklist

1. Catalog owner verifies the 151 drafts against source records. Resolve the 88 image/fact holds with supplier evidence or leave them out. For the four priority products, confirm the exact SKU, material, dimensions or capacity, image match, and permissions for the branded bottle photo. Approve exact copy and alt text. Resolve the five contradictions only with reliable evidence. Keep the three cork thickness variants held until a written canonical decision is made.
2. Create an approved **copy** of the final review CSV. Change only individually authorized rows to `approved=YES`. Record the exact CSV SHA-256, approved product IDs, named reviewer, time, image SHA-256 and identity/image/facts/copy/canonical attestations in a private approval manifest. Do not copy synthetic approvals from reports. Recheck current MongoDB records before approval; changed source timestamps invalidate drafts.
3. With explicit authorization for that batch, run the approved importer using `--csv`, `--approval-file`, `--backup <new-directory>` and `--apply`. It takes a new full backup before writing. Verify only descriptions, SEO title/description and approved image alt text changed. Preserve IDs, slugs, categories, prices, stock and other specifications.
4. Deploy the tested code with Gate V2 **off**. Verify the full local-style crawl in the deployment environment: HTTP 200, visible product content, internal links, product and breadcrumb JSON-LD, self-canonical, robots directive and sitemap membership. Confirm redirects and 404 handling. Product data and SEO signals must agree.
5. Build a trusted V2 review ledger for the exact **post-publication** product fingerprints and image digests. Resolve the two legacy contradictions or explicitly approve their temporary exclusion. Run an environment-specific flag-on shadow comparison for all 234 products and all 151 targets. Require no unexpected gains, losses or canonical differences.
6. Obtain separate authorization to enable Gate V2. Switch `PRODUCT_SEO_GATE_V2_ENABLED=true` with the reviewed ledger path, then repeat the 234-page route, robots, canonical, sitemap and internal-link checks. Search Console indexing requests are appropriate only for verified live URLs that are 200, indexable, self-canonical, useful and present in the sitemap.

## Rollback

If Gate V2 produces unexpected signals, set `PRODUCT_SEO_GATE_V2_ENABLED=false` and restart the backend; this restores the prior gate without changing product records. Recheck robots and sitemap immediately. If approved content updates must be reversed, stop further imports, use the fresh backup directory named in that import's `seo-update-plan.json`, and restore only the changed product content fields with a reviewed, explicit database operation. Preserve unrelated writes made after the backup; do not replace the entire live database blindly. Re-run the 234-product verification and full SEO crawl before closing the incident.
