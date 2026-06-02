const express = require("express");
const router = express.Router();
const Brand = require("../models/Brand");

/* GET /api/brands — all brands */
router.get("/", async (req, res) => {
  try {
    const brands = await Brand.find().sort({ name: 1 }).lean();
    res.json(brands);
  } catch (err) {
    console.error("brands fetch error:", err);
    res.status(500).json({ error: "Failed to fetch brands" });
  }
});

/* GET /api/brands/:slug — single brand */
router.get("/:slug", async (req, res) => {
  try {
    const brand = await Brand.findOne({ slug: req.params.slug }).lean();
    if (!brand) return res.status(404).json({ error: "Brand not found" });
    res.json(brand);
  } catch (err) {
    console.error("brand fetch error:", err);
    res.status(500).json({ error: "Failed to fetch brand" });
  }
});

module.exports = router;
