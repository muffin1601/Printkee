// Read-only report for the 18 products the current gate marks eligible.
const fs = require("node:fs");
const path = require("node:path");
const findings = require("./productSeoLegacyHolds");
const folder = path.resolve(__dirname, "../../seo/05-technical-audits");
const catalog = JSON.parse(fs.readFileSync(path.join(folder, "GSC_PRODUCT_GATE_CATALOG_SNAPSHOT_2026-11-13.json"), "utf8")).rows;
const baseline = JSON.parse(fs.readFileSync(path.join(folder, "GSC_PRODUCT_GATE_BASELINE_234_2026-11-13.json"), "utf8")).rows;
const eligible = new Set(baseline.filter((row) => row.quality.eligible).map((row) => row.slug));
const labels = {
  confirmed_data_conflict: "Confirmed record contradiction",
  observed_image_record_disagreement: "Visible image/record disagreement — supplier resolution needed",
  needs_manual_verification: "Suspected issue — manual verification needed",
};
const rows = catalog.filter((p) => eligible.has(p.slug));
if (rows.length !== 18) throw new Error(`Expected 18 eligible products, got ${rows.length}`);
const link = (url) => url?.startsWith("/assets/") ? `../../frontend-next/public${url}`.replace(/ /g, "%20") : url || "";
const escape = (value) => String(value || "").replace(/\|/g, "\\|").replace(/[\r\n]+/g, " ");
const body = rows.map((p) => {
  const finding = findings[p.slug];
  const status = finding ? labels[finding.type] : "No specific discrepancy identified in this pass";
  return `| ${escape(p.name)} | \`${p.slug}\` | [view](${link(p.images?.[0]?.url)}) | ${status} | ${escape(finding?.reason || "Verify factual claims and image during final legacy review.")} |`;
}).join("\n");
fs.writeFileSync(path.join(folder, "GSC_LEGACY_ELIGIBLE_18_REVIEW_2026-11-13.md"),
  `# Current 18 eligible products — factual and image review\n\nThe live gate currently marks these 18 products eligible. Two records have confirmed **internal description-versus-field contradictions**. Seven have clear visual disagreement between the pictured item and a recorded color or identity; the correct supplier variant is not established. Six have less certain visual/contents concerns. Three had no specific discrepancy identified here. These are audit classifications, not live robots changes. In particular, do not automatically noindex an already-indexable page solely because a photo or color is suspected to be wrong.\n\n| Product | Slug | Existing primary image | Finding | Evidence/action |\n| --- | --- | --- | --- | --- |\n${body}\n\nThe two confirmed internal contradictions are \`personalized-polo-t-shirts\` (white in visible copy versus blue in the recorded color field) and \`stainless-steel-double-wall-coffee-mug\` (approximately 460 ml in visible copy versus 660 ml in the size field). The latter has a remote image that was not inspected locally. The other image observations need supplier or catalog-owner confirmation of the correct SKU, color and photo before a final indexing decision.\n`);
console.log(JSON.stringify({ currentEligible: rows.length, confirmedDataConflicts: Object.values(findings).filter((x) => x.type === "confirmed_data_conflict").length,
  observedImageDisagreements: Object.values(findings).filter((x) => x.type === "observed_image_record_disagreement").length,
  suspectedManual: Object.values(findings).filter((x) => x.type === "needs_manual_verification").length }));
