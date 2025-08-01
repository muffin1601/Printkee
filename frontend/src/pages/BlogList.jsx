import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/BlogList.css';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/blogs`).then(res => setBlogs(res.data));
  }, []);

  console.log(blogs);

  return (
    <div className="blog-list-container">
      <div className="blog-header">
        <h2 className="blog-title">Latest Blogs</h2>
        <Link to="/post" className="post-blog-btn">Post a Blog</Link>
      </div>

      <div className="blog-list-grid">
        {blogs.map(blog => (
          <div className="blog-card" key={blog._id}>
            <img
              src={`${import.meta.env.VITE_IMG_URL}/${blog.image}`}
              alt={blog.title}
              className="blog-thumbnail"
            />
            <h3 className="blog-heading">{blog.title}</h3>
            <p className="blog-meta">By {blog.author} on {new Date(blog.date).toLocaleDateString()}</p>
            <p className="blog-excerpt">{blog.content.slice(0, 100)}...</p>
            <Link to={`/blog/${blog._id}`} className="read-more-link">Read More</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
