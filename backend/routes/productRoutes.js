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

module.exports = router;
