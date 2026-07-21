"use client";
import React, { useEffect, useState } from "react";
import { Plus, Image as ImageIcon, Trash2, Edit } from "lucide-react";
import axios from "@/lib/api";
import Modal from "../../components/Dashboard/Modal";
import FormInput from "../../components/Dashboard/FormInput";
import AdminLayout from "../../components/Dashboard/AdminLayout";
import styles from "../../styles/admin/HeroManager.module.css";

const API = process.env.NEXT_PUBLIC_API_URL;

const emptyForm = {
  title: "",
  subtitle: "",
  description: "",
  badgeText: "",
  image: "",
  mobileImage: "",
  showButton: true,
  ctaText: "",
  ctaUrl: "",
  order: 0,
  isActive: true,
};

const HeroManager = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [uploading, setUploading] = useState(false);

  const fetchBanners = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(`${API}/slides/get-all`);
      setBanners(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error fetching banners:", err);
      setError("Failed to load banners.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const openAddModal = () => {
    setForm(emptyForm);
    setEditId(null);
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    if (!form.title.trim()) {
      alert("Title is required.");
      return;
    }
    if (!form.image) {
      alert("Please upload a background image.");
      return;
    }

    const payload = { ...form, order: Number(form.order) || 0 };

    try {
      if (editId) {
        await axios.put(`${API}/slides/update/${editId}`, payload);
        alert("Banner updated successfully ✅");
      } else {
        await axios.post(`${API}/slides/post-all`, payload);
        alert("Banner added successfully ✅");
      }

      setIsModalOpen(false);
      fetchBanners();
    } catch (err) {
      console.error("Error saving banner:", err);
      alert(err.response?.data?.message || "Failed to save banner ❌");
    }
  };

  const handleEdit = (banner) => {
    setForm({ ...emptyForm, ...banner });
    setEditId(banner._id);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this banner?")) return;

    try {
      await axios.delete(`${API}/slides/delete/${id}`);
      alert("Banner deleted successfully ✅");
      fetchBanners();
    } catch (err) {
      console.error("Error deleting banner:", err);
      alert(err.response?.data?.message || "Failed to delete banner ❌");
    }
  };

  const handleFileUpload = async (e, field) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setUploading(true);
    try {
      const uploadRes = await axios.post(`${API}/slides/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setForm((prev) => ({ ...prev, [field]: uploadRes.data.url }));
      alert("File uploaded successfully ✅");
    } catch (err) {
      console.error("Upload error:", err);
      alert(err.response?.data?.message || "Upload failed ❌");
    } finally {
      setUploading(false);
    }
  };

  return (
    <AdminLayout>
      <div className={styles.hmWrapper}>
        <div className={styles.hmHeader}>
          <h3 className={styles.hmTitle}>
            <ImageIcon size={18} /> Hero Banner Manager
          </h3>

          <button className={styles.hmAddBtn} onClick={openAddModal}>
            <Plus size={16} /> Add Banner
          </button>
        </div>

        <p className={styles.hmDescription}>
          Manage homepage hero banners — image, copy, CTA and display order.
        </p>

        {loading ? (
          <p className={styles.hmEmpty}>Loading banners…</p>
        ) : error ? (
          <p className={styles.hmEmpty}>{error}</p>
        ) : (
          <ul className={styles.hmSlideList}>
            {banners.length === 0 ? (
              <li className={styles.hmEmpty}>No banners available.</li>
            ) : (
              banners.map((banner) => (
                <li key={banner._id} className={styles.hmSlideItem}>
                  <div className={styles.hmSlideInfo}>
                    <strong className={styles.hmSlideTitle}>
                      {banner.title || "Untitled"}
                    </strong>
                    <span className={styles.hmSlideType}>
                      ({banner.isActive ? "Active" : "Inactive"} · order {banner.order})
                    </span>
                    <div className={styles.hmSlideSub}>{banner.subtitle}</div>
                  </div>

                  <div className={styles.hmSlideActions}>
                    <button className={styles.hmEditBtn} onClick={() => handleEdit(banner)}>
                      <Edit size={16} /> Edit
                    </button>

                    <button
                      className={styles.hmDeleteBtn}
                      onClick={() => handleDelete(banner._id)}
                    >
                      <Trash2 size={16} /> Delete
                    </button>
                  </div>
                </li>
              ))
            )}
          </ul>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editId ? "Edit Banner" : "Add New Banner"}
      >
        <FormInput
          label="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <FormInput
          label="Subtitle"
          value={form.subtitle}
          onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
        />

        <FormInput
          label="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <FormInput
          label="Badge Text (optional)"
          value={form.badgeText}
          onChange={(e) => setForm({ ...form, badgeText: e.target.value })}
        />

        <div className={styles.hmUploadGroup}>
          <label className={styles.hmInputLabel}>Background Image</label>
          <input
            type="file"
            accept="image/*"
            className={styles.hmFileInput}
            disabled={uploading}
            onChange={(e) => handleFileUpload(e, "image")}
          />
        </div>
        {form.image && (
          <div className={styles.hmPreview}>
            <img src={form.image} alt="Background preview" />
          </div>
        )}

        <div className={styles.hmUploadGroup}>
          <label className={styles.hmInputLabel}>Mobile Image (optional)</label>
          <input
            type="file"
            accept="image/*"
            className={styles.hmFileInput}
            disabled={uploading}
            onChange={(e) => handleFileUpload(e, "mobileImage")}
          />
        </div>
        {form.mobileImage && (
          <div className={styles.hmPreview}>
            <img src={form.mobileImage} alt="Mobile preview" />
          </div>
        )}

        <div className={styles.hmFormGroup}>
          <label className={styles.hmInputLabel}>
            <input
              type="checkbox"
              checked={form.showButton}
              onChange={(e) => setForm({ ...form, showButton: e.target.checked })}
              style={{ marginRight: "0.4rem" }}
            />
            Show CTA Button
          </label>
        </div>

        {form.showButton && (
          <>
            <FormInput
              label="CTA Text"
              value={form.ctaText}
              onChange={(e) => setForm({ ...form, ctaText: e.target.value })}
            />
            <FormInput
              label="CTA URL"
              value={form.ctaUrl}
              onChange={(e) => setForm({ ...form, ctaUrl: e.target.value })}
            />
          </>
        )}

        <FormInput
          label="Display Order"
          type="number"
          value={form.order}
          onChange={(e) => setForm({ ...form, order: e.target.value })}
        />

        <div className={styles.hmFormGroup}>
          <label className={styles.hmInputLabel}>
            <input
              type="checkbox"
              checked={form.isActive}
              onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
              style={{ marginRight: "0.4rem" }}
            />
            Active (visible on homepage)
          </label>
        </div>

        <button className={styles.hmSaveBtn} onClick={handleSave} disabled={uploading}>
          {editId ? "Update" : "Save"}
        </button>
      </Modal>
    </AdminLayout>
  );
};

export default HeroManager;
