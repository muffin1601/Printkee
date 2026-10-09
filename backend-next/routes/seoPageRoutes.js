const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const SeoPage = require("../models/SeoPage");
const SeoTaxonomy = require("../models/SeoTaxonomy");
const SeoOpportunity = require("../models/SeoOpportunity");
const SeoKeyword = require("../models/SeoKeyword");
const SeoCandidate = require("../models/SeoCandidate");
const SeoAuditEvent = require("../models/SeoAuditEvent");
const SeoLocation = require("../models/SeoLocation");
const categoryData = require("../data/categoryData");
const { verifyToken } = require("../middleware/auth");
const { ok, fail, asyncHandler } = require("../utils/response");
const { evaluateSeoPage, normalizeKeyword, normalizePath } = require("../services/seoQuality");
const { OPPORTUNITY_COLUMNS, parseCsv, serializeCsv, validateKeywordRows, validateOpportunityRows } = require("../services/seoCsv");
const { generateCandidateInventory } = require("../services/seoCandidateGenerator");

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
  "images", "quotationPath", "significantContentUpdatedAt",
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
router.get("/admin/opportunities.csv", verifyToken, asyncHandler(async (req, res) => {
  const opportunities = await SeoOpportunity.find().sort({ priority: -1, updatedAt: -1 }).lean();
  const rows = opportunities.map((item) => ({
    "Keyword": item.keyword, "Search Volume": item.searchVolume, "Difficulty": item.difficulty,
    "Location": item.location, "Category": item.category, "Buyer Type": item.buyerType,
    "Intent": item.intent, "Existing Ranking": item.existingRanking, "Existing URL": item.existingUrl,
    "Proposed URL": item.proposedUrl, "Page Needed": item.pageNeeded, "Priority": item.priority,
    "Status": item.status, "Notes": item.notes, "Source": item.source,
  }));
  res.setHeader("Content-Type", "text/csv; charset=utf-8");
  res.setHeader("Content-Disposition", 'attachment; filename="printkee-seo-opportunities.csv"');
  return res.send(`\uFEFF${serializeCsv(OPPORTUNITY_COLUMNS, rows)}`);
}));
router.post(
  "/admin/opportunities/import",
  verifyToken,
  express.text({ type: ["text/csv", "application/csv", "text/plain"], limit: "2mb" }),
  asyncHandler(async (req, res) => {
    const rows = parseCsv(req.body || "");
    const headers = rows.length ? Object.keys(rows[0]) : [];
    const missingHeaders = ["Keyword", "Status"].filter((header) => !headers.includes(header));
    if (missingHeaders.length) return fail(res, 400, `CSV is missing required columns: ${missingHeaders.join(", ")}`);
    const { records, errors } = validateOpportunityRows(rows, normalizeKeyword);
    if (errors.length) return fail(res, 422, "CSV validation failed", { rowCount: rows.length, errors: errors.slice(0, 200) });
    if (req.query.commit !== "true") return ok(res, { valid: true, committed: false, rowCount: records.length, preview: records.slice(0, 10) });
    if (!records.length) return fail(res, 400, "CSV has no data rows");
    const operations = records.map((record) => ({ updateOne: { filter: { normalizedKeyword: record.normalizedKeyword }, update: { $set: record }, upsert: true } }));
    const result = await SeoOpportunity.bulkWrite(operations, { ordered: false });
    return ok(res, { valid: true, committed: true, rowCount: records.length, inserted: result.upsertedCount || 0, updated: result.modifiedCount || 0, matched: result.matchedCount || 0 });
  })
);
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

// Full keyword inventory. Preview is the default; commit must be explicit.
router.post(
  "/admin/keywords/import",
  verifyToken,
  express.text({ type: ["text/csv", "application/csv", "text/plain"], limit: "12mb" }),
  asyncHandler(async (req, res) => {
    const rows = parseCsv(req.body || "");
    const headers = rows.length ? Object.keys(rows[0]) : [];
    if (!headers.includes("Original Keyword") && !headers.includes("Keyword")) {
      return fail(res, 400, "CSV is missing Original Keyword");
    }
    const { records, errors } = validateKeywordRows(rows, normalizeKeyword);
    if (errors.length) return fail(res, 422, "Keyword CSV validation failed", { rowCount: rows.length, errors: errors.slice(0, 200) });
    const summary = records.reduce((result, record) => {
      result[record.status] = (result[record.status] || 0) + 1;
      return result;
    }, {});
    if (req.query.commit !== "true") return ok(res, { valid: true, committed: false, rowCount: records.length, summary, preview: records.slice(0, 10) });
    if (!records.length) return fail(res, 400, "CSV has no data rows");
    const operations = records.map((record) => ({ updateOne: { filter: { sourceKey: record.sourceKey }, update: { $set: record }, upsert: true } }));
    const result = await SeoKeyword.bulkWrite(operations, { ordered: false });
    await SeoAuditEvent.create({
      batchId: `keyword-import-${Date.now()}`, actor: req.admin?.email || "admin", action: "IMPORT_KEYWORDS",
      entityType: "SeoKeyword", afterSummary: { rowCount: records.length, summary }, metadata: { source: "csv" },
    });
    return ok(res, { valid: true, committed: true, rowCount: records.length, summary, inserted: result.upsertedCount || 0, updated: result.modifiedCount || 0 });
  })
);

