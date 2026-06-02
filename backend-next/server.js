require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

/* ==============================
   MIDDLEWARE
============================== */

app.use(cors());
app.use(express.json());

/* Serve uploaded files (images, blog photos, etc.) */
app.use("/uploads", express.static("uploads"));

/* ==============================
   DATABASE
============================== */

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

/* ==============================
   API ROUTES
============================== */

app.use("/api/blogs", require("./routes/blogRoutes"));
app.use("/api/visitors", require("./routes/visitor"));
app.use("/api", require("./routes/searchRoutes"));
app.use("/api", require("./routes/emailRoutes"));
app.use("/api/category", require("./routes/categoryRoutes"));
app.use("/api/subcategory", require("./routes/subcategoryRoutes"));
app.use("/api/product", require("./routes/productRoutes"));
app.use("/api/admin",  require("./routes/adminRoutes"));
app.use("/api/brands", require("./routes/brandRoutes"));
app.use("/api",        require("./routes/sitemap"));

/* ==============================
   SERVER
============================== */

const PORT = process.env.PORT || 5031;

app.listen(PORT, () => {
  console.log(`🚀 backend-next API server running on port ${PORT}`);
});
