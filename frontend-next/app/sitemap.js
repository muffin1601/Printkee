const BASE = "https://printkee.com";
const BACKEND = process.env.BACKEND_URL || "http://localhost:5031";

export default async function sitemap() {
  const entries = [];

  /* ---- Static pages ---- */
  const staticPages = ["/", "/about", "/brands", "/contact", "/blogs", "/sitemap", "/diwali-special"];
  staticPages.forEach((path) => {
    entries.push({
      url: `${BASE}${path}`,
      changeFrequency: "weekly",
      priority: path === "/" ? 1.0 : 0.8,
    });
  });

  try {
    const res = await fetch(`${BACKEND}/api/sitemap-data`, { cache: "no-store" });
    const { categories = [], subcategories = [], products = [], blogs = [] } = await res.json();

    /* ---- Category pages ---- */
    categories.forEach(({ slug }) => {
      if (slug) entries.push({ url: `${BASE}/${slug}`, changeFrequency: "weekly", priority: 0.8 });
    });

    /* ---- Subcategory pages ---- */
    subcategories.forEach(({ slug, category }) => {
      if (slug && category?.slug) {
        entries.push({ url: `${BASE}/${category.slug}/${slug}`, changeFrequency: "weekly", priority: 0.7 });
      }
    });

    /* ---- Product pages ---- */
    products.forEach(({ slug, category, subcategory }) => {
      if (slug && category?.slug && subcategory?.slug) {
        entries.push({
          url: `${BASE}/${category.slug}/${subcategory.slug}/${slug}`,
          changeFrequency: "monthly",
          priority: 0.6,
        });
      }
    });

    /* ---- Blog pages ---- */
    blogs.forEach(({ _id }) => {
      if (_id) entries.push({ url: `${BASE}/blog/${_id}`, changeFrequency: "monthly", priority: 0.5 });
    });
  } catch (err) {
    console.error("Sitemap: failed to fetch dynamic data:", err.message);
  }

  return entries;
}
