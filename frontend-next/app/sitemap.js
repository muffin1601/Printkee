import brandsList from "../data/brandsspl";

const BASE = "https://printkee.com";
const BACKEND = process.env.BACKEND_URL || "http://localhost:5031";

/**
 * Next.js native sitemap — generates /sitemap.xml at request time.
 *
 * Dynamic content (categories, subcategories, products, blogs) is fetched
 * from backend-next /api/sitemap-data. Adding any item to MongoDB causes it
 * to appear here automatically on the next sitemap request — no code changes.
 *
 * Brands come from data/brandsspl.jsx (static file). Adding a brand to that
 * file automatically includes it in the sitemap on the next deploy.
 *
 * Excluded routes: /admin/*, /login, /search, /customize/*, /api/*
 */
export default async function sitemap() {
  const entries = [];

  /* ── Static editorial pages (hardcoded as permitted) ──────────────── */
  const staticPages = [
    { path: "/",             priority: 1.0, freq: "daily"   },
    { path: "/about",        priority: 0.7, freq: "monthly" },
    { path: "/contact",      priority: 0.7, freq: "monthly" },
    { path: "/brands",       priority: 0.8, freq: "weekly"  },
    { path: "/blogs",        priority: 0.8, freq: "weekly"  },
    { path: "/diwali-special", priority: 0.7, freq: "monthly" },
  ];

  staticPages.forEach(({ path, priority, freq }) => {
    entries.push({
      url: `${BASE}${path}`,
      changeFrequency: freq,
      priority,
    });
  });

  /* ── Brand pages — from static data file ──────────────────────────── */
  brandsList.forEach(({ slug }) => {
    if (slug) {
      entries.push({
        url: `${BASE}/brands/${slug}`,
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  });

  /* ── Dynamic content — fetched from MongoDB via backend-next ───────── */
  try {
    const res = await fetch(`${BACKEND}/api/sitemap-data`, { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const {
      categories = [],
      subcategories = [],
      products = [],
      blogs = [],
    } = await res.json();

    /* Category pages */
    categories.forEach(({ slug, updatedAt }) => {
      if (!slug) return;
      entries.push({
        url: `${BASE}/${slug}`,
        lastModified: updatedAt ? new Date(updatedAt) : undefined,
        changeFrequency: "weekly",
        priority: 0.8,
      });
    });

    /* Subcategory pages */
    subcategories.forEach(({ slug, updatedAt, category }) => {
      if (!slug || !category?.slug) return;
      entries.push({
        url: `${BASE}/${category.slug}/${slug}`,
        lastModified: updatedAt ? new Date(updatedAt) : undefined,
        changeFrequency: "weekly",
        priority: 0.7,
      });
    });

    /* Product pages */
    products.forEach(({ slug, updatedAt, category, subcategory }) => {
      if (!slug || !category?.slug || !subcategory?.slug) return;
      entries.push({
        url: `${BASE}/${category.slug}/${subcategory.slug}/${slug}`,
        lastModified: updatedAt ? new Date(updatedAt) : undefined,
        changeFrequency: "monthly",
        priority: 0.6,
      });
    });

    /* Blog pages — updatedAt from timestamps: true; falls back to publication date */
    blogs.forEach(({ _id, updatedAt, date }) => {
      if (!_id) return;
      const modified = updatedAt || date;
      entries.push({
        url: `${BASE}/blog/${_id}`,
        lastModified: modified ? new Date(modified) : undefined,
        changeFrequency: "monthly",
        priority: 0.5,
      });
    });

  } catch (err) {
    console.error("Sitemap: failed to fetch dynamic data:", err.message);
    /* Returns partial sitemap (static pages + brands) rather than crashing */
  }

  return entries;
}
