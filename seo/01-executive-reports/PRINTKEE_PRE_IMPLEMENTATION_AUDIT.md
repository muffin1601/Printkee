# Printkee Pre-Implementation SEO Audit

Audit date: 9 October 2026  
Primary market: India  
Canonical production origin: `https://printkee.com`

## Executive assessment

Printkee already has a strong technical base for controlled SEO growth. The current repository is not a blank implementation: it contains server-rendered catalog routes, canonical metadata, robots and XML-sitemap handlers, structured data, permanent redirect controls, an HTML sitemap, differentiated Delhi NCR location pages, Google Analytics, enquiry capture, Search Console exports, SEO regression tests, and a database-backed SEO landing-page workflow with editorial and quality gates.

The highest-value work in this pass is therefore not a rebuild. It is to reconcile all 2,796 supplied keyword candidates against the existing catalog, verified Search Console evidence, supported products, and current URLs; document unsupported/expansion topics; close measurement and reporting gaps; and preserve the existing URL owners.

No rankings, keyword volumes, local premises, manufacturing status, prices, reviews, delivery guarantees, or international fulfilment capabilities are assumed.

## Evidence reviewed

- Entire repository file inventory, including 238 non-generated frontend source files and 98 backend/source-data files.
- `PurplePalette_Printo_SEO_Keyword_Universe.csv`: 2,796 data rows, eight source columns, UTF-8 input, and 2,796 case-insensitive original keyword values.
- `PurplePalette.in SEO Reverse-Engineering Report (1).pdf`: all 28 pages extracted and reviewed.
- Current catalog seed data: eight categories, 39 subcategories, and 235 products.
- Existing GSC-derived files: 1,000 query rows, 1,000 opportunity rows, 1,000 query-to-target rows, and 181 page-priority rows.
- Existing crawl report and prior SEO audit/implementation records.
- Live homepage and HTML sitemap observations on 9 October 2026. The external fetch tool could render the homepage and `/sitemap`; it could not directly retrieve `/robots.txt`, `/sitemap.xml`, `/corporate-gifting`, or `/locations`, so those endpoints remain repository/build-test verified rather than independently live-fetched in this pass.

## Application architecture

| Area | Current implementation | Audit conclusion |
|---|---|---|
| Frontend | Next.js 16.3.6, React 19, App Router | Preserve. Server components provide metadata and rendered commercial content. |
| Routing | Static editorial routes plus one-, two-, and three-segment dynamic catalog routes | Preserve route ownership. Catalog lookup wins before an approved SEO-page fallback. |
| Backend | Express 5 API with Mongoose 8 / MongoDB | Preserve. Backend owns catalog, blog, brand, admin, enquiry, sitemap-data, and managed SEO records. |
| Admin | JWT-protected client dashboard and protected API writes | Existing category, subcategory, product, blog, banner, SEO-page, taxonomy, and opportunity controls are present. |
| Hosting assumptions | Separate frontend/backend origins configured through environment variables; canonical public origin is `https://printkee.com` | Deployment platform is not declared in repository configuration. Confirm frontend `BACKEND_URL`, public API/image origins, CORS, and backend `BASE_URL` in the deployment environment. |
| Rendering | SSR/dynamic fetch for categories, ISR for subcategories and managed SEO pages, dynamic sitemap | Appropriate for indexable catalog and editorial content. Backend outages remain a rendering/sitemap dependency. |

## Environment and secret handling

