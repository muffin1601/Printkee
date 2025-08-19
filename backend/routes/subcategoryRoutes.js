const express = require("express");
const router = express.Router();
const Category = require("../models/product");

router.get("/subcategories/related-subcategories/:subcatSlug", async (req, res) => {
  try {
    const { subcatSlug } = req.params;
    // console.log("Looking for subcategory slug:", subcatSlug);

    const category = await Category.findOne({ "subcategories.slug": subcatSlug });

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    const currentSub = category.subcategories.find(
      (sub) => sub.slug === subcatSlug
    );

    if (!currentSub) {
      return res.status(404).json({ error: "Subcategory not found" });
    }

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

// router.get('/:category/:subcategory', async (req, res) => {
//   try {
//     const { category, subcategory } = req.params;

    
//     const categoryDoc = await Category.findOne({
//       name: { $regex: new RegExp(`^${category}$`, 'i') },
//     });

//     if (!categoryDoc) {
//       return res.status(404).json({ error: 'Category not found' });
//     }

    
//     const subcategoryDoc = categoryDoc.subcategories.find(
//       (sub) => sub.name.toLowerCase() === subcategory.toLowerCase()
//     );

//     if (!subcategoryDoc) {
//       return res.status(404).json({ error: 'Subcategory not found' });
//     }

    
//     res.json({
//       products: subcategoryDoc.products,
//       subcategory: {
//         name: subcategoryDoc.name,
//         tag: subcategoryDoc.tag || '',
//       },
//     });
//   } catch (err) {
//     console.error("Error fetching products:", err);
//     res.status(500).json({ error: 'Error fetching products' });
//   }
// });


router.get("/subcategory-fetch/:categorySlug/:subcategorySlug", async (req, res) => {
  try {
    const { categorySlug, subcategorySlug } = req.params;

    
    const categoryDoc = await Category.findOne({ slug: categorySlug });
    if (!categoryDoc) {
      return res.status(404).json({ error: "Category not found" });
    }

    
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
      },
      products: subcategoryDoc.products || [],
    });
  } catch (err) {
    console.error("Error fetching products by slug:", err);
    res.status(500).json({ error: "Error fetching products" });
  }
});

module.exports = router;