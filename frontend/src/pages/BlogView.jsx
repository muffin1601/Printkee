import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import '../styles/BlogView.css';

const BlogView = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [comment, setComment] = useState({ name: '', comment: '' });

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const fetchBlog = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/blogs/${id}`);
      setBlog(res.data);
    } catch (error) {
      console.error("Error fetching blog:", error);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/blogs/${id}/comments`, comment);
      setComment({ name: '', comment: '' });
      fetchBlog(); // Refresh comments
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  if (!blog) return <div className="blog-view-loading">Loading blog post...</div>;

  return (
    <div className="blog-view-container">
      <Helmet>
        <title>{blog.title} | MF Global Blog</title>
        <meta
          name="description"
          content={blog.content.slice(0, 160).replace(/<[^>]+>/g, '')}
        />
      </Helmet>

      {/* Two-column layout */}
      <div className="blog-view-main">
        {/* Left Column: Blog Content */}
        <div className="blog-left">
          <h1>{blog.title}</h1>
          <p className="blog-view-meta">
            By {blog.author} on {new Date(blog.date).toLocaleDateString()}
          </p>

          {blog.image && (
            <img
              className="blog-view-image"
              src={`${import.meta.env.VITE_IMG_URL}/${blog.image}`}
              alt={blog.title}
            />
          )}

          <div className="blog-view-content">{blog.content}</div>
        </div>

        {/* Right Column: Comments */}
        <div className="blog-right">
          <div className="comment-section">
            <h3>Comments</h3>
            {blog.comments.length === 0 ? (
              <p>No comments yet. Be the first to comment!</p>
            ) : (
              blog.comments.map((c, i) => (
                <div className="comment" key={i}>
                  <b>{c.name}</b>
                  <p>{c.comment}</p>
                </div>
              ))
            )}

            <form onSubmit={handleComment} className="comment-form">
              <input
                name="name"
                placeholder="Your Name"
                value={comment.name}
                onChange={(e) => setComment({ ...comment, name: e.target.value })}
                required
              />
              <textarea
                name="comment"
                placeholder="Write your comment"
                value={comment.comment}
                onChange={(e) => setComment({ ...comment, comment: e.target.value })}
                required
              />
              <button type="submit">Post Comment</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogView;