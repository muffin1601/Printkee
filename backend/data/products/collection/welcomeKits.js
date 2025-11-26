const welcomeKits = [
  // -------------------------------------------------------------
  // PRODUCT 1 — Images 1–4 (4 Subimages)
  // -------------------------------------------------------------
  {
    productCode: "WK-PREMIUM-001",
    SKU: "WELCOME-KIT-PREMIUM",
    name: "Premium Corporate Welcome Kit",
    slug: "premium-corporate-welcome-kit",
    description:
      "Premium corporate welcome kit designed for new employee onboarding, HR corporate gifting, and brand identity enhancement. Includes notebook, metal pen, sipper bottle, ID card set, and premium box packaging. Bulk custom branding available across Delhi NCR, Noida, Gurgaon, Okhla, Faridabad, and PAN India.",
    HSNCode: "48201000",
    type: "Welcome Kit",
    quantity: 400,
    GSTRate: 18,
    brand: "CorporateElite",
    fabricType: "Mixed Materials",
    size: ["Standard Kit"],
    colour: ["Black"],
    weight: 1200,
    dimensions: { length: 30, width: 25, height: 10 },
    minOrderQty: 10,
    maxOrderQty: 200,
    availabilityDate: new Date(),
    price: {
      priceCode: "WK-PREMIUM-001-PRICE",
      singlePrice: 1499,
      sales_0_50: 1399,
      sales_50_100: 1299,
      sales_100_above: 1199,
      discountPrice: 1399,
      discount: { type: "percentage", value: 8, validUntil: new Date("2025-12-31") },
      currency: "INR",
      taxIncluded: true,
      effectiveFrom: new Date(),
      effectiveTo: new Date("2025-12-31"),
    },
    image: "/assets/products/welcomekits/1.webp",
    subImages: [
      "/assets/products/welcomekits/1.webp",
      "/assets/products/welcomekits/2.webp",
      "/assets/products/welcomekits/3.webp",
      "/assets/products/welcomekits/4.webp"
    ],
    tags: [
      "employee welcome kit",
      "corporate onboarding kit",
      "HR joining kit",
      "custom branded welcome box",
      "corporate gifting India"
    ],
    keywords: [
      "premium welcome kit",
      "employee onboarding package",
      "corporate HR kit",
      "Delhi NCR welcome kit"
    ],
    isFeatured: true,
    isPublished: true,
    isDeleted: false,
    ratings: { average: 4.8, count: 140 },
    metaTitle: "Premium Corporate Welcome Kit | Employee Onboarding Kits India",
    metaDescription:
      "Premium corporate welcome kit with branding options. Includes notebook, bottle, pen & more. Bulk supply in Delhi NCR, Noida, Gurgaon & India.",
    audit: { createdBy: "admin", updatedBy: "admin" }
  },

  // -------------------------------------------------------------
  // PRODUCT 2 — Images 5–7 (3 Subimages)
  // -------------------------------------------------------------
  {
    productCode: "WK-ESSENTIAL-002",
    SKU: "WELCOME-KIT-ESSENTIAL",
    name: "Essential Employee Welcome Kit",
    slug: "essential-employee-welcome-kit",
    description:
      "Essential new employee welcome kit perfect for HR onboarding, training sessions, and company induction programs. Includes notebook, pen, ID card, and eco-friendly packaging. Bulk logo printing available across Delhi NCR and India.",
    HSNCode: "48201000",
    type: "Welcome Kit",
    quantity: 500,
    GSTRate: 18,
    brand: "CorporateElite",
    fabricType: "Mixed Materials",
    size: ["Standard Kit"],
    colour: ["Blue"],
    weight: 900,
    dimensions: { length: 28, width: 22, height: 8 },
    minOrderQty: 20,
    maxOrderQty: 300,
    availabilityDate: new Date(),
    price: {
      priceCode: "WK-ESSENTIAL-002-PRICE",
      singlePrice: 899,
      sales_0_50: 849,
      sales_50_100: 799,
      sales_100_above: 749,
      discountPrice: 849,
      discount: { type: "percentage", value: 7, validUntil: new Date("2025-12-31") },
      currency: "INR",
      taxIncluded: true,
      effectiveFrom: new Date(),
      effectiveTo: new Date("2025-12-31")
    },
    image: "/assets/products/welcomekits/5.webp",
    subImages: [
      "/assets/products/welcomekits/5.webp",
      "/assets/products/welcomekits/6.webp",
      "/assets/products/welcomekits/7.webp"
    ],
    tags: [
      "essential welcome kit",
      "employee joining kit",
      "business onboarding pack",
      "custom printed kit",
      "corporate HR supplies"
    ],
    keywords: [
      "employee welcome set",
      "corporate onboarding",
      "custom HR kits India"
    ],
    isFeatured: true,
    isPublished: true,
    isDeleted: false,
    ratings: { average: 4.7, count: 115 },
    metaTitle: "Essential Employee Welcome Kit | Custom HR Kits India",
    metaDescription:
      "Essential employee welcome kit with notebook, pen & branding options. Ideal for onboarding. Bulk supply across India.",
    audit: { createdBy: "admin", updatedBy: "admin" }
  },

  // -------------------------------------------------------------
  // PRODUCT 3 — Images 8–9 (2 Subimages)
  // -------------------------------------------------------------
  {
    productCode: "WK-BASIC-003",
    SKU: "WELCOME-KIT-BASIC",
    name: "Basic Corporate Welcome Kit",
    slug: "basic-corporate-welcome-kit",
    description:
      "Budget-friendly corporate welcome kit ideal for startups, training batches, interns, and mass onboarding requirements. Includes notebook and pen with company branding. PAN India delivery including Delhi NCR, Noida, Gurgaon, Faridabad & Okhla.",
    HSNCode: "48201000",
    type: "Welcome Kit",
    quantity: 700,
    GSTRate: 18,
    brand: "CorporateElite",
    fabricType: "Mixed Materials",
    size: ["Basic Kit"],
    colour: ["Brown"],
    weight: 500,
    dimensions: { length: 25, width: 20, height: 5 },
    minOrderQty: 50,
    maxOrderQty: 400,
    availabilityDate: new Date(),
    price: {
      priceCode: "WK-BASIC-003-PRICE",
      singlePrice: 399,
      sales_0_50: 369,
      sales_50_100: 349,
      sales_100_above: 329,
      discountPrice: 369,
      discount: { type: "percentage", value: 8, validUntil: new Date("2025-12-31") },
      currency: "INR",
      taxIncluded: true,
      effectiveFrom: new Date(),
      effectiveTo: new Date("2025-12-31"),
    },
    image: "/assets/products/welcomekits/8.webp",
    subImages: [
      "/assets/products/welcomekits/8.webp",
      "/assets/products/welcomekits/9.webp"
    ],
    tags: [
      "basic welcome kit",
      "startup joining kit",
      "intern onboarding kit",
      "budget employee kit",
      "custom printed kit"
    ],
    keywords: [
      "budget welcome kit",
      "startup onboarding kit",
      "cheap welcome kits India"
    ],
    isFeatured: false,
    isPublished: true,
    isDeleted: false,
    ratings: { average: 4.4, count: 85 },
    metaTitle: "Basic Corporate Welcome Kit | Affordable HR Kits India",
    metaDescription:
      "Affordable employee welcome kit perfect for mass onboarding, interns & training batches. PAN India delivery.",
    audit: { createdBy: "admin", updatedBy: "admin" }
  },

  // -------------------------------------------------------------
  // PRODUCT 4 — Images 10–12 (3 Subimages)
  // -------------------------------------------------------------
  {
    productCode: "WK-EXECUTIVE-004",
    SKU: "WELCOME-KIT-EXECUTIVE",
    name: "Executive Employee Welcome Kit",
    slug: "executive-employee-welcome-kit",
    description:
      "Executive level welcome kit designed for senior hires, clients, leadership teams, and premium employee onboarding. Includes executive diary, metal pen, keychain, and custom packaging. Branding available for bulk orders across India.",
    HSNCode: "48201000",
    type: "Welcome Kit",
    quantity: 300,
    GSTRate: 18,
    brand: "CorporateElite",
    fabricType: "Premium Materials",
    size: ["Executive Kit"],
    colour: ["Black"],
    weight: 1100,
    dimensions: { length: 32, width: 24, height: 10 },
    minOrderQty: 5,
    maxOrderQty: 150,
    availabilityDate: new Date(),
    price: {
      priceCode: "WK-EXECUTIVE-004-PRICE",
      singlePrice: 1699,
      sales_0_50: 1599,
      sales_50_100: 1499,
      sales_100_above: 1399,
      discountPrice: 1599,
      discount: { type: "percentage", value: 6, validUntil: new Date("2025-12-31") },
      currency: "INR",
      taxIncluded: true,
      effectiveFrom: new Date(),
      effectiveTo: new Date("2025-12-31")
    },
    image: "/assets/products/welcomekits/10.webp",
    subImages: [
      "/assets/products/welcomekits/10.webp",
      "/assets/products/welcomekits/11.webp",
      "/assets/products/welcomekits/12.webp"
    ],
    tags: [
      "executive welcome kit",
      "premium client kit",
      "luxury employee onboarding",
      "custom executive gift set"
    ],
    keywords: [
      "executive corporate kit",
      "high-end welcome kit",
      "premium onboarding India"
    ],
    isFeatured: true,
    isPublished: true,
    isDeleted: false,
    ratings: { average: 4.9, count: 70 },
    metaTitle: "Executive Employee Welcome Kit | Premium Corporate Gifts India",
    metaDescription:
      "Premium executive welcome kit for senior hires & clients. Custom branding and packaging available PAN India.",
    audit: { createdBy: "admin", updatedBy: "admin" }
  },

  // -------------------------------------------------------------
  // PRODUCT 5 — Images 13–14 (2 Subimages)
  // -------------------------------------------------------------
  {
    productCode: "WK-ECO-005",
    SKU: "WELCOME-KIT-ECO",
    name: "Eco-Friendly Welcome Kit",
    slug: "eco-friendly-welcome-kit",
    description:
      "Environment-friendly welcome kit made using sustainable materials. Includes bamboo notebook, eco pen, recycled box packaging—ideal for green companies, CSR events, and corporate gifting. Custom logo printing available across India.",
    HSNCode: "48201000",
    type: "Welcome Kit",
    quantity: 450,
    GSTRate: 18,
    brand: "CorporateElite",
    fabricType: "Eco-Friendly Materials",
    size: ["Eco Kit"],
    colour: ["Brown"],
    weight: 700,
    dimensions: { length: 27, width: 20, height: 8 },
    minOrderQty: 10,
    maxOrderQty: 300,
    availabilityDate: new Date(),
    price: {
      priceCode: "WK-ECO-005-PRICE",
      singlePrice: 549,
      sales_0_50: 529,
      sales_50_100: 509,
      sales_100_above: 489,
      discountPrice: 529,
      discount: { type: "percentage", value: 5, validUntil: new Date("2025-12-31") },
      currency: "INR",
      taxIncluded: true,
      effectiveFrom: new Date(),
      effectiveTo: new Date("2025-12-31")
    },
    image: "/assets/products/welcomekits/13.webp",
    subImages: [
      "/assets/products/welcomekits/13.webp",
      "/assets/products/welcomekits/14.webp"
    ],
    tags: [
      "eco-friendly welcome kit",
      "sustainable corporate kit",
      "eco employee onboarding",
      "bamboo notebook kit",
      "CSR gift set"
    ],
    keywords: [
      "eco-friendly corporate kit",
      "sustainable gifting India",
      "green welcome kit"
    ],
    isFeatured: false,
    isPublished: true,
    isDeleted: false,
    ratings: { average: 4.6, count: 92 },
    metaTitle: "Eco-Friendly Corporate Welcome Kit | Sustainable Onboarding Kits",
    metaDescription:
      "Eco-friendly employee welcome kit with bamboo & recycled materials. Custom branding available. Delivered PAN India.",
    audit: { createdBy: "admin", updatedBy: "admin" }
  }
];

module.exports = welcomeKits;
