const express = require("express");
const router = express.Router();

const Category    = require("../models/Category");
const Subcategory = require("../models/Subcategory");
const Product     = require("../models/product");
const Blog        = require("../models/Blog");
const Brand       = require("../models/Brand");
const SeoPage     = require("../models/SeoPage");
const { evaluatePublicProductSeo } = require("../services/productSeoGate");

/**
 * GET /api/sitemap-data
 * Returns all URL slugs + updatedAt timestamps for sitemap generation.
 * 100% database-driven — no hardcoded dynamic URLs.
 * Adding any record in MongoDB includes it in the next sitemap render automatically.
 */
router.get("/sitemap-data", async (req, res) => {
  try {
    const [categories, subcategories, products, blogs, brands, seoPages] = await Promise.all([
      Category.find({ isActive: { $ne: false } }, "slug updatedAt").lean(),
      Subcategory.find({ isActive: { $ne: false } }, "slug updatedAt").populate("category", "slug isActive").lean(),
      // Keep Mongoose defaults for the same Gate V2 fingerprint used by product-fetch.
      // Only URLs that can resolve to a public product page belong in the sitemap.
      Product.find({ isActive: true, status: "published", deletedAt: null })
        .populate("category",    "slug isActive")
        .populate("subcategory", "slug isActive category"),
      Blog.find(
        { $or: [{ status: "published" }, { status: { $exists: false } }] },
        "_id date publishedAt updatedAt"
      ).lean(),
      Brand.find({ isActive: { $ne: false } }, "slug updatedAt").lean(),
      SeoPage.find(
        { status: "INDEXABLE", "robots.index": true },
        "path canonicalUrl updatedAt significantContentUpdatedAt priority"
      ).lean(),
    ]);

    const indexableProducts = products
      .filter((product) => evaluatePublicProductSeo(product).eligible)
      .map(({ slug, updatedAt, category, subcategory }) => ({
        slug,
        updatedAt,
        category,
        subcategory,
        seoIndexable: true,
      }));

    res.json({ categories, subcategories, products: indexableProducts, blogs, brands, seoPages });
  } catch (err) {
    console.error("sitemap-data error:", err);
    res.status(500).json({ error: "Failed to fetch sitemap data" });
  }
});

module.exports = router;
