const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const catalog = require("../../seo/05-technical-audits/GSC_PRODUCT_GATE_CATALOG_SNAPSHOT_2026-11-13.json").rows;
const { createProductSeoGate, evaluatePublicProductSeo, loadReviewLedger } = require("../services/productSeoGate");
const { evaluateProductSeo } = require("../services/productSeoQuality");

test("disabled flag keeps the existing decision for all 234 catalog records", () => {
  const old = process.env.PRODUCT_SEO_GATE_V2_ENABLED;
  try {
    delete process.env.PRODUCT_SEO_GATE_V2_ENABLED;
    for (const product of catalog) {
      assert.equal(evaluatePublicProductSeo(product).eligible, evaluateProductSeo(product).eligible, product.slug);
    }
    assert.equal(createProductSeoGate()(catalog[0]).eligible, evaluateProductSeo(catalog[0]).eligible);
  } finally {
    if (old === undefined) delete process.env.PRODUCT_SEO_GATE_V2_ENABLED;
    else process.env.PRODUCT_SEO_GATE_V2_ENABLED = old;
  }
});

test("enabled flag requires a complete ledger and rejects simulation approvals", () => {
  const oldFlag = process.env.PRODUCT_SEO_GATE_V2_ENABLED;
  const oldPath = process.env.PRODUCT_SEO_GATE_V2_LEDGER_PATH;
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "product-seo-ledger-"));
  try {
    process.env.PRODUCT_SEO_GATE_V2_ENABLED = "true";
    delete process.env.PRODUCT_SEO_GATE_V2_LEDGER_PATH;
    assert.throws(() => evaluatePublicProductSeo(catalog[0]), /LEDGER_PATH/);
    const filename = path.join(dir, "ledger.json");
    fs.writeFileSync(filename, JSON.stringify({ version: 1 }));
    process.env.PRODUCT_SEO_GATE_V2_LEDGER_PATH = filename;
    assert.throws(() => loadReviewLedger(), /incomplete/);
    fs.writeFileSync(filename, JSON.stringify({ version: 1, approvals: { x: { reviewer: "SIMULATION ONLY" } },
      confirmedHolds: {}, holds: {}, suspectedHolds: {}, variantGroups: {},
      canonicalDecisions: {}, duplicatePeers: {}, legacyIndexedIds: [] }));
    assert.throws(() => loadReviewLedger(), /simulated/);
  } finally {
    if (oldFlag === undefined) delete process.env.PRODUCT_SEO_GATE_V2_ENABLED;
    else process.env.PRODUCT_SEO_GATE_V2_ENABLED = oldFlag;
    if (oldPath === undefined) delete process.env.PRODUCT_SEO_GATE_V2_LEDGER_PATH;
    else process.env.PRODUCT_SEO_GATE_V2_LEDGER_PATH = oldPath;
    fs.rmSync(dir, { recursive: true, force: true });
  }
});
