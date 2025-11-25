const notebooksAndDiaries = [
  // -------------------------------------------------------------
  // PRODUCT 1 (Images 1–3)
  // -------------------------------------------------------------
  {
    productCode: "NB-A5-PREMIUM-001",
    SKU: "A5-PREMIUM-NOTEBOOK",
    name: "A5 Premium Hardcover Notebook",
    slug: "a5-premium-hardcover-notebook",
    description:
      "A5 premium hardcover notebook with smooth ruled pages, ideal for corporate offices, employee kits, events, conferences, and branded promotional gifting. Custom logo printing and embossing available for bulk orders across Delhi NCR, Noida, Gurgaon, Okhla, Faridabad, and all India.",
    HSNCode: "48201000",
    type: "Notebook & Diary",
    quantity: 1200,
    GSTRate: 18,
    brand: "WriteMaster",
    fabricType: "Hardcover PU",
    size: ["A5"],
    colour: ["Black"],
    weight: 320,
    dimensions: { length: 21, width: 14, height: 2 },
    minOrderQty: 20,
    maxOrderQty: 1000,
    availabilityDate: new Date(),
    price: {
      priceCode: "NB-A5-PREMIUM-PRICE",
      singlePrice: 199,
      sales_0_50: 179,
      sales_50_100: 169,
      sales_100_above: 159,
      discountPrice: 179,
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
    image: "/assets/products/notebooks/1.webp",
    subImages: [
      "/assets/products/notebooks/1.webp",
      "/assets/products/notebooks/2.webp",
      "/assets/products/notebooks/3.webp"
    ],
    tags: [
      "premium notebook",
      "A5 hardcover notebook",
      "corporate notebook",
      "custom printed notebook",
      "employee welcome kit item",
      "notebook supplier Delhi NCR"
    ],
    keywords: [
      "a5 notebook",
      "corporate notebook",
      "custom logo notebook",
      "notebook supplier India",
      "Delhi Noida Gurgaon"
    ],
    isFeatured: true,
    isPublished: true,
    isDeleted: false,
    ratings: { average: 4.7, count: 155 },
    metaTitle:
      "A5 Premium Hardcover Notebook | Custom Printed Corporate Notebooks India",
    metaDescription:
      "Premium A5 hardcover notebooks with custom logo printing & embossing. Ideal for corporate gifting & employee kits. Bulk supply in Delhi NCR, Noida, Gurgaon & India.",
    audit: { createdBy: "admin", updatedBy: "admin" }
  },

  // -------------------------------------------------------------
  // PRODUCT 2 (Images 4–6)
  // -------------------------------------------------------------
  {
    productCode: "NB-SPIRAL-002",
    SKU: "SPIRAL-NOTEBOOK",
    name: "A5 Spiral Bound Notebook",
    slug: "a5-spiral-bound-notebook",
    description:
      "A5 spiral bound notebook with high-quality ruled sheets, perfect for training programs, office use, seminars, workshops, and corporate branding. Custom print options available for bulk corporate orders across Delhi NCR and India.",
    HSNCode: "48201000",
    type: "Notebook & Diary",
    quantity: 1500,
    GSTRate: 18,
    brand: "WriteMaster",
    fabricType: "Cardboard Cover",
    size: ["A5"],
    colour: ["Blue"],
    weight: 280,
    dimensions: { length: 21, width: 14, height: 1.5 },
    minOrderQty: 25,
    maxOrderQty: 1500,
    availabilityDate: new Date(),
    price: {
      priceCode: "NB-SPIRAL-PRICE",
      singlePrice: 149,
      sales_0_50: 139,
      sales_50_100: 129,
      sales_100_above: 119,
      discountPrice: 139,
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
    image: "/assets/products/notebooks/4.webp",
    subImages: [
      "/assets/products/notebooks/4.webp",
      "/assets/products/notebooks/5.webp",
      "/assets/products/notebooks/6.webp"
    ],
    tags: [
      "spiral notebook",
      "corporate training notebook",
      "custom printed spiral pad",
      "office stationery India",
      "bulk notebooks Delhi NCR"
    ],
    keywords: [
      "spiral notebook india",
      "custom printed notebook",
      "corporate notebooks",
      "training workshop stationery",
      "Delhi NCR Noida Gurgaon"
    ],
    isFeatured: true,
    isPublished: true,
    isDeleted: false,
    ratings: { average: 4.6, count: 140 },
    metaTitle:
      "A5 Spiral Bound Notebook | Custom Printed Corporate Training Notebooks",
    metaDescription:
      "High-quality spiral bound notebooks for corporate training, events, and branding. Bulk printing for Delhi NCR, Noida, Gurgaon & all India.",
    audit: { createdBy: "admin", updatedBy: "admin" }
  },

  // -------------------------------------------------------------
  // PRODUCT 3 (Images 7–9)
  // -------------------------------------------------------------
  {
    productCode: "NB-DIARY-003",
    SKU: "EXECUTIVE-DIARY",
    name: "Executive A5 PU Leather Diary",
    slug: "executive-a5-pu-leather-diary",
    description:
      "Luxury executive A5 PU leather diary with ruled pages, bookmark ribbon, and elegant finish. Perfect for corporate gifting, CEO kits, conferences, and brand promotions with custom embossing & printing.",
    HSNCode: "48201000",
    type: "Notebook & Diary",
    quantity: 900,
    GSTRate: 18,
    brand: "WriteMaster",
    fabricType: "PU Leather",
    size: ["A5"],
    colour: ["Brown"],
    weight: 450,
    dimensions: { length: 22, width: 15, height: 2 },
    minOrderQty: 10,
    maxOrderQty: 500,
    availabilityDate: new Date(),
    price: {
      priceCode: "NB-DIARY-PRICE",
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
    image: "/assets/products/notebooks/7.webp",
    subImages: [
      "/assets/products/notebooks/7.webp",
      "/assets/products/notebooks/8.webp",
      "/assets/products/notebooks/9.webp"
    ],
    tags: [
      "executive diary",
      "PU leather diary",
      "corporate gifting diary",
      "custom embossed diary",
      "luxury corporate gifts India"
    ],
    keywords: [
      "executive diary",
      "pu leather diary",
      "custom diary printing",
      "corporate gifting diary",
      "Delhi NCR India"
    ],
    isFeatured: true,
    isPublished: true,
    isDeleted: false,
    ratings: { average: 4.9, count: 95 },
    metaTitle:
      "Executive PU Leather Diary | Premium Corporate Diaries India",
    metaDescription:
      "Premium A5 executive PU leather diaries with embossing for corporate gifting. Bulk custom branding for Delhi NCR, Noida, Gurgaon & India.",
    audit: { createdBy: "admin", updatedBy: "admin" }
  },

  // -------------------------------------------------------------
  // PRODUCT 4 (Images 10–12)
  // -------------------------------------------------------------
  {
    productCode: "NB-HARD-004",
    SKU: "HARDCOVER-NOTEBOOK",
    name: "A5 Hardbound Ruled Notebook",
    slug: "a5-hardbound-ruled-notebook",
    description:
      "Classic A5 hardbound ruled notebook suitable for office use, seminars, conferences, employee onboarding kits, and customized corporate gifting. Custom printing & branding available.",
    HSNCode: "48201000",
    type: "Notebook & Diary",
    quantity: 1800,
    GSTRate: 18,
    brand: "WriteMaster",
    fabricType: "Hardbound Cover",
    size: ["A5"],
    colour: ["Grey"],
    weight: 320,
    dimensions: { length: 21, width: 14, height: 2 },
    minOrderQty: 20,
    maxOrderQty: 1500,
    availabilityDate: new Date(),
    price: {
      priceCode: "NB-HARD-PRICE",
      singlePrice: 179,
      sales_0_50: 169,
      sales_50_100: 159,
      sales_100_above: 149,
      discountPrice: 169,
      discount: {
        type: "percentage",
        value: 7,
        validUntil: new Date("2025-12-31")
      },
      currency: "INR",
      taxIncluded: true,
      effectiveFrom: new Date(),
      effectiveTo: new Date("2025-12-31")
    },
    image: "/assets/products/notebooks/10.webp",
    subImages: [
      "/assets/products/notebooks/10.webp",
      "/assets/products/notebooks/11.webp",
      "/assets/products/notebooks/12.webp"
    ],
    tags: [
      "hardbound notebook",
      "corporate notebook india",
      "custom printed hardbound pad",
      "office notebook supplier",
      "Delhi NCR notebooks"
    ],
    keywords: [
      "hardcover notebook",
      "corporate stationery",
      "branding notebook",
      "office pad supplier",
      "Noida Gurgaon Delhi"
    ],
    isFeatured: false,
    isPublished: true,
    isDeleted: false,
    ratings: { average: 4.5, count: 130 },
    metaTitle:
      "A5 Hardbound Ruled Notebook | Custom Printed Notebooks for Corporates",
    metaDescription:
      "Premium hardbound notebooks ideal for offices & onboarding kits. Custom branding, bulk supply in Delhi NCR, Noida & India.",
    audit: { createdBy: "admin", updatedBy: "admin" }
  },

  // -------------------------------------------------------------
  // PRODUCT 5 (Images 13–15)
  // -------------------------------------------------------------
  {
    productCode: "NB-CORK-005",
    SKU: "CORK-NOTEBOOK",
    name: "Eco-Friendly Cork Cover Notebook",
    slug: "eco-friendly-cork-notebook",
    description:
      "Sustainable cork-cover notebook with premium ruled pages, ideal for eco-friendly corporate gifting, events, employee welcome kits, and green branding campaigns.",
    HSNCode: "48201000",
    type: "Notebook & Diary",
    quantity: 1000,
    GSTRate: 18,
    brand: "WriteMaster",
    fabricType: "Cork Cover",
    size: ["A5"],
    colour: ["Brown"],
    weight: 300,
    dimensions: { length: 21, width: 14, height: 2 },
    minOrderQty: 20,
    maxOrderQty: 600,
    availabilityDate: new Date(),
    price: {
      priceCode: "NB-CORK-PRICE",
      singlePrice: 249,
      sales_0_50: 239,
      sales_50_100: 229,
      sales_100_above: 219,
      discountPrice: 239,
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
    image: "/assets/products/notebooks/13.webp",
    subImages: [
      "/assets/products/notebooks/13.webp",
      "/assets/products/notebooks/14.webp",
      "/assets/products/notebooks/15.webp"
    ],
    tags: [
      "eco-friendly notebook",
      "cork notebook",
      "sustainable corporate gifts",
      "custom eco branding",
      "notebook supplier India"
    ],
    keywords: [
      "eco notebook",
      "cork cover diary",
      "green corporate gifting",
      "custom printed eco notebook",
      "Delhi NCR India"
    ],
    isFeatured: true,
    isPublished: true,
    isDeleted: false,
    ratings: { average: 4.8, count: 112 },
    metaTitle:
      "Eco-Friendly Cork Notebook | Sustainable Corporate Gifting India",
    metaDescription:
      "Eco-friendly cork-cover notebooks with custom printing for green branding. Bulk supply for Delhi NCR, Noida, Gurgaon & pan India.",
    audit: { createdBy: "admin", updatedBy: "admin" }
  },

  // -------------------------------------------------------------
  // PRODUCT 6 (Images 16–18)
  // -------------------------------------------------------------
  {
    productCode: "NB-COMBO-006",
    SKU: "NOTEBOOK-DIARY-SET",
    name: "Premium Notebook & Diary Gift Set",
    slug: "premium-notebook-diary-gift-set",
    description:
      "Elegant notebook and diary combo set designed for premium corporate gifting, events, conferences, employee welcome kits, and brand promotions. Available with custom logo printing & embossing.",
    HSNCode: "48201000",
    type: "Notebook & Diary",
    quantity: 800,
    GSTRate: 18,
    brand: "WriteMaster",
    fabricType: "PU Leather & Cardboard",
    size: ["A5"],
    colour: ["Black & Gold"],
    weight: 600,
    dimensions: { length: 24, width: 18, height: 3 },
    minOrderQty: 10,
    maxOrderQty: 400,
    availabilityDate: new Date(),
    price: {
      priceCode: "NB-COMBO-PRICE",
      singlePrice: 599,
      sales_0_50: 569,
      sales_50_100: 549,
      sales_100_above: 529,
      discountPrice: 569,
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
    image: "/assets/products/notebooks/16.webp",
    subImages: [
      "/assets/products/notebooks/16.webp",
      "/assets/products/notebooks/17.webp",
      "/assets/products/notebooks/18.webp"
    ],
    tags: [
      "notebook diary set",
      "corporate gift set",
      "premium branded stationery",
      "custom printed diary set",
      "employee welcome kit India"
    ],
    keywords: [
      "corporate gift notebook set",
      "diary gift box",
      "branded stationery india",
      "custom printed diary",
      "Delhi NCR Noida Gurgaon"
    ],
    isFeatured: true,
    isPublished: true,
    isDeleted: false,
    ratings: { average: 4.8, count: 125 },
    metaTitle:
      "Premium Notebook & Diary Gift Set | Custom Corporate Gifting India",
    metaDescription:
      "Premium notebook & diary combo sets with custom printing ideal for corporate gifting & welcome kits. Bulk supply available in Delhi NCR, Gurgaon, Noida & pan India.",
    audit: { createdBy: "admin", updatedBy: "admin" }
  }
];

module.exports = notebooksAndDiaries;
