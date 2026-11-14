// Read-only export of the 151 GSC product records for editorial drafting.
require("dotenv").config();
const fs = require("node:fs/promises");
const mongoose = require("mongoose");
require("../models/Category");
require("../models/Subcategory");
const Product = require("../models/product");

async function main() {
  const [csvPath, outputPath] = process.argv.slice(2);
  if (!csvPath || !outputPath) throw new Error("CSV and output paths are required");
  const csv = await fs.readFile(csvPath, "utf8");
  const urls = csv.trim().split(/\r?\n/).slice(1).map((row) => row.split(",", 1)[0]);
  await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 10000 });
  try {
    const products = await Product.find({}).populate("category", "name slug isActive")
      .populate("subcategory", "name slug category isActive").lean();
    const byUrl = new Map(products.map((p) => [
      `https://printkee.com/${p.category?.slug}/${p.subcategory?.slug}/${encodeURIComponent(p.slug.trim())}`, p,
    ]));
    const missing = urls.filter((url) => !byUrl.has(url));
    if (urls.length !== 151 || missing.length) throw new Error(`Expected 151 URLs; found ${urls.length}. Unmatched: ${missing.join(", ")}`);
    const rows = urls.map((url) => {
      const p = byUrl.get(url);
      return {
        url, id: String(p._id), updatedAt: p.updatedAt, name: p.name, sku: p.sku || "", slug: p.slug,
        status: p.status, isActive: p.isActive, category: p.category, subcategory: p.subcategory,
        description: p.description || {}, attributes: p.attributes || {}, features: p.features || [],
        idealFor: p.idealFor || [], specifications: p.specifications || [], additionalInfo: p.additionalInfo || [],
        seo: p.seo || {}, images: p.images || [], subImages: p.subImages || [],
      };
    });
    await fs.writeFile(outputPath, JSON.stringify({ exportedAt: new Date().toISOString(), rows }, null, 2));
    console.log(JSON.stringify({ rows: rows.length, unique: new Set(rows.map((r) => r.id)).size }));
  } finally {
    await mongoose.disconnect();
  }
}
main().catch((error) => { console.error(error.name + ": " + String(error.message).replace(/mongodb(?:\+srv)?:\/\/[^@ ]+@/g, "mongodb://[redacted]@")); process.exitCode = 1; });
