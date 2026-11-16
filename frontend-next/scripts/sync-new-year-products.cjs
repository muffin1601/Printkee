const fs = require("node:fs");
const path = require("node:path");

const backendProducts = path.join(__dirname, "../../backend-next/data/products");
const notebooksAndDiaries = require(path.join(backendProducts, "office/notebooksAndDiaries.js"));
const pensAndWritingSets = require(path.join(backendProducts, "office/pensAndWritingSets.js"));
const corkDeskProducts = require(path.join(backendProducts, "ecoproducts/corkDeskProducts.js"));

const toCard = (product, category, productPath) => ({
  id: product.slug,
  name: product.name,
  category,
  image: product.images[0].url,
  description: product.description.short,
  specifications: [product.attributes?.material, product.attributes?.size].filter(Boolean),
  sku: product.sku,
  href: `${productPath}/${product.slug}`,
});

const groups = [
  [notebooksAndDiaries, "Notebooks & Diaries", "/office-and-writing/notebooks-and-diary-sets"],
  [pensAndWritingSets, "Pens & Writing Sets", "/office-and-writing/pen-and-writing-set"],
  [corkDeskProducts.filter((product) => /\b(diary|calendar)\b/i.test(product.name)), "Diaries & Calendars", "/eco-products/cork-desk-top-accessories"],
];

const products = groups.flatMap(([items, category, productPath]) =>
  items.filter((product) => product.isActive).map((product) => toCard(product, category, productPath))
);

fs.writeFileSync(
  path.join(__dirname, "../data/new-year-2027-stationery.json"),
  `${JSON.stringify(products, null, 2)}\n`
);
console.log(`Synced ${products.length} New Year stationery products from the main catalogue.`);
