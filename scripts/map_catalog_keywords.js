const fs = require("node:fs");
const path = require("node:path");
const { parseCsv, serializeCsv, validateKeywordRows } = require("../backend-next/services/seoCsv");
const { normalizeKeyword } = require("../backend-next/services/seoQuality");

const root = path.resolve(__dirname, "..");
const keywordDir = path.join(root, "seo/03-keywords-and-search-data");
const sourcePath = path.join(keywordDir, "PRINTKEE_COMPLETE_KEYWORD_MASTER_TSHIRT_MAPPED.csv");
const masterPath = path.join(keywordDir, "PRINTKEE_COMPLETE_KEYWORD_MASTER_CATALOG_MAPPED.csv");
const importPath = path.join(keywordDir, "PRINTKEE_KEYWORD_IMPORT_CATALOG_MAPPED.csv");
const reportPath = path.join(keywordDir, "PRINTKEE_CATALOG_KEYWORD_MAP.csv");
const rows = parseCsv(fs.readFileSync(sourcePath, "utf8"));
const columns = Object.keys(rows[0] || {});

const families = [
  { slug: "welcome-kits", match: /\b(?:welcome|joining|onboarding|employee|corporate gifting|swag) kits?\b/ },
  { slug: "notebooks-diaries", match: /\b(?:notebooks?|diar(?:y|ies)|notepad(?:s)?)\b/ },
  { slug: "office-stationery", match: /\b(?:office stationery|business stationery|files? (?:and|&) folders?|file folders?|document files?|lanyards?|id cards?)\b/ },
  { slug: "tech-gifts", match: /\b(?:technology gifts?|tech gifts?|power banks?|wireless charg(?:er|ers|ing)|computer accessories|mouse ?pads?|desktop accessories)\b/ },
  { slug: "eco-friendly-gifts", match: /\b(?:eco[ -]?friendly gifts?|sustainable gifts?|cork (?:gifts?|gift boxes?|corporate|desk|laptop|wallet))\b/ },
  { slug: "awards-trophies", match: /\b(?:awards?|troph(?:y|ies)|mementos?|momentos?|medals?)\b/ },
  { slug: "winter-wear", match: /\b(?:winter wear|jackets?|hoodies?|sweatshirts?|sweaters?|rain suits?)\b/ },
  { slug: "keychains", match: /\b(?:keychains?|key rings?)\b/ },
  { slug: "bottles", match: /\b(?:water bottles?|sipper bottles?|sippers?|bamboo bottles?|sports bottles?)\b/ },
  { slug: "mugs", match: /\b(?:(?:coffee|ceramic|steel|photo|corporate|custom|printed|promotional|travel) mugs?|mug printing)\b/ },
  { slug: "caps", match: /\b(?:caps?|baseball caps?|promotional hats?|bucket hats?)\b/ },
  { slug: "pens", match: /\b(?:pens?|writing sets?|pen sets?)\b/ },
  { slug: "shirts", match: /\b(?:corporate shirts?|formal shirts?|office shirts?|uniform shirts?|corporate uniforms?)\b/ },
  { slug: "bags", match: /\b(?:backpacks?|tote bags?|duffle bags?|foldable bags?|laptop bags?|travel bags?|carry bags?)\b/ },
];

const supportedIntents = {
  bags: ["corporate", "promotional", "personalized", "bulk", "logo"],
  bottles: ["corporate", "promotional", "personalized", "bulk", "logo"],
  shirts: ["corporate", "promotional", "personalized", "bulk", "logo"],
  "welcome-kits": ["corporate", "personalized", "bulk", "logo"],
  mugs: ["corporate", "promotional", "personalized", "bulk", "logo"],
  caps: ["promotional", "personalized", "bulk", "logo"],
  "notebooks-diaries": ["corporate", "personalized", "bulk", "logo"],
  pens: ["corporate", "promotional", "bulk", "logo"],
  keychains: ["corporate", "promotional", "personalized", "bulk", "logo"],
  "tech-gifts": ["corporate", "promotional", "bulk", "logo"],
  "eco-friendly-gifts": ["corporate", "promotional", "bulk"],
  "awards-trophies": ["corporate", "personalized", "bulk"],
  "winter-wear": ["corporate", "promotional", "personalized", "bulk", "logo"],
  "office-stationery": ["corporate", "promotional", "bulk", "logo"],
};

