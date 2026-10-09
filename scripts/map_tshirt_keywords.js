const fs = require("node:fs");
const path = require("node:path");
const { parseCsv, serializeCsv } = require("../backend-next/services/seoCsv");

const root = path.resolve(__dirname, "..");
const keywordDir = path.join(root, "seo/03-keywords-and-search-data");
const masterPath = path.join(keywordDir, "PRINTKEE_COMPLETE_KEYWORD_MASTER.csv");
const mappedMasterPath = path.join(keywordDir, "PRINTKEE_COMPLETE_KEYWORD_MASTER_TSHIRT_MAPPED.csv");
const reportPath = path.join(keywordDir, "PRINTKEE_TSHIRT_KEYWORD_MAP.csv");
const text = fs.readFileSync(masterPath, "utf8");
const rows = parseCsv(text);
const columns = Object.keys(rows[0] || {});

const classify = (keyword) => {
  const value = String(keyword || "").toLowerCase();
  if (!/t[ -]?shirts?/.test(value) || /polo|hoodie|sweatshirt|winter/.test(value)) return "";
  if (/corporate|company|employee|staff|uniform|office|workwear|team wear/.test(value)) return "/t-shirts/corporate-t-shirts";
  if (/promotional|promotion|campaign|event|giveaway|marketing/.test(value)) return "/t-shirts/promotional-t-shirts";
  if (/personali[sz]ed|personali[sz]ation|custom name|name printed|photo t/.test(value)) return "/t-shirts/personalized-t-shirts";
  if (/\bbulk\b|large[- ]quantity|large order/.test(value)) return "/t-shirts/bulk-t-shirt-printing";
  if (/logo|print(?:ed|ing)?|screen print|dtf|embroider/.test(value)) return "/t-shirts/logo-printed-t-shirts";
  if (/custom|customi[sz]ed|branded|online/.test(value)) return "/t-shirts";
  return "";
};

const mapped = [];
for (const row of rows) {
  const oldUrl = String(row["Recommended URL"] || "");
  if (oldUrl !== "/apparel-and-accessories/round-neck-t-shirts") continue;
  const mappedUrl = classify(row["Original Keyword"]);
  if (!mappedUrl) continue;
  row["Recommended URL"] = mappedUrl;
  row["Page Type"] = mappedUrl === "/t-shirts" ? "TSHIRT_HUB" : "CURATED_TSHIRT_LANDING";
  row["Implementation Status"] = "MAPPED - CURATED T-SHIRT PAGE";
  mapped.push({
    "Original Keyword": row["Original Keyword"],
    "Normalized Keyword": row["Normalized Keyword"],
    "Previous URL": oldUrl,
    "Mapped URL": mappedUrl,
    "Keyword Disposition": row["Keyword Disposition"],
    "Disposition Reason": row["Disposition Reason"],
  });
}

fs.writeFileSync(mappedMasterPath, `\uFEFF${serializeCsv(columns, rows)}`);
const reportColumns = ["Original Keyword", "Normalized Keyword", "Previous URL", "Mapped URL", "Keyword Disposition", "Disposition Reason"];
fs.writeFileSync(reportPath, `\uFEFF${serializeCsv(reportColumns, mapped)}`);
console.log(JSON.stringify({ totalRows: rows.length, tshirtKeywordsRemapped: mapped.length, targets: mapped.reduce((result, row) => ({ ...result, [row["Mapped URL"]]: (result[row["Mapped URL"]] || 0) + 1 }), {}) }));
