
const express = require("express");
const router = express.Router();
const Category = require("../models/product");


// router.get("/:category/:subcategory/:product", async (req, res) => {
//   const category = decodeURIComponent(req.params.category);
//   const subcategory = decodeURIComponent(req.params.subcategory);
//   const product = decodeURIComponent(req.params.product);

//   try {
   
//     const categoryDoc = await Category.findOne({
//       name: new RegExp(`^${category}$`, "i"),
//     });

//     if (!categoryDoc) {
//       return res.status(404).json({ message: "Category not found" });
//     }

    
//     const subcat = categoryDoc.subcategories.find(
//       (s) => s.name.toLowerCase() === subcategory.toLowerCase()
//     );

//     if (!subcat) {
//       return res.status(404).json({ message: "Subcategory not found" });
//     }

    
//     const productData = subcat.products.find(
//       (p) => p.name.toLowerCase() === product.toLowerCase()
//     );

//     if (!productData) {
//       return res.status(404).json({ message: "Product not found" });
//     }

//     return res.json(productData);
//   } catch (error) {
//     console.error("Error fetching product:", error);
//     return res.status(500).json({ message: "Server error" });
//   }
// });


router.get("/product-fetch/:categorySlug/:subcategorySlug/:productSlug", async (req, res) => {
  const categorySlug = decodeURIComponent(req.params.categorySlug);
  const subcategorySlug = decodeURIComponent(req.params.subcategorySlug);
  const productSlug = decodeURIComponent(req.params.productSlug);

  try {
    // find category by slug
    const categoryDoc = await Category.findOne({ slug: categorySlug });

    if (!categoryDoc) {
      return res.status(404).json({ message: "Category not found" });
    }

   
    const subcat = categoryDoc.subcategories.find(
      (s) => s.slug === subcategorySlug
    );

    if (!subcat) {
      return res.status(404).json({ message: "Subcategory not found" });
    }

    
    const productData = subcat.products.find(
      (p) => p.slug === productSlug
    );

    if (!productData) {
      return res.status(404).json({ message: "Product not found" });
    }

    // return full data
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
});



router.get("/related-products/:category/:subcategory/:productName", async (req, res) => {
  const category = decodeURIComponent(req.params.category);
  const subcategory = decodeURIComponent(req.params.subcategory);
  const productName = decodeURIComponent(req.params.productName);

  try {
    
    const categoryDoc = await Category.findOne({
      name: new RegExp(`^${category}$`, "i"),
    });

    if (!categoryDoc) {
      return res.status(404).json({ message: "Category not found" });
    }

    
    const subcat = categoryDoc.subcategories.find(
      (s) => s.name.toLowerCase() === subcategory.toLowerCase()
    );

    if (!subcat) {
      return res.status(404).json({ message: "Subcategory not found" });
    }

    
    const related = subcat.products.filter(
      (p) => p.name.toLowerCase() !== productName.toLowerCase()
    );

    res.json(related);
  } catch (err) {
    console.error("Error fetching related products:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
