const filesAndFolders = [
  // -------------------------------------------------------------
  // PRODUCT 1  (Images 1–3)
  // -------------------------------------------------------------
  {
    productCode: "FF-A4-PRO-001",
    SKU: "A4-PRO-FILE",
    name: "A4 Professional Document File",
    slug: "a4-professional-document-file",
    description:
      "Premium A4 professional document file designed for corporate offices, conferences, HR departments, onboarding kits, and business presentations. Ideal for custom logo printing and bulk promotional gifting across Delhi NCR, Noida, Gurgaon, Okhla, Faridabad, and all over India.",
    HSNCode: "48203000",
    type: "Office Supplies",
    quantity: 800,
    GSTRate: 18,
    brand: "OfficeMaster",
    fabricType: "Polypropylene",
    size: ["A4"],
    colour: ["Black"],
    weight: 180,
    dimensions: { length: 31, width: 24, height: 2 },
    minOrderQty: 20,
    maxOrderQty: 500,
    availabilityDate: new Date(),
    price: {
      priceCode: "FF-A4-PRO-PRICE",
      singlePrice: 149,
      sales_0_50: 129,
      sales_50_100: 119,
      sales_100_above: 109,
      discountPrice: 129,
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
    image: "/assets/products/filesfolder/1.webp",
    subImages: [
      "/assets/products/filesfolder/1.webp",
      "/assets/products/filesfolder/2.webp",
      "/assets/products/filesfolder/3.webp"
    ],
    tags: [
      "A4 file",
      "professional file",
      "corporate document file",
      "custom printed office file",
      "promotional file with logo",
      "corporate stationery Delhi NCR"
    ],
    keywords: [
      "a4 file",
      "corporate file supplier",
      "custom printed document file",
      "branding file folder",
      "Delhi NCR Noida Gurgaon"
    ],
    isFeatured: true,
    isPublished: true,
    isDeleted: false,
    ratings: { average: 4.6, count: 120 },
    metaTitle:
      "A4 Professional Document File with Custom Printing | Corporate Gifting Delhi NCR",
    metaDescription:
      "A4 professional document file with custom logo printing for corporate offices, onboarding kits, branding & bulk gifting. Delivery in Delhi NCR, Noida, Gurgaon, Okhla & across India.",
    audit: { createdBy: "admin", updatedBy: "admin" }
  },

  // -------------------------------------------------------------
  // PRODUCT 2  (Images 4–6)
  // -------------------------------------------------------------
  {
    productCode: "FF-EXPAND-002",
    SKU: "EXPAND-FOLDER",
    name: "Expandable Accordion File Folder",
    slug: "expandable-accordion-file-folder",
    description:
      "Durable multi-pocket expandable accordion file folder ideal for corporate document storage, employee kits, onboarding essentials, and branded promotional gifting. Available for bulk supply and custom printing across Delhi NCR, Noida, Gurgaon, and all over India.",
    HSNCode: "48203000",
    type: "Office Supplies",
    quantity: 600,
    GSTRate: 18,
    brand: "OfficeMaster",
    fabricType: "PP Sheet",
    size: ["A4"],
    colour: ["Blue"],
    weight: 300,
    dimensions: { length: 33, width: 25, height: 5 },
    minOrderQty: 10,
    maxOrderQty: 300,
    availabilityDate: new Date(),
    price: {
      priceCode: "FF-EXPAND-PRICE",
      singlePrice: 249,
      sales_0_50: 229,
      sales_50_100: 209,
      sales_100_above: 199,
      discountPrice: 229,
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
    image: "/assets/products/filesfolder/4.webp",
    subImages: [
      "/assets/products/filesfolder/4.webp",
      "/assets/products/filesfolder/5.webp",
      "/assets/products/filesfolder/6.webp"
    ],
    tags: [
      "accordion file folder",
      "expandable multi-pocket file",
      "corporate stationery",
      "custom logo printed file",
      "office supplies bulk order",
      "corporate gifting India"
    ],
    keywords: [
      "expandable file folder",
      "multi-pocket file",
      "corporate file storage",
      "custom printed office supplies",
      "Delhi NCR Noida Gurgaon"
    ],
    isFeatured: true,
    isPublished: true,
    isDeleted: false,
    ratings: { average: 4.5, count: 95 },
    metaTitle:
      "Expandable Accordion File Folder | Custom Printed Corporate Files",
    metaDescription:
      "Premium expandable file folder with multi-pocket storage for corporate offices & employee kits. Custom branding + bulk delivery in Delhi NCR, Gurgaon, Noida & across India.",
    audit: { createdBy: "admin", updatedBy: "admin" }
  },

  // -------------------------------------------------------------
  // PRODUCT 3  (Images 7–9)
  // -------------------------------------------------------------
  {
    productCode: "FF-LF-003",
    SKU: "LEATHER-FILE",
    name: "Leather Executive File Folder",
    slug: "leather-executive-file-folder",
    description:
      "Premium PU leather executive file folder ideal for corporate meetings, luxury gifting, conferences, CEO kits, and brand promotions. Perfect for custom embossing, logo printing, and corporate branding across Delhi NCR and all India.",
    HSNCode: "42023120",
    type: "Office Supplies",
    quantity: 350,
    GSTRate: 18,
    brand: "OfficeMaster",
    fabricType: "PU Leather",
    size: ["A4"],
    colour: ["Brown"],
    weight: 450,
    dimensions: { length: 33, width: 25, height: 3 },
    minOrderQty: 5,
    maxOrderQty: 200,
    availabilityDate: new Date(),
    price: {
      priceCode: "FF-LEATHER-PRICE",
      singlePrice: 899,
      sales_0_50: 849,
      sales_50_100: 799,
      sales_100_above: 749,
      discountPrice: 849,
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
    image: "/assets/products/filesfolder/7.webp",
    subImages: [
      "/assets/products/filesfolder/7.webp",
      "/assets/products/filesfolder/8.webp",
      "/assets/products/filesfolder/9.webp"
    ],
    tags: [
      "leather executive file folder",
      "premium corporate gifting",
      "luxury file folder",
      "custom embossed leather folder",
      "executive meeting file",
      "corporate gifting Delhi NCR"
    ],
    keywords: [
      "leather office file",
      "executive folder",
      "corporate premium gifting",
      "branded leather file",
      "Delhi Noida Gurgaon"
    ],
    isFeatured: true,
    isPublished: true,
    isDeleted: false,
    ratings: { average: 4.8, count: 75 },
    metaTitle: "Leather Executive File Folder | Premium Corporate Gifts India",
    metaDescription:
      "High-quality PU leather executive file folder with custom embossing. Ideal for premium corporate gifting in Delhi NCR, Noida, Gurgaon & pan India.",
    audit: { createdBy: "admin", updatedBy: "admin" }
  },

  // -------------------------------------------------------------
  // PRODUCT 4  (Images 10–12)
  // -------------------------------------------------------------
  {
    productCode: "FF-CLIP-004",
    SKU: "CLIP-FILE",
    name: "Plastic A4 Clip File",
    slug: "plastic-a4-clip-file",
    description:
      "Durable and lightweight A4 clip file widely used in corporate offices, HR onboarding kits, training programs, employee induction kits, and branded promotional gifting. Custom logo printing available across Delhi NCR, Noida, Gurgaon, Faridabad, and all India.",
    HSNCode: "48203000",
    type: "Office Supplies",
    quantity: 900,
    GSTRate: 18,
    brand: "OfficeMaster",
    fabricType: "Plastic",
    size: ["A4"],
    colour: ["Transparent"],
    weight: 120,
    dimensions: { length: 31, width: 23, height: 1 },
    minOrderQty: 50,
    maxOrderQty: 800,
    availabilityDate: new Date(),
    price: {
      priceCode: "FF-CLIP-PRICE",
      singlePrice: 79,
      sales_0_50: 69,
      sales_50_100: 64,
      sales_100_above: 59,
      discountPrice: 69,
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
    image: "/assets/products/filesfolder/10.webp",
    subImages: [
      "/assets/products/filesfolder/10.webp",
      "/assets/products/filesfolder/11.webp",
      "/assets/products/filesfolder/12.webp"
    ],
    tags: [
      "clip file",
      "corporate stationery",
      "HR onboarding kit",
      "custom branded clip file",
      "bulk office stationery India",
      "corporate supply Delhi NCR"
    ],
    keywords: [
      "clip file a4",
      "corporate stationery supplier",
      "custom printed file",
      "HR kit items",
      "Delhi Gurgaon Noida"
    ],
    isFeatured: false,
    isPublished: true,
    isDeleted: false,
    ratings: { average: 4.3, count: 140 },
    metaTitle:
      "Plastic A4 Clip File with Custom Branding | Corporate Stationery Supplier",
    metaDescription:
      "Plastic A4 clip file for office use with custom printing. Ideal for HR onboarding kits & corporate stationery. Bulk delivery in Delhi NCR, Noida & Gurgaon.",
    audit: { createdBy: "admin", updatedBy: "admin" }
  },

  // -------------------------------------------------------------
  // PRODUCT 5  (Images 13–15)
  // -------------------------------------------------------------
  {
    productCode: "FF-MESH-005",
    SKU: "MESH-DOCUMENT",
    name: "Mesh Zipper Document Bag",
    slug: "mesh-zipper-document-bag",
    description:
      "Premium mesh zipper document bag for employee welcome kits, branded corporate gifting, event giveaways, and secure document handling. Custom logo printing available for bulk orders across Delhi NCR, Gurgaon, Noida, Okhla, Faridabad, and India.",
    HSNCode: "42022220",
    type: "Office Supplies",
    quantity: 700,
    GSTRate: 18,
    brand: "OfficeMaster",
    fabricType: "PVC Mesh",
    size: ["A4"],
    colour: ["White"],
    weight: 160,
    dimensions: { length: 34, width: 26, height: 1 },
    minOrderQty: 20,
    maxOrderQty: 500,
    availabilityDate: new Date(),
    price: {
      priceCode: "FF-MESH-PRICE",
      singlePrice: 129,
      sales_0_50: 119,
      sales_50_100: 109,
      sales_100_above: 99,
      discountPrice: 119,
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
    image: "/assets/products/filesfolder/13.webp",
    subImages: [
      "/assets/products/filesfolder/13.webp",
      "/assets/products/filesfolder/14.webp",
      "/assets/products/filesfolder/15.webp"
    ],
    tags: [
      "zipper document bag",
      "mesh file pouch",
      "custom printed document pouch",
      "corporate welcome kit supplies",
      "office document bag",
      "promotional gifting India"
    ],
    keywords: [
      "zipper pouch",
      "document bag",
      "employee kit items",
      "corporate promotional gift",
      "Delhi NCR India"
    ],
    isFeatured: false,
    isPublished: true,
    isDeleted: false,
    ratings: { average: 4.4, count: 90 },
    metaTitle:
      "Mesh Zipper Document Bag | Custom Printed Corporate Welcome Kit Pouch",
    metaDescription:
      "Premium mesh zipper document bag with custom printing for employee kits & branded giveaways. Bulk supply in Noida, Gurgaon, Delhi NCR & across India.",
    audit: { createdBy: "admin", updatedBy: "admin" }
  },

  // -------------------------------------------------------------
  // PRODUCT 6  (Images 16–18)
  // -------------------------------------------------------------
  {
    productCode: "FF-BOX-006",
    SKU: "FILE-STORAGE-BOX",
    name: "A4 File Storage Box",
    slug: "a4-file-storage-box",
    description:
      "Heavy-duty A4 file storage box designed for long-term corporate document archiving, HR records, finance files, and administrative storage. Available with custom branding for bulk orders across Delhi NCR, Noida, Gurgaon, Okhla, Faridabad, and pan India.",
    HSNCode: "48196000",
    type: "Office Supplies",
    quantity: 500,
    GSTRate: 18,
    brand: "OfficeMaster",
    fabricType: "Hard Board",
    size: ["A4"],
    colour: ["Brown"],
    weight: 600,
    dimensions: { length: 35, width: 26, height: 12 },
    minOrderQty: 10,
    maxOrderQty: 150,
    availabilityDate: new Date(),
    price: {
      priceCode: "FF-BOX-PRICE",
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
    image: "/assets/products/filesfolder/16.webp",
    subImages: [
      "/assets/products/filesfolder/16.webp",
      "/assets/products/filesfolder/17.webp",
      "/assets/products/filesfolder/18.webp"
    ],
    tags: [
      "file storage box",
      "office archiving box",
      "document record storage",
      "custom printed archiving box",
      "corporate HR record box",
      "office storage supplies India"
    ],
    keywords: [
      "document storage box",
      "office archive box",
      "corporate file box",
      "bulk office supplies",
      "Delhi NCR Noida India"
    ],
    isFeatured: false,
    isPublished: true,
    isDeleted: false,
    ratings: { average: 4.5, count: 60 },
    metaTitle:
      "A4 File Storage Box | Custom Printed Corporate Archive Box India",
    metaDescription:
      "Heavy-duty A4 file storage box with custom printing for corporate document archiving. Bulk supply available in Delhi NCR, Noida, Gurgaon & across India.",
    audit: { createdBy: "admin", updatedBy: "admin" }
  }
];

module.exports = filesAndFolders;
