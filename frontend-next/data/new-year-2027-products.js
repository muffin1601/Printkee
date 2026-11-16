import catalogueProducts from "./diwali-2026-products.js";
import stationeryProducts from "./new-year-2027-stationery.json";

const giftaGuruKits = Array.from({ length: 24 }, (_, index) => {
  const setNumber = index + 1;
  return {
    id: `gifta-guru-set-${setNumber}`,
    name: `Gifta Guru Gift Kit — Set ${setNumber}`,
    category: "Gifta Guru Kits",
    image: `/Gifta%20Guru/Set%20${setNumber}/1%20(1).png`,
    description: "Boxed corporate gift kit. Enquire for contents and branding options.",
    specifications: [],
  };
});

export const newYear2027Products = [
  ...giftaGuruKits,
  ...stationeryProducts,
  ...catalogueProducts
    .filter((product) => ["diwali-kit-set-2", "diwali-kit-set-3"].includes(product.id))
    .map((product) => ({ ...product, category: "Notebook & Pen Kits" })),
];

export const newYear2027Categories = [
  ...new Set(newYear2027Products.map((product) => product.category)),
];

export default newYear2027Products;
