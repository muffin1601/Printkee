const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  name: String,
  comment: String,
  date: { type: Date, default: Date.now }
});

const BlogSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    author: String,
    image: String,
    date: { type: Date, default: Date.now },
    status: { type: String, enum: ["draft", "published", "archived"], default: "draft", index: true },
    publishedAt: { type: Date, default: null },
    reviewedBy: { type: String, default: "" },
    comments: [CommentSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Blog', BlogSchema);
