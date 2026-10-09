import { SITE_URL, toPublicProductSlug, toPublicSubcategorySlug } from "./siteConfig";
import { tshirtSeoPaths } from "../data/tshirtSeoPages";
import { catalogSeoPaths } from "../data/catalogSeoPages";

const BACKEND = process.env.BACKEND_URL || "http://localhost:5031";
export const PARTITIONS = ["static", "categories", "products", "brands", "blog", "locations", "seo-pages-1"];

const staticPaths = ["/", "/about", "/contact", "/privacy-policy", "/brands", "/blogs", "/corporate-gifting", "/industries", "/use-cases", "/sitemap", "/diwali-special"];
const locationPaths = ["/locations", "/delhi/corporate-gifts", "/noida/corporate-gifts", "/greater-noida/corporate-gifts", "/gurgaon/corporate-gifts", "/faridabad/corporate-gifts", "/ghaziabad/corporate-gifts"];

const entry = (path, modified) => ({
  url: `${SITE_URL}${path}`,
  lastModified: modified ? new Date(modified) : undefined,
});

export async function getSitemapPartition(segment) {
  if (segment === "static") return staticPaths.map((path) => entry(path));
  if (segment === "locations") return locationPaths.map((path) => entry(path));

  if (segment === "seo-pages-1") {
    const curatedEntries = [...tshirtSeoPaths, ...catalogSeoPaths].map((path) => entry(path));
    try {
      const response = await fetch(`${BACKEND}/api/sitemap-data`, { cache: "no-store" });
      if (!response.ok) return curatedEntries;
      const data = await response.json();
      return [
        ...curatedEntries,
        ...(data.seoPages || []).filter((item) => item.path && item.canonicalUrl === `${SITE_URL}${item.path}`)
          .map((item) => entry(item.path, item.significantContentUpdatedAt || item.updatedAt)),
      ];
    } catch { return curatedEntries; }
  }

  const response = await fetch(`${BACKEND}/api/sitemap-data`, { cache: "no-store" });
  if (!response.ok) throw new Error(`Sitemap data request failed with HTTP ${response.status}`);
  const data = await response.json();
  if (segment === "categories") {
    return [
      ...(data.categories || []).filter((item) => item.slug).map((item) => entry(`/${item.slug}`, item.updatedAt)),
      ...(data.subcategories || []).filter((item) => item.slug && item.category?.slug && item.category?.isActive !== false)
        .map((item) => entry(`/${item.category.slug}/${toPublicSubcategorySlug(item.slug)}`, item.updatedAt)),
    ];
  }
  if (segment === "products") {
    return (data.products || []).filter((item) => item.slug && item.category?.slug && item.subcategory?.slug).map((item) => {
      const slug = toPublicProductSlug(item.slug);
      return slug ? entry(`/${item.category.slug}/${toPublicSubcategorySlug(item.subcategory.slug)}/${encodeURIComponent(slug)}`, item.updatedAt) : null;
    }).filter(Boolean);
  }
  if (segment === "brands") return (data.brands || []).filter((item) => item.slug).map((item) => entry(`/brands/${item.slug}`, item.updatedAt));
  if (segment === "blog") return (data.blogs || []).filter((item) => item._id).map((item) => entry(`/blog/${item._id}`, item.updatedAt || item.publishedAt || item.date));
  return null;
}

export function uniqueSitemapEntries(entries) {
  const seen = new Set();
  return entries.filter((item) => {
    try {
      const parsed = new URL(item.url);
      const normalized = `${parsed.origin}${parsed.pathname === "/" ? "/" : parsed.pathname.replace(/\/+$/, "")}`;
      if (parsed.origin !== SITE_URL || parsed.search || parsed.hash || seen.has(normalized)) return false;
      seen.add(normalized);
      item.url = normalized;
      return true;
    } catch { return false; }
  });
}
