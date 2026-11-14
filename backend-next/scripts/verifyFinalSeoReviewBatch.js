// Offline verification only. Synthetic approvals never enter a ledger or database.
const fs = require("node:fs");
const path = require("node:path");
const assert = require("node:assert/strict");
const { parseCsv } = require("../services/seoCsv");
const { similarity } = require("../services/productSeoContent");
const { evaluateProductSeo } = require("../services/productSeoQuality");
const { evaluateProductSeoCandidate, contentFingerprint, expectedCanonical } = require("../services/productSeoQualityCandidate");
const { digestLocalImage } = require("../services/productSeoGate");
const folder = path.resolve(__dirname, "../../seo/05-technical-audits");
const rows = parseCsv(fs.readFileSync(path.join(folder, "GSC_PRODUCT_SEO_FINAL_REVIEW_151_2026-11-14.csv"), "utf8"));
const catalog = require("../../seo/05-technical-audits/GSC_PRODUCT_GATE_HANDOFF_SNAPSHOT_2026-11-13.json").rows;
const ledger = require("../../seo/05-technical-audits/GSC_PRODUCT_GATE_V2_REVIEW_LEDGER_TEMPLATE_2026-11-13.json");
const byId = new Map(catalog.map((p) => [p.id, p]));
assert.equal(rows.length, 151);
assert.equal(new Set(rows.map((r) => r.product_id)).size, 151);
assert.ok(rows.every((r) => r.approved === "NO"));
const drafts = new Map(rows.map((r) => {
  const p = byId.get(r.product_id);
  assert.ok(p && p.slug === r.slug && p.updatedAt === r.source_updated_at, r.slug);
  const alts = JSON.parse(r.proposed_image_alt_text_json);
  assert.equal(alts.length, p.images.length);
  return [p.id, { ...p, description: { short: r.proposed_short_description, long: r.proposed_long_description },
    seo: { ...p.seo, metaTitle: r.proposed_seo_title, metaDescription: r.proposed_meta_description },
    images: p.images.map((image, index) => ({ ...image, altText: alts[index] })) }];
}));
const titleSet = new Set(rows.map((r) => r.proposed_seo_title.toLowerCase().trim()));
const metaSet = new Set(rows.map((r) => r.proposed_meta_description.toLowerCase().trim()));
assert.equal(titleSet.size, 151);
assert.equal(metaSet.size, 151);
let nearDuplicatePairs = 0;
for (let i = 0; i < rows.length; i++) for (let j = i + 1; j < rows.length; j++) {
  if (similarity(rows[i].proposed_long_description, rows[j].proposed_long_description) >= 0.5) nearDuplicatePairs++;
}
const results = rows.map((row) => {
  const draft = drafts.get(row.product_id);
  const digest = digestLocalImage(draft);
  const approval = { fingerprint: contentFingerprint(draft), canonical: expectedCanonical(draft),
    primaryImageUrl: draft.images[0]?.url, imageDigest: digest, identityVerified: true,
    imageVerified: true, contentUseful: true, duplicateReviewed: true,
    reviewer: "SIMULATION ONLY", reviewedAt: "2026-11-14T00:00:00.000Z" };
  const eligibleForSimulation = row.review_status === "DRAFT_REQUIRES_ADMIN_REVIEW";
  const context = { ...ledger, protectLegacy: true, legacyIndexedIds: new Set(ledger.legacyIndexedIds),
    duplicatePeers: new Map(Object.entries(ledger.duplicatePeers)),
    approvals: eligibleForSimulation ? { [draft.id]: approval } : {},
    imageDigests: new Map([[draft.id, digest]]) };
  return { row, old: evaluateProductSeo(draft), v2: evaluateProductSeoCandidate(draft, context) };
});
const summary = { targets: results.length, approved: 0,
  factOrImageHolds: results.filter(({ row }) => row.review_status === "HOLD_FACT_VERIFICATION").length,
  canonicalHolds: results.filter(({ row }) => row.review_status === "HOLD_CANONICAL_DECISION").length,
  awaitingEditorialApproval: results.filter(({ row }) => row.review_status === "DRAFT_REQUIRES_ADMIN_REVIEW").length,
  oldGatePassOnDrafts: results.filter(({ old }) => old.eligible).length,
  v2PassIfUnheldDraftsWereActuallyApproved: results.filter(({ v2 }) => v2.eligible).length,
  uniqueTitles: titleSet.size, uniqueMetaDescriptions: metaSet.size, nearDuplicatePairs };
console.log(JSON.stringify(summary, null, 2));
if (nearDuplicatePairs) process.exitCode = 1;
