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


router.get('/category/related-subcategories/:subcategoryName', async (req, res) => {
  try {
    const { subcategoryName } = req.params;

    
    const category = await Category.findOne({
      'subcategories.name': { $regex: new RegExp(`^${subcategoryName}$`, 'i') }
    });

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    
    const matchedSubcategory = category.subcategories.find(sc => 
      sc.name.toLowerCase() === subcategoryName.toLowerCase()
    );

    if (!matchedSubcategory) {
      return res.status(404).json({ error: 'Subcategory not found' });
    }

    
    const related = category.subcategories
      .filter(sc => sc.name.toLowerCase() !== subcategoryName.toLowerCase())
      .map(sc => ({
        name: sc.name,
        image: sc.image,
        tag: sc.tag
      }));

    res.json({ relatedSubcategories: related });
  } catch (err) {
    console.error('Error fetching related subcategories:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/related-subcategories/:subcategoryName', async (req, res) => {
  try {
    const { subcategoryName } = req.params;

    // Find the category that contains the requested subcategory
    const category = await Category.findOne({
      'subcategories.name': { $regex: new RegExp(`^${subcategoryName}$`, 'i') }
    });

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    // Get all subcategories excluding the current one
    const related = category.subcategories.filter(
      (sub) => sub.name.toLowerCase() !== subcategoryName.toLowerCase()
    ).map(sub => ({
      name: sub.name,
      image: sub.image,
      tag: sub.tag
    }));

    res.json(related);
  } catch (err) {
    console.error('Error fetching related subcategories:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;