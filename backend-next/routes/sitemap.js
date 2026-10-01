const express = require("express");
const router = express.Router();

const Category    = require("../models/Category");
const Subcategory = require("../models/Subcategory");
const Product     = require("../models/product");
const Blog        = require("../models/Blog");
const Brand       = require("../models/Brand");

/**
 * GET /api/sitemap-data
 * Returns all URL slugs + updatedAt timestamps for sitemap generation.
 * 100% database-driven — no hardcoded dynamic URLs.
 * Adding any record in MongoDB includes it in the next sitemap render automatically.
 */
router.get("/sitemap-data", async (req, res) => {
  try {
    const [categories, subcategories, products, blogs, brands] = await Promise.all([
      Category.find({ isActive: { $ne: false } }, "slug updatedAt").lean(),
      Subcategory.find({ isActive: { $ne: false } }, "slug updatedAt").populate("category", "slug isActive").lean(),
      // Only URLs that can resolve to a public product page belong in the sitemap.
      Product.find({ isActive: true }, "slug updatedAt")
        .populate("category",    "slug")
        .populate("subcategory", "slug")
        .lean(),
      Blog.find(
        { $or: [{ status: "published" }, { status: { $exists: false } }] },
        "_id date publishedAt updatedAt"
      ).lean(),
      Brand.find({ isActive: { $ne: false } }, "slug updatedAt").lean(),
    ]);

    res.json({ categories, subcategories, products, blogs, brands });
  } catch (err) {
    console.error("sitemap-data error:", err);
    res.status(500).json({ error: "Failed to fetch sitemap data" });
  }
});

module.exports = router;
