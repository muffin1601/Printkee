import catalogueProducts from "./diwali-2026-products.js";
import stationeryProducts from "./new-year-2027-stationery.json";

const diaryPenSets2027 = [
  { name: "2027 Diary & Pen Set — Style 1", description: "2027 diary shown with a pen." },
  { name: "2027 Boxed Diary & Pen Set", description: "2027 diary and pen presented in a gift box." },
  { name: "2027 Diary & Pen Set — Style 3", description: "2027 diaries and pens shown in two colours." },
  { name: "2027 Diary & Pen Set — Style 4", description: "2027 diary shown with a pen." },
].map((product, index) => ({
  id: `2027-diary-pen-set-${index + 1}`,
  ...product,
  category: "2027 Diary & Pen Sets",
  image: `/assets/2027%20diary%20(${index + 1}).jpg`,
  specifications: [],
}));

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

const calendarCovers = ["1/Initial.webp", "2/Initial.webp", "3/Initial.webp", "4/Initial.png", "5/Initial.webp", "6/G-01_1791796940.jpg", "7/S-01_1791797062.jpg"];

export const calendars2027 = calendarCovers.map((file, index) => ({
  id: `2027-calendar-${index + 1}`,
  name: `2027 Corporate Calendar — Design ${index + 1}`,
  category: "Corporate Calendars 2027",
  image: `/CALENDERS%202027/${file}`,
  description: "2027 corporate calendar. Enquire for customisation and branding options.",
  specifications: [],
}));

export const newYear2027Products = [
  ...diaryPenSets2027,
  ...giftaGuruKits,
  ...stationeryProducts,
  ...calendars2027,
  ...catalogueProducts
    .filter((product) => ["diwali-kit-set-2", "diwali-kit-set-3"].includes(product.id))
    .map((product) => ({ ...product, category: "Notebook & Pen Kits" })),
];

export const newYear2027Categories = [
  ...new Set(newYear2027Products.map((product) => product.category)),
];

// Group existing catalogue records without duplicating or relabelling products.
export const newYear2027Sections = [
  {
    id: "new-year-collection",
    title: "New Year 2027 Gift Sets",
    products: newYear2027Products.filter((product) => /\b(set|kit)s?\b/i.test(product.name)),
  },
  {
    id: "corporate-diaries-2027",
    title: "Corporate Diaries 2027",
    products: newYear2027Products.filter((product) =>
      /\bdiary\b/i.test(product.name) && !/\b(set|kit)s?\b/i.test(product.name)
    ),
  },
  {
    id: "corporate-calendars-2027",
    title: "Corporate Calendars 2027",
    products: newYear2027Products.filter((product) => /\bcalendars?\b/i.test(product.name)),
  },
];

export const newYear2027DisplayedProducts = newYear2027Sections.flatMap((section) => section.products);

export default newYear2027Products;
