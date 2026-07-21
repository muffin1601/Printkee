const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Category = require("../models/Category");
const Subcategory = require("../models/Subcategory");
const Product = require("../models/product");
const { verifyToken } = require("../middleware/auth");
const { makeUploader, handleUploadError } = require("../middleware/upload");
const { ok, fail, asyncHandler } = require("../utils/response");

const upload = makeUploader("subcategories");
const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

router.get(
  "/subcategories/related-subcategories/:subcatSlug",
  asyncHandler(async (req, res) => {
    const { subcatSlug } = req.params;

    const currentSub = await Subcategory.findOne({ slug: subcatSlug }).populate(
      "category",
      "name slug"
    );
    if (!currentSub) return fail(res, 404, "Subcategory not found");

    const relatedSubcategories = await Subcategory.find({
      category: currentSub.category._id,
      _id: { $ne: currentSub._id },
      isActive: true,
    }).select("name slug image hoverImage tag isFeatured");

    return ok(res, {
      currentSubcategory: {
        _id: currentSub._id,
        name: currentSub.name,
        slug: currentSub.slug,
        image: currentSub.image,
        hoverImage: currentSub.hoverImage,
        tag: currentSub.tag,
        isFeatured: currentSub.isFeatured,
        category: currentSub.category,
      },
      relatedSubcategories,
    });
  })
);

/**
 * FETCH SUBCATEGORY + PRODUCTS
 * URL: /subcategory-fetch/:categorySlug/:subcategorySlug
 */
router.get(
  "/subcategory-fetch/:categorySlug/:subcategorySlug",
  asyncHandler(async (req, res) => {
    const { categorySlug, subcategorySlug } = req.params;

    const category = await Category.findOne({ slug: categorySlug });
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

    return ok(res, {
      category: { _id: category._id, name: category.name, slug: category.slug },
      subcategory: {
        _id: subcategory._id,
        name: subcategory.name,
        slug: subcategory.slug,
        description: subcategory.description,
        tag: subcategory.tag,
      },
      products: subcategory.products,
    });
  })
);

/* ==============================
   CREATE SUBCATEGORY
============================== */
router.post(
  "/create",
  verifyToken,
  asyncHandler(async (req, res) => {
    const { name, slug, description, image, category, seo } = req.body;

    if (!name || !slug || !category) {
      return fail(res, 400, "Name, slug and category are required");
    }
    if (!isValidId(category)) return fail(res, 400, "Invalid category ID");

    const categoryDoc = await Category.findById(category);
    if (!categoryDoc) return fail(res, 404, "Category not found");

    const exists = await Subcategory.findOne({ $or: [{ slug }, { name }], category });
    if (exists) return fail(res, 409, "Subcategory already exists");

    const subcategory = await Subcategory.create({
      name,
      slug,
      description,
      image,
      category,
      seo: {
        metaTitle: seo?.metaTitle || "",
        metaDescription: seo?.metaDescription || "",
        keywords: seo?.keywords ? seo.keywords.split(",").map((k) => k.trim()) : [],
      },
    });

    await Category.findByIdAndUpdate(category, { $addToSet: { subcategories: subcategory._id } });

    return ok(res, subcategory, 201);
  })
);

/* ==============================
   GET ALL SUBCATEGORIES
============================== */
router.get(
  "/all",
  asyncHandler(async (req, res) => {
    const subs = await Subcategory.find().populate("category", "name").sort({ createdAt: -1 });
    return ok(res, subs);
  })
);

/* ==============================
   UPDATE SUBCATEGORY
============================== */
router.put(
  "/update/:id",
  verifyToken,
  asyncHandler(async (req, res) => {
    if (!isValidId(req.params.id)) return fail(res, 400, "Invalid subcategory ID");

    const { name, slug, description, image, category, seo } = req.body;

    if (category && !isValidId(category)) return fail(res, 400, "Invalid category ID");

    const existing = await Subcategory.findById(req.params.id);
    if (!existing) return fail(res, 404, "Subcategory not found");

    if (name || slug) {
      const duplicate = await Subcategory.findOne({
        _id: { $ne: req.params.id },
        category: category || existing.category,
        $or: [...(name ? [{ name }] : []), ...(slug ? [{ slug }] : [])],
      });
      if (duplicate) return fail(res, 409, "Subcategory name or slug already in use");
    }

    const updated = await Subcategory.findByIdAndUpdate(
      req.params.id,
      {
        name,
        slug,
        description,
        image,
        category,
        seo: {
          metaTitle: seo?.metaTitle || "",
          metaDescription: seo?.metaDescription || "",
          keywords: seo?.keywords ? seo.keywords.split(",").map((k) => k.trim()) : [],
        },
      },
      { new: true, runValidators: true }
    ).populate("category", "name");

    // Category reassigned: fix subcategories[] refs on both old and new parent
    if (category && String(existing.category) !== String(category)) {
      await Category.findByIdAndUpdate(existing.category, { $pull: { subcategories: existing._id } });
      await Category.findByIdAndUpdate(category, { $addToSet: { subcategories: existing._id } });
    }

    return ok(res, updated);
  })
);

/* ==============================
   DELETE SUBCATEGORY
============================== */
router.delete(
  "/delete/:id",
  verifyToken,
  asyncHandler(async (req, res) => {
    if (!isValidId(req.params.id)) return fail(res, 400, "Invalid subcategory ID");

    const sub = await Subcategory.findById(req.params.id);
    if (!sub) return fail(res, 404, "Subcategory not found");

    const hasProducts = await Product.exists({ subcategory: sub._id });
    if (hasProducts) {
      return fail(res, 409, "Cannot delete a subcategory that still has products");
    }

    await Category.findByIdAndUpdate(sub.category, { $pull: { subcategories: sub._id } });
    await sub.deleteOne();

    return ok(res, { message: "Subcategory deleted" });
  })
);

/* ==============================
   IMAGE UPLOAD
============================== */
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
