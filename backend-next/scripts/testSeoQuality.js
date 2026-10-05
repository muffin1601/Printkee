const assert = require("node:assert/strict");
const { normalizeKeyword, normalizePath, similarity } = require("../services/seoQuality");

assert.equal(normalizePath("https://printkee.com/Corporate-Gifts/Noida/"), "/corporate-gifts/noida");
assert.equal(normalizeKeyword(" Corporate Gifts in Noida! "), "corporate gifts in noida");
assert.ok(similarity("corporate gifts for employees", "corporate gifts for employees") === 1);
assert.ok(similarity("custom t shirts for colleges", "corporate gifting for clients") < 0.5);
console.log("SEO quality utility checks passed");
