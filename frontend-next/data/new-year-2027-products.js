import catalogueProducts from "./diwali-2026-products.js";

const diwaliSpecificProduct = /\bdiwali\b|\bdiyas?\b/i;

export const newYear2027Products = catalogueProducts.filter((product) => {
  const productCopy = [
    product.name,
    product.description,
    ...(product.specifications || []),
  ].join(" ");

  return !diwaliSpecificProduct.test(productCopy);
});

export const newYear2027Categories = [
  ...new Set(newYear2027Products.map((product) => product.category)),
];

export default newYear2027Products;
