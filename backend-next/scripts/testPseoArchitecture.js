const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const categoryData = require("../data/categoryData");
const { generateCandidateInventory, makeCandidate } = require("../services/seoCandidateGenerator");
const { parseCsv, validateKeywordRows } = require("../services/seoCsv");
const { normalizeKeyword } = require("../services/seoQuality");

const started = Date.now();
const inventory = generateCandidateInventory(categoryData);
assert.equal(inventory.metrics.generated, 14638);
assert.equal(inventory.metrics.unique, 14638);
assert.equal(inventory.metrics.exactDuplicates, 0);
assert.equal(new Set(inventory.candidates.map((item) => item.proposedPath)).size, inventory.candidates.length);
assert.ok(inventory.candidates.length >= 14000 && inventory.candidates.length <= 20000);
assert.ok(inventory.candidates.every((item) => item.status === "PUBLISHED" || (!item.indexable && !item.sitemapIncluded)));
assert.ok(inventory.candidates.filter((item) => ["REJECTED", "CANONICALIZED"].includes(item.status)).every((item) => !item.indexable));
assert.ok(inventory.candidates.filter((item) => item.status === "CANONICALIZED").every((item) => item.canonicalPath && item.canonicalPath !== item.proposedPath));

const stressLocations = Array.from({ length: 30 }, (_, index) => ({ name: `Test Area ${index + 1}`, slug: `test-area-${index + 1}`, level: "CITY", verified: false }));
const stress = generateCandidateInventory(categoryData, { locations: stressLocations, capacity: 20000 });
assert.equal(stress.metrics.generated, 19790);
assert.equal(stress.metrics.exactDuplicates, 0);
assert.throws(() => generateCandidateInventory(categoryData, { locations: [...stressLocations, { name: "Overflow", slug: "overflow", level: "CITY", verified: false }], capacity: 20000 }), /exceeding capacity/);

const lifecycle = makeCandidate({
  entity: { type: "CATEGORY", name: "Corporate Gifts", slug: "corporate-gifts", categorySlug: "corporate-gifts" },
  location: { name: "Delhi", slug: "delhi", level: "CITY", verified: true },
});
assert.equal(lifecycle.status, "PUBLISHED");
assert.equal(lifecycle.canonicalPath, lifecycle.proposedPath);
assert.equal(lifecycle.indexable, true);
assert.equal(lifecycle.sitemapIncluded, true);

const root = path.resolve(__dirname, "../..");
const keywordRows = parseCsv(fs.readFileSync(path.join(root, "PRINTKEE_COMPLETE_KEYWORD_MASTER.csv"), "utf8"));
const keywordValidation = validateKeywordRows(keywordRows, normalizeKeyword);
assert.equal(keywordRows.length, 2796);
assert.equal(keywordValidation.records.length, 2796);
assert.deepEqual(keywordValidation.errors, []);
assert.equal(new Set(keywordValidation.records.map((item) => item.sourceKey)).size, 2796);

const routeSource = fs.readFileSync(path.join(root, "backend-next/routes/seoPageRoutes.js"), "utf8");
for (const route of ["/admin/keywords/import", "/admin/candidates", "/admin/candidates/generate", "/admin/candidates/bulk", "/admin/audit-events"]) {
  assert.ok(routeSource.includes(route), `Missing admin route ${route}`);
}
assert.ok((routeSource.match(/verifyToken/g) || []).length >= 15, "Admin routes must retain authorization middleware");

const sitemapIndex = fs.readFileSync(path.join(root, "frontend-next/app/sitemap-index.xml/route.js"), "utf8");
const sitemapPartition = fs.readFileSync(path.join(root, "frontend-next/app/sitemaps/[segment]/route.js"), "utf8");
assert.ok(sitemapIndex.includes("sitemapindex"));
assert.ok(sitemapPartition.includes("uniqueSitemapEntries"));
assert.ok(sitemapPartition.includes("status: 404"));

console.log(JSON.stringify({
  candidates: inventory.metrics,
  statusCounts: inventory.candidates.reduce((result, item) => ({ ...result, [item.status]: (result[item.status] || 0) + 1 }), {}),
  keywordRows: keywordValidation.records.length,
  stressCandidates: stress.metrics.unique,
  elapsedMs: Date.now() - started,
}));
