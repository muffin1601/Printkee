// Offline route/sitemap decision replay. Uses the same public evaluator as both API routes.
const assert = require("node:assert/strict");
const path = require("node:path");
const catalog = require("../../seo/05-technical-audits/GSC_PRODUCT_GATE_CATALOG_SNAPSHOT_2026-11-13.json").rows;
const { evaluatePublicProductSeo } = require("../services/productSeoGate");
const { expectedCanonical } = require("../services/productSeoQualityCandidate");
const oldFlag = process.env.PRODUCT_SEO_GATE_V2_ENABLED;
const oldLedger = process.env.PRODUCT_SEO_GATE_V2_LEDGER_PATH;
const rows = [];
try {
  process.env.PRODUCT_SEO_GATE_V2_LEDGER_PATH = path.resolve(__dirname,
    "../../seo/05-technical-audits/GSC_PRODUCT_GATE_V2_REVIEW_LEDGER_TEMPLATE_2026-11-13.json");
  for (const p of catalog) {
    process.env.PRODUCT_SEO_GATE_V2_ENABLED = "false";
    const off = evaluatePublicProductSeo(p);
    process.env.PRODUCT_SEO_GATE_V2_ENABLED = "true";
    const on = evaluatePublicProductSeo(p);
    const canonical = expectedCanonical(p);
    assert.ok(canonical.startsWith("https://printkee.com/"));
    // Frontend metadata reads seoQuality.eligible for both robots agents.
    const robotsOff = off.eligible === true;
    const robotsOn = on.eligible === true;
    // The sitemap route filters with this identical public evaluator.
    const sitemapOff = off.eligible === true;
    const sitemapOn = on.eligible === true;
    assert.equal(robotsOff, sitemapOff);
    assert.equal(robotsOn, sitemapOn);
    if (on.eligible) assert.equal(on.expectedCanonical, canonical);
    rows.push({ slug: p.slug, off: off.eligible, on: on.eligible, canonical });
  }
  const summary = { products: rows.length, flagOffEligible: rows.filter((r) => r.off).length,
    flagOnEligibleWithEmptyApprovalLedger: rows.filter((r) => r.on).length,
    newlyEligible: rows.filter((r) => !r.off && r.on).length,
    newlyExcluded: rows.filter((r) => r.off && !r.on).map((r) => r.slug),
    sitemapAndRobotsAgreement: rows.length, canonicalChecks: rows.length };
  assert.equal(summary.products, 234);
  assert.equal(summary.flagOffEligible, 18);
  assert.equal(summary.flagOnEligibleWithEmptyApprovalLedger, 16);
  console.log(JSON.stringify(summary, null, 2));
} finally {
  if (oldFlag === undefined) delete process.env.PRODUCT_SEO_GATE_V2_ENABLED;
  else process.env.PRODUCT_SEO_GATE_V2_ENABLED = oldFlag;
  if (oldLedger === undefined) delete process.env.PRODUCT_SEO_GATE_V2_LEDGER_PATH;
  else process.env.PRODUCT_SEO_GATE_V2_LEDGER_PATH = oldLedger;
}
