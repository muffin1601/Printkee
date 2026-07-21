const express = require('express');
require ("dotenv").config();
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');
const router = express.Router();
const Product = require("../models/product");
const Category = require("../models/Category");
const Subcategory = require("../models/Subcategory");
const Visitor = require("../models/Visitor");
const { verifyToken } = require("../middleware/auth");

const SECRET_KEY = process.env.JWT_SECRET;

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many login attempts. Please try again later." },
});

router.post("/login", loginLimiter, (req, res) => {
  const { email, password } = req.body;

  if (!SECRET_KEY || !process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) {
    console.error("❌ Missing JWT_SECRET / ADMIN_EMAIL / ADMIN_PASSWORD env vars!");
    return res.status(500).json({ message: "Server misconfiguration" });
  }

  if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
    const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: "1h" });
    return res.json({ token, user: { email } });
  }

  res.status(401).json({ message: "Invalid credentials" });
});



/* ---------------------------------------
   ADMIN DASHBOARD STATS
---------------------------------------- */
router.get("/stats", verifyToken, async (req, res) => {
  try {
    const [
      productCount,
      categoryCount,
      subcategoryCount,
      visitorDocs,
    ] = await Promise.all([
      Product.countDocuments(),
      Category.countDocuments(),
      Subcategory.countDocuments(),
      Visitor.find({}, { count: 1 }),
    ]);

    // Sum total visitors from daily records
    const totalVisitors = visitorDocs.reduce(
      (sum, day) => sum + (day.count || 0),
      0
    );

    res.json({
      products: productCount,
      categories: categoryCount,
      subcategories: subcategoryCount,
      visitors: totalVisitors,
    });
  } catch (error) {
    console.error("Admin stats error:", error);
    res.status(500).json({ message: "Failed to fetch admin stats" });
  }
});

module.exports = router;
