"use client";
import React from "react";
import Link from "next/link";
import styles from "../styles/BlogList.module.css";

const BlogListClient = ({ initialBlogs = [] }) => {
  return (
    <div className={styles["blog-page"]}>

      {/* ── HERO BAND ── */}
      <div className={styles["blog-hero"]}>
        <div className={styles["blog-hero-inner"]}>
          <p className={styles["blog-eyebrow"]}>Insights</p>
          <h1 className={styles["blog-hero-title"]}>Latest Blogs</h1>
          <p className={styles["blog-hero-sub"]}>
            Corporate gifting trends, branding tips and industry insights.
          </p>
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div className={styles["blog-list-container"]}>
        <div className={styles["blog-header"]}>
          <h2 className={styles["blog-title"]}>All Articles</h2>
          <Link href="/blogs/post" className={styles["post-blog-btn"]} aria-label="Post a new blog">
            + Post a Blog
          </Link>
        </div>

        <div className={styles["blog-list-grid"]}>
          {initialBlogs.length === 0 ? (
            <p className={styles["blog-empty"]}>No blogs available at the moment.</p>
          ) : (
            initialBlogs.map((blog) => (
              <article className={styles["blog-card"]} key={blog._id}>
                <div className={styles["blog-img-wrap"]}>
                  <img
                    src={`${process.env.NEXT_PUBLIC_IMG_URL}/uploads/${blog.image}`}
                    alt={blog.title || "Blog thumbnail image"}
                    className={styles["blog-thumbnail"]}
                    loading="lazy"
                  />
                </div>
                <div className={styles["blog-body"]}>
                  <p className={styles["blog-meta"]}>
                    {blog.date ? new Date(blog.date).toLocaleDateString("en-IN", { day:"numeric", month:"short", year:"numeric" }) : "Unknown date"}
                    {blog.author ? ` · ${blog.author}` : ""}
                  </p>
                  <h3 className={styles["blog-heading"]}>{blog.title}</h3>
                  <p className={styles["blog-excerpt"]}>
                    {blog.content ? blog.content.replace(/<[^>]+>/g, "").slice(0, 120) : ""}…
                  </p>
                  <Link
                    href={`/blog/${blog._id}`}
                    className={styles["read-more-link"]}
                    aria-label={`Read full blog: ${blog.title}`}
                  >
                    Read More →
                  </Link>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogListClient;
