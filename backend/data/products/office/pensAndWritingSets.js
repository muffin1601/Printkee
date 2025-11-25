const pensAndWritingSets = [
  // -------------------------------------------------------------
  // PRODUCT 1 (Images 1–3)
  // -------------------------------------------------------------
  {
    productCode: "PEN-METAL-001",
    SKU: "METAL-PEN-PREMIUM",
    name: "Premium Metal Ball Pen",
    slug: "premium-metal-ball-pen",
    description:
      "Premium metal ball pen designed for corporate gifting, branding, events, conferences, and employee welcome kits. Ideal for custom engraving and logo printing for businesses across Delhi NCR, Noida, Gurgaon, Okhla, Faridabad, and all over India.",
    HSNCode: "96081019",
    type: "Writing Instrument",
    quantity: 1500,
    GSTRate: 18,
    brand: "WriteMaster",
    fabricType: "Metal Alloy",
    size: ["Standard"],
    colour: ["Black"],
    weight: 25,
    dimensions: { length: 14, width: 1, height: 1 },
    minOrderQty: 50,
    maxOrderQty: 5000,
    availabilityDate: new Date(),
    price: {
      priceCode: "PEN-METAL-PRICE",
      singlePrice: 49,
      sales_0_50: 45,
      sales_50_100: 42,
      sales_100_above: 39,
      discountPrice: 45,
      discount: {
        type: "percentage",
        value: 8,
        validUntil: new Date("2025-12-31")
      },
      currency: "INR",
      taxIncluded: true,
      effectiveFrom: new Date(),
      effectiveTo: new Date("2025-12-31")
    },
    image: "/assets/products/pens/1.webp",
    subImages: [
      "/assets/products/pens/1.webp",
      "/assets/products/pens/2.webp",
      "/assets/products/pens/3.webp"
    ],
    tags: [
      "custom metal pen",
      "engraved corporate pen",
      "premium office pen",
      "branded pen Delhi NCR",
      "corporate gifting India",
      "promotional pens with logo"
    ],
    keywords: [
      "metal pen",
      "custom pen",
      "corporate pen supplier",
      "engraved pen",
      "Delhi NCR Noida Gurgaon"
    ],
    isFeatured: true,
    isPublished: true,
    isDeleted: false,
    ratings: { average: 4.7, count: 160 },
    metaTitle:
      "Premium Metal Pens with Custom Engraving | Corporate Gifting Delhi NCR",
    metaDescription:
      "Premium metal pens with custom engraving for corporate gifting, branding & events. Bulk supply for Delhi NCR, Noida, Gurgaon & across India.",
    audit: { createdBy: "admin", updatedBy: "admin" }
  },

  // -------------------------------------------------------------
  // PRODUCT 2 (Images 4–6)
  // -------------------------------------------------------------
  {
    productCode: "PEN-GEL-002",
    SKU: "GEL-PEN-OFFICE",
    name: "Smooth Writing Gel Pen",
    slug: "smooth-writing-gel-pen",
    description:
      "Smooth writing gel pen ideal for office use, employee kits, training sessions, and branded promotional gifting. Custom logo printing available for bulk corporate orders across Delhi NCR and pan India.",
    HSNCode: "96081012",
    type: "Writing Instrument",
    quantity: 2000,
    GSTRate: 18,
    brand: "WriteMaster",
    fabricType: "Plastic",
    size: ["Standard"],
    colour: ["Blue"],
    weight: 18,
    dimensions: { length: 14.5, width: 1, height: 1 },
    minOrderQty: 100,
    maxOrderQty: 10000,
    availabilityDate: new Date(),
    price: {
      priceCode: "PEN-GEL-PRICE",
      singlePrice: 19,
      sales_0_50: 17,
      sales_50_100: 16,
      sales_100_above: 15,
      discountPrice: 17,
      discount: {
        type: "percentage",
        value: 10,
        validUntil: new Date("2025-12-31")
      },
      currency: "INR",
      taxIncluded: true,
      effectiveFrom: new Date(),
      effectiveTo: new Date("2025-12-31")
    },
    image: "/assets/products/pens/4.webp",
    subImages: [
      "/assets/products/pens/4.webp",
      "/assets/products/pens/5.webp",
      "/assets/products/pens/6.webp"
    ],
    tags: [
      "gel pen",
      "smooth writing pen",
      "office stationery pen",
      "custom logo printed pens",
      "bulk pens for corporate",
      "promotional gel pen India"
    ],
    keywords: [
      "gel pen",
      "office pen",
      "corporate stationery",
      "custom printed pens",
      "Delhi NCR Noida Gurgaon"
    ],
    isFeatured: true,
    isPublished: true,
    isDeleted: false,
    ratings: { average: 4.5, count: 130 },
    metaTitle:
      "Smooth Writing Gel Pens with Custom Branding | Corporate Stationery Supplier",
    metaDescription:
      "Smooth writing gel pens with logo printing for corporate offices, welcome kits & events. Bulk delivery in Delhi NCR, Noida, Gurgaon & all India.",
    audit: { createdBy: "admin", updatedBy: "admin" }
  },

  // -------------------------------------------------------------
  // PRODUCT 3 (Images 7–10)
  // -------------------------------------------------------------
  {
    productCode: "PEN-MULTISET-003",
    SKU: "WRITING-SET-DELUXE",
    name: "Deluxe Pen & Writing Set",
    slug: "deluxe-pen-writing-set",
    description:
      "Corporate deluxe pen and writing set including a premium metal pen, notepad, and accessories. Ideal for executive gifting, conferences, onboarding kits, and branded corporate hampers across Delhi NCR and India.",
    HSNCode: "96086000",
    type: "Writing Set",
    quantity: 600,
    GSTRate: 18,
    brand: "WriteMaster",
    fabricType: "Metal + PU",
    size: ["Standard"],
    colour: ["Black"],
    weight: 350,
    dimensions: { length: 20, width: 12, height: 3 },
    minOrderQty: 20,
    maxOrderQty: 1000,
    availabilityDate: new Date(),
    price: {
      priceCode: "PEN-MULTISET-PRICE",
      singlePrice: 399,
      sales_0_50: 379,
      sales_50_100: 359,
      sales_100_above: 329,
      discountPrice: 379,
      discount: {
        type: "percentage",
        value: 5,
        validUntil: new Date("2025-12-31")
      },
      currency: "INR",
      taxIncluded: true,
      effectiveFrom: new Date(),
      effectiveTo: new Date("2025-12-31")
    },
    image: "/assets/products/pens/7.webp",
    subImages: [
      "/assets/products/pens/7.webp",
      "/assets/products/pens/8.webp",
      "/assets/products/pens/9.webp",
      "/assets/products/pens/10.webp"
    ],
    tags: [
      "corporate writing set",
      "pen gift set",
      "executive pen combo",
      "custom printed writing set",
      "corporate gifting India",
      "branding gifts Delhi NCR"
    ],
    keywords: [
      "pen set",
      "corporate writing kit",
      "executive gifting",
      "custom branding set",
      "Delhi Noida Gurgaon"
    ],
    isFeatured: true,
    isPublished: true,
    isDeleted: false,
    ratings: { average: 4.8, count: 110 },
    metaTitle:
      "Deluxe Pen & Writing Set | Corporate Executive Gifting India",
    metaDescription:
      "Premium pen & writing set for executive gifting, branding & conferences. Custom printed pen sets delivered across Delhi NCR & pan India.",
    audit: { createdBy: "admin", updatedBy: "admin" }
  },

  // -------------------------------------------------------------
  // PRODUCT 4 (Images 11–14)
  // -------------------------------------------------------------
  {
    productCode: "PEN-ECONOMY-004",
    SKU: "BALL-PEN-BASIC",
    name: "Economy Ball Pen",
    slug: "economy-ball-pen",
    description:
      "Affordable economy ball pen ideal for bulk corporate stationery, seminars, training programs, and promotional printing. Perfect for businesses across Delhi NCR, Noida, Gurgaon, Faridabad, and all India.",
    HSNCode: "96081019",
    type: "Writing Instrument",
    quantity: 5000,
    GSTRate: 18,
    brand: "WriteMaster",
    fabricType: "Plastic",
    size: ["Standard"],
    colour: ["Blue"],
    weight: 12,
    dimensions: { length: 14.5, width: 1, height: 1 },
    minOrderQty: 200,
    maxOrderQty: 20000,
    availabilityDate: new Date(),
    price: {
      priceCode: "PEN-ECONOMY-PRICE",
      singlePrice: 9,
      sales_0_50: 8,
      sales_50_100: 7.5,
      sales_100_above: 7,
      discountPrice: 8,
      discount: {
        type: "percentage",
        value: 12,
        validUntil: new Date("2025-12-31")
      },
      currency: "INR",
      taxIncluded: true,
      effectiveFrom: new Date(),
      effectiveTo: new Date("2025-12-31")
    },
    image: "/assets/products/pens/11.webp",
    subImages: [
      "/assets/products/pens/11.webp",
      "/assets/products/pens/12.webp",
      "/assets/products/pens/13.webp",
      "/assets/products/pens/14.webp"
    ],
    tags: [
      "economy ball pen",
      "bulk pen supplier",
      "corporate stationery",
      "logo printed pens",
      "training session pens",
      "seminar giveaway pen"
    ],
    keywords: [
      "ball pen",
      "office stationery pen",
      "bulk pen supplier",
      "custom printed pen",
      "Delhi NCR India"
    ],
    isFeatured: false,
    isPublished: true,
    isDeleted: false,
    ratings: { average: 4.2, count: 200 },
    metaTitle:
      "Economy Ball Pens in Bulk | Custom Logo Printed Pens India",
    metaDescription:
      "Economy ball pens for bulk corporate use with custom printing. Ideal for training & seminars. Fast delivery in Delhi NCR, Noida & Gurgaon.",
    audit: { createdBy: "admin", updatedBy: "admin" }
  },

  // -------------------------------------------------------------
  // PRODUCT 5 (Images 15–18)
  // -------------------------------------------------------------
  {
    productCode: "PEN-GIFTSET-005",
    SKU: "EXECUTIVE-GIFT-PEN",
    name: "Executive Pen Gift Set",
    slug: "executive-pen-gift-set",
    description:
      "Elegant executive pen gift set perfect for corporate gifting, award ceremonies, business events, annual functions, and branded promotional campaigns. Available with premium custom logo printing across India.",
    HSNCode: "96086000",
    type: "Writing Set",
    quantity: 800,
    GSTRate: 18,
    brand: "WriteMaster",
    fabricType: "Metal + PU",
    size: ["Standard"],
    colour: ["Gold"],
    weight: 300,
    dimensions: { length: 18, width: 10, height: 3 },
    minOrderQty: 20,
    maxOrderQty: 1000,
    availabilityDate: new Date(),
    price: {
      priceCode: "PEN-GIFTSET-PRICE",
      singlePrice: 499,
      sales_0_50: 469,
      sales_50_100: 449,
      sales_100_above: 429,
      discountPrice: 469,
      discount: {
        type: "percentage",
        value: 6,
        validUntil: new Date("2025-12-31")
      },
      currency: "INR",
      taxIncluded: true,
      effectiveFrom: new Date(),
      effectiveTo: new Date("2025-12-31")
    },
    image: "/assets/products/pens/15.webp",
    subImages: [
      "/assets/products/pens/15.webp",
      "/assets/products/pens/16.webp",
      "/assets/products/pens/17.webp",
      "/assets/products/pens/18.webp"
    ],
    tags: [
      "executive pen gift set",
      "corporate gifting",
      "premium writing set",
      "branded pen gift box",
      "custom logo printed gift set",
      "corporate awards India"
    ],
    keywords: [
      "pen gift set",
      "executive pen",
      "branding gifts",
      "premium corporate gifting",
      "Delhi NCR India"
    ],
    isFeatured: true,
    isPublished: true,
    isDeleted: false,
    ratings: { average: 4.9, count: 90 },
    metaTitle: "Executive Pen Gift Sets | Premium Corporate Gifts India",
    metaDescription:
      "Luxury executive pen gift sets with custom branding for corporate gifting, events & awards. Delivered across Delhi NCR, Noida & India.",
    audit: { createdBy: "admin", updatedBy: "admin" }
  },

  // -------------------------------------------------------------
  // PRODUCT 6 (Images 19–22)
  // -------------------------------------------------------------
  {
    productCode: "PEN-STYLUS-006",
    SKU: "STYLUS-PEN-PRO",
    name: "Dual Stylus & Ball Pen",
    slug: "dual-stylus-ball-pen",
    description:
      "Two-in-one stylus and ball pen designed for modern corporate professionals. Perfect for branding, conferences, tech events, and corporate welcome kits. Available with custom screen printing and engraving.",
    HSNCode: "96081019",
    type: "Writing Instrument",
    quantity: 1200,
    GSTRate: 18,
    brand: "WriteMaster",
    fabricType: "Metal + Rubber Grip",
    size: ["Standard"],
    colour: ["Silver"],
    weight: 22,
    dimensions: { length: 15, width: 1, height: 1 },
    minOrderQty: 30,
    maxOrderQty: 3000,
    availabilityDate: new Date(),
    price: {
      priceCode: "PEN-STYLUS-PRICE",
      singlePrice: 89,
      sales_0_50: 79,
      sales_50_100: 74,
      sales_100_above: 69,
      discountPrice: 79,
      discount: {
        type: "percentage",
        value: 10,
        validUntil: new Date("2025-12-31")
      },
      currency: "INR",
      taxIncluded: true,
      effectiveFrom: new Date(),
      effectiveTo: new Date("2025-12-31")
    },
    image: "/assets/products/pens/19.webp",
    subImages: [
      "/assets/products/pens/19.webp",
      "/assets/products/pens/20.webp",
      "/assets/products/pens/21.webp",
      "/assets/products/pens/22.webp"
    ],
    tags: [
      "stylus pen",
      "dual-function pen",
      "corporate tech gifting",
      "custom logo printed stylus pen",
      "office stationery India",
      "promotional gadgets"
    ],
    keywords: [
      "stylus pen",
      "dual pen",
      "corporate tech gift",
      "custom printed stylus pen",
      "Delhi NCR India"
    ],
    isFeatured: false,
    isPublished: true,
    isDeleted: false,
    ratings: { average: 4.6, count: 115 },
    metaTitle: "Stylus & Ball Pen Combo | Corporate Tech Gifting India",
    metaDescription:
      "Dual stylus & ball pen with custom printing for corporate branding, events & tech gifting. Bulk supply in Delhi NCR, Noida & across India.",
    audit: { createdBy: "admin", updatedBy: "admin" }
  }
];

module.exports = pensAndWritingSets;
