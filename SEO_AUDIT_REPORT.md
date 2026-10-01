# Printkee Complete SEO Audit

Audit date: 1 October 2026  
Scope: local `frontend-next` and `backend-next` applications plus representative production pages on `https://printkee.com/`.  
Scoring note: the score below is an internal checklist score, not a Google score and not a ranking prediction.

## 1. Executive summary

Printkee is a Next.js 16.2.7 App Router storefront backed by an Express 5.1/MongoDB API. Public category, subcategory, product and CMS-blog routes are server rendered with `cache: "no-store"`; editorial, location and campaign pages are code-backed. The site has a strong crawlable taxonomy, commercial category coverage, canonical metadata, a native Next.js sitemap, robots rules, breadcrumbs/schema on most templates, and clear lead CTAs.

The most important weaknesses were inconsistent dynamic-title branding, three homepage H1 elements, repetitive generic product FAQs containing unsupported claims, missing visible product breadcrumbs, incomplete lead analytics, unverified trust/price/delivery claims, contact inconsistency, false policy links, and a probable `www`/non-`www` duplicate-host risk. Safe code fixes were made for the first five issues and for exact customizer crawler exclusion. Business facts and infrastructure redirects were not guessed.

Pre-change SEO health: **67/100**. Checklist weighting: crawl/index controls 20, metadata/canonicals 15, page semantics/content 20, structured data 15, architecture/internal links 10, performance/mobile 10, trust/conversion measurement 10. This is a technical audit score only.

## 2. Architecture and runtime inventory

- Frontend: Next.js 16.2.7, React 19.2.4, App Router.
- Backend: Express 5.1, Mongoose 8.15, MongoDB.
- Rendering: dynamic SSR/no-store for database-backed catalog and CMS pages; static/code-backed pages for homepage, company pages, locations, Diwali pages and guides; client components provide interactive grids, forms, menus and customizers.
- Public dynamic routes: `/:category`, `/:category/:subcategory`, `/:category/:subcategory/:product`, `/brands/:brand`, `/blog/:id`, `/diwali-special/hampers/:slug`, and six `/:city/corporate-gifts` paths handled by the two-segment route.
- Private/utility routes: `/admin/*`, `/login`, `/search`, `/customize*`, `/blogs/post`, and `/api/*`.
- Data: categories, subcategories, products, brands and CMS blogs come from MongoDB; seasonal products, location pages, SEO copy and two editorial guides are code-backed.
- Connected local production verification found 8 categories, 40 subcategories, 234 active products, 12 brands, 4 CMS blogs, 2 editorial guides and 6 location pages. The generated sitemap contained 325 unique canonical URLs. Reconfirm the deployed sitemap after release because the live XML endpoint could not be retrieved by the external audit client.

## 3. Findings by severity

### CRITICAL

No code-level issue was found that clearly blocks the whole storefront from indexing. Two production/infrastructure items require urgent manual verification:

1. **Sitemap availability:** the production homepage was fetchable, but `/sitemap.xml`, `/robots.txt` and `/api/sitemap-data` could not be retrieved by the audit client. The local implementations are valid and the local production build exposes the metadata routes, but Search Console and an external HTTP client must confirm 200 responses and valid content in production.
2. **Canonical host enforcement:** both `https://printkee.com/` and `https://www.printkee.com/` returned homepage content to the audit indexer. Canonicals consistently select non-`www`, but the reverse proxy should enforce a one-hop permanent redirect from `www` to non-`www`. HTTP resolved to the HTTPS non-`www` URL in the audit client.

### HIGH

