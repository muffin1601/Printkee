const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

const Banner = require("../models/Banner");
const { verifyToken } = require("../middleware/auth");
const { makeUploader, handleUploadError } = require("../middleware/upload");
const { ok, fail, asyncHandler } = require("../utils/response");

const upload = makeUploader("banners");
const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

// Only ever delete files we manage under uploads/banners — never an
// arbitrary path derived from user input. Accepts either a bare
// "banners/xxx.jpg" relative path or the full stored URL.
function deleteUploadedFile(value) {
  if (!value) return;

  const marker = "/uploads/banners/";
  let relative = null;

  if (value.startsWith("banners/")) {
    relative = value;
  } else if (value.includes(marker)) {
    relative = `banners/${value.split(marker)[1]}`;
  }

  if (!relative) return;

  const filePath = path.join("uploads", relative);
  fs.unlink(filePath, (err) => {
    if (err && err.code !== "ENOENT") {
      console.error("Failed to delete banner file:", filePath, err.message);
    }
  });
}

/* ==============================
   GET ALL BANNERS (admin — includes inactive)
============================== */
router.get(
  "/get-all",
  asyncHandler(async (req, res) => {
    const banners = await Banner.find().sort({ order: 1, createdAt: -1 });
    return ok(res, banners);
  })
);

/* ==============================
   GET ACTIVE BANNERS (public site)
============================== */
router.get(
  "/active",
  asyncHandler(async (req, res) => {
    const banners = await Banner.find({ isActive: true }).sort({ order: 1, createdAt: -1 });
    return ok(res, banners);
  })
);

/* ==============================
   CREATE BANNER
============================== */
router.post(
  "/post-all",
  verifyToken,
  asyncHandler(async (req, res) => {
    const { title, image } = req.body;
    if (!title || !image) return fail(res, 400, "Title and image are required");

    const banner = await Banner.create(req.body);
    return ok(res, banner, 201);
  })
);

/* ==============================
   UPDATE BANNER
============================== */
router.put(
  "/update/:id",
  verifyToken,
  asyncHandler(async (req, res) => {
    if (!isValidId(req.params.id)) return fail(res, 400, "Invalid banner ID");

    const existing = await Banner.findById(req.params.id);
    if (!existing) return fail(res, 404, "Banner not found");

    const updated = await Banner.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    // Image replaced — clean up the old file from disk.
    if (req.body.image && req.body.image !== existing.image) {
      deleteUploadedFile(existing.image);
    }
    if (req.body.mobileImage && req.body.mobileImage !== existing.mobileImage) {
      deleteUploadedFile(existing.mobileImage);
    }

    return ok(res, updated);
  })
);

/* ==============================
   REORDER BANNERS
============================== */
router.put(
  "/reorder",
  verifyToken,
  asyncHandler(async (req, res) => {
    const { order } = req.body; // [{ id, order }, ...]
    if (!Array.isArray(order)) return fail(res, 400, "order must be an array of {id, order}");

    for (const item of order) {
      if (!isValidId(item.id)) continue;
      await Banner.findByIdAndUpdate(item.id, { order: item.order });
    }

    const banners = await Banner.find().sort({ order: 1, createdAt: -1 });
    return ok(res, banners);
  })
);

/* ==============================
   DELETE BANNER (+ file cleanup)
============================== */
router.delete(
  "/delete/:id",
  verifyToken,
  asyncHandler(async (req, res) => {
    if (!isValidId(req.params.id)) return fail(res, 400, "Invalid banner ID");

    const deleted = await Banner.findByIdAndDelete(req.params.id);
    if (!deleted) return fail(res, 404, "Banner not found");

    deleteUploadedFile(deleted.image);
    deleteUploadedFile(deleted.mobileImage);

    return ok(res, { message: "Banner deleted" });
  })
);

/* ==============================
   IMAGE UPLOAD
============================== */
router.post(
  "/upload",
  verifyToken,
  upload.single("file"),
  handleUploadError,
  (req, res) => {
    if (!req.file) return fail(res, 400, "No file uploaded");

    const imageUrl = `${process.env.BASE_URL}/uploads/banners/${req.file.filename}`;
    return ok(res, { url: imageUrl });
  }
);

module.exports = router;
