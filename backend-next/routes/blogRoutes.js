const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`);
  }
});
const upload = multer({ storage });

router.post('/post', upload.single('image'), async (req, res) => {
  try {
    const { title, content, author } = req.body;
    const imagePath = req.file ? req.file.filename : '';
    

    const newBlog = new Blog({
      title,
      content,
      author,
      image: imagePath, 
    });

    await newBlog.save();
    res.json(newBlog);
  } catch (err) {
    console.error('Blog creation error:', err);
    res.status(500).json({ error: 'Failed to create blog' });
  }
});

router.get('/', async (req, res) => {
  const blogs = await Blog.find().sort({ date: -1 });
  res.json(blogs);
});

router.get('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  res.json(blog);
});

router.post('/:id/comments', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, comment } = req.body;

    if (!name || !comment) {
      return res.status(400).json({ error: 'Name and comment are required' });
    }

    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    if (!blog.comments) {
      blog.comments = [];
    }

    blog.comments.push({ name, comment });
    await blog.save();

    res.status(200).json(blog);
  } catch (err) {
    console.error('Error adding comment:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
