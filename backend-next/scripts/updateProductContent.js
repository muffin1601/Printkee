// Updates the representative products listed in productContent.js with the
// approved doc wording, using the split-field design:
//
//   description.long  = intro paragraphs (HTML <p> blocks)
//   description.short = intro[0] (plain, used for meta + JSON-LD)
//   idealFor          = string[]   (rendered as its own page section)
//   features          = string[]   (rendered as its own page section)
//   faqs              = {question, answer}[]  (rendered + FAQPage JSON-LD)
//
// Usage:
//   node scripts/updateProductContent.js           -> DRY RUN (no writes), prints plan
//   node scripts/updateProductContent.js --write    -> writes; backs up prior values first
//
// NOTE: requires idealFor / features / faqs to exist on the Product schema,
// otherwise Mongoose strips them on save and they won't persist or be returned
// by the API. See backend-next/models/product.js.
require("dotenv").config();
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const Product = require("../models/product");
const { PRODUCTS } = require("./productContent");

const WRITE = process.argv.includes("--write");
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// Description holds ONLY the descriptive paragraphs. "Ideal For", "Product
// Features", and FAQs live in their own product fields / page sections.
function buildLong(c) {
  return c.intro.map((p) => `<p>${esc(p)}</p>`).join("\n");
}

(async () => {
  await mongoose.connect(process.env.MONGO_URI);
  const backup = [];
  const missing = [];
  let willUpdate = 0;

  for (const c of PRODUCTS) {
    const prod = await Product.findOne({ slug: c.slug });
    if (!prod) { missing.push(c.slug); continue; }
    backup.push({
      slug: prod.slug,
      name: prod.name,
      description: prod.description,
      idealFor: prod.idealFor,
      features: prod.features,
      faqs: prod.faqs,
    });
    const longHtml = buildLong(c);
    const short = c.intro[0];
    willUpdate++;
    console.log(`• ${prod.slug}  ("${prod.name}")`);
    console.log(`    description: ${prod.description?.long?.length || 0} -> ${longHtml.length} chars (paragraphs)`);
    console.log(`    idealFor: ${prod.idealFor?.length || 0} -> ${c.idealFor.length}  |  features: ${prod.features?.length || 0} -> ${c.features.length}  |  faqs: ${prod.faqs?.length || 0} -> ${c.faqs.length}`);

    if (WRITE) {
      prod.description = { ...(prod.description || {}), long: longHtml, short };
      prod.idealFor = c.idealFor;
      prod.features = c.features;
      prod.faqs = c.faqs.map(([question, answer]) => ({ question, answer }));
      await prod.save();
    }
  }

  if (missing.length) console.log("\nMISSING SLUGS (skipped):", missing.join(", "));
  console.log(`\n${WRITE ? "UPDATED" : "WOULD UPDATE"} ${willUpdate} products.`);

  if (WRITE) {
    const dir = path.join(__dirname, "backups");
    fs.mkdirSync(dir, { recursive: true });
    const file = path.join(dir, `product-content-backup-${Date.now()}.json`);
    fs.writeFileSync(file, JSON.stringify(backup, null, 2));
    console.log("Backup of previous values written to:", file);
  } else {
    console.log("DRY RUN — re-run with --write to apply.");
  }
  await mongoose.disconnect();
})().catch((e) => { console.error(e); process.exit(1); });
