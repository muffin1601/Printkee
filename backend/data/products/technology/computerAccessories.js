const computerAccessories = [
  // =============================================================
  // MOUSE (4 ITEMS) — Each 3 Subimages
  // =============================================================

  // -------------------------------------------------------------
  // PRODUCT 1 (Images 1–3)
  // -------------------------------------------------------------
  {
    productCode: "CA-MOUSE-001",
    SKU: "OPTICAL-MOUSE-CLASSIC",
    name: "Classic Optical USB Mouse",
    slug: "classic-optical-usb-mouse",
    description:
      "Reliable plug-and-play USB optical mouse perfect for corporate offices, employee kits, startups, IT companies, and bulk onboarding requirements. Custom branding and logo printing available across Delhi NCR, Noida, Gurgaon, Okhla, Faridabad, and PAN India.",
    HSNCode: "84716060",
    type: "Computer Accessories",
    quantity: 600,
    GSTRate: 18,
    brand: "TechWorks",
    fabricType: "ABS Plastic",
    size: ["Standard"],
    colour: ["Black"],
    weight: 90,
    dimensions: { length: 11, width: 6, height: 4 },
    minOrderQty: 20,
    maxOrderQty: 400,
    availabilityDate: new Date(),
    price: {
      priceCode: "CA-MOUSE-001-PRICE",
      singlePrice: 249,
      sales_0_50: 229,
      sales_50_100: 219,
      sales_100_above: 199,
      discountPrice: 229,
      discount: { type: "percentage", value: 8, validUntil: new Date("2025-12-31") },
      currency: "INR",
      taxIncluded: true,
      effectiveFrom: new Date(),
      effectiveTo: new Date("2025-12-31")
    },
    image: "/assets/products/computeraccessories/1.webp",
    subImages: [
      "/assets/products/computeraccessories/1.webp",
      "/assets/products/computeraccessories/2.webp",
      "/assets/products/computeraccessories/3.webp"
    ],
    tags: [
      "USB mouse",
      "optical mouse",
      "office computer accessories",
      "corporate IT kit",
      "custom branded mouse"
    ],
    keywords: [
      "usb mouse",
      "corporate mouse",
      "computer accessories India",
      "Delhi NCR tech gifts"
    ],
    isFeatured: true,
    isPublished: true,
    isDeleted: false,
    ratings: { average: 4.5, count: 130 },
    metaTitle: "Classic Optical USB Mouse | Corporate Computer Accessories India",
    metaDescription:
      "USB optical mouse for corporate offices and bulk onboarding. Custom logo printing available. Delivery in Delhi NCR & all India.",
    audit: { createdBy: "admin", updatedBy: "admin" }
  },

  // -------------------------------------------------------------
  // PRODUCT 2 (Images 4–6)
  // -------------------------------------------------------------
  {
    productCode: "CA-MOUSE-002",
    SKU: "WIRELESS-MOUSE-SILENT",
    name: "Wireless Silent Mouse",
    slug: "wireless-silent-mouse",
    description:
      "Silent-click wireless mouse perfect for modern offices, premium employee welcome kits, and branded corporate gifting. Long battery life and smooth performance. Bulk customization available PAN India.",
    HSNCode: "84716060",
    type: "Computer Accessories",
    quantity: 450,
    GSTRate: 18,
    brand: "TechWorks",
    fabricType: "ABS Plastic",
    size: ["Standard"],
    colour: ["Grey"],
    weight: 80,
    dimensions: { length: 11, width: 6, height: 3.5 },
    minOrderQty: 10,
    maxOrderQty: 300,
    availabilityDate: new Date(),
    price: {
      priceCode: "CA-MOUSE-002-PRICE",
      singlePrice: 399,
      sales_0_50: 379,
      sales_50_100: 359,
      sales_100_above: 339,
      discountPrice: 379,
      discount: { type: "percentage", value: 5, validUntil: new Date("2025-12-31") },
      currency: "INR",
      taxIncluded: true,
      effectiveFrom: new Date(),
      effectiveTo: new Date("2025-12-31")
    },
    image: "/assets/products/computeraccessories/4.webp",
    subImages: [
      "/assets/products/computeraccessories/4.webp",
      "/assets/products/computeraccessories/5.webp",
      "/assets/products/computeraccessories/6.webp"
    ],
    tags: [
      "wireless mouse",
      "silent mouse",
      "corporate wireless accessories",
      "custom logo mouse"
    ],
    keywords: [
      "wireless office mouse",
      "corporate tech gifts",
      "IT accessories Noida Gurgaon"
    ],
    isFeatured: true,
    isPublished: true,
    isDeleted: false,
    ratings: { average: 4.7, count: 98 },
    metaTitle: "Wireless Silent Mouse | Custom Corporate IT Accessories India",
    metaDescription:
      "Wireless silent mouse ideal for corporate gifting and office use. Custom branding available. PAN India bulk orders supported.",
    audit: { createdBy: "admin", updatedBy: "admin" }
  },

  // -------------------------------------------------------------
  // PRODUCT 3 (Images 7–9)
  // -------------------------------------------------------------
  {
    productCode: "CA-MOUSE-003",
    SKU: "ERGONOMIC-MOUSE-PRO",
    name: "Ergonomic Professional Mouse",
    slug: "ergonomic-professional-mouse",
    description:
      "Ergonomic mouse designed for long office hours, IT teams, designers, and corporate professionals. Ideal for health-conscious workplaces and corporate branding. Available for bulk orders.",
    HSNCode: "84716060",
    type: "Computer Accessories",
    quantity: 300,
    GSTRate: 18,
    brand: "TechWorks",
    fabricType: "ABS + Silicone Grip",
    size: ["Standard"],
    colour: ["Black"],
    weight: 140,
    dimensions: { length: 12, width: 7, height: 4.5 },
    minOrderQty: 5,
    maxOrderQty: 200,
    availabilityDate: new Date(),
    price: {
      priceCode: "CA-MOUSE-003-PRICE",
      singlePrice: 799,
      sales_0_50: 749,
      sales_50_100: 699,
      sales_100_above: 649,
      discountPrice: 749,
      discount: { type: "percentage", value: 6, validUntil: new Date("2025-12-31") },
      currency: "INR",
      taxIncluded: true,
      effectiveFrom: new Date(),
      effectiveTo: new Date("2025-12-31")
    },
    image: "/assets/products/computeraccessories/7.webp",
    subImages: [
      "/assets/products/computeraccessories/7.webp",
      "/assets/products/computeraccessories/8.webp",
      "/assets/products/computeraccessories/9.webp"
    ],
    tags: [
      "ergonomic mouse",
      "professional office mouse",
      "corporate IT accessories",
      "premium branded mouse"
    ],
    keywords: [
      "ergonomic mouse India",
      "corporate productivity accessories",
      "office ergonomic gear"
    ],
    isFeatured: false,
    isPublished: true,
    isDeleted: false,
    ratings: { average: 4.8, count: 72 },
    metaTitle: "Ergonomic Professional Mouse | Premium Office IT Accessories",
    metaDescription:
      "Ergonomic professional mouse for long working hours and corporate employees. Custom branding & bulk supply available.",
    audit: { createdBy: "admin", updatedBy: "admin" }
  },

  // -------------------------------------------------------------
  // PRODUCT 4 (Images 10–12)
  // -------------------------------------------------------------
  {
    productCode: "CA-MOUSE-004",
    SKU: "BT-MOUSE-ULTRA",
    name: "Bluetooth Ultra-Slim Mouse",
    slug: "bluetooth-ultra-slim-mouse",
    description:
      "Ultra-slim Bluetooth mouse with premium finish, perfect for modern offices, IT companies, and high-end corporate gifting. Travel-friendly, silent, stylish, and available for custom branding.",
    HSNCode: "84716060",
    type: "Computer Accessories",
    quantity: 420,
    GSTRate: 18,
    brand: "TechWorks",
    fabricType: "Aluminum + ABS",
    size: ["Slim"],
    colour: ["Silver"],
    weight: 70,
    dimensions: { length: 12, width: 6, height: 2 },
    minOrderQty: 10,
    maxOrderQty: 350,
    availabilityDate: new Date(),
    price: {
      priceCode: "CA-MOUSE-004-PRICE",
      singlePrice: 999,
      sales_0_50: 949,
      sales_50_100: 899,
      sales_100_above: 849,
      discountPrice: 949,
      discount: { type: "percentage", value: 5, validUntil: new Date("2025-12-31") },
      currency: "INR",
      taxIncluded: true,
      effectiveFrom: new Date(),
      effectiveTo: new Date("2025-12-31")
    },
    image: "/assets/products/computeraccessories/10.webp",
    subImages: [
      "/assets/products/computeraccessories/10.webp",
      "/assets/products/computeraccessories/11.webp",
      "/assets/products/computeraccessories/12.webp"
    ],
    tags: [
      "bluetooth mouse",
      "ultra slim mouse",
      "premium tech gifting",
      "corporate accessories India"
    ],
    keywords: [
      "slim wireless mouse",
      "Bluetooth mouse India",
      "corporate tech gift"
    ],
    isFeatured: true,
    isPublished: true,
    isDeleted: false,
    ratings: { average: 4.6, count: 89 },
    metaTitle: "Bluetooth Ultra-Slim Mouse | Corporate Tech Gifts India",
    metaDescription:
      "Ultra-slim Bluetooth mouse ideal for premium corporate gifting & office use. Custom branding & bulk supply PAN India.",
    audit: { createdBy: "admin", updatedBy: "admin" }
  },

  // =============================================================
  // KEYBOARDS (4 ITEMS) — Each 3 Subimages
  // =============================================================

  // -------------------------------------------------------------
  // PRODUCT 5 (Images 13–15)
  // -------------------------------------------------------------
  {
    productCode: "CA-KEYBOARD-001",
    SKU: "WIRED-KEYBOARD-OFFICE",
    name: "Standard Wired Office Keyboard",
    slug: "standard-wired-office-keyboard",
    description:
      "Durable wired office keyboard designed for daily corporate use, bulk IT setups, and employee onboarding kits. Spill-resistant and comfortable typing experience. Bulk orders accepted across India.",
    HSNCode: "84716040",
    type: "Computer Accessories",
    quantity: 700,
    GSTRate: 18,
    brand: "TechWorks",
    fabricType: "ABS Plastic",
    size: ["Full Size"],
    colour: ["Black"],
    weight: 550,
    dimensions: { length: 45, width: 15, height: 3 },
    minOrderQty: 20,
    maxOrderQty: 500,
    availabilityDate: new Date(),
    price: {
      priceCode: "CA-KEYBOARD-001-PRICE",
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
    image: "/assets/products/computeraccessories/13.webp",
    subImages: [
      "/assets/products/computeraccessories/13.webp",
      "/assets/products/computeraccessories/14.webp",
      "/assets/products/computeraccessories/15.webp"
    ],
    tags: [
      "wired keyboard",
      "office keyboard",
      "corporate IT setup",
      "employee workstation setup"
    ],
    keywords: [
      "office keyboard India",
      "corporate keyboard bulk",
      "Delhi NCR IT accessories"
    ],
    isFeatured: false,
    isPublished: true,
    isDeleted: false,
    ratings: { average: 4.4, count: 120 },
    metaTitle: "Standard Wired Office Keyboard | Corporate IT Accessories India",
    metaDescription:
      "Spill-resistant wired office keyboard ideal for corporate IT setups & onboarding kits. Bulk delivery PAN India.",
    audit: { createdBy: "admin", updatedBy: "admin" }
  },

  // -------------------------------------------------------------
  // PRODUCT 6 (Images 16–18)
  // -------------------------------------------------------------
  {
    productCode: "CA-KEYBOARD-002",
    SKU: "WIRELESS-KEYBOARD-COMPACT",
    name: "Compact Wireless Keyboard",
    slug: "compact-wireless-keyboard",
    description:
      "Portable compact wireless keyboard ideal for remote teams, laptops, employee kits, and premium corporate gifting. Sleek, lightweight, and available with custom branding across India.",
    HSNCode: "84716040",
    type: "Computer Accessories",
    quantity: 500,
    GSTRate: 18,
    brand: "TechWorks",
    fabricType: "ABS Plastic",
    size: ["Compact"],
    colour: ["White"],
    weight: 350,
    dimensions: { length: 35, width: 15, height: 2.5 },
    minOrderQty: 10,
    maxOrderQty: 300,
    availabilityDate: new Date(),
    price: {
      priceCode: "CA-KEYBOARD-002-PRICE",
      singlePrice: 799,
      sales_0_50: 759,
      sales_50_100: 729,
      sales_100_above: 699,
      discountPrice: 759,
      discount: { type: "percentage", value: 5, validUntil: new Date("2025-12-31") },
      currency: "INR",
      taxIncluded: true,
      effectiveFrom: new Date(),
      effectiveTo: new Date("2025-12-31")
    },
    image: "/assets/products/computeraccessories/16.webp",
    subImages: [
      "/assets/products/computeraccessories/16.webp",
      "/assets/products/computeraccessories/17.webp",
      "/assets/products/computeraccessories/18.webp"
    ],
    tags: [
      "wireless keyboard",
      "compact keyboard",
      "work from home accessories",
      "corporate tech gifts"
    ],
    keywords: [
      "compact wireless keyboard",
      "csr tech gifts",
      "office keyboard gifting"
    ],
    isFeatured: true,
    isPublished: true,
    isDeleted: false,
    ratings: { average: 4.7, count: 105 },
    metaTitle: "Compact Wireless Keyboard | Premium Corporate Tech Accessories",
    metaDescription:
      "Lightweight wireless keyboard ideal for remote work & employee kits. Custom branding available PAN India.",
    audit: { createdBy: "admin", updatedBy: "admin" }
  },

  // -------------------------------------------------------------
  // PRODUCT 7 (Images 19–21)
  // -------------------------------------------------------------
  {
    productCode: "CA-KEYBOARD-003",
    SKU: "BT-KEYBOARD-MULTI",
    name: "Multi-Device Bluetooth Keyboard",
    slug: "multi-device-bluetooth-keyboard",
    description:
      "Premium Bluetooth keyboard that connects to laptops, tablets, mobiles, and desktops. Ideal for hybrid working teams, corporate executives, and branded gifting. Supports customizable printing.",
    HSNCode: "84716040",
    type: "Computer Accessories",
    quantity: 300,
    GSTRate: 18,
    brand: "TechWorks",
    fabricType: "ABS + Silicone Keys",
    size: ["Compact"],
    colour: ["Black"],
    weight: 380,
    dimensions: { length: 28, width: 12, height: 2 },
    minOrderQty: 5,
    maxOrderQty: 200,
    availabilityDate: new Date(),
    price: {
      priceCode: "CA-KEYBOARD-003-PRICE",
      singlePrice: 1299,
      sales_0_50: 1249,
      sales_50_100: 1199,
      sales_100_above: 1149,
      discountPrice: 1249,
      discount: { type: "percentage", value: 4, validUntil: new Date("2025-12-31") },
      currency: "INR",
      taxIncluded: true,
      effectiveFrom: new Date(),
      effectiveTo: new Date("2025-12-31")
    },
    image: "/assets/products/computeraccessories/19.webp",
    subImages: [
      "/assets/products/computeraccessories/19.webp",
      "/assets/products/computeraccessories/20.webp",
      "/assets/products/computeraccessories/21.webp"
    ],
    tags: [
      "bluetooth keyboard",
      "multi device keyboard",
      "corporate tech gadgets",
      "premium gifting India"
    ],
    keywords: [
      "multi device keyboard",
      "bluetooth office keyboard",
      "corporate tech gifting"
    ],
    isFeatured: true,
    isPublished: true,
    isDeleted: false,
    ratings: { average: 4.8, count: 80 },
    metaTitle: "Multi-Device Bluetooth Keyboard | Premium Corporate Gifts India",
    metaDescription:
      "Bluetooth keyboard for laptops, tablets & phones. Premium corporate gift with custom branding. PAN India supply.",
    audit: { createdBy: "admin", updatedBy: "admin" }
  },

  // -------------------------------------------------------------
  // PRODUCT 8 (Images 22–24)
  // -------------------------------------------------------------
  {
    productCode: "CA-KEYBOARD-004",
    SKU: "MECHANICAL-KEYBOARD-PRO",
    name: "Professional Mechanical Keyboard",
    slug: "professional-mechanical-keyboard",
    description:
      "High-performance professional mechanical keyboard ideal for developers, IT teams, gamers, and corporate tech departments. Customizable keycaps and branding available for bulk corporate gifting.",
    HSNCode: "84716040",
    type: "Computer Accessories",
    quantity: 250,
    GSTRate: 18,
    brand: "TechWorks",
    fabricType: "ABS + Mechanical Switches",
    size: ["Full Size"],
    colour: ["Black"],
    weight: 900,
    dimensions: { length: 44, width: 15, height: 4 },
    minOrderQty: 5,
    maxOrderQty: 150,
    availabilityDate: new Date(),
    price: {
      priceCode: "CA-KEYBOARD-004-PRICE",
      singlePrice: 2499,
      sales_0_50: 2399,
      sales_50_100: 2299,
      sales_100_above: 2199,
      discountPrice: 2399,
      discount: { type: "percentage", value: 4, validUntil: new Date("2025-12-31") }, 
      currency: "INR",
      taxIncluded: true,
      effectiveFrom: new Date(),
      effectiveTo: new Date("2025-12-31")  
    },
    image: "/assets/products/computeraccessories/22.webp",
    subImages: [
      "/assets/products/computeraccessories/22.webp",
      "/assets/products/computeraccessories/23.webp",
      "/assets/products/computeraccessories/24.webp"
    ],
    tags: [
      "mechanical keyboard",
      "professional keyboard",
      "IT department accessories",
      "corporate tech hardware"
    ],
    keywords: [
      "mechanical keyboard India",
      "developer keyboard",
      "corporate premium keyboard"
    ],
    isFeatured: true,
    isPublished: true,
    isDeleted: false,
    ratings: { average: 4.9, count: 60 },
    metaTitle: "Professional Mechanical Keyboard | Corporate IT Gifts India",
    metaDescription:
      "Professional mechanical keyboard ideal for tech teams & gifting. Custom branding & bulk supply across India.",
    audit: { createdBy: "admin", updatedBy: "admin" }
  }
];

module.exports = computerAccessories;
