# Printkee GSC-Led SEO Growth Strategy

Analysis date: 1 October 2026  
Primary source: supplied Google Search Console Web exports, last three months ending 28 September 2026.

## Baseline

- Query rows: 1,000
- Queries at average position 10 or better: 296
- Queries at positions 11–20: 197
- Page rows: 181
- India: 261 clicks, 11,804 impressions, 2.21% CTR, 20.80 average position
- Desktop: 11,496 impressions, 1.63% CTR, 20.56 average position
- Mobile: 5,581 impressions, 3.01% CTR, 11.31 average position
- Product snippets: 106 impressions, 0.94% CTR, 15.25 average position
- Merchant listings: two impressions; insufficient evidence for a decision

Query-row clicks and impressions do not equal property totals because Search Console limits/anonymises query exports. No search volume, keyword difficulty, traffic potential or ranking forecast has been inferred.

## Opportunity model

The internal opportunity score combines log-scaled impressions, position band, CTR headroom and manually rule-based commercial relevance. It is a prioritisation aid—not a Google metric.

- Tier 1: commercially relevant queries at positions 8–20 with at least five impressions
- Tier 2: commercially relevant queries at positions 20–40 with at least ten impressions
- Tier 3: page-one queries above the CTR threshold opportunity used by the model
- Tier 4: important competitive terms absent or weak in this export and requiring authority, not just on-page edits
- Deprioritize: irrelevant brand navigation, logo/wiki/country questions, tax-code research and other low-value intent

See `SEO_GSC_OPPORTUNITIES.csv` for the scored model and `SEO_GSC_BASELINE.csv` for the requested non-score baseline.

## Canonical cluster ownership

One URL owns each close-variant cluster:

- Files/folders → `/office-and-writing/file-and-folder`
- Aprons → `/apparel-and-accessories/aprons`
- Lanyards/ID cards → `/office-and-writing/lanyard-and-id-card`
- Employee welcome/onboarding/joining kits → `/collection/welcome-kits`
- Ties → `/apparel-and-accessories/ties`
- Tote bags → `/bags-and-travel/tote-bags`
- Winter jackets/wear → `/apparel-and-accessories/winter-wear`
- Wireless chargers → `/technology-accessories/wireless-charging`
- Duffle/duffel bags → `/bags-and-travel/duffle-bags`
- Broad corporate gifting, branded merchandise and custom merchandise → homepage

No singular/plural, British/American spelling or word-order landing pages should be created. Informational guides must target a distinct question and link back to the commercial owner.

## Highest-priority evidence

1. Aprons: 1,499 page impressions at 17.39; `printed aprons` has 171 impressions at 30.33; `apron with logo` has 62 at 10.34.
2. Files/folders: 1,258 page impressions at 13.23; several variants already rank around positions 6–13.
3. Lanyards/ID cards: 1,159 page impressions at 23.75; `bulk lanyard printing` is at 14.42.
4. Welcome kits: 603 page impressions at 15.73; supplier and branded-kit variants sit mainly at positions 33–46.
5. Homepage: `corporate merchandise` has 200 impressions at 30.41 and `branded merchandise India` has 56 at 18.20.

## SERP gap findings

Current competing pages commonly expose structured product choices, specifications, branding methods, artwork requirements, buyer inputs, transparent quote paths and supporting FAQs. Corporate-gifting competitors also use verified case studies, catalog breadth, operational detail and real trust evidence. Printkee's opportunity is to provide clearer procurement information and earn legitimate proof—not imitate unsupported price, MOQ, client-count or delivery claims.

The implemented pages now answer selection and briefing questions while deferring exact specifications to the chosen item. Research examples included current pages from Tagsen, Markson India, MultiOrigin, Corpokit, MerchBay, Printigly, ARC Print, MUNI, Swagilo, Corp Attire and other relevant results inspected on 1 October 2026.

## Desktop versus mobile

The same server-rendered titles, headings, commercial copy, product links and schema are delivered to both devices. Source review found no SEO copy hidden by responsive rules. Mobile CSS hides product-card style/colour selectors and swaps desktop navigation for mobile controls, but it does not remove the priority page content.

The average-position difference cannot be attributed to layout from these aggregate exports. Likely explanations still requiring evidence include different query/country mixes, desktop SERP competition, Core Web Vitals and interaction performance. Next measurement should compare query-by-device and page-by-device exports plus field CWV; no content fork is justified now.

## Search appearance and product data

Visible product specification fields already support dimensions, weight, GSM, capacity, printing methods, branding areas, packaging, approved MOQ/lead-time text, sample availability, customization and care. Product JSON-LD now includes only populated factual material, size, weight and `additionalProperty` fields. Price, availability, ratings, reviews and shipping remain omitted unless reliable visible data becomes available.

## Content clusters

- Corporate gifting hub: homepage → collections, welcome kits, apparel, bags, office, tech, sustainable and seasonal destinations
- Employee onboarding: future distinct guide/checklist → welcome-kits commercial page → component categories → contact
- Promotional merchandise: future buying guide → homepage/category hubs → aprons/files/lanyards/bags → contact
- Branding methods: future verified comparison → applicable category pages; never claim compatibility without product evidence
- Event merchandise: future checklist → lanyards, folders, bags, apparel and collection hub

No new guide URL was published in this release. Existing commercial pages had the clearest demonstrated demand, and a guide should not precede expert validation or compete with those pages.

## Brand and noise protection

Queries such as Portronics logo/PNG/wiki/country questions, unrelated brand facts and HSN-code research are not commercial-page targets. Brand pages should focus on available business-gifting products and avoid expanding into encyclopaedic brand content solely for impressions.

## Seasonal freshness

The 2026 Diwali section should remain current through the buying season. After the season, retain a useful stable hub only if inventory and enquiries continue; otherwise update its visible availability messaging and decide whether the annual intent belongs on a durable Diwali URL. Do not launch a new year URL without a redirect/canonical and content-refresh plan.

## Required next export

Export query + page, query + device and page + device combinations from Search Console. The supplied separate dimensions support recommended ownership but cannot prove which URL currently ranks for each query or why device averages differ.

No strategy or implementation in this document guarantees rankings, traffic or revenue.
