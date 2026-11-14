// Builds an EMPTY approval ledger from the reviewed snapshot. Never contacts MongoDB.
const fs = require("node:fs");
const path = require("node:path");
const { parseCsv } = require("../services/seoCsv");
const root = path.resolve(__dirname, "../../seo/05-technical-audits");
const report = JSON.parse(fs.readFileSync(path.join(root, "GSC_PRODUCT_GATE_V2_COMPARISON_2026-11-13.json"), "utf8"));
const drafts = parseCsv(fs.readFileSync(path.join(root, "GSC_PRODUCT_SEO_DRAFTS_151_2026-11-13.csv"), "utf8"));
const holds = Object.fromEntries(drafts.filter((row) => row.review_status === "HOLD_FACT_VERIFICATION")
  .map((row) => [row.product_id, row.factual_verification_needed]));
const confirmedHolds = {}, suspectedHolds = {}, variantGroups = {}, duplicatePeers = {};
for (const row of report.rows) {
  if (row.legacyFindingType === "confirmed_data_conflict") confirmedHolds[row.id] = row.hold;
  else if (row.legacyFindingType) suspectedHolds[row.id] = row.hold;
  if (row.variantGroup) variantGroups[row.id] = row.variantGroup;
  if (row.duplicatePeers.length) duplicatePeers[row.id] = row.duplicatePeers;
}
const ledger = {
  version: 1,
  sourceSnapshot: "GSC_PRODUCT_GATE_CATALOG_SNAPSHOT_2026-11-13.json",
  legacyIndexedIds: report.rows.filter((row) => row.currentEligible).map((row) => row.id),
  confirmedHolds, suspectedHolds, holds, variantGroups, duplicatePeers,
  canonicalDecisions: {}, approvals: {},
};
const output = path.join(root, "GSC_PRODUCT_GATE_V2_REVIEW_LEDGER_TEMPLATE_2026-11-13.json");
fs.writeFileSync(output, JSON.stringify(ledger, null, 2));
console.log(JSON.stringify({ legacyIndexed: ledger.legacyIndexedIds.length,
  confirmed: Object.keys(confirmedHolds).length, suspected: Object.keys(suspectedHolds).length,
  heldDrafts: Object.keys(holds).length, variants: Object.keys(variantGroups).length,
  duplicateRows: Object.keys(duplicatePeers).length, approvals: 0 }));
