const express = require("express");
const router = express.Router();

const Category = require("../models/Category");
const Subcategory = require("../models/Subcategory");


router.get("/categories", async (req, res) => {
  try {
    const categories = await Category.find({})
      .populate({
        path: "subcategories",
        select: "name slug image description seo",
      })
      .sort({ createdAt: 1 });

    res.json(categories);
  } catch (err) {
    console.error("Error fetching categories:", err);
    res.status(500).json({ message: "Failed to fetch categories" });
  }
});


router.get("/categories/:slug", async (req, res) => {
  try {
    const { slug } = req.params;

    const category = await Category.findOne({ slug }).populate({
      path: "subcategories",
      select: "name slug image description seo",
    });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json(category);
  } catch (err) {
    console.error("Error fetching category:", err);
    res.status(500).json({ message: "Failed to fetch category" });
  }
});

/**
 * GET SUBCATEGORY BY CATEGORY SLUG + SUBCATEGORY SLUG
 * - Returns subcategory + products
 */
router.get("/categories/:slug/:subcategorySlug", async (req, res) => {
  try {
    const { slug, subcategorySlug } = req.params;

    // 1. Find category
    const category = await Category.findOne({ slug });
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // 2. Find subcategory belonging to that category
    const subcategory = await Subcategory.findOne({
      slug: subcategorySlug,
      category: category._id,
    }).populate({
      path: "products",
      match: { isActive: true },
      select:
        "name slug price salePrice images stock ratings isFeatured seo",
    });

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
