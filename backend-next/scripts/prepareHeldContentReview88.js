// Review register for the previously held 88 products. No approval or database writes.
const fs = require("node:fs");
const path = require("node:path");
const { parseCsv, serializeCsv } = require("../services/seoCsv");
const root = path.resolve(__dirname, "../../seo/05-technical-audits");
const source = parseCsv(fs.readFileSync(path.join(root, "GSC_PRODUCT_SEO_FINAL_REVIEW_151_2026-11-14.csv"), "utf8"));
const products = require("../../seo/05-technical-audits/GSC_PRODUCT_GATE_HANDOFF_SNAPSHOT_2026-11-13.json").rows;
const byId = new Map(products.map((product) => [product.id, product]));
const held = source.filter((row) => row.review_status === "HOLD_FACT_VERIFICATION");
if (held.length !== 88) throw new Error(`Expected 88 prior holds, found ${held.length}`);
const rows = held.map((row) => {
  const p = byId.get(row.product_id);
  if (!p || p.slug !== row.slug) throw new Error(`Missing product: ${row.slug}`);
  const polo = row.slug === "corporate-polo-t-shirts";
  return {
    product_id: row.product_id, slug: row.slug, product_name: p.name,
    primary_image: p.images?.[0]?.url || "",
    existing_hold: row.factual_verification_needed,
    catalog_facts: JSON.stringify({ material: p.attributes?.material || "", color: p.attributes?.color || [],
      size: p.attributes?.size || [] }),
    resolution_state: polo ? "COPY_PREPARABLE_CANONICAL_AND_METHOD_PENDING" : "HOLD_MANUAL_VERIFICATION",
    proposed_short_description: polo ? "Maroon cotton-blend polo shirt in recorded sizes S to XXL for team wear." : "",
    proposed_long_description: polo ? "Corporate Polo T-Shirts is a maroon collared shirt recorded with a cotton-blend fabric and sizes S, M, L, XL and XXL. The existing images show a maroon polo. It may suit team uniforms, staff events or a coordinated company order. Confirm the exact fabric and any decoration method before promising a branded version; the database's current embroidery claim has no supporting method field. Choose the size mix against a physical sample before a bulk order." : "",
    proposed_seo_title: polo ? "Maroon Corporate Polo T-Shirts | Printkee" : "",
    proposed_meta_description: polo ? "Maroon cotton-blend corporate polo shirt in recorded sizes S to XXL. Review the sample and confirm any branding method before ordering for a team." : "",
    proposed_primary_image_alt: polo ? "Maroon collared polo shirt shown from the front" : "",
    remaining_decision: polo ? "Verify embroidery and fabric; decide canonical treatment within the polo color family." : row.factual_verification_needed,
    approved: "NO",
  };
});
fs.writeFileSync(path.join(root, "GSC_PRODUCT_HELD_CONTENT_REVIEW_88_2026-11-14.csv"), serializeCsv(Object.keys(rows[0]), rows));
console.log(JSON.stringify({ heldReviewed: rows.length, contentPrepararableFromCatalog: rows.filter((r) => r.proposed_long_description).length,
  fullyReleased: 0, stillHeld: rows.length, approved: 0 }));
