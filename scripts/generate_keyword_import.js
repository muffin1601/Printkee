const fs = require("node:fs");
const path = require("node:path");
const { parseCsv, serializeCsv } = require("../backend-next/services/seoCsv");

const root = path.resolve(__dirname, "..");
const keywordDir = path.join(root, "seo/03-keywords-and-search-data");
const input = path.join(keywordDir, "PRINTKEE_COMPLETE_KEYWORD_MASTER_CATALOG_MAPPED.csv");
const output = path.join(keywordDir, "PRINTKEE_KEYWORD_IMPORT_CATALOG_MAPPED.csv");
const columns = [
  "Original Keyword", "Normalized Keyword", "Category", "Topic Cluster", "Search Intent",
  "Country", "State", "City", "Existing URL", "Recommended URL", "Keyword Disposition",
  "Disposition Reason", "Priority", "Implementation Status",
];

const sourceRows = parseCsv(fs.readFileSync(input, "utf8"));
if (!sourceRows.length) throw new Error("Keyword master has no rows");
const rows = sourceRows.map((row) => Object.fromEntries(columns.map((column) => [column, row[column] || ""])));
fs.writeFileSync(output, `\uFEFF${serializeCsv(columns, rows)}`);
console.log(JSON.stringify({ inputRows: sourceRows.length, outputRows: rows.length, outputBytes: fs.statSync(output).size }));
