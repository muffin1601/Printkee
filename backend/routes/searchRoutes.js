// routes/search.js
const express = require("express");
const router = express.Router();
const Category = require("../models/product"); // your Mongoose model

router.get("/search", async (req, res) => {
  const keyword = req.query.q || "";
  const categoryFilter = req.query.cat || "All Categories";

  const regex = new RegExp(keyword, "i");
  const matchedProducts = [];

  try {
    const categories = await Category.find({});

    categories.forEach((category) => {
      if (categoryFilter !== "All Categories" && category.name !== categoryFilter) return;

      category.subcategories.forEach((subcat) => {
        subcat.products.forEach((product) => {
          if (
            regex.test(product.name) ||
            regex.test(product.description) ||
            product.tags?.some(tag => regex.test(tag))
          ) {
            matchedProducts.push({
              name: product.name,
              description: product.description,
              image: product.image,
              category: category.name,
              subcategory: subcat.name,
              tags: product.tags,
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
