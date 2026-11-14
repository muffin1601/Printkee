// Final editorial batch for the 60 formerly unheld drafts. No approvals or DB writes.
const fs = require("node:fs");
const path = require("node:path");
const { parseCsv, serializeCsv } = require("../services/seoCsv");
const { digestLocalImage } = require("../services/productSeoGate");
const copy = require("./productSeoFinalEditorial60");
const shortOverrides = {
  "metal-ring-keychain": "Silver-tone metal ring keychain with shaped tag for everyday keys.",
  "executive-a5-pu-leather-diary": "Brown A5 diary with a closed PU-leather cover for meetings.",
  "cork-desktop-calendar": "Cork-and-paper desktop calendar with visible date blocks for workspaces.",
  "olive-cork-table-mat": "Olive-toned natural-cork mat pictured beneath a dining place setting.",
  "cork-hanging-lamp": "Suspended cork-and-metal lamp with a tapered shade for interiors.",
  "bamboo-thermo-sipper-bottle": "500 ml bamboo-look bottle with recorded steel vacuum construction.",
  "cork-clip-card-holder": "Flat cork-look holder with several visible card slots for daily carry.",
  "natural-cork-coasters": "Round natural-cork coasters pictured with a matching cork-look holder.",
  "double-wall-insulated-sipper-bottle": "Black 600 ml stainless-steel sipper bottle with recorded double-wall construction.",
  "compact-wireless-keyboard": "White keyboard with recorded wireless USB-receiver connectivity and numeric keypad.",
  "large-grain-cork-coasters": "Angular coasters with a visibly large-grain natural-cork surface texture.",
  "4-piece-cork-coasters": "Four-piece square cork coaster set for a dining or meeting tabletop.",
  "choco-chip-cork-planter": "Square cork planter with a speckled choco-chip finish for indoor plants.",
  "cork-multicolored-planter": "Patterned cork-look planters shown in two contrasting indoor display designs.",
  "cork-round-planter": "Low round natural-cork planter pictured with a small indoor fern.",
  "square-brige-cork-coasters": "Square natural-cork coaster with a coarse visible grain pattern.",
  "cork-round-style-pen-holder": "Round cork pen holder shown with writing tools on a desktop.",
  "executive-pullover-hoodie": "Drawstring pullover hoodie listed in charcoal-gray cotton-blend fleece fabric.",
};
const galleryAltOverrides = {
  "executive-a5-pu-leather-diary": ["Closed brown A5 diary with sample logo area", "Open brown diary with inner pages and colored tabs", "Closed brown diary with sample logo area"],
  "premium-notebook-diary-gift-set": ["Several black, navy and tan notebooks or diaries", "Open notebooks or diaries with different cover colors", "Closed notebooks or diaries in several cover colors"],
  "multi-device-bluetooth-keyboard": ["Black keyboard with illuminated keys", "Black keyboard graphic showing removable red key switches", "Black illuminated keyboard graphic with color controls"],
  "solar-portable-power-bank-10000mah": ["Blue portable battery shown beside a phone", "Blue magnetic-style portable battery product graphic", "Blue portable battery shown supporting a phone"],
  "compact-wireless-keyboard": ["White keyboard with numeric keypad on a light background", "Close view of white keyboard keys", "Angled view of white keyboard corner and keys"],
  "ergonomic-professional-mouse": ["Black contoured computer mouse with scroll wheel", "Black mouse graphic showing four-button layout", "Black mouse beside a laptop on a desk"],
};
const folder = path.resolve(__dirname, "../../seo/05-technical-audits");
const source = parseCsv(fs.readFileSync(path.join(folder, "GSC_PRODUCT_SEO_FINAL_REVIEW_151_2026-11-14.csv"), "utf8"));
const catalog = require("../../seo/05-technical-audits/GSC_PRODUCT_GATE_HANDOFF_SNAPSHOT_2026-11-13.json").rows;
const byId = new Map(catalog.map((p) => [p.id, p]));
const imageHolds = {
  "classic-fedora-hat": "Pictured woven hat does not establish the recorded wool-felt material.",
  "corporate-cork-gift-combo-a": "Pictured gift components do not establish the recorded keychain.",
  "corporate-cork-gift-combo-b": "Pictured gift components do not establish the recorded diary, coasters and pen set.",
  "corporate-cork-gift-combo-c": "Pictured box does not establish the recorded mouse pad, pen holder and notebook set.",
  "corporate-cork-gift-combo-d": "Pictured desk pieces differ from the recorded four-piece contents.",
  "cork-clip-card-holder": "Pictured card holder does not show the recorded metal clip.",
  "premium-notebook-diary-gift-set": "Pictured books do not establish the sold notebook-and-diary set contents.",
  "bamboo-thermo-sipper-bottle": "Confirm the exact SKU and use rights for the existing third-party logo photo.",
  "premium-metal-wall-clock": "Pictured frame looks warm gold or rose, while the record says silver.",
  "double-wall-insulated-sipper-bottle": "Confirm exact SKU and use rights for the existing branded photo.",
  "solar-portable-power-bank-10000mah": "Pictured blue battery does not show a solar panel and conflicts with recorded black color.",
  "cork-serving-tray": "Pictured raised border may be a different material; confirm the recorded cork construction.",
  "compact-wireless-keyboard": "Pictured keyboard has a numeric keypad; verify the recorded compact size.",
  "multi-device-bluetooth-keyboard": "Gallery shows a gaming-style mechanical keyboard and does not establish Bluetooth or multi-device operation.",
  "travel-outdoor-promotional-backpack": "Pictured backpack has bright green panels, not a simple black colorway.",
  "executive-pullover-hoodie": "Pictured hoodie appears black while recorded color is charcoal gray.",
  "square-brige-cork-coasters": "Confirm the unexplained Brige product label and sold piece count.",
};
const canonicalGroups = {
  "baseball-cap-colors": ["classic-orange-baseball-cap", "classic-yellow-baseball-cap", "classic-cream-baseball-cap",
    "classic-maroon-baseball-cap", "classic-green-baseball-cap", "classic-grey-baseball-cap",
    "classic-white-baseball-cap", "classic-pink-baseball-cap"],
  "round-neck-shirt-colors": ["maroon-round-neck-t-shirt", "olive-round-neck-t-shirt", "light-grey-round-neck-t-shirt",
    "bright-biege-round-neck-t-shirt", "classic-red-round-neck-t-shirt", "classic-black-round-neck-t-shirt",
    "dark-blue-round-neck-t-shirt", "forest-green-round-neck-t-shirt"],
  "corporate-shirt-colors": ["white-corporate-shirt", "purple-corporate-shirt", "navy-corporate-shirt"],
};
const variantGroup = Object.fromEntries(Object.entries(canonicalGroups).flatMap(([group, slugs]) => slugs.map((slug) => [slug, group])));
const rows = source.filter((row) => row.review_status === "DRAFT_REQUIRES_ADMIN_REVIEW").map((row) => {
  const product = byId.get(row.product_id);
  const editorial = copy[row.slug];
  if (!product || !editorial || product.slug !== row.slug || product.updatedAt !== row.source_updated_at) {
    throw new Error(`Stale or missing editorial source: ${row.slug}`);
  }
  const [draftShort, long, title, meta, primaryAlt] = editorial;
  const short = shortOverrides[row.slug] || draftShort;
  const imageAlts = galleryAltOverrides[row.slug] || product.images.map((image, index) => index === 0 ? primaryAlt : image.altText || "");
  imageAlts[0] = primaryAlt;
  const reason = imageHolds[row.slug] || "";
  const group = variantGroup[row.slug] || "";
  const status = reason ? "HOLD_IMAGE_OR_FACT_VERIFICATION" : group ? "HOLD_CANONICAL_DECISION" : "DRAFT_REQUIRES_ADMIN_REVIEW";
  return { ...row, proposed_short_description: short, proposed_long_description: long,
    proposed_seo_title: title, proposed_meta_description: meta,
    proposed_image_alt_text_json: JSON.stringify(imageAlts),
    proposed_long_words: String(long.trim().split(/\s+/).length),
    proposed_combined_words: String(`${short} ${long}`.trim().split(/\s+/).length),
    review_status: status, factual_verification_needed: reason || row.factual_verification_needed,
    primary_image_visual_issue: reason || row.primary_image_visual_issue,
    expected_indexing_candidate_after_approval: "NO",
    expected_quality_gate_eligible: "NOT_EVALUATED_WITH_REAL_APPROVAL",
    expected_quality_gate_reasons: "Gate V2 requires exact-content admin approval; no approval exists",
    approved: "NO", primary_image_sha256: digestLocalImage(product),
    editorial_review_note: reason || (group ? `Resolve canonical treatment for ${group}.` : "Verify source facts and image identity before approval."),
    canonical_variant_group: group };
});
if (rows.length !== 60 || Object.keys(copy).length !== 60) throw new Error("Expected 60 reviewed rows");
if (new Set(rows.map((r) => r.proposed_seo_title.toLowerCase())).size !== 60 ||
    new Set(rows.map((r) => r.proposed_meta_description.toLowerCase())).size !== 60) throw new Error("Duplicate metadata");
const output = path.join(folder, "GSC_PRODUCT_SEO_APPROVAL_BATCH_60_2026-11-14.csv");
fs.writeFileSync(output, serializeCsv(Object.keys(rows[0]), rows));
console.log(JSON.stringify({ reviewed: rows.length, imageOrFactHolds: rows.filter((r) => r.review_status === "HOLD_IMAGE_OR_FACT_VERIFICATION").length,
  canonicalHolds: rows.filter((r) => r.review_status === "HOLD_CANONICAL_DECISION").length,
  individuallyReviewable: rows.filter((r) => r.review_status === "DRAFT_REQUIRES_ADMIN_REVIEW").length,
  approved: 0 }));
module.exports = { imageHolds, canonicalGroups };
