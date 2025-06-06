const express = require("express");
const router = express.Router();
const Category = require("../models/product");

router.get('/:category', async (req, res) => {
  try {
    const category = await Category.findOne({
      name: { $regex: new RegExp(`^${req.params.category}$`, 'i') }
    });

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    // Return selected fields
    res.json({
      name: category.name,
      tag: category.tag,
      subcategories: category.subcategories
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching category data' });
  }
});

module.exports = router;