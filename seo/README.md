# Printkee SEO Workspace — Start Here

Last organized: 9 October 2026

This directory is the review package for Printkee's current SEO implementation. It separates executive reports, strategy, keyword evidence, programmatic research, technical audits, operational requirements, and external references.

## Current status at a glance

| Area | Current result |
|---|---:|
| Accounted keyword rows | 2,796 |
| Unmapped keyword rows | 0 |
| Curated T-shirt landing pages | 6 |
| Curated catalogue-intent landing pages | 74 |
| T-shirt keyword mappings | 208 |
| Additional catalogue keyword mappings | 483 |
| Research URL candidates | 14,638 |
| Research candidates automatically published | 0 |
| Latest locally tested sitemap URLs | 410 |
| Latest crawl errors / warnings | 0 / 0 |

The 14,638 programmatic candidates are research inventory. They are intentionally excluded from public indexation until an individual page passes the content and quality workflow. The 80 curated code-backed pages are separate from that candidate inventory.

## Recommended review order

1. Read `01-executive-reports/PRINTKEE_PSEO_IMPLEMENTATION_REPORT.md` for the delivered architecture and inventory.
2. Read `01-executive-reports/PRINTKEE_PSEO_TEST_RESULTS.md` for the latest 410-URL validation results.
3. Review `03-keywords-and-search-data/PRINTKEE_COMPLETE_KEYWORD_MASTER_CATALOG_MAPPED.csv` as the current keyword source of truth.
4. Review `03-keywords-and-search-data/PRINTKEE_CATALOG_KEYWORD_MAP.csv` and `PRINTKEE_TSHIRT_KEYWORD_MAP.csv` for the new intent-page assignments.
5. Use `04-programmatic-seo/PRINTKEE_GENERATED_URL_CANDIDATES.csv` only as research; do not treat it as a publication list.
6. Work through `06-governance-and-operations/PRINTKEE_SEO_IMPLEMENTATION_BACKLOG.csv` and the unresolved business/policy notes.

## File to upload in `/admin/seo`

Use only:

`03-keywords-and-search-data/PRINTKEE_KEYWORD_IMPORT_CATALOG_MAPPED.csv`

This is the compact final import. It contains all 2,796 rows and includes both the T-shirt and wider catalogue mappings. Preview the import before committing it. Do not upload the complete master or generated-candidate inventory.

## Folder map

| Folder | Purpose |
|---|---|
| `01-executive-reports` | Implementation summaries, audits, test results, and combined management report |
| `02-strategy-and-roadmap` | Competitive strategy, growth roadmap, authority plan, and change history |
| `03-keywords-and-search-data` | Keyword masters, final upload file, mapping ledgers, GSC snapshots, and priority pages |
| `04-programmatic-seo` | 14,638-candidate research inventory, canonicals, rejected/merged records, and product-location mappings |
| `05-technical-audits` | Latest crawl, sitemap, internal-link, page-inventory, and content-gap evidence |
| `06-governance-and-operations` | Backlog, deployment requirements, business inputs, and policy approvals |
| `07-reference-material` | Source PDFs used during the earlier audit and competitor-research work |

## Important controls

- Do not publish candidates solely because they were generated or approved as research.
- Do not create manufacturer, wholesaler, fixed-MOQ, guaranteed-stock, or guaranteed-delivery claims without evidence.
- Do not create cloned location pages. Each location requires verified service coverage and unique local value.
- Keep one canonical URL for each distinct search intent.
- Deployment, production database import, and Search Console submission remain separate operational actions.

## Latest authoritative files

- Implementation: `01-executive-reports/PRINTKEE_PSEO_IMPLEMENTATION_REPORT.md`
- Testing: `01-executive-reports/PRINTKEE_PSEO_TEST_RESULTS.md`
- Final keyword master: `03-keywords-and-search-data/PRINTKEE_COMPLETE_KEYWORD_MASTER_CATALOG_MAPPED.csv`
- Final admin import: `03-keywords-and-search-data/PRINTKEE_KEYWORD_IMPORT_CATALOG_MAPPED.csv`
- Latest crawl data: `05-technical-audits/SEO_CRAWL_REPORT.json`
- Operational backlog: `06-governance-and-operations/PRINTKEE_SEO_IMPLEMENTATION_BACKLOG.csv`
