// Offline, deterministic editorial drafts from a read-only MongoDB source export.
// No AI service, network request, or database write is used here.
const fs = require("node:fs");
const path = require("node:path");
const { evaluateProductSeo, textOnly } = require("../services/productSeoQuality");
const { similarity } = require("../services/productSeoContent");
const editorialAngles = require("./productSeoEditorialAngles");
const imageConflicts = require("./productSeoImageConflicts");

const [sourcePath, outputPath] = process.argv.slice(2);
if (!sourcePath || !outputPath) throw new Error("Source JSON and output CSV paths are required");
const source = JSON.parse(fs.readFileSync(sourcePath, "utf8"));
const rows = source.rows;
if (rows.length !== 151) throw new Error(`Expected 151 products; received ${rows.length}`);
if (editorialAngles.length !== rows.length) throw new Error(`Expected ${rows.length} editorial notes; received ${editorialAngles.length}`);

const knownConflicts = {
  "kitchen-apron": "Cotton description conflicts with polyester cotton blend material; verify composition and branding methods.",
  "classic-steel-coffee-mug": "Stainless steel identity conflicts with ceramic SEO copy/features and ceramic HSN; verify the actual item.",
  "matte-black-corporate-mug": "Suction mug identity conflicts with matte-black ceramic SEO copy; verify the actual item.",
};
const extraReview = {
  "casual-cotton-bucket-hat": "Database product name is Formal Shirt while slug, image alt and descriptions identify a bucket hat.",
  "classic-metal-sipper-bottle": "Database product name says Bomboo Bottles while material and copy identify an aluminium bottle.",
  "thermos-style-vacuum-sipper-bottle": "Database product name says Bomboo Bottle while material and copy identify insulated steel.",
  "panama-straw-hat": "Database product name says Cotton Hat while material and copy identify straw.",
  "knit-beanie-winter-hat": "Database product name says Cotton Hat while material and copy identify acrylic knit.",
  "classic-wool-beret": "Database product name says Sports Hat while material and copy identify a wool beret.",
  "promotional-sports-t-shirts": "Product name says sports T-shirts; description says polo; verify product style and fabric claim.",
  "promotional-cotton-t-shirts": "Product name says cotton T-shirts; material says cotton blend; verify composition.",
  "t-shirt-printing": "Product name/slug describe printing, while image alt and copy describe a sky-blue polo product; verify page identity.",
  "custom-t-shirt-printing": "Product name/slug describe printing, while copy and image describe an orange polo product; verify page identity.",
  "logo-t-shirts": "Product name suggests logo T-shirts, while source copy and image describe a purple polo; verify page identity.",
  "corporate-polo-t-shirts": "Database description is incomplete; confirm the pictured polo and embroidery availability.",
  "navy-blue-round-neck-t-shirt": "Product name says Dryfit while the material field only says cotton blend. Verify any performance-fabric claim before publication.",
  "classic-baseball-cap": "Page is categorized as a hat and slug says baseball cap; confirm whether this is a distinct cap page or a duplicate of color variants.",
  "executive-employee-welcome-kit": "Kit contents are not listed; verify components before making substantive product claims.",
  "eco-friendly-lanyard-id-card": "Description claims biodegradable ID card, but material attribute only verifies recycled polyester lanyard; verify card material.",
};

const clean = (value) => textOnly(value).replace(/\s+/g, " ").trim();
const sentence = (value) => /[.!?]$/.test(value) ? value : `${value}.`;
const list = (arr) => arr.length <= 1 ? arr[0] || "" : arr.length === 2 ? arr.join(" and ") : `${arr.slice(0, -1).join(", ")}, and ${arr.at(-1)}`;
const cap = (value) => value.charAt(0).toUpperCase() + value.slice(1);
const words = (value) => clean(value).split(/\s+/).filter(Boolean).length;
const titleCaseSlug = (slug) => slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
const productLabel = (r) => {
  const name = clean(r.name);
  const alt = clean(r.images?.[0]?.altText);
  if (knownConflicts[r.slug] || extraReview[r.slug]) return alt && !/^(custom|personalized|branding|promotional)\b/i.test(alt) ? alt : titleCaseSlug(r.slug);
  return name;
};
const has = (r, regex) => regex.test(`${r.slug} ${r.name}`.toLowerCase());