- **Unverified claims and testimonials:** “Lowest Prices Guaranteed”, “Best Price Guarantee”, “1000+ Happy Clients/brands”, a conflicting “500+ corporate clients” About-page statement, “Always On-Time”, round-the-clock support, named testimonials and recognizable client logos need documentary owner approval. No Review/AggregateRating schema is emitted, which is correct.
- **Contact inconsistency:** sitewide navigation/contact/schema use `+91 88009 04543` and `sales@printkee.com`; homepage quote CTA and several content modules use `+91 87507 08222` and `sales@mfglobalservices.com`. Confirm whether these are legitimate departments and label them, or standardize them. Customizer code also contains `9990590321` as a control value; it is not presented as the public sales number but should be security-reviewed.
- **Incomplete policy destinations:** the Privacy Policy now has a dedicated `/privacy-policy` page, but “Terms of Service” and the HTML-sitemap shipping-policy link still point to `/contact`. Publish those pages only after their business and legal terms are approved.
- **Product/category claims:** visible copy includes specific MOQ, prices, 48-hour samples, one-week dispatch and ten-minute quotation claims. These exist in source/database-backed content but require owner verification before being treated as authoritative.
- **Repeated product FAQ content:** product pages without approved product FAQs previously received nine generic questions with repeated keywords and unsupported “leading manufacturer”/flexible MOQ claims. This fallback has been removed; approved database FAQs are now rendered once and match FAQ schema.

### MEDIUM

- Many raw `<img>` elements lack explicit width/height and can contribute to CLS; prioritize hero, category and product images using measured dimensions and `next/image` where compatible with the upload host.
- Hero/Swiper and several large client components increase JavaScript and hydration cost. Hidden duplicate hero images were removed, but a real-device Core Web Vitals pass is still needed.
- CMS blog URLs use MongoDB IDs instead of descriptive slugs. Do not change indexed URLs casually; introduce slugs only with a complete ID-to-slug 308 redirect map and sitemap/canonical update.
- CMS blog pages previously lacked visible breadcrumbs and related commercial links; both were added in the remediation pass.
- Sitemap lifecycle filtering now covers active products, categories, subcategories and brands plus published/legacy-published blogs. New blogs default to draft.
- Location pages are limited and differentiated, but still overlap with the broad homepage/collection topic. Monitor queries and consolidate any page that cannot sustain unique local value.
- Search/filter routes are noindex and blocked as intended. Canonicals on catalog pages omit query strings, preventing parameter duplication.
- Product cards and many content images use raw image URLs and inconsistent alt-quality inherited from database data. Run a product-image editorial pass; do not generate keyword-filled alt text.
- Static metadata includes legacy `keywords` fields. They do not harm rendering, but Google does not use meta keywords; maintain titles/descriptions instead.

### LOW

- Taxonomy labels such as “Drink Ware”, “Momento” and “stationary” contain spelling/search-language inconsistencies. Avoid URL changes; improve visible labels only after merchandising approval.
- Generic LinkedIn and unverified Twitter-profile references were present. The generic LinkedIn URL and unverified Twitter handles were removed from structured/social metadata.
- The HTML sitemap is useful but must be kept aligned with database-backed routes.
- Several marketing paragraphs are repetitive and AI-like. Improve them gradually using verified product materials, dimensions, printing methods, artwork requirements and buying guidance.

## 4. Indexability, robots, sitemap, canonicals and redirects

- Valid public templates call `notFound()` when API data is missing, allowing Next.js to emit a real 404 and `noindex` metadata.
- Admin, login, search, customizer, API and blog-authoring routes are excluded by route metadata and/or robots. The robots rule now blocks both `/customize` and descendants, and both `/admin` and descendants.
- Sitemap output uses production HTTPS, canonical paths, active products, and excludes admin/search/customizer/API URLs. Dynamic fetch failure intentionally degrades to static/editorial URLs instead of returning a 500.
- Sitemap scaling is safe below 50,000 URLs. Split it with `generateSitemaps` only if the catalog approaches that limit.
- Canonicals use `https://printkee.com` across homepage, catalog, blogs, brands, locations and campaign pages.
- `/gurugram/corporate-gifts` has a one-hop permanent redirect to `/gurgaon/corporate-gifts`.
- Query-string catalog duplicates canonicalize to the clean path through page metadata. Search results are noindex.
- Dynamic metadata now produces exactly one `| Printkee` suffix even when database titles already contain the brand.

