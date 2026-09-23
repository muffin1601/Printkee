const BASE    = "https://printkee.com";
const BACKEND = process.env.BACKEND_URL || "http://localhost:5031";

export const dynamic = "force-dynamic";

/**
 * Next.js native sitemap — generates /sitemap.xml at request time.
 *
 * 100% database-driven for all dynamic content.
 * Adding any record to MongoDB (category, subcategory, product, blog, brand)
 * causes it to appear in the next sitemap render automatically — zero code changes.
 *
 * Excluded: /admin/*, /login, /search, /customize/*, /api/*
 */
export default async function sitemap() {
  const entries = [];

  /* ── Static editorial pages (hardcoded as permitted) ──────────────── */
  const staticPages = [
    { path: "/",               priority: 1.0, freq: "daily"   },
    { path: "/about",          priority: 0.7, freq: "monthly" },
    { path: "/contact",        priority: 0.7, freq: "monthly" },
    { path: "/brands",         priority: 0.8, freq: "weekly"  },
    { path: "/blogs",          priority: 0.8, freq: "weekly"  },
    { path: "/locations",      priority: 0.7, freq: "monthly" },
    { path: "/delhi/corporate-gifts", priority: 0.7, freq: "monthly" },
    { path: "/noida/corporate-gifts", priority: 0.7, freq: "monthly" },
    { path: "/greater-noida/corporate-gifts", priority: 0.7, freq: "monthly" },
    { path: "/gurgaon/corporate-gifts", priority: 0.7, freq: "monthly" },
    { path: "/faridabad/corporate-gifts", priority: 0.7, freq: "monthly" },
    { path: "/ghaziabad/corporate-gifts", priority: 0.7, freq: "monthly" },
    { path: "/blog/corporate-diwali-gifts-buying-guide-2026", priority: 0.7, freq: "monthly" },
    { path: "/blog/best-corporate-diwali-gifts-delhi-ncr-2026", priority: 0.7, freq: "monthly" },
    { path: "/diwali-special", priority: 0.7, freq: "monthly" },
    { path: "/diwali-special/hampers/festive-snack-travel-mug-hamper", priority: 0.6, freq: "monthly" },
    { path: "/diwali-special/hampers/festive-copper-dry-fruit-hamper", priority: 0.6, freq: "monthly" },
    { path: "/diwali-special/hampers/premium-coffee-gourmet-hamper", priority: 0.6, freq: "monthly" },
    { path: "/diwali-special/hampers/white-drinkware-ferrero-diya-kit", priority: 0.6, freq: "monthly" },
    { path: "/diwali-special/hampers/executive-notebook-pen-bottle-kit", priority: 0.6, freq: "monthly" },
    { path: "/diwali-special/hampers/notebook-pen-bottle-gift-kit", priority: 0.6, freq: "monthly" },
    { path: "/diwali-special/hampers/copper-bottle-cookie-ferrero-diya-kit", priority: 0.6, freq: "monthly" },
    { path: "/diwali-special/hampers/copper-canister-chocolate-diya-kit", priority: 0.6, freq: "monthly" },
    { path: "/diwali-special/hampers/black-tumbler-cookie-chocolate-diya-kit", priority: 0.6, freq: "monthly" },
    { path: "/diwali-special/hampers/black-bottle-mug-ferrero-diya-kit", priority: 0.6, freq: "monthly" },
    { path: "/diwali-special/hampers/wallet-mug-ferrero-diya-kit", priority: 0.6, freq: "monthly" },
    { path: "/diwali-special/hampers/glass-jar-diya-gift-set", priority: 0.6, freq: "monthly" },
  ];

  staticPages.forEach(({ path, priority, freq }) => {
    entries.push({ url: `${BASE}${path}`, changeFrequency: freq, priority });
  });

  /* ── All dynamic content — fetched from MongoDB via backend-next ───── */
  try {
    const res = await fetch(`${BACKEND}/api/sitemap-data`, { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const {
      categories    = [],
      subcategories = [],
      products      = [],
      blogs         = [],
      brands        = [],
    } = await res.json();

    /* Brand pages */
    brands.forEach(({ slug, updatedAt }) => {
      if (!slug) return;
      entries.push({
        url:              `${BASE}/brands/${slug}`,
        lastModified:     updatedAt ? new Date(updatedAt) : undefined,
        changeFrequency:  "monthly",
        priority:         0.6,
      });
    });

    /* Category pages */
    categories.forEach(({ slug, updatedAt }) => {
      if (!slug) return;
      entries.push({
        url:             `${BASE}/${slug}`,
        lastModified:    updatedAt ? new Date(updatedAt) : undefined,
        changeFrequency: "weekly",
        priority:        0.8,
      });
    });

    /* Subcategory pages */
    subcategories.forEach(({ slug, updatedAt, category }) => {
      if (!slug || !category?.slug) return;
      entries.push({
        url:             `${BASE}/${category.slug}/${slug}`,
        lastModified:    updatedAt ? new Date(updatedAt) : undefined,
        changeFrequency: "weekly",
        priority:        0.7,
      });
    });

    /* Product pages */
    products.forEach(({ slug, updatedAt, category, subcategory }) => {
      if (!slug || !category?.slug || !subcategory?.slug) return;
      entries.push({
        url:             `${BASE}/${category.slug}/${subcategory.slug}/${slug}`,
        lastModified:    updatedAt ? new Date(updatedAt) : undefined,
        changeFrequency: "monthly",
        priority:        0.6,
      });
    });

    /* Blog pages — updatedAt from timestamps; falls back to publication date */
    blogs.forEach(({ _id, updatedAt, date }) => {
      if (!_id) return;
      const modified = updatedAt || date;
      entries.push({
        url:             `${BASE}/blog/${_id}`,
        lastModified:    modified ? new Date(modified) : undefined,
        changeFrequency: "monthly",
        priority:        0.5,
      });
    });

  } catch (err) {
    console.error("Sitemap: failed to fetch dynamic data:", err.message);
    /* Graceful degradation — returns partial sitemap (static pages only) */
  }

  return entries;
}
