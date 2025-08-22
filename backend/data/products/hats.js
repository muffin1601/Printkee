const hats = [
  {
    productCode: "HAT-BUCKET-001",
    SKU: "HAT-ONE-BUCKET",
    name: "Reversible Bucket Hat",
    slug: "reversible-bucket-hat",
    description: "Reversible bucket hat for sun protection with custom branding options.",
    HSNCode: "65050000",
    type: "Headwear",
    quantity: 500,
    GSTRate: 12,
    brand: "SunProtect",
    fabricType: "Polyester-Cotton Blend",
    size: ["One Size"],
    colour: ["Navy/White", "Black/Grey", "Blue/Beige"],
    weight: 120,
    dimensions: {
      length: 30,
      width: 30,
      height: 15
    },
    minOrderQty: 10,
    maxOrderQty: 500,
    availabilityDate: new Date(),
    price: {
      priceCode: "HAT-BUCKET-PRICE",
      singlePrice: 399,
      sales_0_50: 349,
      sales_50_100: 299,
      sales_100_above: 249,
      discountPrice: 349,
      discount: {
        type: "percentage",
        value: 12,
        validUntil: new Date("2023-12-31")
      },
      currency: "INR",
      taxIncluded: true,
      effectiveFrom: new Date(),
      effectiveTo: new Date("2024-12-31")
    },
    image: "/assets/products/hats/hats (1).webp",
    tags: [
      "bucket hat",
      "reversible hat",
      "Apparel and Accessories",
      "Hats",
      "custom branded hat",
      "sun protection hat",
      "promotional hat"
    ],
    keywords: ["bucket", "reversible", "sun protection", "custom"],
    isFeatured: true,
    isPublished: true,
    ratings: {
      average: 4.4,
      count: 78
    },
    metaTitle: "Custom Reversible Bucket Hats | Branded Sun Protection Hats",
    metaDescription: "Premium reversible bucket hats perfect for sun protection with custom branding options for events and promotions.",
    audit: {
      createdBy: "admin",
      updatedBy: "admin"
    }
  },
  {
    productCode: "HAT-BASEBALL-002",
    SKU: "HAT-ONE-BASEBALL",
    name: "Classic Baseball Cap",
    slug: "classic-baseball-cap",
    description: "Traditional baseball cap with adjustable strap and custom embroidery options.",
    HSNCode: "65050000",
    type: "Headwear",
    quantity: 600,
    GSTRate: 12,
    brand: "CapMasters",
    fabricType: "Cotton Twill",
    size: ["Adjustable"],
    colour: ["Black", "Navy", "Red", "White", "Grey"],
    weight: 150,
    dimensions: {
      length: 32,
      width: 22,
      height: 12
    },
    minOrderQty: 12,
    maxOrderQty: 600,
    availabilityDate: new Date(),
    price: {
      priceCode: "HAT-BASEBALL-PRICE",
      singlePrice: 349,
      sales_0_50: 299,
      sales_50_100: 259,
      sales_100_above: 219,
      discountPrice: 299,
      discount: {
        type: "percentage",
        value: 14,
        validUntil: new Date("2023-12-31")
      },
      currency: "INR",
      taxIncluded: true,
      effectiveFrom: new Date(),
      effectiveTo: new Date("2024-12-31")
    },
    image: "/assets/products/hats/hats (2).webp",
    tags: [
      "baseball cap",
      "adjustable cap",
      "custom cap",
      "embroidered hat",
      "promotional cap",
      "sports cap"
    ],
    keywords: ["baseball", "cap", "adjustable", "embroidered"],
    isFeatured: true,
    isPublished: true,
    ratings: {
      average: 4.6,
      count: 125
    },
    metaTitle: "Custom Baseball Caps | Embroidered Promotional Hats",
    metaDescription: "Classic baseball caps with adjustable straps, perfect for custom embroidery and promotional events.",
    audit: {
      createdBy: "admin",
      updatedBy: "admin"
    }
  },
  {
    productCode: "HAT-TRUCKER-003",
    SKU: "HAT-ONE-TRUCKER",
    name: "Mesh Back Trucker Hat",
    slug: "mesh-back-trucker-hat",
    description: "Breathable mesh back trucker hat with foam front for custom printing.",
    HSNCode: "65050000",
    type: "Headwear",
    quantity: 450,
    GSTRate: 12,
    brand: "TruckerPro",
    fabricType: "Polyester Mesh",
    size: ["Adjustable"],
    colour: ["Black/Black", "Navy/Navy", "Red/Black", "Green/Black"],
    weight: 110,
    dimensions: {
      length: 31,
      width: 21,
      height: 11
    },
    minOrderQty: 15,
    maxOrderQty: 450,
    availabilityDate: new Date(),
    price: {
      priceCode: "HAT-TRUCKER-PRICE",
      singlePrice: 379,
      sales_0_50: 329,
      sales_50_100: 289,
      sales_100_above: 249,
      discountPrice: 329,
      discount: {
        type: "percentage",
        value: 13,
        validUntil: new Date("2023-12-31")
      },
      currency: "INR",
      taxIncluded: true,
      effectiveFrom: new Date(),
      effectiveTo: new Date("2024-12-31")
    },
    image: "/assets/products/hats/hats (3).webp",
    tags: [
      "trucker hat",
      "mesh hat",
      "breathable cap",
      "custom trucker hat",
      "promotional hat",
      "outdoor cap"
    ],
    keywords: ["trucker", "mesh", "breathable", "outdoor"],
    isFeatured: false,
    isPublished: true,
    ratings: {
      average: 4.3,
      count: 92
    },
    metaTitle: "Mesh Back Trucker Hats | Custom Printed Caps",
    metaDescription: "Breathable mesh back trucker hats ideal for outdoor events and custom printing promotions.",
    audit: {
      createdBy: "admin",
      updatedBy: "admin"
    }
  },
  {
    productCode: "HAT-BEANIE-004",
    SKU: "HAT-ONE-BEANIE",
    name: "Knit Beanie Winter Hat",
    slug: "knit-beanie-winter-hat",
    description: "Warm acrylic knit beanie perfect for winter promotions and custom branding.",
    HSNCode: "65050000",
    type: "Headwear",
    quantity: 550,
    GSTRate: 12,
    brand: "WinterWarm",
    fabricType: "Acrylic Knit",
    size: ["One Size Fits Most"],
    colour: ["Black", "Navy", "Grey", "Red", "Green", "Charcoal"],
    weight: 80,
    dimensions: {
      length: 25,
      width: 20,
      height: 8
    },
    minOrderQty: 20,
    maxOrderQty: 550,
    availabilityDate: new Date(),
    price: {
      priceCode: "HAT-BEANIE-PRICE",
      singlePrice: 279,
      sales_0_50: 239,
      sales_50_100: 209,
      sales_100_above: 179,
      discountPrice: 239,
      discount: {
        type: "percentage",
        value: 14,
        validUntil: new Date("2023-12-31")
      },
      currency: "INR",
      taxIncluded: true,
      effectiveFrom: new Date(),
      effectiveTo: new Date("2024-12-31")
    },
    image: "/assets/products/hats/hats (4).webp",
    tags: [
      "beanie",
      "winter hat",
      "knit cap",
      "custom beanie",
      "winter promotion",
      "acrylic hat"
    ],
    keywords: ["beanie", "winter", "knit", "warm"],
    isFeatured: true,
    isPublished: true,
    ratings: {
      average: 4.5,
      count: 115
    },
    metaTitle: "Custom Knit Beanies | Winter Promotional Hats",
    metaDescription: "Warm acrylic knit beanies perfect for winter promotions and custom branding opportunities.",
    audit: {
      createdBy: "admin",
      updatedBy: "admin"
    }
  },
  {
    productCode: "HAT-VISOR-005",
    SKU: "HAT-ONE-VISOR",
    name: "Sports Visor Cap",
    slug: "sports-visor-cap",
    description: "Lightweight sports visor with sweatband and adjustable strap for athletic events.",
    HSNCode: "65050000",
    type: "Headwear",
    quantity: 400,
    GSTRate: 12,
    brand: "SportEdge",
    fabricType: "Polyester",
    size: ["Adjustable"],
    colour: ["Black", "White", "Navy", "Red", "Yellow"],
    weight: 90,
    dimensions: {
      length: 30,
      width: 20,
      height: 10
    },
    minOrderQty: 15,
    maxOrderQty: 400,
    availabilityDate: new Date(),
    price: {
      priceCode: "HAT-VISOR-PRICE",
      singlePrice: 319,
      sales_0_50: 279,
      sales_50_100: 249,
      sales_100_above: 219,
      discountPrice: 279,
      discount: {
        type: "percentage",
        value: 12,
        validUntil: new Date("2023-12-31")
      },
      currency: "INR",
      taxIncluded: true,
      effectiveFrom: new Date(),
      effectiveTo: new Date("2024-12-31")
    },
    image: "/assets/products/hats/hats (5).webp",
    tags: [
      "visor",
      "sports visor",
      "athletic cap",
      "custom visor",
      "sweatband hat",
      "golf visor"
    ],
    keywords: ["visor", "sports", "athletic", "lightweight"],
    isFeatured: false,
    isPublished: true,
    ratings: {
      average: 4.2,
      count: 67
    },
    metaTitle: "Custom Sports Visors | Athletic Headwear",
    metaDescription: "Lightweight sports visors with sweatband perfect for athletic events and custom branding.",
    audit: {
      createdBy: "admin",
      updatedBy: "admin"
    }
  },
  {
    productCode: "HAT-FEDORA-006",
    SKU: "HAT-ONE-FEDORA",
    name: "Classic Fedora Hat",
    slug: "classic-fedora-hat",
    description: "Elegant fedora hat with leather band for sophisticated branding events.",
    HSNCode: "65050000",
    type: "Headwear",
    quantity: 300,
    GSTRate: 12,
    brand: "EleganceHats",
    fabricType: "Wool Felt",
    size: ["S", "M", "L", "XL"],
    colour: ["Black", "Brown", "Grey", "Navy"],
    weight: 180,
    dimensions: {
      length: 35,
      width: 28,
      height: 12
    },
    minOrderQty: 5,
    maxOrderQty: 300,
    availabilityDate: new Date(),
    price: {
      priceCode: "HAT-FEDORA-PRICE",
      singlePrice: 899,
      sales_0_50: 799,
      sales_50_100: 699,
      sales_100_above: 599,
      discountPrice: 799,
      discount: {
        type: "percentage",
        value: 11,
        validUntil: new Date("2023-12-31")
      },
      currency: "INR",
      taxIncluded: true,
      effectiveFrom: new Date(),
      effectiveTo: new Date("2024-12-31")
    },
    image: "/assets/products/hats/hats (6).webp",
    tags: [
      "fedora",
      "formal hat",
      "wool hat",
      "custom fedora",
      "event hat",
      "premium headwear"
    ],
    keywords: ["fedora", "formal", "wool", "elegant"],
    isFeatured: true,
    isPublished: true,
    ratings: {
      average: 4.7,
      count: 45
    },
    metaTitle: "Custom Fedora Hats | Premium Formal Headwear",
    metaDescription: "Elegant wool felt fedora hats with leather band, perfect for sophisticated branding events.",
    audit: {
      createdBy: "admin",
      updatedBy: "admin"
    }
  },
  {
    productCode: "HAT-BOONIE-007",
    SKU: "HAT-ONE-BOONIE",
    name: "Military Boonie Hat",
    slug: "military-boonie-hat",
    description: "Durable military-style boonie hat with chin strap and wide brim for outdoor use.",
    HSNCode: "65050000",
    type: "Headwear",
    quantity: 350,
    GSTRate: 12,
    brand: "OutdoorGear",
    fabricType: "Ripstop Polyester",
    size: ["S/M", "L/XL"],
    colour: ["Olive Green", "Coyote Brown", "Black", "Navy"],
    weight: 140,
    dimensions: {
      length: 40,
      width: 40,
      height: 10
    },
    minOrderQty: 10,
    maxOrderQty: 350,
    availabilityDate: new Date(),
    price: {
      priceCode: "HAT-BOONIE-PRICE",
      singlePrice: 459,
      sales_0_50: 409,
      sales_50_100: 369,
      sales_100_above: 329,
      discountPrice: 409,
      discount: {
        type: "percentage",
        value: 11,
        validUntil: new Date("2023-12-31")
      },
      currency: "INR",
      taxIncluded: true,
      effectiveFrom: new Date(),
      effectiveTo: new Date("2024-12-31")
    },
    image: "/assets/products/hats/hats (7).webp",
    tags: [
      "boonie hat",
      "military hat",
      "outdoor hat",
      "fishing hat",
      "hunting cap",
      "wide brim hat"
    ],
    keywords: ["boonie", "military", "outdoor", "durable"],
    isFeatured: false,
    isPublished: true,
    ratings: {
      average: 4.4,
      count: 83
    },
    metaTitle: "Military Boonie Hats | Outdoor Adventure Headwear",
    metaDescription: "Durable military-style boonie hats with chin strap, perfect for outdoor activities and custom branding.",
    audit: {
      createdBy: "admin",
      updatedBy: "admin"
    }
  },
  {
    productCode: "HAT-PANAMA-008",
    SKU: "HAT-ONE-PANAMA",
    name: "Panama Straw Hat",
    slug: "panama-straw-hat",
    description: "Lightweight Panama straw hat with black band for summer events and promotions.",
    HSNCode: "65050000",
    type: "Headwear",
    quantity: 250,
    GSTRate: 12,
    brand: "SummerStyle",
    fabricType: "Straw",
    size: ["S", "M", "L", "XL"],
    colour: ["Natural", "White", "Black"],
    weight: 110,
    dimensions: {
      length: 38,
      width: 38,
      height: 12
    },
    minOrderQty: 8,
    maxOrderQty: 250,
    availabilityDate: new Date(),
    price: {
      priceCode: "HAT-PANAMA-PRICE",
      singlePrice: 649,
      sales_0_50: 579,
      sales_50_100: 519,
      sales_100_above: 469,
      discountPrice: 579,
      discount: {
        type: "percentage",
        value: 11,
        validUntil: new Date("2023-12-31")
      },
      currency: "INR",
      taxIncluded: true,
      effectiveFrom: new Date(),
      effectiveTo: new Date("2024-12-31")
    },
    image: "/assets/products/hats/hats (8).webp",
    tags: [
      "panama hat",
      "straw hat",
      "summer hat",
      "beach hat",
      "custom straw hat",
      "event headwear"
    ],
    keywords: ["panama", "straw", "summer", "lightweight"],
    isFeatured: true,
    isPublished: true,
    ratings: {
      average: 4.6,
      count: 57
    },
    metaTitle: "Panama Straw Hats | Summer Event Headwear",
    metaDescription: "Lightweight Panama straw hats perfect for summer events, beach promotions and custom branding.",
    audit: {
      createdBy: "admin",
      updatedBy: "admin"
    }
  },
  {
    productCode: "HAT-NEWERA-009",
    SKU: "HAT-ONE-NEWERA",
    name: "Premium Fitted Cap",
    slug: "premium-fitted-cap",
    description: "High-quality fitted cap with structured front and custom embroidery options.",
    HSNCode: "65050000",
    type: "Headwear",
    quantity: 400,
    GSTRate: 12,
    brand: "CapElite",
    fabricType: "Wool Blend",
    size: ["S", "M", "L", "XL"],
    colour: ["Black", "Navy", "Grey", "Red", "Green"],
    weight: 160,
    dimensions: {
      length: 32,
      width: 22,
      height: 12
    },
    minOrderQty: 10,
    maxOrderQty: 400,
    availabilityDate: new Date(),
    price: {
      priceCode: "HAT-NEWERA-PRICE",
      singlePrice: 579,
      sales_0_50: 519,
      sales_50_100: 469,
      sales_100_above: 419,
      discountPrice: 519,
      discount: {
        type: "percentage",
        value: 10,
        validUntil: new Date("2023-12-31")
      },
      currency: "INR",
      taxIncluded: true,
      effectiveFrom: new Date(),
      effectiveTo: new Date("2024-12-31")
    },
    image: "/assets/products/hats/hats (9).webp",
    tags: [
      "fitted cap",
      "premium cap",
      "structured hat",
      "custom fitted cap",
      "wool cap",
      "high-quality hat"
    ],
    keywords: ["fitted", "premium", "structured", "wool"],
    isFeatured: false,
    isPublished: true,
    ratings: {
      average: 4.8,
      count: 96
    },
    metaTitle: "Premium Fitted Caps | Custom Embroidered Hats",
    metaDescription: "High-quality fitted caps with structured front, perfect for custom embroidery and premium branding.",
    audit: {
      createdBy: "admin",
      updatedBy: "admin"
    }
  },
  {
    productCode: "HAT-BERET-010",
    SKU: "HAT-ONE-BERET",
    name: "Classic Wool Beret",
    slug: "classic-wool-beret",
    description: "Traditional wool beret with leather trim for artistic and fashion branding.",
    HSNCode: "65050000",
    type: "Headwear",
    quantity: 320,
    GSTRate: 12,
    brand: "ParisStyle",
    fabricType: "Wool",
    size: ["One Size"],
    colour: ["Black", "Navy", "Red", "Grey", "Brown"],
    weight: 95,
    dimensions: {
      length: 28,
      width: 28,
      height: 6
    },
    minOrderQty: 12,
    maxOrderQty: 320,
    availabilityDate: new Date(),
    price: {
      priceCode: "HAT-BERET-PRICE",
      singlePrice: 429,
      sales_0_50: 379,
      sales_50_100: 339,
      sales_100_above: 299,
      discountPrice: 379,
      discount: {
        type: "percentage",
        value: 12,
        validUntil: new Date("2023-12-31")
      },
      currency: "INR",
      taxIncluded: true,
      effectiveFrom: new Date(),
      effectiveTo: new Date("2024-12-31")
    },
    image: "/assets/products/hats/hats (10).webp",
    tags: [
      "beret",
      "wool beret",
      "fashion hat",
      "artistic hat",
      "custom beret",
      "french hat"
    ],
    keywords: ["beret", "wool", "fashion", "artistic"],
    isFeatured: true,
    isPublished: true,
    ratings: {
      average: 4.5,
      count: 64
    },
    metaTitle: "Classic Wool Berets | Fashion Headwear",
    metaDescription: "Traditional wool berets with leather trim, perfect for artistic, fashion and custom branding applications.",
    audit: {
      createdBy: "admin",
      updatedBy: "admin"
    }
  },
  {
  productCode: "HAT-BUCKET-011",
  SKU: "HAT-ONE-BUCKET",
  name: "Casual Cotton Bucket Hat",
  slug: "casual-cotton-bucket-hat",
  description: "Lightweight cotton bucket hat, perfect for outdoor activities and casual branding.",
  HSNCode: "65050000",
  type: "Headwear",
  quantity: 500,
  GSTRate: 12,
  brand: "UrbanWear",
  fabricType: "Cotton",
  size: ["One Size"],
  colour: ["Beige", "Olive", "Black", "White", "Navy"],
  weight: 110,
  dimensions: {
    length: 30,
    width: 30,
    height: 12
  },
  minOrderQty: 24,
  maxOrderQty: 500,
  availabilityDate: new Date(),
  price: {
    priceCode: "HAT-BUCKET-PRICE",
    singlePrice: 349,
    sales_0_50: 319,
    sales_50_100: 289,
    sales_100_above: 259,
    discountPrice: 319,
    discount: {
      type: "percentage",
      value: 10,
      validUntil: new Date("2023-12-31")
    },
    currency: "INR",
    taxIncluded: true,
    effectiveFrom: new Date(),
    effectiveTo: new Date("2024-12-31")
  },
  image: "/assets/products/hats/hats (11).webp",
  tags: [
    "bucket hat",
    "casual hat",
    "cotton hat",
    "custom bucket hat",
    "outdoor hat"
  ],
  keywords: ["bucket hat", "cotton", "casual", "outdoor"],
  isFeatured: true,
  isPublished: true,
  ratings: {
    average: 4.7,
    count: 89
  },
  metaTitle: "Casual Cotton Bucket Hat | Outdoor Headwear",
  metaDescription: "Lightweight cotton bucket hat, ideal for casual wear, outdoor branding, and custom printing.",
  audit: {
    createdBy: "admin",
    updatedBy: "admin"
  }
}

];

module.exports = hats;