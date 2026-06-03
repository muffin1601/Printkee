// routes/search.js
const express = require("express");
const router = express.Router();
const Product = require("../models/product");

router.get("/search", async (req, res) => {
  const keyword = req.query.q || "";
  const categoryFilter = req.query.cat || "All Categories";

  const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(escapeRegex(keyword), "i");

  try {
    const products = await Product.find({
      isActive: { $ne: false },
      $or: [
        { name: regex },
        { slug: regex },
        { "description.short": regex },
        { "description.long": regex },
        { tags: regex },
        { "seo.keywords": regex },
      ],
    })
      .populate("category", "name slug")
      .populate("subcategory", "name slug")
      .lean();

    const matchedProducts = products
      .filter((product) => {
        if (categoryFilter === "All Categories") return true;
        return product.category?.name === categoryFilter;
      })
      .map((product) => {
        const description =
          product.description?.short ||
          product.description?.long ||
          "";
        const image =
          product.images?.[0]?.url ||
          product.subImages?.[0]?.url ||
          product.image ||
          "";
        const keywords = product.keywords || product.seo?.keywords || [];

        return {
          name: product.name,
          slug: product.slug,
          description,
          image,

          category: product.category?.name || "",
          categorySlug: product.category?.slug || "",

          subcategory: product.subcategory?.name || "",
          subcategorySlug: product.subcategory?.slug || "",

          tags: product.tags || [],
          keywords,
        };
      });

    res.json(matchedProducts);
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ error: "Search failed" });
  }
});

module.exports = router;