## 5. Titles, descriptions, headings and content

- Homepage, category, subcategory, product, blog, location, brand, contact and campaign routes have metadata implementations.
- Homepage previously rendered one H1 per carousel slide (three in fallback production output). Only the first slide is now H1; later slides are H2.
- The homepage retains brand-led hero language while the title, eyebrow and supporting sections establish corporate gifting, promotional merchandise, branded products and B2B intent.
- Category/subcategory copy covers buyer use cases and printing methods, but claims involving materials, turnaround, MOQ and pricing must be validated.
- Product pages rely on actual database descriptions/specifications. No new product facts, prices, ratings, offers or stock claims were invented.
- The welcome-kits page is the correct primary page for employee welcome/onboarding/joining-kit intent. A duplicate landing page should not be created.
- `/` should remain primary for broad corporate gifting/promotional merchandise; `/collection` should remain product-led; location pages should remain local-service-intent pages.

## 6. Internal linking and breadcrumbs

- Global navigation and footer link to the eight commercial category hubs, brand/blog/company pages and the seasonal campaign.
- Category pages link to subcategories; subcategories link to products and related categories; products link back to parents and to related products.
- Homepage occasion cards link to welcome kits, Diwali, collection and apparel.
- Visible product breadcrumbs were added and now correspond to existing BreadcrumbList schema.
- CMS blog posts remain the weakest linking area. Add article-specific links to the most relevant commercial page and one next-step CTA during editorial review.

## 7. Structured data

- Sitewide Organization and WebSite/SearchAction markup is present.
- Category/product templates emit BreadcrumbList; subcategories emit ItemList; product pages emit Product without fabricated Offer or AggregateRating; blogs emit BlogPosting.
- FAQPage is emitted only when matching FAQs are visible. Homepage FAQ schema was added from the same visible FAQ data. Product FAQ rendering now uses the exact database FAQ set used in schema.
- Organization wording was neutralized and unverified social-profile identifiers removed.
- Validate representative deployed pages in Google Rich Results Test after release. Product rich-result eligibility may be limited without visible offers, reviews or shipping data; do not fabricate them.

## 8. Performance and mobile

- Positive: self-hosted Next font with swap, lazy loading on many below-fold images, responsive CSS, deferred widgets and optimized Swiper imports.
- Implemented: removed a hidden hero ImageGallery block and three hidden images that duplicated image requests; preserved visible hero behavior.
- Remaining: measure LCP/CLS/INP on real mobile data, continue converting lower-priority imagery, audit large seasonal assets and reduce client-only code where practical. Hero, logo and core catalog imagery now use measured `next/image` delivery.
- Browser automation was unavailable in this workspace, so mobile menu, tap targets, overflow and form interaction need a manual device pass despite responsive styles being present.

## 9. Analytics and conversion SEO

- GA4 (`G-4BP50X9E7L`) and Meta Pixel PageView are installed after interaction.
- Successful contact and quote submissions now send GA4 `generate_lead` with non-PII form/source parameters.
- No cart or purchase flow was found, so ecommerce events are not appropriate. WhatsApp, phone, email and quote-modal-open events were added; customizer completion remains a future measurement item. Configure GA4 `generate_lead` as a key event and test in DebugView.

## 10. Competitor gap summary

Current search results for employee-welcome-kit and corporate-gifting terms show competitors using detailed kit contents, transparent budget/MOQ bands, process timelines, packaging/branding explanations, GST information, FAQs, calculators and strong procurement CTAs. Printkee has broad product coverage and a useful welcome-kit page, but trails on verified buying information, process transparency, case studies and trust/policy depth. Fill only gaps the business can substantiate; do not copy competitor wording or claims.

Representative comparison set: Adalwin, Corpokit, PrintStop, Swpe, MerchBay, ProSwag and Corp Attire.

## 11. Implementation completed

