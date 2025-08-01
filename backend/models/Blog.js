const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  name: String,
  comment: String,
  date: { type: Date, default: Date.now }
});

const BlogSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: String,
  image: String, // image file path
  date: { type: Date, default: Date.now },
  comments: [CommentSchema]
});

module.exports = mongoose.model('Blog', BlogSchema);
