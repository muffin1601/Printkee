// Read-only product SEO diagnostics against the database configured in backend-next/.env.
// Usage: node scripts/auditProductSeo.js path/to/output.json
require("dotenv").config();
const fs = require("node:fs/promises");
const crypto = require("node:crypto");
const mongoose = require("mongoose");
require("../models/Category");
require("../models/Subcategory");
const Product = require("../models/product");
const { evaluateProductSeo, textOnly } = require("../services/productSeoQuality");

const detailFields = [
  "attributes.material", "attributes.size", "attributes.color", "attributes.dimensions",
  "attributes.weight", "attributes.gsm", "attributes.capacity", "attributes.printingMethods",
  "attributes.brandingAreas", "attributes.packaging", "attributes.moq", "attributes.leadTime",
  "attributes.sampleAvailability", "attributes.customization", "attributes.careInstructions",
  "features", "idealFor", "specifications", "additionalInfo",
];
const nonempty = (value) => Array.isArray(value)
  ? value.some(nonempty)
  : value && typeof value === "object"
    ? Object.values(value).some(nonempty)
    : Boolean(textOnly(value));
const get = (object, path) => path.split(".").reduce((value, key) => value?.[key], object);
const normalize = (value) => textOnly(value).toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
const contentKey = (value) => normalize(value) ? crypto.createHash("sha256").update(normalize(value)).digest("hex") : "";

async function main() {
  if (!process.argv[2]) throw new Error("Output JSON path is required");
  await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 10000 });
  try {
    const products = await Product.find({}).populate("category", "name slug isActive")
      .populate({ path: "subcategory", select: "name slug isActive category" }).lean();
    const rows = products.map((product) => {
      const quality = evaluateProductSeo(product);
      const category = product.category;
      const subcategory = product.subcategory;
      const detailPresent = detailFields.filter((path) => nonempty(get(product, path)));
      const longText = textOnly(product.description?.long);
      const shortText = textOnly(product.description?.short);
      return {
        id: String(product._id), name: product.name, slug: product.slug,
        url: category?.slug && subcategory?.slug && product.slug
          ? `https://printkee.com/${category.slug}/${subcategory.slug}/${encodeURIComponent(product.slug.trim())}` : "",
        status: product.status, isActive: product.isActive, deleted: Boolean(product.deletedAt),
        category: category?.slug || "", categoryActive: category?.isActive !== false,
        subcategory: subcategory?.slug || "", subcategoryActive: subcategory?.isActive !== false,
        relationshipValid: Boolean(category?._id && subcategory?.category && String(category._id) === String(subcategory.category)),
        explicitNoindex: product.seo?.indexable === false,
        canonicalUrl: product.canonicalUrl || "",
        quality,
        longDescriptionWords: longText.split(/\s+/).filter(Boolean).length,
        shortDescriptionWords: shortText.split(/\s+/).filter(Boolean).length,
        longDescriptionKey: contentKey(longText),
        shortDescriptionKey: contentKey(shortText),
        detailPresent,
        imageCount: (product.images || []).filter((image) => image?.url).length,
        primaryImageUrl: product.images?.[0]?.url || "",
        descriptiveImageCount: (product.images || []).filter((image) => image?.url && textOnly(image.altText).length >= 8).length,
        seoTitleLength: textOnly(product.seo?.metaTitle).length,
        seoDescriptionLength: textOnly(product.seo?.metaDescription).length,
      };
    });
    const counts = new Map();
    for (const row of rows) for (const issue of row.quality.issues) counts.set(issue, (counts.get(issue) || 0) + 1);
    await fs.writeFile(process.argv[2], JSON.stringify({ generatedAt: new Date().toISOString(), total: rows.length, issueCounts: Object.fromEntries(counts), rows }, null, 2));
    console.log(JSON.stringify({ total: rows.length, eligible: rows.filter((row) => row.quality.eligible).length, issueCounts: Object.fromEntries(counts) }));
  } finally {
    await mongoose.disconnect();
  }
}
main().catch((error) => { console.error(error.name + ": " + String(error.message).replace(/mongodb(?:\+srv)?:\/\/[^@ ]+@/g, "mongodb://[redacted]@")); process.exitCode = 1; });
