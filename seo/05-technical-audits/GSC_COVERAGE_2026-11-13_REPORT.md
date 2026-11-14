# Printkee Search Console coverage audit — 13 November 2026

Source: `printkee.com-Coverage-Drilldown-2026-11-13.xlsx`, Table sheet, 202 distinct URLs and their last crawl dates. Live responses and XML sitemaps were fetched on 13 November 2026. The companion CSV contains one row for every exported URL, including the response chain, final status, canonical, robots directives, sitemap presence, and action.

## Root causes and evidence

| Finding | Evidence | Assessment |
| --- | --- | --- |
| Product pages deliberately excluded | 153 exported URLs currently return `noindex`; 151 are direct product pages. None of the `noindex` responses are in the current sitemap. The product route uses `seoQuality.eligible` from the backend quality gate to set `robots.index`, and the sitemap endpoint filters products through the same gate. | Confirmed current technical exclusion. Whether each record should remain excluded requires a content review. Do not remove the gate in bulk. |
| Indexable pages still listed by GSC | 19 exported URLs are in the current sitemap. Their final responses are 200, self-canonical, and have a title, description, and H1. | No blocking technical fault confirmed in this sample. GSC's reported state may lag a site change, or reflect content/selection signals that require URL Inspection evidence. |
| Legacy and duplicate URLs | 18 exported URLs redirect to an HTTP 200 destination. Four of these take two hops, often via `www` first. `/details` on `www` redirects to an HTTP 404 on the preferred host. | The 18 successful redirects are existing fixes; update any remaining internal links to their final targets. Review `/details` only if a real replacement exists. |
| Missing pages | `/branding`, `/post`, `/careers`, `/branding-solutions`, and `/details` (after `www` redirect) end at 404. None is in the current sitemap. | Confirmed missing routes. Preserve 404 unless the business can identify a genuine replacement or restore the intended page. |
| Assets in page coverage | Six uploaded `.jfif` images and one favicon URL appear in the export, all with 200 responses and absent from the page sitemap. | Keep out of the page indexing action list. They can still be fetched as page resources. |
| Robots conflict for utility paths | Before the code change, `robots.txt` disallowed `/blogs/post` while that page emits `noindex`, and disallowed `/customize` while two exported customization URLs have specific 308 redirects. | Confirmed technical conflict. The disallow rules were removed so crawlers can observe those signals. Admin, API, login, and search restrictions remain. |

The current sitemap contains 225 URLs. For the 171 direct HTML URLs in this export, the crawl found no missing canonical and no duplicate titles among distinct direct URLs. This does not establish that all product descriptions, images, schema, mobile layouts, or rendered DOMs are sound. The live HTML crawl could not query private product records or GSC URL Inspection, and the local build has no local backend data. A `noindex` page can still be reported under an older GSC coverage state until Google recrawls and reprocesses it.

## Classification

The CSV is the URL-by-URL classification. Counts are:

| Classification | URLs | Treatment |
| --- | ---: | --- |
| MANUAL REVIEW | 175 | 151 direct noindex product pages, 19 apparently indexable sitemap pages, and 5 missing pages. Review product records and GSC evidence before changing indexability or redirects. |
| FIX / REDIRECT | 18 | Existing redirects with live 200 targets. Keep the redirects; replace source URLs in internal links where found. |
| KEEP EXCLUDED | 9 | Seven assets, `robots.txt`, and the `noindex` `/blogs/post` utility page. |
| FIX & INDEX | 0 | No URL in this export has enough evidence for an automatic indexability change. |
| CONSOLIDATE / CANONICALIZE | 0 | No direct HTML URL in the sample has a conflicting canonical. |

The 202 rows include every URL's last crawl date. `HTTP Status` is the *final* response status; `Redirect Chain` preserves preceding responses. `Internal Links` is a count of outgoing same-site anchors in the returned HTML, not a full incoming-link or orphan test. Page types ending in “candidate” are route-shape classifications because the production database was not available for direct record inspection.

## Changes and verification

- `frontend-next/app/robots.js`: removed the `/customize` and `/blogs/post` disallow rules. Before, Googlebot could be stopped before seeing those pages' redirect or `noindex`; after deployment, the signals are crawlable.
- `frontend-next/scripts/seo-regression.mjs`: aligned the expected robots rules and added checks that the two paths remain crawlable.
- `scripts/audit_gsc_coverage.py`: repeatable read-only export and live-crawl audit generator.
- `seo/05-technical-audits/GSC_COVERAGE_2026-11-13_URL_AUDIT.csv`: complete 202-URL evidence and actions.

`npm.cmd run build` passed on Next.js 16.3.6. The local production server returned 200 for `/robots.txt`, `/blogs/post`, `/customize`, and `/sitemap.xml`; `/Technology%20Accessories` returned a 308 to `/technology-accessories`. The build logged a failed brands fetch because the local backend was unavailable. This did not fail the build, but limits local verification of database-driven pages. The production URL audit was run against the currently deployed site before the robots change, so the new robots behavior must be checked after deployment.

## Search Console action plan

1. **Inspect live:** Start with `/mugs`, `/bags`, `/t-shirts`, `/notebooks-diaries/logo-printed-notebooks-diaries`, `/solutions/corporate-gifting-guides`, and representative sitemap-listed products such as `/bags-and-travel/backpacks/economy-corporate-backpack`. Compare the indexed canonical, last crawl, live crawl, and rendered HTML. Inspect a few `noindex` products to confirm Google sees the directive and whether those records merit richer original content.
2. **Review product records:** For the 151 direct `noindex` product URLs, use the backend quality reasons to identify missing or thin descriptions, verified product details, metadata, and image alt text. Improve important commercial records first. Do not invent specifications or override the gate merely to make a count go up. Once a record passes, verify 200, indexable robots, self-canonical, and sitemap inclusion together.
3. **Request indexing selectively:** After deployment and live inspection, request indexing once for a small set of important, self-canonical, content-complete URLs still shown as excluded. Do not request indexing for assets, 404s, redirects, utility pages, or products still marked `noindex`.
4. **Sitemaps and validation:** Keep the seven assets, five missing URLs, 18 redirect sources, and `noindex` pages out of the sitemap. The current sitemap already excludes them in this sample. Resubmit the existing sitemap only if Search Console shows a fetch or processing problem. Use issue validation only for a confirmed, fixed technical issue with affected URLs; this export alone does not prove one covering all 202.
5. **Monitor for 2–6 weeks:** Weekly, compare this CSV's URL set with GSC Page Indexing and URL Inspection results, track recrawl dates, indexability directives, chosen canonicals, sitemap membership, impressions, and newly indexed URLs. Separate newly discovered exclusions from the historical 202. Escalate persistent exclusion of high-value, technically sound pages for content and internal-link review.

Google controls final indexing decisions. A successful build, HTTP 200, canonical, and sitemap entry are necessary signals for some pages, not a guarantee of indexing.