function productFamily(r) {
  if (has(r, /yoga.*mat/)) return "yoga mat";
  if (has(r, /cork.*sheet/)) return "cork sheet";
  if (has(r, /cork.*coaster/)) return "coaster";
  if (has(r, /cork.*(mat|tray)/)) return "table accessory";
  if (has(r, /cork.*(planter|lamp)/)) return "home accessory";
  if (has(r, /cork.*combo/)) return "gift set";
  if (has(r, /cork.*(bag|holder|boxes|calendar)/)) return "cork accessory";
  if (has(r, /t-shirt|polo|round-neck/)) return "shirt";
  if (has(r, /cap|hat|beret|beanie/)) return "headwear";
  if (has(r, /hoodie|jacket|parka/)) return "outerwear";
  if (has(r, /apron/)) return "apron";
  if (has(r, /tie/)) return "tie";
  if (has(r, /lanyard/)) return "lanyard";
  if (has(r, /duffle|backpack|tote|shopping-bag|travel-bag/)) return "bag";
  if (has(r, /sipper|bottle|mug/)) return "drinkware";
  if (has(r, /keychain/)) return "keychain";
  if (has(r, /clock/)) return "clock";
  if (has(r, /trophy|award|plaque/)) return "award";
  if (has(r, /keyboard|mouse|charging|power-bank/)) return "tech accessory";
  if (has(r, /mouse-pad/)) return "desk accessory";
  if (has(r, /file|folder|diary|notebook|pen/)) return "office supply";
  return "product";
}
const familyUse = {
  "cork sheet": "For a material-led project, compare thickness and sheet dimensions before planning a cut or installation.",
  coaster: "On a desk, meeting table or hospitality counter, coasters give cups a defined place and put the material itself in view.",
  "table accessory": "The piece can be considered for a dining table or hospitality setting where the listed cork finish fits the surrounding décor.",
  "home accessory": "Its role is decorative as well as practical, making the stated form and material relevant to a room or office setting.",
  "gift set": "Consider the included pieces together when choosing a recipient or occasion for a coordinated gift.",
  "cork accessory": "The cork finish brings a natural appearance to an everyday accessory; check its fit and configuration for the intended use.",
  "yoga mat": "For practice or wellness gifting, compare the surface, backing and dimensions with the recipient's intended routine.",
  shirt: "For a team or event order, choose the color and size mix first, then confirm artwork placement and production method.",
  headwear: "For a group order, compare color and fit options before approving branding artwork.",
  outerwear: "Fabric, cut and sizing matter when choosing a layer for a team in a particular work setting.",
  apron: "For service or workshop use, match the apron style, material and fit to the work being done.",
  tie: "For uniforms or event dress, coordinate the color and material with the rest of the outfit.",
  lanyard: "For an event or workplace issue, check the card and lanyard configuration before arranging badges in quantity.",
  bag: "For a corporate or event order, consider capacity and carrying format alongside material and color.",
  drinkware: "When selecting drinkware for a team or gifting program, compare material and capacity with how recipients will use it.",
  keychain: "For a giveaway or welcome kit, format and material are practical details to compare.",
  clock: "For an office or gifting setting, consider form, finish and dimensions alongside the intended display position.",
  award: "The form and material help determine whether the piece suits a recognition ceremony, presentation or display.",
  "tech accessory": "For an employee kit or desk setup, check connectivity or charging details against the devices people actually use.",
  "desk accessory": "The surface and dimensions help assess how the accessory will sit within a particular desk setup.",
  "office supply": "For onboarding or daily office use, format and material help distinguish this item from other stationery choices.",
  product: "Consider its specifications and intended use before selecting the item for a larger order.",
};
const orderingNotes = [
  "The description focuses on the details in this listing so an order can be checked against the intended use.",
  "For a company purchase, compare the documented options with the recipient, event and quantity before approving artwork.",
  "Where branding is planned, confirm its placement and method with Printkee; the database does not establish every production option.",
  "The listed material and format are the strongest basis for choosing this item for a workplace or gift program.",
  "This record does not establish unlisted performance claims, so confirm any critical requirement before ordering.",
  "Check the available variant and the actual sample when a consistent team presentation matters.",
];

