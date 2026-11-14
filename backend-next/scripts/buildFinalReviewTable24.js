// One static, reviewable table from the backed-up catalog and the unapproved 60-row batch.
const fs = require("node:fs");
const path = require("node:path");
const { parseCsv, serializeCsv } = require("../services/seoCsv");
const { textOnly } = require("../services/productSeoQuality");
const root = path.resolve(__dirname, "../../seo/05-technical-audits");
const batch = parseCsv(fs.readFileSync(path.join(root, "GSC_PRODUCT_SEO_APPROVAL_BATCH_60_2026-11-14.csv"), "utf8"));
const catalog = require("../../seo/05-technical-audits/GSC_PRODUCT_GATE_HANDOFF_SNAPSHOT_2026-11-13.json").rows;
const byId = new Map(catalog.map((p) => [p.id, p]));
const notes = {
  "cork-passport-holder": "Passport fit and card capacity need a sample check.",
  "metal-ring-keychain": "Marking area and method are not recorded.",
  "cork-dining-table-mat": "Dimensions and table coverage are not recorded.",
  "executive-a5-pu-leather-diary": "Page ruling and ribbon are not established; the pictured sample logo does not prove a branding method.",
  "tall-cork-table-lamp": "Electrical rating, bulb and dimensions need supplier confirmation.",
  "cork-desktop-calendar": "Replacement date pieces and full kit contents are not recorded.",
  "olive-cork-table-mat": "Dimensions are not recorded; confirm finish against the sold sample.",
  "cork-hanging-lamp": "Electrical rating, bulb, hanging height and dimensions need supplier confirmation.",
  "executive-softshell-jacket": "Wind or water resistance and decoration method are unverified.",
  "3-in-1-system-jacket": "Removable-liner configuration is not visible; verify the three wearing modes.",
  "cork-gift-boxes": "Inner dimensions, closure and included contents are not recorded.",
  "cork-laptop-bag": "Laptop fit and padding are not recorded.",
  "yoga-mat-cork-fabric-eva": "Confirm backing and any performance claim against the sold SKU.",
  "natural-cork-coasters": "Piece count and dimensions are not recorded.",
  "fully-rubberized-3mm-yoga-mat": "Thickness and natural-rubber backing are recorded but not visible in the photo.",
  "premium-canvas-tote-bag": "Numeric dimensions, load rating and logo method are not recorded.",
  "cork-rubberized-yoga-mat-latex": "Latex and rubber backing are recorded but not established by the photo.",
  "large-grain-cork-coasters": "Set quantity and dimensions are not recorded.",
  "4-piece-cork-coasters": "Confirm the four-piece pack and dimensions against the sold SKU.",
  "choco-chip-cork-planter": "Opening size and drainage are not recorded.",
  "cork-multicolored-planter": "Confirm whether one or both pictured containers are sold; dimensions are not recorded.",
  "cork-round-planter": "Opening size and drainage are not recorded.",
  "ergonomic-professional-mouse": "Connection type, hand orientation and comfort claims are not recorded.",
  "cork-round-style-pen-holder": "Dimensions, capacity and sold quantity are not recorded.",
};
const facts = (p) => {
  const a = p.attributes || {};
  const parts = [];
  for (const key of ["material", "dimensions", "weight", "gsm", "capacity", "packaging", "customization", "careInstructions"]) {
    if (a[key]) parts.push(`${key}: ${a[key]}`);
  }
  for (const key of ["size", "color", "printingMethods", "brandingAreas"]) {
    if (a[key]?.length) parts.push(`${key}: ${a[key].join(", ")}`);
  }
  for (const spec of p.specifications || []) if (!/^(hsn code|gst rate|tax|gst)$/i.test(spec.key || "")) parts.push(`${spec.key}: ${spec.value}`);
  return parts.join("; ");
};
const rows = batch.filter((r) => r.review_status === "DRAFT_REQUIRES_ADMIN_REVIEW").map((r) => {
  const p = byId.get(r.product_id);
  if (!p || p.slug !== r.slug || !notes[r.slug] || r.approved !== "NO") throw new Error(`Stale review row: ${r.slug}`);
  return {
    product_id: r.product_id, slug: r.slug, product_name: p.name, product_code: p.sku || "",
    existing_short_description: textOnly(p.description?.short || ""),
    existing_long_description: textOnly(p.description?.long || ""),
    proposed_short_description: r.proposed_short_description,
    proposed_long_description: r.proposed_long_description,
    proposed_seo_title: r.proposed_seo_title,
    proposed_meta_description: r.proposed_meta_description,
    image_urls_json: JSON.stringify(p.images.map((im) => im.url)),
    proposed_image_alts_json: r.proposed_image_alt_text_json,
    catalog_recorded_facts: facts(p),
    image_observation: JSON.parse(r.proposed_image_alt_text_json)[0],
    unverified_details_or_assumptions: notes[r.slug],
    primary_image_sha256: r.primary_image_sha256,
    approved: "NO",
  };
});
if (rows.length !== 24 || Object.keys(notes).length !== 24) throw new Error("Expected 24 shortlisted products");
fs.writeFileSync(path.join(root, "GSC_PRODUCT_SEO_FINAL_REVIEW_TABLE_24_2026-11-14.csv"), serializeCsv(Object.keys(rows[0]), rows));
const esc = (v) => String(v ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const header = ["Product", "Existing descriptions", "Proposed descriptions", "SEO title and meta description", "Images and proposed alt text", "Catalog-recorded facts", "Image observation", "Unverified details / admin check"];
const body = rows.map((r) => {
  const images = JSON.parse(r.image_urls_json);
  const alts = JSON.parse(r.proposed_image_alts_json);
  const gallery = images.map((url, i) => `<figure><img src="../../frontend-next/public${encodeURI(url)}" alt="${esc(alts[i])}"><figcaption>${esc(url)}<br>Proposed alt: ${esc(alts[i])}</figcaption></figure>`).join("");
  return `<tr><td><strong>${esc(r.product_name)}</strong><br><code>${esc(r.slug)}</code><br>${esc(r.product_code)}</td>` +
    `<td><b>Short:</b> ${esc(r.existing_short_description)}<br><b>Long:</b> ${esc(r.existing_long_description)}</td>` +
    `<td><b>Short:</b> ${esc(r.proposed_short_description)}<br><b>Long:</b> ${esc(r.proposed_long_description)}</td>` +
    `<td><b>Title:</b> ${esc(r.proposed_seo_title)}<br><b>Meta:</b> ${esc(r.proposed_meta_description)}</td>` +
    `<td>${gallery}</td><td>${esc(r.catalog_recorded_facts)}</td><td>${esc(r.image_observation)}</td>` +
    `<td>${esc(r.unverified_details_or_assumptions)}<br><strong>Approval: NO</strong></td></tr>`;
}).join("\n");
const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Printkee 24-product SEO approval review</title>` +
  `<style>body{font:14px/1.45 Arial,sans-serif;margin:20px;color:#17202a}table{border-collapse:collapse;width:100%;table-layout:fixed}th,td{border:1px solid #ccd4dc;padding:10px;vertical-align:top;overflow-wrap:anywhere}th{background:#e9f1f6;position:sticky;top:0}tr:nth-child(even){background:#f8fafb}figure{margin:0 0 10px}img{max-width:145px;max-height:140px;object-fit:contain}figcaption{font-size:11px}code{font-size:11px}p{max-width:1100px}</style></head><body>` +
  `<h1>Printkee: 24-product SEO approval review</h1><p>This static review table uses the backed-up catalog and current local image files. “Catalog-recorded facts” are database evidence, not an independent supplier certification. “Image observation” describes visible appearance only. Unverified details require admin confirmation before approval. Every proposal remains unapproved.</p>` +
  `<table><thead><tr>${header.map((h) => `<th>${esc(h)}</th>`).join("")}</tr></thead><tbody>${body}</tbody></table></body></html>`;
fs.writeFileSync(path.join(root, "GSC_PRODUCT_SEO_FINAL_REVIEW_TABLE_24_2026-11-14.html"), html);
console.log(JSON.stringify({ rows: rows.length, approved: 0, imageCount: rows.reduce((n, r) => n + JSON.parse(r.image_urls_json).length, 0) }));
