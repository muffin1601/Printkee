"use client";
import React, { useEffect, useState } from "react";
import { Plus, Edit, Trash2, FileText } from "lucide-react";
import axios from "@/lib/api";
import Modal from "./Modal";
import FormInput from "./FormInput";
import AdminLayout from "./AdminLayout";
import styles from "../../styles/admin/HeroManager.module.css";

const API = process.env.NEXT_PUBLIC_API_URL;
const IMG = process.env.NEXT_PUBLIC_IMG_URL;

const emptyForm = { title: "", author: "", content: "", image: "", imageFile: null };

const blogImageUrl = (image) => {
  if (!image) return "";
  if (/^https?:\/\//.test(image)) return image;
  return `${IMG}/uploads/${image}`;
};

const BlogManager = () => {
  const [blogs, setBlogs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get(`${API}/blogs`);
      setBlogs(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error fetching blogs:", err);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const openAddModal = () => {
    setForm(emptyForm);
    setEditId(null);
    setIsModalOpen(true);
  };

  const handleEdit = (blog) => {
    setForm({
      title: blog.title || "",
      author: blog.author || "",
      content: blog.content || "",
      image: blog.image || "",
      imageFile: null,
    });
    setEditId(blog._id);
    setIsModalOpen(true);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    setForm((prev) => ({ ...prev, imageFile: file }));
  };

  const handleSave = async () => {
    if (!form.title.trim() || !form.content.trim()) {
      alert("Title and content are required ❗");
      return;
    }

    const fd = new FormData();
    fd.append("title", form.title);
    fd.append("author", form.author);
    fd.append("content", form.content);
    if (form.imageFile) fd.append("image", form.imageFile);

    setSaving(true);
    try {
      if (editId) {
        await axios.put(`${API}/blogs/${editId}`, fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Blog updated successfully ✅");
      } else {
        await axios.post(`${API}/blogs/post`, fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Blog published successfully ✅");
      }
      setIsModalOpen(false);
      fetchBlogs();
    } catch (err) {
      console.error("Error saving blog:", err);
      alert("Failed to save blog ❌");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      await axios.delete(`${API}/blogs/${id}`);
      alert("Blog deleted ✅");
      fetchBlogs();
    } catch (err) {
      console.error("Error deleting blog:", err);
      alert("Failed to delete blog ❌");
    }
  };

  const previewSrc = form.imageFile
    ? URL.createObjectURL(form.imageFile)
    : blogImageUrl(form.image);

  return (
    <AdminLayout>
      <div className={styles.hmWrapper}>
        <div className={styles.hmHeader}>
          <h3 className={styles.hmTitle}>
            <FileText size={18} /> Blog Manager
          </h3>

          <button className={styles.hmAddBtn} onClick={openAddModal}>
            <Plus size={16} /> Add Blog
          </button>
        </div>

        <p className={styles.hmDescription}>
          Create, edit, and remove blog posts shown on the public blog.
        </p>

        <ul className={styles.hmSlideList}>
          {blogs.length === 0 ? (
            <li className={styles.hmEmpty}>No blogs available.</li>
          ) : (
            blogs.map((blog) => (
              <li key={blog._id} className={styles.hmSlideItem}>
                <div className={styles.hmSlideInfo}>
                  <strong className={styles.hmSlideTitle}>
                    {blog.title || "Untitled"}
                  </strong>
                  <span className={styles.hmSlideType}>
                    by {blog.author || "Unknown"}
                  </span>
                  <div className={styles.hmSlideSub}>
                    {blog.date ? new Date(blog.date).toLocaleDateString() : ""}
                    {blog.content
                      ? ` — ${blog.content.replace(/<[^>]*>/g, "").slice(0, 120)}…`
                      : ""}
                  </div>
                </div>

                <div className={styles.hmSlideActions}>
                  <button className={styles.hmEditBtn} onClick={() => handleEdit(blog)}>
                    <Edit size={16} /> Edit
                  </button>
                  <button className={styles.hmDeleteBtn} onClick={() => handleDelete(blog._id)}>
                    <Trash2 size={16} /> Delete
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editId ? "Edit Blog" : "Add New Blog"}
      >
        <FormInput
          label="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <FormInput
          label="Author"
          value={form.author}
          onChange={(e) => setForm({ ...form, author: e.target.value })}
        />

        <div className={styles.hmFormGroup}>
          <label className={styles.hmInputLabel}>Content</label>
          <textarea
            rows={8}
            className={styles.hmSelect}
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            placeholder="Write the blog content here. Basic HTML is supported."
          />
        </div>

        <div className={styles.hmUploadGroup}>
          <label className={styles.hmInputLabel}>
            {editId ? "Replace Image (optional)" : "Upload Cover Image"}
          </label>
          <input
            type="file"
            accept="image/*"
            className={styles.hmFileInput}
            onChange={handleFileChange}
          />
        </div>

        {previewSrc && (
          <div className={styles.hmPreview}>
            <img src={previewSrc} alt="Preview" />
          </div>
        )}

        <button className={styles.hmSaveBtn} onClick={handleSave} disabled={saving}>
          {saving ? "Saving…" : editId ? "Update" : "Publish"}
        </button>
      </Modal>
    </AdminLayout>
  );
};

export default BlogManager;
