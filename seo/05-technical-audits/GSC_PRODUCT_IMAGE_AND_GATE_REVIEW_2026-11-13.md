# Printkee product identity, image, and SEO gate review

## Decision summary

This is a read-only review. The original 151-record [MongoDB source backup](GSC_PRODUCT_CONTENT_SOURCE_BACKUP_2026-11-13.json) is unchanged. No product record, live route, sitemap, or deployed site was edited. The [image mismatch CSV](GSC_IMAGE_MISMATCH_REVIEW_2026-11-13.csv) and [visual HTML report](GSC_IMAGE_MISMATCH_REVIEW_2026-11-13.html) list 77 suspected photo-to-record mismatches with the existing image, product identity, observed problem, and action. These require supplier or catalog-owner confirmation; no replacement source was assumed.

Closer inspection of the former ten-product shortlist found two new image holds and one unsupported product-name claim. The [ten-product approval packet](GSC_FINAL_APPROVAL_SHORTLIST_10_2026-11-13.md) now shows those three as withdrawn and supplies conservative revised copy, SEO titles, meta descriptions, and image alt text for the other seven. All seven revised-copy snapshots pass the **current** gate in a local simulation. This does not establish live indexability or Google indexing.

## Prioritized product queue

| Priority | Products | Next decision |
| --- | --- | --- |
| A — distinct products with conservative copy | `yoga-mat-cork-fabric-eva`, `fully-rubberized-3mm-yoga-mat`, `cork-rubberized-yoga-mat-latex`, `double-wall-insulated-sipper-bottle` | Admin verifies material, dimensions, photo, and final copy. Then publish and run live route checks. Performance and thermal-duration claims were removed from the proposed copy. |
| B — thickness variants | `2mm-medium-grain-cork-sheet`, `3mm-medium-grain-cork-sheet`, `4mm-medium-grain-cork-sheet` | Verify the labeled thickness against supplier stock and decide whether each thickness deserves its own useful page or a single canonical product with variants. |
| C — plausible short pages | 34 unheld drafts blocked only by the 80-word rule | Review factual value and near-duplicate variants individually before changing the gate. The CSV identifies every URL and its content. |
| D — factual/image holds | 88 draft rows, including 77 image cases | Confirm product/SKU, variant, composition and the correct supplier image. Resolve the hold before approving text or alt. |

The former ten-product list also included `wireless-charger-stand` (a flat pad is pictured), `wireless-charging-power-bank-10000mah` (an olive device with built-in cables is pictured against a black Qi listing), and `navy-blue-round-neck-t-shirt` (product name says “Dryfit” while the material field only establishes cotton blend). They are **not** approval candidates until the records and images are reconciled.

## Current quality-gate evidence

The previous report counted 114 draft failures. After removing an unrelated dining-table sentence from yoga-mat copy and adding the three newly recognized holds, the current regenerated 151-row CSV has **115 gate failures** and **36 mechanical passes**. The one-count change is caused by the existing word threshold; no product became less accurate because that sentence was removed.

| Current failure combination | Products |
| --- | ---: |
| Fewer than 80 combined words only | 87 |
| Fewer than 80 words and fewer than three counted detail groups | 25 |
| Fewer than three counted detail groups only | 2 |
| Missing descriptive primary image alt only | 1 |
| **Total failing** | **115** |

Of the 87 word-only failures, **34 have no identified factual/image hold**. The fixed 80-word rule is therefore blocking pages whose other mechanical checks pass. At the same time, **29 of the 36 gate-pass drafts have factual or image holds**. A numeric pass cannot establish correct product identity. The current gate also treats a `specifications` array containing only HSN/GST values as a useful detail group; 12 of the 151 source records have tax-only specifications counted toward the three-group threshold. Finally, it accepts any image URL with an alt string of eight characters even when the image depicts another product.

Google explicitly says it does **not** have a preferred word count; it asks whether content helps people achieve their goal. This supports treating the 80-word cutoff as an internal heuristic, not an indexing requirement. [Google's people-first content guidance](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)

## Recommended gate design — proposal, not implemented

1. **Retain hard technical exclusions:** inactive, unpublished, deleted, explicitly noindex, missing name/slug, inactive or mismatched category relationship, missing crawlable product route, broken primary image, or invalid canonical destination. Keep `noindex` until each hard condition is resolved.
2. **Add a factual-identity hold:** product name/type, key specifications, visible copy, structured data, and pictured item must agree. A catalog owner should approve the product-to-image mapping; changing the image should invalidate that approval. The 77 image cases and three known copy contradictions show why alt length alone is insufficient. Google's image guidance says alt text and page context both help identify an image and recommends descriptive, relevant alt text. [Google image SEO guidance](https://developers.google.com/search/docs/appearance/google-images/)
3. **Judge useful visible content by substance:** require a clear product identity, purpose/use, and at least one meaningful distinguishing fact supported by the record. For simple products, a concise accurate description can suffice; for complex products, require the relevant capacity, material, dimensions, compatibility, customization, or contents. Reject placeholder text, contradictions, unsupported performance claims, and near-duplicate boilerplate. Use 40/80-word counts as review warnings, not automatic `noindex` switches. This is an editorial rule proposal, not a Google numeric standard.
4. **Count real buyer details:** exclude tax codes, GST rates, empty arrays, generic adjectives, and repeated values from the useful-detail tally. Do not require exactly three groups when a product has only two meaningful, verified facts; instead ask whether the page answers a buyer's practical selection questions.
5. **Treat metadata quality separately:** require title and meta description to be accurate and page-specific, but make fixed character lengths warnings. Google says there is no meta-description length limit and may create a snippet from page content. [Google snippet guidance](https://developers.google.com/search/docs/appearance/snippet)
6. **Resolve variants and canonical signals:** compare near-identical color and thickness pages. Where several URLs represent one product without useful distinctions, select a canonical page and link internally to it; include only intended canonical pages in the sitemap. Google treats a canonical link as a stronger signal than sitemap inclusion and recommends linking internally to the preferred canonical. [Google canonical guidance](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)
7. **Keep deployment verification separate from editorial approval:** after an approved record update, check HTTP 200, rendered visible text, canonical URL, robots meta/header, image response, internal links and sitemap membership. A `noindex` directive blocks appearance in Google Search, and Google must crawl a page to observe changes. [Google robots guidance](https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag), [Google noindex debugging](https://developers.google.com/search/docs/crawling-indexing/block-indexing)

The proposed rule must be tested against the 151 source records and a sample of currently eligible products before any code change. In particular, the 34 unheld word-only cases should receive manual content and variant review; the 29 held mechanical passes must remain excluded. No blanket removal of `noindex` is recommended.

## Verification and limits

- 151 draft rows and source records matched; 77 image cases exported; every local mismatch image path resolves to an existing file.
- A fresh read-only MongoDB export matched all 151 saved product IDs, `updatedAt` values, and primary image URLs; no source record changed since the backup.
- 149 local primary photos were visually reviewed in contact sheets. Two mug images are remote and were not inspected visually in this pass.
- The visual HTML report was opened in headless Chrome and its first page was inspected; image previews and review-card layout rendered correctly.
- The former ten-product packet has three holds and seven revised-copy candidates; all seven pass the current gate simulation.
- The current draft file has 115 mechanical failures, 36 passes, 88 factual/image holds, and seven unheld gate-pass candidates.
- No MongoDB write, image replacement, SEO-gate code change, deployment, or Search Console request was made. Live URL checks are required after approved publication.
