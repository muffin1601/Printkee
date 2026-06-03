"use client";
import React, { useEffect, useState } from "react";
import { Plus, Edit, Trash2, Image as ImageIcon } from "lucide-react";
import axios from "axios";
import Modal from "../../components/Dashboard/Modal";
import FormInput from "../../components/Dashboard/FormInput";
import AdminLayout from "../../components/Dashboard/AdminLayout";
import styles from "../../styles/admin/HeroManager.module.css"; // reuse same styling

const CategoryManager = () => {
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    image: "",
    seo: {
      metaTitle: "",
      metaDescription: "",
      keywords: "",
    },
  });

  const [editId, setEditId] = useState(null);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/category/all`);
      setCategories(res.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const openAddModal = () => {
    setForm({
      name: "",
      slug: "",
      description: "",
      image: "",
      seo: {
        metaTitle: "",
        metaDescription: "",
        keywords: "",
      },
    });
    setEditId(null);
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    if (!form.name || !form.slug) {
      alert("Name and slug are required ❗");
      return;
    }

    try {
      if (editId) {
        await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/category/update/${editId}`,
          form
        );
        alert("Category updated successfully ✅");
      } else {
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/category/create`,
          form
        );
        alert("Category added successfully ✅");
      }

      fetchCategories();
      setIsModalOpen(false);

    } catch (err) {
      console.error("Error saving category:", err);
      alert("Failed to save category ❌");
    }
  };

  const handleEdit = (cat) => {
    setForm({
      name: cat.name,
      slug: cat.slug,
      description: cat.description,
      image: cat.image,
      seo: {
        metaTitle: cat.seo?.metaTitle || "",
        metaDescription: cat.seo?.metaDescription || "",
        keywords: cat.seo?.keywords?.join(", ") || "",
      },
    });
    setEditId(cat._id);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;

    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/category/delete/${id}`);
      alert("Category deleted ✅");
      fetchCategories();
    } catch (err) {
      console.error("Error deleting:", err);
      alert("Failed to delete ❌");
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const fd = new FormData();
      fd.append("image", file);

      const uploadRes = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/category/upload`,
        fd,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setForm((prev) => ({
        ...prev,
        image: uploadRes.data.url,
      }));

      alert("Image uploaded ✅");

    } catch (err) {
      console.error("Upload error:", err);
      alert("Upload failed ❌");
    }
  };

  return (
    <AdminLayout>
      <div className={styles.hmWrapper}>
        <div className={styles.hmHeader}>
          <h3 className={styles.hmTitle}>
            <ImageIcon size={18} /> Category Manager
          </h3>

          <button className={styles.hmAddBtn} onClick={openAddModal}>
            <Plus size={16} /> Add Category
          </button>
        </div>

        <p className={styles.hmDescription}>Manage all product categories.</p>

        {/* Category List */}
        <ul className={styles.hmSlideList}>
          {categories.length === 0 ? (
            <li className={styles.hmEmpty}>No categories available.</li>
          ) : (
            categories.map((cat) => (
              <li key={cat._id} className={styles.hmSlideItem}>
                <div className={styles.hmSlideInfo}>

                  {/* Thumbnail */}
                  {/* {cat.image && (
                    <img
                      src={cat.image}
                      style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "4px", marginBottom: "8px" }}
                    />
                  )} */}

                  <strong className={styles.hmSlideTitle}>{cat.name}</strong>
                  <div className={styles.hmSlideType}>(slug: {cat.slug})</div>
                  <div className={styles.hmSlideSub}>{cat.description}</div>
                </div>

                <div className={styles.hmSlideActions}>
                  <button className={styles.hmEditBtn} onClick={() => handleEdit(cat)}>
                    <Edit size={16} /> Edit
                  </button>

                  <button className={styles.hmDeleteBtn} onClick={() => handleDelete(cat._id)}>
                    <Trash2 size={16} /> Delete
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editId ? "Edit Category" : "Add New Category"}
      >
        <FormInput
          label="Category Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <FormInput
          label="Slug"
          value={form.slug}
          onChange={(e) => setForm({ ...form, slug: e.target.value })}
        />

        <FormInput
          label="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        {/* Upload */}
        <div className={styles.hmUploadGroup}>
          <label className={styles.hmInputLabel}>Upload Image</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
        </div>

        {/* Manual URL */}
        <FormInput
          label="OR Paste Image URL"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
        />

        {/* Preview */}
        {form.image && (
          <div className={styles.hmPreview}>
            <img src={form.image} alt="Preview" />
          </div>
        )}

        {/* SEO Section */}
        {/* <h4 style={{ marginTop: "20px" }}>SEO Fields</h4> */}

        <FormInput
          label="Meta Title"
          value={form.seo.metaTitle}
          onChange={(e) =>
            setForm({ ...form, seo: { ...form.seo, metaTitle: e.target.value } })
          }
        />

        <FormInput
          label="Meta Description"
          value={form.seo.metaDescription}
          onChange={(e) =>
            setForm({
              ...form,
              seo: { ...form.seo, metaDescription: e.target.value },
            })
          }
        />

        <FormInput
          label="Keywords (comma separated)"
          value={form.seo.keywords}
          onChange={(e) =>
            setForm({ ...form, seo: { ...form.seo, keywords: e.target.value } })
          }
        />

        <button className={styles.hmSaveBtn} onClick={handleSave}>
          {editId ? "Update" : "Save"}
        </button>
      </Modal>
    </AdminLayout>
  );
};

export default CategoryManager;
