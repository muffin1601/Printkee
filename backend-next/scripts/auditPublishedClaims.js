require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("../models/product");
const Blog = require("../models/Blog");

const patterns = [
  /lowest prices? guaranteed/i, /best price guarantee/i, /\d+[,+]?\+\s+(?:happy\s+)?(?:clients|brands)/i,
  /always on[ -]?time/i, /round the clock|24\/7 support/i, /leading manufacturer/i,
  /\bMOQ\s*\d+/i, /bulk pricing starts/i, /(?:48[- ]hours?|10 minutes?|1 week|7[- ]day)\s+(?:dispatch|sample|quotation)/i,
  /(?:our|at our|based) manufacturing unit/i, /\bBIS certif/i, /BPA[- ]free/i, /our in-house/i,
];

const flatten = (value) => typeof value === "string" ? value : JSON.stringify(value || "");

(async () => {
  const uri = process.env.MONGO_URI || process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGO_URI or MONGODB_URI is required");
  await mongoose.connect(uri);
  const [products, blogs] = await Promise.all([
    Product.find({ isActive: true }).select("name slug description features faqs additionalInfo specifications seo").lean(),
    Blog.find({ $or: [{ status: "published" }, { status: { $exists: false } }] }).select("title content").lean(),
  ]);
  const findings = [];
  for (const [type, records] of [["product", products], ["blog", blogs]]) for (const record of records) {
    const text = flatten(record);
    const matches = patterns.flatMap((pattern) => text.match(pattern)?.[0] || []);
    if (matches.length) findings.push({ type, id: record._id, name: record.name || record.title, slug: record.slug, matches });
  }
  console.log(JSON.stringify({ checked: { products: products.length, blogs: blogs.length }, findings }, null, 2));
  await mongoose.disconnect();
})().catch((error) => { console.error(error.message); process.exitCode = 1; });
