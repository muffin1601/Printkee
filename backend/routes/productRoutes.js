const express = require("express");
const router = express.Router();
const Category = require("../models/Category");   



router.get(
  "/product-fetch/:categorySlug/:subcategorySlug/:productSlug",
  async (req, res) => {
    const categorySlug = decodeURIComponent(req.params.categorySlug);
    const subcategorySlug = decodeURIComponent(req.params.subcategorySlug);
    const productSlug = decodeURIComponent(req.params.productSlug);

    try {
      // Find category
      const categoryDoc = await Category.findOne({ slug: categorySlug });

      if (!categoryDoc) {
        return res.status(404).json({ message: "Category not found" });
      }

      // Find subcategory
      const subcat = categoryDoc.subcategories.find(
        (s) => s.slug === subcategorySlug
      );

      if (!subcat) {
        return res.status(404).json({ message: "Subcategory not found" });
      }

      // Find product
      const productData = subcat.products.find((p) => p.slug === productSlug);

      if (!productData) {
        return res.status(404).json({ message: "Product not found" });
      }

      // Return final combined structured data
      return res.json({
        category: {
          name: categoryDoc.name,
          slug: categoryDoc.slug,
          tag: categoryDoc.tag,
        },
        subcategory: {
          name: subcat.name,
          slug: subcat.slug,
          tag: subcat.tag,
        },
        product: productData,
      });
    } catch (error) {
      console.error("Error fetching product:", error);
      return res.status(500).json({ message: "Server error" });
    }
  }
);



router.get(
  "/related-products/:categorySlug/:subcategorySlug/:productSlug",
  async (req, res) => {
    const categorySlug = decodeURIComponent(req.params.categorySlug);
    const subcategorySlug = decodeURIComponent(req.params.subcategorySlug);
    const productSlug = decodeURIComponent(req.params.productSlug);

    try {
      // Find category
      const categoryDoc = await Category.findOne({ slug: categorySlug });

      if (!categoryDoc) {
        return res.status(404).json({ message: "Category not found" });
      }

      // Find subcategory
      const subcat = categoryDoc.subcategories.find(
        (s) => s.slug === subcategorySlug
      );

      if (!subcat) {
        return res.status(404).json({ message: "Subcategory not found" });
      }

      // Filter related products
      const relatedProducts = subcat.products.filter(
        (p) => p.slug !== productSlug
      );

      res.json(relatedProducts);
    } catch (err) {
      console.error("Error fetching related products:", err);
      res.status(500).json({ message: "Server error" });
    }
  }
);

module.exports = router;
