const sipperBottles = [
  // ------------------------------------------------------------------
  // PRODUCT 1 — (Images 1–4) — 4 Subimages
  // ------------------------------------------------------------------
  {
    productCode: "SB-STEEL-001",
    SKU: "SIPPER-STEEL-PREMIUM",
    name: "Premium Stainless Steel Sipper Bottle",
    slug: "premium-stainless-steel-sipper-bottle",
    description:
      "Premium stainless steel sipper bottle ideal for corporate gifting, employee welcome kits, marketing events, and brand promotions. Offers excellent durability, leak-proof design, and a large branding area for custom logo printing. Bulk orders available across Delhi NCR, Noida, Gurgaon, Okhla, Faridabad, and PAN India.",
    HSNCode: "73239390",
    type: "Sipper Bottle",
    quantity: 900,
    GSTRate: 18,
    brand: "HydraPro",
    fabricType: "Stainless Steel",
    size: ["750ml"],
    colour: ["Silver"],
    weight: 350,
    dimensions: { length: 26, width: 7, height: 7 },
    minOrderQty: 20,
    maxOrderQty: 800,
    availabilityDate: new Date(),
    price: {
      priceCode: "SB-STEEL-PREMIUM-PRICE",
      singlePrice: 349,
      sales_0_50: 329,
      sales_50_100: 309,
      sales_100_above: 289,
      discountPrice: 329,
      discount: { type: "percentage", value: 8, validUntil: new Date("2025-12-31") },
      currency: "INR",
      taxIncluded: true,
      effectiveFrom: new Date(),
      effectiveTo: new Date("2025-12-31")
    },
    image: "/assets/products/sipperbottles/1.webp",
    subImages: [
      "/assets/products/sipperbottles/1.webp",
      "/assets/products/sipperbottles/2.webp",
      "/assets/products/sipperbottles/3.webp",
      "/assets/products/sipperbottles/4.webp"
    ],
    tags: [
      "stainless steel sipper",
      "premium steel bottle",
      "custom printed bottle",
      "corporate gifting bottle",
      "branding sippers",
      "Delhi NCR corporate supply"
    ],
    keywords: [
      "steel bottle corporate",
      "custom printed sipper",
      "branding bottles india",
      "Gurgaon Noida Faridabad",
      "corporate welcome kit items"
    ],
    isFeatured: true,
    isPublished: true,
    isDeleted: false,
    ratings: { average: 4.7, count: 150 },
    metaTitle:
      "Premium Stainless Steel Sipper Bottle | Custom Printed Corporate Bottles India",
    metaDescription:
      "High-quality stainless steel sipper bottle with custom logo printing. Perfect for corporate gifting. Bulk delivery across Delhi NCR & PAN India.",
    audit: { createdBy: "admin", updatedBy: "admin" }
  },

  // ------------------------------------------------------------------
  // PRODUCT 2 — (Images 5–8) — 4 Subimages
  // ------------------------------------------------------------------
  {
    productCode: "SB-INSULATED-002",
    SKU: "SIPPER-INSULATED",
    name: "Double Wall Insulated Sipper Bottle",
    slug: "double-wall-insulated-sipper-bottle",
    description:
      "Double wall insulated sipper bottle that keeps beverages hot or cold for long hours. Highly preferred for premium corporate gifting, employee kits, and branded promotional giveaways. Custom logo engraving and printing available for bulk orders in Delhi NCR & across India.",
    HSNCode: "73239390",
    type: "Sipper Bottle",
    quantity: 700,
    GSTRate: 18,
    brand: "HydraPro",
    fabricType: "Stainless Steel Double Wall",
    size: ["600ml"],
    colour: ["Black"],
    weight: 420,
    dimensions: { length: 24, width: 7, height: 7 },
    minOrderQty: 10,
    maxOrderQty: 600,
    availabilityDate: new Date(),
    price: {
      priceCode: "SB-INSULATED-PRICE",
      singlePrice: 499,
      sales_0_50: 469,
      sales_50_100: 449,
      sales_100_above: 429,
      discountPrice: 469,
      discount: { type: "percentage", value: 6, validUntil: new Date("2025-12-31") },
      currency: "INR",
      taxIncluded: true,
      effectiveFrom: new Date(),
      effectiveTo: new Date("2025-12-31")
    },
    image: "/assets/products/sipperbottles/5.webp",
    subImages: [
      "/assets/products/sipperbottles/5.webp",
      "/assets/products/sipperbottles/6.webp",
      "/assets/products/sipperbottles/7.webp",
      "/assets/products/sipperbottles/8.webp"
    ],
    tags: [
      "insulated sipper",
      "double wall bottle",
      "hot cold bottle",
      "premium gifting bottle",
      "custom corporate sippers",
      "india promotional bottles"
    ],
    keywords: [
      "double wall sipper india",
      "premium corporate bottles",
      "branding insulated bottle",
      "Noida Gurgaon Delhi",
      "corporate gifting products"
    ],
    isFeatured: true,
    isPublished: true,
    isDeleted: false,
    ratings: { average: 4.8, count: 118 },
    metaTitle:
      "Double Wall Insulated Sipper Bottle | Corporate Premium Gifting India",
    metaDescription:
      "Premium insulated sipper bottle with custom logo engraving/printing. Perfect for corporate gifting. Bulk delivery PAN India.",
    audit: { createdBy: "admin", updatedBy: "admin" }
  },

  // ------------------------------------------------------------------
  // PRODUCT 3 — (Images 9–11) — 3 Subimages
  // ------------------------------------------------------------------
  {
    productCode: "SB-SPORT-003",
    SKU: "SIPPER-SPORT",
    name: "Sporty Plastic Sipper Bottle",
    slug: "sporty-plastic-sipper-bottle",
    description:
      "Lightweight sporty sipper bottle ideal for corporate outdoor events, marathons, HR fitness programs, and promotional giveaways. Custom company logo printing available. Delivered in bulk across Delhi NCR & India.",
    HSNCode: "39233090",
    type: "Sipper Bottle",
    quantity: 850,
    GSTRate: 18,
    brand: "HydraPro",
    fabricType: "Food Grade Plastic",
    size: ["900ml"],
    colour: ["Blue"],
    weight: 180,
    dimensions: { length: 28, width: 8, height: 8 },
    minOrderQty: 30,
    maxOrderQty: 900,
    availabilityDate: new Date(),
    price: {
      priceCode: "SB-SPORT-PRICE",
      singlePrice: 129,
      sales_0_50: 119,
      sales_50_100: 109,
      sales_100_above: 99,
      discountPrice: 119,
      discount: { type: "percentage", value: 9, validUntil: new Date("2025-12-31") },
      currency: "INR",
      taxIncluded: true,
      effectiveFrom: new Date(),
      effectiveTo: new Date("2025-12-31")
    },
    image: "/assets/products/sipperbottles/9.webp",
    subImages: [
      "/assets/products/sipperbottles/9.webp",
      "/assets/products/sipperbottles/10.webp",
      "/assets/products/sipperbottles/11.webp"
    ],
    tags: [
      "plastic sipper",
      "sport sipper bottle",
      "corporate event bottle",
      "fitness program bottle",
      "promotional giveaway bottle"
    ],
    keywords: [
      "plastic sipper india",
      "corporate event water bottle",
      "promotional sipper bottle",
      "brand printing bottle"
    ],
    isFeatured: false,
    isPublished: true,
    isDeleted: false,
    ratings: { average: 4.4, count: 98 },
    metaTitle: "Sporty Plastic Sipper Bottle | Promotional Event Bottles India",
    metaDescription:
      "Sporty plastic sipper bottle for events & promotional branding. Bulk orders for companies across India.",
    audit: { createdBy: "admin", updatedBy: "admin" }
  },

  // ------------------------------------------------------------------
  // PRODUCT 4 — (Images 12–14) — 3 Subimages
  // ------------------------------------------------------------------
  {
    productCode: "SB-FRUIT-004",
    SKU: "SIPPER-FRUIT-INFUSER",
    name: "Fruit Infuser Sipper Bottle",
    slug: "fruit-infuser-sipper-bottle",
    description:
      "Trendy fruit infuser sipper bottle perfect for HR wellness programs, corporate gifting, and promotional merchandise. Custom branding available for bulk corporate orders in Delhi NCR & PAN India.",
    HSNCode: "39233090",
    type: "Sipper Bottle",
    quantity: 600,
    GSTRate: 18,
    brand: "HydraPro",
    fabricType: "BPA-Free Plastic",
    size: ["700ml"],
    colour: ["Transparent"],
    weight: 240,
    dimensions: { length: 25, width: 7, height: 7 },
    minOrderQty: 20,
    maxOrderQty: 600,
    availabilityDate: new Date(),
    price: {
      priceCode: "SB-FRUIT-INFUSER-PRICE",
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
    image: "/assets/products/sipperbottles/12.webp",
    subImages: [
      "/assets/products/sipperbottles/12.webp",
      "/assets/products/sipperbottles/13.webp",
      "/assets/products/sipperbottles/14.webp"
    ],
    tags: [
      "fruit infuser bottle",
      "wellness gifting",
      "corporate health program gifts",
      "custom printed infuser"
    ],
    keywords: [
      "fruit infuser india",
      "corporate wellness gifting",
      "branded infuser bottle"
    ],
    isFeatured: false,
    isPublished: true,
    isDeleted: false,
    ratings: { average: 4.5, count: 85 },
    metaTitle:
      "Fruit Infuser Sipper Bottle | Corporate Wellness & Promotional Gifts India",
    metaDescription:
      "Premium fruit infuser bottle with custom branding. Ideal for corporate health programs & gifting.",
    audit: { createdBy: "admin", updatedBy: "admin" }
  },

  // ------------------------------------------------------------------
  // PRODUCT 5 — (Images 15–17) — 3 Subimages
  // ------------------------------------------------------------------
  {
    productCode: "SB-METAL-005",
    SKU: "SIPPER-METAL-CLASSIC",
    name: "Classic Metal Sipper Bottle",
    slug: "classic-metal-sipper-bottle",
    description:
      "Durable metal sipper bottle ideal for employee welcome kits, promotional gifting, and brand merchandise. Lightweight, stylish, and perfect for corporate logo printing. Bulk delivery across Delhi NCR & India.",
    HSNCode: "73239390",
    type: "Sipper Bottle",
    quantity: 750,
    GSTRate: 18,
    brand: "HydraPro",
    fabricType: "Aluminium",
    size: ["750ml"],
    colour: ["Red"],
    weight: 280,
    dimensions: { length: 25, width: 7, height: 7 },
    minOrderQty: 30,
    maxOrderQty: 750,
    availabilityDate: new Date(),
    price: {
      priceCode: "SB-METAL-PRICE",
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
    image: "/assets/products/sipperbottles/15.webp",
    subImages: [
      "/assets/products/sipperbottles/15.webp",
      "/assets/products/sipperbottles/16.webp",
      "/assets/products/sipperbottles/17.webp"
    ],
    tags: [
      "metal sipper bottle",
      "corporate gifting bottle",
      "custom printed metal bottle",
      "employee kit items"
    ],
    keywords: [
      "metal water bottle india",
      "corporate branded bottles",
      "bulk metal sippers"
    ],
    isFeatured: false,
    isPublished: true,
    isDeleted: false,
    ratings: { average: 4.4, count: 102 },
    metaTitle: "Classic Metal Sipper Bottle | Custom Branded Corporate Bottles",
    metaDescription:
      "Classic metal sipper bottle with custom printing. Perfect for promotions & corporate gifting. PAN India supply.",
    audit: { createdBy: "admin", updatedBy: "admin" }
  },

  // ------------------------------------------------------------------
  // PRODUCT 6 — (Images 18–20) — 3 Subimages
  // ------------------------------------------------------------------
  {
    productCode: "SB-THERMOS-006",
    SKU: "SIPPER-THERMOS",
    name: "Thermos Style Vacuum Sipper Bottle",
    slug: "thermos-style-vacuum-sipper-bottle",
    description:
      "Premium thermos-style vacuum insulated sipper bottle suitable for executive gifting, festive hampers, office branding, and premium merchandise. Long temperature retention makes it ideal for corporate luxury gifting.",
    HSNCode: "73239390",
    type: "Sipper Bottle",
    quantity: 450,
    GSTRate: 18,
    brand: "HydraPro",
    fabricType: "Vacuum Insulated Steel",
    size: ["500ml"],
    colour: ["Matte Black"],
    weight: 480,
    dimensions: { length: 23, width: 7, height: 7 },
    minOrderQty: 10,
    maxOrderQty: 300,
    availabilityDate: new Date(),
    price: {
      priceCode: "SB-THERMOS-PRICE",
      singlePrice: 599,
      sales_0_50: 569,
      sales_50_100: 549,
      sales_100_above: 529,
      discountPrice: 569,
      discount: { type: "percentage", value: 5, validUntil: new Date("2025-12-31") },
      currency: "INR",
      taxIncluded: true,
      effectiveFrom: new Date(),
      effectiveTo: new Date("2025-12-31")
    },
    image: "/assets/products/sipperbottles/18.webp",
    subImages: [
      "/assets/products/sipperbottles/18.webp",
      "/assets/products/sipperbottles/19.webp",
      "/assets/products/sipperbottles/20.webp"
    ],
    tags: [
      "thermos bottle",
      "vacuum insulated bottle",
      "luxury corporate gifting",
      "executive gift bottle",
      "branded premium bottle"
    ],
    keywords: [
      "thermos corporate bottle",
      "premium vacuum bottle india",
      "executive gifting bottle"
    ],
    isFeatured: true,
    isPublished: true,
    isDeleted: false,
    ratings: { average: 4.9, count: 75 },
    metaTitle:
      "Thermos Style Vacuum Insulated Sipper Bottle | Premium Corporate Gifting India",
    metaDescription:
      "Luxury thermos-style vacuum sipper bottle with custom branding. Perfect for premium corporate gifting. Bulk delivery PAN India.",
    audit: { createdBy: "admin", updatedBy: "admin" }
  }
];

module.exports = sipperBottles;
