const multer = require("multer");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");

const ALLOWED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
]);

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

function makeUploader(subdir) {
  const dir = path.join("uploads", subdir);

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      cb(null, dir);
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname).toLowerCase();
      const unique = `${Date.now()}-${crypto.randomUUID()}${ext}`;
      cb(null, unique);
    },
  });

  return multer({
    storage,
    limits: { fileSize: MAX_FILE_SIZE },
    fileFilter: (req, file, cb) => {
      const ext = path.extname(file.originalname).toLowerCase();
      const allowedExt = [".jpg", ".jpeg", ".png", ".webp"].includes(ext);
      const allowedMime = ALLOWED_MIME_TYPES.has(file.mimetype);

      if (!allowedExt || !allowedMime) {
        return cb(new Error("Only JPEG, PNG, and WEBP images are allowed"));
      }
      cb(null, true);
    },
  });
}

function handleUploadError(err, req, res, next) {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        success: false,
        message: "File too large. Maximum size is 5MB.",
        error: err.message,
        data: null,
      });
    }
    return res.status(400).json({
      success: false,
      message: "Upload failed",
      error: err.message,
      data: null,
    });
  }
  if (err) {
    return res.status(400).json({
      success: false,
      message: err.message || "Upload failed",
      error: err.message,
      data: null,
    });
  }
  next();
}

module.exports = { makeUploader, handleUploadError, MAX_FILE_SIZE };
