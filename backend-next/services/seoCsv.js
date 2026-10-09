const OPPORTUNITY_COLUMNS = [
  "Keyword", "Search Volume", "Difficulty", "Location", "Category", "Buyer Type", "Intent",
  "Existing Ranking", "Existing URL", "Proposed URL", "Page Needed", "Priority", "Status", "Notes", "Source",
];

const VALID_STATUSES = new Set(["NEW", "RESEARCH", "APPROVED", "REJECTED", "IMPLEMENTED"]);
const KEYWORD_COLUMNS = [
  "Original Keyword", "Normalized Keyword", "Category", "Topic Cluster", "Primary Keyword",
  "Secondary Keyword Group", "Search Intent", "Buyer Persona", "Country", "State", "City",
  "Source Relevance", "Evidence Type", "Existing URL", "Recommended URL", "Page Type",
  "Keyword Disposition", "Disposition Reason", "Priority", "Product Availability", "Content Readiness",
  "Cannibalization Risk", "Search Volume", "Ranking Difficulty", "Current Position", "Current Impressions",
  "Current Clicks", "Current CTR", "Target Ranking", "Implementation Status",
];

const escapeCsvCell = (value) => {
  let text = value === null || value === undefined ? "" : String(value);
  if (/^[=+\-@]/.test(text)) text = `'${text}`;
  return /[",\r\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
};

const serializeCsv = (columns, rows) => [
  columns.map(escapeCsvCell).join(","),
  ...rows.map((row) => columns.map((column) => escapeCsvCell(row[column])).join(",")),
].join("\r\n") + "\r\n";

const parseCsv = (text = "") => {
  const rows = [];
  let row = [];
  let value = "";
  let quoted = false;
  for (let index = 0; index < text.length; index += 1) {
    const character = text[index];
    if (quoted) {
      if (character === '"' && text[index + 1] === '"') { value += '"'; index += 1; }
      else if (character === '"') quoted = false;
      else value += character;
    } else if (character === '"') quoted = true;
    else if (character === ",") { row.push(value); value = ""; }
    else if (character === "\n") {
      row.push(value.replace(/\r$/, ""));
      if (row.some((cell) => cell !== "")) rows.push(row);
      row = []; value = "";
    } else value += character;
  }
  if (quoted) throw new Error("CSV contains an unclosed quoted field");
  row.push(value.replace(/\r$/, ""));
  if (row.some((cell) => cell !== "")) rows.push(row);
  if (!rows.length) return [];
  const headers = rows.shift().map((header, index) => index === 0 ? header.replace(/^\uFEFF/, "").trim() : header.trim());
  return rows.map((cells) => Object.fromEntries(headers.map((header, index) => [header, cells[index] ?? ""])));
};

const optionalNumber = (value, label, rowNumber, errors, { min = 0, max = Infinity } = {}) => {
  if (value === "" || value === null || value === undefined) return null;
  const number = Number(value);
  if (!Number.isFinite(number) || number < min || number > max) {
    errors.push(`Row ${rowNumber}: ${label} must be a number between ${min} and ${max === Infinity ? "no maximum" : max}`);
    return null;
  }
  return number;
};

const safeUrl = (value, label, rowNumber, errors) => {
  const text = String(value || "").trim();
  if (!text || /^(?:none|n\/a|unknown)$/i.test(text)) return "";
  if (text.startsWith("/") || /^https:\/\/printkee\.com(?:\/|$)/i.test(text)) return text;
  errors.push(`Row ${rowNumber}: ${label} must be a relative path or a https://printkee.com URL`);
  return text;
};

const validateOpportunityRows = (rows, normalizeKeyword) => {
  const errors = [];
  const records = [];
  const seen = new Set();
  if (rows.length > 5000) errors.push("Import is limited to 5,000 data rows");
  rows.slice(0, 5000).forEach((row, index) => {
    const rowNumber = index + 2;
    const keyword = String(row.Keyword || "").trim();
    const normalizedKeyword = normalizeKeyword(keyword);
    if (!keyword || !normalizedKeyword) errors.push(`Row ${rowNumber}: Keyword is required`);
    if (seen.has(normalizedKeyword)) errors.push(`Row ${rowNumber}: duplicate normalized keyword '${normalizedKeyword}' in this file`);
    seen.add(normalizedKeyword);
    const status = String(row.Status || "NEW").trim().toUpperCase();
    if (!VALID_STATUSES.has(status)) errors.push(`Row ${rowNumber}: invalid Status '${status}'`);
    const pageNeededValue = String(row["Page Needed"] || "false").trim().toLowerCase();
    if (!["true", "false", "yes", "no", "1", "0", ""].includes(pageNeededValue)) errors.push(`Row ${rowNumber}: Page Needed must be true or false`);
    records.push({
      keyword, normalizedKeyword,
      searchVolume: optionalNumber(row["Search Volume"], "Search Volume", rowNumber, errors),
      difficulty: optionalNumber(row.Difficulty, "Difficulty", rowNumber, errors),
      location: String(row.Location || "").trim(), category: String(row.Category || "").trim(),
      buyerType: String(row["Buyer Type"] || "").trim(), intent: String(row.Intent || "").trim(),
      existingRanking: optionalNumber(row["Existing Ranking"], "Existing Ranking", rowNumber, errors),
      existingUrl: safeUrl(row["Existing URL"], "Existing URL", rowNumber, errors),
      proposedUrl: safeUrl(row["Proposed URL"], "Proposed URL", rowNumber, errors),
      pageNeeded: ["true", "yes", "1"].includes(pageNeededValue),
      priority: optionalNumber(row.Priority === "" ? 50 : row.Priority, "Priority", rowNumber, errors, { min: 0, max: 100 }),
      status, notes: String(row.Notes || "").trim(), source: String(row.Source || "csv-import").trim() || "csv-import",
    });
  });
  return { records, errors };
};

const keywordStatus = (disposition = "", implementation = "") => {
  const value = `${disposition} ${implementation}`.toUpperCase();
  if (value.includes("REJECT")) return "REJECTED";
  if (value.includes("DEFER")) return "DEFERRED";
  if (value.includes("MERG") || value.includes("NO NEW PAGE")) return "MERGED";
  if (value.includes("APPROV")) return "APPROVED";
  if (value.includes("EXPANSION OPPORTUNITY") || value.includes("ASSIGNED TO EXISTING URL")) return "MAPPED";
  if (value.includes("MAP")) return "MAPPED";
  return "UNMAPPED";
};

const commercialRelevance = (row) => {
  const intent = String(row["Search Intent"] || "").toLowerCase();
  if (/transaction|commercial|local/.test(intent)) return "HIGH";
  if (/investigation|consideration/.test(intent)) return "MEDIUM";
  if (/informational/.test(intent)) return "LOW";
  return "UNKNOWN";
};

const validateKeywordRows = (rows, normalizeKeyword) => {
  const errors = [];
  const records = [];
  if (rows.length > 25000) errors.push("Keyword import is limited to 25,000 data rows");
  rows.slice(0, 25000).forEach((row, index) => {
    const sourceRow = index + 2;
    const originalKeyword = String(row["Original Keyword"] || row.Keyword || "").trim();
    const normalizedKeyword = normalizeKeyword(row["Normalized Keyword"] || originalKeyword);
    if (!originalKeyword || !normalizedKeyword) errors.push(`Row ${sourceRow}: Original Keyword is required`);
    const assignedCanonicalUrl = safeUrl(row["Recommended URL"], "Recommended URL", sourceRow, errors);
    const existingTargetUrl = safeUrl(row["Existing URL"], "Existing URL", sourceRow, errors);
    records.push({
      sourceKey: `keyword-csv:${sourceRow}:${normalizedKeyword}`,
      sourceRow,
      originalKeyword,
      normalizedKeyword,
      cluster: String(row["Topic Cluster"] || row.Category || "").trim(),
      intent: String(row["Search Intent"] || "").trim(),
      priority: String(row.Priority || "P3").trim() || "P3",
      geography: {
        country: String(row.Country || "").trim(), state: String(row.State || "").trim(), city: String(row.City || "").trim(),
      },
      commercialRelevance: commercialRelevance(row),
      existingTargetUrl,
      assignedCanonicalUrl,
      status: keywordStatus(row["Keyword Disposition"], row["Implementation Status"]),
      dispositionReason: String(row["Disposition Reason"] || "").trim(),
      source: "keyword-master-csv",
      sourceMetadata: Object.fromEntries(Object.entries(row).filter(([key]) => !["Original Keyword", "Normalized Keyword"].includes(key))),
    });
  });
  return { records, errors };
};

module.exports = { KEYWORD_COLUMNS, OPPORTUNITY_COLUMNS, parseCsv, serializeCsv, validateKeywordRows, validateOpportunityRows };
