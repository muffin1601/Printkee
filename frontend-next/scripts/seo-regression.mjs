import { writeFile } from "node:fs/promises";
import http from "node:http";

const fetchOrigin = (process.env.SEO_BASE_URL || "http://localhost:3000").replace(/\/$/, "");
const canonicalOrigin = "https://printkee.com";
const excluded = /^\/(admin|api|login|search|customize|blogs\/post)(?:\/|$)/;
const report = { generatedAt: new Date().toISOString(), fetchOrigin, errors: [], warnings: [], pages: [], brokenInternalLinks: [], claimFindings: [] };
const claimPatterns = [
  /lowest prices? guaranteed/i, /best price guarantee/i, /\d+[,+]?\+\s+(?:happy\s+)?(?:clients|brands)/i,
  /always on[ -]?time/i, /round the clock|24\/7 support/i, /leading manufacturer/i,
  /\bMOQ\s*\d+/i, /bulk pricing starts/i, /(?:48[- ]hours?|10 minutes?|1 week|7[- ]day)\s+(?:dispatch|sample|quotation)/i,
  /(?:our|at our|based) manufacturing unit/i, /\bBIS certif/i, /BPA[- ]free/i, /our in-house/i,
];
const decode = (value = "") => value.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
const textOnly = (html) => decode(html.replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<style[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " ").replace(/\s+/g, " "));
const tagContent = (html, tag) => [...html.matchAll(new RegExp(`<${tag}\\b[^>]*>([\\s\\S]*?)<\\/${tag}>`, "gi"))].map((match) => textOnly(match[1]).trim());
const attr = (html, selector, name) => {
  const match = html.match(selector);
  if (!match) return "";
  return decode(match[0].match(new RegExp(`${name}=["']([^"']+)["']`, "i"))?.[1] || "");
};
const fetchPath = (path, options) => fetch(`${fetchOrigin}${path}`, { redirect: "manual", ...options });
const runPool = async (items, limit, worker) => {
  let index = 0;
  const runners = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (index < items.length) await worker(items[index++]);
  });
  await Promise.all(runners);
};

