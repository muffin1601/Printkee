const test = require("node:test");
const assert = require("node:assert/strict");
const { evaluateProductSeoCandidate, contentFingerprint, expectedCanonical } = require("../services/productSeoQualityCandidate");

const product = {
  id: "p1", name: "Natural Cork Desk Mat", slug: "natural-cork-desk-mat",
  isActive: true, status: "published", deletedAt: null,
  category: { _id: "c1", slug: "eco-products", isActive: true },
  subcategory: { _id: "s1", slug: "cork-mats", category: "c1", isActive: true },
  description: {
    short: "Natural cork desk mat for a working surface.",
    long: "This natural cork desk mat gives a work surface a defined place for daily writing and computer use. It has a brown cork finish.",
  },
  attributes: { material: "Natural Cork", color: ["Brown"] },
  images: [{ url: "/assets/products/mat.webp", altText: "Brown natural cork desk mat" }],
  seo: { metaTitle: "Natural Cork Desk Mat | Printkee", metaDescription: "A natural cork desk mat in brown for a workspace or office gift." },
};
const approval = (p) => ({ fingerprint: contentFingerprint(p), canonical: expectedCanonical(p),
  primaryImageUrl: p.images[0].url, identityVerified: true, imageVerified: true,
  contentUseful: true, duplicateReviewed: true, reviewer: "catalog-owner",
  reviewedAt: "2026-11-13T00:00:00.000Z", imageDigest: "abc" });
const imageDigests = new Map([["p1", "abc"]]);

test("a concise factual product can pass only with matching review evidence", () => {
  const noApproval = evaluateProductSeoCandidate(product);
  assert.equal(noApproval.eligible, false);
  assert.ok(noApproval.wordCount < 80);
  const reviewed = evaluateProductSeoCandidate(product, { approvals: { p1: approval(product) }, imageDigests });
  assert.equal(reviewed.eligible, true, reviewed.issues.join("; "));
  assert.ok(reviewed.warnings.some((warning) => warning.includes("80-word")));
  assert.equal(evaluateProductSeoCandidate({ ...product, description: { ...product.description, long: "A changed description." } },
    { approvals: { p1: approval(product) }, imageDigests }).eligible, false);
});

test("real approval requires a reviewer and matching image digest", () => {
  const record = approval(product);
  assert.equal(evaluateProductSeoCandidate(product, { approvals: { p1: record } }).eligible, false);
  assert.equal(evaluateProductSeoCandidate(product, { approvals: { p1: record }, imageDigests: new Map([["p1", "abc"]]) }).eligible, true);
});

test("confirmed conflicts block legacy pages; suspected images trigger review without auto-noindex", () => {
  const legacy = require("../../seo/05-technical-audits/GSC_PRODUCT_GATE_CATALOG_SNAPSHOT_2026-11-13.json")
    .rows.find((p) => p.slug === "black-corporate-shirt");
  const legacyIndexedIds = new Set([legacy.id]);
  const common = { legacyIndexedIds, protectLegacy: true, suspectedHolds: { [legacy.id]: "Check color" } };
  const suspected = evaluateProductSeoCandidate(legacy, common);
  assert.equal(suspected.eligible, true);
  assert.ok(suspected.warnings.some((warning) => warning.includes("review hold")));
  const confirmed = evaluateProductSeoCandidate(legacy, { ...common, confirmedHolds: { [legacy.id]: "Conflicting capacity" } });
  assert.equal(confirmed.eligible, false);
  const emptied = { ...legacy, description: { short: "", long: "" } };
  assert.equal(evaluateProductSeoCandidate(emptied, common).eligible, false);
});

test("duplicates and variant groups need a canonical decision before new eligibility", () => {
  const context = { approvals: { p1: approval(product) }, imageDigests,
    duplicatePeers: new Map([["p1", ["other-mat"]]]), variantGroups: { p1: "cork-mats" } };
  assert.equal(evaluateProductSeoCandidate(product, context).eligible, false);
  const self = { type: "self", canonical: expectedCanonical(product), distinctivenessApproved: true };
  assert.equal(evaluateProductSeoCandidate(product, { ...context, canonicalDecisions: { p1: self } }).eligible, true);
  assert.equal(evaluateProductSeoCandidate(product, { ...context,
    canonicalDecisions: { p1: { type: "canonicalize", canonical: "https://printkee.com/eco-products/cork-mats" } } }).eligible, false);
  assert.equal(evaluateProductSeoCandidate({ ...product, canonicalUrl: "https://printkee.com/wrong" },
    { ...context, canonicalDecisions: { p1: self } }).eligible, false);
});

test("approved records still fail when content, taxonomy, or buyer facts are invalid", () => {
  const empty = { ...product, description: { short: "", long: "Coming soon" } };
  assert.equal(evaluateProductSeoCandidate(empty, { approvals: { p1: approval(empty) }, imageDigests }).eligible, false);
  const taxOnly = { ...product, attributes: {}, specifications: [{ key: "HSN Code", value: "1234" }, { key: "GST Rate", value: "18%" }] };
  const taxCheck = evaluateProductSeoCandidate(taxOnly, { approvals: { p1: approval(taxOnly) }, imageDigests });
  assert.equal(taxCheck.eligible, false);
  assert.ok(taxCheck.issues.includes("No useful buyer-facing product facts are recorded"));
  const wrongCategory = { ...product, subcategory: { ...product.subcategory, category: "another-category" } };
  assert.equal(evaluateProductSeoCandidate(wrongCategory, { approvals: { p1: approval(wrongCategory) }, imageDigests }).eligible, false);
});