Observed required or optional configuration includes `MONGO_URI`, `JWT_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `RESEND_API_KEY`, `BASE_URL`, `CORS_ORIGIN`, `BACKEND_URL`, `NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_IMG_URL`, `CRM_API_URL`, and `CRM_API_KEY`. Secret values were not read or reported. Environment files are ignored by Git. No `.env` file should be committed.

## Public route inventory

Current public route families:

- Homepage: `/`.
- Catalog: `/{category}`, `/{category}/{subcategory}`, and `/{category}/{subcategory}/{product}`.
- Eight seeded categories, 39 seeded subcategories, and 235 seeded products.
- Brands: `/brands` and `/brands/{brand}`.
- Blog: `/blogs`, `/blog/{id}`, two code-backed 2026 Diwali guides, and the authoring route `/blogs/post` (excluded from indexing).
- Corporate/editorial hubs: `/corporate-gifting`, `/industries`, `/use-cases`, `/locations`, and `/sitemap`.
- Location pages: `/delhi/corporate-gifts`, `/noida/corporate-gifts`, `/greater-noida/corporate-gifts`, `/gurgaon/corporate-gifts`, `/faridabad/corporate-gifts`, and `/ghaziabad/corporate-gifts`.
- Seasonal: `/diwali-special` and 12 code-backed hamper-detail routes.
- Utility: `/about`, `/contact`, `/privacy-policy`, `/search`, `/login`, and `/customize` routes.
- Admin and API routes are not public organic-search targets.

The existing crawl baseline contains 329 sitemap URLs. The production sitemap is designed to add active database catalog/blog/brand records and only self-canonical, approved `INDEXABLE` SEO pages.

## Catalog and product availability

Supported catalog clusters include apparel and accessories; office and writing; welcome kits, clocks, and keychains; bags and travel; technology accessories; cork-based eco products; drinkware; and trophies/mementos. Broad printing services, labels/stickers, packaging, business-print production, photo products, and decor keywords in the supplied universe are not proven catalog offerings and must remain expansion opportunities unless the business confirms them.

Terms such as manufacturer, factory, wholesaler, distributor, certified, guaranteed, and local office cannot be adopted as Printkee claims merely because they occur in competitor or keyword data.

## Existing SEO implementation

### Metadata and canonical handling

- Root metadata defines a canonical base, a branded title pattern, description, Open Graph, Twitter, and robots directives.
- Category, subcategory, product, brand, blog, location, campaign, and managed SEO routes generate server-rendered metadata and self-canonicals.
- A permanent `www.printkee.com` to apex redirect and a Gurugram-to-Gurgaon redirect are declared.
- `proxy.js` preserves several historical malformed/legacy catalog URLs with 308 redirects.

### Robots and sitemaps

- `app/robots.js` allows the public site and disallows admin, API, login, customizer, search, and authoring paths.
- `app/sitemap.js` includes static editorial pages and active backend content, normalizes trailing slashes, rejects foreign hosts/query strings/fragments, deduplicates URLs, and includes managed SEO pages only when self-canonical and approved.
- Sitemap generation degrades to the static list if the backend is unavailable. This avoids a total failure but can temporarily omit dynamic content.

### Structured data

- Organization and WebSite markup are global.
- BreadcrumbList is used across catalog/editorial routes.
- Category/subcategory pages can emit FAQPage/ItemList where matching visible content exists.
- Product pages emit Product without fabricated offers, prices, ratings, or reviews.
- Blog pages emit BlogPosting.
- Managed SEO pages support CollectionPage, ItemList, BreadcrumbList, and visible FAQ markup.
- LocalBusiness is not emitted for city pages, avoiding unsupported local-premises claims.

### Internal linking

- Global navigation and footer expose the main catalog taxonomy.
- `/sitemap` is a crawlable HTML hub.
- `/locations` links the six approved Delhi NCR location pages.
- Product/category components include related navigation and quote paths.
- Managed SEO hubs list only approved/indexable records.
- Exact page-level inbound-link counts require a successful current full crawl and are reported as `NOT VERIFIED` where unavailable.

## SEO landing-page engine and admin controls

The database-backed system already supports exact path, slug, page type, category/subcategory, location, buyer, industry, occasion, use case, intent, primary and secondary keywords, metadata, H1, introduction, content blocks, FAQs, featured products, internal links, canonical, robots, social metadata, schema switches, priority, demand score, lifecycle, quality score, similarity, and review/publication timestamps.

Lifecycle is `DRAFT` / `QUALITY_REVIEW` / `INDEXABLE` / `NOINDEX` / `ARCHIVED`. Publication is blocked unless deterministic checks pass for metadata, H1, useful content, a relevant product, parent context, internal links, self-canonical configuration, route ownership, duplicate keyword/title/H1 conflicts, and excessive similarity. Draft, noindex, archived, or invalid records are excluded from public resolution and the sitemap.

The safe gap is operational rather than architectural: full keyword reconciliation and CSV import/export/validation need to be documented and tested without creating a parallel SEO system.

## Enquiries, trust, and analytics

- Enquiries fan out to a server-side CRM proxy and Resend email endpoint; success is reported when at least one channel accepts the lead.
- Contact requires at least phone or email, and email attachments are limited to PDF and 10 MB.
- `generate_lead` fires only after confirmed lead capture; Meta Lead is also fired.
- GA4 and Meta Pixel are installed globally.
- The requested GA4 naming is incomplete: contact/quote interactions use custom names and catalog `view_item`, `select_item`, and on-site `search` events are not yet consistently implemented.
- The live site displays business identification, email, phone, a New Delhi address, requirement-led quotations, conditional delivery language, and product/customisation guidance. These should remain the source of truth and be owner-verified periodically.

## Mobile, accessibility, images, and Core Web Vitals

- Responsive CSS modules, explicit mobile navigation, labelled search inputs, semantic headings, and Next.js font optimisation are present.
- Many catalog and campaign images are WebP; some component paths still use plain `<img>` and should be migrated selectively where Next Image is compatible.
- Deferred widgets reduce initial client JavaScript, and large campaign imagery uses batching.
- Repository inspection cannot prove field Core Web Vitals. CrUX/PageSpeed and GSC CWV data are required before claiming LCP, INP, or CLS results.
- Accessibility requires browser-assisted keyboard, focus, contrast, form-error, and screen-reader testing; source review alone is insufficient.

## Search performance evidence

Existing files contain verified GSC-derived query and page metrics for a prior three-month window. They support prioritising demonstrated opportunities such as office files/folders, aprons, lanyards, welcome kits, ties, tote bags, winter wear, wireless charging, duffle bags, and branded merchandise. Exact supplied-keyword matches will inherit those metrics; all unmatched volume/difficulty/position/impression/click/CTR fields must be `UNKNOWN` or `NOT VERIFIED`.

Search Console property access, current index coverage, URL inspection, sitemap submission state, and fresh query/page exports were not available through credentials in this pass.

## Indexing and duplication risks

1. Dynamic public pages depend on backend availability during fetch/build/revalidation.
2. Broad one-/two-/three-segment routes make path ownership checks essential; the existing SEO quality service correctly protects catalog routes.
3. Static sitemap entries can drift from actual campaign inventory unless regression tests run after edits.
4. Generic city or international pages would become doorway/thin-content risks without distinct service evidence.
5. Similar supplier/manufacturer/wholesale keywords should be consolidated into product/category intent and must not create unsupported business claims.
6. Broad printing, packaging, label, stationery-print, photo, and decor queries currently exceed demonstrated product availability.
7. Existing code and content include historical marketing language; the claim-audit patterns should continue to run on every release.

## Safe implementation scope for this pass

P0:

- Produce a zero-unmapped, row-level master keyword report.
- Preserve every current canonical catalog route.
- Reconcile exact GSC evidence without inventing metrics.
- Refresh route/page/internal-link inventories and technical reporting.
- Run backend quality tests, TypeScript/build checks, and SEO regression checks where the local stack permits.

P1:

- Add missing standard GA4 commerce/search/contact events without personal information.
- Add safe CSV export/import validation to the existing SEO administration only if it can be tested without a production database mutation.
- Correct concrete sitemap, canonical, metadata, accessibility, or structured-data defects found by executed tests.

Deferred pending business or external evidence:

- New indexable city pages outside the six existing Delhi NCR pages.
- Country-specific/international pages and hreflang.
- Manufacturer/factory/wholesaler/distributor claims.
- Publishing broad printing, packaging, labels, business-printing, photo, or decor landing pages.
- Search Console submission, production deployment, DNS, or database migrations.

## Pre-change baseline

- Working tree contained only the two supplied source files as untracked inputs when this audit began.
- Frontend: Next.js 16.3.6 / React 19.2.4.
- Backend: Express 5.1.0 / Mongoose 8.15.1.
- Seed catalog: 8 categories / 39 subcategories / 235 products.
- Keyword universe: 2,796 input rows / 2,796 original case-insensitive keyword strings.
- Search data: verified metrics available for exact matches in the existing 1,000-query GSC baseline; otherwise unknown.

This file is the required pre-implementation checkpoint. Subsequent work must stay within the safe scope above.
