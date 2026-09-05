/* Browser-local "recently viewed" history.
   Deliberately storage-only (no backend, no auth) because this site has no
   customer accounts. Every call is safe in SSR and in private-mode browsers
   where localStorage throws. */

const KEY = "printkee:recently-viewed";
const MAX = 12;

const readRaw = () => {
  if (typeof window === "undefined") return [];
  try {
    const parsed = JSON.parse(window.localStorage.getItem(KEY) || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const getRecentlyViewed = () =>
  readRaw().filter(
    (item) => item && item.slug && item.categorySlug && item.subcategorySlug
  );

/** Records a product view, most-recent-first, de-duplicated by slug. */
export const recordProductView = (entry) => {
  if (typeof window === "undefined") return;
  if (!entry?.slug || !entry?.categorySlug || !entry?.subcategorySlug) return;

  try {
    const next = [
      {
        slug: entry.slug,
        name: entry.name || entry.slug,
        image: entry.image || "",
        price: entry.price ?? null,
        salePrice: entry.salePrice ?? null,
        categorySlug: entry.categorySlug,
        subcategorySlug: entry.subcategorySlug,
      },
      ...readRaw().filter((item) => item?.slug !== entry.slug),
    ].slice(0, MAX);

    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* Quota exceeded or storage blocked — history is non-essential. */
  }
};

/** Reshapes a stored entry back into the product shape the cards expect. */
export const toProductShape = (entry) => ({
  _id: entry.slug,
  slug: entry.slug,
  name: entry.name,
  price: entry.price,
  salePrice: entry.salePrice,
  images: entry.image ? [{ url: entry.image, altText: entry.name }] : [],
  category: { slug: entry.categorySlug },
  subcategory: { slug: entry.subcategorySlug },
});
