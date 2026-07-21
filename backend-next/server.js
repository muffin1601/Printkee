require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");

/* ==============================
   ENV VALIDATION (fail fast)
============================== */
const REQUIRED_ENV_VARS = [
  "MONGO_URI",
  "JWT_SECRET",
  "ADMIN_EMAIL",
  "ADMIN_PASSWORD",
  "BASE_URL",
];

const missingEnvVars = REQUIRED_ENV_VARS.filter((key) => !process.env[key]);
if (missingEnvVars.length > 0) {
  console.error(`❌ Missing required environment variables: ${missingEnvVars.join(", ")}`);
  process.exit(1);
}

const app = express();

// Production runs behind a reverse proxy (nginx) that sets X-Forwarded-For.
// Without this, express-rate-limit throws ERR_ERL_UNEXPECTED_X_FORWARDED_FOR
// on every rate-limited request since it can't safely trust that header.
// `1` = trust exactly one hop (the proxy directly in front of this process),
// which is correct for a single nginx reverse proxy — not `true`, which would
// trust the header from any client and let IP-based rate limiting be spoofed.
app.set("trust proxy", 1);

/* ==============================
   MIDDLEWARE
============================== */

// contentSecurityPolicy/CSP is disabled: this is a pure JSON API + static
// upload server, not an HTML-serving app, so CSP has no HTML to protect and
// would only risk interfering with cross-origin <img> loads of /uploads.
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

// Allowed origins: the production site (inferred from frontend-next/.env.local's
// commented production block — printkee.com, with and without www) plus local
// dev. Override/extend via CORS_ORIGIN (comma-separated) without a code change.
const DEFAULT_ALLOWED_ORIGINS = [
  "https://printkee.com",
  "https://www.printkee.com",
  "http://localhost:3000",
];
const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",").map((o) => o.trim())
  : DEFAULT_ALLOWED_ORIGINS;

app.use(
  cors({
    origin: (origin, callback) => {
      // No Origin header = same-origin request, server-to-server call, or a
      // non-browser client (curl, health checks) — always allow.
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error(`CORS: origin ${origin} not allowed`));
    },
    credentials: true,
  })
);
app.use(express.json({ limit: "2mb" }));

/* Serve uploaded files (images, blog photos, etc.) */
app.use("/uploads", express.static("uploads"));

/* ==============================
   DATABASE
============================== */

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });

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
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/brands", require("./routes/brandRoutes"));
app.use("/api/slides", require("./routes/bannerRoutes"));
app.use("/api/newsletter", require("./routes/newsletterRoutes"));
app.use("/api", require("./routes/sitemap"));

/* ==============================
   404 HANDLER
============================== */
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found", error: null, data: null });
});

/* ==============================
   GLOBAL ERROR HANDLER
============================== */
app.use((err, req, res, next) => {
  console.error(`Unhandled error on ${req.method} ${req.originalUrl}:`, err.message);

  if (err.name === "CastError") {
    return res.status(400).json({ success: false, message: "Invalid ID format", error: err.message, data: null });
  }
  if (err.name === "ValidationError") {
    return res.status(400).json({ success: false, message: "Validation failed", error: err.message, data: null });
  }
  if (err.code === 11000) {
    return res.status(409).json({ success: false, message: "Duplicate value", error: err.message, data: null });
  }
  if (err.message && err.message.startsWith("CORS:")) {
    return res.status(403).json({ success: false, message: "Origin not allowed", error: null, data: null });
  }

  res.status(err.status || 500).json({
    success: false,
    message: "Internal server error",
    error: process.env.NODE_ENV === "production" ? null : err.message,
    data: null,
  });
});

/* ==============================
   SERVER
============================== */

const PORT = process.env.PORT || 5031;

app.listen(PORT, () => {
  console.log(`backend-next API server running on port ${PORT}`);
});
