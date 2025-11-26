const keychains = [
  // -------------------------------------------------------------
  // PRODUCT 1 — Image 1
  // -------------------------------------------------------------
  {
    productCode: "KC-METAL-001",
    SKU: "KEYCHAIN-METAL-CLASSIC",
    name: "Classic Metal Corporate Keychain",
    slug: "classic-metal-corporate-keychain",
    description:
      "Premium metal keychain suitable for corporate gifting, brand promotion, employee welcome kits, and event giveaways. Supports custom engraving and logo branding. Bulk supply across Delhi NCR, Noida, Gurgaon, Okhla, Faridabad, and PAN India.",
    HSNCode: "73269099",
    type: "Keychain",
    quantity: 900,
    GSTRate: 18,
    brand: "BrandCraft",
    fabricType: "Metal",
    size: ["Standard"],
    colour: ["Silver"],
    weight: 40,
    dimensions: { length: 7, width: 3, height: 1 },
    minOrderQty: 20,
    maxOrderQty: 900,
    availabilityDate: new Date(),
    price: {
      priceCode: "KC-METAL-001-PRICE",
      singlePrice: 49,
      sales_0_50: 45,
      sales_50_100: 43,
      sales_100_above: 40,
      discountPrice: 45,
      discount: { type: "percentage", value: 8, validUntil: new Date("2025-12-31") },
      currency: "INR",
      taxIncluded: true,
      effectiveFrom: new Date(),
      effectiveTo: new Date("2025-12-31")
    },
    image: "/assets/products/keychains/1.webp",
    subImages: ["/assets/products/keychains/1.webp"],
    tags: [
      "metal keychain",
      "custom engraved keychain",
      "corporate keychain",
      "promotional keychain India"
    ],
    keywords: [
      "metal engraved keychain",
      "corporate gifting keychain",
      "promo keychain"
    ],
    isFeatured: true,
    isPublished: true,
    isDeleted: false,
    ratings: { average: 4.7, count: 115 },
    metaTitle: "Classic Metal Corporate Keychain | Custom Engraving India",
    metaDescription:
      "Premium metal corporate keychain with custom engraving. Perfect for branding & gifting. Delivered PAN India.",
    audit: { createdBy: "admin", updatedBy: "admin" }
  },

  // -------------------------------------------------------------
  // PRODUCT 2 — Image 2
  // -------------------------------------------------------------
  {
    productCode: "KC-LEATHER-002",
    SKU: "KEYCHAIN-LEATHER-PREMIUM",
    name: "Premium Leather Keychain",
    slug: "premium-leather-keychain",
    description:
      "High-quality leather keychain designed for executive gifting, corporate identity, and premium brand promotions. Supports embossed and printed branding. Bulk orders delivered across India.",
    HSNCode: "42023120",
    type: "Keychain",
    quantity: 700,
    GSTRate: 18,
    brand: "BrandCraft",
    fabricType: "PU Leather",
    size: ["Standard"],
    colour: ["Brown"],
    weight: 45,
    dimensions: { length: 9, width: 4, height: 1 },
    minOrderQty: 10,
    maxOrderQty: 700,
    availabilityDate: new Date(),
    price: {
      priceCode: "KC-LEATHER-002-PRICE",
      singlePrice: 79,
      sales_0_50: 75,
      sales_50_100: 70,
      sales_100_above: 65,
      discountPrice: 75,
      discount: { type: "percentage", value: 5, validUntil: new Date("2025-12-31") },
      currency: "INR",
      taxIncluded: true,
      effectiveFrom: new Date(),
      effectiveTo: new Date("2025-12-31")
    },
    image: "/assets/products/keychains/2.webp",
    subImages: ["/assets/products/keychains/2.webp"],
    tags: [
      "leather keychain",
      "corporate premium keychain",
      "custom embossed keychain",
      "executive gifting"
    ],
    keywords: [
      "leather corporate keychain",
      "embossed branded keychain"
    ],
    isFeatured: true,
    isPublished: true,
    isDeleted: false,
    ratings: { average: 4.8, count: 102 },
    metaTitle: "Premium Leather Keychain | Custom Corporate Gifts India",
    metaDescription:
      "Premium leather keychain with embossed branding. Ideal for executive gifting & corporate promotions. PAN India supply.",
    audit: { createdBy: "admin", updatedBy: "admin" }
  },

  // -------------------------------------------------------------
  // PRODUCT 3 — Image 3
  // -------------------------------------------------------------
  {
    productCode: "KC-RING-003",
    SKU: "KEYCHAIN-RING-METAL",
    name: "Metal Ring Keychain",
    slug: "metal-ring-keychain",
    description:
      "Durable metal ring keychain suitable for brand promotions, event giveaways, employee welcome kits, and festive corporate gifting. Custom engraving supported.",
    HSNCode: "73269099",
    type: "Keychain",
    quantity: 1000,
    GSTRate: 18,
    brand: "BrandCraft",
    fabricType: "Stainless Steel",
    size: ["Standard"],
    colour: ["Silver"],
    weight: 30,
    dimensions: { length: 5, width: 5, height: 1 },
    minOrderQty: 50,
    maxOrderQty: 1200,
    availabilityDate: new Date(),
    price: {
      priceCode: "KC-RING-003-PRICE",
      singlePrice: 29,
      sales_0_50: 27,
      sales_50_100: 26,
      sales_100_above: 24,
      discountPrice: 27,
      discount: { type: "percentage", value: 7, validUntil: new Date("2025-12-31") },
      currency: "INR",
      taxIncluded: true,
      effectiveFrom: new Date(),
      effectiveTo: new Date("2025-12-31")
    },
    image: "/assets/products/keychains/3.webp",
    subImages: ["/assets/products/keychains/3.webp"],
    tags: [
      "ring keychain",
      "steel keychain",
      "promo giveaway",
      "branding keychain"
    ],
    keywords: [
      "metal ring keychain",
      "promotional keychains India"
    ],
    isFeatured: false,
    isPublished: true,
    isDeleted: false,
    ratings: { average: 4.4, count: 90 },
    metaTitle: "Metal Ring Keychain | Promotional Keychains India",
    metaDescription:
      "Durable metal ring keychain with engraving support. Excellent for promotional events & bulk gifting.",
    audit: { createdBy: "admin", updatedBy: "admin" }
  },

  // -------------------------------------------------------------
  // PRODUCT 4 — Image 4
  // -------------------------------------------------------------
  {
    productCode: "KC-ACRYLIC-004",
    SKU: "KEYCHAIN-ACRYLIC-PRINTED",
    name: "Acrylic Printed Keychain",
    slug: "acrylic-printed-keychain",
    description:
      "Vibrant acrylic keychain ideal for colorful branding, custom printing, event merchandise, and promotional gifting. Bulk customization available for companies and events.",
    HSNCode: "39269099",
    type: "Keychain",
    quantity: 950,
    GSTRate: 18,
    brand: "BrandCraft",
    fabricType: "Acrylic",
    size: ["Standard"],
    colour: ["Multi-color"],
    weight: 25,
    dimensions: { length: 6, width: 4, height: 1 },
    minOrderQty: 50,
    maxOrderQty: 900,
    availabilityDate: new Date(),
    price: {
      priceCode: "KC-ACRYLIC-004-PRICE",
      singlePrice: 35,
      sales_0_50: 33,
      sales_50_100: 32,
      sales_100_above: 30,
      discountPrice: 33,
      discount: { type: "percentage", value: 6, validUntil: new Date("2025-12-31") },
      currency: "INR",
      taxIncluded: true,
      effectiveFrom: new Date(),
      effectiveTo: new Date("2025-12-31")
    },
    image: "/assets/products/keychains/4.webp",
    subImages: ["/assets/products/keychains/4.webp"],
    tags: [
      "acrylic keychain",
      "custom printed keychain",
      "corporate merchandising",
      "bulk keychain supply"
    ],
    keywords: [
      "acrylic printed keychain",
      "custom branding keychain"
    ],
    isFeatured: false,
    isPublished: true,
    isDeleted: false,
    ratings: { average: 4.5, count: 98 },
    metaTitle: "Acrylic Printed Keychain | Custom Branding & Promotional India",
    metaDescription:
      "Colorful acrylic keychain with full customization. Ideal for branding & promotional gifting across India.",
    audit: { createdBy: "admin", updatedBy: "admin" }
  },

  // -------------------------------------------------------------
  // PRODUCT 5 — Image 5
  // -------------------------------------------------------------
  {
    productCode: "KC-RECT-005",
    SKU: "KEYCHAIN-RECT-METAL",
    name: "Rectangle Metal Keychain",
    slug: "rectangle-metal-keychain",
    description:
      "Rectangle metal keychain with laser engraving support. Popular for corporate promotions, dealer gifting, and employee recognition events. Bulk orders available PAN India.",
    HSNCode: "73269099",
    type: "Keychain",
    quantity: 850,
    GSTRate: 18,
    brand: "BrandCraft",
    fabricType: "Metal",
    size: ["Standard"],
    colour: ["Silver"],
    weight: 35,
    dimensions: { length: 7, width: 4, height: 1 },
    minOrderQty: 20,
    maxOrderQty: 900,
    availabilityDate: new Date(),
    price: {
      priceCode: "KC-RECT-005-PRICE",
      singlePrice: 59,
      sales_0_50: 55,
      sales_50_100: 52,
      sales_100_above: 49,
      discountPrice: 55,
      discount: { type: "percentage", value: 7, validUntil: new Date("2025-12-31") },
      currency: "INR",
      taxIncluded: true,
      effectiveFrom: new Date(),
      effectiveTo: new Date("2025-12-31")
    },
    image: "/assets/products/keychains/5.webp",
    subImages: ["/assets/products/keychains/5.webp"],
    tags: [
      "rectangle keychain",
      "engraved metal keychain",
      "corporate promo keychain"
    ],
    keywords: [
      "rectangular keychain metal",
      "corporate branding keychain India"
    ],
    isFeatured: false,
    isPublished: true,
    isDeleted: false,
    ratings: { average: 4.6, count: 75 },
    metaTitle: "Rectangle Metal Keychain | Custom Engraved Corporate Gifts",
    metaDescription:
      "Rectangle metal keychain with custom engraving. Ideal for corporate gifting & promotions across India.",
    audit: { createdBy: "admin", updatedBy: "admin" }
  },

  // -------------------------------------------------------------
  // PRODUCT 6 — Image 6
  // -------------------------------------------------------------
  {
    productCode: "KC-ROUNDCOLOR-006",
    SKU: "KEYCHAIN-ROUND-PRINT",
    name: "Round Printed Keychain",
    slug: "round-printed-keychain",
    description:
      "Round printed keychain suitable for colorful promotional gifting, brand events, college fests, and marketing campaigns. Logo printing supported.",
    HSNCode: "39269099",
    type: "Keychain",
    quantity: 950,
    GSTRate: 18,
    brand: "BrandCraft",
    fabricType: "Acrylic",
    size: ["Standard"],
    colour: ["White"],
    weight: 20,
    dimensions: { length: 6, width: 6, height: 1 },
    minOrderQty: 50,
    maxOrderQty: 1000,
    availabilityDate: new Date(),
    price: {
      priceCode: "KC-ROUNDCOLOR-006-PRICE",
      singlePrice: 25,
      sales_0_50: 23,
      sales_50_100: 22,
      sales_100_above: 20,
      discountPrice: 23,
      discount: { type: "percentage", value: 8, validUntil: new Date("2025-12-31") },
      currency: "INR",
      taxIncluded: true,
      effectiveFrom: new Date(),
      effectiveTo: new Date("2025-12-31")
    },
    image: "/assets/products/keychains/6.webp",
    subImages: ["/assets/products/keychains/6.webp"],
    tags: [
      "round printed keychain",
      "custom acrylic keychain",
      "promotional merchandise"
    ],
    keywords: [
      "round promo keychain",
      "printed keychain India"
    ],
    isFeatured: false,
    isPublished: true,
    isDeleted: false,
    ratings: { average: 4.3, count: 85 },
    metaTitle: "Round Printed Keychain | Custom Promotional Keychains India",
    metaDescription:
      "Round acrylic printed keychain ideal for branding & promotions. Bulk orders available PAN India.",
    audit: { createdBy: "admin", updatedBy: "admin" }
  },

  // -------------------------------------------------------------
  // PRODUCT 7 — Image 7
  // -------------------------------------------------------------
  {
    productCode: "KC-BAMBOO-007",
    SKU: "KEYCHAIN-BAMBOO-ECO",
    name: "Eco-Friendly Bamboo Keychain",
    slug: "eco-friendly-bamboo-keychain",
    description:
      "Eco-friendly bamboo keychain ideal for sustainable corporate gifting, CSR events, green company branding, and promotional merchandise. Supports laser engraving.",
    HSNCode: "44219990",
    type: "Keychain",
    quantity: 600,
    GSTRate: 18,
    brand: "BrandCraft",
    fabricType: "Bamboo",
    size: ["Standard"],
    colour: ["Wood"],
    weight: 25,
    dimensions: { length: 7, width: 3, height: 1 },
    minOrderQty: 20,
    maxOrderQty: 600,
    availabilityDate: new Date(),
    price: {
      priceCode: "KC-BAMBOO-007-PRICE",
      singlePrice: 69,
      sales_0_50: 65,
      sales_50_100: 62,
      sales_100_above: 59,
      discountPrice: 65,
      discount: { type: "percentage", value: 6, validUntil: new Date("2025-12-31") },
      currency: "INR",
      taxIncluded: true,
      effectiveFrom: new Date(),
      effectiveTo: new Date("2025-12-31")
    },
    image: "/assets/products/keychains/7.webp",
    subImages: ["/assets/products/keychains/7.webp"],
    tags: [
      "bamboo keychain",
      "eco friendly keychain",
      "sustainable gifting"
    ],
    keywords: [
      "eco keychain",
      "bamboo corporate gifts"
    ],
    isFeatured: true,
    isPublished: true,
    isDeleted: false,
    ratings: { average: 4.7, count: 72 },
    metaTitle:
      "Eco-Friendly Bamboo Keychain | Sustainable Corporate Gifts India",
    metaDescription:
      "Bamboo eco-friendly keychain with custom engraving. Ideal for CSR & sustainable gifting. PAN India delivery.",
    audit: { createdBy: "admin", updatedBy: "admin" }
  },

  // -------------------------------------------------------------
  // PRODUCT 8 — Image 8
  // -------------------------------------------------------------
  {
    productCode: "KC-LIGHT-008",
    SKU: "KEYCHAIN-WITH-LIGHT",
    name: "LED Light Keychain",
    slug: "led-light-keychain",
    description:
      "Multipurpose LED light keychain perfect for events, corporate promotions, tech gifts, and employee giveaways. Custom branding available for bulk clients.",
    HSNCode: "85131010",
    type: "Keychain",
    quantity: 750,
    GSTRate: 18,
    brand: "BrandCraft",
    fabricType: "Plastic + Metal",
    size: ["Standard"],
    colour: ["Black"],
    weight: 35,
    dimensions: { length: 8, width: 3, height: 2 },
    minOrderQty: 20,
    maxOrderQty: 750,
    availabilityDate: new Date(),
    price: {
      priceCode: "KC-LIGHT-008-PRICE",
      singlePrice: 39,
      sales_0_50: 37,
      sales_50_100: 35,
      sales_100_above: 33,
      discountPrice: 37,
      discount: { type: "percentage", value: 5, validUntil: new Date("2025-12-31") },
      currency: "INR",
      taxIncluded: true,
      effectiveFrom: new Date(),
      effectiveTo: new Date("2025-12-31")
    },
    image: "/assets/products/keychains/8.webp",
    subImages: ["/assets/products/keychains/8.webp"],
    tags: [
      "led keychain",
      "torch keychain",
      "tech promotional items"
    ],
    keywords: [
      "light keychain India",
      "LED promo keychain"
    ],
    isFeatured: false,
    isPublished: true,
    isDeleted: false,
    ratings: { average: 4.4, count: 80 },
    metaTitle: "LED Light Keychain | Promotional Tech Gifts India",
    metaDescription:
      "LED keychain with branding options. Ideal for tech promotions & corporate giveaways. PAN India delivery.",
    audit: { createdBy: "admin", updatedBy: "admin" }
  },

  // -------------------------------------------------------------
  // PRODUCT 9 — Image 9
  // -------------------------------------------------------------
  {
    productCode: "KC-CARABINER-009",
    SKU: "KEYCHAIN-CARABINER",
    name: "Carabiner Metal Keychain",
    slug: "carabiner-metal-keychain",
    description:
      "Strong carabiner-style metal keychain ideal for outdoor events, corporate branding, adventure promotions, and employee gifting. Supports laser logo marking.",
    HSNCode: "73269099",
    type: "Keychain",
    quantity: 650,
    GSTRate: 18,
    brand: "BrandCraft",
    fabricType: "Aluminum",
    size: ["Standard"],
    colour: ["Black"],
    weight: 30,
    dimensions: { length: 8, width: 4, height: 1 },
    minOrderQty: 10,
    maxOrderQty: 700,
    availabilityDate: new Date(),
    price: {
      priceCode: "KC-CARABINER-009-PRICE",
      singlePrice: 55,
      sales_0_50: 52,
      sales_50_100: 49,
      sales_100_above: 46,
      discountPrice: 52,
      discount: { type: "percentage", value: 6, validUntil: new Date("2025-12-31") },
      currency: "INR",
      taxIncluded: true,
      effectiveFrom: new Date(),
      effectiveTo: new Date("2025-12-31")
    },
    image: "/assets/products/keychains/9.webp",
    subImages: ["/assets/products/keychains/9.webp"],
    tags: [
      "carabiner keychain",
      "metal outdoor keychain",
      "corporate adventure gift"
    ],
    keywords: [
      "carabiner keychain branded",
      "metal adventure keychain"
    ],
    isFeatured: false,
    isPublished: true,
    isDeleted: false,
    ratings: { average: 4.5, count: 60 },
    metaTitle: "Carabiner Metal Keychain | Outdoor Promotional Gifts",
    metaDescription:
      "Premium carabiner metal keychain ideal for outdoor promotions & branding. Custom engraving available.",
    audit: { createdBy: "admin", updatedBy: "admin" }
  },

  // -------------------------------------------------------------
  // PRODUCT 10 — Image 10
  // -------------------------------------------------------------
  {
    productCode: "KC-NAME-010",
    SKU: "KEYCHAIN-NAME-CUSTOM",
    name: "Custom Name Keychain",
    slug: "custom-name-keychain",
    description:
      "Personalized name keychain ideal for corporate gifting, employee onboarding, brand merchandise, and promotional giveaways. Available in custom shapes & colors.",
    HSNCode: "39269099",
    type: "Keychain",
    quantity: 900,
    GSTRate: 18,
    brand: "BrandCraft",
    fabricType: "Acrylic",
    size: ["Standard"],
    colour: ["Multi-color"],
    weight: 20,
    dimensions: { length: 9, width: 3, height: 1 },
    minOrderQty: 30,
    maxOrderQty: 900,
    availabilityDate: new Date(),
    price: {
      priceCode: "KC-NAME-010-PRICE",
      singlePrice: 49,
      sales_0_50: 45,
      sales_50_100: 42,
      sales_100_above: 40,
      discountPrice: 45,
      discount: { type: "percentage", value: 10, validUntil: new Date("2025-12-31") },
      currency: "INR",
      taxIncluded: true,
      effectiveFrom: new Date(),
      effectiveTo: new Date("2025-12-31")
    },
    image: "/assets/products/keychains/10.webp",
    subImages: ["/assets/products/keychains/10.webp"],
    tags: [
      "name keychain",
      "custom printed keychain",
      "branded promo keychain"
    ],
    keywords: [
      "custom name keychain",
      "personalized corporate gifts"
    ],
    isFeatured: true,
    isPublished: true,
    isDeleted: false,
    ratings: { average: 4.8, count: 125 },
    metaTitle:
      "Custom Name Keychain | Personalized Corporate Gifts India",
    metaDescription:
      "Personalized name keychains for corporate gifting & promotions. Custom colors & shapes. Delivery across India.",
    audit: { createdBy: "admin", updatedBy: "admin" }
  }
];

module.exports = keychains;