function details(r, index) {
  const a = r.attributes || {};
  const parts = [];
  if (clean(a.material)) parts.push(`Its material is ${clean(a.material)}.`);
  if (a.color?.length) parts.push(`${a.color.length === 1 ? "It comes in" : "Color options include"} ${list(a.color.map(clean))}.`);
  if (a.size?.length) parts.push(`${a.size.length === 1 ? "The size is" : "Sizes include"} ${list(a.size.map(clean))}.`);
  for (const key of ["dimensions", "weight", "gsm", "capacity", "packaging", "careInstructions"]) {
    if (clean(a[key])) parts.push(`${cap(key.replace(/([A-Z])/g, " $1"))}: ${clean(a[key])}.`);
  }
  for (const s of r.specifications || []) {
    if (!s.key || !s.value || /^(hsn code|gst rate)$/i.test(s.key.trim())) continue;
    parts.push(`${clean(s.key)}: ${clean(s.value)}.`);
  }
  if (a.printingMethods?.length) parts.push(`Listed printing methods: ${list(a.printingMethods.map(clean))}.`);
  if (clean(a.customization)) parts.push(`Customization detail: ${clean(a.customization)}.`);
  if (index % 3 === 1) parts.reverse();
  return parts;
}
const issueNotes = (r, index) => [knownConflicts[r.slug], extraReview[r.slug], imageConflicts[index + 1]].filter(Boolean);
const csvCell = (value) => `"${String(value ?? "").replace(/"/g, '""')}"`;

