// Read-only evidence for a proposed gate-policy review.
const fs = require("node:fs");
const source = JSON.parse(fs.readFileSync("../seo/05-technical-audits/GSC_PRODUCT_CONTENT_SOURCE_BACKUP_2026-11-13.json", "utf8")).rows;
const { evaluateProductSeo } = require("../services/productSeoQuality");
const hasOnlyTaxSpecs = (row) => row.specifications?.length > 0 &&
  row.specifications.every((s) => /^(hsn code|gst rate)$/i.test(String(s.key || "").trim()));
const taxOnly = source.filter((row) => hasOnlyTaxSpecs(row) && evaluateProductSeo(row).detailCount >= 3);
console.log(JSON.stringify({
  productsWithTaxOnlySpecificationGroupCountedTowardThreeDetails: taxOnly.length,
  examples: taxOnly.slice(0, 12).map((row) => row.slug),
}, null, 2));
