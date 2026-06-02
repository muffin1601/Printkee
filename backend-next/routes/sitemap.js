const express = require("express");
const router = express.Router();

const Category = require("../models/Category");
const Subcategory = require("../models/Subcategory");
const Product = require("../models/product");
const Blog = require("../models/Blog");

/**
 * GET /api/sitemap-data
 * Returns all URL slugs needed to build a sitemap.
 * Called by frontend-next/app/sitemap.js at request time.
 */
router.get("/sitemap-data", async (req, res) => {
  try {
    const [categories, subcategories, products, blogs] = await Promise.all([
      Category.find({}, "slug").lean(),
      Subcategory.find({}, "slug").populate("category", "slug").lean(),
      Product.find({}, "slug").populate("category", "slug").populate("subcategory", "slug").lean(),
      Blog.find({}, "_id").lean(),
    ]);

    res.json({ categories, subcategories, products, blogs });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch sitemap data" });
  }
});

module.exports = router;
