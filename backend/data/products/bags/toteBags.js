const toteBags = [
  // -------------------------------------------------------------
  // PRODUCT 1 — Images 1–4 (4 subimages)
  // -------------------------------------------------------------
  {
    productCode: "TB-COTTON-001",
    SKU: "TOTE-COTTON-PREMIUM",
    name: "Premium Cotton Tote Bag",
    slug: "premium-cotton-tote-bag",
    description:
      "Premium cotton tote bag designed for corporate gifting, events, exhibitions, brand promotions, and eco-friendly campaigns. Perfect for custom logo printing and employee welcome kits. Bulk supply across Delhi NCR, Noida, Gurgaon, Okhla, Faridabad & India.",
    HSNCode: "42029200",
    type: "Tote Bag",
    quantity: 900,
    GSTRate: 18,
    brand: "EcoCarry",
    fabricType: "100% Cotton",
    size: ["Medium"],
    colour: ["Natural White"],
    weight: 220,
    dimensions: { length: 40, width: 36, height: 2 },
    minOrderQty: 20,
    maxOrderQty: 800,
    availabilityDate: new Date(),
    price: {
      priceCode: "TB-COTTON-PRICE",
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
    image: "/assets/products/totebags/1.webp",
    subImages: [
      "/assets/products/totebags/1.webp",
      "/assets/products/totebags/2.webp",
      "/assets/products/totebags/3.webp",
      "/assets/products/totebags/4.webp"
    ],
    tags: [
      "cotton tote bag",
      "eco friendly tote",
      "custom printed tote bag",
      "corporate gifting tote",
      "event promotion bags",
      "Delhi NCR tote supplier"
    ],
    keywords: [
      "corporate cotton tote bag",
      "custom printing tote",
      "eco friendly promotional bags",
      "branding tote bag india",
      "Noida Gurgaon Faridabad"
    ],
    isFeatured: true,
    isPublished: true,
    isDeleted: false,
    ratings: { average: 4.6, count: 140 },
    metaTitle: "Premium Cotton Tote Bag | Custom Printed Corporate Tote Bags India",
    metaDescription:
      "Eco-friendly cotton tote bags with custom branding for corporate gifting & events. Bulk orders delivered across Delhi NCR & PAN India.",
    audit: { createdBy: "admin", updatedBy: "admin" }
  },

  // -------------------------------------------------------------
  // PRODUCT 2 — Images 5–8 (4 subimages)
  // -------------------------------------------------------------
  {
    productCode: "TB-JUTE-002",
    SKU: "TOTE-JUTE-NATURAL",
    name: "Natural Jute Tote Bag",
    slug: "natural-jute-tote-bag",
    description:
      "Stylish natural jute tote bag ideal for eco-friendly corporate gifting, CSR initiatives, conferences, and promotional events. Large branding area perfect for custom printing. Bulk supply across Noida, Gurgaon, Delhi NCR & India.",
    HSNCode: "42029200",
    type: "Tote Bag",
    quantity: 700,
    GSTRate: 18,
    brand: "EcoCarry",
    fabricType: "Jute",
    size: ["Large"],
    colour: ["Brown"],
    weight: 320,
    dimensions: { length: 42, width: 35, height: 2 },
    minOrderQty: 20,
    maxOrderQty: 600,
    availabilityDate: new Date(),
    price: {
      priceCode: "TB-JUTE-PRICE",
      singlePrice: 149,
      sales_0_50: 139,
      sales_50_100: 129,
      sales_100_above: 119,
      discountPrice: 139,
      discount: { type: "percentage", value: 7, validUntil: new Date("2025-12-31") },
      currency: "INR",
      taxIncluded: true,
      effectiveFrom: new Date(),
      effectiveTo: new Date("2025-12-31")
    },
    image: "/assets/products/totebags/5.webp",
    subImages: [
      "/assets/products/totebags/5.webp",
      "/assets/products/totebags/6.webp",
      "/assets/products/totebags/7.webp",
      "/assets/products/totebags/8.webp"
    ],
    tags: [
      "jute tote bag",
      "eco friendly gifting",
      "custom printed jute bag",
      "corporate csr gifts",
      "promotional event bags",
      "India corporate gifts"
    ],
    keywords: [
      "jute tote bag india",
      "eco friendly promotional bags",
      "corporate gifting jute bag",
      "custom branding india",
      "Delhi NCR Noida Gurgaon"
    ],
    isFeatured: true,
    isPublished: true,
    isDeleted: false,
    ratings: { average: 4.7, count: 110 },
    metaTitle:
      "Natural Jute Tote Bag | Eco-Friendly Corporate Gifting Bags with Custom Branding",
    metaDescription:
      "Eco-friendly natural jute tote bags perfect for corporate gifting & CSR branding. Bulk supply across Delhi NCR & PAN India.",
    audit: { createdBy: "admin", updatedBy: "admin" }
  },

  // -------------------------------------------------------------
  // PRODUCT 3 — Images 9–12 (4 subimages)
  // -------------------------------------------------------------
  {
    productCode: "TB-CANVAS-003",
    SKU: "TOTE-CANVAS-PREMIUM",
    name: "Premium Canvas Tote Bag",
    slug: "premium-canvas-tote-bag",
    description:
      "High-quality premium canvas tote bag designed for events, conferences, premium gifting, and brand promotions. Strong handle, durable stitching & large print area. Custom printing for corporate bulk orders across India.",
    HSNCode: "42029200",
    type: "Tote Bag",
    quantity: 500,
    GSTRate: 18,
    brand: "EcoCarry",
    fabricType: "Canvas",
    size: ["Large"],
    colour: ["Black"],
    weight: 400,
    dimensions: { length: 45, width: 38, height: 2 },
    minOrderQty: 10,
    maxOrderQty: 400,
    availabilityDate: new Date(),
    price: {
      priceCode: "TB-CANVAS-PRICE",
      singlePrice: 199,
      sales_0_50: 189,
      sales_50_100: 179,
      sales_100_above: 169,
      discountPrice: 189,
      discount: { type: "percentage", value: 5, validUntil: new Date("2025-12-31") },
      currency: "INR",
      taxIncluded: true,
      effectiveFrom: new Date(),
      effectiveTo: new Date("2025-12-31")
    },
    image: "/assets/products/totebags/9.webp",
    subImages: [
      "/assets/products/totebags/9.webp",
      "/assets/products/totebags/10.webp",
      "/assets/products/totebags/11.webp",
      "/assets/products/totebags/12.webp"
    ],
    tags: [
      "canvas tote bag",
      "premium tote bag",
      "corporate gifting bag",
      "custom printed canvas tote",
      "event gift bags india",
      "branding bags supplier"
    ],
    keywords: [
      "canvas tote bag india",
      "premium branding bag",
      "custom printed tote",
      "corporate conference bags",
      "Delhi NCR Noida India"
    ],
    isFeatured: true,
    isPublished: true,
    isDeleted: false,
    ratings: { average: 4.8, count: 88 },
    metaTitle:
      "Premium Canvas Tote Bag | Custom Printed Corporate Event Bags India",
    metaDescription:
      "Premium canvas tote bags with custom branding for corporate events & gifting. Bulk supply across India.",
    audit: { createdBy: "admin", updatedBy: "admin" }
  },

  // -------------------------------------------------------------
  // PRODUCT 4 — Images 13–15 (3 subimages)
  // -------------------------------------------------------------
  {
    productCode: "TB-FOLD-004",
    SKU: "TOTE-FOLDABLE",
    name: "Foldable Tote Bag",
    slug: "foldable-tote-bag",
    description:
      "Lightweight foldable tote bag ideal for events, marketing campaigns, and promotional activities. Folds into a compact pouch with custom branding. Bulk orders accepted across Delhi NCR & India.",
    HSNCode: "42029200",
    type: "Tote Bag",
    quantity: 800,
    GSTRate: 18,
    brand: "EcoCarry",
    fabricType: "Polyester",
    size: ["Standard"],
    colour: ["Blue"],
    weight: 180,
    dimensions: { length: 40, width: 36, height: 1 },
    minOrderQty: 20,
    maxOrderQty: 700,
    availabilityDate: new Date(),
    price: {
      priceCode: "TB-FOLD-PRICE",
      singlePrice: 99,
      sales_0_50: 89,
      sales_50_100: 84,
      sales_100_above: 79,
      discountPrice: 89,
      discount: { type: "percentage", value: 10, validUntil: new Date("2025-12-31") },
      currency: "INR",
      taxIncluded: true,
      effectiveFrom: new Date(),
      effectiveTo: new Date("2025-12-31")
    },
    image: "/assets/products/totebags/13.webp",
    subImages: [
      "/assets/products/totebags/13.webp",
      "/assets/products/totebags/14.webp",
      "/assets/products/totebags/15.webp"
    ],
    tags: [
      "foldable tote bag",
      "compact tote bag",
      "event promotion bags",
      "corporate gifting india",
      "custom printed fold tote"
    ],
    keywords: [
      "foldable tote india",
      "event promotional tote",
      "custom printed bag",
      "bulk tote supplier india"
    ],
    isFeatured: false,
    isPublished: true,
    isDeleted: false,
    ratings: { average: 4.3, count: 95 },
    metaTitle: "Foldable Tote Bag | Custom Printed Event Bags India",
    metaDescription:
      "Foldable tote bags with custom branding. Ideal for promotions, events & corporate gifting. Delivered PAN India.",
    audit: { createdBy: "admin", updatedBy: "admin" }
  },

  // -------------------------------------------------------------
  // PRODUCT 5 — Images 16–18 (3 subimages)
  // -------------------------------------------------------------
  {
    productCode: "TB-JUTEPRINT-005",
    SKU: "TOTE-JUTE-PRINTED",
    name: "Printed Jute Tote Bag",
    slug: "printed-jute-tote-bag",
    description:
      "Stylish printed jute tote bag ideal for brand promotions, CSR gifting, exhibitions, and corporate events. Eco-friendly with strong handles & custom logo printing. Bulk corporate supply available across India.",
    HSNCode: "42029200",
    type: "Tote Bag",
    quantity: 600,
    GSTRate: 18,
    brand: "EcoCarry",
    fabricType: "Jute",
    size: ["Large"],
    colour: ["Brown"],
    weight: 350,
    dimensions: { length: 44, width: 37, height: 2 },
    minOrderQty: 20,
    maxOrderQty: 550,
    availabilityDate: new Date(),
    price: {
      priceCode: "TB-JUTEPRINT-PRICE",
      singlePrice: 169,
      sales_0_50: 159,
      sales_50_100: 149,
      sales_100_above: 139,
      discountPrice: 159,
      discount: { type: "percentage", value: 6, validUntil: new Date("2025-12-31") },
      currency: "INR",
      taxIncluded: true,
      effectiveFrom: new Date(),
      effectiveTo: new Date("2025-12-31")
    },
    image: "/assets/products/totebags/16.webp",
    subImages: [
      "/assets/products/totebags/16.webp",
      "/assets/products/totebags/17.webp",
      "/assets/products/totebags/18.webp"
    ],
    tags: [
      "jute tote printed",
      "csr gifting bag",
      "eco friendly tote bag",
      "corporate gifting",
      "branding tote bag"
    ],
    keywords: [
      "printed jute bag india",
      "eco friendly corporate gifts",
      "custom branding tote",
      "event promotion bags"
    ],
    isFeatured: false,
    isPublished: true,
    isDeleted: false,
    ratings: { average: 4.5, count: 87 },
    metaTitle: "Printed Jute Tote Bag | Eco-Friendly Corporate Gifting India",
    metaDescription:
      "Eco-friendly printed jute totes for corporate gifting & branding. Bulk supply PAN India.",
    audit: { createdBy: "admin", updatedBy: "admin" }
  },

  // -------------------------------------------------------------
  // PRODUCT 6 — Images 19–21 (3 subimages)
  // -------------------------------------------------------------
  {
    productCode: "TB-PREMIUMCANVAS-006",
    SKU: "TOTE-CANVAS-EXECUTIVE",
    name: "Executive Canvas Tote Bag",
    slug: "executive-canvas-tote-bag",
    description:
      "High-quality executive canvas tote bag perfect for conferences, client gifting, product launches, and premium branding campaigns. Elegant finish with sturdy handles & custom printing for corporate orders.",
    HSNCode: "42029200",
    type: "Tote Bag",
    quantity: 450,
    GSTRate: 18,
    brand: "EcoCarry",
    fabricType: "Premium Canvas",
    size: ["Large"],
    colour: ["Dark Blue"],
    weight: 420,
    dimensions: { length: 46, width: 38, height: 2 },
    minOrderQty: 10,
    maxOrderQty: 300,
    availabilityDate: new Date(),
    price: {
      priceCode: "TB-PREMIUMCANVAS-PRICE",
      singlePrice: 229,
      sales_0_50: 219,
      sales_50_100: 209,
      sales_100_above: 199,
      discountPrice: 219,
      discount: { type: "percentage", value: 5, validUntil: new Date("2025-12-31") },
      currency: "INR",
      taxIncluded: true,
      effectiveFrom: new Date(),
      effectiveTo: new Date("2025-12-31")
    },
    image: "/assets/products/totebags/19.webp",
    subImages: [
      "/assets/products/totebags/19.webp",
      "/assets/products/totebags/20.webp",
      "/assets/products/totebags/21.webp"
    ],
    tags: [
      "executive tote bag",
      "premium canvas tote",
      "corporate conference bag",
      "custom printed tote",
      "branding tote india"
    ],
    keywords: [
      "executive tote india",
      "premium conference bag",
      "custom branding totes",
      "corporate promotional bags"
    ],
    isFeatured: true,
    isPublished: true,
    isDeleted: false,
    ratings: { average: 4.9, count: 72 },
    metaTitle:
      "Executive Canvas Tote Bag | Premium Corporate Conference Bags India",
    metaDescription:
      "Premium executive canvas tote bag with custom branding. Ideal for conferences & corporate gifting. Bulk supply PAN India.",
    audit: { createdBy: "admin", updatedBy: "admin" }
  }
];

module.exports = toteBags;
