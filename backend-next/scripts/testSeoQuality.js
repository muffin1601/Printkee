const assert = require("node:assert/strict");
const { normalizeKeyword, normalizePath, similarity } = require("../services/seoQuality");
const { parseCsv, serializeCsv, validateOpportunityRows, OPPORTUNITY_COLUMNS } = require("../services/seoCsv");
const { evaluateProductSeo } = require("../services/productSeoQuality");

assert.equal(normalizePath("https://printkee.com/Corporate-Gifts/Noida/"), "/corporate-gifts/noida");
assert.equal(normalizeKeyword(" Corporate Gifts in Noida! "), "corporate gifts in noida");
assert.ok(similarity("corporate gifts for employees", "corporate gifts for employees") === 1);
assert.ok(similarity("custom t shirts for colleges", "corporate gifting for clients") < 0.5);
const csv = serializeCsv(OPPORTUNITY_COLUMNS, [{ Keyword: "corporate gifts, Gurgaon", Status: "RESEARCH", Notes: "=unsafe" }]);
const parsed = parseCsv(csv);
assert.equal(parsed[0].Keyword, "corporate gifts, Gurgaon");
assert.equal(parsed[0].Notes, "'=unsafe");
const validation = validateOpportunityRows(parsed, normalizeKeyword);
assert.equal(validation.errors.length, 0);
assert.equal(validation.records[0].normalizedKeyword, "corporate gifts gurgaon");
const weakProduct = evaluateProductSeo({
  isActive: true,
  description: { short: "A short product description." },
  images: [{ url: "/item.webp", altText: "Product image" }],
  seo: { metaTitle: "A sufficiently descriptive product SEO title", metaDescription: "A sufficiently descriptive product meta description written for search visitors." },
});
assert.equal(weakProduct.eligible, false);
assert.ok(weakProduct.issues.some((issue) => issue.includes("80 words")));

const strongProduct = evaluateProductSeo({
  isActive: true,
  description: {
    short: "A detailed branded notebook created for employee onboarding, conference stationery and client gifting programmes.",
    long: "This product record explains the cover construction, page format, binding, branding position, available colours and intended business use. Buyers can compare the documented specifications before requesting a quotation. Artwork, quantity, packaging and delivery requirements should be confirmed during order review. The notebook is suitable when the listed material and dimensions match the campaign brief, recipient profile and planned distribution method. Samples and production timing can be discussed before approval.",
  },
  attributes: { material: "PU", size: ["A5"], color: ["Black"], printingMethods: ["Screen print"] },
  images: [{ url: "/item.webp", altText: "Black A5 branded notebook" }],
  seo: { metaTitle: "A5 Branded Notebook for Corporate Gifting", metaDescription: "Review the material, size, branding options and ordering details for this A5 corporate notebook before requesting a quotation." },
});
assert.equal(strongProduct.eligible, true, strongProduct.issues.join("; "));
console.log("SEO quality utility checks passed");
