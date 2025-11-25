const duffleBags = [
  // -------------------------------------------------------------
  // PRODUCT 1 — Images 1–3
  // -------------------------------------------------------------
  {
    productCode: "DB-SPORT-001",
    SKU: "DUFFLE-BAG-SPORT",
    name: "Classic Sports Duffle Bag",
    slug: "classic-sports-duffle-bag",
    description:
      "Classic sports duffle bag ideal for employee gifting, fitness events, corporate activities, and promotional branding. Lightweight, durable, and perfect for corporate onboarding kits. Bulk custom printing available in Delhi NCR, Noida, Gurgaon, Okhla, Faridabad & all across India.",
    HSNCode: "42029200",
    type: "Duffle Bag",
    quantity: 900,
    GSTRate: 18,
    brand: "GearPro",
    fabricType: "Polyester",
    size: ["Medium"],
    colour: ["Black"],
    weight: 520,
    dimensions: { length: 46, width: 25, height: 25 },
    minOrderQty: 10,
    maxOrderQty: 750,
    availabilityDate: new Date(),
    price: {
      priceCode: "DB-SPORT-PRICE",
      singlePrice: 349,
      sales_0_50: 329,
      sales_50_100: 309,
      sales_100_above: 289,
      discountPrice: 329,
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
    image: "/assets/products/dufflebags/1.webp",
    subImages: [
      "/assets/products/dufflebags/1.webp",
      "/assets/products/dufflebags/2.webp",
      "/assets/products/dufflebags/3.webp"
    ],
    tags: [
      "duffle bag",
      "sports duffle bag",
      "corporate gifting bag",
      "custom printed duffle bag",
      "event gift bags",
      "Delhi NCR corporate supplier"
    ],
    keywords: [
      "sports duffle bag india",
      "corporate bag supplier",
      "employee gifting bags",
      "custom printed bags",
      "Noida Gurgaon Faridabad"
    ],
    isFeatured: true,
    isPublished: true,
    isDeleted: false,
    ratings: { average: 4.4, count: 115 },
    metaTitle:
      "Classic Sports Duffle Bag | Custom Printed Corporate Gifting Bags India",
    metaDescription:
      "Durable sports duffle bags with custom logo printing, ideal for corporate gifting, events & onboarding kits. Bulk orders in Delhi NCR & India.",
    audit: { createdBy: "admin", updatedBy: "admin" }
  },

  // -------------------------------------------------------------
  // PRODUCT 2 — Images 4–6
  // -------------------------------------------------------------
  {
    productCode: "DB-TRAVEL-002",
    SKU: "DUFFLE-BAG-TRAVEL",
    name: "Travel & Gym Duffle Bag",
    slug: "travel-and-gym-duffle-bag",
    description:
      "Stylish travel & gym duffle bag designed for corporate events, employee wellness programs, promotional gifting, and brand campaigns. Spacious, long-lasting & suitable for custom printing in bulk across Delhi NCR and all India.",
    HSNCode: "42029200",
    type: "Duffle Bag",
    quantity: 700,
    GSTRate: 18,
    brand: "GearPro",
    fabricType: "Nylon",
    size: ["Large"],
    colour: ["Blue"],
    weight: 680,
    dimensions: { length: 52, width: 28, height: 26 },
    minOrderQty: 10,
    maxOrderQty: 600,
    availabilityDate: new Date(),
    price: {
      priceCode: "DB-TRAVEL-PRICE",
      singlePrice: 449,
      sales_0_50: 429,
      sales_50_100: 409,
      sales_100_above: 389,
      discountPrice: 429,
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
    image: "/assets/products/dufflebags/4.webp",
    subImages: [
      "/assets/products/dufflebags/4.webp",
      "/assets/products/dufflebags/5.webp",
      "/assets/products/dufflebags/6.webp"
    ],
    tags: [
      "travel duffle bag",
      "gym duffle bag",
      "corporate event bag",
      "custom printed travel bag",
      "employee fitness program gifting",
      "India corporate gifts"
    ],
    keywords: [
      "duffle travel bag india",
      "corporate gym bag",
      "bulk gifting duffle bags",
      "branding bags supplier",
      "Delhi NCR Noida Gurgaon"
    ],
    isFeatured: true,
    isPublished: true,
    isDeleted: false,
    ratings: { average: 4.6, count: 102 },
    metaTitle:
      "Travel & Gym Duffle Bag | Custom Printed Promotional Corporate Bags",
    metaDescription:
      "Spacious travel & gym duffle bags with logo printing. Best for corporate gifting & events. Bulk orders available across India.",
    audit: { createdBy: "admin", updatedBy: "admin" }
  },

  // -------------------------------------------------------------
  // PRODUCT 3 — Images 7–9
  // -------------------------------------------------------------
  {
    productCode: "DB-PREMIUM-003",
    SKU: "DUFFLE-BAG-PREMIUM",
    name: "Premium Leatherette Duffle Bag",
    slug: "premium-leatherette-duffle-bag",
    description:
      "Premium leatherette duffle bag designed for executive gifting, CXO kits, conferences, and premium brand promotions. Elegant finish with large surface area for custom branding. Corporate bulk delivery available PAN India.",
    HSNCode: "42023200",
    type: "Duffle Bag",
    quantity: 450,
    GSTRate: 18,
    brand: "GearPro",
    fabricType: "Leatherette",
    size: ["Large"],
    colour: ["Brown"],
    weight: 920,
    dimensions: { length: 54, width: 30, height: 28 },
    minOrderQty: 5,
    maxOrderQty: 250,
    availabilityDate: new Date(),
    price: {
      priceCode: "DB-PREMIUM-PRICE",
      singlePrice: 999,
      sales_0_50: 949,
      sales_50_100: 899,
      sales_100_above: 849,
      discountPrice: 949,
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
    image: "/assets/products/dufflebags/7.webp",
    subImages: [
      "/assets/products/dufflebags/7.webp",
      "/assets/products/dufflebags/8.webp",
      "/assets/products/dufflebags/9.webp"
    ],
    tags: [
      "premium duffle bag",
      "leatherette duffle bag",
      "executive gifting bag",
      "CXO corporate gifts",
      "luxury duffle bags",
      "corporate branding india"
    ],
    keywords: [
      "premium corporate duffle bag",
      "leatherette travel bag",
      "executive gifting bags",
      "corporate promotional bags",
      "Delhi NCR India"
    ],
    isFeatured: true,
    isPublished: true,
    isDeleted: false,
    ratings: { average: 4.9, count: 78 },
    metaTitle:
      "Premium Leatherette Duffle Bag | Executive Corporate Gifting India",
    metaDescription:
      "Luxury leatherette duffle bags perfect for executive gifting, brand promotions & conferences. Custom logo printing available. Bulk supply PAN India.",
    audit: { createdBy: "admin", updatedBy: "admin" }
  },

  // -------------------------------------------------------------
  // PRODUCT 4 — Images 10–13 (4 subImages)
  // -------------------------------------------------------------
  {
    productCode: "DB-WEEKENDER-004",
    SKU: "DUFFLE-BAG-WEEKENDER",
    name: "Weekender Travel Duffle Bag",
    slug: "weekender-travel-duffle-bag",
    description:
      "High-capacity weekender travel duffle bag ideal for premium corporate gifting, employee travel kits, milestone gifts, and brand promotional campaigns. Durable, stylish, and available with custom logo printing for bulk corporate orders across India.",
    HSNCode: "42029200",
    type: "Duffle Bag",
    quantity: 400,
    GSTRate: 18,
    brand: "GearPro",
    fabricType: "Canvas + Leatherette",
    size: ["XL"],
    colour: ["Black"],
    weight: 1100,
    dimensions: { length: 58, width: 32, height: 28 },
    minOrderQty: 5,
    maxOrderQty: 200,
    availabilityDate: new Date(),
    price: {
      priceCode: "DB-WEEKENDER-PRICE",
      singlePrice: 1299,
      sales_0_50: 1249,
      sales_50_100: 1199,
      sales_100_above: 1149,
      discountPrice: 1249,
      discount: {
        type: "percentage",
        value: 4,
        validUntil: new Date("2025-12-31")
      },
      currency: "INR",
      taxIncluded: true,
      effectiveFrom: new Date(),
      effectiveTo: new Date("2025-12-31")
    },
    image: "/assets/products/dufflebags/10.webp",
    subImages: [
      "/assets/products/dufflebags/10.webp",
      "/assets/products/dufflebags/11.webp",
      "/assets/products/dufflebags/12.webp",
      "/assets/products/dufflebags/13.webp"
    ],
    tags: [
      "weekender duffle bag",
      "premium travel duffle",
      "executive corporate gift",
      "custom branded travel bag",
      "luxury gifting india",
      "corporate travel kits"
    ],
    keywords: [
      "weekender duffle bag",
      "premium corporate gifting",
      "custom printed travel bags",
      "luxury duffle bags india",
      "Delhi NCR Noida Gurgaon"
    ],
    isFeatured: true,
    isPublished: true,
    isDeleted: false,
    ratings: { average: 5.0, count: 65 },
    metaTitle:
      "Weekender Travel Duffle Bag | Custom Premium Corporate Gifting India",
    metaDescription:
      "Premium weekender travel duffle bag with custom branding. Best for executive corporate gifting & employee travel kits. Bulk delivery India-wide.",
    audit: { createdBy: "admin", updatedBy: "admin" }
  }
];

module.exports = duffleBags;
