# Printkee SEO Content Audit Report

Audit date: 23 September 2026  
Scope: public website routes, route templates, static content modules, navigation, footer, and the live sitemap-data inventory. Admin, login, search, customizer, API, and blog authoring routes are excluded from the optimisation plan because they are non-indexable.

## A. Executive summary

- **Indexable inventory:** 8 category URLs, 40 subcategory URLs, 234 active product URLs, 12 brand URLs, 4 database blog URLs, 2 editorial guides, 6 location pages, and 10 core/static public pages. This is **316 currently enumerable dynamic URLs** plus static/editorial routes.
- **Business model:** B2B corporate gifting and branded merchandise. Commercial priority belongs to category, subcategory, product, collection, Diwali, and contact routes.
- **Strong content:** homepage, major category descriptions, Diwali guides, location pages, product template, and contact path.
- **Safe improvements implemented:** 4 homepage contextual internal links; previous technical fixes are retained.
- **Content not rewritten:** product facts, claims, pricing, delivery times, policies, database descriptions, and testimonials were deliberately preserved because their accuracy must be owned by the business.

## B. Complete content inventory

| URL / route | Page type | H1 / title source | Primary topic | Intent | Content status | FAQ / schema | Internal links | Action |
|---|---|---|---|---|---|---|---|---|
| `/` | Homepage | Hero H1 | Corporate gifting and custom branding | Commercial investigation | Strong | FAQ; Organization/WebSite | Category, occasion, service, CTA links | Improved occasion links |
| `/:category` (8) | Category | API name / SEO config | Product family | Commercial investigation | Strong for categories with description data | Breadcrumb, FAQ where present | Subcategories and products | Reviewed |
| `/:category/:subcategory` (40) | Subcategory listing | SEO H1 / subcategory name | Product type | Commercial investigation | Mixed; data-backed descriptions where available | Breadcrumb, ItemList | Parent, products, related categories | Dynamic rendering retained |
| `/:category/:subcategory/:product` (234 active) | Product | Product name | Individual branded product | Transactional / enquiry | Template strong; database copy varies | Product/Breadcrumb/visible FAQ | Parent and related products | Reviewed; no fact invention |
| `/collection` | Category | Collection | Curated corporate gift sets | Commercial investigation | Strong | Category schema inherited | Welcome kits, clocks, keychains | Reviewed |
| `/diwali-special` | Campaign | Diwali campaign H1 | Festive corporate gifts | Commercial investigation | Strong | Campaign metadata | Guides, hampers, enquiry | Reviewed |
| `/diwali-special/hampers/:slug` (3) | Campaign product | Hamper name | Diwali hamper | Transactional / enquiry | Strong | Product schema | Campaign and contact | Reviewed |
| `/brands`, `/brands/:brand` (12) | Brand | Brands / brand name | Available brands | Navigational | Adequate | Brand metadata | Brand pages | Reviewed |
| `/blogs`, `/blog/:id` (4) | CMS blog | Blog title | Varies by post | Informational | Database-copy dependent | BlogPosting | Blog listing | Review editorial content before changes |
| `/blog/corporate-diwali-gifts-buying-guide-2026` | Editorial guide | Guide title | Corporate Diwali planning | Informational → commercial | Strong | BlogPosting, FAQ, breadcrumbs | Tech, eco, collection, Diwali, contact | Reviewed |
| `/blog/best-corporate-diwali-gifts-delhi-ncr-2026` | Editorial guide | Guide title | Delhi NCR Diwali planning | Informational → commercial | Strong | BlogPosting, FAQ, breadcrumbs | Diwali, tech, eco, collection, contact | Reviewed |
| `/locations`, `/:city/corporate-gifts` (6) | Service-area | Location title | Corporate gifting in Delhi NCR | Commercial investigation | Adequate and differentiated | ItemList/breadcrumb | Collection and contact | Reviewed for doorway risk |
| `/about` | Corporate | About Printkee | Company information | Navigational / trust | Adequate | Organization inherited | Contact | Reviewed |
| `/contact` | Contact | Contact | Corporate gifting enquiry | Transactional | Strong | Contact metadata | CTA destination | Reviewed |
| `/sitemap` | HTML sitemap | Sitemap | Navigation | Navigational | Adequate | None | Core categories and pages | Reviewed |

### Non-indexable routes reviewed

`/admin/*`, `/login`, `/customize`, `/customize/:productType`, `/search`, `/api/*`, and `/blogs/post` are utility, private, or authoring routes. They are excluded through metadata and/or robots rules and were not given SEO content.

## C. Content and linking changes made

### Homepage — `components/ShopByOccasion.jsx`

| Previous state | Change | Destination | Why |
|---|---|---|---|
| “Explore Kits” was a non-functional button | Linked CTA | `/collection/welcome-kits` | Connects employee-onboarding intent to the relevant existing subcategory |
| “Shop Hampers” was a non-functional button | Linked CTA | `/diwali-special` | Connects festive gifting intent to the seasonal commercial page |
| “Send a Gift” was a non-functional button | Linked CTA | `/collection` | Gives client-appreciation visitors a suitable curated-product route |
| “Browse Giveaways” was a non-functional button | Linked CTA | `/apparel-and-accessories` | Connects event and expo giveaway intent to a relevant product family |

No paragraphs, claims, specifications, FAQs, prices, delivery promises, or product descriptions were added. Approximate words added: **0**; internal links added: **4**.

## D. Content modified

No existing marketing copy was rewritten. This is intentional: category content already provides substantial B2B context, while product and CMS-blog facts are database-managed and should be edited with business approval.

