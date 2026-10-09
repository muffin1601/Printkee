# Printkee 14,000+ URL Programmatic SEO Architecture

## Outcome

The implemented engine stores a deterministic research inventory separately from public landing pages. It generates **14,638 candidates**, all **14,638 paths are unique**, and **zero new candidates are published automatically**. Publication remains controlled by the existing `SeoPage` quality gate.

## Inventory design

| Dimension | Implemented scope |
|---|---:|
| Canonical category/subcategory intents | 46 |
| Catalogue products | 235 |
| Geography nodes | 22 |
| Search modifiers plus base intent | 13 + base |
| Stored research candidates | 14,638 |
| Exact duplicate paths | 0 |

One catalogue category and subcategory share the same slug and intent; the generator consolidates them before combination generation. This is why the canonical intent count is 46 rather than the raw 47 records.

## Data model

- `SeoKeyword` is the lossless keyword ledger. It uses a row-stable source key, so repeated normalized terms are not silently dropped.
- `SeoLocation` records the location hierarchy, service feasibility, real constraints, and activation status.
- `SeoCandidate` stores each product/category × modifier × geography decision with a unique path index, disposition, canonical assignment, warnings, and indexing flags.
- `SeoPage` remains the reviewed landing-page model (the requested SeoLandingPage role). It now includes images, quotation path, and significant-content timestamps.
- `SeoOpportunity` remains the requested SeoPageOpportunity role and now includes cluster, commercial value, gaps, findings, competing URL, and disposition reason.
- `SeoAuditEvent` records committed imports, generation runs, and bulk actions.

## Lifecycle

`CANDIDATE → APPROVED → SeoPage DRAFT → QUALITY_REVIEW → INDEXABLE`

Alternative terminal paths are `REJECTED`, `MERGED`, `CANONICALIZED`, and `ARCHIVED`. Candidate approval does not make a URL public. The public resolver returns only exact `SeoPage` paths with `status=INDEXABLE` and `robots.index=true`; unknown paths return 404.

## Quality and safety gates

The page gate checks metadata, H1, useful reviewed content, active products, descriptive images, canonical correctness, structured-data configuration, internal-link format, quotation path, route collisions, duplicate keyword/title/H1 intent, content similarity, unsupported operational claims, and verified location information. Location candidates remain research-only until service feasibility and genuinely useful local information exist.

Manufacturer and wholesale variants are rejected until their claims can be substantiated. Customised and personalized variants are canonicalized to the custom intent to prevent cannibalization. Candidate URLs are not inserted into sitemaps.

## Rendering and discovery

The existing exact-path server-rendered resolver is reused; no thousands of page files or build-time static paths are created. The HTML sitemap links existing category and location hubs plus approved SEO pages. XML discovery is split across a backward-compatible `/sitemap.xml`, `/sitemap-index.xml`, and seven bounded sitemap partitions.

## Rollout

1. Improve existing catalogue and commercial routes using measured query data.
2. Convert a small approved candidate cohort into reviewed SeoPage drafts.
3. Expand only verified location clusters with unique service information.
4. Increase coverage only after indexation, engagement, enquiry, and Search Console evidence justify it.
