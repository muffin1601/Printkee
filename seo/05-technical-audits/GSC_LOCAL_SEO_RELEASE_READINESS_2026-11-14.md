# Printkee local SEO release readiness — 14 November 2026

## Final content review

The [single 24-product review table](GSC_PRODUCT_SEO_FINAL_REVIEW_TABLE_24_2026-11-14.html) displays each product's name, code, existing short and long descriptions, proposed short and long descriptions, proposed SEO title and meta description, all catalog gallery images with proposed alt text, catalog-recorded facts, image observations, and details still requiring admin confirmation. A [CSV copy](GSC_PRODUCT_SEO_FINAL_REVIEW_TABLE_24_2026-11-14.csv) is available for line-by-line review.

Catalog-recorded facts are what the backed-up product record says. They are separate from visually observed image features and are not independent supplier certification. The unverified-details column identifies any open fit, material, construction, capacity, electrical, pack quantity, branding, or performance point. None of the 24 has been marked approved.

## Isolated staging database

The existing full Extended JSON backup was verified by per-collection SHA-256 and restored with its indexes into a **local-only MongoDB** instance at `127.0.0.1:27028`, database `printkee-seo-staging-20261114`. The [staging restore script](../../backend-next/scripts/startLocalSeoStagingMongo.js) uses the cached local MongoDB binary and never reads or connects to `MONGO_URI`. Persistent staging data and its completion marker are under `.local-backups/printkee-seo-staging-2026-11-14`.

The [baseline check](GSC_LOCAL_STAGING_BASELINE_2026-11-14.json) confirmed 16 collection counts match the backup, 234 products are present, all 151 target product timestamps match the source export, and all 60 batch primary-image digests match the local image files. With an empty Gate V2 approval ledger, all 151 target products are excluded in staging: 24 awaiting approval and 127 unresolved. The unresolved 127 comprise 88 earlier factual/image holds, 17 further factual/image holds, 19 color-variant canonical holds, and three cork-sheet canonical holds.

## After explicit approval

1. Approve only reviewed rows in a copy of the 60-row CSV. Leave the 127 held rows unapproved. The existing importer requires an exact CSV SHA-256 approval manifest with a real reviewer, timestamp, product-by-product identity, image, fact, usefulness, duplicate and canonical attestations.
2. Run the [guarded importer](../../backend-next/scripts/applyApprovedProductSeoDrafts.js) with `--apply --staging-only`, `STAGING_MONGO_URI=mongodb://127.0.0.1:27028/printkee-seo-staging-20261114`, a fresh full-backup path, the [empty staging ledger template](GSC_PRODUCT_GATE_V2_STAGING_LEDGER_TEMPLATE_2026-11-14.json), and a new ledger output path. The importer accepts only this loopback staging database and never connects to the production database. It checks all selected rows and Gate V2 eligibility before the first write.
3. Enable Gate V2 **in staging only** using the generated ledger. Test actual HTTP 200 product routes, rendered descriptions, self-canonicals, robots directives, XML sitemap membership and internal product links. Record any failures and the exact newly eligible count. Production deployment remains a separate final release decision.

No approval, content import, staging Gate V2 activation, product route test, sitemap test, production write, or deployment has occurred yet. Those dependent steps await explicit approval of the 24-product content batch.
