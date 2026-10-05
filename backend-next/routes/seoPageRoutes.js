const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const SeoPage = require("../models/SeoPage");
const SeoTaxonomy = require("../models/SeoTaxonomy");
const SeoOpportunity = require("../models/SeoOpportunity");
const { verifyToken } = require("../middleware/auth");
const { ok, fail, asyncHandler } = require("../utils/response");
const { evaluateSeoPage, normalizeKeyword, normalizePath } = require("../services/seoQuality");

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);
const productPopulate = [
  { path: "featuredProducts", select: "name slug images description.short attributes stock", populate: [
    { path: "category", select: "name slug" },
    { path: "subcategory", select: "name slug" },
  ] },
];

const PAGE_FIELDS = [
  "name", "path", "slug", "pageType", "category", "subcategory", "location", "buyerType", "industry",
  "occasion", "useCase", "searchIntent", "primaryKeyword", "secondaryKeywords", "seoTitle", "metaDescription",
  "h1", "intro", "bodyContent", "contentBlocks", "faqs", "featuredProducts", "relatedCategories",
  "relatedPages", "relatedLocations", "parentPath", "ctaText", "canonicalUrl", "robots", "ogTitle",
  "ogDescription", "ogImage", "schemaOptions", "status", "priority", "searchDemandScore", "lastReviewedAt",
];

const pickPageFields = (body) => Object.fromEntries(
  PAGE_FIELDS.filter((field) => body[field] !== undefined).map((field) => [field, body[field]])
);

const preparePage = async (payload, id = null) => {
  const page = { ...payload };
  page.path = normalizePath(page.path);
  page.slug = page.path.split("/").filter(Boolean).at(-1) || "";
  page.normalizedPrimaryKeyword = normalizeKeyword(page.primaryKeyword);
  if (!page.canonicalUrl) page.canonicalUrl = `https://printkee.com${page.path}`;

  const report = await evaluateSeoPage(page, id);
  page.contentQualityScore = report.score;
  page.qualityIssues = report.issues;
  page.maximumSimilarity = report.maximumSimilarity;
  page.similarPagePath = report.similarPagePath;

  if (page.status === "INDEXABLE") {
    if (!report.eligible) return { page, report };
    page.robots = { ...(page.robots || {}), index: true, follow: page.robots?.follow !== false };
    page.publishedAt = page.publishedAt || new Date();
    page.lastReviewedAt = page.lastReviewedAt || new Date();
  } else {
    page.robots = { ...(page.robots || {}), index: false, follow: page.robots?.follow !== false };
    if (page.status === "ARCHIVED") page.publishedAt = null;
  }
  return { page, report };
};

// Public: exact-path resolver. Only quality-approved pages are visible.
router.get(
  "/resolve",
  asyncHandler(async (req, res) => {
    const path = normalizePath(req.query.path || "");
    const page = await SeoPage.findOne({ path, status: "INDEXABLE", "robots.index": true })
      .populate(productPopulate)
      .lean();
    if (!page) return fail(res, 404, "SEO page not found");
    return ok(res, page);
  })
);

router.get(
  "/indexable",
  asyncHandler(async (req, res) => {
    const query = { status: "INDEXABLE", "robots.index": true };
    if (req.query.pageType) query.pageType = req.query.pageType;
    if (req.query.location) query.location = req.query.location;
    if (req.query.category) query.category = req.query.category;
    const pages = await SeoPage.find(query)
      .select("name path pageType category location buyerType industry occasion primaryKeyword h1 intro priority updatedAt relatedPages relatedLocations relatedCategories")
      .sort({ priority: -1, updatedAt: -1 })
      .limit(250)
      .lean();
    return ok(res, pages);
  })
);

// Admin dashboard and CRUD.
router.get(
  "/admin/stats",
  verifyToken,
  asyncHandler(async (req, res) => {
    const [statusCounts, missingMeta, missingH1, withoutProducts, duplicateTitles, duplicateKeywords] = await Promise.all([
      SeoPage.aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }]),
      SeoPage.countDocuments({ $or: [{ metaDescription: "" }, { metaDescription: { $exists: false } }] }),
      SeoPage.countDocuments({ $or: [{ h1: "" }, { h1: { $exists: false } }] }),
      SeoPage.countDocuments({ featuredProducts: { $size: 0 } }),
      SeoPage.aggregate([{ $match: { seoTitle: { $ne: "" } } }, { $group: { _id: "$seoTitle", count: { $sum: 1 } } }, { $match: { count: { $gt: 1 } } }, { $count: "count" }]),
      SeoPage.aggregate([{ $group: { _id: "$normalizedPrimaryKeyword", count: { $sum: 1 } } }, { $match: { _id: { $ne: "" }, count: { $gt: 1 } } }, { $count: "count" }]),
    ]);
    return ok(res, {
      statuses: Object.fromEntries(statusCounts.map((item) => [item._id, item.count])),
      missingMeta,
      missingH1,
      withoutProducts,
      duplicateTitles: duplicateTitles[0]?.count || 0,
      duplicatePrimaryKeywords: duplicateKeywords[0]?.count || 0,
    });
  })
);

