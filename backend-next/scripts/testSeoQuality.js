const assert = require("node:assert/strict");
const { normalizeKeyword, normalizePath, similarity } = require("../services/seoQuality");
const { parseCsv, serializeCsv, validateOpportunityRows, OPPORTUNITY_COLUMNS } = require("../services/seoCsv");

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
console.log("SEO quality utility checks passed");
