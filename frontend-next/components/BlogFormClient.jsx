"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import "../styles/BlogForm.css";

const BlogFormClient = () => {
  const [form, setForm] = useState({ title: "", content: "", author: "" });
  const [image, setImage] = useState(null);
  const router = useRouter();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(form).forEach((key) => data.append(key, form[key]));
    if (image) data.append("image", image);

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/blogs/post`, data);
      alert("Blog posted!");
      setForm({ title: "", content: "", author: "" });
      setImage(null);
      router.push("/blogs");
    } catch (err) {
      console.error("Error posting blog:", err);
      alert("Failed to post blog.");
    }
  };

  return (
    <section className="blog-form-wrapper">
      <form onSubmit={handleSubmit} className="blog-form slide-up" aria-label="Post a new blog form">
        <h2>Post a New Blog</h2>

        <label htmlFor="title">Blog Title</label>
        <input id="title" name="title" placeholder="Enter blog title" value={form.title} onChange={handleChange} required />

        <label htmlFor="author">Author Name</label>
        <input id="author" name="author" placeholder="Enter author name" value={form.author} onChange={handleChange} required />

        <label htmlFor="content">Blog Content</label>
        <textarea id="content" name="content" placeholder="Write your content here..." rows="6" value={form.content} onChange={handleChange} required />

        <label htmlFor="image-upload">Upload Blog Image</label>
        <input id="image-upload" type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />

        <button type="submit" className="submit-btn" aria-label="Post blog">Post Blog</button>
      </form>
    </section>
  );
};

export default BlogFormClient;
