// One-off generator: writes frontend-next/data/productcontent.jsx (seoTitle + CTA)
// from the approved productContent.js. Re-run to reproduce; do not hand-edit output.
const fs = require("fs");
const path = require("path");
const { PRODUCTS } = require("./productContent");
const esc = (s) =>
  String(s)
    .replace(/\\/g, "\\\\")
    .replace(/`/g, "\\`")
    .replace(/\$\{/g, "\\${");
let out = "";
out += "// AUTO-GENERATED from backend-next/scripts/productContent.js (approved Product doc).\n";
out += "// Per-product SEO title + CTA wording, keyed by DB/URL product slug.\n";
out += "// Source of truth is the approved document; do not paraphrase. Re-generate, do not hand-edit.\n\n";
out += "const productContent = {\n";
for (const p of PRODUCTS) {
  out += `  "${p.slug}": {\n`;
  out += "    seoTitle: `" + esc(p.title) + "`,\n";
  out += "    ctaTitle: `" + esc(p.ctaTitle) + "`,\n";
  out += "    ctaDescription: `" + esc(p.cta) + "`,\n";
  out += "  },\n";
}
out += "};\n\nexport default productContent;\n";
const dest = path.join(__dirname, "../../frontend-next/data/productcontent.jsx");
fs.writeFileSync(dest, out);
console.log("wrote", dest, "with", PRODUCTS.length, "entries");
