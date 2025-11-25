const bambooBottles = [
  // -------------------------------------------------------------
  // PRODUCT 1 — Images 1–3
  // -------------------------------------------------------------
  {
    productCode: "BB-BAMBOO-001",
    SKU: "BAMBOO-BOTTLE-750ML",
    name: "Premium Bamboo Sipper Bottle",
    slug: "premium-bamboo-sipper-bottle",
    description:
      "Eco-friendly premium bamboo sipper bottle designed for corporate gifting, employee welcome kits, and sustainable brand promotions. Offers a natural finish, leak-proof cap, and custom logo engraving/printing. Bulk corporate supply across Delhi NCR, Noida, Gurgaon, Okhla, Faridabad and all over India.",
    HSNCode: "44219990",
    type: "Bamboo Bottle",
    quantity: 500,
    GSTRate: 18,
    brand: "EcoHydrate",
    fabricType: "Natural Bamboo + Stainless Steel",
    size: ["750ml"],
    colour: ["Wood Finish"],
    weight: 420,
    dimensions: { length: 25, width: 7, height: 7 },
    minOrderQty: 10,
    maxOrderQty: 400,
    availabilityDate: new Date(),
    price: {
      priceCode: "BB-BAMBOO-PRICE-001",
      singlePrice: 549,
      sales_0_50: 529,
      sales_50_100: 499,
      sales_100_above: 479,
      discountPrice: 529,
      discount: { type: "percentage", value: 5, validUntil: new Date("2025-12-31") },
      currency: "INR",
      taxIncluded: true,
      effectiveFrom: new Date(),
      effectiveTo: new Date("2025-12-31")
    },
    image: "/assets/products/bamboobottles/1.webp",
    subImages: [
      "/assets/products/bamboobottles/1.webp",
      "/assets/products/bamboobottles/2.webp",
      "/assets/products/bamboobottles/3.webp"
    ],
    tags: [
      "bamboo bottle",
      "eco friendly bottle",
      "corporate gifting bamboo",
      "custom printed bamboo bottle",
      "engraved bamboo bottle",
      "sustainable corporate gifts India"
    ],
    keywords: [
      "bamboo water bottle",
      "eco friendly corporate gifting",
      "custom logo bamboo bottle",
      "Delhi NCR corporate gifts"
    ],
    isFeatured: true,
    isPublished: true,
    isDeleted: false,
    ratings: { average: 4.7, count: 90 },
    metaTitle: "Premium Bamboo Sipper Bottle | Eco-Friendly Corporate Gifting India",
    metaDescription:
      "High-quality bamboo sipper bottle with custom logo engraving. Perfect for eco-friendly corporate gifting in Delhi NCR & across India.",
    audit: { createdBy: "admin", updatedBy: "admin" }
  },

  // -------------------------------------------------------------
  // PRODUCT 2 — Images 4–6
  // -------------------------------------------------------------
  {
    productCode: "BB-BAMBOO-002",
    SKU: "BAMBOO-THERMO-500ML",
    name: "Bamboo Thermo Sipper Bottle",
    slug: "bamboo-thermo-sipper-bottle",
    description:
      "Double-wall bamboo thermo sipper bottle ideal for premium corporate gifting, events, wellness campaigns, and sustainable promotional merchandise. Maintains temperature and supports custom engraving/printing for branding. Delivered in bulk across Delhi NCR, Noida, Gurgaon, and pan-India.",
    HSNCode: "44219990",
    type: "Bamboo Bottle",
    quantity: 450,
    GSTRate: 18,
    brand: "EcoHydrate",
    fabricType: "Bamboo + Stainless Steel Vacuum",
    size: ["500ml"],
    colour: ["Natural Wood"],
    weight: 480,
    dimensions: { length: 23, width: 7, height: 7 },
    minOrderQty: 10,
    maxOrderQty: 350,
    availabilityDate: new Date(),
    price: {
      priceCode: "BB-BAMBOO-PRICE-002",
      singlePrice: 649,
      sales_0_50: 629,
      sales_50_100: 599,
      sales_100_above: 579,
      discountPrice: 629,
      discount: { type: "percentage", value: 6, validUntil: new Date("2025-12-31") },
      currency: "INR",
      taxIncluded: true,
      effectiveFrom: new Date(),
      effectiveTo: new Date("2025-12-31")
    },
    image: "/assets/products/bamboobottles/4.webp",
    subImages: [
      "/assets/products/bamboobottles/4.webp",
      "/assets/products/bamboobottles/5.webp",
      "/assets/products/bamboobottles/6.webp"
    ],
    tags: [
      "bamboo thermo bottle",
      "insulated bamboo bottle",
      "eco friendly gifting",
      "corporate branding bottle",
      "engraved thermo bamboo"
    ],
    keywords: [
      "bamboo insulated bottle",
      "premium corporate gift bottle",
      "custom printed bamboo thermo"
    ],
    isFeatured: true,
    isPublished: true,
    isDeleted: false,
    ratings: { average: 4.8, count: 78 },
    metaTitle:
      "Bamboo Thermo Sipper Bottle | Premium Corporate Eco Gifts India",
    metaDescription:
      "Double-wall bamboo thermo sipper bottle with custom engraving. Ideal for premium corporate gifting across Delhi NCR & India.",
    audit: { createdBy: "admin", updatedBy: "admin" }
  },

  // -------------------------------------------------------------
  // PRODUCT 3 — Images 7–9
  // -------------------------------------------------------------
  {
    productCode: "BB-BAMBOO-003",
    SKU: "BAMBOO-SPORT-750ML",
    name: "Bamboo Sports Sipper Bottle",
    slug: "bamboo-sports-sipper-bottle",
    description:
      "Stylish bamboo sports sipper bottle ideal for fitness events, employee wellness drives, and branded corporate gifting. Comes with a steel sipper top and large branding area for custom logo engraving. Bulk supply across Delhi NCR, Noida, Gurgaon, Okhla & India.",
    HSNCode: "44219990",
    type: "Bamboo Bottle",
    quantity: 600,
    GSTRate: 18,
    brand: "EcoHydrate",
    fabricType: "Bamboo + Steel Sipper Cap",
    size: ["750ml"],
    colour: ["Natural Wood"],
    weight: 390,
    dimensions: { length: 26, width: 7, height: 7 },
    minOrderQty: 20,
    maxOrderQty: 600,
    availabilityDate: new Date(),
    price: {
      priceCode: "BB-BAMBOO-PRICE-003",
      singlePrice: 499,
      sales_0_50: 479,
      sales_50_100: 459,
      sales_100_above: 439,
      discountPrice: 479,
      discount: { type: "percentage", value: 8, validUntil: new Date("2025-12-31") },
      currency: "INR",
      taxIncluded: true,
      effectiveFrom: new Date(),
      effectiveTo: new Date("2025-12-31")
    },
    image: "/assets/products/bamboobottles/7.webp",
    subImages: [
      "/assets/products/bamboobottles/7.webp",
      "/assets/products/bamboobottles/8.webp",
      "/assets/products/bamboobottles/9.webp"
    ],
    tags: [
      "bamboo sports bottle",
      "eco sports sipper",
      "corporate fitness gifting",
      "branded bamboo bottle"
    ],
    keywords: [
      "sports bamboo bottle",
      "corporate wellness campaign gifts",
      "custom bamboo sipper India"
    ],
    isFeatured: false,
    isPublished: true,
    isDeleted: false,
    ratings: { average: 4.6, count: 88 },
    metaTitle:
      "Bamboo Sports Sipper Bottle | Eco-Friendly Promotional Bottles India",
    metaDescription:
      "Sports-style bamboo sipper bottle with branding options. Ideal for corporate wellness gifting. Bulk supply PAN India.",
    audit: { createdBy: "admin", updatedBy: "admin" }
  },

  // -------------------------------------------------------------
  // PRODUCT 4 — Images 10–12
  // -------------------------------------------------------------
  {
    productCode: "BB-BAMBOO-004",
    SKU: "BAMBOO-TEA-FLASK",
    name: "Bamboo Tea Infuser Bottle",
    slug: "bamboo-tea-infuser-bottle",
    description:
      "Elegant bamboo tea infuser bottle ideal for CEO gifts, premium corporate gifting, and sustainable brand promotions. Features a removable infuser for tea lovers and supports custom engraving for logos. Available for bulk orders across Delhi NCR, Gurgaon, Noida & India.",
    HSNCode: "44219990",
    type: "Bamboo Bottle",
    quantity: 350,
    GSTRate: 18,
    brand: "EcoHydrate",
    fabricType: "Bamboo + Steel Tea Infuser",
    size: ["450ml"],
    colour: ["Natural Wood"],
    weight: 460,
    dimensions: { length: 22, width: 7, height: 7 },
    minOrderQty: 10,
    maxOrderQty: 300,
    availabilityDate: new Date(),
    price: {
      priceCode: "BB-BAMBOO-PRICE-004",
      singlePrice: 699,
      sales_0_50: 679,
      sales_50_100: 649,
      sales_100_above: 629,
      discountPrice: 679,
      discount: { type: "percentage", value: 5, validUntil: new Date("2025-12-31") },
      currency: "INR",
      taxIncluded: true,
      effectiveFrom: new Date(),
      effectiveTo: new Date("2025-12-31")
    },
    image: "/assets/products/bamboobottles/10.webp",
    subImages: [
      "/assets/products/bamboobottles/10.webp",
      "/assets/products/bamboobottles/11.webp",
      "/assets/products/bamboobottles/12.webp"
    ],
    tags: [
      "bamboo tea infuser",
      "premium corporate gift",
      "executive gifting bottle",
      "engraved bamboo flask"
    ],
    keywords: [
      "tea infuser bamboo bottle",
      "premium office gifting",
      "sustainable corporate gifts India"
    ],
    isFeatured: true,
    isPublished: true,
    isDeleted: false,
    ratings: { average: 4.9, count: 72 },
    metaTitle:
      "Bamboo Tea Infuser Bottle | Premium Executive & Corporate Gifting India",
    metaDescription:
      "Luxury bamboo tea infuser bottle with custom branding. Ideal for executive gifting across Delhi NCR & India.",
    audit: { createdBy: "admin", updatedBy: "admin" }
  },

  // -------------------------------------------------------------
  // PRODUCT 5 — Images 13–15
  // -------------------------------------------------------------
  {
    productCode: "BB-BAMBOO-005",
    SKU: "BAMBOO-BOTTLE-CLASSIC",
    name: "Classic Eco-Friendly Bamboo Bottle",
    slug: "classic-eco-friendly-bamboo-bottle",
    description:
      "Classic eco-friendly bamboo bottle suitable for corporate events, promotional giveaways, and sustainable employee gifting. Features a stylish bamboo finish and leak-proof cap with custom logo printing options. Bulk supply available across Delhi NCR & PAN India.",
    HSNCode: "44219990",
    type: "Bamboo Bottle",
    quantity: 700,
    GSTRate: 18,
    brand: "EcoHydrate",
    fabricType: "Natural Bamboo",
    size: ["600ml"],
    colour: ["Wood"],
    weight: 360,
    dimensions: { length: 24, width: 7, height: 7 },
    minOrderQty: 20,
    maxOrderQty: 700,
    availabilityDate: new Date(),
    price: {
      priceCode: "BB-BAMBOO-PRICE-005",
      singlePrice: 399,
      sales_0_50: 379,
      sales_50_100: 359,
      sales_100_above: 339,
      discountPrice: 379,
      discount: { type: "percentage", value: 6, validUntil: new Date("2025-12-31") },
      currency: "INR",
      taxIncluded: true,
      effectiveFrom: new Date(),
      effectiveTo: new Date("2025-12-31")
    },
    image: "/assets/products/bamboobottles/13.webp",
    subImages: [
      "/assets/products/bamboobottles/13.webp",
      "/assets/products/bamboobottles/14.webp",
      "/assets/products/bamboobottles/15.webp"
    ],
    tags: [
      "eco friendly bamboo bottle",
      "corporate promotional gift",
      "custom bamboo sipper bottle",
      "sustainable branding product"
    ],
    keywords: [
      "eco friendly bottle india",
      "bamboo bottle wholesale",
      "corporate branding bamboo bottle"
    ],
    isFeatured: false,
    isPublished: true,
    isDeleted: false,
    ratings: { average: 4.5, count: 110 },
    metaTitle:
      "Classic Eco-Friendly Bamboo Bottle | Custom Printed Corporate Gifts India",
    metaDescription:
      "Sustainable bamboo bottle with custom printing. Perfect for eco-friendly gifting in Delhi NCR, Noida, Gurgaon & across India.",
    audit: { createdBy: "admin", updatedBy: "admin" }
  }
];

module.exports = bambooBottles;
