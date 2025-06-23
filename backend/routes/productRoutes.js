// routes/products.js
const express = require("express");
const router = express.Router();
const Category = require("../models/product");

// GET /api/categories/:category/:subcategory
router.get('/:category/:subcategory', async (req, res) => {
  try {
    const { category, subcategory } = req.params;

    // Find category by name (case-insensitive)
    const categoryDoc = await Category.findOne({
      name: { $regex: new RegExp(`^${category}$`, 'i') },
    });

    if (!categoryDoc) {
      return res.status(404).json({ error: 'Category not found' });
    }

    // Find subcategory by name (case-insensitive)
    const subcategoryDoc = categoryDoc.subcategories.find(
      (sub) => sub.name.toLowerCase() === subcategory.toLowerCase()
    );

    if (!subcategoryDoc) {
      return res.status(404).json({ error: 'Subcategory not found' });
    }

    // ✅ Return both products and subcategory details
    res.json({
      products: subcategoryDoc.products,
      subcategory: {
        name: subcategoryDoc.name,
        tag: subcategoryDoc.tag || '',
      },
    });
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ error: 'Error fetching products' });
  }
});

router.get("/:category/:subcategory/:product", async (req, res) => {
  const { category, subcategory, product } = req.params;

  try {
    const result = await Category.findOne(
      { name: decodeURIComponent(category) },
      {
        subcategories: {
          $elemMatch: { name: decodeURIComponent(subcategory) }
        }
      }
    );

    if (!result || !result.subcategories || result.subcategories.length === 0) {
      return res.status(404).json({ message: "Subcategory not found" });
    }

    const subcat = result.subcategories[0];

    const productData = subcat.products.find(
      (p) => p.name === decodeURIComponent(product)
    );

    if (!productData) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.json(productData);
  } catch (error) {
    console.error("Error fetching product:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

router.get('/related-products/:category/:subcategory/:productName', async (req, res) => {
  const { category, subcategory, productName } = req.params;

  try {
    const categoryDoc = await Category.findOne({ name: category });

    if (!categoryDoc) return res.status(404).json({ message: "Category not found" });

    const subcat = categoryDoc.subcategories.find(sub => sub.name === subcategory);
    if (!subcat) return res.status(404).json({ message: "Subcategory not found" });

    const related = subcat.products.filter(p => p.name !== productName);

    res.json(related);
  } catch (err) {
    console.error("Error fetching related products:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
