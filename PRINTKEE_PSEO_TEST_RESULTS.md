# Printkee Programmatic SEO Test Results

Verification date: 2026-10-09. Tests ran against a fresh local production build and the configured local API/database connection. No SEO records were imported, generated, updated, or deleted in the database.

## Results

| Check | Result | Evidence |
|---|---|---|
| Production build | PASS | Next.js 16.3.6 compiled, type-checked, and generated all 41 static build entries. Dynamic pSEO and sitemap routes remained server-rendered. |
| TypeScript validation | PASS | `npx tsc --noEmit` exited 0. |
| Lint | NOT AVAILABLE | The frontend and backend packages do not define a lint script. This is reported, not treated as a pass. |
| Existing SEO regression | PASS | 330 sitemap URLs crawled; 330 pages checked; 93 internal paths checked; 0 errors, 0 warnings, 0 claim findings. |
| Existing quality utilities | PASS | Normalization, similarity, CSV escaping/parsing, and opportunity validation passed. |
| Complete keyword accounting | PASS | 2,796 input rows; 2,796 output rows; 0 omitted; 0 unmapped. |
| Candidate generation | PASS | 14,638 generated; 14,638 unique; 0 exact duplicate paths. |
| 20,000-scale capacity | PASS | 19,790 candidates generated in the scale fixture; total pSEO suite completed in 217 ms. A 20,000+ request was rejected by the capacity guard. |
| Duplicate prevention | PASS | Unique database index plus generation test; CSV re-audit found 0 duplicate candidate URLs. |
| Canonical rules | PASS | 2,024 same-intent alternatives have a different canonical path; 0 unresolved canonical conflicts. |
| Publication lifecycle | PASS | Existing approved-path fixture is indexable and sitemap-eligible; candidate, rejected, and canonicalized records remain non-indexable and excluded. Candidate approval itself does not publish a page. |
| Unknown/unpublished URL | PASS | Unknown page and unknown sitemap partition both returned HTTP 404. |
| Sitemap index | PASS | `/sitemap-index.xml` returned 200 XML and listed seven partitions. |
| Sitemap partitions | PASS | Static, categories, products, and approved SEO-page partitions returned 200 XML; research candidates were absent. |
| Admin authorization | PASS | Candidate inventory endpoint returned HTTP 401 without a bearer token. |
| Product/category route regression | PASS | Covered by the 330-URL production crawl with no errors. |
| Enquiry validation regression | PASS AFTER FIX | Empty CRM payload now returns HTTP 400 locally without contacting the CRM. |
| Database mutation / migration | NOT RUN | Deliberately excluded to comply with the no-overwrite/no-irreversible-migration requirement. Preview and pure generation paths were tested. |

## Safety note

Before the empty-payload guard was added, one local regression request reached the configured CRM and was accepted as an empty **“Website visitor”** lead (no phone or email). The response did not expose an ID, so no deletion was attempted. The route now requires both a contact method and enquiry details before any outbound CRM request.

## Inventory verification

- Approved/indexable offline cohort represented in the export: 300 existing static, location, category, subcategory, and product routes.
- Live local aggregate sitemap at test time: 330 URLs, including database-backed brands/blogs beyond the offline cohort.
- Research candidates: 10,590.
- Canonicalized candidates: 2,024.
- Rejected unsupported-claim candidates: 2,024.
- Product-location research mappings: 5,170.
- Rejected/merged export rows: 6,064, including exact keyword dispositions and candidate decisions.
