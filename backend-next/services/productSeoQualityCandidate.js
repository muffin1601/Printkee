// Feature-flagged Gate V2. The default public path still uses productSeoQuality.js.
// A shorter description can pass only with content-specific editorial approval.
const crypto = require("node:crypto");
const { textOnly, evaluateProductSeo } = require("./productSeoQuality");

const normalize = (value) => textOnly(value).toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
const meaningful = (value) => normalize(value) && !/^(standard|one size|multi color|premium materials|n a|na|other)$/.test(normalize(value));
const TAX_SPEC = /^(hsn code|gst rate|tax|gst)$/i;
const PLACEHOLDER = /^(coming soon|tbd|description pending|product description|premium product|best quality|na|n a)$/i;
const PUBLIC_SUBCATEGORY_SLUGS = { "steel mug": "steel-mug" };
const PUBLIC_PRODUCT_SLUGS = { "double wall insulated mug": "double-wall-insulated-mug" };

function expectedCanonical(product) {
  const category = product.category?.slug;
  const subcategory = product.subcategory?.slug;
  const slug = product.slug?.trim();
  if (!category || !subcategory || !slug) return "";
  return `https://printkee.com/${category}/${PUBLIC_SUBCATEGORY_SLUGS[subcategory] || subcategory}/${encodeURIComponent(PUBLIC_PRODUCT_SLUGS[slug] || slug)}`;
}

function usefulFacts(product) {
  const a = product.attributes || {};
  const facts = [];
  for (const key of ["material", "dimensions", "weight", "gsm", "capacity", "packaging", "customization", "careInstructions"]) {
    if (meaningful(a[key])) facts.push({ key: `attributes.${key}`, value: String(a[key]) });
  }
  for (const key of ["size", "color", "printingMethods", "brandingAreas"]) {
    for (const value of a[key] || []) if (meaningful(value)) facts.push({ key: `attributes.${key}`, value: String(value) });
  }
  for (const spec of product.specifications || []) {
    if (!TAX_SPEC.test(String(spec.key || "").trim()) && meaningful(spec.value)) {
      facts.push({ key: `specifications.${spec.key}`, value: String(spec.value) });
    }
  }
  for (const item of product.additionalInfo || []) {
    if (!TAX_SPEC.test(String(item.label || "").trim()) && meaningful(item.value)) {
      facts.push({ key: `additionalInfo.${item.label}`, value: String(item.value) });
    }
  }
  return facts;
}

function statedFactCount(product) {
  const content = normalize(`${product.description?.short || ""} ${product.description?.long || ""}`);
  const contentTokens = new Set(content.split(" ").filter(Boolean));
  return usefulFacts(product).filter(({ value }) => {
    const tokens = normalize(value).split(" ").filter((token) => token.length > 2 || /\d/.test(token));
    return tokens.length && tokens.every((token) => contentTokens.has(token));
  }).length;
}

function contentFingerprint(product) {
  const p = typeof product.toObject === "function" ? product.toObject() : product;
  const fields = {
    id: String(p._id || p.id || ""), name: p.name, slug: p.slug,
    categoryId: String(p.category?._id || p.category || ""),
    subcategoryId: String(p.subcategory?._id || p.subcategory || ""),
    description: p.description, attributes: p.attributes, features: p.features,
    idealFor: p.idealFor, specifications: p.specifications,
    additionalInfo: p.additionalInfo, seo: p.seo,
    canonicalUrl: p.canonicalUrl, images: p.images,
  };
  return crypto.createHash("sha256").update(JSON.stringify(fields)).digest("hex");
}

