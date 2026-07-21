const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Category = require("../models/Category");
const Subcategory = require("../models/Subcategory");
const { verifyToken } = require("../middleware/auth");
const { makeUploader, handleUploadError } = require("../middleware/upload");
const { ok, fail, asyncHandler } = require("../utils/response");

const upload = makeUploader("categories");
const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

router.get(
  "/categories",
  asyncHandler(async (req, res) => {
    const categories = await Category.find({})
      .populate({ path: "subcategories", select: "name slug image description seo" })
      .sort({ createdAt: 1 });

    return ok(res, categories);
  })
);

router.get(
  "/categories/:slug",
  asyncHandler(async (req, res) => {
    const { slug } = req.params;

    const category = await Category.findOne({ slug }).populate({
      path: "subcategories",
      select: "name slug image description seo",
    });

    if (!category) return fail(res, 404, "Category not found");
    return ok(res, category);
  })
);

/**
 * GET SUBCATEGORY BY CATEGORY SLUG + SUBCATEGORY SLUG
 * - Returns subcategory + products
 */
router.get(
  "/categories/:slug/:subcategorySlug",
  asyncHandler(async (req, res) => {
    const { slug, subcategorySlug } = req.params;

    const category = await Category.findOne({ slug });
    if (!category) return fail(res, 404, "Category not found");

    const subcategory = await Subcategory.findOne({
      slug: subcategorySlug,
      category: category._id,
    }).populate({
      path: "products",
      match: { isActive: true },
      select: "name slug price salePrice images stock ratings isFeatured seo",
    });

    if (!subcategory) return fail(res, 404, "Subcategory not found");
    return ok(res, subcategory);
  })
);

/* ----------------------------------
   CREATE CATEGORY
---------------------------------- */
router.post(
  "/create",
  verifyToken,
  asyncHandler(async (req, res) => {
    const { name, slug, description, image, seo } = req.body;

    if (!name || !slug) return fail(res, 400, "Name and slug are required");

    const exists = await Category.findOne({ $or: [{ name }, { slug }] });
    if (exists) return fail(res, 409, "Category already exists");

    const category = await Category.create({
      name,
      slug,
      description,
      image,
      seo: {
        metaTitle: seo?.metaTitle || "",
        metaDescription: seo?.metaDescription || "",
        keywords: seo?.keywords ? seo.keywords.split(",").map((k) => k.trim()) : [],
      },
    });

    return ok(res, category, 201);
  })
);

/* ----------------------------------
   GET ALL CATEGORIES (ADMIN)
---------------------------------- */
router.get(
  "/all",
  asyncHandler(async (req, res) => {
    const categories = await Category.find().sort({ createdAt: -1 }).populate("subcategories");
    return ok(res, categories);
  })
);

/* ----------------------------------
   GET SINGLE CATEGORY (OPTIONAL)
---------------------------------- */
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    if (!isValidId(req.params.id)) return fail(res, 400, "Invalid category ID");

    const category = await Category.findById(req.params.id).populate("subcategories");
    if (!category) return fail(res, 404, "Category not found");

    return ok(res, category);
  })
);

/* ----------------------------------
   UPDATE CATEGORY
---------------------------------- */
router.put(
  "/update/:id",
  verifyToken,
  asyncHandler(async (req, res) => {
    if (!isValidId(req.params.id)) return fail(res, 400, "Invalid category ID");

    const { name, slug, description, image, seo } = req.body;

    if (name || slug) {
      const duplicate = await Category.findOne({
        _id: { $ne: req.params.id },
        $or: [...(name ? [{ name }] : []), ...(slug ? [{ slug }] : [])],
      });
      if (duplicate) return fail(res, 409, "Category name or slug already in use");
    }

    const updated = await Category.findByIdAndUpdate(
      req.params.id,
      {
        name,
        slug,
        description,
        image,
        seo: {
          metaTitle: seo?.metaTitle || "",
          metaDescription: seo?.metaDescription || "",
          keywords: seo?.keywords ? seo.keywords.split(",").map((k) => k.trim()) : [],
        },
      },
      { new: true, runValidators: true }
    );

    if (!updated) return fail(res, 404, "Category not found");
    return ok(res, updated);
  })
);

/* ----------------------------------
   DELETE CATEGORY
---------------------------------- */
router.delete(
  "/delete/:id",
  verifyToken,
  asyncHandler(async (req, res) => {
    if (!isValidId(req.params.id)) return fail(res, 400, "Invalid category ID");

    const hasSubcategories = await Subcategory.exists({ category: req.params.id });
    if (hasSubcategories) {
      return fail(res, 409, "Cannot delete a category that still has subcategories");
    }

    const deleted = await Category.findByIdAndDelete(req.params.id);
    if (!deleted) return fail(res, 404, "Category not found");

    return ok(res, { message: "Category deleted" });
  })
);

/* ----------------------------------
   IMAGE UPLOAD
---------------------------------- */
router.post(
  "/upload",
  verifyToken,
  upload.single("image"),
  handleUploadError,
  (req, res) => {
    if (!req.file) return fail(res, 400, "No file uploaded");

    const imageUrl = `${process.env.BASE_URL}/${req.file.path.replace(/\\/g, "/")}`;
    return ok(res, { url: imageUrl });
  }
);

module.exports = router;