const blockedLocal = /\b(?:near me|delhi|new delhi|noida|greater noida|gurgaon|gurugram|faridabad|ghaziabad|usa|united states|uk|united kingdom|canada|australia|uae|dubai|singapore|saudi arabia|qatar|germany)\b/;
const unsupported = /\b(?:paper bags?|poly bags?|courier bags?|packaging bags?|garbage bags?|tea bags?)\b/;
const intentFor = (keyword, supported) => {
  const checks = [
    ["personalized", /personali[sz]|custom name|photo|recipient name/],
    ["corporate", /corporate|company|employee|staff|office|business/],
    ["promotional", /promotional|promotion|campaign|event|marketing|giveaway/],
    ["bulk", /\bbulk\b|wholesale|large[- ]quantity|large order/],
    ["logo", /logo|branded|print(?:ed|ing)?|embroider/],
  ];
  return checks.find(([key, regex]) => supported.includes(key) && regex.test(keyword))?.[0] || "";
};
const mappedPath = (family, intent) => intent ? `/${family}/${intent === "logo" ? "logo-printed" : intent}-${family}` : `/${family}`;

const mapped = [];
for (const row of rows) {
  const keyword = String(row["Original Keyword"] || "").toLowerCase();
  if (!keyword || /t[ -]?shirts?/.test(keyword) || blockedLocal.test(keyword) || unsupported.test(keyword)) continue;
  const family = families.find((item) => item.match.test(keyword));
  if (!family) continue;
  const intent = intentFor(keyword, supportedIntents[family.slug]);
  const destination = mappedPath(family.slug, intent);
  const previous = String(row["Recommended URL"] || "");
  if (previous === destination) continue;
  row["Recommended URL"] = destination;
  row["Page Type"] = intent ? "CURATED PRODUCT INTENT" : "PRODUCT FAMILY HUB";
  row["Implementation Status"] = "MAPPED - CURATED CATALOG PAGE";
  mapped.push({
    "Original Keyword": row["Original Keyword"],
    "Normalized Keyword": row["Normalized Keyword"],
    "Previous URL": previous,
    "Mapped URL": destination,
    "Family": family.slug,
    "Intent": intent || "custom",
    "Keyword Disposition": row["Keyword Disposition"],
    "Disposition Reason": row["Disposition Reason"],
  });
}

const importColumns = [
  "Original Keyword", "Normalized Keyword", "Category", "Topic Cluster", "Search Intent", "Country", "State", "City",
  "Existing URL", "Recommended URL", "Keyword Disposition", "Disposition Reason", "Priority", "Implementation Status",
];
const reportColumns = ["Original Keyword", "Normalized Keyword", "Previous URL", "Mapped URL", "Family", "Intent", "Keyword Disposition", "Disposition Reason"];
fs.writeFileSync(masterPath, `\uFEFF${serializeCsv(columns, rows)}`);
fs.writeFileSync(importPath, `\uFEFF${serializeCsv(importColumns, rows.map((row) => Object.fromEntries(importColumns.map((column) => [column, row[column] || ""]))))}`);
fs.writeFileSync(reportPath, `\uFEFF${serializeCsv(reportColumns, mapped)}`);

const validation = validateKeywordRows(parseCsv(fs.readFileSync(importPath, "utf8")), normalizeKeyword);
if (validation.errors.length) throw new Error(`Mapped import failed validation with ${validation.errors.length} errors`);
console.log(JSON.stringify({
  totalRows: rows.length,
  mappedRows: mapped.length,
  validationErrors: validation.errors.length,
  importBytes: fs.statSync(importPath).size,
  familyCounts: mapped.reduce((result, row) => ({ ...result, [row.Family]: (result[row.Family] || 0) + 1 }), {}),
  targetCounts: mapped.reduce((result, row) => ({ ...result, [row["Mapped URL"]]: (result[row["Mapped URL"]] || 0) + 1 }), {}),
}, null, 2));