## E. Content reviewed and left unchanged

| Area | Reason |
|---|---|
| Homepage service, industry, process, FAQ, and enquiry sections | Clear B2B positioning without a disruptive long-form rewrite |
| Category descriptions | Generally substantial, scannable below-listing copy with category-specific use cases |
| Product template | Uses actual database descriptions/specifications and enquiry CTA; no unsupported content added |
| Editorial Diwali guides | Distinct guide intents, useful FAQs, commercial links, and appropriate caveats |
| Location pages | Limited to six Delhi NCR areas and include distinct planning context; no mass-city expansion made |

## F. Keyword / topic map

| Page group | Primary topic | Secondary topics | Intent / funnel | Related content |
|---|---|---|---|---|
| Homepage | Corporate gifting | Branded merchandise, bulk orders, employee/client/event gifting | Commercial investigation | All category routes |
| Collection / welcome kits | Employee onboarding kits | Joining kits, branded gift sets | Commercial investigation | Homepage, collection, contact |
| Apparel | Branded apparel | Uniforms, event merchandise | Commercial investigation | Event giveaway CTA |
| Bags | Custom corporate bags | Backpacks, travel gifting | Commercial investigation | Product listings |
| Drinkware | Branded drinkware | Bottles, mugs, onboarding gifts | Commercial investigation | Welcome kits |
| Technology | Branded tech gifts | Power banks, desk accessories | Commercial investigation | Diwali buying guide |
| Eco products | Sustainable corporate gifts | Cork products, reusable gifts | Commercial investigation | Diwali buying guide |
| Diwali campaign | Corporate Diwali gifts | Hampers, employee/client gifting | Commercial investigation | Both guides, contact |
| Diwali buying guide | How to plan a corporate Diwali order | Budget, branding, delivery brief | Informational → commercial | Diwali campaign, collection, contact |
| Delhi NCR guide | Delhi NCR corporate Diwali gifts | Procurement, multi-location delivery | Informational → commercial | Diwali, collection, contact |

## G. Cannibalization report

| Topic | Competing pages | Risk | Intended primary page | Fix / guidance |
|---|---|---|---|---|
| Corporate Diwali gifts | Campaign, buying guide, Delhi NCR guide | Low | `/diwali-special` for commercial product discovery | Guides are explicitly planning-led and link to campaign |
| Corporate gifting | Homepage, collection, location pages | Medium | `/` for broad intent | Keep collection product-led and locations service-area-led |
| Employee welcome kits | Homepage card, collection, welcome-kits subcategory | Low | `/collection/welcome-kits` | Homepage now links directly to the subcategory |
| Event giveaways | Homepage card, apparel category | Low | `/apparel-and-accessories` | Homepage now links to product family rather than a duplicate page |

## H. Content gaps — recommendations for SEO team review

| Priority | Topic | Suggested URL | Type | Intent | Existing conflict | Recommendation |
|---|---|---|---|---|---|---|
| Critical | Privacy policy / terms / shipping / returns | Existing legal URLs after approved copy | Trust/legal | Navigational | Footer currently points these labels to contact | Publish approved policy pages; do not invent terms |
| High | Employee onboarding kit guide | `/blog/employee-onboarding-kit-guide` | Guide | Informational → commercial | Welcome kits category exists | Publish only with approved process, product and fulfilment details |
| High | Bulk corporate gifting brief | `/blog/corporate-gifting-bulk-order-guide` | Guide | Informational → commercial | Homepage / contact support it | Explain how to prepare an enquiry, without promising MOQ or times |
| Medium | Client appreciation gifts | Consider collection filter/category only if real assortment exists | Commercial | Commercial investigation | Collection page already broad | Validate product coverage before creating a page |
| Medium | Conference and event gifts | Consider category landing only if product selection is distinct | Commercial | Commercial investigation | Apparel already supports giveaways | Do not create a page solely for keywords |

## I. Internal link report

See Section C. The four homepage cards are now contextual, crawlable links with descriptive labels. Existing editorial guides already link naturally to relevant category, collection, campaign, and contact pages.

## J. Blog inventory

| Article group | Main topic | Intent | Status | Commercial destination | Quality / recommendation |
|---|---|---|---|---|---|
| Corporate Diwali buying guide | Company Diwali gifting planning | Informational → commercial | Indexable | Diwali campaign, collection, contact | Strong; retain seasonal freshness review |
| Delhi NCR Diwali guide | Regional procurement and delivery planning | Informational → commercial | Indexable | Diwali campaign, collection, contact | Strong; distinct from broad guide |
| CMS blogs (4 current records) | Database-managed | Varies | Indexable | Must be reviewed per article | Add contextual category/contact links only where relevant |

## K. Category and product review

The public navigation contains 8 categories and 40 subcategories. Product pages use a single template and are populated from 234 active products. Product titles, descriptions, images, specifications, FAQs, and related products are database-driven. Product-level copy was not bulk-rewritten because doing so could change factual manufacturer information. The template has parent/related-product linking and an enquiry CTA.

## L. Production and SEO actions still required

1. Submit `/sitemap.xml` in Google Search Console and inspect Coverage, Page Indexing, and canonical reports.
2. Review the four CMS blog records individually for word count, topical overlap, author/date accuracy, and commercial links.
3. Obtain approved policy, shipping, and returns copy before publishing genuine policy pages.
4. Validate redirect behaviour for HTTP, `www`, trailing-slash, and legacy URLs at the reverse proxy.
5. Use Search Console performance data—not assumptions—to prioritise the content-gap recommendations.
