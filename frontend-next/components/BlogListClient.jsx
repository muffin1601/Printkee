"use client";
import React from "react";
import Link from "next/link";
import "../styles/BlogList.css";

const BlogListClient = ({ initialBlogs = [] }) => {
  return (
    <div className="blog-list-container">
      <div className="blog-header">
        <h2 className="blog-title">Latest Blogs</h2>
        <Link href="/blogs/post" className="post-blog-btn" aria-label="Post a new blog">
          Post a Blog
        </Link>
      </div>

      <div className="blog-list-grid">
        {initialBlogs.length === 0 ? (
          <p>No blogs available at the moment.</p>
        ) : (
          initialBlogs.map((blog) => (
            <article className="blog-card" key={blog._id}>
              <img
                src={`${process.env.NEXT_PUBLIC_IMG_URL}/uploads/${blog.image}`}
                alt={blog.title || "Blog thumbnail image"}
                className="blog-thumbnail"
              />
              <h3 className="blog-heading">{blog.title}</h3>
              <p className="blog-meta">
                By {blog.author || "Unknown"} on{" "}
                {blog.date ? new Date(blog.date).toLocaleDateString() : "Unknown date"}
              </p>
              <p className="blog-excerpt">
                {blog.content ? blog.content.replace(/<[^>]+>/g, "").slice(0, 120) : ""}...
              </p>
              <Link
                href={`/blog/${blog._id}`}
                className="read-more-link"
                aria-label={`Read full blog: ${blog.title}`}
              >
                Read More
              </Link>
            </article>
          ))
        )}
      </div>
    </div>
  );
};

export default BlogListClient;
