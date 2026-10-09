import { getSitemapPartition, PARTITIONS, uniqueSitemapEntries } from "../../../lib/sitemapPartitions";

export const dynamic = "force-dynamic";

const escapeXml = (value) => String(value).replace(/[<>&'\"]/g, (character) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" }[character]));

export async function GET(_request, context) {
  const { segment: rawSegment } = await context.params;
  const segment = rawSegment.replace(/\.xml$/, "");
  if (!PARTITIONS.includes(segment)) return new Response("Not found", { status: 404 });
  try {
    const entries = uniqueSitemapEntries(await getSitemapPartition(segment));
    const body = entries.map((item) => `<url><loc>${escapeXml(item.url)}</loc>${item.lastModified && !Number.isNaN(item.lastModified.getTime()) ? `<lastmod>${item.lastModified.toISOString()}</lastmod>` : ""}</url>`).join("");
    return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${body}</urlset>`, {
      headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400" },
    });
  } catch (error) {
    console.error(`Sitemap partition ${segment} failed:`, error.message);
    return new Response("Sitemap temporarily unavailable", { status: 503 });
  }
}
