const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const crypto = require("crypto");

const Category = require("../models/Category");
const Subcategory = require("../models/Subcategory");
const Product = require("../models/product");
const AdminAuditEvent = require("../models/AdminAuditEvent");
const { verifyToken, requireRole } = require("../middleware/auth");
const { makeUploader, makeMemoryUploader, handleUploadError } = require("../middleware/upload");
const { ok, fail, asyncHandler } = require("../utils/response");
const { evaluateProductSeo } = require("../services/productSeoQuality");
const {
  normalizeProductPayload,
  validateProductPayload,
  applyPriceOperation,
  stringList,
} = require("../services/productPayload");
const {
  IMPORT_FIELDS,
  rowsFromUpload,
  mapImportRow,
  productsToCsv,
  productsToXlsx,
} = require("../services/productImportExport");

const upload = makeUploader("products");
const importUpload = makeMemoryUploader({
  maxFileSize: 10 * 1024 * 1024,
  allowedExtensions: [".csv", ".xlsx"],
});

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);
const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const PRODUCT_WRITE_ROLES = ["super_admin", "admin", "catalog_manager"];
const PRODUCT_READ_ROLES = [...PRODUCT_WRITE_ROLES, "content_editor", "viewer"];
const ALLOWED_PRODUCT_FIELDS = new Set([
  "name", "slug", "description", "idealFor", "features", "faqs", "price", "salePrice",
  "images", "subImages", "stock", "sku", "attributes", "additionalInfo", "specifications",
  "tags", "isFeatured", "isActive", "seo", "category", "subcategory", "status", "canonicalUrl",
]);

const pickProductFields = (body) => Object.fromEntries(
  Object.entries(body || {}).filter(([key]) => ALLOWED_PRODUCT_FIELDS.has(key))
);

async function validateTaxonomy(categoryId, subcategoryId) {
  if (!isValidId(categoryId) || !isValidId(subcategoryId)) return "Invalid category or subcategory ID";
  const [category, subcategory] = await Promise.all([
    Category.findById(categoryId).select("_id isActive"),
    Subcategory.findById(subcategoryId).select("_id category isActive"),
  ]);
  if (!category) return "Category not found";
  if (!subcategory) return "Subcategory not found";
  if (String(subcategory.category) !== String(category._id)) {
    return "The selected subcategory does not belong to the selected category";
  }
  return null;
}

async function recordAudit(req, operation, productIds, status, details = {}) {
  try {
    await AdminAuditEvent.create({
      actor: req.admin?.email || "unknown",
      role: req.admin?.role || "unknown",
      operation,
      requestId: req.requestId,
      productIds,
      status,
      details,
    });
  } catch (error) {
    console.error(JSON.stringify({ event: "admin_audit_write_failed", requestId: req.requestId, operation, message: error.message }));
  }
}

function buildListQuery(filters = {}) {
  const query = filters.status === "archived" ? { deletedAt: { $ne: null } } : { deletedAt: null };
  const search = String(filters.search || "").trim();
  if (search) {
    const expression = new RegExp(escapeRegex(search), "i");
    query.$or = [{ name: expression }, { slug: expression }, { sku: expression }, { tags: expression }];
  }
  if (filters.category && isValidId(filters.category)) query.category = filters.category;
  if (filters.subcategory && isValidId(filters.subcategory)) query.subcategory = filters.subcategory;
  if (filters.status && ["draft", "published", "archived"].includes(filters.status)) query.status = filters.status;
  return query;
}

router.use((req, res, next) => {
  req.requestId = req.get("x-request-id") || crypto.randomUUID();
  res.set("x-request-id", req.requestId);
  next();
});

