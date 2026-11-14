// Apply explicitly approved rows from the offline GSC draft CSV.
// Never run --apply until the catalog owner has approved the exact CSV hash.
require("dotenv").config();
const fs = require("node:fs");
const crypto = require("node:crypto");
const mongoose = require("mongoose");
require("../models/Category");
require("../models/Subcategory");
const Product = require("../models/product");
const { evaluateProductSeo } = require("../services/productSeoQuality");
const { digestLocalImage } = require("../services/productSeoGate");
const { evaluateProductSeoCandidate, contentFingerprint, expectedCanonical } = require("../services/productSeoQualityCandidate");
const { backupDatabase } = require("./backupMongoDatabase");
const { htmlFromPlainText, similarity, editorialFlags } = require("../services/productSeoContent");
const CANONICAL_HOLD = new Set(["2mm-medium-grain-cork-sheet", "3mm-medium-grain-cork-sheet", "4mm-medium-grain-cork-sheet"]);

function databaseIdentity(uri) {
  const parsed = new URL(uri);
  if (!/^mongodb(?:\+srv)?:$/.test(parsed.protocol)) throw new Error("Expected a MongoDB URI");
  const database = parsed.pathname.replace(/^\//, "").toLowerCase();
  if (!database) throw new Error("Staging URI must specify a database name");
  return `${parsed.hostname.toLowerCase()}/${database}`;
}

function parseCsv(input) {
  const rows = []; let row = [], value = "", quoted = false;
  const text = input.replace(/^\uFEFF/, "");
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (c === '"') {
      if (quoted && text[i + 1] === '"') { value += '"'; i++; } else quoted = !quoted;
    } else if (c === "," && !quoted) { row.push(value); value = ""; }
    else if ((c === "\n" || c === "\r") && !quoted) {
      if (c === "\r" && text[i + 1] === "\n") i++;
      row.push(value); if (row.some(Boolean)) rows.push(row); row = []; value = "";
    } else value += c;
  }
  if (quoted) throw new Error("Unclosed CSV quote");
  if (value || row.length) { row.push(value); rows.push(row); }
  const header = rows.shift();
  if (!header || new Set(header).size !== header.length) throw new Error("Invalid CSV header");
  return rows.map((cells) => {
    if (cells.length !== header.length) throw new Error("Malformed CSV row");
    return Object.fromEntries(header.map((key, i) => [key, cells[i]]));
  });
}