- Corrected dynamic category, subcategory, product and CMS-blog title branding.
- Corrected BlogPosting `dateModified` to use `updatedAt` when available.
- Reduced homepage fallback to one H1.
- Added homepage FAQPage markup tied exactly to visible FAQ data.
- Removed repetitive fallback product FAQs and duplicate FAQ rendering; approved product FAQs remain visible once and match schema.
- Added visible, crawlable product breadcrumbs.
- Tightened robots exclusions for exact admin/customizer paths.
- Removed unverified Twitter handles, generic LinkedIn identity and promotional Organization wording.
- Added GA4 `generate_lead` on successful contact/quote submissions.
- Removed hidden hero image/schema requests.
- Created `SEO_KEYWORD_MAP.csv` and this audit report.

## 12. Files/pages modified

Modified application files:

- `frontend-next/app/robots.js`
- `frontend-next/app/layout.jsx`
- `frontend-next/app/(main)/[category]/page.jsx`
- `frontend-next/app/(main)/[category]/[subcategory]/page.jsx`
- `frontend-next/app/(main)/[category]/[subcategory]/[product]/page.jsx`
- `frontend-next/app/(main)/blog/[id]/page.jsx`
- `frontend-next/components/HeroSection.jsx`
- `frontend-next/components/FaqSectionHome.jsx`
- `frontend-next/components/SingleProductDisplay.jsx`
- `frontend-next/components/ContactForm.jsx`
- `frontend-next/components/EnquiryModal.jsx`
- `frontend-next/styles/SingleProductDisplay.module.css`

Created audit artifacts:

- `SEO_AUDIT_REPORT.md`
- `SEO_KEYWORD_MAP.csv`

A dedicated indexable `/privacy-policy` page was created. No production database records, checkout behavior or public URL migrations were performed.

## 13. QA and crawl summary

Local source/inventory crawl findings before changes:

- Generated sitemap inventory: 325 unique URLs with zero duplicate locations and zero non-HTTPS/non-canonical hosts in the connected local production run.
- Indexable templates: homepage, 8 category, 40 subcategory, 234 active product, brand hub/pages, blog hub/posts, about, contact, HTML sitemap, location hub/pages and Diwali campaign/product pages.
- Explicit noindex/utility templates: search, login, customizer and blog authoring; admin layout is noindex.
- Redirects: one code-managed legacy/location alias.
- Missing title/description/H1 on core templates: none identified.
- Duplicate H1: homepage carousel issue fixed.
- Missing visible breadcrumbs: product and CMS blog templates fixed; brand/location trails were aligned with schema.
- Missing canonical on core indexable templates: none identified.
- Broken/false-purpose links: footer policy links point to contact; generic social links require owner action.
- 5xx/404 production totals: unavailable because a complete production HTTP crawl could not be run from this environment.

QA results:

- `npm.cmd run build`: passed (Next.js production compile, TypeScript check, page-data collection and 35 static-page generation steps).
- Connected backend sitemap-data check: 8 categories, 40 subcategories, 234 active products, 4 blogs and 12 brands.
- Local production HTTP checks: homepage, about, contact, blog hub, brand hub, location hub, HTML sitemap and representative category/subcategory/product pages returned 200.
- Metadata checks: representative indexable pages had one H1, expected canonical, index/follow directives and unique brand suffixes.
- Sitemap check: 200 XML, 325 URLs, zero duplicates and zero URLs outside `https://printkee.com`.
- Robots check: 200 text response with expected sitemap/host and private/utility exclusions.
- Redirect check: `/gurugram/corporate-gifts` returned 308 to `/gurgaon/corporate-gifts`.
- No lint or test script exists in `frontend-next/package.json`; the production build's TypeScript phase passed.

## 14. Manual owner verification queue

1. Decide the canonical public phone/email and explain any sales-vs-support departmental split.
2. Verify all counts, named testimonials, logo/client permissions and “leading/trusted” wording.
3. Verify “lowest/best price”, delivery, 24/7 support, MOQ, starting-price, sampling, dispatch and quote-response claims.
4. Approve privacy, terms, shipping and return/refund policy copy.
5. Confirm manufacturing-location statements and the Organization postal address.
6. Confirm Facebook and Instagram URLs; provide an official LinkedIn/X URL before restoring those identifiers.

