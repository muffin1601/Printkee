const express = require("express");
const router = express.Router();

const Category = require("../models/Category");
const Subcategory = require("../models/Subcategory");
const Product = require("../models/product");
const Blog = require("../models/Blog");

/**
 * GET /api/sitemap-data
 * Returns all URL slugs + updatedAt timestamps for sitemap generation.
 * Called by frontend-next/app/sitemap.js at request time.
 * Adding a new product/category/subcategory/blog in MongoDB
 * automatically includes it in the next sitemap render — no code change needed.
 */
router.get("/sitemap-data", async (req, res) => {
  try {
    const [categories, subcategories, products, blogs] = await Promise.all([
      Category.find({}, "slug updatedAt").lean(),
      Subcategory.find({}, "slug updatedAt").populate("category", "slug").lean(),
      Product.find({}, "slug updatedAt")
        .populate("category", "slug")
        .populate("subcategory", "slug")
        .lean(),
      Blog.find({}, "_id date updatedAt").lean(),
    ]);

    res.json({ categories, subcategories, products, blogs });
  } catch (err) {
    console.error("sitemap-data error:", err);
    res.status(500).json({ error: "Failed to fetch sitemap data" });
  }
});

module.exports = router;
