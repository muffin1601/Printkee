# Printkee product SEO drafts — review before any publication

## Outcome

The 151 URLs in `GSC_PRODUCT_DATA_UPDATES_2026-11-13.csv` were matched to 151 unique live MongoDB products. A read-only source backup and a 151-row review CSV were created. Every CSV row contains proposed long and short descriptions, SEO title, meta description, image alt text, field recommendations, factual holds, simulated quality-gate results, and `approved=NO`. No MongoDB record was changed.

The descriptions were written offline with local code and product-specific editorial notes. No OpenAI API, external AI service, API key, or paid generation service was used. Drafts use the current database's names, descriptions, category, attributes, specifications, and images. They still require human verification because several existing database claims conflict with the pictured product.

| Measure | Count |
| --- | ---: |
| Products reviewed and drafted | 151 |
| Primary images checked visually from local product files | 149 |
| Rows on factual or image hold | 88 |
| Clear primary-image mismatches within those holds | 77 |
| Drafts expected to pass the existing technical quality gate | 36 |
| Of those 36, held despite passing the numeric gate | 29 |
| Unheld drafts expected to pass the gate after approval and publication | 7 |
| Still failing the current gate in simulation | 115 |
| Drafts below 80 combined description words | 113 |
| Products with fewer than three useful detail groups | 27 |
| Near-duplicate draft pairs at similarity 0.5 or higher | 0 |
| Duplicate proposed SEO titles or meta descriptions | 0 |
| Approved or published updates | 0 |
| Newly eligible live URLs | 0 |
| Local XML sitemap URLs | 225, unchanged |

Counts overlap. Every draft has at least 40 visible long-description words, and every proposed meta description has at least 70 characters. Combined draft descriptions range from 60 to 101 words. The requested 100–150 words were not reached for most records because their verified product facts are sparse; repeated filler would make the page less useful. The 80/40 word and three-detail conditions are Printkee policy, not Google requirements. A page can pass those checks and still be misleading, as the held rows demonstrate.

## Rows that could become eligible after review

The seven rows currently free of identified factual/image holds and expected to pass the existing gate are:

- `yoga-mat-cork-fabric-eva`
- `fully-rubberized-3mm-yoga-mat`
- `double-wall-insulated-sipper-bottle`
- `2mm-medium-grain-cork-sheet`
- `cork-rubberized-yoga-mat-latex`
- `3mm-medium-grain-cork-sheet`
- `4mm-medium-grain-cork-sheet`

These are **draft candidates**, not URLs ready for Search Console. Admin approval, publication, and live HTTP/robots/canonical/content/sitemap/internal-link checks must come first.

## Factual and image holds

The three previously known contradictions remain held: `kitchen-apron`, `classic-steel-coffee-mug`, and `matte-black-corporate-mug`. Visual review revealed 77 clear photo-to-record mismatches, including a described waist apron pictured as a bib apron, a digital desk clock pictured as an analog wall clock, a straw hat pictured as a blue bucket hat, and a square clock pictured as round. Closer review of the former ten-product shortlist added a flat charging pad pictured as an upright stand and an olive power bank listed as black. The two mug images are remote and were not visually inspected locally. Further name/style conflicts include printing-service titles attached to polo-shirt photos and a "Dryfit" shirt whose performance fabric is not supported by its cotton-blend material field.

The CSV's `factual_verification_needed` and `primary_image_visual_issue` columns give the exact row-level reasons. Its proposed image-alt column describes a visible photo where there is a clear mismatch, but **do not publish that alt text while the photo and product identity disagree**. Replace the photo or correct the catalog record first, then approve the alt text. The existing gate checks for an alt string and image URL; it cannot detect that a photo depicts the wrong item.

## Safe update path

`backend-next/scripts/applyApprovedProductSeoDrafts.js` runs in preview mode by default. Applying requires all of these: selected CSV rows changed to `approved=YES`, a separate approval JSON manifest containing the exact CSV SHA-256 and approved product IDs, the `--apply` switch, and a new backup path. It rejects rows on hold, checks source `updatedAt` values, checks draft duplication against approved and other catalog products, backs up original documents before the first write, and updates only descriptions, SEO title/description, and existing image alt text. Price, stock, IDs, slugs, relationships, and product routes are untouched. No approval manifest was created and the script was not run in apply mode.

After approved updates, recalculate eligibility against MongoDB and verify each affected URL's HTTP 200, canonical URL, robots directive, crawlable content, sitemap membership, and internal links. The current sitemap count remains 225 because no content was published. No URL is claimed to have been indexed by Google.

## Verification

- CSV: 151 unique rows; 0 duplicate proposed titles or meta descriptions; 0 near-duplicate long-description pairs at the 0.5 similarity threshold; 0 meta descriptions under 70 characters.
- Approval script preview: 151 rows, 0 approved; no database write.
- Backend tests: 8 passed.
- Frontend production build: passed.
- `git diff --check`: passed.

The CSV is the review queue. A catalog owner should verify the held product identity, image, and specifications before approving copy; the remaining 56 unheld but gate-excluded drafts need additional product-specific facts or a separately justified gate-policy review.
