const express = require("express");
const router = express.Router();

const Category = require("../models/Category");
const Subcategory = require("../models/Subcategory");

/**
 * RELATED SUBCATEGORIES
 * URL: /subcategories/related-subcategories/:subcatSlug
 */
router.get("/subcategories/related-subcategories/:subcatSlug", async (req, res) => {
  try {
    const { subcatSlug } = req.params;

    // 1. Find current subcategory
    const currentSub = await Subcategory.findOne({ slug: subcatSlug }).populate(
      "category",
      "name slug"
    );

    if (!currentSub) {
      return res.status(404).json({ error: "Subcategory not found" });
    }

    // 2. Find related subcategories from same category
    const relatedSubcategories = await Subcategory.find({
      category: currentSub.category._id,
      _id: { $ne: currentSub._id },
      isActive: true,
    }).select("name slug image hoverImage tag isFeatured");

    res.json({
      currentSubcategory: {
        _id: currentSub._id,
        name: currentSub.name,
        slug: currentSub.slug,
        image: currentSub.image,
        hoverImage: currentSub.hoverImage,
        tag: currentSub.tag,
        isFeatured: currentSub.isFeatured,
        category: currentSub.category,
      },
      relatedSubcategories,
    });
  } catch (err) {
    console.error("❌ Error fetching related subcategories:", err);
    res.status(500).json({ error: "Server error" });
  }
});

/**
 * FETCH SUBCATEGORY + PRODUCTS
 * URL: /subcategory-fetch/:categorySlug/:subcategorySlug
 */
router.get("/subcategory-fetch/:categorySlug/:subcategorySlug", async (req, res) => {
  try {
    const { categorySlug, subcategorySlug } = req.params;

    // 1. Find category
    const category = await Category.findOne({ slug: categorySlug });
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    // 2. Find subcategory under this category
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
      return res.status(404).json({ error: "Subcategory not found" });
    }

    res.json({
      category: {
        _id: category._id,
        name: category.name,
        slug: category.slug,
      },
      subcategory: {
        _id: subcategory._id,
        name: subcategory.name,
        slug: subcategory.slug,
        description: subcategory.description,
        tag: subcategory.tag,
      },
      products: subcategory.products,
    });
  } catch (err) {
    console.error("❌ Error fetching subcategory:", err);
    res.status(500).json({ error: "Error fetching subcategory" });
  }
});

module.exports = router;
