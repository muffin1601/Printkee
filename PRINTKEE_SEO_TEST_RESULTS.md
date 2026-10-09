# Printkee SEO Test Results

Executed: 9 October 2026

| Test | Command / method | Result |
|---|---|---|
| Keyword reconciliation | `python scripts/generate_printkee_master_reports.py` | Pass: 2,796/2,796 rows, zero blank recommended URLs, zero unmapped rows |
| CSV structural validation | Python `csv.DictReader` across all eight generated CSV deliverables | Pass: expected headers/row counts and UTF-8 BOM-readable output |
| Backend SEO/CSV unit checks | `npm.cmd run test:seo-quality` | Pass: keyword/path normalization, similarity, quoted CSV round-trip, CSV injection neutralisation, and opportunity validation |
| Backend syntax | `node --check` on server, SEO routes, quality service, and CSV service | Pass |
| Frontend production build | `npm.cmd run build` | Pass: Next.js 16.3.6 compiled, TypeScript completed, page data collected, and 41 static pages generated |
| Lint | Package inspection | Not run: no lint script or lint dependency is defined in `frontend-next/package.json` or `backend-next/package.json` |
| Full SEO regression | Local production frontend + connected backend, `npm.cmd run test:seo` | Pass: 330 sitemap URLs crawled; 93 internal paths checked; 0 errors; 0 warnings |
| Robots directives | SEO regression | Pass: required disallow rules and sitemap URL present |
| Canonicals | SEO regression | Pass: all sitemap pages self-canonical |
| Redirects | SEO regression | Pass: host and declared historical canonical redirects |
| Sitemap eligibility | SEO regression | Pass: unique HTTPS canonical URLs; no excluded paths/query strings/fragments |
| Metadata and H1 | SEO regression | Pass: one title, one meta description, and one H1 per sitemap page |
| Structured data | SEO regression JSON parse and visible FAQ checks | Pass: valid JSON-LD; no unverified Product offer/review fields; FAQ questions visible |
| Broken internal links | SEO regression | Pass: zero errors among 93 discovered internal paths |
| Unsupported claim patterns | SEO regression rendered-text scan | Pass: zero findings |
| Unknown slug | SEO regression | Pass: returns 404 |
| SEO publication lifecycle | Backend quality service tests and source inspection | Pass for deterministic gating; no production record mutation performed |
| Admin permissions | Source/syntax/build verification | Protected by `verifyToken`; live authenticated UI/API test not run because no admin credentials were used |
| CSV import commit | Unit/build/source verification | Dry-run/confirmation design verified; no database commit executed to avoid changing live data |
| Enquiry forms | Source/build/regression verification | Routes/components build and existing paths resolve; no real CRM/email submission sent |
| Mobile layouts | Responsive source/build review | No build defect; browser viewport interaction test not executed |
| Core Web Vitals | Requires production field tooling | Not verified; use GSC CWV and CrUX/PageSpeed |
| Accessibility | Source review only | Partial; keyboard, focus, contrast, and screen-reader browser audit remains |

## Final regression summary

```json
{
  "sitemapUrls": 330,
  "crawledPages": 330,
  "internalPathsChecked": 93,
  "claimFindings": 0,
  "errors": 0,
  "warnings": 0
}
```

Tests were executed against a local production build connected to the configured backend/MongoDB environment. Local verification servers were stopped after the crawl.
