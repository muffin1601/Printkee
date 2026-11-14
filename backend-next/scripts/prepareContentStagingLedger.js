// Adds this editorial review's holds to the empty Gate V2 ledger. No approvals or database access.
const fs = require("node:fs");
const path = require("node:path");
const { parseCsv } = require("../services/seoCsv");
const { imageHolds, canonicalGroups } = require("./prepareContentApprovalBatch60");
const root = path.resolve(__dirname, "../../seo/05-technical-audits");
const template = JSON.parse(fs.readFileSync(path.join(root, "GSC_PRODUCT_GATE_V2_REVIEW_LEDGER_TEMPLATE_2026-11-13.json"), "utf8"));
const batch = parseCsv(fs.readFileSync(path.join(root, "GSC_PRODUCT_SEO_APPROVAL_BATCH_60_2026-11-14.csv"), "utf8"));
const original = parseCsv(fs.readFileSync(path.join(root, "GSC_PRODUCT_SEO_FINAL_REVIEW_151_2026-11-14.csv"), "utf8"));
const idBySlug = new Map(original.map((row) => [row.slug, row.product_id]));
if (original.filter((row) => row.review_status === "HOLD_FACT_VERIFICATION").length !== 88 ||
    batch.length !== 60 || Object.keys(template.approvals).length) throw new Error("Unexpected review source or existing approvals");
for (const [slug, reason] of Object.entries(imageHolds)) {
  const id = idBySlug.get(slug);
  if (!id || template.holds[id]) throw new Error(`Unexpected image hold: ${slug}`);
  template.holds[id] = reason;
}
for (const [group, slugs] of Object.entries(canonicalGroups)) {
  for (const slug of slugs) {
    const id = idBySlug.get(slug);
    if (!id) throw new Error(`Missing variant: ${slug}`);
    template.variantGroups[id] = group;
  }
}
template.environment = "staging-template";
template.sourceBatch = "GSC_PRODUCT_SEO_APPROVAL_BATCH_60_2026-11-14.csv";
template.preparedAt = "2026-11-14";
const output = path.join(root, "GSC_PRODUCT_GATE_V2_STAGING_LEDGER_TEMPLATE_2026-11-14.json");
fs.writeFileSync(output, JSON.stringify(template, null, 2));
console.log(JSON.stringify({ approvals: Object.keys(template.approvals).length,
  originalHeld: 88, addedHolds: Object.keys(imageHolds).length,
  addedCanonicalVariants: Object.values(canonicalGroups).flat().length,
  totalHolds: Object.keys(template.holds).length, totalVariants: Object.keys(template.variantGroups).length }));
