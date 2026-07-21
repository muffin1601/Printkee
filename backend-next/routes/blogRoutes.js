const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Blog = require("../models/Blog");
const { verifyToken } = require("../middleware/auth");
const { makeUploader, handleUploadError } = require("../middleware/upload");
const { ok, fail, asyncHandler } = require("../utils/response");

const upload = makeUploader("blogs");
const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

router.post(
  "/post",
  verifyToken,
  upload.single("image"),
  handleUploadError,
  asyncHandler(async (req, res) => {
    const { title, content, author } = req.body;
    if (!title || !content || !author) {
      return fail(res, 400, "title, content and author are required");
    }

    const imagePath = req.file ? `blogs/${req.file.filename}` : "";

    const newBlog = new Blog({ title, content, author, image: imagePath });
    await newBlog.save();

    return ok(res, newBlog, 201);
  })
);

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const blogs = await Blog.find().sort({ date: -1 });
    return ok(res, blogs);
  })
);

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    if (!isValidId(req.params.id)) return fail(res, 400, "Invalid blog ID");

    const blog = await Blog.findById(req.params.id);
    if (!blog) return fail(res, 404, "Blog not found");

    return ok(res, blog);
  })
);

router.post(
  "/:id/comments",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!isValidId(id)) return fail(res, 400, "Invalid blog ID");

    const { name, comment } = req.body;
    if (!name || !comment) return fail(res, 400, "Name and comment are required");

    const blog = await Blog.findById(id);
    if (!blog) return fail(res, 404, "Blog not found");

    blog.comments = blog.comments || [];
    blog.comments.push({ name, comment });
    await blog.save();

    return ok(res, blog);
  })
);

// Update a blog (optionally replace the cover image)
router.put(
  "/:id",
  verifyToken,
  upload.single("image"),
  handleUploadError,
  asyncHandler(async (req, res) => {
    if (!isValidId(req.params.id)) return fail(res, 400, "Invalid blog ID");

    const { title, content, author } = req.body;
    const update = {};
    if (title !== undefined) update.title = title;
    if (content !== undefined) update.content = content;
    if (author !== undefined) update.author = author;
    if (req.file) update.image = `blogs/${req.file.filename}`;

    const blog = await Blog.findByIdAndUpdate(req.params.id, update, {
      new: true,
      runValidators: true,
    });
    if (!blog) return fail(res, 404, "Blog not found");

    return ok(res, blog);
  })
);

// Delete a blog
router.delete(
  "/:id",
  verifyToken,
  asyncHandler(async (req, res) => {
    if (!isValidId(req.params.id)) return fail(res, 400, "Invalid blog ID");

    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return fail(res, 404, "Blog not found");

    return ok(res, { message: "Blog deleted successfully" });
  })
);

module.exports = router;
