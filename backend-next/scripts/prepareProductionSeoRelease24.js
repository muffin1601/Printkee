// Read-only production preflight, full local backup, and inert Gate V2 ledger preparation.
// This script never updates MongoDB, deploys code, or enables Gate V2.
require("dotenv").config();
const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const mongoose = require("mongoose");
const { EJSON } = require("bson");
require("../models/Category");
require("../models/Subcategory");
const Product = require("../models/product");
const { parseCsv } = require("../services/seoCsv");
const { htmlFromPlainText } = require("../services/productSeoContent");
const { contentFingerprint, expectedCanonical, evaluateProductSeoCandidate } = require("../services/productSeoQualityCandidate");
const { digestLocalImage } = require("../services/productSeoGate");
const { backupDatabase } = require("./backupMongoDatabase");

const root = path.resolve(__dirname, "../..");
const priorBackup = path.join(root, ".local-backups/printkee-2026-11-14-pre-seo");
const releaseDir = path.join(root, ".local-backups/printkee-production-release-prep-2026-11-14");
const backupDir = path.join(releaseDir, "full-production-backup");
const approvalDir = path.join(root, ".local-backups/printkee-seo-staging-approval-2026-11-14");
const csvPath = path.join(approvalDir, "approved-24.csv");
const manifestPath = path.join(approvalDir, "approval-manifest.json");
const stagingLedgerPath = path.join(root, ".local-backups/printkee-seo-staging-2026-11-14/approved-gate-v2-ledger.json");
const snapshot = require("../../seo/05-technical-audits/GSC_PRODUCT_GATE_HANDOFF_SNAPSHOT_2026-11-13.json").rows;
const targetRows = parseCsv(fs.readFileSync(path.join(root, "seo/05-technical-audits/GSC_PRODUCT_SEO_FINAL_REVIEW_151_2026-11-14.csv"), "utf8"));
const sha256 = (bytes) => crypto.createHash("sha256").update(bytes).digest("hex");
const stable = (value) => {
  if (Array.isArray(value)) return value.map(stable);
  if (value && typeof value === "object") return Object.fromEntries(Object.keys(value).sort().map((key) => [key, stable(value[key])]));
  return value;
};
const same = (a, b) => JSON.stringify(stable(EJSON.serialize(a, { relaxed: false }))) ===
  JSON.stringify(stable(EJSON.serialize(b, { relaxed: false })));

function verifyApproval() {
  const raw = fs.readFileSync(csvPath);
  const rows = parseCsv(raw.toString("utf8"));
  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  const stagingLedger = JSON.parse(fs.readFileSync(stagingLedgerPath, "utf8"));
  const ids = rows.map((row) => row.product_id);
  if (rows.length !== 24 || new Set(ids).size !== 24 || rows.some((row) => row.approved !== "YES" || row.review_status !== "DRAFT_REQUIRES_ADMIN_REVIEW") ||
      sha256(raw) !== manifest.csvSha256 || manifest.targetEnvironment !== "staging" ||
      manifest.approvalStatement !== "I approve these exact Printkee product SEO drafts for MongoDB update" ||
      JSON.stringify(ids) !== JSON.stringify(manifest.approvedProductIds) ||
      stagingLedger.environment !== "staging" || stagingLedger.sourceCsvSha256 !== manifest.csvSha256 ||
      Object.keys(stagingLedger.approvals).length !== 24) throw new Error("Approval evidence or exact CSV scope is missing or changed");
  for (const row of rows) {
    const review = manifest.productReviews?.[row.product_id];
    if (!review || !review.reviewer || /simulation/i.test(review.reviewer) || !review.reviewedAt ||
        ["identityVerified", "imageVerified", "factsVerified", "copyApproved", "canonicalReviewed", "contentUseful", "duplicateReviewed"]
          .some((key) => review[key] !== true) || review.imageDigest !== row.primary_image_sha256 ||
        !stagingLedger.approvals[row.product_id]) throw new Error(`Incomplete approval evidence: ${row.slug}`);
  }
  const held = targetRows.filter((row) => !ids.includes(row.product_id));
  if (targetRows.length !== 151 || held.length !== 127 || held.some((row) =>
      !stagingLedger.holds[row.product_id] && !stagingLedger.variantGroups[row.product_id] &&
      !stagingLedger.confirmedHolds[row.product_id] && !stagingLedger.suspectedHolds[row.product_id])) {
    throw new Error("The 127 target holds are not fully represented");
  }
  if (Object.keys(stagingLedger.confirmedHolds).length !== 2) throw new Error("Two legacy contradiction holds are required");
  return { rows, manifest, stagingLedger };
}

async function readRawProducts() {
  return mongoose.connection.db.collection("products").find({}).toArray();
}

function verifyProductsAgainstPriorBackup(current) {
  const baseline = fs.readFileSync(path.join(priorBackup, "products.ndjson"), "utf8").split("\n").filter(Boolean)
    .map((line) => EJSON.parse(line, { relaxed: false }));
  const byId = new Map(current.map((product) => [String(product._id), product]));
  const mismatches = baseline.filter((product) => !byId.has(String(product._id)) || !same(product, byId.get(String(product._id))))
    .map((product) => String(product._id));
  if (baseline.length !== 234 || current.length !== 234 || mismatches.length) {
    throw new Error(`Production product records changed since approved source: count=${current.length}, mismatches=${mismatches.length}, ids=${mismatches.slice(0, 8).join(",")}`);
  }
}

