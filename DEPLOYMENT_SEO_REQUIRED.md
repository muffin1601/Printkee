# Deployment SEO requirements

The application now redirects `www.printkee.com` to the canonical non-www HTTPS host when the request reaches Next.js. The edge proxy/CDN must additionally enforce the following in one hop before release:

- `http://printkee.com/<path>` → `https://printkee.com/<path>`
- `http://www.printkee.com/<path>` → `https://printkee.com/<path>`
- `https://www.printkee.com/<path>` → `https://printkee.com/<path>`

Preserve the full path and query string. Do not chain HTTP→HTTPS and then www→non-www. Verify representative deep URLs with an external header checker after deployment.

Also verify that `/robots.txt`, `/sitemap.xml`, and `/api/sitemap-data` return 200 publicly, and submit `https://printkee.com/sitemap.xml` in Google Search Console.
