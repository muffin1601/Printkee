# Printkee product content approval packet — 14 November 2026

## Decision summary

The [60-row approval batch](GSC_PRODUCT_SEO_APPROVAL_BATCH_60_2026-11-14.csv) contains manually edited descriptions, SEO titles, meta descriptions, and image alt text grounded in the 234-product catalog snapshot and locally inspected product images. Every row remains `approved=NO`.

| Group within the 60 | Count | Decision needed |
| --- | ---: | --- |
| Individually reviewable | 24 | Admin verifies the exact facts, image, copy and canonical, then approves the exact CSV revision. |
| Image or factual hold | 17 | Reconcile the specific image, SKU, set contents, material, color or feature issue recorded in the row. |
| Color-variant canonical hold | 19 | Decide whether the eight caps, eight round-neck shirts and three corporate shirts warrant separate self-canonical pages. |

The 24 individually reviewable rows are: `cork-passport-holder`, `metal-ring-keychain`, `cork-dining-table-mat`, `executive-a5-pu-leather-diary`, `tall-cork-table-lamp`, `cork-desktop-calendar`, `olive-cork-table-mat`, `cork-hanging-lamp`, `executive-softshell-jacket`, `3-in-1-system-jacket`, `cork-gift-boxes`, `cork-laptop-bag`, `yoga-mat-cork-fabric-eva`, `natural-cork-coasters`, `fully-rubberized-3mm-yoga-mat`, `premium-canvas-tote-bag`, `cork-rubberized-yoga-mat-latex`, `large-grain-cork-coasters`, `4-piece-cork-coasters`, `choco-chip-cork-planter`, `cork-multicolored-planter`, `cork-round-planter`, `ergonomic-professional-mouse`, and `cork-round-style-pen-holder`.

These 24 pass an **offline Gate V2 simulation with temporary in-memory approvals**. The simulation is not an admin approval and did not write to MongoDB or the ledger. Up to **24 of the 151 target products** can become newly eligible after actual approval, staging publication, Gate V2 evidence, and final release verification. Currently approved: **0**. Newly published or newly eligible on the live site from this packet: **0**.

## Earlier 88 holds

The [88-row hold register](GSC_PRODUCT_HELD_CONTENT_REVIEW_88_2026-11-14.csv) records each existing problem and the corresponding catalog facts. One row, `corporate-polo-t-shirts`, has enough recorded facts and a matching maroon polo image for a more careful copy draft. Its existing embroidery claim is unverified, and its relationship to other polo color pages needs a canonical decision, so it remains held. The other 87 require a supplier, product owner, correct SKU image, or other source beyond the present records. **No previously held product is released for indexing from existing evidence alone.** The three cork-sheet variants remain separate canonical holds, making 151 targets in total: 24 candidates and 127 held.

## Editorial and image checks

Descriptions use recorded material, size, color and other facts where available, and describe only visible image features. Unverified decoration methods, performance claims, dimensions, set quantities and certifications are not presented as established facts. Some copy explicitly asks buyers to confirm a detail before ordering; held rows explain the unresolved issue and must not be published as final copy. The secondary gallery alt text for the six products with multiple `images` entries was checked against the image files and rewritten where it made unsupported claims.

The newly identified `multi-device-bluetooth-keyboard` hold is material: its gallery depicts a gaming-style mechanical keyboard, while the product is cataloged as a compact multi-device Bluetooth model. A correct SKU/image match is required.

The [validation record](GSC_PRODUCT_SEO_APPROVAL_BATCH_60_VALIDATION_2026-11-14.json) reports 60 checked rows, 24 simulated Gate V2 passes, zero within-batch near duplicates, zero near matches to the 234 existing descriptions at the importer's 0.5 similarity cutoff, and zero missing primary-image digests. Long descriptions range from 46–63 words. All 60 are below the former 80-word combined threshold, which is treated as an editorial warning, not a Google rule. SEO titles are 28–48 characters and meta descriptions 106–153 characters; wording was kept specific instead of padded to character targets.

## Staging-only publication path after real approval

1. Review the 24 eligible rows in the CSV and confirm product identity, image, stated facts, usefulness, duplication and canonical for each selected product. Keep all hold rows `approved=NO`.
2. Mark only actually approved rows `approved=YES` in a new reviewed CSV. Record a real reviewer and review time, content usefulness, duplicate review, factual and image attestations, canonical review, and each image digest in an approval manifest. Set `targetEnvironment` to `staging` and bind the manifest to the exact reviewed CSV SHA-256.
3. Provide distinct `STAGING_MONGO_URI` and `MONGO_URI` values. Run the [approved-content importer](../../backend-next/scripts/applyApprovedProductSeoDrafts.js) with `--apply --staging-only`, the approved CSV and manifest, a new full-backup directory, this [empty staging Gate V2 ledger template](GSC_PRODUCT_GATE_V2_STAGING_LEDGER_TEMPLATE_2026-11-14.json), and a new ledger output path. The importer rejects production-target equivalence, held rows, stale products, missing attestations, changed images, near-duplicate copy and Gate V2 failures before writing. It backs up all staging collections before the first update and writes the approved-content ledger only after all selected staging updates finish.
4. Enable Gate V2 only in staging with the generated ledger. Verify the selected product pages, their visible copy, canonical URL, robots directive, sitemap membership and internal links. Production deployment and MongoDB publication remain separate approval steps.

The original catalog snapshot and the existing complete local database backup under `.local-backups/printkee-2026-11-14-pre-seo` were preserved. No production data, prices, stock, IDs, slugs or category relationships were changed.
