// Read-only snapshot for proposed gate evaluation; never writes MongoDB.
require("dotenv").config();
const fs = require("node:fs/promises");
const mongoose = require("mongoose");
require("../models/Category");
require("../models/Subcategory");
const Product = require("../models/product");

async function main() {
  const output = process.argv[2];
  if (!output) throw new Error("Output path required");
  await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 10000 });
  try {
    const products = await Product.find({}).populate("category", "name slug isActive")
      .populate("subcategory", "name slug isActive category").lean();
    const rows = products.map((p) => ({
      id: String(p._id), updatedAt: p.updatedAt, name: p.name, slug: p.slug, sku: p.sku || "",
      status: p.status, isActive: p.isActive, deletedAt: p.deletedAt, canonicalUrl: p.canonicalUrl || "",
      category: p.category, subcategory: p.subcategory, description: p.description || {},
      attributes: p.attributes || {}, features: p.features || [], idealFor: p.idealFor || [],
      specifications: p.specifications || [], additionalInfo: p.additionalInfo || [],
      seo: p.seo || {}, images: p.images || [], subImages: p.subImages || [],
    }));
    await fs.writeFile(output, JSON.stringify({ readAt: new Date().toISOString(), rows }, null, 2));
    console.log(JSON.stringify({ products: rows.length }));
  } finally { await mongoose.disconnect(); }
}
main().catch((error) => { console.error(error.name + ": " + String(error.message).replace(/mongodb(?:\+srv)?:\/\/[^@ ]+@/g, "mongodb://[redacted]@")); process.exitCode = 1; });
