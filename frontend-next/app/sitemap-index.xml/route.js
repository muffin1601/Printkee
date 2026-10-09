import { PARTITIONS } from "../../lib/sitemapPartitions";
import { SITE_URL } from "../../lib/siteConfig";

export const dynamic = "force-dynamic";

const escapeXml = (value) => String(value).replace(/[<>&'\"]/g, (character) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" }[character]));

export async function GET() {
  const body = PARTITIONS.map((segment) => `<sitemap><loc>${escapeXml(`${SITE_URL}/sitemaps/${segment}.xml`)}</loc></sitemap>`).join("");
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${body}</sitemapindex>`, {
    headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400" },
  });
}
