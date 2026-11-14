# Printkee SEO approved-content staging result — 14 November 2026

## Result

**STAGING PASS; NOT DEPLOYED.** The requesting user approved the 24 shortlisted content rows and replied that none of the listed SKU/image, catalog-fact, canonical, or six specific supplier-fact checks remained unconfirmed. The conversation supplied no separate supplier sheets or reviewer name; the approval manifest records the requesting user and the exact two approval messages without inventing a name. The 127 other Search Console target products remain held. When asked to choose between conflicting legacy facts or keeping those pages excluded, the user delegated the choice with “choose any”; the safe choice is to **keep both legacy pages excluded** until authoritative facts are supplied.

The exact 24-row staging CSV SHA-256 is `d7b130436f69ebc1eccdd70073a2e54269579b09eb6138d45892cd9b4f6deaeb`. The approved CSV and manifest are preserved under `.local-backups/printkee-seo-staging-approval-2026-11-14`. The importer wrote only to `127.0.0.1:27028/printkee-seo-staging-20261114`; its fresh pre-write full backup is `.local-backups/printkee-seo-staging-pre-import-24-2026-11-14` (16 collections, 3,368 documents, 234 products). Its approved Gate V2 ledger is `.local-backups/printkee-seo-staging-2026-11-14/approved-gate-v2-ledger.json` with 24 exact-content approvals.

| Verification | Result | Evidence |
| --- | --- | --- |
| Guarded import | **PASS** | 24 selected rows updated; no held row selected. Importer restricted to the fixed local staging URI. |
| Field-level staging database diff | **PASS** | [Import verification](GSC_STAGING_APPROVED_IMPORT_24_VERIFICATION_2026-11-14.json): exactly 24 product records changed only in approved description, SEO metadata, image alt text and timestamp fields; 210 other products and 15 other collections unchanged. |
| Gate V2 exact-content approvals | **PASS in staging** | All 24 staged records match their ledger fingerprints and image digests and pass the candidate gate. The legacy 80-word gate still excludes these 24, as expected. |
| Product routes, robots, canonicals, JSON-LD and sitemap | **PASS in staging** | [HTTP verification](GSC_STAGING_GATE_V2_HTTP_VERIFICATION_24_2026-11-14.json): all 234 product routes checked; 24 newly eligible, 16 prior eligible retained, 127 held targets excluded, zero errors. Product and Breadcrumb JSON-LD, visible approved descriptions, titles, snippets and primary image alt text checked. |
| Internal product links | **PASS in staging** | All 24 approved product URLs have working links from their subcategory pages. |
| Aggregate sitemap and seven partitions | **PASS in staging** | 247 identical sitemap URLs, including 40 product URLs. Change from the 225 pre-approval baseline is +24 approved products and −2 confirmed-conflict legacy products. |
| Full SEO crawl and redirects | **PASS in staging** | [Current crawl](SEO_CRAWL_REPORT.json): 247/247 sitemap pages, 441 internal paths, configured redirects and robots rules, zero errors, warnings, broken links or prohibited-claim findings. |
| Backend tests | **PASS** | `npm.cmd test`: 15/15 after the sitemap fingerprint fix. |
| Frontend production build | **PASS** | Next.js 16.3.6 production build passed after the partition fix; no frontend code changed after the build. |
| Production deployment, database write or Search Console request | **NOT PERFORMED** | Requires separate explicit authorization and live verification. |

The [24 staging-eligible URLs](GSC_STAGING_NEWLY_ELIGIBLE_24_2026-11-14.csv) each returned HTTP 200 with `index, follow`, a self-canonical, product content, sitemap inclusion and a working subcategory link in staging. These are **not** claims of live Google indexing or production readiness.

## Remaining release decisions

1. Gate V2 excludes two **currently indexable** legacy pages with confirmed field/copy contradictions: `personalized-polo-t-shirts` and `stainless-steel-double-wall-coffee-mug`. Under the user's delegated choice, [working corrections](GSC_LEGACY_CONFLICT_CORRECTIONS_2_PROPOSED_2026-11-14.md) now use the structured catalog's blue and 660 ml values, supported where possible by the current product photos. The mug photo does not establish capacity, so these are proposals, not supplier verification. Both holds remain active. The staging result of 16 retained legacy pages reflects this **known two-page indexing loss**. Correct them later only with authoritative evidence.
2. The other 127 Search Console target products remain on factual, image or canonical hold. They must not be added to the production ledger merely because this 24-row batch was approved.
3. A future production migration requires its own fresh backup, production-specific approved ledger and separately authorized procedure. The staging importer cannot connect to production. Deploy code with Gate V2 disabled first; verify live signals, then seek separate authorization for a production flag switch and any Search Console indexing requests. **Readiness is not authorization to deploy or write production data.**

## Rollback of this staging trial

Set `PRODUCT_SEO_GATE_V2_ENABLED=false` and restart the staging backend to restore legacy indexability decisions without changing product data. To reverse the 24 staging content edits, use the import's `seo-update-plan.json` and fresh full backup to restore only their approved content fields, or rebuild this isolated local staging database from the preserved original backup. Keep the approved CSV, manifest and ledger together for traceability.

## Local implementation note

The live sitemap initially rejected the newly approved rows because its `.lean()` product query omitted Mongoose defaults present in the product route and approval fingerprint. `backend-next/routes/sitemap.js` now evaluates hydrated product records, so both endpoints use the same fingerprint representation. The reviewed 28-character Cork Hanging Lamp SEO title also exposed an obsolete 30-character importer cutoff; the importer now accepts reviewed titles of at least 20 characters and rejects duplicate titles and snippets within an approved batch. No approved wording was changed.
