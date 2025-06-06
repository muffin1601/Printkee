// routes/categoryRoutes.js
const express = require("express");
const router = express.Router();
const Category = require("../models/product");

router.get("/categories", async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch categories" });
  }
});

module.exports = router;
