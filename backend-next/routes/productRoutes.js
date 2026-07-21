const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Category = require("../models/Category");
const Subcategory = require("../models/Subcategory");
const Product = require("../models/product");
const { verifyToken } = require("../middleware/auth");
const { makeUploader, handleUploadError } = require("../middleware/upload");
const { ok, fail, asyncHandler } = require("../utils/response");

const upload = makeUploader("products");

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);
const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

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
      slug: productSlug,
      category: category._id,
      subcategory: subcategory._id,
      isActive: true,
    });
    if (!product) return fail(res, 404, "Product not found");

    return ok(res, {
      category: { _id: category._id, name: category.name, slug: category.slug },
      subcategory: { _id: subcategory._id, name: subcategory.name, slug: subcategory.slug },
      product,
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
  asyncHandler(async (req, res) => {
    const { name, slug, price, category, subcategory } = req.body;

    if (!name || !slug || price === undefined || !category || !subcategory) {
      return fail(res, 400, "name, slug, price, category and subcategory are required");
    }
    if (!isValidId(category) || !isValidId(subcategory)) {
      return fail(res, 400, "Invalid category or subcategory ID");
    }

    const exists = await Product.findOne({ slug });
    if (exists) return fail(res, 409, "A product with this slug already exists");

    const product = await Product.create(req.body);
    return ok(res, product, 201);
  })
);

/* ======================================================
   UPDATE PRODUCT
====================================================== */
router.put(
  "/update/:id",
  verifyToken,
  asyncHandler(async (req, res) => {
    if (!isValidId(req.params.id)) return fail(res, 400, "Invalid product ID");

    if (req.body.slug) {
      const duplicate = await Product.findOne({
        slug: req.body.slug,
        _id: { $ne: req.params.id },
      });
      if (duplicate) return fail(res, 409, "A product with this slug already exists");
    }

    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) return fail(res, 404, "Product not found");

    return ok(res, updated);
  })
);

/* ======================================================
   DELETE PRODUCT
====================================================== */
router.delete(
  "/delete/:id",
  verifyToken,
  asyncHandler(async (req, res) => {
    if (!isValidId(req.params.id)) return fail(res, 400, "Invalid product ID");

    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return fail(res, 404, "Product not found");

    return ok(res, { message: "Product deleted" });
  })
);

/* ======================================================
   GET ALL PRODUCTS (PAGINATION + SEARCH)
====================================================== */
router.get(
  "/all",
  asyncHandler(async (req, res) => {
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(100, Math.max(1, Number(req.query.limit) || 5));
    const search = (req.query.search || "").trim();

    const query = search
      ? {
          $or: [
            { name: new RegExp(escapeRegex(search), "i") },
            { slug: new RegExp(escapeRegex(search), "i") },
            { sku: new RegExp(escapeRegex(search), "i") },
            { tags: new RegExp(escapeRegex(search), "i") },
          ],
        }
      : {};

    const total = await Product.countDocuments(query);

    const items = await Product.find(query)
      .populate("category", "name")
      .populate("subcategory", "name")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    return ok(res, {
      items,
      page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
    });
  })
);

/* ======================================================
   GET SINGLE PRODUCT
====================================================== */
router.get(
  "/:id",
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
  upload.single("image"),
  handleUploadError,
  (req, res) => {
    if (!req.file) return fail(res, 400, "No file uploaded");

    const imageUrl = `${process.env.BASE_URL}/uploads/products/${req.file.filename}`;
    return ok(res, { url: imageUrl });
  }
);

module.exports = router;
