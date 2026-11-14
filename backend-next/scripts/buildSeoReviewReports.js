// Build read-only editorial review artifacts from the saved product source and draft CSV.
const fs = require("node:fs");
const path = require("node:path");
const imageIssues = require("./productSeoImageConflicts");
const shortlistCopy = require("./productSeoShortlistCopy");
const { evaluateProductSeo } = require("../services/productSeoQuality");

const root = path.resolve(__dirname, "../..");
const folder = path.join(root, "seo/05-technical-audits");
const source = JSON.parse(fs.readFileSync(path.join(folder, "GSC_PRODUCT_CONTENT_SOURCE_BACKUP_2026-11-13.json"), "utf8")).rows;
const csvInput = fs.readFileSync(path.join(folder, "GSC_PRODUCT_SEO_DRAFTS_151_2026-11-13.csv"), "utf8");
function parseCsv(input) {
  const lines = []; let line = [], field = "", quote = false;
  for (let i = 0; i < input.length; i++) {
    const c = input[i];
    if (c === '"') { if (quote && input[i + 1] === '"') { field += '"'; i++; } else quote = !quote; }
    else if (c === "," && !quote) { line.push(field); field = ""; }
    else if ((c === "\r" || c === "\n") && !quote) {
      if (c === "\r" && input[i + 1] === "\n") i++;
      line.push(field); if (line.some(Boolean)) lines.push(line); line = []; field = "";
    } else field += c;
  }
  if (quote) throw new Error("Unclosed CSV quote");
  if (field || line.length) { line.push(field); lines.push(line); }
  const headers = lines.shift().map((h) => h.replace(/^\uFEFF/, ""));
  return lines.map((fields) => Object.fromEntries(headers.map((h, i) => [h, fields[i]])));
}
const drafts = parseCsv(csvInput);
if (source.length !== 151 || drafts.length !== 151) throw new Error("Expected 151 source and draft records");
const bySlug = new Map(drafts.map((r) => [r.slug, r]));
const escapeHtml = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const csvCell = (s) => `"${String(s ?? "").replace(/"/g, '""')}"`;
const localImage = (url) => url.startsWith("/assets/") ? `../../frontend-next/public${url}` : url;
const priority = (issue) => /describes|not the|not visually|without|not apparent|composition|notebook|set includes|identity/i.test(issue) ? "P0 identity/contents" : "P1 variant/image";
const action = (issue) => /not visually|not apparent|without/i.test(issue)
  ? "Verify the claimed feature or contents with the supplier and obtain a photo that demonstrates the correct product; then approve the description and alt text."
  : "Match the photo to the SKU and supplier record. Use a verified replacement image or correct the product identity/variant, then revise alt text and copy.";

const mismatches = Object.entries(imageIssues).map(([number, issue]) => {
  const item = source[Number(number) - 1];
  return {
    priority: priority(issue), product_name: item.name, slug: item.slug, product_url: item.url,
    existing_primary_image: item.images?.[0]?.url || "", image_preview: localImage(item.images?.[0]?.url || ""),
    existing_primary_alt: item.images?.[0]?.altText || "", suspected_mismatch: issue,
    recommended_action: action(issue), review_status: "HOLD — supplier/catalog verification required",
  };
}).sort((a, b) => a.priority.localeCompare(b.priority) || a.slug.localeCompare(b.slug));
if (mismatches.length !== 77) throw new Error(`Expected 77 image cases, received ${mismatches.length}`);

const fields = Object.keys(mismatches[0]);
fs.writeFileSync(path.join(folder, "GSC_IMAGE_MISMATCH_REVIEW_2026-11-13.csv"),
  `\uFEFF${fields.join(",")}\r\n${mismatches.map((row) => fields.map((key) => csvCell(row[key])).join(",")).join("\r\n")}\r\n`);
