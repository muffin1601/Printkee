const express = require("express");
const router = express.Router();
const Category = require("../models/Category");   



router.get("/subcategories/related-subcategories/:subcatSlug", async (req, res) => {
  try {
    const { subcatSlug } = req.params;

    // Find any category that contains this subcategory
    const category = await Category.findOne({ "subcategories.slug": subcatSlug });

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    // Get current subcategory
    const currentSub = category.subcategories.find(
      (sub) => sub.slug === subcatSlug
    );

    if (!currentSub) {
      return res.status(404).json({ error: "Subcategory not found" });
    }

    // Build related list
    const related = category.subcategories
      .filter((sub) => sub.slug !== subcatSlug && sub.isActive)
      .map((sub) => ({
        _id: sub._id,
        name: sub.name,
        slug: sub.slug,
        image: sub.image,
        hoverImage: sub.hoverImage,
        tag: sub.tag,
        isFeatured: sub.isFeatured,
      }));

    res.json({
      currentSubcategory: {
        _id: currentSub._id,
        name: currentSub.name,
        slug: currentSub.slug,
        image: currentSub.image,
        hoverImage: currentSub.hoverImage,
        tag: currentSub.tag,
        isFeatured: currentSub.isFeatured,
      },
      relatedSubcategories: related,
    });
  } catch (err) {
    console.error("❌ Error fetching related subcategories:", err);
    res.status(500).json({ error: "Server error" });
  }
});



router.get("/subcategory-fetch/:categorySlug/:subcategorySlug", async (req, res) => {
  try {
    const { categorySlug, subcategorySlug } = req.params;

    // Find category
    const categoryDoc = await Category.findOne({ slug: categorySlug });
    if (!categoryDoc) {
      return res.status(404).json({ error: "Category not found" });
    }

    // Find subcategory inside this category
    const subcategoryDoc = categoryDoc.subcategories.find(
      (sub) => sub.slug === subcategorySlug
    );
    if (!subcategoryDoc) {
      return res.status(404).json({ error: "Subcategory not found" });
    }

    res.json({
      category: {
        _id: categoryDoc._id,
        name: categoryDoc.name,
        slug: categoryDoc.slug,
        tag: categoryDoc.tag,
      },
      subcategory: {
        _id: subcategoryDoc._id,
        name: subcategoryDoc.name,
        slug: subcategoryDoc.slug,
        tag: subcategoryDoc.tag,
        description: subcategoryDoc.description,
      },
      products: subcategoryDoc.products || [],
    });
  } catch (err) {
    console.error("❌ Error fetching products by slug:", err);
    res.status(500).json({ error: "Error fetching products" });
  }
});

module.exports = router;
