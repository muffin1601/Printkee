# Printkee product SEO gate v2 — shadow audit and approval proposal

## Scope and safety boundary

This audit read the current **234** MongoDB products and compared them with the existing gate in `backend-next/services/productSeoQuality.js`. It also evaluated all **151** Search Console draft snapshots. The proposed evaluator is implemented in `backend-next/services/productSeoQualityCandidate.js` but is **not imported by any production route or sitemap**. MongoDB, published product copy, robots directives, routes, and deployment were not changed. The approval records used in the comparison are explicitly synthetic, used only to measure the gate's upper bound; they are not authorization to index or publish anything.

The current gate rejects a product below 80 combined description words or 40 visible words, requires three counted detail groups, a title of at least 30 characters, a meta description of at least 70 characters, and an image URL with eight-character alt text. It also checks publication and category relationships. It does not compare the photo with the product, detect contradictory specifications, evaluate a stored canonical, or check duplicate pages. A tax-only `specifications` array can count toward its three groups. [Google says it has no preferred word count](https://developers.google.com/search/docs/fundamentals/creating-helpful-content), so the 80-word rule is an internal threshold, not a Google requirement.

## Before and after

| Dataset and scenario | Eligible | Excluded | Newly eligible | Previously eligible excluded |
| --- | ---: | ---: | ---: | ---: |
| **Live catalog, current production gate** | **18 / 234** | **216** | — | — |
| Gate v2 with **no new approvals**, legacy protection, shadow simulation | 16 / 234 | 218 | **0** | 2 confirmed record contradictions |
| Gate v2 with **every catalog record hypothetically approved** and local image hashes available — upper bound only | 56 / 234 | 178 | 40 | 2 confirmed record contradictions |
| 151 unpublished draft snapshots under current gate | 36 / 151 | 115 | — | — |
| 151 draft snapshots under gate v2 with **unheld drafts hypothetically approved** — upper bound only | 44 / 151 | 107 | 40 versus the draft-gate result | 32 of the old draft passes are rejected |
| Seven conservatively revised shortlist drafts under the current gate | 7 / 7 | 0 | — | — |
| Same seven under gate v2 with simulated review | 4 / 7 | 3 | 0 versus current gate | 3 cork-sheet variants pending canonical decision |

The **live before/after is still 18/18** because no production switch or content publication occurred. The 40/44 figures are ceilings under synthetic approvals, not products cleared for indexing. Among the 151 draft snapshots, the v2 check rejects 29 mechanical passes with factual/image holds and three cork-sheet variants awaiting a canonical decision; it admits 40 other drafts only if a catalog owner approves the exact content and image. The [234-row comparison CSV](GSC_PRODUCT_GATE_V2_COMPARISON_2026-11-13.csv), [151-row draft comparison CSV](GSC_PRODUCT_GATE_V2_DRAFT_COMPARISON_151_2026-11-13.csv), and [full JSON](GSC_PRODUCT_GATE_V2_COMPARISON_2026-11-13.json) list every decision and reason.

## Existing 18 eligible products: confirmed versus suspected

The [18-product review table](GSC_LEGACY_ELIGIBLE_18_REVIEW_2026-11-13.md) links each existing primary image and gives the exact finding.

| Finding class | Count | Treatment |
| --- | ---: | --- |
| **Confirmed internal record contradiction** | 2 | `personalized-polo-t-shirts` says white in visible copy but blue in its color field; `stainless-steel-double-wall-coffee-mug` says about 460 ml in copy but 660 ml in its size field. Resolve the source of truth before a v2 switch. |
| **Visually observed image/record disagreement** | 7 | Examples include a white mouse listed as black and a green power bank listed as black. The discrepancy is visible; which photo or variant is correct needs supplier confirmation. Do not auto-noindex these live pages on this observation alone. |
| **Suspected variant, appearance, or contents issue** | 6 | Manual catalog review; keep current indexing state during the review. |
| **No specific discrepancy identified in this pass** | 3 | Review factual claims and product specificity before a permanent v2 approval. |

The candidate evaluator deliberately **preserves the current indexing state for 16 legacy pages** during review, while it flags their editorial issues as warnings. The two confirmed internal contradictions would become excluded only after an approved policy switch. Nothing was changed on the live site. The legacy exception is a transition mechanism, not a permanent assertion of content quality.

## What v2 checks

The exact proposed implementation is [productSeoQualityCandidate.js](../../backend-next/services/productSeoQualityCandidate.js). It keeps publication, taxonomy, explicit noindex, image existence, and canonical-route checks as hard exclusions. It requires visible non-placeholder product copy, a useful buyer-facing fact (excluding HSN/GST-only specifications), a fact actually stated in the copy, page-specific title and meta text, and a primary image with alt text. A content approval must match a SHA-256 fingerprint of the current product fields, the expected canonical URL, the current primary-image URL, and the current image-file digest. Approval also requires reviewer identity, review time, and explicit identity, image, usefulness, and duplicate-review attestations. A change to approved copy, product fields, image URL, or image bytes invalidates approval.

Known factual/image holds block **newly eligible** pages. Suspected image issues on already-indexable pages are warnings during the protected transition. Near-duplicate descriptions and the 20 known color/thickness variant pages need a recorded canonical decision before new eligibility. The candidate code calculates the former 80- and 40-word conditions as **warnings only**; it does not allow empty or placeholder copy to pass. Google's canonical guidance recommends consistent canonical and internal-link signals, and treats sitemap inclusion as weaker than a canonical link. [Google canonical guidance](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)

The three cork-sheet pages — `2mm-medium-grain-cork-sheet`, `3mm-medium-grain-cork-sheet`, and `4mm-medium-grain-cork-sheet` — have different labeled thicknesses but closely related use. Decide whether each offers enough independent buying information to justify a self-canonical page, or whether one canonical product with thickness variants is better. No decision was assumed. The other flagged variant groups are eight baseball-cap colors and nine round-neck-shirt colors. The current catalog also contains a near-duplicate coffee-mug description cluster that needs canonical and identity review.

## Priority indexability queue

1. **Four distinct products for final admin approval:** `yoga-mat-cork-fabric-eva`, `fully-rubberized-3mm-yoga-mat`, `cork-rubberized-yoga-mat-latex`, and `double-wall-insulated-sipper-bottle`. Their [conservative copy packet](GSC_FINAL_APPROVAL_SHORTLIST_10_2026-11-13.md) removes unverified grip and thermal-duration claims. All four pass v2 in a simulation with exact-content review and local image hashes. They are not live eligible until content approval, publication and HTTP/canonical/robots/sitemap checks.
2. **Three cork-sheet variants:** resolve the canonical strategy and verify labeled thickness before any indexing change.
3. **Other draft candidates:** 40 drafts gain eligibility only in a hypothetical approval simulation. The [draft comparison CSV](GSC_PRODUCT_GATE_V2_DRAFT_COMPARISON_151_2026-11-13.csv) lists them; review identity, image, copy, and any variant relationship one by one. Do not bulk approve them from this count.
4. **Factual/image holds:** 88 target drafts remain on hold. The [visual mismatch report](GSC_IMAGE_MISMATCH_REVIEW_2026-11-13.html) covers 77 image cases. No unverified source image should be substituted automatically.

## Exact proposed code and integration changes

**Prepared locally, inactive:**

- `backend-next/services/productSeoQualityCandidate.js` — the complete pure v2 decision function, content fingerprint, useful-fact extraction, expected-canonical calculation, and transition warnings. This is the proposed replacement logic; it is not wired into HTTP or sitemap paths.
- `backend-next/test/productSeoQualityCandidate.test.js` — cases for concise approved copy, stale/missing approval, image digest, canonical and duplicate holds, confirmed versus suspected legacy findings, empty copy, tax-only facts, and invalid taxonomy.
- `backend-next/scripts/compareProductSeoGates.js` — replays the old and v2 gates against the saved fresh MongoDB snapshot and all 151 drafts. It computes local image SHA-256 values and labels all generated approvals as simulation only.
- `backend-next/scripts/productSeoLegacyHolds.js` — evidence and severity for the 15 flagged legacy products.

**Production integration proposed only after content/policy approval:** both `backend-next/routes/productRoutes.js` (`product-fetch`) and `backend-next/routes/sitemap.js` (`sitemap-data`) must call the same `evaluateProductSeoCandidate(product, reviewContext)` with a trusted, versioned review context instead of `evaluateProductSeo(product)`. That context must contain approved record fingerprints, current image digests, confirmed and unresolved holds, duplicate peers, and canonical decisions. The frontend product route and visual design need no change, but its metadata logic in `frontend-next/app/(main)/[category]/[subcategory]/[product]/page.jsx` must distinguish **self-canonical index pages** from **canonicalized variants** if a variant is merged: a canonicalized variant should expose the approved canonical target and stay crawlable without using `noindex` solely to force canonical selection. [Google recommends canonical links over `noindex` for duplicate preference](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls). The production swap, metadata adjustment, and trusted approval-context provider are **intentionally not applied**, because no admin approvals or canonical decisions exist yet. A mere function-name swap would suppress pages or trust synthetic evidence.

## Approval-gated rollout

1. Confirm the two internal contradictions with the supplier/catalog owner. Verify the seven visible image/record disagreements and six suspected legacy issues without changing their current robots directives on suspicion alone. Capture the review decision and image SHA-256 for each approved record.
2. Approve exact copy, metadata, image and canonical decisions for the four priority products. Preserve the existing source backup and take a fresh database backup before any approved content write. Do not approve the three cork variants until their canonical strategy is chosen.
3. Build a trusted approval ledger controlled by the admin review process. It must record product ID, content fingerprint, image digest, expected canonical, reviewer, review time and the four attestations required by v2. Any edit invalidates the prior approval. The shadow audit's synthetic approvals must never enter this ledger.
4. After explicit approval, first deploy a **shadow-only** evaluator that logs v2 decisions while the current gate still controls robots and sitemap. Resolve unexpected losses or gains, especially the current 18 and any non-target products. Then separately approve a limited production switch.
5. For each switched product, verify HTTP 200, visible content, image response and identity, self-canonical or approved canonical target, robots directive, sitemap membership, internal links, and Search Console live inspection. Revert to the prior gate if unexpected pages become indexable or existing valid pages disappear.

## Limits and risks

- The 56-product current-catalog v2 number assumes reviews that **have not occurred**. It includes 40 mechanically new candidates, 25 outside the 151-target image audit. It is an upper bound, not an authorization to index them.
- A token match to a product fact cannot prove that a statement is true or useful. Human identity, image and copy approval remains a hard requirement for newly eligible pages.
- Local image hashes cover local assets; remote product images need a separately verified media digest before approval. An image URL and alt string alone do not prove product identity. [Google image guidance](https://developers.google.com/search/docs/appearance/google-images/)
- The legacy transition temporarily preserves 16 current pages, some with suspected image problems. This avoids automatic `noindex` on uncertain evidence but requires a time-bound manual review.
- All 234 records had blank stored `canonicalUrl` values in this snapshot. The current frontend generates self-canonical URLs; the audit's expected paths match all 151 target URLs. Actual rendered canonical and robots signals still require a production-like HTTP check after rollout.

## Verification

- Read-only MongoDB snapshot: 234 unique products; existing gate 18 eligible and 216 excluded; 151 target products currently excluded.
- V2 audit: 234 current records and 151 draft snapshots; row-level comparison CSVs and JSON exported.
- Current legacy review: 2 confirmed internal contradictions, 7 observed image/record disagreements, 6 suspected issues, 3 without a specific finding.
- Five focused v2 tests passed; the full backend suite passed 13/13. `git diff --check` and JavaScript syntax checks passed.
- No product record, production gate wiring, deployment or Search Console request changed.