function evaluateProductSeoCandidate(productInput = {}, context = {}) {
  const p = typeof productInput.toObject === "function" ? productInput.toObject() : productInput;
  const issues = [], warnings = [];
  const long = textOnly(p.description?.long);
  const combined = textOnly(`${p.description?.short || ""} ${p.description?.long || ""}`);
  const canonical = expectedCanonical(p);
  const primary = p.images?.[0];
  const id = String(p._id || p.id || "");
  const protectedLegacy = context.protectLegacy === true && context.legacyIndexedIds?.has(id) && evaluateProductSeo(p).eligible;
  const reviewIssue = (message) => (protectedLegacy ? warnings : issues).push(message);
  if (p.isActive !== true) issues.push("Product is not active");
  if (p.status !== "published") issues.push("Product is not published");
  if (p.deletedAt) issues.push("Product is deleted or archived");
  if (!normalize(p.name) || !normalize(p.slug)) issues.push("Product identity is missing");
  if (!p.category?.slug || p.category.isActive === false) issues.push("Active category is required");
  if (!p.subcategory?.slug || p.subcategory.isActive === false) issues.push("Active subcategory is required");
  if (p.category?._id && p.subcategory?.category && String(p.category._id) !== String(p.subcategory.category)) {
    issues.push("Subcategory does not belong to product category");
  }
  if (p.seo?.indexable === false) issues.push("Product is explicitly marked noindex");
  if (p.canonicalUrl && p.canonicalUrl !== canonical) issues.push("Stored canonical disagrees with public route");
  if (!primary?.url) issues.push("Primary product image is missing");
  if (!normalize(primary?.altText)) reviewIssue("Primary image alt text is missing");
  if (context.brokenImageIds?.has(id)) issues.push("Primary image failed retrieval");
  if (!long || PLACEHOLDER.test(normalize(long)) || normalize(long) === normalize(p.name)) {
    reviewIssue("Meaningful visible product description is missing");
  }
  if (!normalize(p.seo?.metaTitle)) reviewIssue("Product-specific SEO title is missing");
  if (!normalize(p.seo?.metaDescription)) reviewIssue("Product-specific meta description is missing");
  if (!usefulFacts(p).length) reviewIssue("No useful buyer-facing product facts are recorded");
  if (!statedFactCount(p)) reviewIssue("Description does not state a recorded product fact");
  if (context.confirmedHolds?.[id]) issues.push("Confirmed product-data contradiction");
  if (context.holds?.[id] || context.holds?.[p.slug] || context.suspectedHolds?.[id]) {
    reviewIssue("Unresolved product identity or image review hold");
  }
  const duplicate = Boolean(context.duplicatePeers?.get(id)?.length);
  const variant = Boolean(context.variantGroups?.[id]);
  const decision = context.canonicalDecisions?.[id];
  if (duplicate || variant) {
    if (!decision) reviewIssue(duplicate ? "Near-duplicate product page needs a canonical decision" : "Product variant group needs a canonical decision");
    else if (decision.type === "canonicalize") reviewIssue("Product is designated as a canonicalized variant, not a self-canonical index page");
    else if (decision.type !== "self" || decision.canonical !== canonical || decision.distinctivenessApproved !== true) {
      reviewIssue("Self-canonical variant needs an approved distinctiveness decision");
    }
  }
  const approval = context.approvals?.[id];
  const approvalValid = approval && approval.fingerprint === contentFingerprint(p) &&
    approval.canonical === canonical && approval.primaryImageUrl === primary?.url &&
    approval.identityVerified === true && approval.imageVerified === true &&
    approval.contentUseful === true && approval.duplicateReviewed === true &&
    approval.reviewer && approval.reviewedAt && approval.imageDigest &&
    approval.imageDigest === context.imageDigests?.get(id);
  if (!approvalValid) {
    reviewIssue("Current product content, image, and canonical have not been approved");
  }
  const wordCount = combined.split(/\s+/).filter(Boolean).length;
  if (wordCount < 80) warnings.push("Combined description is under the former 80-word review threshold");
  if (long.split(/\s+/).filter(Boolean).length < 40) warnings.push("Visible description is under the former 40-word review threshold");
  if (String(p.seo?.metaDescription || "").length < 70) warnings.push("Meta description is brief; review the snippet");
  return { eligible: issues.length === 0, issues, warnings, expectedCanonical: canonical,
    canonicalTarget: decision?.type === "canonicalize" ? decision.canonical : canonical,
    usefulFactCount: usefulFacts(p).length, statedFactCount: statedFactCount(p), wordCount,
    fingerprint: contentFingerprint(p) };
}

module.exports = { evaluateProductSeoCandidate, contentFingerprint, expectedCanonical, usefulFacts, statedFactCount };
