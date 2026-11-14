// Verify only the approved content fields changed in the isolated staging database.
const fs = require("node:fs");
const path = require("node:path");
const mongoose = require("mongoose");
const { EJSON } = require("bson");
const { parseCsv } = require("../services/seoCsv");
const { htmlFromPlainText } = require("../services/productSeoContent");
const { evaluateProductSeoCandidate, contentFingerprint } = require("../services/productSeoQualityCandidate");
const { digestLocalImage } = require("../services/productSeoGate");
require("../models/Category");
require("../models/Subcategory");
const Product = require("../models/product");
const root = path.resolve(__dirname, "../..");
const backup = path.join(root, ".local-backups/printkee-seo-staging-pre-import-24-2026-11-14");
const approval = path.join(root, ".local-backups/printkee-seo-staging-approval-2026-11-14");
const ledger = require("../../.local-backups/printkee-seo-staging-2026-11-14/approved-gate-v2-ledger.json");
const uri = "mongodb://127.0.0.1:27028/printkee-seo-staging-20261114";
const normalize = (value) => {
  if (Array.isArray(value)) return value.map(normalize);
  if (value && typeof value === "object") return Object.fromEntries(Object.keys(value).sort().map((key) => [key, normalize(value[key])]));
  return value;
};
const equal = (a, b) => JSON.stringify(normalize(EJSON.serialize(a, { relaxed: false }))) ===
  JSON.stringify(normalize(EJSON.serialize(b, { relaxed: false })));
const allowedSkeleton = (p) => {
  const copy = EJSON.deserialize(EJSON.serialize(p, { relaxed: false }));
  delete copy.updatedAt;
  if (copy.description) { delete copy.description.short; delete copy.description.long; }
  if (copy.seo) { delete copy.seo.metaTitle; delete copy.seo.metaDescription; }
  if (copy.images) for (const image of copy.images) delete image.altText;
  return copy;
};

async function main() {
  const rows = parseCsv(fs.readFileSync(path.join(approval, "approved-24.csv"), "utf8"));
  const selected = new Map(rows.map((row) => [row.product_id, row]));
  const manifest = JSON.parse(fs.readFileSync(path.join(backup, "manifest.json"), "utf8"));
  if (rows.length !== 24 || rows.some((row) => row.approved !== "YES") || Object.keys(ledger.approvals).length !== 24) {
    throw new Error("Unexpected approved import scope");
  }
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
  try {
    let unchangedCollections = 0, unchangedProducts = 0, updatedProducts = 0;
    for (const entry of manifest.collections) {
      const previous = fs.readFileSync(path.join(backup, entry.file), "utf8").split("\n").filter(Boolean)
        .map((line) => EJSON.parse(line, { relaxed: false }));
      const current = await mongoose.connection.db.collection(entry.name).find({}).toArray();
      if (previous.length !== current.length) throw new Error(`Collection count changed: ${entry.name}`);
      const byId = new Map(current.map((doc) => [String(doc._id), doc]));
      for (const before of previous) {
        const after = byId.get(String(before._id));
        if (!after) throw new Error(`Document removed: ${entry.name}/${before._id}`);
        if (entry.name !== "products" || !selected.has(String(before._id))) {
          if (!equal(before, after)) throw new Error(`Unexpected document change: ${entry.name}/${before._id}`);
          if (entry.name === "products") unchangedProducts++;
          continue;
        }
        if (!equal(allowedSkeleton(before), allowedSkeleton(after))) throw new Error(`Non-content product field changed: ${before._id}`);
        const row = selected.get(String(before._id));
        if (after.description?.short !== row.proposed_short_description ||
            after.description?.long !== htmlFromPlainText(row.proposed_long_description) ||
            after.seo?.metaTitle !== row.proposed_seo_title ||
            after.seo?.metaDescription !== row.proposed_meta_description ||
            JSON.stringify(after.images.map((image) => image.altText)) !== row.proposed_image_alt_text_json) {
          throw new Error(`Approved content differs: ${row.slug}`);
        }
        updatedProducts++;
      }
      if (entry.name !== "products") unchangedCollections++;
    }
    const docs = await Product.find({ _id: { $in: [...selected.keys()] } })
      .populate("category", "name slug isActive")
      .populate("subcategory", "name slug category isActive");
    const qualityFailures = [];
    for (const doc of docs) {
      const id = String(doc._id);
      if (ledger.approvals[id]?.fingerprint !== contentFingerprint(doc) ||
          ledger.approvals[id]?.imageDigest !== digestLocalImage(doc)) throw new Error(`Approval evidence mismatch: ${doc.slug}`);
      const quality = evaluateProductSeoCandidate(doc, {
        ...ledger, protectLegacy: true, legacyIndexedIds: new Set(ledger.legacyIndexedIds),
        duplicatePeers: new Map(Object.entries(ledger.duplicatePeers)),
        imageDigests: new Map([[id, digestLocalImage(doc)]]),
      });
      if (!quality.eligible) qualityFailures.push({ slug: doc.slug, issues: quality.issues });
    }
    if (unchangedProducts !== 210 || updatedProducts !== 24 || unchangedCollections !== 15 || qualityFailures.length) {
      throw new Error(`Unexpected staging result: ${JSON.stringify({ unchangedProducts, updatedProducts, unchangedCollections, qualityFailures })}`);
    }
    const result = { database: "printkee-seo-staging-20261114", updatedProducts, unchangedProducts,
      unchangedOtherCollections: unchangedCollections, gateV2EligibleSelected: docs.length,
      qualityFailures, sourceCsvSha256: ledger.sourceCsvSha256 };
    fs.writeFileSync(path.join(root, "seo/05-technical-audits/GSC_STAGING_APPROVED_IMPORT_24_VERIFICATION_2026-11-14.json"),
      JSON.stringify(result, null, 2));
    console.log(JSON.stringify(result));
  } finally { await mongoose.disconnect(); }
}
main().catch((error) => { console.error(`${error.name}: ${error.message}`); process.exitCode = 1; });
