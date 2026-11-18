import products, { newYear2027Sections } from "./new-year-2027-products";

export const MAX_ROW_ITEMS = 4;

export const legacyProducts = products.map((product) => ({ ...product, id: `legacy:${product.id}` }));

const chunk = (items, size) => Array.from({ length: Math.ceil(items.length / size) }, (_, i) => items.slice(i * size, (i + 1) * size));

// The built-in collection, split into rows of four. Only the first row of each group carries its title.
export function defaultSettings() {
  return {
    bannerMode: "default",
    banner: null,
    customProducts: [],
    deletedProducts: [],
    layout: newYear2027Sections.flatMap((section) =>
      chunk(section.products.map((product) => `legacy:${product.id}`), MAX_ROW_ITEMS).map((items, index) => ({
        id: `${section.id}-${index + 1}`,
        title: index === 0 ? section.title : "",
        items,
      }))
    ),
  };
}

export function resolvePageSections(settings, catalogue = []) {
  const byId = new Map([...legacyProducts, ...catalogue].map((product) => [product.id, product]));
  const seen = new Set();
  return (settings.layout || [])
    .map((row) => ({
      id: row.id,
      title: row.title || "",
      products: (row.items || []).flatMap((key) => {
        const product = byId.get(key);
        if (!product || !product.image || product.available === false || seen.has(key)) return [];
        seen.add(key);
        return [product];
      }),
    }))
    .filter((row) => row.products.length);
}