async function main() {
  const { rows, manifest, stagingLedger } = verifyApproval();
  if (fs.existsSync(releaseDir)) throw new Error("Production preflight directory already exists; preserve earlier evidence");
  const uri = process.env.MONGO_URI;
  if (!uri) throw new Error("Production MONGO_URI is missing");
  const parsed = new URL(uri);
  if (["localhost", "127.0.0.1"].includes(parsed.hostname) || parsed.pathname !== "/printkee-db") {
    throw new Error("Production preflight target does not match the expected remote printkee-db database");
  }
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 10000, readPreference: "primary" });
  try {
    if (mongoose.connection.db.databaseName !== "printkee-db") throw new Error("Connected to an unexpected database");
    verifyProductsAgainstPriorBackup(await readRawProducts());
    const docs = await Product.find({ _id: { $in: rows.map((row) => row.product_id) } })
      .populate("category", "name slug isActive")
      .populate("subcategory", "name slug category isActive");
    if (docs.length !== 24) throw new Error("An approved product is missing from production");
    const byId = new Map(docs.map((doc) => [String(doc._id), doc]));
    const ledger = structuredClone(stagingLedger);
    ledger.environment = "production-prepared";
    ledger.deploymentAuthorized = false;
    ledger.productionSourceCsvSha256 = manifest.csvSha256;
    ledger.productionSourceSnapshot = "printkee-2026-11-14-pre-seo";
    ledger.preparedAt = new Date().toISOString();
    for (const row of rows) {
      const doc = byId.get(row.product_id);
      if (!doc || doc.slug !== row.slug || new Date(doc.updatedAt).toISOString() !== new Date(row.source_updated_at).toISOString() ||
          digestLocalImage(doc) !== row.primary_image_sha256) throw new Error(`Approved product source changed: ${row.slug}`);
      const alts = JSON.parse(row.proposed_image_alt_text_json);
      if (alts.length !== doc.images.length) throw new Error(`Image set changed: ${row.slug}`);
      const projected = doc.toObject();
      projected.description = { short: row.proposed_short_description.trim(), long: htmlFromPlainText(row.proposed_long_description.trim()) };
      projected.seo = { ...projected.seo, metaTitle: row.proposed_seo_title.trim(), metaDescription: row.proposed_meta_description.trim() };
      projected.images = projected.images.map((image, index) => ({ ...image, altText: alts[index] }));
      const approval = ledger.approvals[row.product_id];
      if (approval.fingerprint !== contentFingerprint(projected) || approval.canonical !== expectedCanonical(projected) ||
          approval.primaryImageUrl !== projected.images[0]?.url || approval.imageDigest !== digestLocalImage(doc)) {
        throw new Error(`Staging approval does not match projected production content: ${row.slug}`);
      }
      const quality = evaluateProductSeoCandidate(projected, {
        ...ledger, protectLegacy: true, legacyIndexedIds: new Set(ledger.legacyIndexedIds),
        duplicatePeers: new Map(Object.entries(ledger.duplicatePeers)),
        imageDigests: new Map([[row.product_id, digestLocalImage(doc)]]),
      });
      if (!quality.eligible) throw new Error(`Projected Gate V2 exclusion: ${row.slug}: ${quality.issues.join("; ")}`);
    }
    fs.mkdirSync(releaseDir, { recursive: false });
    const backupManifest = await backupDatabase(mongoose.connection.db, backupDir);
    for (const entry of backupManifest.collections) {
      const raw = fs.readFileSync(path.join(backupDir, entry.file));
      if (sha256(raw) !== entry.sha256 || raw.toString("utf8").split("\n").filter(Boolean).length !== entry.count) {
        throw new Error(`Fresh backup integrity failure: ${entry.name}`);
      }
    }
    if (backupManifest.collections.find((entry) => entry.name === "products")?.count !== 234) throw new Error("Fresh backup has wrong product count");
    verifyProductsAgainstPriorBackup(await readRawProducts());
    const backupProducts = fs.readFileSync(path.join(backupDir, "products.ndjson"), "utf8").split("\n").filter(Boolean)
      .map((line) => EJSON.parse(line, { relaxed: false }));
    verifyProductsAgainstPriorBackup(backupProducts);
    ledger.productionBackupManifestSha256 = sha256(fs.readFileSync(path.join(backupDir, "manifest.json")));
    fs.writeFileSync(path.join(releaseDir, "production-gate-v2-ledger-PREPARED-NOT-ENABLED.json"), JSON.stringify(ledger, null, 2), { flag: "wx" });
    const result = { productionDatabase: "printkee-db", productsUnchanged: 234, approvedRows: 24,
      heldTargetRows: 127, confirmedLegacyExclusions: 2, projectedGateV2Eligible: 24,
      backupPath: backupDir, backupCollections: backupManifest.collections.length,
      backupDocuments: backupManifest.collections.reduce((n, entry) => n + entry.count, 0),
      backupProducts: 234, backupIntegrity: "all collection hashes and counts verified",
      approvedCsvSha256: manifest.csvSha256, productionLedgerPrepared: true,
      productionWrites: 0, deployed: false, gateEnabled: false };
    fs.writeFileSync(path.join(releaseDir, "preflight-result.json"), JSON.stringify(result, null, 2), { flag: "wx" });
    console.log(JSON.stringify(result));
  } finally { await mongoose.disconnect(); }
}
main().catch((error) => { console.error(`${error.name}: ${String(error.message).replace(/mongodb(?:\+srv)?:\/\/[^@ ]+@/g, "mongodb://[redacted]@")}`); process.exitCode = 1; });