router.get(
  "/admin/pages",
  verifyToken,
  asyncHandler(async (req, res) => {
    const query = {};
    for (const field of ["status", "pageType", "category", "location", "buyerType", "industry", "occasion"]) {
      if (req.query[field]) query[field] = req.query[field];
    }
    const pages = await SeoPage.find(query).sort({ updatedAt: -1 }).populate(productPopulate).lean();
    return ok(res, pages);
  })
);

router.post(
  "/admin/pages/validate",
  verifyToken,
  asyncHandler(async (req, res) => ok(res, await evaluateSeoPage(req.body, req.body._id || null)))
);

router.post(
  "/admin/pages",
  verifyToken,
  asyncHandler(async (req, res) => {
    const { page, report } = await preparePage(pickPageFields(req.body));
    if (page.status === "INDEXABLE" && !report.eligible) {
      return fail(res, 422, "Page failed the indexability quality gate", report);
    }
    const created = await SeoPage.create(page);
    return ok(res, created, 201);
  })
);

router.put(
  "/admin/pages/:id",
  verifyToken,
  asyncHandler(async (req, res) => {
    if (!isValidId(req.params.id)) return fail(res, 400, "Invalid SEO page ID");
    const existing = await SeoPage.findById(req.params.id).lean();
    if (!existing) return fail(res, 404, "SEO page not found");
    const { page, report } = await preparePage({ ...existing, ...pickPageFields(req.body) }, req.params.id);
    if (page.status === "INDEXABLE" && !report.eligible) {
      return fail(res, 422, "Page failed the indexability quality gate", report);
    }
    const updated = await SeoPage.findByIdAndUpdate(req.params.id, page, { new: true, runValidators: true });
    return ok(res, updated);
  })
);

router.delete(
  "/admin/pages/:id",
  verifyToken,
  asyncHandler(async (req, res) => {
    if (!isValidId(req.params.id)) return fail(res, 400, "Invalid SEO page ID");
    const page = await SeoPage.findByIdAndUpdate(req.params.id, { status: "ARCHIVED", "robots.index": false, publishedAt: null }, { new: true });
    if (!page) return fail(res, 404, "SEO page not found");
    return ok(res, page);
  })
);

// Taxonomy management.
router.get("/admin/taxonomy", verifyToken, asyncHandler(async (req, res) => {
  const query = req.query.type ? { type: req.query.type } : {};
  return ok(res, await SeoTaxonomy.find(query).sort({ type: 1, priority: -1, name: 1 }).lean());
}));
router.post("/admin/taxonomy", verifyToken, asyncHandler(async (req, res) => ok(res, await SeoTaxonomy.create(req.body), 201)));
router.put("/admin/taxonomy/:id", verifyToken, asyncHandler(async (req, res) => {
  if (!isValidId(req.params.id)) return fail(res, 400, "Invalid taxonomy ID");
  const item = await SeoTaxonomy.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  return item ? ok(res, item) : fail(res, 404, "Taxonomy item not found");
}));

// Opportunity records accept only manually supplied metrics.
router.get("/admin/opportunities", verifyToken, asyncHandler(async (req, res) => ok(res, await SeoOpportunity.find().sort({ priority: -1, updatedAt: -1 }).lean())));
router.post("/admin/opportunities", verifyToken, asyncHandler(async (req, res) => {
  const payload = { ...req.body, normalizedKeyword: normalizeKeyword(req.body.keyword) };
  return ok(res, await SeoOpportunity.create(payload), 201);
}));
router.put("/admin/opportunities/:id", verifyToken, asyncHandler(async (req, res) => {
  if (!isValidId(req.params.id)) return fail(res, 400, "Invalid opportunity ID");
  const payload = { ...req.body };
  if (payload.keyword) payload.normalizedKeyword = normalizeKeyword(payload.keyword);
  const item = await SeoOpportunity.findByIdAndUpdate(req.params.id, payload, { new: true, runValidators: true });
  return item ? ok(res, item) : fail(res, 404, "Opportunity not found");
}));

module.exports = router;
