const coffeeMugs = [
  // -------------------------------------------------------------
  // PRODUCT 1 — Images 1–3
  // -------------------------------------------------------------
  {
    productCode: "CM-CERAMIC-001",
    SKU: "MUG-CERAMIC-CLASSIC",
    name: "Classic Ceramic Coffee Mug",
    slug: "classic-ceramic-coffee-mug",
    description:
      "Premium ceramic coffee mug ideal for corporate gifting, office branding, employee welcome kits, and promotional giveaways. Supports full-color logo printing and bulk customization. Fast delivery across Delhi NCR, Noida, Gurgaon, Okhla, Faridabad, and PAN India.",
    HSNCode: "69120090",
    type: "Coffee Mug",
    quantity: 800,
    GSTRate: 18,
    brand: "BrewWare",
    fabricType: "Ceramic",
    size: ["350 ml"],
    colour: ["White"],
    weight: 320,
    dimensions: { length: 8, width: 8, height: 9 },
    minOrderQty: 20,
    maxOrderQty: 600,
    availabilityDate: new Date(),
    price: {
      priceCode: "CM-CERAMIC-001-PRICE",
      singlePrice: 129,
      sales_0_50: 119,
      sales_50_100: 109,
      sales_100_above: 99,
      discountPrice: 119,
      discount: { type: "percentage", value: 8, validUntil: new Date("2025-12-31") },
      currency: "INR",
      taxIncluded: true,
      effectiveFrom: new Date(),
      effectiveTo: new Date("2025-12-31")
    },
    image: "/assets/products/coffeemugs/1.webp",
    subImages: [
      "/assets/products/coffeemugs/1.webp",
      "/assets/products/coffeemugs/2.webp",
      "/assets/products/coffeemugs/3.webp"
    ],
    tags: [
      "ceramic mug",
      "custom printed mug",
      "corporate coffee mug",
      "office gift mug",
      "logo printed ceramic mug"
    ],
    keywords: [
      "custom mugs India",
      "corporate ceramic mugs",
      "branded office mugs",
      "Delhi NCR gifting"
    ],
    isFeatured: true,
    isPublished: true,
    isDeleted: false,
    ratings: { average: 4.6, count: 130 },
    metaTitle: "Classic Ceramic Coffee Mug | Custom Printed Corporate Mugs India",
    metaDescription:
      "Classic ceramic coffee mug with custom logo printing and bulk corporate branding. Delivered across Delhi NCR & PAN India.",
    audit: { createdBy: "admin", updatedBy: "admin" }
  },

  // -------------------------------------------------------------
  // PRODUCT 2 — Images 4–6
  // -------------------------------------------------------------
  {
    productCode: "CM-MATTE-002",
    SKU: "MUG-MATTE-BLACK",
    name: "Matte Black Corporate Mug",
    slug: "matte-black-corporate-mug",
    description:
      "Premium matte black coffee mug ideal for executive gifting, brand promotions, employee rewards, and corporate events. Supports engraving and color printing. Bulk supply available in Delhi NCR, Gurgaon, Noida, Okhla, Faridabad & India.",
    HSNCode: "69120090",
    type: "Coffee Mug",
    quantity: 600,
    GSTRate: 18,
    brand: "BrewWare",
    fabricType: "Ceramic Matte",
    size: ["350 ml"],
    colour: ["Black"],
    weight: 330,
    dimensions: { length: 8, width: 8, height: 9 },
    minOrderQty: 10,
    maxOrderQty: 500,
    availabilityDate: new Date(),
    price: {
      priceCode: "CM-MATTE-002-PRICE",
      singlePrice: 159,
      sales_0_50: 149,
      sales_50_100: 139,
      sales_100_above: 129,
      discountPrice: 149,
      discount: { type: "percentage", value: 7, validUntil: new Date("2025-12-31") },
      currency: "INR",
      taxIncluded: true,
      effectiveFrom: new Date(),
      effectiveTo: new Date("2025-12-31")
    },
    image: "/assets/products/coffeemugs/4.webp",
    subImages: [
      "/assets/products/coffeemugs/4.webp",
      "/assets/products/coffeemugs/5.webp",
      "/assets/products/coffeemugs/6.webp"
    ],
    tags: [
      "matte black mug",
      "executive mug",
      "corporate branding mug",
      "logo engraved mug",
      "premium office mug"
    ],
    keywords: [
      "black corporate mug",
      "executive coffee mug",
      "branding mugs India"
    ],
    isFeatured: true,
    isPublished: true,
    isDeleted: false,
    ratings: { average: 4.7, count: 110 },
    metaTitle: "Matte Black Corporate Coffee Mug | Custom Logo Mugs India",
    metaDescription:
      "Premium matte black coffee mug for corporate gifting with engraving & logo printing. Delivered PAN India.",
    audit: { createdBy: "admin", updatedBy: "admin" }
  },

  // -------------------------------------------------------------
  // PRODUCT 3 — Images 7–9
  // -------------------------------------------------------------
  {
    productCode: "CM-TRAVEL-003",
    SKU: "MUG-TRAVEL-STEEL",
    name: "Insulated Travel Coffee Mug",
    slug: "insulated-travel-coffee-mug",
    description:
      "Double-wall insulated travel coffee mug ideal for corporate employee gifting, outdoor events, and branded promotional giveaways. Keeps beverages hot and cold for hours. Custom printing available across Delhi NCR & India.",
    HSNCode: "73239390",
    type: "Coffee Mug",
    quantity: 500,
    GSTRate: 18,
    brand: "BrewWare",
    fabricType: "Stainless Steel",
    size: ["400 ml"],
    colour: ["Silver"],
    weight: 380,
    dimensions: { length: 8, width: 8, height: 18 },
    minOrderQty: 10,
    maxOrderQty: 400,
    availabilityDate: new Date(),
    price: {
      priceCode: "CM-TRAVEL-003-PRICE",
      singlePrice: 349,
      sales_0_50: 329,
      sales_50_100: 309,
      sales_100_above: 289,
      discountPrice: 329,
      discount: { type: "percentage", value: 6, validUntil: new Date("2025-12-31") },
      currency: "INR",
      taxIncluded: true,
      effectiveFrom: new Date(),
      effectiveTo: new Date("2025-12-31")
    },
    image: "/assets/products/coffeemugs/7.webp",
    subImages: [
      "/assets/products/coffeemugs/7.webp",
      "/assets/products/coffeemugs/8.webp",
      "/assets/products/coffeemugs/9.webp"
    ],
    tags: [
      "travel mug",
      "insulated coffee mug",
      "corporate travel mug",
      "promotional steel mug",
      "hot and cold mug"
    ],
    keywords: [
      "insulated mug India",
      "corporate travel mug",
      "steel coffee mug"
    ],
    isFeatured: false,
    isPublished: true,
    isDeleted: false,
    ratings: { average: 4.6, count: 95 },
    metaTitle: "Insulated Travel Coffee Mug | Custom Corporate Steel Mugs",
    metaDescription:
      "Double-wall insulated corporate travel mug with branding options. Ideal for employee gifting and events. PAN India delivery.",
    audit: { createdBy: "admin", updatedBy: "admin" }
  },

  // -------------------------------------------------------------
  // PRODUCT 4 — Images 10–12
  // -------------------------------------------------------------
  {
    productCode: "CM-COLOR-004",
    SKU: "MUG-COLOR-INSIDE",
    name: "Dual Tone Color Inside Mug",
    slug: "dual-tone-color-inside-mug",
    description:
      "Dual-tone ceramic mug with colorful interior, best for promotional gifting, office branding, café merchandising, and event giveaways. Custom logo printing available. Bulk orders across Delhi NCR & PAN India.",
    HSNCode: "69120090",
    type: "Coffee Mug",
    quantity: 650,
    GSTRate: 18,
    brand: "BrewWare",
    fabricType: "Ceramic",
    size: ["330 ml"],
    colour: ["White + Blue"],
    weight: 310,
    dimensions: { length: 8, width: 8, height: 9 },
    minOrderQty: 20,
    maxOrderQty: 600,
    availabilityDate: new Date(),
    price: {
      priceCode: "CM-COLOR-004-PRICE",
      singlePrice: 139,
      sales_0_50: 129,
      sales_50_100: 119,
      sales_100_above: 109,
      discountPrice: 129,
      discount: { type: "percentage", value: 8, validUntil: new Date("2025-12-31") },
      currency: "INR",
      taxIncluded: true,
      effectiveFrom: new Date(),
      effectiveTo: new Date("2025-12-31")
    },
    image: "/assets/products/coffeemugs/10.webp",
    subImages: [
      "/assets/products/coffeemugs/10.webp",
      "/assets/products/coffeemugs/11.webp",
      "/assets/products/coffeemugs/12.webp"
    ],
    tags: [
      "dual tone mug",
      "colored inside mug",
      "promotional ceramic mug",
      "custom printed mugs",
      "corporate gifting India"
    ],
    keywords: [
      "dual tone coffee mug",
      "branded ceramic mug",
      "office gifting mugs"
    ],
    isFeatured: false,
    isPublished: true,
    isDeleted: false,
    ratings: { average: 4.5, count: 88 },
    metaTitle: "Dual Tone Color Inside Mug | Custom Printed Corporate Mugs",
    metaDescription:
      "Premium dual-tone ceramic mug with inside color printing and logo branding. Ideal for corporate & promotional gifting.",
    audit: { createdBy: "admin", updatedBy: "admin" }
  },

  // -------------------------------------------------------------
  // PRODUCT 5 — Images 13–15
  // -------------------------------------------------------------
  {
    productCode: "CM-PREMIUM-005",
    SKU: "MUG-PREMIUM-GIFT",
    name: "Premium Corporate Gift Mug",
    slug: "premium-corporate-gift-mug",
    description:
      "High-quality premium corporate coffee mug designed for executive gifting, brand promotions, employee hampers, and festive corporate giveaways. Supports custom printing & packaging. Delivered PAN India including Delhi NCR, Gurgaon, Noida & Faridabad.",
    HSNCode: "69120090",
    type: "Coffee Mug",
    quantity: 550,
    GSTRate: 18,
    brand: "BrewWare",
    fabricType: "High-Gloss Ceramic",
    size: ["380 ml"],
    colour: ["White"],
    weight: 340,
    dimensions: { length: 8, width: 8, height: 10 },
    minOrderQty: 10,
    maxOrderQty: 400,
    availabilityDate: new Date(),
    price: {
      priceCode: "CM-PREMIUM-005-PRICE",
      singlePrice: 179,
      sales_0_50: 169,
      sales_50_100: 159,
      sales_100_above: 149,
      discountPrice: 169,
      discount: { type: "percentage", value: 7, validUntil: new Date("2025-12-31") },
      currency: "INR",
      taxIncluded: true,
      effectiveFrom: new Date(),
      effectiveTo: new Date("2025-12-31")
    },
    image: "/assets/products/coffeemugs/13.webp",
    subImages: [
      "/assets/products/coffeemugs/13.webp",
      "/assets/products/coffeemugs/14.webp",
      "/assets/products/coffeemugs/15.webp"
    ],
    tags: [
      "premium mug",
      "corporate gift mug",
      "custom printed coffee mug",
      "executive gifting",
      "festive corporate gift"
    ],
    keywords: [
      "premium corporate mug",
      "executive office mug",
      "custom printed mugs India"
    ],
    isFeatured: true,
    isPublished: true,
    isDeleted: false,
    ratings: { average: 4.8, count: 102 },
    metaTitle: "Premium Corporate Gift Coffee Mug | Custom Branding India",
    metaDescription:
      "Premium ceramic corporate coffee mug with full-color printing. Ideal for executive gifting & branded corporate hampers. PAN India delivery.",
    audit: { createdBy: "admin", updatedBy: "admin" }
  }
];

module.exports = coffeeMugs;
