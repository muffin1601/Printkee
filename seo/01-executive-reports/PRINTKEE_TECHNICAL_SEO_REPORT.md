# Printkee Technical SEO Report

Audit and verification date: 9 October 2026

## Outcome

The current application is production-buildable and the executed SEO regression crawl passed with zero errors and zero warnings. The crawl covered 330 sitemap URLs and checked 93 distinct internal paths. No prohibited marketing-claim patterns were detected in rendered pages.

## Indexing and crawl controls

| Check | Result | Evidence / action |
|---|---|---|
| Canonical origin | Pass | `https://printkee.com`; `www` permanently redirects to apex. |
| Self-canonicals | Pass | Regression crawl found no mismatches among sitemap URLs. |
| XML sitemap | Pass | 330 unique canonical URLs after adding the HTML sitemap itself. |
| Sitemap eligibility | Pass | Draft/noindex/archived managed SEO pages are excluded; query strings, fragments, foreign hosts, and duplicates are filtered. |
| Robots | Pass | Public pages allowed; admin, API, login, customizer, search, and blog-authoring routes disallowed. Sitemap declaration is correct. |
| Unknown URLs | Pass | Regression test confirmed a true 404. |
| Redirects | Pass | Canonical-host, Gurugram/Gurgaon, historical capitalization, malformed product, and legacy route cases are covered by permanent redirects. |
| Broken internal links | Pass | None found among 93 internal paths discovered during the crawl. |
| Soft 404s | No defect found | Known unknown-path test returns 404; full Search Console soft-404 data still requires credentials. |

## Rendering and routing

- Next.js 16.3.6 App Router supplies server-rendered metadata and content.
- Static editorial pages are pre-rendered; dynamic catalog pages are server-rendered; subcategory and managed SEO data use revalidation.
- Existing one-, two-, and three-segment catalog routes remain authoritative.
- Managed SEO pages resolve only as a fallback for approved exact paths that are not owned by catalog/static routes.
- Backend sitemap failure degrades to the static page set. This is resilient but can temporarily omit database routes; uptime monitoring is recommended.

## Metadata

- One title, one meta description, one H1, and one self-canonical were required and verified for each sitemap URL by the regression suite.
- Title branding is normalized to avoid duplicate `| Printkee` suffixes.
- Open Graph and Twitter fields are present on major page types.
- Search result pages are disallowed from crawling to avoid internal-search indexation.
- Metrics unavailable from paid tools remain `UNKNOWN`; no search volume or keyword difficulty was invented.

## Structured data

Current supported types include Organization, WebSite, BreadcrumbList, CollectionPage, ItemList, Product, FAQPage, and BlogPosting. The regression suite parses every JSON-LD block and verifies visible FAQ questions. Product schema does not fabricate offers, prices, availability, ratings, or reviews.

LocalBusiness is intentionally not emitted for the six location pages because the repository supports one verified New Delhi business address, not six local offices.

## Sitemap and page inventory

- Verified current sitemap/crawl: 330 indexable URLs.
- Combined code/seed/crawl inventory: 349 records.
- Nineteen code/seed records were absent from the current sitemap crawl and are labelled `NOT VERIFIED` in `PRINTKEE_SEO_PAGE_INVENTORY.csv`, rather than being assumed public.
- The HTML sitemap is now explicitly included in the XML sitemap.

## Internal linking

The site exposes primary categories through navigation/footer, subcategories through taxonomy views, products through parent grids, locations through `/locations`, managed pages through controlled hubs, and broad discovery through `/sitemap`. The regression crawl found no broken discovered paths.

Exact per-page inbound/outbound counts were not emitted by the current crawler, so `PRINTKEE_INTERNAL_LINK_AUDIT.csv` labels these values `NOT VERIFIED` and provides a click-depth/risk/action assessment. A future crawl enhancement should persist the full directed link graph and flag pages with fewer than three relevant inbound links.

## Query parameters, filters, and pagination

- Internal search uses query parameters and is blocked from organic crawling.
- No public faceted/filter URL system was found in the catalog.
- The current catalog APIs paginate admin/search data, while public subcategory grids render canonical product paths.
- No duplicate indexable query-parameter URLs were found in the sitemap.

## Images and performance

- Next Image is used on major product grids/detail pages with explicit dimensions.
- The repository contains modern WebP assets and deferred below-the-fold widgets.
- Some search/managed landing markup still uses plain `<img>` elements; migrate selectively only after verifying remote-image domains and layout requirements.
- A code/build audit cannot establish field LCP, INP, or CLS. Use GSC Core Web Vitals and PageSpeed/CrUX for production measurements.

## Accessibility and mobile

Source review found semantic headings, breadcrumb labels, search labels, button names, responsive styles, and keyboard-triggered search. The production build passed. Browser-assisted keyboard/focus/contrast/screen-reader testing was not executed in this terminal pass and remains required before claiming WCAG conformance.

## Analytics and conversion

- GA4 and Meta Pixel are loaded globally.
- `generate_lead` fires only after at least one lead channel succeeds.
- Standard `contact`, `view_item`, `select_item`, and `search` events were added.
- Event parameters are bounded and reject likely email addresses or phone numbers.
- No purchase/checkout events were added because the site is quote-led.

## Remaining external checks

1. Current GSC index coverage, URL Inspection, sitemap submission, country/device splits, and manual actions.
2. GA4 DebugView/Realtime confirmation in the deployed environment.
3. CrUX/PageSpeed field data and mobile usability.
4. Schema Markup Validator/Rich Results spot checks after deployment.
5. Production logs for backend fetch failures, sitemap response time, and 404 patterns.
6. Owner verification of business details, product claims, images, and fulfilment constraints.

No ranking outcome is guaranteed by these technical results.
