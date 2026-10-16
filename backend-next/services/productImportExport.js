const ExcelJS = require("exceljs");
const { escapeCsvCell, stringList } = require("./productPayload");

const IMPORT_FIELDS = [
  "_id", "sku", "name", "slug", "category", "subcategory", "description.short",
  "description.long", "price", "salePrice", "stock", "attributes.moq", "images",
  "tags", "seo.metaTitle", "seo.metaDescription", "seo.keywords", "seo.indexable",
  "canonicalUrl", "status",
];

function parseCsv(buffer) {
  const text = buffer.toString("utf8").replace(/^\uFEFF/, "");
  const rows = [];
  let row = [], cell = "", quoted = false;
  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    if (quoted) {
      if (char === '"' && text[i + 1] === '"') { cell += '"'; i += 1; }
      else if (char === '"') quoted = false;
      else cell += char;
    } else if (char === '"') quoted = true;
    else if (char === ",") { row.push(cell); cell = ""; }
    else if (char === "\n") { row.push(cell.replace(/\r$/, "")); rows.push(row); row = []; cell = ""; }
    else cell += char;
  }
  if (cell.length || row.length) { row.push(cell.replace(/\r$/, "")); rows.push(row); }
  if (quoted) throw new Error("Malformed CSV: unterminated quoted value");
  return rows;
}

async function rowsFromUpload(file) {
  const ext = file.originalname.toLowerCase().split(".").pop();
  let matrix;
  if (ext === "csv") matrix = parseCsv(file.buffer);
  else {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(file.buffer);
    const sheet = workbook.worksheets[0];
    if (!sheet) throw new Error("The workbook has no worksheets");
    matrix = [];
    sheet.eachRow({ includeEmpty: false }, (row) => {
      matrix.push(row.values.slice(1).map((value) => {
        if (value && typeof value === "object" && "text" in value) return value.text;
        if (value && typeof value === "object" && "result" in value) return value.result;
        return value ?? "";
      }));
    });
  }
  if (matrix.length < 2) return [];
  const headers = matrix[0].map((value) => String(value).trim());
  return matrix.slice(1).filter((values) => values.some((value) => String(value).trim())).map((values, index) => {
    const item = { __row: index + 2 };
    headers.forEach((header, column) => { if (header) item[header] = values[column] ?? ""; });
    return item;
  });
}

function setPath(target, path, value) {
  const parts = path.split(".");
  let cursor = target;
  parts.forEach((part, index) => {
    if (index === parts.length - 1) cursor[part] = value;
    else cursor = cursor[part] ||= {};
  });
}

function mapImportRow(row, mapping = {}) {
  const product = {};
  for (const [source, rawTarget] of Object.entries(mapping).length ? Object.entries(mapping) : Object.keys(row).map((key) => [key, key])) {
    const target = rawTarget && String(rawTarget).trim();
    if (!target || !IMPORT_FIELDS.includes(target) || row[source] === "") continue;
    let value = row[source];
    if (["tags", "seo.keywords"].includes(target)) value = stringList(value);
    if (["price", "salePrice", "stock"].includes(target)) value = Number(value);
    if (["images"].includes(target)) {
      value = stringList(value).map((url) => ({ url, altText: "" }));
    }
    if (target === "seo.indexable") value = ["true", "1", "yes"].includes(String(value).toLowerCase());
    setPath(product, target, value);
  }
  return { row: row.__row, product };
}

function productsToCsv(products) {
  const header = IMPORT_FIELDS;
  const lines = [header.map(escapeCsvCell).join(",")];
  for (const product of products) {
    const values = [
      product._id, product.sku, product.name, product.slug, product.category?._id || product.category,
      product.subcategory?._id || product.subcategory, product.description?.short, product.description?.long,
      product.price, product.salePrice, product.stock, product.attributes?.moq,
      (product.images || []).map((image) => image.url).join(","), (product.tags || []).join(","),
      product.seo?.metaTitle, product.seo?.metaDescription, (product.seo?.keywords || []).join(","),
      product.seo?.indexable, product.canonicalUrl, product.status,
    ];
    lines.push(values.map(escapeCsvCell).join(","));
  }
  return lines.join("\r\n");
}

async function productsToXlsx(products) {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Products");
  sheet.columns = IMPORT_FIELDS.map((field) => ({ header: field, key: field, width: 22 }));
  const csv = productsToCsv(products);
  const parsed = parseCsv(Buffer.from(csv));
  parsed.slice(1).forEach((row) => sheet.addRow(Object.fromEntries(IMPORT_FIELDS.map((field, i) => [field, row[i] || ""]))));
  sheet.getRow(1).font = { bold: true };
  sheet.autoFilter = { from: "A1", to: `${sheet.getColumn(IMPORT_FIELDS.length).letter}1` };
  return workbook.xlsx.writeBuffer();
}

module.exports = { IMPORT_FIELDS, rowsFromUpload, mapImportRow, productsToCsv, productsToXlsx, parseCsv };