if (/^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(fetchOrigin)) {
  const target = new URL(fetchOrigin);
  const redirect = await new Promise((resolve, reject) => {
    const request = http.request({ hostname: target.hostname, port: target.port || 80, path: "/collection/welcome-kits?seo=1", method: "HEAD", headers: { Host: "www.printkee.com" } }, (response) => resolve({ status: response.statusCode, location: response.headers.location }));
    request.on("error", reject);
    request.end();
  });
  if (![301, 308].includes(redirect.status) || redirect.location !== `${canonicalOrigin}/collection/welcome-kits?seo=1`) report.errors.push(`www redirect failed: ${JSON.stringify(redirect)}`);

  const canonicalRedirectCases = [
    ["/Apparel-and-Accessories/Aprons", "/apparel-and-accessories/aprons"],
    ["/Apparel-and-Accessories/aprons", "/apparel-and-accessories/aprons"],
    ["/Apparel-and-Accessories/Caps", "/apparel-and-accessories/caps"],
    ["/Apparel-and-Accessories/Sipper", "/drink-ware/sipper"],
    ["/Apparel-and-Accessories/promotional-clocks", "/collection/promotional-clocks"],
    ["/Apparel-and-Accessories/duffle-bags", "/bags-and-travel/duffle-bags"],
    ["/Apparel-and-Accessories/wireless-charging", "/technology-accessories/wireless-charging"],
    ["/Apparel-and-Accessories/file-and-folder", "/office-and-writing/file-and-folder"],
    ["/office-and-writing/notebook-and-diary", "/office-and-writing/notebooks-and-diary-sets"],
    ["/categories/Drink%20Ware", "/drink-ware"],
    ["/employee-gifts", "/collection/welcome-kits"],
    ["/Technology%20Accessories", "/technology-accessories"],
    ["/privacy", "/privacy-policy"],
    ["/blog", "/blogs"],
    ["/festival-gifts", "/diwali-special"],
    ["/collection/__CANONICAL__", "/collection"],
    ["/apparel-and-accessories/polo-t-shirts/__CANONICAL__", "/apparel-and-accessories/polo-t-shirts"],
    ["/apparel-and-accessories/polo-t-shirts/promotional-collar%20-t-shirts", "/apparel-and-accessories/polo-t-shirts/promotional-collar-t-shirts"],
    ["/drink-ware/ceramic-mug/classic-ceramic-coffee-mug", "/drink-ware/ceramic-mug/classic-ceramic-coffee-mug-2"],
    ["/drink-ware/steel%20mug/stainless-steel-double-wall-coffee-mug", "/drink-ware/steel-mug/stainless-steel-double-wall-coffee-mug"],
    ["/drink-ware/coffee-mug/double%20wall%20insulated%20mug", "/drink-ware/coffee-mug/double-wall-insulated-mug"],
    ["/bags-and-travel/backpacks/economy-corporate-backpackhttps:/printkee.com/bags-and-travel/backpacks/economy-corporate-backpack", "/bags-and-travel/backpacks/economy-corporate-backpack"],
    ["/bags-and-travel/backpacks/economy-corporate-backpackhttps:/printkee.com/bags-and-travel/backpacks/__CANONICAL__", "/bags-and-travel/backpacks/economy-corporate-backpack"],
    ["/eco-products/cork-laptop-bag-and-wallet/cork-wallet-for-men%3C/__CANONICAL__", "/eco-products/cork-laptop-bag-and-wallet/cork-wallet-for-men"],
    ["/eco-products/cork-laptop-bag-and-wallet/cork-wallet-for-men%3C/loc%3E%20%3Cchan", "/eco-products/cork-laptop-bag-and-wallet/cork-wallet-for-men"],
  ];
  for (const [source, destination] of canonicalRedirectCases) {
    const response = await fetchPath(source, { method: "HEAD" });
    const location = response.headers.get("location");
    const resolvedLocation = location ? new URL(location, fetchOrigin).href : "";
    if (response.status !== 308 || resolvedLocation !== `${fetchOrigin}${destination}`) {
      report.errors.push(`canonical redirect failed for ${source}: ${JSON.stringify({ status: response.status, location })}`);
    }
  }
}

const robotsRes = await fetchPath("/robots.txt");
const robots = await robotsRes.text();
if (robotsRes.status !== 200) report.errors.push(`robots.txt returned ${robotsRes.status}`);
for (const rule of ["/admin", "/api/", "/login", "/customize", "/search", "/blogs/post"]) {
  if (!robots.includes(`Disallow: ${rule}`)) report.errors.push(`robots.txt missing ${rule}`);
}
if (!robots.includes(`Sitemap: ${canonicalOrigin}/sitemap.xml`)) report.errors.push("robots.txt has the wrong sitemap URL");

const sitemapRes = await fetchPath("/sitemap.xml");
const sitemapXml = await sitemapRes.text();
if (sitemapRes.status !== 200) report.errors.push(`sitemap.xml returned ${sitemapRes.status}`);
const sitemapUrls = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => decode(match[1]));
const uniqueUrls = new Set(sitemapUrls);
if (uniqueUrls.size !== sitemapUrls.length) report.errors.push(`sitemap has ${sitemapUrls.length - uniqueUrls.size} duplicate URLs`);
for (const value of sitemapUrls) {
  const url = new URL(value);
  if (url.origin !== canonicalOrigin) report.errors.push(`wrong sitemap host: ${value}`);
  if (url.protocol !== "https:" || url.search || url.hash || excluded.test(url.pathname)) report.errors.push(`invalid sitemap URL: ${value}`);
}