router.get(
  "/product-fetch/:categorySlug/:subcategorySlug/:productSlug",
  asyncHandler(async (req, res) => {
    const categorySlug = decodeURIComponent(req.params.categorySlug);
    const subcategorySlug = decodeURIComponent(req.params.subcategorySlug);
    const productSlug = decodeURIComponent(req.params.productSlug);

    const category = await Category.findOne({ slug: categorySlug });
    if (!category) return fail(res, 404, "Category not found");

    const subcategory = await Subcategory.findOne({
      slug: subcategorySlug,
      category: category._id,
    });
    if (!subcategory) return fail(res, 404, "Subcategory not found");

    const product = await Product.findOne({
      $expr: { $eq: [{ $trim: { input: "$slug" } }, productSlug.trim()] },
      category: category._id,
      subcategory: subcategory._id,
      isActive: true,
    });
    if (!product) return fail(res, 404, "Product not found");

    return ok(res, {
      category: { _id: category._id, name: category.name, slug: category.slug },
      subcategory: { _id: subcategory._id, name: subcategory.name, slug: subcategory.slug },
      product,
      seoQuality: evaluateProductSeo(product),
    });
  })
);

/**
 * RELATED PRODUCTS
 * URL: /related-products/:categorySlug/:subcategorySlug/:productSlug
 */
router.get(
  "/related-products/:categorySlug/:subcategorySlug/:productSlug",
  asyncHandler(async (req, res) => {
    const categorySlug = decodeURIComponent(req.params.categorySlug);
    const subcategorySlug = decodeURIComponent(req.params.subcategorySlug);
    const productSlug = decodeURIComponent(req.params.productSlug);

    const category = await Category.findOne({ slug: categorySlug });
    if (!category) return fail(res, 404, "Category not found");

    const subcategory = await Subcategory.findOne({
      slug: subcategorySlug,
      category: category._id,
    });
    if (!subcategory) return fail(res, 404, "Subcategory not found");

    const relatedProducts = await Product.find({
      category: category._id,
      subcategory: subcategory._id,
      slug: { $ne: productSlug },
      isActive: true,
    })
      .limit(8)
      .select("name slug price salePrice images ratings isFeatured");

    return ok(res, relatedProducts);
  })
);

/* ======================================================
   CREATE PRODUCT
====================================================== */
router.post(
  "/create",
  verifyToken,
  requireRole(...PRODUCT_WRITE_ROLES),
  asyncHandler(async (req, res) => {
    const payload = normalizeProductPayload(pickProductFields(req.body));
    const errors = validateProductPayload(payload);
    if (errors.length) return fail(res, 400, errors.join("; "));

    const taxonomyError = await validateTaxonomy(payload.category, payload.subcategory);
    if (taxonomyError) return fail(res, 400, taxonomyError);

    const duplicates = [{ slug: payload.slug }];
    if (payload.sku) duplicates.push({ sku: payload.sku });
    const exists = await Product.findOne({ $or: duplicates }).select("slug sku");
    if (exists && exists.slug === payload.slug) return fail(res, 409, "A product with this slug already exists");
    if (exists && payload.sku && exists.sku === payload.sku) return fail(res, 409, "A product with this SKU already exists");

    const product = await Product.create(payload);
    try {
      await Subcategory.findByIdAndUpdate(payload.subcategory, { $addToSet: { products: product._id } });
    } catch (error) {
      await Product.findByIdAndDelete(product._id);
      throw error;
    }
    await recordAudit(req, "product.create", [product._id], "success", { slug: product.slug });
    await product.populate([{ path: "category", select: "name slug" }, { path: "subcategory", select: "name slug" }]);
    return ok(res, product, 201);
  })
);

