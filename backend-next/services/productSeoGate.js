// Gate V2 is opt-in. The default path retains the existing production decision.
const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const { evaluateProductSeo } = require("./productSeoQuality");
const { evaluateProductSeoCandidate } = require("./productSeoQualityCandidate");

const enabled = () => process.env.PRODUCT_SEO_GATE_V2_ENABLED === "true";

function createProductSeoGate({ v2Enabled = false, reviewContext = {} } = {}) {
  return (product) => v2Enabled
    ? evaluateProductSeoCandidate(product, reviewContext)
    : evaluateProductSeo(product);
}

let ledgerCache;
function loadReviewLedger() {
  const filename = process.env.PRODUCT_SEO_GATE_V2_LEDGER_PATH;
  if (!filename) throw new Error("Gate V2 requires PRODUCT_SEO_GATE_V2_LEDGER_PATH");
  const absolute = path.resolve(filename);
  const stat = fs.statSync(absolute);
  if (ledgerCache?.absolute === absolute && ledgerCache.mtimeMs === stat.mtimeMs) return ledgerCache.value;
  const value = JSON.parse(fs.readFileSync(absolute, "utf8"));
  if (value.version !== 1 || !Array.isArray(value.legacyIndexedIds) || !value.approvals || !value.confirmedHolds || !value.holds ||
      !value.suspectedHolds || !value.variantGroups || !value.canonicalDecisions || !value.duplicatePeers) {
    throw new Error("Gate V2 review ledger is incomplete");
  }
  if (Object.values(value.approvals).some((approval) =>
    !approval.reviewer || /simulation/i.test(approval.reviewer))) {
    throw new Error("Gate V2 rejects missing or simulated reviewer approvals");
  }
  if (Object.values(value.canonicalDecisions).some((decision) => decision.type === "canonicalize")) {
    throw new Error("Canonicalized variants require a separately approved metadata rollout");
  }
  ledgerCache = { absolute, mtimeMs: stat.mtimeMs, value };
  return value;
}

function digestLocalImage(product) {
  const url = product.images?.[0]?.url || "";
  if (!url.startsWith("/assets/")) return "";
  const root = path.resolve(__dirname, "../../frontend-next/public");
  const filename = path.resolve(root, url.slice(1));
  if (!filename.startsWith(root + path.sep) || !fs.existsSync(filename)) return "";
  return crypto.createHash("sha256").update(fs.readFileSync(filename)).digest("hex");
}

function evaluatePublicProductSeo(product) {
  if (!enabled()) return evaluateProductSeo(product);
  const ledger = loadReviewLedger();
  const p = typeof product.toObject === "function" ? product.toObject() : product;
  const id = String(p._id || p.id || "");
  const reviewContext = {
    ...ledger,
    protectLegacy: true,
    legacyIndexedIds: new Set(ledger.legacyIndexedIds || []),
    duplicatePeers: new Map(Object.entries(ledger.duplicatePeers)),
    imageDigests: new Map([[id, digestLocalImage(p)]]),
  };
  return evaluateProductSeoCandidate(p, reviewContext);
}

// Refuse to start an enabled rollout without its review evidence.
if (enabled()) loadReviewLedger();

module.exports = { createProductSeoGate, evaluatePublicProductSeo, loadReviewLedger, digestLocalImage, enabled };