## 15. 30-day priorities

1. Deploy the implemented fixes and submit `/sitemap.xml` in Search Console.
2. Enforce/test `www` → non-`www` and HTTP → HTTPS one-hop redirects at the reverse proxy.
3. Resolve contact and claim verification; replace footer policy placeholders with approved pages.
4. Validate homepage, one category, welcome kits, one product, one blog and one location URL with URL Inspection/Rich Results Test.
5. Review GSC queries/pages for the homepage, welcome kits, polo shirts, pens, tech gifts and Diwali page; use real impressions to refine titles.
6. Capture PageSpeed Insights and CrUX baselines for representative mobile templates.

## 16. 90-day roadmap

1. Monitor the new publish/active lifecycle workflow and require editorial review before publishing CMS content.
2. Improve priority product pages with approved material, dimensions, printing method, artwork, packaging and care information.
3. Add real case studies or project examples with customer permission.
4. Publish one high-quality supporting guide at a time (onboarding kits, bulk-order brief, printing vs embroidery), each linked to one relevant commercial destination.
5. Convert priority imagery to measured responsive `next/image` delivery and reduce client JS on catalog templates.
6. Consider readable CMS blog slugs only with a tested redirect/canonical migration plan.
7. Review location-page performance; consolidate weak pages rather than multiplying locations.

## 17. Search Console actions

- Verify both domain and URL-prefix properties if not already done.
- Submit `https://printkee.com/sitemap.xml` and monitor fetch status.
- Inspect canonical selection for `/`, `/collection/welcome-kits`, a product, a blog and each location template.
- Review Page Indexing for “Duplicate, Google chose different canonical”, soft 404, crawled-not-indexed and server errors.
- Use Enhancements/Rich Results reports for Product, Breadcrumb and FAQ validity.
- Track mobile Core Web Vitals by template.
- Export 28/90-day query-page data before creating new content; do not infer volume or difficulty.

## 18. Authority/backlink recommendations

- Obtain links through genuine supplier/brand partner listings, business associations, event partnerships and approved client case studies.
- Create link-worthy procurement resources using original expertise (artwork checklist, branding-method comparison, gifting brief template).
- Keep NAP details consistent on Google Business Profile and reputable Indian business directories after the owner confirms the canonical identity.
- Avoid paid link schemes, mass directory submissions, spun guest posts and location-doorway networks.

## 19. Limitations

- No Search Console, GA4, CRM, backlink-index or keyword-volume account was available; volume/difficulty values were not invented.
- The in-app browser could not initialize. Production HTML/search inspection was completed through the available web index, but exact status headers, full XML retrieval, JavaScript interaction and mobile screenshots require a follow-up external/manual pass.
- Database content was reviewed through models, seed/content modules, representative production pages and the prior inventory artifact; no production database was mutated.

No change in this audit guarantees rankings or page-one placement.

---

# SECOND PASS / REMEDIATION

Remediation date: 1 October 2026  
Post-remediation technical SEO health: **88/100** (up from **67/100**). This score reflects code and locally verified behavior; it is not a ranking prediction.

## 20. Remediation outcome

The second pass resolved every remaining item that could be changed safely in code without inventing business facts, legal terms, client evidence, prices, minimum quantities or service promises. The release now has a deterministic canonical host rule at the application layer, lifecycle-aware sitemap inputs, a real privacy destination, central contact/configuration primitives, safer public copy, consistent lead analytics, richer product editorial fields, stronger breadcrumbs/internal links, higher-priority image optimization and a reusable sitemap-driven regression crawler.

Items controlled by the CDN/reverse proxy, Google accounts, legal counsel or business ownership are isolated in `DEPLOYMENT_SEO_REQUIRED.md`, `BUSINESS_INFO_REQUIRED.md` and `POLICY_CONTENT_REQUIRED.md`.