const internalPaths = new Set();
await runPool([...uniqueUrls], Number(process.env.SEO_CONCURRENCY || 8), async (canonicalUrl) => {
  const path = new URL(canonicalUrl).pathname;
  try {
    const response = await fetchPath(path);
    const html = await response.text();
    const titles = tagContent(html, "title");
    const descriptions = [...html.matchAll(/<meta\b[^>]*name=["']description["'][^>]*>/gi)].map((match) => attr(match[0], /<meta[\s\S]*>/i, "content"));
    const h1s = tagContent(html, "h1");
    const canonical = attr(html, /<link\b[^>]*rel=["']canonical["'][^>]*>/i, "href");
    const page = { path, status: response.status, title: titles[0] || "", description: descriptions[0] || "", h1Count: h1s.length, canonical, schemas: 0 };
    report.pages.push(page);
    if (response.status !== 200) report.errors.push(`${path} returned ${response.status}`);
    if (titles.length !== 1 || !titles[0]) report.errors.push(`${path} has ${titles.length} titles`);
    if ((titles[0].match(/\|\s*Printkee/gi) || []).length > 1) report.errors.push(`${path} repeats the brand suffix`);
    if (descriptions.length !== 1 || !descriptions[0]) report.errors.push(`${path} has ${descriptions.length} meta descriptions`);
    if (h1s.length !== 1) report.errors.push(`${path} has ${h1s.length} H1 elements`);
    const normalizedCanonical = canonical.replace(/\/$/, "") || canonical;
    const normalizedExpected = canonicalUrl.replace(/\/$/, "") || canonicalUrl;
    if (normalizedCanonical !== normalizedExpected) report.errors.push(`${path} canonical is ${canonical || "missing"}`);
    if (/noindex/i.test(attr(html, /<meta\b[^>]*name=["']robots["'][^>]*>/i, "content"))) report.errors.push(`${path} is noindex but is listed in the sitemap`);

    const schemas = [...html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
    page.schemas = schemas.length;
    const visible = textOnly(html);
    for (const pattern of claimPatterns) {
      const match = visible.match(pattern);
      if (match) report.claimFindings.push({ path, claim: match[0] });
    }
    for (const schemaMatch of schemas) {
      try {
        const schema = JSON.parse(decode(schemaMatch[1]));
        const nodes = Array.isArray(schema?.["@graph"]) ? schema["@graph"] : [schema];
        for (const node of nodes) {
          if (node?.["@type"] === "Product" && (node.offers || node.aggregateRating || node.review)) report.errors.push(`${path} has unverified Product offer/review schema`);
          if (node?.["@type"] === "FAQPage") for (const item of node.mainEntity || []) if (item?.name && !visible.includes(textOnly(item.name))) report.errors.push(`${path} FAQ schema question is not visible: ${item.name}`);
        }
      } catch { report.errors.push(`${path} contains invalid JSON-LD`); }
    }
    for (const match of html.matchAll(/<a\b[^>]*href=["']([^"']+)["']/gi)) {
      const href = decode(match[1]);
      if (!href || href.startsWith("#") || /^(mailto:|tel:|javascript:)/i.test(href)) continue;
      try {
        const url = new URL(href, canonicalOrigin);
        if (url.origin === canonicalOrigin && !url.search && !url.hash && !excluded.test(url.pathname)) internalPaths.add(url.pathname);
      } catch {}
    }
  } catch (error) { report.errors.push(`${path} fetch failed: ${error.message}`); }
});

await runPool([...internalPaths], Number(process.env.SEO_CONCURRENCY || 8), async (path) => {
  try {
    const response = await fetchPath(path, { method: "GET" });
    if (response.status >= 400) report.brokenInternalLinks.push({ path, status: response.status });
  } catch (error) { report.brokenInternalLinks.push({ path, error: error.message }); }
});
if (report.brokenInternalLinks.length) report.errors.push(`${report.brokenInternalLinks.length} internal links returned errors`);

const missing = await fetchPath("/__seo-regression-missing-page__");
if (missing.status !== 404) report.errors.push(`unknown URL returned ${missing.status} instead of 404`);
if (report.claimFindings.length) report.warnings.push(`${report.claimFindings.length} published pages contain claim patterns requiring owner/CMS verification`);
report.summary = { sitemapUrls: sitemapUrls.length, crawledPages: report.pages.length, internalPathsChecked: internalPaths.size, claimFindings: report.claimFindings.length, errors: report.errors.length, warnings: report.warnings.length };
await writeFile(new URL("../../SEO_CRAWL_REPORT.json", import.meta.url), `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify(report.summary));
if (report.errors.length) { console.error(report.errors.slice(0, 50).join("\n")); process.exitCode = 1; }
