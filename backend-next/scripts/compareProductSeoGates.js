// Read-only comparison of the live gate and the proposed, approval-bound gate.
const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const { evaluateProductSeo, textOnly } = require("../services/productSeoQuality");
const { evaluateProductSeoCandidate, contentFingerprint, expectedCanonical } = require("../services/productSeoQualityCandidate");
const { parseCsv, serializeCsv } = require("../services/seoCsv");
const shortlistCopy = require("./productSeoShortlistCopy");
const legacyHolds = require("./productSeoLegacyHolds");

const folder = path.resolve(__dirname, "../../seo/05-technical-audits");
const catalog = JSON.parse(fs.readFileSync(path.join(folder, "GSC_PRODUCT_GATE_CATALOG_SNAPSHOT_2026-11-13.json"), "utf8")).rows;
const drafts = parseCsv(fs.readFileSync(path.join(folder, "GSC_PRODUCT_SEO_DRAFTS_151_2026-11-13.csv"), "utf8"));
if (catalog.length !== 234 || drafts.length !== 151) throw new Error("Expected 234 catalog and 151 draft rows");
const byId = new Map(catalog.map((p) => [p.id, p]));
const bySlug = new Map(catalog.map((p) => [p.slug, p]));
const imageDigests = new Map(catalog.map((p) => {
  const imageUrl = p.images?.[0]?.url || "";
  if (!imageUrl.startsWith("/assets/")) return [p.id, ""];
  const imagePath = path.resolve(__dirname, "../../frontend-next/public", imageUrl.slice(1));
  return [p.id, fs.existsSync(imagePath) ? crypto.createHash("sha256").update(fs.readFileSync(imagePath)).digest("hex") : ""];
}));
const targetIds = new Set(drafts.map((r) => r.product_id));
const holds = Object.fromEntries(drafts.filter((r) => r.review_status === "HOLD_FACT_VERIFICATION")
  .map((r) => [r.product_id, r.factual_verification_needed]));
const confirmedHolds = {}, suspectedHolds = {};
for (const [slug, finding] of Object.entries(legacyHolds)) {
  const p = bySlug.get(slug); if (!p) throw new Error(`Missing legacy record: ${slug}`);
  (finding.type === "confirmed_data_conflict" ? confirmedHolds : suspectedHolds)[p.id] = finding.reason;
}
const legacyIndexedIds = new Set(catalog.filter((p) => evaluateProductSeo(p).eligible).map((p) => p.id));
const variantGroups = {};
for (const [group, slugs] of Object.entries({
  "medium-grain-cork-sheets": ["2mm-medium-grain-cork-sheet", "3mm-medium-grain-cork-sheet", "4mm-medium-grain-cork-sheet"],
  "baseball-cap-colors": ["classic-orange-baseball-cap", "classic-yellow-baseball-cap", "classic-cream-baseball-cap", "classic-maroon-baseball-cap", "classic-green-baseball-cap", "classic-grey-baseball-cap", "classic-white-baseball-cap", "classic-pink-baseball-cap"],
  "round-neck-shirt-colors": ["maroon-round-neck-t-shirt", "olive-round-neck-t-shirt", "navy-blue-round-neck-t-shirt", "light-grey-round-neck-t-shirt", "bright-biege-round-neck-t-shirt", "classic-red-round-neck-t-shirt", "classic-black-round-neck-t-shirt", "dark-blue-round-neck-t-shirt", "forest-green-round-neck-t-shirt"],
})) for (const slug of slugs) if (bySlug.has(slug)) variantGroups[bySlug.get(slug).id] = group;