const cards = mismatches.map((row) => `<article class="card"><div class="photo"><img src="${escapeHtml(row.image_preview)}" alt="Current catalog image for ${escapeHtml(row.slug)}"></div><div class="body"><div class="priority">${escapeHtml(row.priority)}</div><h2>${escapeHtml(row.product_name)}</h2><div class="slug">${escapeHtml(row.slug)}</div><p><strong>Suspected mismatch:</strong> ${escapeHtml(row.suspected_mismatch)}</p><p><strong>Recommended action:</strong> ${escapeHtml(row.recommended_action)}</p><p><a href="${escapeHtml(row.product_url)}">Product URL</a> · <a href="${escapeHtml(row.image_preview)}">Open existing image</a></p><small>Current alt: ${escapeHtml(row.existing_primary_alt || "(empty)")}</small></div></article>`).join("\n");
fs.writeFileSync(path.join(folder, "GSC_IMAGE_MISMATCH_REVIEW_2026-11-13.html"), `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Printkee product image verification</title><style>body{font:15px/1.45 system-ui,sans-serif;margin:24px;background:#f5f7fa;color:#18212b}header{max-width:900px;margin:auto auto 24px}h1{font-size:28px}main{display:grid;grid-template-columns:repeat(auto-fit,minmax(380px,1fr));gap:16px}.card{background:white;border:1px solid #dbe1e7;border-radius:12px;overflow:hidden;display:grid;grid-template-columns:160px 1fr}.photo{display:grid;place-items:center;background:#eee;min-height:180px}.photo img{width:100%;height:180px;object-fit:contain}.body{padding:14px}h2{font-size:17px;margin:4px 0}.slug,small{color:#596777}.priority{font-size:12px;font-weight:700;color:#8c241c}.body p{margin:8px 0}a{color:#155e9b}@media print{body{background:white}.card{break-inside:avoid}}</style></head><body><header><h1>Printkee primary-image verification</h1><p>${mismatches.length} suspected photo-to-record mismatches. These are visual review flags, not confirmed supplier corrections. Do not replace an image or publish revised alt text until the product identity is verified.</p></header><main>${cards}</main></body></html>`);

const shortlist = ["wireless-charger-stand", "wireless-charging-power-bank-10000mah", "navy-blue-round-neck-t-shirt", "yoga-mat-cork-fabric-eva", "fully-rubberized-3mm-yoga-mat", "double-wall-insulated-sipper-bottle", "2mm-medium-grain-cork-sheet", "cork-rubberized-yoga-mat-latex", "3mm-medium-grain-cork-sheet", "4mm-medium-grain-cork-sheet"];
const sections = shortlist.map((slug, i) => {
  const d = bySlug.get(slug), s = source.find((row) => row.slug === slug);
  if (!d || !s) throw new Error(`Missing shortlist row: ${slug}`);
  const imageUrl = s.images?.[0]?.url || "";
  const hold = d.review_status === "HOLD_FACT_VERIFICATION";
  const copy = shortlistCopy[slug];
  if (!hold && !copy) throw new Error(`Missing conservative copy: ${slug}`);
  const revised = copy ? {
    ...s,
    description: { short: copy.short, long: copy.long },
    seo: { ...s.seo, metaTitle: copy.title, metaDescription: copy.meta },
    images: s.images.map((im, index) => ({ ...im, altText: index === 0 ? copy.alt : im.altText })),
  } : null;
  const quality = revised && evaluateProductSeo(revised);
  return `## ${i + 1}. ${s.name} — ${hold ? "image verification hold" : "admin review candidate"}\n\n` +
    `- Product: ${s.url}\n- Slug: \`${slug}\`\n- Existing image: [view image](${localImage(imageUrl).replace(/ /g, "%20")})\n` +
    (hold ? `- **Withdrawn from approval:** ${d.factual_verification_needed}\n- The earlier draft, metadata and alt text must not be published until the product and image are verified.\n`
      : `- Proposed image alt: ${copy.alt}\n- Revised-copy gate simulation: ${quality.eligible ? "pass" : quality.issues.join("; ")}\n` +
        `\n**Short description**\n\n${copy.short}\n\n**Visible description**\n\n${copy.long}\n\n` +
        `**SEO title:** ${copy.title}\n\n**Meta description:** ${copy.meta}\n`);
});
fs.writeFileSync(path.join(folder, "GSC_FINAL_APPROVAL_SHORTLIST_10_2026-11-13.md"),
  `# Printkee product SEO approval shortlist\n\nThese ten were the previous unheld shortlist. Closer review moved three to hold: the flat charger photo, the olive power-bank photo, and the unsupported Dryfit shirt name. The other seven have conservative revised copy below for final admin verification. These revisions are not in MongoDB or the 151-row import CSV; after approval, incorporate the exact approved wording into that CSV and rerun checks. Product links are review references, not claims of current indexability.\n\n${sections.join("\n---\n\n")}`);
console.log(JSON.stringify({ imageCases: mismatches.length, originalShortlist: shortlist.length,
  currentUnheld: shortlist.filter((slug) => bySlug.get(slug).review_status !== "HOLD_FACT_VERIFICATION").length,
  conservativeCopyPass: shortlist.filter((slug) => {
    const s = source.find((row) => row.slug === slug), copy = shortlistCopy[slug];
    return copy && evaluateProductSeo({ ...s, description: { short: copy.short, long: copy.long },
      seo: { ...s.seo, metaTitle: copy.title, metaDescription: copy.meta },
      images: s.images.map((im, i) => ({ ...im, altText: i === 0 ? copy.alt : im.altText })) }).eligible;
  }).length }));
