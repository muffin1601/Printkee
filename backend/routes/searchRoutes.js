// routes/search.js
const express = require("express");
const router = express.Router();
const Category = require("../models/Category"); // ✅ Updated model import

router.get("/search", async (req, res) => {
  const keyword = req.query.q || "";
  const categoryFilter = req.query.cat || "All Categories";

  const regex = new RegExp(keyword, "i");
  const matchedProducts = [];

  try {
    const categories = await Category.find({});

    categories.forEach((category) => {
      // Apply category filter
      if (categoryFilter !== "All Categories" && category.name !== categoryFilter)
        return;

      category.subcategories.forEach((subcat) => {
        subcat.products.forEach((product) => {
          if (
            regex.test(product.name) ||
            regex.test(product.description) ||
            product.tags?.some((tag) => regex.test(tag)) ||
            product.keywords?.some((kw) => regex.test(kw))
          ) {
            matchedProducts.push({
              name: product.name,
              slug: product.slug,
              description: product.description,
              image: product.image,

              // Category details
              category: category.name,
              categorySlug: category.slug,

              // Subcategory details
              subcategory: subcat.name,
              subcategorySlug: subcat.slug,

              tags: product.tags,
              keywords: product.keywords,
            });
          }
        });
      });
    });

    res.json(matchedProducts);
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ error: "Search failed" });
  }
});

module.exports = router;