## 21. Before/after issue ledger

| Issue | Before | After / status |
|---|---|---|
| Canonical host | Both www and non-www could serve content | Next.js sends one-hop 308 www→`https://printkee.com`, preserving path/query. Local header test passed. HTTP and edge enforcement still require deployment configuration. |
| Sitemap availability | Production endpoint could not be verified externally | Local production `/sitemap.xml` returns 200 and 326 canonical URLs. External post-deploy verification remains required. |
| Sitemap validity | 325 URLs initially; active products only; no lifecycle for other records | 326 URLs including Privacy Policy; zero duplicates, excluded/query URLs or wrong hosts. Active filters added for category/subcategory/brand; published filter added for blogs. |
| Broken sitemap URLs | Not detected in representative testing | Full crawl found two whitespace-tainted product slugs; backward-compatible resolution and trimmed sitemap generation fixed them. Final crawl: 326/326 successful. |
| Dynamic title suffixes | Some routes could render `| Printkee` twice | Shared `brandedTitle()` normalizes dynamic titles; full crawl found zero duplicate suffixes. |
| Homepage H1 | One H1 per fallback carousel slide | One H1 only; it now directly targets corporate gifts and custom branded merchandise. |
| Broad commercial targeting | Hero wording was vague | Homepage retains the broad national cluster; `/collection/welcome-kits` remains the employee-kit authority. No competing landing page was created. |
| Unsupported trust claims | Price guarantees, client counts, always-on-time/24-hour language, named testimonials and client logos | Removed/replaced with neutral process and requirement-led copy. Full crawl found zero prohibited claim-pattern matches. |
| Fixed MOQ/price/timing claims | Source datasets included fixed prices, MOQ, 48-hour samples, one-week dispatch and ten-minute quotes | Runtime/static SEO sources and maintenance seed sources were normalized to quotation-based wording. The final public crawl found zero targeted claim patterns. The read-only catalog audit found one stored “BPA Free” label that is neutralized at the rendering boundary pending supplier documentation. |
| Testimonials/reviews schema | Visual testimonials appeared unverified; schema correctly omitted reviews | Unverified testimonials and logos removed. Product schema still emits no Offer, Review or AggregateRating. |
| Contact identity | Primary and alternate phone/email appeared without departmental labels | Public UI, WhatsApp and CTA links now use the navbar/contact/schema identity. Values are centralized; alternates are documented for owner confirmation. |
| Social links | Generic LinkedIn and empty X link; profiles not verified | Generic/empty links removed; unverified social profiles omitted from Organization `sameAs`. |
| Policy links | Terms and Shipping labels linked to Contact | False-purpose links removed. Privacy Policy has a dedicated indexable page and sitemap entry; missing legal pages are documented, not fabricated. |
| Product FAQs | Generic fallback and duplicate FAQ rendering | Only approved per-product FAQs render; visible questions and FAQ schema share the same source. Regression crawler checks schema questions are visible. |
| Homepage FAQ schema | Visible FAQs lacked schema | FAQPage uses the exact visible dataset. |
| Product breadcrumbs | Schema existed without matching visible trail | Visible breadcrumb added and aligned with schema. |
| Category breadcrumbs | Back link did not communicate hierarchy | Visible semantic breadcrumb added; existing BreadcrumbList retained. |
| CMS blog breadcrumbs/internal links | Missing | Visible breadcrumb, matching BreadcrumbList and relevant collection/welcome-kit/contact links added. |
| Brand breadcrumbs/broken cards | No BreadcrumbList; product cards linked to `#` | BreadcrumbList added; false empty links replaced with non-link cards. |
| Location hub breadcrumbs | Visible trail but no BreadcrumbList | Matching BreadcrumbList added. |
| Blog publication workflow | Every record was public and in sitemap | `draft`, `published`, `archived`, `publishedAt` and `reviewedBy` added. New posts default to draft; public API/sitemap exclude draft/archive; legacy records remain published for compatibility. |
| Catalog lifecycle | No active state for categories/subcategories/brands | Backward-compatible `isActive` fields and public/sitemap filtering added (`false` is excluded; missing legacy values remain active). |
| Product editorial depth | Generic material/size plus arbitrary rows | Optional admin/schema/display fields added for dimensions, weight, GSM, capacity, printing methods, branding areas, packaging, approved MOQ/lead-time text, samples, customization and care. Existing records remain valid. |
| Images and CLS/LCP | Hero was a CSS background; many core images were raw `<img>` | Hero is a prioritized responsive `next/image`; navbar/footer, category, listing and product imagery use intrinsic dimensions/Next Image. Lower-priority editorial/seasonal images remain a future measured conversion. |
| Third-party scripts | GA4 and Meta both loaded after interaction | Meta Pixel moved to `lazyOnload`; GA4 remains after-interactive for measurement. |
| Lead analytics | Only two forms emitted GA4 and risked inconsistent coverage | `submitLead()` now emits Meta Lead and GA4 `generate_lead` once after at least one capture succeeds. WhatsApp, phone, email and quote-open clicks have shared events. No PII is sent in event parameters. |
| 404/noindex behavior | Representative checks only | Full crawl confirms sitemap pages are indexable; an unknown route returns 404. Draft/archived blog API responses return 404. |
| Redirect regression | Gurugram alias existed | 308 retained and tested. New www redirect is also tested automatically. |
| Automated tests | No test script | `npm run test:seo` now validates robots, sitemap, hosts, duplicates, exclusions, redirects, statuses, title/description/H1/canonical, noindex conflicts, JSON-LD validity, FAQ visibility, Product schema safety, internal links and 404 behavior. |
| Dependencies | No audit evidence | Next upgraded 16.2.7→16.3.6, Axios upgraded to 1.20.0 in both apps, and compatible audit fixes applied. Backend audit is now clean. Frontend retains Fabric 5 advisories and its optional native-install chain; Fabric 7.4 is a breaking upgrade and was not forced. |
| Mobile UX/CWV | Source-only responsive review; browser runner unavailable | Responsive structure, intrinsic images and primary mobile controls were code-reviewed and production-rendered. Real-device menu/form/overflow and CWV testing remain required because the in-app browser could not initialize. |
| GSC/GA4/GBP/off-site authority | No account access | Explicit owner actions retained below; no performance, rankings, backlinks or profile facts were fabricated. |

