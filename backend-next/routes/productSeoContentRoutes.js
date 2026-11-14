const express = require("express");
const mongoose = require("mongoose");
const rateLimit = require("express-rate-limit");
const Product = require("../models/product");
const AdminAuditEvent = require("../models/AdminAuditEvent");
const { verifyToken, requireRole } = require("../middleware/auth");
const { ok, fail, asyncHandler } = require("../utils/response");
const { editorialFlags, similarity, qualityFor, missingFields, sourceFacts,
  validateEditedContent, editedSnapshot, generateDraft } = require("../services/productSeoContent");

const router = express.Router();
const READ = ["super_admin", "admin", "catalog_manager", "content_editor", "viewer"];
const WRITE = ["super_admin", "admin", "catalog_manager", "content_editor"];
const DRAFT = ["super_admin", "admin", "catalog_manager", "content_editor"];
const validId = (id) => mongoose.Types.ObjectId.isValid(id);
const populate = [
  { path: "category", select: "name slug isActive" },
  { path: "subcategory", select: "name slug isActive category" },
];

const draftLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 20,
  standardHeaders: "draft-8", legacyHeaders: false,
  message: { message: "AI draft limit reached. Try again later." } });

function summary(product) {
  const quality = qualityFor(product);
  return {
    _id: product._id, name: product.name, slug: product.slug, sku: product.sku,
    category: product.category?.name || "", subcategory: product.subcategory?.name || "",
    status: product.status, version: product.__v, quality,
    missingFields: missingFields(product), editorialFlags: editorialFlags[product.slug] || [],
  };
}

router.get("/", verifyToken, requireRole(...READ), asyncHandler(async (req, res) => {
  const search = String(req.query.search || "").trim().toLowerCase().slice(0, 100);
  const eligibility = String(req.query.eligibility || "all");
  const issue = String(req.query.issue || "all");
  const page = Math.max(1, Number(req.query.page) || 1);
  const limit = Math.min(50, Math.max(10, Number(req.query.limit) || 20));
  const products = await Product.find({ deletedAt: null }).populate(populate).sort({ name: 1 }).lean();
  const all = products.map(summary);
  const filtered = all.filter((item) => {
    if (search && ![item.name, item.slug, item.sku].some((value) => String(value || "").toLowerCase().includes(search))) return false;
    if (eligibility === "eligible" && !item.quality.eligible) return false;
    if (eligibility === "excluded" && item.quality.eligible) return false;
    if (eligibility === "flagged" && !item.editorialFlags.length) return false;
    if (issue !== "all" && !item.missingFields.some((field) => field.includes(issue))) return false;
    return true;
  });
  return ok(res, { items: filtered.slice((page - 1) * limit, page * limit), page, limit,
    totalItems: filtered.length, totalPages: Math.ceil(filtered.length / limit),
    totals: { products: all.length, eligible: all.filter((item) => item.quality.eligible).length,
      excluded: all.filter((item) => !item.quality.eligible).length,
      flagged: all.filter((item) => item.editorialFlags.length).length } });
}));

router.get("/:id", verifyToken, requireRole(...READ), asyncHandler(async (req, res) => {
  if (!validId(req.params.id)) return fail(res, 400, "Invalid product ID");
  const product = await Product.findById(req.params.id).populate(populate).lean();
  if (!product) return fail(res, 404, "Product not found");
  return ok(res, { product, ...summary(product), sourceFacts: sourceFacts(product) });
}));

router.post("/:id/preview", verifyToken, requireRole(...READ), asyncHandler(async (req, res) => {
  if (!validId(req.params.id)) return fail(res, 400, "Invalid product ID");
  const product = await Product.findById(req.params.id).populate(populate).lean();
  if (!product) return fail(res, 404, "Product not found");
  const errors = validateEditedContent(product, req.body);
  if (errors.length) return fail(res, 422, errors.join(" "));
  const proposed = editedSnapshot(product, req.body);
  const duplicate = await Product.find({ _id: { $ne: product._id }, deletedAt: null }, "name description.long").lean();
  const same = duplicate.find((other) => similarity(other.description?.long, proposed.description.long) >= 0.88);
  if (same) return fail(res, 409, `Visible description is too similar to ${same.name}.`);
  return ok(res, { quality: qualityFor(proposed), editorialFlags: editorialFlags[product.slug] || [],
    warning: "Preview is a site policy check. Passing numeric thresholds is not proof of content accuracy or Google indexing." });
}));

router.post("/:id/draft", verifyToken, requireRole(...DRAFT), draftLimiter, asyncHandler(async (req, res) => {
  if (!validId(req.params.id)) return fail(res, 400, "Invalid product ID");
  const product = await Product.findById(req.params.id).populate(populate).lean();
  if (!product) return fail(res, 404, "Product not found");
  if (req.body?.factsConfirmed !== true) return fail(res, 400, "Confirm the selected database facts before drafting.");
  try { return ok(res, await generateDraft(product, req.body.verifiedFactKeys, fetch, req.body.verifiedConflict === true)); }
  catch (error) { return fail(res, error.status || 502, error.message || "AI drafting failed"); }
}));

router.put("/:id", verifyToken, requireRole(...WRITE), asyncHandler(async (req, res) => {
  if (!validId(req.params.id)) return fail(res, 400, "Invalid product ID");
  if (req.body?.reviewed !== true) return fail(res, 400, "Confirm that every claim was reviewed against product facts.");
  const version = Number(req.body.version);
  if (!Number.isInteger(version) || version < 0) return fail(res, 400, "A valid product version is required.");
  const product = await Product.findById(req.params.id).populate(populate).lean();
  if (!product) return fail(res, 404, "Product not found");
  if (product.__v !== version) return fail(res, 409, "This product changed. Refresh before saving.");
  const errors = validateEditedContent(product, req.body);
  if (errors.length) return fail(res, 422, errors.join(" "));
  const proposed = editedSnapshot(product, req.body);
  const duplicate = await Product.find({ _id: { $ne: product._id }, deletedAt: null }, "name description.long").lean();
  const same = duplicate.find((other) => similarity(other.description?.long, proposed.description.long) >= 0.88);
  if (same) return fail(res, 409, `Visible description is too similar to ${same.name}.`);
  if ((editorialFlags[product.slug] || []).length && req.body.verifiedConflict !== true) {
    return fail(res, 409, "Confirm the flagged product conflict with a supplier or catalog owner before saving.");
  }
  const updated = await Product.findOneAndUpdate({ _id: product._id, __v: version }, {
    $set: {
      "description.short": proposed.description.short,
      "description.long": proposed.description.long,
      "seo.metaTitle": proposed.seo.metaTitle,
      "seo.metaDescription": proposed.seo.metaDescription,
      images: proposed.images,
    },
    $inc: { __v: 1 },
  }, { new: true, runValidators: true }).populate(populate).lean();
  if (!updated) return fail(res, 409, "This product changed. Refresh before saving.");
  try {
    await AdminAuditEvent.create({ actor: req.admin?.email || "unknown", role: req.admin?.role || "unknown",
      operation: "product.seo_content_approve", productIds: [product._id], status: "success",
      details: { beforeEligible: qualityFor(product).eligible, afterEligible: qualityFor(updated).eligible,
        reviewed: true, verifiedConflict: req.body.verifiedConflict === true } });
  } catch (error) { console.error("Product SEO content audit write failed:", error.message); }
  return ok(res, { product: updated, quality: qualityFor(updated), message: "Reviewed product content saved." });
}));

module.exports = router;
