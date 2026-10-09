const origin = (process.env.SEO_BASE_URL || "http://localhost:3000").replace(/\/$/, "");
const canonicalOrigin = "https://printkee.com";
const roots = new Set([
  "bags", "bottles", "shirts", "welcome-kits", "mugs", "caps", "notebooks-diaries", "pens", "keychains",
  "tech-gifts", "eco-friendly-gifts", "awards-trophies", "winter-wear", "office-stationery",
]);
const decode = (value = "") => value.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
const textOnly = (html) => decode(html.replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<style[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ")).trim();
const content = (html, tag) => [...html.matchAll(new RegExp(`<${tag}\\b[^>]*>([\\s\\S]*?)<\\/${tag}>`, "gi"))].map((match) => textOnly(match[1]));

const sitemap = await fetch(`${origin}/sitemap.xml`).then((response) => response.text());
const paths = [...sitemap.matchAll(/<loc>https:\/\/printkee\.com([^<]*)<\/loc>/g)]
  .map((match) => match[1] || "/")
  .filter((path) => roots.has(path.split("/").filter(Boolean)[0]));
const pages = [];
for (let start = 0; start < paths.length; start += 12) {
  await Promise.all(paths.slice(start, start + 12).map(async (path) => {
    const response = await fetch(`${origin}${path}`);
    const html = await response.text();
    const title = content(html, "title")[0] || "";
    const h1 = content(html, "h1");
    const canonical = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)/i)?.[1]
      || html.match(/<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["']/i)?.[1]
      || "";
    const words = textOnly(html).split(/\s+/).filter(Boolean).length;
    pages.push({ path, status: response.status, title, h1, canonical, words });
  }));
}

const errors = [];
if (pages.length !== 74) errors.push(`Expected 74 catalogue SEO pages, found ${pages.length}`);
for (const page of pages) {
  if (page.status !== 200) errors.push(`${page.path}: HTTP ${page.status}`);
  if (page.h1.length !== 1) errors.push(`${page.path}: expected one H1, found ${page.h1.length}`);
  if (page.canonical !== `${canonicalOrigin}${page.path}`) errors.push(`${page.path}: invalid canonical ${page.canonical}`);
  if (page.words < 350) errors.push(`${page.path}: only ${page.words} visible words`);
}
if (new Set(pages.map((page) => page.title)).size !== pages.length) errors.push("Catalogue page titles are not unique");
if (new Set(pages.map((page) => page.h1[0])).size !== pages.length) errors.push("Catalogue page H1s are not unique");
if (new Set(pages.map((page) => page.canonical)).size !== pages.length) errors.push("Catalogue page canonicals are not unique");

const result = {
  pages: pages.length,
  minVisibleWords: Math.min(...pages.map((page) => page.words)),
  maxVisibleWords: Math.max(...pages.map((page) => page.words)),
  uniqueTitles: new Set(pages.map((page) => page.title)).size,
  uniqueH1s: new Set(pages.map((page) => page.h1[0])).size,
  uniqueCanonicals: new Set(pages.map((page) => page.canonical)).size,
  errors: errors.length,
};
console.log(JSON.stringify(result));
if (errors.length) {
  errors.forEach((error) => console.error(error));
  process.exitCode = 1;
}