/* ======================================================
   UPDATE PRODUCT
====================================================== */
router.put(
  "/update/:id",
  verifyToken,
  requireRole(...PRODUCT_WRITE_ROLES),
  asyncHandler(async (req, res) => {
    if (!isValidId(req.params.id)) return fail(res, 400, "Invalid product ID");

    const existing = await Product.findById(req.params.id);
    if (!existing) return fail(res, 404, "Product not found");

    const blankSku = Object.prototype.hasOwnProperty.call(req.body, "sku") && !String(req.body.sku || "").trim();
    const payload = normalizeProductPayload(pickProductFields(req.body), { partial: true });
    const errors = validateProductPayload(payload, { partial: true });
    if (errors.length) return fail(res, 400, errors.join("; "));

    const category = payload.category || existing.category;
    const subcategory = payload.subcategory || existing.subcategory;
    const taxonomyError = await validateTaxonomy(category, subcategory);
    if (taxonomyError) return fail(res, 400, taxonomyError);

    if (payload.slug) {
      const duplicate = await Product.findOne({
        slug: payload.slug,
        _id: { $ne: req.params.id },
      });
      if (duplicate) return fail(res, 409, "A product with this slug already exists");
    }
    if (payload.sku) {
      const duplicateSku = await Product.findOne({ sku: payload.sku, _id: { $ne: req.params.id } });
      if (duplicateSku) return fail(res, 409, "A product with this SKU already exists");
    }

    const expectedVersion = Number(req.body.__v);
    const versionFilter = Number.isInteger(expectedVersion) ? { __v: expectedVersion } : {};
    const updateOperation = {
      $set: payload,
      $inc: { __v: 1 },
    };
    if (blankSku) updateOperation.$unset = { sku: 1 };
    const updated = await Product.findOneAndUpdate({ _id: req.params.id, ...versionFilter }, updateOperation, {
      new: true,
      runValidators: true,
    });
    if (!updated) return fail(res, 409, "This product was changed by another administrator. Refresh and try again.");

    if (String(existing.subcategory) !== String(subcategory)) {
      await Promise.all([
        Subcategory.findByIdAndUpdate(existing.subcategory, { $pull: { products: existing._id } }),
        Subcategory.findByIdAndUpdate(subcategory, { $addToSet: { products: existing._id } }),
      ]);
    }

    await recordAudit(req, "product.update", [updated._id], "success", { fromVersion: existing.__v, toVersion: updated.__v });
    return ok(res, updated);
  })
);

/* ======================================================
   DELETE PRODUCT
====================================================== */
router.delete(
  "/delete/:id",
  verifyToken,
  requireRole(...PRODUCT_WRITE_ROLES),
  asyncHandler(async (req, res) => {
    if (!isValidId(req.params.id)) return fail(res, 400, "Invalid product ID");

    const product = await Product.findById(req.params.id);
    if (!product) return fail(res, 404, "Product not found");

    if (req.query.permanent === "true") {
      if ((req.admin.role || "super_admin") !== "super_admin") return fail(res, 403, "Only a super admin can permanently delete products");
      await Promise.all([
        product.deleteOne(),
        Subcategory.findByIdAndUpdate(product.subcategory, { $pull: { products: product._id } }),
      ]);
      await recordAudit(req, "product.delete_permanent", [product._id], "success");
      return ok(res, { message: "Product permanently deleted" });
    }

    product.status = "archived";
    product.isActive = false;
    product.deletedAt = new Date();
    await product.save();
    await recordAudit(req, "product.archive", [product._id], "success");
    return ok(res, { message: "Product archived", product });
  })
);

/* ======================================================
   GET A CURATED COLLECTION (campaign / landing pages)

   Public, read-only. Selects active products matching any of the
   supplied tags, and — when a tag yields too few results — tops the
   list up with featured/newest products so a campaign section is
   never rendered empty. Returns category/subcategory slugs so the
   caller can build product URLs.

   URL: /api/product/collection?tags=diwali,hamper&limit=8&exclude=slug-a,slug-b
   NOTE: must stay declared BEFORE the "/:id" route below, otherwise
   Express matches "collection" as an :id.
====================================================== */
const COLLECTION_FIELDS =
  "name slug description.short price salePrice images ratings tags isFeatured stock";

