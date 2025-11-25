const express = require("express");
const router = express.Router();
const Category = require("../models/Category");


router.get("/categories", async (req, res) => {
  try {
    const categories = await Category.find(
      {},
      "-subcategories.products" 
    ).sort({ sortOrder: 1 });

    res.json(categories);
  } catch (err) {
    console.error("Error fetching categories:", err);
    res.status(500).json({ message: "Failed to fetch categories" });
  }
});


router.get("/categories/:slug", async (req, res) => {
  try {
    const slug = req.params.slug;

    const category = await Category.findOne({ slug });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json(category);
  } catch (err) {
    console.error("Error fetching category:", err);
    res.status(500).json({ message: "Failed to fetch category" });
  }
});


router.get("/categories/:slug/:subcategorySlug", async (req, res) => {
  try {
    const { slug, subcategorySlug } = req.params;

    const category = await Category.findOne({ slug });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    const subcategory = category.subcategories.find(
      (sc) => sc.slug === subcategorySlug
    );

    if (!subcategory) {
      return res.status(404).json({ message: "Subcategory not found" });
    }

    res.json(subcategory);
  } catch (err) {
    console.error("Error fetching subcategory:", err);
    res.status(500).json({ message: "Failed to fetch subcategory" });
  }
});

module.exports = router;
