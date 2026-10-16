const PRODUCT_STATUSES = new Set(["draft", "published", "archived"]);

const cleanString = (value) => (typeof value === "string" ? value.trim() : value);

const stringList = (value) => {
  if (Array.isArray(value)) {
    return value.map(cleanString).filter(Boolean);
  }
  if (typeof value === "string") {
    return value.split(",").map((item) => item.trim()).filter(Boolean);
  }
  return [];
};

function normalizeProductPayload(input, { partial = false } = {}) {
  const payload = { ...input };

  for (const key of ["name", "slug", "sku", "canonicalUrl"]) {
    if (Object.prototype.hasOwnProperty.call(payload, key)) payload[key] = cleanString(payload[key]);
  }

  // A sparse unique MongoDB index still indexes "". Omitting blank SKUs is
  // therefore essential: multiple products without a SKU must be allowed.
  if (payload.sku === "" || payload.sku === null) delete payload.sku;

  if (payload.slug) payload.slug = payload.slug.toLowerCase();
  if (Object.prototype.hasOwnProperty.call(payload, "tags")) payload.tags = stringList(payload.tags);

  if (payload.seo) {
    payload.seo = { ...payload.seo };
    if (Object.prototype.hasOwnProperty.call(payload.seo, "keywords")) {
      payload.seo.keywords = stringList(payload.seo.keywords);
    }
  }

  if (Object.prototype.hasOwnProperty.call(payload, "price")) payload.price = Number(payload.price);
  if (Object.prototype.hasOwnProperty.call(payload, "salePrice")) {
    payload.salePrice = payload.salePrice === "" || payload.salePrice === null
      ? null
      : Number(payload.salePrice);
  }
  if (Object.prototype.hasOwnProperty.call(payload, "stock")) payload.stock = Number(payload.stock);

  if (!partial) {
    payload.status = PRODUCT_STATUSES.has(payload.status)
      ? payload.status
      : payload.isActive === false ? "draft" : "published";
    payload.isActive = payload.status === "published";
    payload.deletedAt = payload.status === "archived" ? new Date() : null;
  } else if (payload.status) {
    if (!PRODUCT_STATUSES.has(payload.status)) throw new Error("Invalid product status");
    payload.isActive = payload.status === "published";
    payload.deletedAt = payload.status === "archived" ? new Date() : null;
  }

  return payload;
}

function validateProductPayload(payload, { partial = false } = {}) {
  const errors = [];
  const required = ["name", "slug", "price", "category", "subcategory"];
  if (!partial) {
    for (const field of required) {
      if (payload[field] === undefined || payload[field] === null || payload[field] === "") {
        errors.push(`${field} is required`);
      }
    }
  }
  if (payload.price !== undefined && (!Number.isFinite(payload.price) || payload.price < 0)) {
    errors.push("price must be a non-negative number");
  }
  if (payload.salePrice !== undefined && payload.salePrice !== null &&
      (!Number.isFinite(payload.salePrice) || payload.salePrice < 0)) {
    errors.push("salePrice must be a non-negative number");
  }
  if (payload.stock !== undefined && (!Number.isFinite(payload.stock) || payload.stock < 0)) {
    errors.push("stock must be a non-negative number");
  }
  return errors;
}

function escapeCsvCell(value) {
  let text = value === undefined || value === null
    ? ""
    : typeof value === "object" ? JSON.stringify(value) : String(value);
  // Prevent spreadsheet formula execution when an export is opened.
  if (/^[=+\-@\t\r]/.test(text)) text = `'${text}`;
  return /[",\r\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

function applyPriceOperation(price, operation, value) {
  const amount = Number(value);
  if (!Number.isFinite(price) || !Number.isFinite(amount) || amount < 0) {
    throw new Error("Price operation requires non-negative numeric values");
  }
  let result;
  if (operation === "set") result = amount;
  else if (operation === "increase_percent") result = price * (1 + amount / 100);
  else if (operation === "decrease_percent") result = price * (1 - amount / 100);
  else if (operation === "increase_fixed") result = price + amount;
  else if (operation === "decrease_fixed") result = price - amount;
  else throw new Error("Unsupported price operation");
  return Math.max(0, Math.round((result + Number.EPSILON) * 100) / 100);
}

module.exports = {
  PRODUCT_STATUSES,
  normalizeProductPayload,
  validateProductPayload,
  stringList,
  escapeCsvCell,
  applyPriceOperation,
};
