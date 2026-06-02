"use client";
import React, { useEffect, useState, use } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import "../styles/BlogView.css";

const BlogViewClient = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [comment, setComment] = useState({ name: "", comment: "" });

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const fetchBlog = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/blogs/${id}`);
      setBlog(res.data);
    } catch (error) {
      console.error("Error fetching blog:", error);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/blogs/${id}/comments`, comment);
      setComment({ name: "", comment: "" });
      fetchBlog();
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  if (!blog) return <div className="blog-view-loading">Loading blog post...</div>;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    image: `${process.env.NEXT_PUBLIC_IMG_URL}/uploads/${blog.image}`,
    author: { "@type": "Person", name: blog.author },
    datePublished: blog.date,
    description: blog.content?.slice(0, 150),
    url: `https://printkee.com/blog/${id}`,
  };

  return (
    <div className="blog-view-container">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="blog-view-main">
        <article className="blog-left">
          <h1>{blog.title}</h1>
          <p className="blog-view-meta">
            By {blog.author} on {new Date(blog.date).toLocaleDateString()}
          </p>
          {blog.image && (
            <img
              className="blog-view-image"
              src={`${process.env.NEXT_PUBLIC_IMG_URL}/uploads/${blog.image}`}
              alt={blog.title}
            />
          )}
          <div
            className="blog-view-content"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </article>

        <aside className="blog-right">
          <div className="comment-section">
            <h3 id="comments-title">Comments</h3>
            {blog.comments?.length === 0 ? (
              <p>No comments yet. Be the first to comment!</p>
            ) : (
              blog.comments?.map((c, i) => (
                <div className="comment" key={i}>
                  <b>{c.name}</b>
                  <p>{c.comment}</p>
                </div>
              ))
            )}

            <form onSubmit={handleComment} className="comment-form" aria-labelledby="comments-title">
              <label htmlFor="comment-name">Your Name</label>
              <input
                id="comment-name"
                name="name"
                placeholder="Enter your name"
                value={comment.name}
                onChange={(e) => setComment({ ...comment, name: e.target.value })}
                required
              />
              <label htmlFor="comment-text">Your Comment</label>
              <textarea
                id="comment-text"
                name="comment"
                placeholder="Write your comment…"
                value={comment.comment}
                onChange={(e) => setComment({ ...comment, comment: e.target.value })}
                required
              />
              <button type="submit" aria-label="Post your comment">Post Comment</button>
            </form>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default BlogViewClient;
