const express = require("express");
const NewYearPage = require("../models/NewYearPage");
const Product = require("../models/product");
const { verifyToken, requireRole } = require("../middleware/auth");
const { makeUploader, handleUploadError } = require("../middleware/upload");
const { ok, fail, asyncHandler } = require("../utils/response");

const router = express.Router();
const KEY = "new-year-2027";
const ROWS = ["gifts", "diaries", "calendars"];
const writeRoles = ["super_admin", "admin", "catalog_manager", "content_editor"];
const upload = makeUploader("new-year");

const productIds = (settings) => Object.values(settings?.rows || {}).flat()
  .filter((key) => key.startsWith("product:")).map((key) => key.slice(8));
const toCard = (product) => ({
  id: `product:${product._id}`,
  name: product.name,
  image: product.images?.[0]?.url,
  sku: product.sku || "",
  available: product.isActive === true && product.status === "published" && !product.deletedAt,
});

async function readPage(admin) {
  const settings = await NewYearPage.findOne({ key: KEY }).lean();
  const ids = productIds(settings);
  const legacy = Object.values(settings?.rows || {}).flat().filter((key) => key.startsWith("legacy:"));
  const products = ids.length || legacy.length ? await Product.find({
    $or: [{ _id: { $in: ids } }, { slug: { $in: legacy.map((key) => key.slice(7)) } }],
  }).select("name slug images sku status isActive deletedAt").lean() : [];
  return { settings, products: products.flatMap((product) => {
    const card = toCard(product);
    const references = [
      ...(ids.includes(String(product._id)) ? [card.id] : []),
      ...(legacy.includes(`legacy:${product.slug}`) ? [`legacy:${product.slug}`] : []),
    ];
    // A tombstone prevents a legacy fallback from resurrecting an archived product.
    return references.map((id) => card.available || admin ? { ...card, id } : { id, available: false });
  }) };
}

router.get("/", asyncHandler(async (req, res) => {
  res.set("Cache-Control", "no-store");
  return ok(res, await readPage(false));
}));

router.get("/admin", verifyToken, requireRole(...writeRoles, "viewer"), asyncHandler(async (req, res) => {
  res.set("Cache-Control", "no-store");
  return ok(res, await readPage(true));
}));

router.put("/admin", verifyToken, requireRole(...writeRoles), asyncHandler(async (req, res) => {
  const { rows, bannerMode, banner } = req.body;
  if (!rows || Object.keys(rows).length !== ROWS.length ||
      ROWS.some((row) => !Array.isArray(rows[row]) || rows[row].length > 200)) {
    return fail(res, 400, "Provide all three product rows, with at most 200 products each.");
  }
  const keys = ROWS.flatMap((row) => rows[row]);
  if (keys.some((key) => typeof key !== "string" ||
      !/^(legacy:[a-z0-9-]{1,120}|product:[a-f0-9]{24})$/.test(key))) {
    return fail(res, 400, "Invalid product reference.");
  }
  if (new Set(keys).size !== keys.length) return fail(res, 400, "A product can appear in only one row.");
  if (!["default", "custom", "none"].includes(bannerMode)) return fail(res, 400, "Invalid banner mode.");
  let cleanBanner;
  if (bannerMode === "custom") {
    let url;
    try { url = new URL(banner?.url); } catch { return fail(res, 400, "Upload a banner first."); }
    const base = new URL(process.env.BASE_URL);
    if (url.origin !== base.origin || !/^\/uploads\/new-year\/[a-zA-Z0-9.-]+\.(webp|png|jpe?g)$/i.test(url.pathname) ||
        url.search || url.hash || url.username || url.password ||
        !Number.isInteger(banner.width) || !Number.isInteger(banner.height) ||
        banner.width < 1 || banner.height < 1 || banner.width > 20000 || banner.height > 20000 ||
        typeof banner.alt !== "string" || !banner.alt.trim() || banner.alt.length > 500) {
      return fail(res, 400, "Use an uploaded banner, valid dimensions and descriptive alternative text.");
    }
    cleanBanner = { url: url.href, width: banner.width, height: banner.height, alt: banner.alt.trim() };
  }
  const ids = productIds({ rows });
  const legacySlugs = keys.filter((key) => key.startsWith("legacy:")).map((key) => key.slice(7));
  const products = ids.length || legacySlugs.length ? await Product.find({
    $or: [{ _id: { $in: ids } }, { slug: { $in: legacySlugs } }],
  }).lean() : [];
  const foundIds = new Set(products.map((product) => String(product._id)));
  if (ids.some((id) => !foundIds.has(id)) || products.some((p) => !toCard(p).available || !p.images?.[0]?.url)) {
    return fail(res, 400, "Selected catalogue products must be published, active and have an image. Remove unavailable products before saving.");
  }
  if (products.some((product) => ids.includes(String(product._id)) && keys.includes(`legacy:${product.slug}`))) {
    return fail(res, 400, "The same product is selected from both the existing collection and catalogue.");
  }
  for (const row of ["diaries", "calendars"]) {
    const pattern = row === "diaries" ? /\bdiar(y|ies)\b/i : /\bcalendars?\b/i;
    for (const product of products.filter((p) => rows[row].includes(`product:${p._id}`) || rows[row].includes(`legacy:${p.slug}`))) {
      if (!pattern.test(product.name) || (row === "diaries" && /\b(set|kit)s?\b/i.test(product.name))) {
        return fail(res, 400, `${product.name} does not belong in the ${row} row.`);
      }
    }
  }
  await NewYearPage.findOneAndUpdate({ key: KEY }, {
    $set: { rows, bannerMode, ...(cleanBanner ? { banner: cleanBanner } : {}) },
    ...(!cleanBanner ? { $unset: { banner: 1 } } : {}),
  }, { upsert: true, new: true, runValidators: true });
  return ok(res, await readPage(true));
}));

router.post("/upload", verifyToken, requireRole(...writeRoles), upload.single("file"), handleUploadError, (req, res) => {
  if (!req.file) return fail(res, 400, "Choose a banner image.");
  return ok(res, { url: `${process.env.BASE_URL.replace(/\/$/, "")}/uploads/new-year/${req.file.filename}` });
});

module.exports = router;
