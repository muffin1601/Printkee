import products, { newYear2027Sections } from "./new-year-2027-products";

export const rowDefinitions = newYear2027Sections.map((section, index) => ({
  key: ["gifts", "diaries", "calendars"][index],
  id: section.id,
  title: section.title,
}));

export const legacyProducts = products.map((product) => ({ ...product, id: `legacy:${product.id}` }));

export function defaultSettings() {
  return {
    bannerMode: "default",
    banner: null,
    rows: Object.fromEntries(rowDefinitions.map((row, index) => [
      row.key, newYear2027Sections[index].products.map((product) => `legacy:${product.id}`),
    ])),
  };
}

export function canUseInRow(product, row) {
  if (row === "diaries") return /\bdiar(y|ies)\b/i.test(product.name) && !/\b(set|kit)s?\b/i.test(product.name);
  if (row === "calendars") return /\bcalendars?\b/i.test(product.name);
  return true;
}

export function resolvePageSections(settings, catalogue = []) {
  const byId = new Map([...legacyProducts, ...catalogue].map((product) => [product.id, product]));
  const seen = new Set();
  return rowDefinitions.map((row) => ({
    ...row,
    products: (settings.rows[row.key] || []).flatMap((key) => {
      const product = byId.get(key);
      if (!product || !product.image || product.available === false || seen.has(key) || !canUseInRow(product, row.key)) return [];
      seen.add(key);
      return [product];
    }),
  }));
}