const out = rows.map((r, index) => {
  const label = productLabel(r);
  const family = productFamily(r);
  const existing = clean(r.description?.long);
  const detailSentences = details(r, index);
  const notes = issueNotes(r, index);
  const angle = editorialAngles[index];
  const sourceSentence = existing && !knownConflicts[r.slug] && !extraReview[r.slug]
    ? sentence(existing) : "";
  const intro = sourceSentence && sourceSentence.toLowerCase().includes(label.toLowerCase().slice(0, 8))
    ? sourceSentence : sourceSentence ? `${label}: ${sourceSentence}` : `${label}.`;
  const blocks = index % 4 === 0
    ? [intro, angle, familyUse[family], ...detailSentences]
    : index % 4 === 1
      ? [intro, ...detailSentences, angle, familyUse[family]]
      : index % 4 === 2
        ? [intro, ...detailSentences.slice(0, 1), angle, ...detailSentences.slice(1), familyUse[family]]
        : [intro, angle, familyUse[family], ...detailSentences.reverse()];
  let long = blocks.filter(Boolean).join(" ").replace(/\s+/g, " ").trim();
  const short = clean(r.description?.short) && !notes.length ? sentence(clean(r.description.short))
    : `${label} with the documented ${clean(r.attributes?.material) || family} details for review.`;
  const titleLabel = imageConflicts[index + 1] ? titleCaseSlug(r.slug) : clean(r.images?.[0]?.altText) || label;
  const title = `${titleLabel} | Printkee${titleLabel.length < 38 ? " Corporate Gifting" : ""}`.slice(0, 100);
  const material = clean(r.attributes?.material);
  const color = r.attributes?.color?.length === 1 ? clean(r.attributes.color[0]) : "";
  const lead = `${label}${material ? ` in ${material}` : ""}${color ? `, ${color}` : ""}.`;
  const sourceMeta = sentence(clean(r.description?.long).split(/[.!?]/)[0] || clean(r.description?.short));
  const shortMeta = sentence(clean(r.description?.short).split(/[.!?]/)[0]);
  const angleMeta = sentence(editorialAngles[index].split(/[.!?]/)[0]);
  let meta = lead;
  const first = [sourceMeta, shortMeta, angleMeta].find((part) => part.length > 5 && meta.length + 1 + part.length <= 160);
  if (first) meta += ` ${first}`;
  if (meta.length < 105 && angleMeta !== first && meta.length + 1 + angleMeta.length <= 160) meta += ` ${angleMeta}`;
  if (meta.length < 70) meta += " Review the product details and available options with Printkee.";
  const alt = (r.images || []).map((im) => clean(im.altText));
  if (imageConflicts[index + 1] && alt.length) {
    alt[0] = `Image of ${imageConflicts[index + 1].split(/[,;.]/)[0].replace(/^Photo shows /, "")}`;
  }
  const proposed = {
    ...r,
    description: { short, long },
    seo: { ...r.seo, metaTitle: title, metaDescription: meta },
    images: (r.images || []).map((im, i) => ({ ...im, altText: alt[i] })),
  };
  const quality = evaluateProductSeo(proposed);
  const missing = [];
  if (quality.detailCount < 3) missing.push("Add verified product detail groups; copy alone cannot fix this gate condition");
  if (!clean(r.attributes?.material)) missing.push("Verify material or other key specification");
  if (!r.attributes?.size?.length && !clean(r.attributes?.dimensions)) missing.push("Verify size/dimensions if relevant");
  if (!r.attributes?.printingMethods?.length && !clean(r.attributes?.customization)) missing.push("Verify any customization method before promising one");
  if (!r.images?.length) missing.push("Add and inspect a real product image");
  if (r.images?.some((im) => !clean(im.altText))) missing.push("Inspect the actual image before approving new alt text");
  if (imageConflicts[index + 1]) missing.push("Replace the mismatched image or correct product facts; approve alt text only after image identity is resolved");
  if (words(long) < 80) missing.push("Gather more verified product-specific facts; avoid padding solely to satisfy word count");
  return {
    url: r.url, product_id: r.id, slug: r.slug, product_code: r.sku, current_product_name: r.name,
    proposed_short_description: short, proposed_long_description: long,
    proposed_seo_title: title, proposed_meta_description: meta,
    proposed_image_alt_text_json: JSON.stringify(alt),
    primary_image_visual_issue: imageConflicts[index + 1] || "",
    review_status: notes.length ? "HOLD_FACT_VERIFICATION" : "DRAFT_REQUIRES_ADMIN_REVIEW",
    factual_verification_needed: notes.join(" "), missing_field_recommendations: missing.join("; "),
    expected_quality_gate_eligible: quality.eligible ? "YES" : "NO",
    expected_indexing_candidate_after_approval: quality.eligible && !notes.length ? "YES" : "NO",
    expected_quality_gate_reasons: quality.issues.join("; "),
    proposed_long_words: words(long), proposed_combined_words: words(`${short} ${long}`),
    source_updated_at: r.updatedAt, approved: "NO",
  };
});

const allOriginal = new Set(rows.map((r) => clean(r.description?.long).toLowerCase()));
const duplicatePairs = [];
for (let i = 0; i < out.length; i++) for (let j = i + 1; j < out.length; j++) {
  const score = similarity(out[i].proposed_long_description, out[j].proposed_long_description);
  if (score >= 0.5) duplicatePairs.push([out[i].slug, out[j].slug, Number(score.toFixed(3))]);
}
if (duplicatePairs.length) console.warn(`Near-duplicate draft pairs: ${JSON.stringify(duplicatePairs)}`);
const columns = Object.keys(out[0]);
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, `\uFEFF${columns.join(",")}\r\n${out.map((row) => columns.map((key) => csvCell(row[key])).join(",")).join("\r\n")}\r\n`);
console.log(JSON.stringify({ total: out.length, expectedEligible: out.filter((r) => r.expected_quality_gate_eligible === "YES").length,
  expectedCandidates: out.filter((r) => r.expected_indexing_candidate_after_approval === "YES").length,
  holdForFacts: out.filter((r) => r.review_status === "HOLD_FACT_VERIFICATION").length,
  under80Combined: out.filter((r) => r.proposed_combined_words < 80).length,
  under40Visible: out.filter((r) => r.proposed_long_words < 40).length,
  duplicatePairs: duplicatePairs.length, originalLongDescriptions: allOriginal.size }, null, 2));