router.get(
  "/collection",
  asyncHandler(async (req, res) => {
    const limit = Math.min(24, Math.max(1, Number(req.query.limit) || 8));

    const tags = String(req.query.tags || "")
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const exclude = String(req.query.exclude || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const base = { isActive: true };
    if (exclude.length) base.slug = { $nin: exclude };

    const populate = [
      { path: "category", select: "name slug" },
      { path: "subcategory", select: "name slug" },
    ];

    let items = [];

    if (tags.length) {
      /* Substring (not anchored) matching: seeded products store their tags
         as a single comma-joined string, so an exact-equality match would
         never hit. Also searched across name/description/keywords so a
         theme like "corporate" finds genuinely relevant products. */
      const matchers = tags.map((t) => new RegExp(escapeRegex(t), "i"));
      const or = [];
      matchers.forEach((rx) => {
        or.push({ tags: rx }, { name: rx }, { "description.short": rx }, { "seo.keywords": rx });
      });

      items = await Product.find({ ...base, $or: or })
        .select(COLLECTION_FIELDS)
        .populate(populate)
        .sort({ isFeatured: -1, "ratings.average": -1, createdAt: -1 })
        .limit(limit)
        .lean();
    }

    /* Top-up so a campaign section is never empty */
    if (items.length < limit) {
      const seen = items.map((p) => p.slug);
      const fillQuery = { ...base };
      fillQuery.slug = { $nin: [...exclude, ...seen] };

      const fill = await Product.find(fillQuery)
        .select(COLLECTION_FIELDS)
        .populate(populate)
        .sort({ isFeatured: -1, "ratings.average": -1, createdAt: -1 })
        .limit(limit - items.length)
        .lean();

      items = items.concat(fill);
    }

    return ok(res, items);
  })
);

/* ======================================================
   GET ALL PRODUCTS (PAGINATION + SEARCH)
====================================================== */
router.get(
  "/all",
  verifyToken,
  requireRole(...PRODUCT_READ_ROLES),
  asyncHandler(async (req, res) => {
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(100, Math.max(10, Number(req.query.limit) || 25));
    const query = buildListQuery(req.query);
    const sortField = ["createdAt", "updatedAt", "name", "price", "status"].includes(req.query.sort)
      ? req.query.sort : "createdAt";
    const sortDirection = req.query.order === "asc" ? 1 : -1;

    const total = await Product.countDocuments(query);

    const items = await Product.find(query)
      .populate("category", "name")
      .populate("subcategory", "name")
      .sort({ [sortField]: sortDirection, _id: sortDirection })
      .skip((page - 1) * limit)
      .limit(limit);

    return ok(res, {
      items,
      page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
      limit,
    });
  })
);

/* ======================================================
   BULK MANAGEMENT
====================================================== */
router.post(
  "/bulk",
  verifyToken,
  requireRole(...PRODUCT_WRITE_ROLES),
  asyncHandler(async (req, res) => {
    const { ids = [], allMatching = false, filters = {}, action, changes = {} } = req.body || {};
    if (!action) return fail(res, 400, "Bulk action is required");

    let query;
    if (allMatching) {
      query = buildListQuery(filters);
    } else {
      const uniqueIds = [...new Set(ids)].filter(isValidId);
      if (!uniqueIds.length || uniqueIds.length !== new Set(ids).size) return fail(res, 400, "Valid product IDs are required");
      if (uniqueIds.length > 1000) return fail(res, 400, "A maximum of 1,000 products can be changed per request");
      query = { _id: { $in: uniqueIds }, deletedAt: null };
    }

    const products = await Product.find(query).select("_id price category subcategory status").limit(10000).lean();
    if (!products.length) return fail(res, 404, "No matching products found");
    if (products.length > 1000) return fail(res, 400, "The selection exceeds 1,000 products. Narrow the filters and retry.");

    let update = {};
    let perProduct = false;
    if (["publish", "unpublish", "archive"].includes(action)) {
      const status = action === "publish" ? "published" : action === "unpublish" ? "draft" : "archived";
      update = { status, isActive: status === "published", deletedAt: status === "archived" ? new Date() : null };
    } else if (action === "category") {
      const taxonomyError = await validateTaxonomy(changes.category, changes.subcategory);
      if (taxonomyError) return fail(res, 400, taxonomyError);
      update = { category: changes.category, subcategory: changes.subcategory };
    } else if (action === "moq") update = { "attributes.moq": String(changes.moq || "").trim() };
    else if (action === "tags") update = { tags: stringList(changes.tags) };
    else if (action === "visibility") update = { isActive: Boolean(changes.isActive), status: changes.isActive ? "published" : "draft" };
    else if (action === "seo") {
      update = Object.fromEntries(Object.entries({
        "seo.metaTitle": changes.metaTitle,
        "seo.metaDescription": changes.metaDescription,
        "seo.keywords": changes.keywords === undefined ? undefined : stringList(changes.keywords),
        "seo.indexable": changes.indexable,
      }).filter(([, value]) => value !== undefined));
    } else if (action === "attributes") {
      const allowed = ["material", "dimensions", "weight", "gsm", "capacity", "packaging", "leadTime", "sampleAvailability", "customization", "careInstructions"];
      update = Object.fromEntries(Object.entries(changes).filter(([key, value]) => allowed.includes(key) && value !== undefined).map(([key, value]) => [`attributes.${key}`, value]));
    } else if (action === "price") perProduct = true;
    else return fail(res, 400, "Unsupported bulk action");

    let operations;
    if (perProduct) {
      try {
        operations = products.map((product) => ({
          updateOne: {
            filter: { _id: product._id },
            update: { $set: { price: applyPriceOperation(product.price, changes.operation, changes.value) }, $inc: { __v: 1 } },
          },
        }));
      } catch (error) {
        return fail(res, 400, error.message);
      }
    } else {
      if (!Object.keys(update).length) return fail(res, 400, "No valid changes supplied");
      operations = products.map((product) => ({ updateOne: { filter: { _id: product._id }, update: { $set: update, $inc: { __v: 1 } } } }));
    }

    const result = await Product.bulkWrite(operations, { ordered: false });

    if (action === "category") {
      const productIds = products.map((product) => product._id);
      await Subcategory.updateMany({ products: { $in: productIds } }, { $pull: { products: { $in: productIds } } });
      await Subcategory.findByIdAndUpdate(changes.subcategory, { $addToSet: { products: { $each: productIds } } });
    }

    const productIds = products.map((product) => product._id);
    await recordAudit(req, `product.bulk.${action}`, productIds, "success", { matched: products.length, modified: result.modifiedCount });
    return ok(res, { matched: products.length, modified: result.modifiedCount, requestId: req.requestId });
  })
);

/* ======================================================
   IMPORT / EXPORT
====================================================== */
router.get(
  "/import/template",
  verifyToken,
  requireRole(...PRODUCT_READ_ROLES),
  (req, res) => {
    const csv = `${IMPORT_FIELDS.join(",")}\r\n`;
    res.set({ "Content-Type": "text/csv; charset=utf-8", "Content-Disposition": 'attachment; filename="printkee-product-import-template.csv"' });
    return res.send(`\uFEFF${csv}`);
  }
);

router.post(
  "/import/preview",
  verifyToken,
  requireRole(...PRODUCT_WRITE_ROLES),
  importUpload.single("file"),
  handleUploadError,
  asyncHandler(async (req, res) => {
    if (!req.file) return fail(res, 400, "CSV or XLSX file is required");
    const mapping = req.body.mapping ? JSON.parse(req.body.mapping) : {};
    const rows = await rowsFromUpload(req.file);
    if (rows.length > 5000) return fail(res, 400, "Imports are limited to 5,000 rows per file");
    const mapped = rows.map((row) => mapImportRow(row, mapping));
    const preview = mapped.slice(0, 100).map(({ row, product }) => ({ row, product, errors: validateProductPayload(normalizeProductPayload(product)) }));
    return ok(res, { totalRows: rows.length, fields: Object.keys(rows[0] || {}).filter((key) => key !== "__row"), preview, truncated: rows.length > preview.length });
  })
);

router.post(
  "/import/commit",
  verifyToken,
  requireRole(...PRODUCT_WRITE_ROLES),
  importUpload.single("file"),
  handleUploadError,
  asyncHandler(async (req, res) => {
    if (!req.file) return fail(res, 400, "CSV or XLSX file is required");
    const mode = ["create", "update", "upsert"].includes(req.body.mode) ? req.body.mode : "upsert";
    const mapping = req.body.mapping ? JSON.parse(req.body.mapping) : {};
    const rows = await rowsFromUpload(req.file);
    if (rows.length > 5000) return fail(res, 400, "Imports are limited to 5,000 rows per file");

    const result = { total: rows.length, created: 0, updated: 0, skipped: 0, failed: 0, errors: [] };
    const touchedIds = [];
    for (let offset = 0; offset < rows.length; offset += 100) {
      const batch = rows.slice(offset, offset + 100);
      for (const row of batch) {
        try {
          const mapped = mapImportRow(row, mapping);
          const payload = normalizeProductPayload(pickProductFields(mapped.product));
          const errors = validateProductPayload(payload);
          if (errors.length) throw new Error(errors.join("; "));
          const taxonomyError = await validateTaxonomy(payload.category, payload.subcategory);
          if (taxonomyError) throw new Error(taxonomyError);

          const identifier = mapped.product._id && isValidId(mapped.product._id)
            ? { _id: mapped.product._id }
            : payload.sku ? { sku: payload.sku } : { slug: payload.slug };
          const existing = await Product.findOne(identifier);
          if (existing && mode === "create") { result.skipped += 1; continue; }
          if (!existing && mode === "update") { result.skipped += 1; continue; }

          if (existing) {
            const oldSubcategory = existing.subcategory;
            Object.assign(existing, payload);
            if (Object.prototype.hasOwnProperty.call(mapped.product, "sku") && !String(mapped.product.sku || "").trim()) existing.sku = undefined;
            await existing.save();
            if (String(oldSubcategory) !== String(existing.subcategory)) {
              await Subcategory.findByIdAndUpdate(oldSubcategory, { $pull: { products: existing._id } });
            }
            await Subcategory.findByIdAndUpdate(existing.subcategory, { $addToSet: { products: existing._id } });
            result.updated += 1;
            touchedIds.push(existing._id);
          } else {
            const created = await Product.create(payload);
            await Subcategory.findByIdAndUpdate(created.subcategory, { $addToSet: { products: created._id } });
            result.created += 1;
            touchedIds.push(created._id);
          }
        } catch (error) {
          result.failed += 1;
          result.errors.push({ row: row.__row, message: error.code === 11000 ? "Duplicate slug or SKU" : error.message });
        }
      }
    }
    await recordAudit(req, "product.import", touchedIds, result.failed ? "partial" : "success", { ...result, errors: result.errors.slice(0, 100) });
    return ok(res, { ...result, requestId: req.requestId }, result.failed ? 207 : 200);
  })
);

router.get(
  "/export/file",
  verifyToken,
  requireRole(...PRODUCT_READ_ROLES),
  asyncHandler(async (req, res) => {
    const query = buildListQuery(req.query);
    if (req.query.ids) {
      const ids = String(req.query.ids).split(",").filter(isValidId);
      if (!ids.length) return fail(res, 400, "No valid product IDs supplied");
      query._id = { $in: ids };
    }
    const products = await Product.find(query).populate("category", "name slug").populate("subcategory", "name slug").sort({ createdAt: -1 }).limit(10000).lean();
    const format = req.query.format === "xlsx" ? "xlsx" : "csv";
    const body = format === "xlsx" ? await productsToXlsx(products) : `\uFEFF${productsToCsv(products)}`;
    res.set({
      "Content-Type": format === "xlsx" ? "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" : "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="printkee-products.${format}"`,
    });
    await recordAudit(req, "product.export", products.map((product) => product._id), "success", { count: products.length, format });
    return res.send(body);
  })
);

/* ======================================================
   GET SINGLE PRODUCT
====================================================== */
router.get(
  "/:id",
  verifyToken,
  requireRole(...PRODUCT_READ_ROLES),
  asyncHandler(async (req, res) => {
    if (!isValidId(req.params.id)) return fail(res, 400, "Invalid product ID");

    const product = await Product.findById(req.params.id)
      .populate("category", "name")
      .populate("subcategory", "name");

    if (!product) return fail(res, 404, "Product not found");
    return ok(res, product);
  })
);

/* ======================================================
   UPLOAD PRODUCT IMAGE
====================================================== */
router.post(
  "/upload",
  verifyToken,
  requireRole(...PRODUCT_WRITE_ROLES),
  upload.single("image"),
  handleUploadError,
  (req, res) => {
    if (!req.file) return fail(res, 400, "No file uploaded");

    const imageUrl = `${process.env.BASE_URL}/uploads/products/${req.file.filename}`;
    return ok(res, { url: imageUrl });
  }
);

module.exports = router;