router.get("/admin/keywords/stats", verifyToken, asyncHandler(async (req, res) => {
  const [total, statusCounts, unmapped] = await Promise.all([
    SeoKeyword.countDocuments(),
    SeoKeyword.aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }]),
    SeoKeyword.countDocuments({ status: "UNMAPPED" }),
  ]);
  return ok(res, { total, unmapped, statuses: Object.fromEntries(statusCounts.map((item) => [item._id, item.count])) });
}));

router.get("/admin/keywords", verifyToken, asyncHandler(async (req, res) => {
  const page = Math.max(1, Number(req.query.page) || 1);
  const limit = Math.min(200, Math.max(1, Number(req.query.limit) || 50));
  const query = req.query.status ? { status: req.query.status } : {};
  if (req.query.search) query.normalizedKeyword = { $regex: String(req.query.search).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), $options: "i" };
  const [items, total] = await Promise.all([
    SeoKeyword.find(query).sort({ sourceRow: 1 }).skip((page - 1) * limit).limit(limit).lean(),
    SeoKeyword.countDocuments(query),
  ]);
  return ok(res, { items, total, page, limit, pages: Math.ceil(total / limit) });
}));

router.get("/admin/locations", verifyToken, asyncHandler(async (req, res) => {
  const query = req.query.activeStatus ? { activeStatus: req.query.activeStatus } : {};
  return ok(res, await SeoLocation.find(query).sort({ country: 1, state: 1, city: 1, name: 1 }).lean());
}));
router.post("/admin/locations", verifyToken, asyncHandler(async (req, res) => {
  const created = await SeoLocation.create(req.body);
  await SeoAuditEvent.create({ batchId: `location-create-${Date.now()}`, actor: req.admin?.email || "admin", action: "CREATE_LOCATION", entityType: "SeoLocation", entityIds: [created._id], afterSummary: created.toObject() });
  return ok(res, created, 201);
}));
router.put("/admin/locations/:id", verifyToken, asyncHandler(async (req, res) => {
  if (!isValidId(req.params.id)) return fail(res, 400, "Invalid location ID");
  const existing = await SeoLocation.findById(req.params.id).lean();
  if (!existing) return fail(res, 404, "Location not found");
  const updated = await SeoLocation.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  await SeoAuditEvent.create({ batchId: `location-update-${Date.now()}`, actor: req.admin?.email || "admin", action: "UPDATE_LOCATION", entityType: "SeoLocation", entityIds: [updated._id], beforeSummary: existing, afterSummary: updated.toObject() });
  return ok(res, updated);
}));

router.get("/admin/candidates", verifyToken, asyncHandler(async (req, res) => {
  const page = Math.max(1, Number(req.query.page) || 1);
  const limit = Math.min(200, Math.max(1, Number(req.query.limit) || 50));
  const query = {};
  for (const field of ["status", "entityType", "locationSlug", "modifier"]) if (req.query[field]) query[field] = req.query[field];
  if (req.query.search) query.$or = [
    { proposedPath: { $regex: String(req.query.search).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), $options: "i" } },
    { targetKeyword: { $regex: String(req.query.search).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), $options: "i" } },
  ];
  const [items, total] = await Promise.all([
    SeoCandidate.find(query).sort({ priority: -1, proposedPath: 1 }).skip((page - 1) * limit).limit(limit).lean(),
    SeoCandidate.countDocuments(query),
  ]);
  return ok(res, { items, total, page, limit, pages: Math.ceil(total / limit) });
}));

router.get("/admin/candidates/stats", verifyToken, asyncHandler(async (req, res) => {
  const [total, statusCounts, exactDuplicatePaths, unresolvedRouteConflicts, sitemapIncluded] = await Promise.all([
    SeoCandidate.countDocuments(),
    SeoCandidate.aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }]),
    SeoCandidate.aggregate([{ $group: { _id: "$proposedPath", count: { $sum: 1 } } }, { $match: { count: { $gt: 1 } } }, { $count: "count" }]),
    SeoCandidate.countDocuments({ routeConflict: true, status: { $nin: ["REJECTED", "MERGED", "CANONICALIZED", "ARCHIVED"] } }),
    SeoCandidate.countDocuments({ sitemapIncluded: true, indexable: true, status: "PUBLISHED" }),
  ]);
  return ok(res, {
    total, statuses: Object.fromEntries(statusCounts.map((item) => [item._id, item.count])),
    exactDuplicatePaths: exactDuplicatePaths[0]?.count || 0, unresolvedRouteConflicts, sitemapIncluded,
  });
}));

