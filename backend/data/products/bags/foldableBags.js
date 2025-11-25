const foldableBags = [
  // -------------------------------------------------------------
  // PRODUCT 1 — Images 1–3
  // -------------------------------------------------------------
  {
    productCode: "FB-FOLD-001",
    SKU: "FOLD-BAG-COMPACT",
    name: "Compact Foldable Shopping Bag",
    slug: "compact-foldable-shopping-bag",
    description:
      "Lightweight compact foldable shopping bag ideal for corporate gifting, event giveaways, employee kits, CSR activities, and promotional branding. Reusable eco-friendly bag with custom logo printing. Bulk delivery across Delhi NCR, Noida, Gurgaon, Okhla, Faridabad & PAN India.",
    HSNCode: "42029200",
    type: "Foldable Bag",
    quantity: 800,
    GSTRate: 18,
    brand: "EcoCarry",
    fabricType: "Polyester",
    size: ["Standard"],
    colour: ["Blue"],
    weight: 150,
    dimensions: { length: 40, width: 35, height: 1 },
    minOrderQty: 20,
    maxOrderQty: 800,
    availabilityDate: new Date(),
    price: {
      priceCode: "FB-FOLD-PRICE-001",
      singlePrice: 129,
      sales_0_50: 119,
      sales_50_100: 109,
      sales_100_above: 99,
      discountPrice: 119,
      discount: {
        type: "percentage",
        value: 8,
        validUntil: new Date("2025-12-31"),
      },
      currency: "INR",
      taxIncluded: true,
      effectiveFrom: new Date(),
      effectiveTo: new Date("2025-12-31"),
    },
    image: "/assets/products/foldablebags/1.webp",
    subImages: [
      "/assets/products/foldablebags/1.webp",
      "/assets/products/foldablebags/2.webp",
      "/assets/products/foldablebags/3.webp"
    ],
    tags: [
      "foldable bag",
      "compact reusable bag",
      "corporate gifting bag",
      "custom printed foldable bag",
      "eco friendly promotional bags",
      "Delhi NCR corporate gifts"
    ],
    keywords: [
      "foldable shopping bag",
      "eco friendly bags india",
      "corporate event giveaway bag",
      "custom branding bags",
      "Noida Gurgaon Faridabad"
    ],
    isFeatured: true,
    isPublished: true,
    isDeleted: false,
    ratings: { average: 4.5, count: 105 },
    metaTitle:
      "Compact Foldable Shopping Bag | Eco-Friendly Corporate Gifting India",
    metaDescription:
      "Reusable foldable shopping bag with custom branding for corporate gifting & events. Bulk supply in Delhi NCR, Noida, Gurgaon & across India.",
    audit: { createdBy: "admin", updatedBy: "admin" }
  },

  // -------------------------------------------------------------
  // PRODUCT 2 — Images 4–6
  // -------------------------------------------------------------
  {
    productCode: "FB-FOLD-002",
    SKU: "FOLD-BAG-ZIP",
    name: "Zipper Foldable Tote Bag",
    slug: "zipper-foldable-tote-bag",
    description:
      "Durable zipper foldable tote bag ideal for corporate promotions, event merchandising, employee welcome kits, and branded gifting. Folds into a compact pouch with a large print area for logos. Bulk delivery available across Delhi NCR & India.",
    HSNCode: "42029200",
    type: "Foldable Bag",
    quantity: 650,
    GSTRate: 18,
    brand: "EcoCarry",
    fabricType: "Nylon",
    size: ["Large"],
    colour: ["Red"],
    weight: 180,
    dimensions: { length: 42, width: 38, height: 2 },
    minOrderQty: 20,
    maxOrderQty: 600,
    availabilityDate: new Date(),
    price: {
      priceCode: "FB-FOLD-PRICE-002",
      singlePrice: 159,
      sales_0_50: 149,
      sales_50_100: 139,
      sales_100_above: 129,
      discountPrice: 149,
      discount: {
        type: "percentage",
        value: 7,
        validUntil: new Date("2025-12-31"),
      },
      currency: "INR",
      taxIncluded: true,
      effectiveFrom: new Date(),
      effectiveTo: new Date("2025-12-31"),
    },
    image: "/assets/products/foldablebags/4.webp",
    subImages: [
      "/assets/products/foldablebags/4.webp",
      "/assets/products/foldablebags/5.webp",
      "/assets/products/foldablebags/6.webp"
    ],
    tags: [
      "foldable tote bag",
      "zipper tote bag",
      "corporate promotional bag",
      "custom printed tote bag",
      "event merchandising bag",
      "branding bags india"
    ],
    keywords: [
      "zipper foldable bag",
      "corporate gifting tote bag",
      "custom branded tote bag",
      "event promotional bags",
      "Delhi Noida Gurgaon"
    ],
    isFeatured: true,
    isPublished: true,
    isDeleted: false,
    ratings: { average: 4.6, count: 95 },
    metaTitle:
      "Zipper Foldable Tote Bag | Custom Printed Corporate Promotional Bags",
    metaDescription:
      "Durable foldable tote bags with zipper & custom branding. Perfect for corporate gifting & events. Bulk orders across Delhi NCR & India.",
    audit: { createdBy: "admin", updatedBy: "admin" }
  },

  // -------------------------------------------------------------
  // PRODUCT 3 — Images 7–10 (4 subImages)
  // -------------------------------------------------------------
  {
    productCode: "FB-FOLD-003",
    SKU: "FOLD-BAG-PREMIUM",
    name: "Premium Foldable Travel Bag",
    slug: "premium-foldable-travel-bag",
    description:
      "Premium foldable travel bag designed for executive gifting, corporate travel kits, event giveaways, and brand promotions. Spacious, durable, and easily foldable into a compact pouch. Custom logo printing available for B2B orders in Delhi NCR & PAN India.",
    HSNCode: "42029200",
    type: "Foldable Bag",
    quantity: 500,
    GSTRate: 18,
    brand: "EcoCarry",
    fabricType: "Oxford Polyester",
    size: ["XL"],
    colour: ["Black"],
    weight: 320,
    dimensions: { length: 50, width: 40, height: 22 },
    minOrderQty: 10,
    maxOrderQty: 400,
    availabilityDate: new Date(),
    price: {
      priceCode: "FB-FOLD-PRICE-003",
      singlePrice: 249,
      sales_0_50: 239,
      sales_50_100: 219,
      sales_100_above: 199,
      discountPrice: 239,
      discount: {
        type: "percentage",
        value: 5,
        validUntil: new Date("2025-12-31"),
      },
      currency: "INR",
      taxIncluded: true,
      effectiveFrom: new Date(),
      effectiveTo: new Date("2025-12-31"),
    },
    image: "/assets/products/foldablebags/7.webp",
    subImages: [
      "/assets/products/foldablebags/7.webp",
      "/assets/products/foldablebags/8.webp",
      "/assets/products/foldablebags/9.webp",
      "/assets/products/foldablebags/10.webp"
    ],
    tags: [
      "foldable travel bag",
      "premium corporate gifting bag",
      "custom branded travel bag",
      "event giveaway bags",
      "executive gifting india",
      "foldable corporate bags"
    ],
    keywords: [
      "premium foldable bag",
      "corporate gifting travel bag",
      "branded travel bags india",
      "event promotional bags",
      "Delhi NCR corporate supplier"
    ],
    isFeatured: true,
    isPublished: true,
    isDeleted: false,
    ratings: { average: 4.9, count: 85 },
    metaTitle:
      "Premium Foldable Travel Bag | Custom Branded Corporate Gift Bags India",
    metaDescription:
      "High-quality foldable travel bags with custom logo printing for corporate gifting & events. Bulk supply across Delhi NCR, Noida, Gurgaon & India.",
    audit: { createdBy: "admin", updatedBy: "admin" }
  }
];

module.exports = foldableBags;