async function main() {
  const argv = process.argv.slice(2);
  const csvPath = argv[argv.indexOf("--csv") + 1];
  const apply = argv.includes("--apply");
  const stagingOnly = argv.includes("--staging-only");
  const approvalPath = argv[argv.indexOf("--approval-file") + 1];
  const backupPath = argv[argv.indexOf("--backup") + 1];
  const ledgerTemplatePath = argv[argv.indexOf("--ledger-template") + 1];
  const ledgerOutPath = argv[argv.indexOf("--ledger-out") + 1];
  if (!csvPath || csvPath.startsWith("--")) throw new Error("Use --csv <file>");
  const raw = fs.readFileSync(csvPath);
  const digest = crypto.createHash("sha256").update(raw).digest("hex");
  const rows = parseCsv(raw.toString("utf8"));
  if (!rows.length || rows.length > 151 || new Set(rows.map((r) => r.product_id)).size !== rows.length) {
    throw new Error("CSV must have 1 to 151 unique product IDs");
  }
  const approved = rows.filter((r) => r.approved === "YES");
  if (approved.some((r) => r.review_status !== "DRAFT_REQUIRES_ADMIN_REVIEW" || editorialFlags[r.slug] || CANONICAL_HOLD.has(r.slug))) {
    throw new Error("Approved rows include a factual or canonical-verification hold");
  }
  console.log(JSON.stringify({ mode: apply ? "apply" : "preview", csvSha256: digest, rows: rows.length, approved: approved.length }));
  if (!apply) return;
  if (!stagingOnly) throw new Error("--apply requires --staging-only; production imports are disabled");
  if (!process.env.STAGING_MONGO_URI || !process.env.MONGO_URI) throw new Error("Both STAGING_MONGO_URI and MONGO_URI are required for target separation");
  const stagingTarget = new URL(process.env.STAGING_MONGO_URI);
  if (stagingTarget.hostname !== "127.0.0.1" || stagingTarget.port !== "27028" ||
      stagingTarget.pathname !== "/printkee-seo-staging-20261114") {
    throw new Error("This importer is restricted to the restored local SEO staging database");
  }
  if (databaseIdentity(process.env.STAGING_MONGO_URI) === databaseIdentity(process.env.MONGO_URI)) {
    throw new Error("Staging target matches the production MongoDB host and database");
  }
  if (!approvalPath || approvalPath.startsWith("--") || !backupPath || backupPath.startsWith("--") ||
      !ledgerTemplatePath || ledgerTemplatePath.startsWith("--") || !ledgerOutPath || ledgerOutPath.startsWith("--")) {
    throw new Error("--apply requires --approval-file, --backup, --ledger-template and --ledger-out");
  }
  const manifest = JSON.parse(fs.readFileSync(approvalPath, "utf8"));
  if (manifest.csvSha256 !== digest || manifest.targetEnvironment !== "staging" ||
      manifest.approvalStatement !== "I approve these exact Printkee product SEO drafts for MongoDB update" ||
      !Array.isArray(manifest.approvedProductIds) ||
      manifest.approvedProductIds.length !== approved.length ||
      approved.some((row) => !manifest.approvedProductIds.includes(row.product_id)) ||
      !manifest.productReviews || manifest.reviewer === "SIMULATION ONLY") {
    throw new Error("Explicit approval manifest does not match this exact CSV and approved row set");
  }
  if (!approved.length) throw new Error("No approved rows");
  if (fs.existsSync(backupPath) || fs.existsSync(ledgerOutPath)) throw new Error("Backup or ledger output already exists; choose new paths");
  const ledger = JSON.parse(fs.readFileSync(ledgerTemplatePath, "utf8"));
  if (ledger.environment !== "staging-template" || !ledger.approvals || Object.keys(ledger.approvals).length) {
    throw new Error("Use an empty staging Gate V2 ledger template");
  }
  await mongoose.connect(process.env.STAGING_MONGO_URI, { serverSelectionTimeoutMS: 10000 });
  try {
    const documents = await Product.find({ _id: { $in: approved.map((r) => r.product_id) } })
      .populate("category", "name slug isActive")
      .populate("subcategory", "name slug category isActive");
    if (documents.length !== approved.length) throw new Error("A product is missing from MongoDB");
    const byId = new Map(documents.map((doc) => [String(doc._id), doc]));
    const prepared = approved.map((row) => {
      const doc = byId.get(row.product_id);
      const review = manifest.productReviews[row.product_id];
      if (!review || review.identityVerified !== true || review.imageVerified !== true ||
          review.factsVerified !== true || review.copyApproved !== true || review.canonicalReviewed !== true ||
          review.contentUseful !== true || review.duplicateReviewed !== true ||
          !review.reviewer || /simulation/i.test(review.reviewer) || !review.reviewedAt ||
          !review.imageDigest || review.imageDigest !== digestLocalImage(doc)) {
        throw new Error(`Current image and factual review are not approved: ${row.slug}`);
      }
      if (doc.slug !== row.slug || new Date(doc.updatedAt).toISOString() !== new Date(row.source_updated_at).toISOString()) {
        throw new Error(`Product changed since source export: ${row.slug}`);
      }
      if (doc.status !== "published" || !doc.isActive) throw new Error(`Product no longer published: ${row.slug}`);
      const imageAlts = JSON.parse(row.proposed_image_alt_text_json);
      if (!Array.isArray(imageAlts) || imageAlts.length !== doc.images.length) throw new Error(`Image set changed: ${row.slug}`);
      const long = row.proposed_long_description.trim();
      const short = row.proposed_short_description.trim();
      const title = row.proposed_seo_title.trim();
      const meta = row.proposed_meta_description.trim();
      if (!short || !long || title.length < 20 || meta.length < 70) throw new Error(`Incomplete approved draft: ${row.slug}`);
      const snapshot = doc.toObject();
      snapshot.description = { short, long: htmlFromPlainText(long) };
      snapshot.seo = { ...snapshot.seo, metaTitle: title, metaDescription: meta };
      snapshot.images = snapshot.images.map((im, i) => ({ ...im, altText: imageAlts[i] }));
      const quality = evaluateProductSeo(snapshot);
      return { row, doc, snapshot, quality };
    });
    for (let i = 0; i < prepared.length; i++) for (let j = i + 1; j < prepared.length; j++) {
      if (similarity(prepared[i].row.proposed_long_description, prepared[j].row.proposed_long_description) >= 0.5) {
        throw new Error(`Near-duplicate approved drafts: ${prepared[i].row.slug}, ${prepared[j].row.slug}`);
      }
      if (prepared[i].row.proposed_seo_title.toLowerCase() === prepared[j].row.proposed_seo_title.toLowerCase() ||
          prepared[i].row.proposed_meta_description.toLowerCase() === prepared[j].row.proposed_meta_description.toLowerCase()) {
        throw new Error(`Duplicate approved SEO metadata: ${prepared[i].row.slug}, ${prepared[j].row.slug}`);
      }
    }
    const otherProducts = await Product.find({ _id: { $nin: approved.map((r) => r.product_id) } })
      .select("slug description.long").lean();
    for (const item of prepared) for (const other of otherProducts) {
      if (similarity(item.row.proposed_long_description, other.description?.long || "") >= 0.5) {
        throw new Error(`Approved draft resembles existing product copy: ${item.row.slug}, ${other.slug}`);
      }
    }
    for (const { row, doc, snapshot } of prepared) {
      const review = manifest.productReviews[row.product_id];
      ledger.approvals[row.product_id] = {
        fingerprint: contentFingerprint(snapshot), canonical: expectedCanonical(snapshot),
        primaryImageUrl: snapshot.images[0]?.url, identityVerified: true, imageVerified: true,
        contentUseful: true, duplicateReviewed: true, reviewer: review.reviewer,
        reviewedAt: review.reviewedAt, imageDigest: review.imageDigest,
      };
      const quality = evaluateProductSeoCandidate(snapshot, {
        ...ledger, protectLegacy: true, legacyIndexedIds: new Set(ledger.legacyIndexedIds),
        duplicatePeers: new Map(Object.entries(ledger.duplicatePeers)),
        imageDigests: new Map([[row.product_id, digestLocalImage(doc)]]),
      });
      if (!quality.eligible) throw new Error(`Gate V2 still excludes ${row.slug}: ${quality.issues.join("; ")}`);
    }
    // Back up every collection and its indexes immediately before the first write.
    const backup = await backupDatabase(mongoose.connection.db, backupPath);
    if (backup.collections.find((entry) => entry.name === "products")?.count < documents.length) {
      throw new Error("Full database backup did not contain every selected product");
    }
    fs.writeFileSync(require("node:path").join(backupPath, "seo-update-plan.json"),
      JSON.stringify({ csvSha256: digest, approvedProductIds: approved.map((row) => row.product_id),
        createdAt: new Date().toISOString() }, null, 2), { flag: "wx" });
    let updated = 0;
    for (const { row, doc, snapshot } of prepared) {
      const result = await Product.updateOne({ _id: doc._id, updatedAt: doc.updatedAt }, {
        $set: {
          "description.short": snapshot.description.short,
          "description.long": snapshot.description.long,
          "seo.metaTitle": snapshot.seo.metaTitle,
          "seo.metaDescription": snapshot.seo.metaDescription,
          images: snapshot.images,
        },
      });
      if (result.modifiedCount !== 1) throw new Error(`Concurrent change stopped import after ${updated} updates: ${row.slug}. Restore from backup if needed.`);
      updated++;
    }
    ledger.environment = "staging";
    ledger.sourceCsvSha256 = digest;
    ledger.stagingUpdatedAt = new Date().toISOString();
    fs.writeFileSync(ledgerOutPath, JSON.stringify(ledger, null, 2), { flag: "wx" });
    console.log(JSON.stringify({ stagingUpdated: updated, gateV2EligibleWithApprovedLedger: prepared.length,
      legacyGateEligible: prepared.filter((p) => p.quality.eligible).length,
      legacyGateExcluded: prepared.filter((p) => !p.quality.eligible).map((p) => ({ slug: p.row.slug, reasons: p.quality.issues })) }));
  } finally {
    await mongoose.disconnect();
  }
}
main().catch((error) => { console.error(error.name + ": " + String(error.message).replace(/mongodb(?:\+srv)?:\/\/[^@ ]+@/g, "mongodb://[redacted]@")); process.exitCode = 1; });