router.post("/admin/candidates/generate", verifyToken, asyncHandler(async (req, res) => {
  const generated = generateCandidateInventory(categoryData, { capacity: 20000 });
  if (req.query.commit !== "true") {
    return ok(res, { committed: false, metrics: generated.metrics, statusCounts: generated.candidates.reduce((acc, item) => ({ ...acc, [item.status]: (acc[item.status] || 0) + 1 }), {}), preview: generated.candidates.slice(0, 20) });
  }
  const now = new Date();
  const operations = generated.candidates.map((candidate) => ({
    updateOne: { filter: { proposedPath: candidate.proposedPath }, update: { $set: { ...candidate, lastEvaluatedAt: now } }, upsert: true },
  }));
  const result = await SeoCandidate.bulkWrite(operations, { ordered: false });
  await SeoAuditEvent.create({
    batchId: `candidate-generation-${Date.now()}`, actor: req.admin?.email || "admin", action: "GENERATE_CANDIDATES",
    entityType: "SeoCandidate", afterSummary: generated.metrics, metadata: { algorithmVersion: 1 },
  });
  return ok(res, { committed: true, metrics: generated.metrics, inserted: result.upsertedCount || 0, updated: result.modifiedCount || 0 });
}));

router.post("/admin/candidates/bulk", verifyToken, asyncHandler(async (req, res) => {
  const ids = Array.isArray(req.body.ids) ? [...new Set(req.body.ids)] : [];
  if (!ids.length || ids.length > 1000 || ids.some((id) => !isValidId(id))) return fail(res, 400, "Provide 1 to 1,000 valid candidate IDs");
  const action = String(req.body.action || "").toUpperCase();
  const allowed = new Set(["APPROVE", "REJECT", "MERGE", "ARCHIVE", "UNPUBLISH", "EDIT_PRIORITY"]);
  if (!allowed.has(action)) return fail(res, 400, "Unsupported bulk action");
  const candidates = await SeoCandidate.find({ _id: { $in: ids } }).lean();
  if (candidates.length !== ids.length) return fail(res, 404, "One or more candidates were not found");
  const invalidApprovals = action === "APPROVE" ? candidates.filter((item) => !item.serviceVerified || !item.hasApplicableProducts || !item.hasUniqueLocationInformation || item.routeConflict || item.qualityScore < 80) : [];
  const preview = { action, requested: ids.length, matched: candidates.length, invalidApprovals: invalidApprovals.map((item) => item.proposedPath), paths: candidates.slice(0, 25).map((item) => item.proposedPath) };
  if (req.query.commit !== "true") return ok(res, { committed: false, preview });
  if (invalidApprovals.length) return fail(res, 422, "Candidates failed approval requirements", preview);
  const updates = {
    APPROVE: { status: "APPROVED", indexable: false, sitemapIncluded: false, dispositionReason: "Approved to become a reviewed landing-page draft; not yet published." },
    REJECT: { status: "REJECTED", indexable: false, sitemapIncluded: false, dispositionReason: String(req.body.reason || "Rejected during editorial review") },
    MERGE: { status: "MERGED", indexable: false, sitemapIncluded: false, canonicalPath: normalizePath(req.body.canonicalPath || ""), dispositionReason: String(req.body.reason || "Merged during editorial review") },
    ARCHIVE: { status: "ARCHIVED", indexable: false, sitemapIncluded: false },
    UNPUBLISH: { status: "REVIEW", indexable: false, sitemapIncluded: false, dispositionReason: String(req.body.reason || "Unpublished for review") },
    EDIT_PRIORITY: { priority: Math.min(100, Math.max(0, Number(req.body.priority))) },
  };
  if (action === "MERGE" && (!req.body.canonicalPath || req.body.canonicalPath === "/")) return fail(res, 400, "A non-root canonicalPath is required for merge");
  if (action === "EDIT_PRIORITY" && !Number.isFinite(Number(req.body.priority))) return fail(res, 400, "A numeric priority is required");
  await SeoCandidate.updateMany({ _id: { $in: ids } }, { $set: { ...updates[action], lastEvaluatedAt: new Date() } }, { runValidators: true });
  await SeoAuditEvent.create({
    batchId: `candidate-bulk-${Date.now()}`, actor: req.admin?.email || "admin", action, entityType: "SeoCandidate",
    entityIds: ids, beforeSummary: candidates.reduce((acc, item) => ({ ...acc, [item.status]: (acc[item.status] || 0) + 1 }), {}),
    afterSummary: updates[action], metadata: { reason: req.body.reason || "" },
  });
  return ok(res, { committed: true, preview, update: updates[action] });
}));

router.get("/admin/audit-events", verifyToken, asyncHandler(async (req, res) => {
  const limit = Math.min(100, Math.max(1, Number(req.query.limit) || 50));
  return ok(res, await SeoAuditEvent.find().sort({ createdAt: -1 }).limit(limit).lean());
}));

module.exports = router;
