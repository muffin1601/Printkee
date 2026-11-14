// Local-only staging readiness check before any admin content approval.
const fs = require("node:fs");
const path = require("node:path");
const mongoose = require("mongoose");
require("../models/Category");
require("../models/Subcategory");
const Product = require("../models/product");
const { parseCsv } = require("../services/seoCsv");
const { evaluateProductSeoCandidate } = require("../services/productSeoQualityCandidate");
const { digestLocalImage } = require("../services/productSeoGate");
const root = path.resolve(__dirname, "../../seo/05-technical-audits");
const uri = "mongodb://127.0.0.1:27028/printkee-seo-staging-20261114";

async function main() {
  const manifest = require("../../.local-backups/printkee-2026-11-14-pre-seo/manifest.json");
  const original = parseCsv(fs.readFileSync(path.join(root, "GSC_PRODUCT_SEO_FINAL_REVIEW_151_2026-11-14.csv"), "utf8"));
  const batch = parseCsv(fs.readFileSync(path.join(root, "GSC_PRODUCT_SEO_APPROVAL_BATCH_60_2026-11-14.csv"), "utf8"));
  const ledger = require("../../seo/05-technical-audits/GSC_PRODUCT_GATE_V2_STAGING_LEDGER_TEMPLATE_2026-11-14.json");
  if (Object.keys(ledger.approvals).length || batch.some((r) => r.approved !== "NO")) throw new Error("Unexpected approval evidence");
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
  try {
    for (const entry of manifest.collections) {
      const count = await mongoose.connection.db.collection(entry.name).countDocuments({});
      if (count !== entry.count) throw new Error(`Collection count differs from backup: ${entry.name}`);
    }
    const docs = await Product.find({ _id: { $in: original.map((r) => r.product_id) } })
      .populate("category", "name slug isActive")
      .populate("subcategory", "name slug category isActive");
    if (docs.length !== 151 || await Product.countDocuments({}) !== 234) throw new Error("Staging product count mismatch");
    const byId = new Map(docs.map((doc) => [String(doc._id), doc]));
    const batchById = new Map(batch.map((r) => [r.product_id, r]));
    const results = [];
    for (const row of original) {
      const doc = byId.get(row.product_id);
      if (!doc || doc.slug !== row.slug || new Date(doc.updatedAt).toISOString() !== new Date(row.source_updated_at).toISOString()) {
        throw new Error(`Staging product differs from source: ${row.slug}`);
      }
      const review = batchById.get(row.product_id);
      if (review && digestLocalImage(doc) !== review.primary_image_sha256) throw new Error(`Image changed: ${row.slug}`);
      const quality = evaluateProductSeoCandidate(doc, {
        ...ledger, protectLegacy: true, legacyIndexedIds: new Set(ledger.legacyIndexedIds),
        duplicatePeers: new Map(Object.entries(ledger.duplicatePeers)),
        imageDigests: new Map([[row.product_id, digestLocalImage(doc)]]),
      });
      results.push({ slug: row.slug, status: review?.review_status || row.review_status,
        eligible: quality.eligible, issues: quality.issues });
    }
    if (results.some((r) => r.eligible)) throw new Error("An unapproved target is eligible in staging");
    const summary = { database: "printkee-seo-staging-20261114", host: "127.0.0.1:27028",
      collections: manifest.collections.length, products: 234, targets: results.length,
      approved: 0, currentlyEligibleTargets: 0, reviewable: 24, unresolved: 127,
      allCollectionCountsMatchBackup: true, allTargetTimestampsMatchSource: true,
      allBatchPrimaryImagesMatch: true };
    fs.writeFileSync(path.join(root, "GSC_LOCAL_STAGING_BASELINE_2026-11-14.json"), JSON.stringify(summary, null, 2));
    console.log(JSON.stringify(summary));
  } finally { await mongoose.disconnect(); }
}
main().catch((error) => { console.error(`${error.name}: ${error.message}`); process.exitCode = 1; });
