/* Shared product helpers — links, image resolution and offer detection.
   Pure and deterministic so they can run in Server Components and on the
   client without producing hydration mismatches.

   Note: there is deliberately no price formatter here. Printkee is a
   quote-based B2B storefront and no surface publishes figures — the offer
   helpers below report only *whether* a product is discounted. */

/** Canonical product URL, or null when the API response lacked slugs. */
export const productUrl = (product) => {
  const category = product?.category?.slug;
  const subcategory = product?.subcategory?.slug;
  if (!category || !subcategory || !product?.slug) return null;
  return `/${encodeURIComponent(category)}/${encodeURIComponent(
    subcategory
  )}/${encodeURIComponent(product.slug)}`;
};

export const productImage = (product) =>
  product?.images?.[0]?.url || product?.subImages?.[0]?.url || "/assets/placeholder.webp";

export const productImageAlt = (product) =>
  product?.images?.[0]?.altText || product?.name || "Product";

/**
 * True when the backend genuinely marked this product down — i.e. it stores a
 * salePrice below the list price. Nothing is inferred or invented, so a
 * product with no sale price simply carries no festive badge.
 */
export const hasFestiveOffer = (product) => {
  const price = Number(product?.price) || 0;
  const raw = product?.salePrice;
  if (raw === null || raw === undefined || raw === "") return false;
  const sale = Number(raw);
  return Number.isFinite(sale) && sale > 0 && sale < price;
};
