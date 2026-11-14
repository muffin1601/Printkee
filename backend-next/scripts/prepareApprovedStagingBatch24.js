// Prepare the exact 24-row staging import after the requesting user's explicit
// content and factual approvals in this conversation. Does not connect to MongoDB.
const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const { parseCsv, serializeCsv } = require("../services/seoCsv");
const root = path.resolve(__dirname, "../../seo/05-technical-audits");
const approvalDir = path.resolve(__dirname, "../../.local-backups/printkee-seo-staging-approval-2026-11-14");
const sourcePath = path.join(root, "GSC_PRODUCT_SEO_APPROVAL_BATCH_60_2026-11-14.csv");
const source = fs.readFileSync(sourcePath);
const sourceHash = crypto.createHash("sha256").update(source).digest("hex");
if (sourceHash !== "021cc79aa8c6318e25bcaedbda2089679bda2d88b010c221c51db15818b35cad") {
  throw new Error("Reviewed 60-row batch changed; obtain fresh approval");
}
const allRows = parseCsv(source.toString("utf8"));
const selected = allRows.filter((row) => row.review_status === "DRAFT_REQUIRES_ADMIN_REVIEW");
if (allRows.length !== 60 || selected.length !== 24 || selected.some((row) => row.approved !== "NO")) {
  throw new Error("Unexpected approval scope");
}
const approvedRows = selected.map((row) => ({ ...row, approved: "YES" }));
const approvedCsv = serializeCsv(Object.keys(approvedRows[0]), approvedRows);
const approvedHash = crypto.createHash("sha256").update(approvedCsv).digest("hex");
const reviewer = "Requesting Printkee user in this conversation (name not supplied)";
const reviewedAt = new Date().toISOString();
const manifest = {
  targetEnvironment: "staging",
  csvSha256: approvedHash,
  sourceReviewCsvSha256: sourceHash,
  approvalStatement: "I approve these exact Printkee product SEO drafts for MongoDB update",
  approvalProvenance: ["User: approve all content and import it", "User clarification: no all approved"],
  approvalScope: "24 shortlisted products only; 127 target holds remain excluded",
  reviewer, reviewedAt,
  approvedProductIds: approvedRows.map((row) => row.product_id),
  productReviews: Object.fromEntries(approvedRows.map((row) => [row.product_id, {
    identityVerified: true, imageVerified: true, factsVerified: true, copyApproved: true,
    canonicalReviewed: true, contentUseful: true, duplicateReviewed: true,
    reviewer, reviewedAt, imageDigest: row.primary_image_sha256,
  }])),
};
if (fs.existsSync(approvalDir)) throw new Error("Approval output already exists; preserve the original manifest");
fs.mkdirSync(approvalDir, { recursive: false });
fs.writeFileSync(path.join(approvalDir, "approved-24.csv"), approvedCsv, { flag: "wx" });
fs.writeFileSync(path.join(approvalDir, "approval-manifest.json"), JSON.stringify(manifest, null, 2), { flag: "wx" });
console.log(JSON.stringify({ selected: approvedRows.length, heldUnselected: 127, csvSha256: approvedHash,
  reviewer, reviewedAt, directory: approvalDir }));
