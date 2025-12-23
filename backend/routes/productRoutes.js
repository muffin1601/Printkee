const express = require("express");
const router = express.Router();

const Category = require("../models/Category");
const Subcategory = require("../models/Subcategory");
const Product = require("../models/product");


router.get(
  "/product-fetch/:categorySlug/:subcategorySlug/:productSlug",
  async (req, res) => {
    const categorySlug = decodeURIComponent(req.params.categorySlug);
    const subcategorySlug = decodeURIComponent(req.params.subcategorySlug);
    const productSlug = decodeURIComponent(req.params.productSlug);

    try {
      // 1. Find category
      const category = await Category.findOne({ slug: categorySlug });
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }

      // 2. Find subcategory under category
      const subcategory = await Subcategory.findOne({
        slug: subcategorySlug,
        category: category._id,
      });
      if (!subcategory) {
        return res.status(404).json({ message: "Subcategory not found" });
      }

      // 3. Find product under subcategory
      const product = await Product.findOne({
        slug: productSlug,
        category: category._id,
        subcategory: subcategory._id,
        isActive: true,
      });

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      // 4. Return structured response
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
        },
        product,
      });
    } catch (error) {
      console.error("❌ Error fetching product:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

/**
 * RELATED PRODUCTS
 * URL:
 * /related-products/:categorySlug/:subcategorySlug/:productSlug
 */
router.get(
  "/related-products/:categorySlug/:subcategorySlug/:productSlug",
  async (req, res) => {
    const categorySlug = decodeURIComponent(req.params.categorySlug);
    const subcategorySlug = decodeURIComponent(req.params.subcategorySlug);
    const productSlug = decodeURIComponent(req.params.productSlug);

    try {
      // 1. Find category
      const category = await Category.findOne({ slug: categorySlug });
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }

      // 2. Find subcategory
      const subcategory = await Subcategory.findOne({
        slug: subcategorySlug,
        category: category._id,
      });
      if (!subcategory) {
        return res.status(404).json({ message: "Subcategory not found" });
      }

      // 3. Fetch related products (exclude current product)
      const relatedProducts = await Product.find({
        category: category._id,
        subcategory: subcategory._id,
        slug: { $ne: productSlug },
        isActive: true,
      })
        .limit(8)
        .select(
          "name slug price salePrice images ratings isFeatured"
        );

      res.json(relatedProducts);
    } catch (err) {
      console.error("❌ Error fetching related products:", err);
      res.status(500).json({ message: "Server error" });
    }
  }
);

module.exports = router;
