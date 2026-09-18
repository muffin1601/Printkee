"use client";
import React from "react";
import Link from "next/link";
import styles from "../styles/BlogList.module.css";

const BlogListClient = ({ initialBlogs = [] }) => {
  const editorialPosts = [
    { _id: "corporate-diwali-gifts-buying-guide-2026", slug: "corporate-diwali-gifts-buying-guide-2026", title: "Corporate Diwali Gifts for Employees & Clients: Complete 2026 Buying Guide", author: "Printkee", date: "2026-09-18", image: "/catalogue-2026-images/page-02-img-01_560x396.png", content: "A practical bulk-buying guide for employee and client Diwali gifting, from budgets and branding to fulfilment planning." },
    { _id: "best-corporate-diwali-gifts-delhi-ncr-2026", slug: "best-corporate-diwali-gifts-delhi-ncr-2026", title: "Best Corporate Diwali Gifts in Delhi NCR for Companies in 2026", author: "Printkee", date: "2026-09-18", image: "/catalogue-2026-images/page-01-img-04_640x427.png", content: "A Delhi NCR planning guide for HR and procurement teams arranging branded festive gifts across offices and recipients." },
  ];
  const blogs = [...editorialPosts, ...initialBlogs];
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
          {blogs.length === 0 ? (
            <p className={styles["blog-empty"]}>No blogs available at the moment.</p>
          ) : (
            blogs.map((blog) => (
              <article className={styles["blog-card"]} key={blog._id}>
                <div className={styles["blog-img-wrap"]}>
                  <img
                    src={blog.slug ? blog.image : `${process.env.NEXT_PUBLIC_IMG_URL}/uploads/${blog.image}`}
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
                    href={`/blog/${blog.slug || blog._id}`}
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