function shingles(value) {
  const words = textOnly(value).toLowerCase().replace(/[^a-z0-9]+/g, " ").trim().split(/\s+/).filter(Boolean);
  return new Set(words.length < 3 ? words : words.slice(0, -2).map((_, i) => words.slice(i, i + 3).join(" ")));
}
function similarity(a, b) {
  const left = shingles(a), right = shingles(b);
  if (!left.size || !right.size) return 0;
  const overlap = [...left].filter((item) => right.has(item)).length;
  return overlap / (left.size + right.size - overlap);
}
function duplicatePeers(rows) {
  const peers = new Map(rows.map((r) => [r.id, []]));
  for (let i = 0; i < rows.length; i++) for (let j = i + 1; j < rows.length; j++) {
    if (similarity(rows[i].description?.long, rows[j].description?.long) >= 0.65) {
      peers.get(rows[i].id).push(rows[j].slug);
      peers.get(rows[j].id).push(rows[i].slug);
    }
  }
  return peers;
}
function approvedRows(rows, allowed) {
  return Object.fromEntries(rows.filter((p) => allowed.has(p.id)).map((p) => [p.id, {
    fingerprint: contentFingerprint(p), canonical: expectedCanonical(p), primaryImageUrl: p.images?.[0]?.url,
    identityVerified: true, imageVerified: true, contentUseful: true, duplicateReviewed: true,
    reviewer: "SIMULATION ONLY", reviewedAt: "2026-11-13T00:00:00.000Z", imageDigest: imageDigests.get(p.id),
  }]));
}
function snapshotWithDrafts() {
  const replacements = new Map(drafts.map((r) => {
    const p = byId.get(r.product_id);
    if (!p) throw new Error(`Draft product missing: ${r.product_id}`);
    return [p.id, { ...p,
      description: { short: r.proposed_short_description, long: r.proposed_long_description },
      seo: { ...p.seo, metaTitle: r.proposed_seo_title, metaDescription: r.proposed_meta_description },
      images: p.images.map((image, i) => ({ ...image, altText: JSON.parse(r.proposed_image_alt_text_json)[i] })),
    }];
  }));
  return catalog.map((p) => replacements.get(p.id) || p);
}
function snapshotWithConservativeShortlist(base) {
  return base.map((p) => {
    const copy = shortlistCopy[p.slug];
    if (!copy) return p;
    return { ...p, description: { short: copy.short, long: copy.long },
      seo: { ...p.seo, metaTitle: copy.title, metaDescription: copy.meta },
      images: p.images.map((image, i) => ({ ...image, altText: i === 0 ? copy.alt : image.altText })) };
  });
}
function evaluateSet(rows, allowed) {
  const peers = duplicatePeers(rows);
  const approvals = approvedRows(rows, allowed);
  const context = { holds, confirmedHolds, suspectedHolds, legacyIndexedIds, protectLegacy: true,
    variantGroups, duplicatePeers: peers, approvals, canonicalDecisions: {}, imageDigests };
  return rows.map((p) => ({ product: p, old: evaluateProductSeo(p), candidate: evaluateProductSeoCandidate(p, context),
    duplicatePeers: peers.get(p.id) || [] }));
}
const current = evaluateSet(catalog, new Set(catalog.map((p) => p.id)));
const draftCatalog = snapshotWithDrafts();
const draftReviewable = new Set(drafts.filter((r) => r.review_status !== "HOLD_FACT_VERIFICATION").map((r) => r.product_id));
const draftEvaluation = evaluateSet(draftCatalog, draftReviewable);
const shortlistCatalog = snapshotWithConservativeShortlist(draftCatalog);
const shortlistAllowed = new Set(Object.keys(shortlistCopy).map((slug) => bySlug.get(slug)?.id).filter(Boolean));
const shortlistEvaluation = evaluateSet(shortlistCatalog, shortlistAllowed);
const noApprovalEvaluation = evaluateSet(catalog, new Set());
const summary = (set, scope = () => true) => ({
  total: set.filter(({ product }) => scope(product)).length,
  oldEligible: set.filter(({ product, old }) => scope(product) && old.eligible).length,
  candidateEligibleIfApproved: set.filter(({ product, candidate }) => scope(product) && candidate.eligible).length,
});
const issueCounts = (set, scope = () => true) => {
  const counts = {};
  for (const { product, candidate } of set) if (scope(product)) for (const issue of candidate.issues) counts[issue] = (counts[issue] || 0) + 1;
  return counts;
};
const target = (p) => targetIds.has(p.id);
const report = {
  generatedAt: new Date().toISOString(), policy: "PROPOSAL ONLY — production gate unchanged",
  currentCatalog: summary(current), currentTargets: summary(current, target),
  currentWithNoApprovals: summary(noApprovalEvaluation),
  draftTargets: summary(draftEvaluation, target),
  conservativeShortlist: summary(shortlistEvaluation, (p) => Boolean(shortlistCopy[p.slug])),
  currentCandidateIssueCounts: issueCounts(current), draftTargetIssueCounts: issueCounts(draftEvaluation, target),
  legacyReviewFindings: current.filter(({ old, product }) => old.eligible && legacyHolds[product.slug])
    .map(({ product }) => ({ slug: product.slug, ...legacyHolds[product.slug] })),
  currentCandidateEligible: current.filter(({ candidate }) => candidate.eligible).map(({ product }) => product.slug),
  draftCandidateEligible: draftEvaluation.filter(({ candidate, product }) => target(product) && candidate.eligible).map(({ product }) => product.slug),
  conservativeShortlistEligible: shortlistEvaluation.filter(({ candidate, product }) => shortlistCopy[product.slug] && candidate.eligible).map(({ product }) => product.slug),
  rows: current.map(({ product, old, candidate, duplicatePeers }) => ({
    id: product.id, slug: product.slug, target: target(product), url: expectedCanonical(product),
    currentEligible: old.eligible, candidateEligibleIfApproved: candidate.eligible,
    candidateIssues: candidate.issues, candidateWarnings: candidate.warnings,
    hold: holds[product.id] || confirmedHolds[product.id] || suspectedHolds[product.id] || "",
    legacyFindingType: legacyHolds[product.slug]?.type || "", variantGroup: variantGroups[product.id] || "",
    duplicatePeers, usefulFactCount: candidate.usefulFactCount, statedFactCount: candidate.statedFactCount,
  })),
  draftRows: draftEvaluation.filter(({ product }) => target(product)).map(({ product, old, candidate, duplicatePeers }) => ({
    id: product.id, slug: product.slug, url: expectedCanonical(product),
    oldGateEligibleOnDraft: old.eligible, candidateEligibleIfApproved: candidate.eligible,
    hold: holds[product.id] || "", variantGroup: variantGroups[product.id] || "",
    duplicatePeers, usefulFactCount: candidate.usefulFactCount, statedFactCount: candidate.statedFactCount,
    candidateIssues: candidate.issues, candidateWarnings: candidate.warnings,
  })),
};
const output = path.join(folder, "GSC_PRODUCT_GATE_V2_COMPARISON_2026-11-13.json");
fs.writeFileSync(output, JSON.stringify(report, null, 2));
const columns = ["slug", "url", "target", "currentEligible", "candidateEligibleIfApproved", "hold", "legacyFindingType", "variantGroup", "duplicatePeers", "usefulFactCount", "statedFactCount", "candidateIssues", "candidateWarnings"];
const csvRows = report.rows.map((row) => ({ ...row, duplicatePeers: row.duplicatePeers.join("; "), candidateIssues: row.candidateIssues.join("; "), candidateWarnings: row.candidateWarnings.join("; ") }));
fs.writeFileSync(path.join(folder, "GSC_PRODUCT_GATE_V2_COMPARISON_2026-11-13.csv"), serializeCsv(columns, csvRows));
const draftColumns = ["slug", "url", "oldGateEligibleOnDraft", "candidateEligibleIfApproved", "hold", "variantGroup", "duplicatePeers", "usefulFactCount", "statedFactCount", "candidateIssues", "candidateWarnings"];
fs.writeFileSync(path.join(folder, "GSC_PRODUCT_GATE_V2_DRAFT_COMPARISON_151_2026-11-13.csv"), serializeCsv(draftColumns,
  report.draftRows.map((row) => ({ ...row, duplicatePeers: row.duplicatePeers.join("; "),
    candidateIssues: row.candidateIssues.join("; "), candidateWarnings: row.candidateWarnings.join("; ") }))));
console.log(JSON.stringify({ currentCatalog: report.currentCatalog, currentTargets: report.currentTargets,
  currentWithNoApprovals: report.currentWithNoApprovals, draftTargets: report.draftTargets,
  conservativeShortlist: report.conservativeShortlist,
  currentCandidateEligible: report.currentCandidateEligible,
  draftCandidateEligible: report.draftCandidateEligible,
  conservativeShortlistEligible: report.conservativeShortlistEligible,
  legacyReviewFindings: report.legacyReviewFindings.length,
}, null, 2));