## 22. Final indexation matrix

| Route type | Intended state | Enforced by |
|---|---|---|
| Home, About, Contact, Privacy, Brands, Blogs, Locations, Diwali | Index/follow | Metadata + sitemap |
| Active category/subcategory/brand | Index/follow | Public API lifecycle filter + sitemap filter |
| Active product with resolvable parents | Index/follow | Product `isActive` filter + sitemap + real 404 fallback |
| Published CMS blog and legacy pre-workflow blog | Index/follow | Public API + sitemap publication filter |
| Draft or archived CMS blog | Not publicly resolvable | Public API returns 404; omitted from sitemap |
| Inactive product/category/subcategory/brand | Not publicly resolvable/listed | Public API filters and sitemap omission |
| Admin, login, search, customizer, API, blog authoring | Noindex / excluded | Route metadata and robots rules |
| Unknown dynamic path | 404/noindex | `notFound()` behavior |

## 23. Location-page decision

All six current city pages remain indexable: Delhi, Noida, Greater Noida, Gurgaon, Faridabad and Ghaziabad. Each has city-specific title, description, introduction, planning context and use case; all link back to the location hub and national collection. No new city pages were generated. Review GSC query/page performance after 90 days and consolidate any page that attracts no distinct local intent or cannot be expanded with verified local usefulness.

## 24. Dependency/security status

