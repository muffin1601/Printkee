// Refines the existing 151 drafts; no AI service and no MongoDB write.
const fs = require("node:fs");
const path = require("node:path");
const { parseCsv, serializeCsv } = require("../services/seoCsv");
const copy = require("./productSeoShortlistCopy");
const folder = path.resolve(__dirname, "../../seo/05-technical-audits");
const input = path.join(folder, "GSC_PRODUCT_SEO_DRAFTS_151_2026-11-13.csv");
const output = path.join(folder, "GSC_PRODUCT_SEO_FINAL_REVIEW_151_2026-11-14.csv");
const rows = parseCsv(fs.readFileSync(input, "utf8"));
const four = new Set(["yoga-mat-cork-fabric-eva", "fully-rubberized-3mm-yoga-mat",
  "cork-rubberized-yoga-mat-latex", "double-wall-insulated-sipper-bottle"]);
const cork = new Set(["2mm-medium-grain-cork-sheet", "3mm-medium-grain-cork-sheet", "4mm-medium-grain-cork-sheet"]);
for (const row of rows) {
  if (four.has(row.slug)) {
    const proposal = copy[row.slug];
    row.proposed_short_description = proposal.short;
    row.proposed_long_description = proposal.long;
    row.proposed_seo_title = proposal.title;
    row.proposed_meta_description = proposal.meta;
    const alts = JSON.parse(row.proposed_image_alt_text_json);
    alts[0] = proposal.alt;
    row.proposed_image_alt_text_json = JSON.stringify(alts);
    row.proposed_long_words = String(proposal.long.split(/\s+/).length);
    row.proposed_combined_words = String(`${proposal.short} ${proposal.long}`.split(/\s+/).length);
  }
  if (cork.has(row.slug)) {
    row.review_status = "HOLD_CANONICAL_DECISION";
    row.expected_indexing_candidate_after_approval = "NO";
    row.factual_verification_needed = [row.factual_verification_needed,
      "Decide whether this thickness merits a distinct self-canonical product page; verify the labeled thickness and image."].filter(Boolean).join(" ");
  }
  row.approved = "NO";
  row.gate_v2_status = row.review_status === "DRAFT_REQUIRES_ADMIN_REVIEW"
    ? "REQUIRES_NAMED_EDITORIAL_AND_IMAGE_APPROVAL" : row.review_status;
}
if (rows.length !== 151 || new Set(rows.map((row) => row.product_id)).size !== 151) throw new Error("Incomplete 151-product review batch");
const titles = new Set(rows.map((row) => row.proposed_seo_title.toLowerCase().trim()));
const descriptions = new Set(rows.map((row) => row.proposed_meta_description.toLowerCase().trim()));
if (titles.size !== rows.length || descriptions.size !== rows.length) throw new Error("Duplicate SEO title or meta description");
fs.writeFileSync(output, serializeCsv(Object.keys(rows[0]), rows));
console.log(JSON.stringify({ rows: rows.length, revisedPriorityCopy: four.size,
  factOrImageHolds: rows.filter((row) => row.review_status === "HOLD_FACT_VERIFICATION").length,
  canonicalHolds: rows.filter((row) => row.review_status === "HOLD_CANONICAL_DECISION").length,
  awaitingEditorialApproval: rows.filter((row) => row.review_status === "DRAFT_REQUIRES_ADMIN_REVIEW").length,
  approved: 0 }));
