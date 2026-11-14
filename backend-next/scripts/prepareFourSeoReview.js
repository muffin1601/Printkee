// Review packet only. Reads the saved DB snapshot and local image bytes; no writes to MongoDB.
const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const source = require("../../seo/05-technical-audits/GSC_PRODUCT_GATE_CATALOG_SNAPSHOT_2026-11-13.json");
const copy = require("./productSeoShortlistCopy");
const { evaluateProductSeoCandidate, contentFingerprint, expectedCanonical } = require("../services/productSeoQualityCandidate");
const { evaluateProductSeo } = require("../services/productSeoQuality");
const slugs = ["yoga-mat-cork-fabric-eva", "fully-rubberized-3mm-yoga-mat",
  "cork-rubberized-yoga-mat-latex", "double-wall-insulated-sipper-bottle"];
const imageNotes = {
  "yoga-mat-cork-fabric-eva": "Photo shows a flat cork-look mat, plant and bottle. EVA backing and dimensions cannot be established visually; admin must confirm this image belongs to the EVA SKU.",
  "fully-rubberized-3mm-yoga-mat": "Photo shows a folded cork-look mat. Rubber construction and 3 mm thickness cannot be established visually; admin must confirm this image belongs to this SKU.",
  "cork-rubberized-yoga-mat-latex": "Photo shows a rolled cork-look mat with dark underside. Latex composition cannot be established visually; admin must confirm the material and SKU.",
  "double-wall-insulated-sipper-bottle": "Photo shows a black bottle with a drinking top and existing logo. Material, 600 ml capacity, double-wall construction and branding permissions cannot be established visually; admin must confirm the exact SKU and image rights.",
};
const rows = slugs.map((slug) => {
  const p = source.rows.find((item) => item.slug === slug);
  if (!p || !copy[slug]) throw new Error(`Missing ${slug}`);
  const draft = { ...p, description: { short: copy[slug].short, long: copy[slug].long },
    seo: { ...p.seo, metaTitle: copy[slug].title, metaDescription: copy[slug].meta },
    images: p.images.map((item, index) => ({ ...item, altText: index === 0 ? copy[slug].alt : item.altText })) };
  const imageFile = path.resolve(__dirname, "../../frontend-next/public", p.images[0].url.slice(1));
  const digest = crypto.createHash("sha256").update(fs.readFileSync(imageFile)).digest("hex");
  const review = { fingerprint: contentFingerprint(draft), canonical: expectedCanonical(draft),
    primaryImageUrl: draft.images[0].url, imageDigest: digest, identityVerified: true,
    imageVerified: true, contentUseful: true, duplicateReviewed: true,
    reviewer: "SIMULATION ONLY", reviewedAt: "2026-11-13T00:00:00.000Z" };
  const result = evaluateProductSeoCandidate(draft, { approvals: { [p.id]: review },
    imageDigests: new Map([[p.id, digest]]) });
  return { id: p.id, slug, url: expectedCanonical(p), status: "AWAITING_ADMIN_REVIEW",
    sourceUpdatedAt: p.updatedAt, sourceName: p.name, sku: p.sku,
    verifiedDatabaseFields: { category: p.category.name, subcategory: p.subcategory.name,
      attributes: p.attributes, specifications: p.specifications.filter((s) => !/^(hsn code|gst rate)$/i.test(s.key)) },
    current: { description: p.description, seo: p.seo, primaryImage: p.images[0] },
    proposed: { description: draft.description, seo: { metaTitle: copy[slug].title, metaDescription: copy[slug].meta },
      primaryImageAlt: copy[slug].alt, imageUrl: p.images[0].url },
    imageSha256: digest, visualReview: imageNotes[slug],
    databaseFactsDoNotProveSupplierAccuracy: true,
    currentGateEligible: evaluateProductSeo(p).eligible,
    v2SimulationOnly: { eligible: result.eligible, issues: result.issues, warnings: result.warnings,
      contentFingerprint: result.fingerprint },
  };
});
const output = path.resolve(__dirname, "../../seo/05-technical-audits/GSC_FOUR_PRODUCT_PUBLICATION_REVIEW_2026-11-13.json");
fs.writeFileSync(output, JSON.stringify({ status: "REVIEW_ONLY_NO_APPROVALS", products: rows }, null, 2));
console.log(JSON.stringify({ products: rows.length, v2SimulationPass: rows.filter((r) => r.v2SimulationOnly.eligible).length }));
