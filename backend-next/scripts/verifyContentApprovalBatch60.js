// Offline, simulated Gate V2 check. Never creates approval records or contacts MongoDB.
const fs = require("node:fs");
const path = require("node:path");
const { parseCsv } = require("../services/seoCsv");
const { htmlFromPlainText, similarity } = require("../services/productSeoContent");
const { evaluateProductSeoCandidate, contentFingerprint, expectedCanonical } = require("../services/productSeoQualityCandidate");
const root = path.resolve(__dirname, "../../seo/05-technical-audits");
const rows = parseCsv(fs.readFileSync(path.join(root, "GSC_PRODUCT_SEO_APPROVAL_BATCH_60_2026-11-14.csv"), "utf8"));
const source = require("../../seo/05-technical-audits/GSC_PRODUCT_GATE_HANDOFF_SNAPSHOT_2026-11-13.json").rows;
const ledger = require("../../seo/05-technical-audits/GSC_PRODUCT_GATE_V2_STAGING_LEDGER_TEMPLATE_2026-11-14.json");
const byId = new Map(source.map((p) => [p.id, p]));
const results = [];
for (const row of rows) {
  const original = byId.get(row.product_id);
  if (!original || original.slug !== row.slug || original.updatedAt !== row.source_updated_at) throw new Error(`Stale source: ${row.slug}`);
  const p = structuredClone(original);
  p._id = p.id;
  p.description = { short: row.proposed_short_description, long: htmlFromPlainText(row.proposed_long_description) };
  p.seo = { ...p.seo, metaTitle: row.proposed_seo_title, metaDescription: row.proposed_meta_description };
  const alts = JSON.parse(row.proposed_image_alt_text_json);
  if (alts.length !== p.images.length) throw new Error(`Image count changed: ${row.slug}`);
  p.images.forEach((image, i) => { image.altText = alts[i]; });
  const id = row.product_id;
  const approval = { fingerprint: contentFingerprint(p), canonical: expectedCanonical(p),
    primaryImageUrl: p.images[0]?.url, identityVerified: true, imageVerified: true,
    contentUseful: true, duplicateReviewed: true, reviewer: "SIMULATION ONLY",
    reviewedAt: "SIMULATION ONLY", imageDigest: row.primary_image_sha256 };
  const quality = evaluateProductSeoCandidate(p, {
    ...ledger, protectLegacy: true, legacyIndexedIds: new Set(ledger.legacyIndexedIds),
    duplicatePeers: new Map(Object.entries(ledger.duplicatePeers)),
    imageDigests: new Map([[id, row.primary_image_sha256]]),
    approvals: { [id]: approval },
  });
  const shortWords = row.proposed_short_description.trim().split(/\s+/).length;
  const longWords = row.proposed_long_description.trim().split(/\s+/).length;
  if (shortWords < 8 || longWords < 20 || row.proposed_seo_title.length < 20 ||
      row.proposed_meta_description.length < 70 || !alts[0] || alts[0].length < 8) {
    throw new Error(`Editorial validation failed: ${row.slug}`);
  }
  results.push({ slug: row.slug, status: row.review_status, eligibleWithSimulatedApproval: quality.eligible,
    issues: quality.issues, warnings: quality.warnings, usefulFacts: quality.usefulFactCount,
    statedFacts: quality.statedFactCount, shortWords, longWords,
    titleCharacters: row.proposed_seo_title.length, metaCharacters: row.proposed_meta_description.length });
}
const nearDuplicates = [];
for (let i = 0; i < rows.length; i++) for (let j = i + 1; j < rows.length; j++) {
  if (similarity(rows[i].proposed_long_description, rows[j].proposed_long_description) >= 0.5) {
    nearDuplicates.push([rows[i].slug, rows[j].slug]);
  }
}
if (nearDuplicates.length) throw new Error(`Near-duplicate batch copy: ${JSON.stringify(nearDuplicates)}`);
const catalogNearDuplicates = [];
for (const row of rows) for (const product of source) {
  if (row.product_id !== product.id && similarity(row.proposed_long_description, product.description?.long || "") >= 0.5) {
    catalogNearDuplicates.push([row.slug, product.slug]);
  }
}
if (catalogNearDuplicates.length) throw new Error(`Near-duplicate catalog copy: ${JSON.stringify(catalogNearDuplicates)}`);
if (rows.some((row) => !row.primary_image_sha256)) throw new Error("A primary image digest is missing");
if (rows.some((row) => row.approved !== "NO") || Object.keys(ledger.approvals).length) throw new Error("Approval must remain empty");
const output = path.join(root, "GSC_PRODUCT_SEO_APPROVAL_BATCH_60_VALIDATION_2026-11-14.json");
fs.writeFileSync(output, JSON.stringify({ simulated: true, sourceProducts: source.length,
  reviewed: rows.length, approved: 0, nearDuplicates, catalogNearDuplicates, results }, null, 2));
console.log(JSON.stringify({ reviewed: rows.length, statuses: Object.fromEntries([...new Set(rows.map((r) => r.review_status))]
  .map((s) => [s, rows.filter((r) => r.review_status === s).length])),
  simulatedEligible: results.filter((r) => r.eligibleWithSimulatedApproval).length,
  reviewableEligible: results.filter((r) => r.status === "DRAFT_REQUIRES_ADMIN_REVIEW" && r.eligibleWithSimulatedApproval).length,
  reviewableExcluded: results.filter((r) => r.status === "DRAFT_REQUIRES_ADMIN_REVIEW" && !r.eligibleWithSimulatedApproval)
    .map((r) => ({ slug: r.slug, issues: r.issues })), nearDuplicates: nearDuplicates.length,
  catalogNearDuplicates: catalogNearDuplicates.length }));