- Frontend direct security upgrades: Next.js 16.3.6 and Axios 1.20.0.
- Backend direct security upgrade: Axios 1.20.0; compatible audit fixes reduced the production audit to zero findings.
- Frontend remaining: Fabric 5 stored-XSS/SVG advisories and an optional native dependency chain involving `node-pre-gyp`/`tar`. The available Fabric remediation requires a breaking major upgrade and customizer regression testing, so it is documented rather than forced.
- Do not accept untrusted SVG/customizer data for export until the Fabric upgrade is completed and reviewed.

## 25. Final QA evidence

- `npm.cmd run build`: passed on Next.js 16.3.6, including compile, TypeScript, page-data collection and 36 static pages.
- `npm.cmd run test:seo`: passed.
- Sitemap: 326 unique URLs; 326 crawled; 0 wrong-host, query, duplicate or excluded URLs.
- Page checks: 326 pages with 0 status, title, description, H1, canonical, noindex or JSON-LD errors.
- Internal links: 93 unique crawlable paths checked; 0 broken.
- Structured data: all JSON-LD parsed; no Product Offer/Review/AggregateRating fabrication; FAQ schema questions matched visible content.
- Claims: 0 prohibited claim-pattern findings in rendered sitemap pages. A read-only audit of 234 active products and 4 published/legacy-published CMS blogs found one stored “BPA Free” label; public rendering neutralizes it until the owner verifies supporting documentation or edits the catalog record.
- Redirects: local Host-header test returned 308 from www to non-www HTTPS and preserved path/query; Gurugram alias returned 308.
- Unknown URL: returned 404.
- Backend JavaScript syntax checks: passed for modified models/routes.
- `git diff --check`: passed (line-ending notices only).

The machine-readable crawl evidence is in `SEO_CRAWL_REPORT.json`.

## 26. Remaining owner/external actions

1. Deploy and externally verify the three one-hop host/scheme redirects described in `DEPLOYMENT_SEO_REQUIRED.md`.
2. Confirm public/legal identity, contact channels, address, social profiles, client evidence and all future commercial claims in `BUSINESS_INFO_REQUIRED.md`.
3. Obtain legal approval and source content for Terms, Shipping/Delivery, Returns/Refund/Cancellation and cookie/consent handling in `POLICY_CONTENT_REQUIRED.md`.
4. In Search Console, submit the sitemap, inspect representative templates, monitor Page Indexing/canonical selection, and review query-page data before creating new keyword pages.
5. Validate deployed Organization, Breadcrumb, Product and FAQ markup with Google tools.
6. Configure GA4 `generate_lead` as a key event and verify `generate_lead`, `quote_request` and `contact_click` in DebugView without sending PII.
7. Run real-device/mobile checks and PageSpeed/CrUX baselines for home, category, welcome kits, product, blog and location templates.
8. Plan and regression-test the breaking Fabric 7.4+ customizer upgrade separately.
9. Verify or remove the stored “BPA Free” attribute for the Magic Suction Mug using supplier documentation; the public page intentionally renders neutral wording meanwhile.

## 27. Updated 30/90-day plan

### Next 30 days

1. Deploy, run the automated SEO crawl against production and verify edge redirects/metadata endpoints externally.
2. Complete business/legal approvals and publish only policies and claims backed by approved source material.
3. Complete GSC sitemap submission, representative URL inspection and GA4 DebugView/key-event configuration.
4. Capture mobile CWV baselines and address the largest measured LCP/CLS/INP contributor per template.
5. Review priority product records using the new specification fields, beginning with welcome kits, polo shirts, pens, drinkware and technology gifts.

### Next 90 days

1. Use GSC demand and landing-page evidence to refine the keyword map; do not create overlapping generic pages.
2. Add approved case studies/project examples and article-specific commercial links with customer permission.
3. Expand genuinely useful product specifications and image alt text from supplier/owner records.
4. Evaluate location pages using distinct queries, conversions and engagement; consolidate weak pages.
5. Complete the Fabric/customizer security migration and continue image/client-JavaScript optimization based on measured performance.

No remediation in this section guarantees rankings or page-one placement.
