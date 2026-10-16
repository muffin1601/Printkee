"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Plus, Edit, Trash2, Search, Layers, Download, Upload } from "lucide-react";
import axios from "@/lib/api";
import AdminLayout from "../../components/Dashboard/AdminLayout";
import Modal from "../../components/Dashboard/Modal";
import FormInput from "../../components/Dashboard/FormInput";
import styles from "../../styles/admin/HeroManager.module.css";

const slugify = (value) =>
  value
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const emptyForm = {
  name: "",
  slug: "",
  description: { short: "", long: "" },
  price: "",
  salePrice: "",
  images: [],       // [{url, altText}]
  subImages: [],    // [{url, altText}]
  stock: 0,
  sku: "",
  attributes: { color: [], size: [], material: "", dimensions: "", weight: "", gsm: "", capacity: "", printingMethods: [], brandingAreas: [], packaging: "", moq: "", leadTime: "", sampleAvailability: "", customization: "", careInstructions: "" },
  additionalInfo: [], // [{label, value}]
  specifications: [], // [{key, value}]
  tags: "",           // comma string in UI
  isFeatured: false,
  isActive: true,
  status: "published",
  seo: { metaTitle: "", metaDescription: "", keywords: "" }, // comma in UI
  canonicalUrl: "",
  category: "",
  subcategory: "",
  __v: 0,
};

const ProductManager = () => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(25);
  const [totalItems, setTotalItems] = useState(0);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [selected, setSelected] = useState(new Set());
  const [selectAllMatching, setSelectAllMatching] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [importFile, setImportFile] = useState(null);
  const [importPreview, setImportPreview] = useState(null);
  const [bulkCategory, setBulkCategory] = useState("");
  const [bulkSubcategory, setBulkSubcategory] = useState("");

  const [categories, setCategories] = useState([]);
  const [subs, setSubs] = useState([]); // all subcategories (from /subcategories/all)

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [slugEdited, setSlugEdited] = useState(false);

  // Dependent subs filter by category
  const filteredSubs = useMemo(
    () => subs.filter(s => s.category?._id === form.category),
    [subs, form.category]
  );
  const bulkSubs = useMemo(
    () => subs.filter((subcategory) => subcategory.category?._id === bulkCategory),
    [subs, bulkCategory]
  );

  // Fetch list
  const fetchProducts = async (p = 1, q = search) => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/product/all`, {
        params: { page: p, limit, search: q, status: statusFilter || undefined, category: categoryFilter || undefined }
      });
      setItems(res.data.items);
      setPage(res.data.page);
      setTotalPages(res.data.totalPages || 1);
      setTotalItems(res.data.totalItems || 0);
      setSelected(new Set());
      setSelectAllMatching(false);
    } catch (error) {
      setMessage(error.response?.data?.message || "Products could not be loaded.");
    }
  };

  const fetchCategories = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/category/all`);
    setCategories(res.data);
  };

  const fetchSubs = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/subcategory/all`);
    setSubs(res.data);
  };

  useEffect(() => {
    fetchProducts(1, "");
    fetchCategories();
    fetchSubs();
  }, []);

  // Search submit
  const handleSearch = (e) => {
    e.preventDefault();
    fetchProducts(1, search);
  };

  // Open Add
  const openAdd = () => {
    setForm({ ...emptyForm });
    setEditId(null);
    setSlugEdited(false);
    setIsModalOpen(true);
  };

  // Save
  const handleSave = async () => {
    if (!form.name || !form.slug || form.price === "" || !form.category || !form.subcategory) {
      setMessage("Name, slug, price, category, and subcategory are required.");
      return;
    }

    const payload = {
      ...form,
      price: Number(form.price),
      salePrice: form.salePrice ? Number(form.salePrice) : null,
      tags: form.tags,
      seo: {
        ...form.seo,
        keywords: form.seo.keywords,
      },
    };

    if (busy) return;
    setBusy(true);
    setMessage("");
    try {
      if (editId) {
        await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/product/update/${editId}`, payload);
        setMessage("Product updated.");
      } else {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/product/create`, payload);
        setMessage("Product created.");
      }
      setIsModalOpen(false);
      await fetchProducts(editId ? page : 1, search);
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Product could not be saved.");
    } finally {
      setBusy(false);
    }
  };

  const handleEdit = (p) => {
    setEditId(p._id);
    // Only lock auto-slug if a real slug already exists — never silently
    // rewrite it. If the product has no slug at all (data gap), keep
    // auto-generating from the name like the Add flow does.
    setSlugEdited(!!p.slug);
    setForm({
      name: p.name,
      slug: p.slug || slugify(p.name || ""),
      description: { short: p.description?.short || "", long: p.description?.long || "" },
      price: p.price ?? "",
      salePrice: p.salePrice ?? "",
      images: p.images || [],
      subImages: p.subImages || [],
      stock: p.stock ?? 0,
      sku: p.sku || "",
      attributes: {
        color: p.attributes?.color || [],
        size: p.attributes?.size || [],
        material: p.attributes?.material || "",
        dimensions: p.attributes?.dimensions || "",
        weight: p.attributes?.weight || "",
        gsm: p.attributes?.gsm || "",
        capacity: p.attributes?.capacity || "",
        printingMethods: p.attributes?.printingMethods || [],
        brandingAreas: p.attributes?.brandingAreas || [],
        packaging: p.attributes?.packaging || "",
        moq: p.attributes?.moq || "",
        leadTime: p.attributes?.leadTime || "",
        sampleAvailability: p.attributes?.sampleAvailability || "",
        customization: p.attributes?.customization || "",
        careInstructions: p.attributes?.careInstructions || "",
      },
      additionalInfo: p.additionalInfo || [],
      specifications: p.specifications || [],
      tags: (p.tags || []).join(", "),
      isFeatured: !!p.isFeatured,
      isActive: !!p.isActive,
      status: p.status || (p.isActive ? "published" : "draft"),
      seo: {
        metaTitle: p.seo?.metaTitle || "",
        metaDescription: p.seo?.metaDescription || "",
        keywords: (p.seo?.keywords || []).join(", "),
      },
      canonicalUrl: p.canonicalUrl || "",
      category: p.category?._id || "",
      subcategory: p.subcategory?._id || "",
      __v: p.__v ?? 0,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Archive this product? It will be removed from the storefront.")) return;
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/product/delete/${id}`);
      setMessage("Product archived.");
      await fetchProducts(page, search);
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Product could not be archived.");
    }
  };

  const toggleSelected = (id) => {
    setSelectAllMatching(false);
    setSelected((previous) => {
      const next = new Set(previous);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const toggleVisible = () => {
    setSelectAllMatching(false);
    setSelected((previous) => {
      const allVisibleSelected = items.length > 0 && items.every((item) => previous.has(item._id));
      const next = new Set(previous);
      items.forEach((item) => allVisibleSelected ? next.delete(item._id) : next.add(item._id));
      return next;
    });
  };

  const runBulkAction = async (action, changes = {}) => {
    const count = selectAllMatching ? totalItems : selected.size;
    if (!count) return setMessage("Select at least one product.");
    if (action === "archive" && !confirm(`Archive ${count} product${count === 1 ? "" : "s"}?`)) return;
    setBusy(true);
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/product/bulk`, {
        ids: [...selected],
        allMatching: selectAllMatching,
        filters: { search, status: statusFilter, category: categoryFilter },
        action,
        changes,
      });
      setMessage(`${response.data.modified} of ${response.data.matched} products updated.`);
      await fetchProducts(page, search);
    } catch (error) {
      setMessage(error.response?.data?.message || "Bulk action failed.");
    } finally { setBusy(false); }
  };

  const downloadExport = async (format = "csv") => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/product/export/file`, {
        params: { format, ids: selected.size && !selectAllMatching ? [...selected].join(",") : undefined, search, status: statusFilter || undefined, category: categoryFilter || undefined },
        responseType: "blob",
      });
      const url = URL.createObjectURL(response.data);
      const link = document.createElement("a");
      link.href = url;
      link.download = `printkee-products.${format}`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      setMessage(error.response?.data?.message || "Export failed.");
    }
  };

  const previewImport = async () => {
    if (!importFile) return setMessage("Choose a CSV or XLSX file first.");
    const data = new FormData();
    data.append("file", importFile);
    setBusy(true);
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/product/import/preview`, data);
      setImportPreview(response.data);
      setMessage(`Validated ${response.data.totalRows} rows. Review the preview before importing.`);
    } catch (error) {
      setMessage(error.response?.data?.message || "Import preview failed.");
    } finally { setBusy(false); }
  };

  const commitImport = async (mode) => {
    if (!importFile || !importPreview) return;
    if (!confirm(`Import ${importPreview.totalRows} rows in ${mode} mode?`)) return;
    const data = new FormData();
    data.append("file", importFile);
    data.append("mode", mode);
    setBusy(true);
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/product/import/commit`, data);
      const result = response.data;
      setMessage(`Import complete: ${result.created} created, ${result.updated} updated, ${result.skipped} skipped, ${result.failed} failed.`);
      setImportPreview(result);
      await fetchProducts(1, search);
    } catch (error) {
      setMessage(error.response?.data?.message || "Import failed.");
    } finally { setBusy(false); }
  };

  const downloadImportErrors = () => {
    const errors = importPreview?.errors || [];
    if (!errors.length) return;
    const csv = ["row,message", ...errors.map((error) => `${error.row},"${String(error.message).replace(/"/g, '""')}"`)].join("\r\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "printkee-product-import-errors.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  // ---- Upload helpers ----
  const uploadSingle = async (file) => {
    const fd = new FormData();
    fd.append("image", file);
    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/product/upload`, fd, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data.url;
  };

  const handleUploadPrimary = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    try {
      const urls = [];
      for (const f of files) {
        const url = await uploadSingle(f);
        urls.push({ url, altText: "" });
      }
      setForm((prev) => ({ ...prev, images: [...prev.images, ...urls] }));
      alert("Primary images uploaded ✅");
    } catch (err) {
      console.error(err);
      alert("Upload failed ❌");
    }
  };

  const handleUploadSecondary = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    try {
      const urls = [];
      for (const f of files) {
        const url = await uploadSingle(f);
        urls.push({ url, altText: "" });
      }
      setForm((prev) => ({ ...prev, subImages: [...prev.subImages, ...urls] }));
      alert("Sub images uploaded ✅");
    } catch (err) {
      console.error(err);
      alert("Upload failed ❌");
    }
  };

  // ---- Dynamic arrays handlers ----
  const addKV = (field) =>
    setForm((p) => ({ ...p, [field]: [...p[field], { label: "", value: "" }] }));

  const updateKV = (field, idx, key, value) => {
    setForm((p) => {
      const next = [...p[field]];
      next[idx] = { ...next[idx], [key]: value };
      return { ...p, [field]: next };
    });
  };

  const removeKV = (field, idx) =>
    setForm((p) => ({ ...p, [field]: p[field].filter((_, i) => i !== idx) }));

  const addSpec = () =>
    setForm((p) => ({ ...p, specifications: [...p.specifications, { key: "", value: "" }] }));
  const updateSpec = (idx, key, value) => {
    setForm((p) => {
      const next = [...p.specifications];
      next[idx] = { ...next[idx], [key]: value };
      return { ...p, specifications: next };
    });
  };
  const removeSpec = (idx) =>
    setForm((p) => ({ ...p, specifications: p.specifications.filter((_, i) => i !== idx) }));

  const removeImage = (field, idx) =>
    setForm((p) => ({ ...p, [field]: p[field].filter((_, i) => i !== idx) }));

  const updateImageAlt = (field, idx, value) =>
    setForm((p) => {
      const next = [...p[field]];
      next[idx] = { ...next[idx], altText: value };
      return { ...p, [field]: next };
    });

  const setArrayFromComma = (field, value) => {
    const arr = value.split(",").map(s => s.trim()).filter(Boolean);
    setForm((p) => ({ ...p, attributes: { ...p.attributes, [field]: arr } }));
  };

  // ---- Pagination UI helpers ----
  const goTo = (p) => {
    if (p < 1 || p > totalPages) return;
    fetchProducts(p, search);
  };

  return (
    <AdminLayout>
      <div className={styles.hmWrapper}>
        <div className={styles.hmHeader}>
          <h3 className={styles.hmTitle}><Layers size={18} /> Product Manager</h3>

          <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
            <form onSubmit={handleSearch} style={{ display: "flex", gap: 8 }}>
              <input
                placeholder="Search name/slug/sku/tags"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={styles.hmSelect}
                style={{ width: 260 }}
              />
              <button className={styles.hmAddBtn} type="submit"><Search size={16}/> Search</button>
            </form>

            <button className={styles.hmAddBtn} onClick={openAdd}>
              <Plus size={16}/> Add Product
            </button>
          </div>
        </div>

        <p className={styles.hmDescription}>Manage {totalItems.toLocaleString()} products, media, attributes, and SEO.</p>
        {message && <div role="status" style={{ marginBottom: 12, padding: 10, border: "1px solid #d8cbed", background: "#fff" }}>{message}</div>}

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
          <select className={styles.hmSelect} value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} aria-label="Filter by status">
            <option value="">All statuses</option><option value="published">Published</option><option value="draft">Draft</option><option value="archived">Archived</option>
          </select>
          <select className={styles.hmSelect} value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} aria-label="Filter by category">
            <option value="">All categories</option>
            {categories.map((category) => <option value={category._id} key={category._id}>{category.name}</option>)}
          </select>
          <button className={styles.hmAddBtn} onClick={() => fetchProducts(1, search)} disabled={busy}>Apply filters</button>
          <button className={styles.hmAddBtn} onClick={() => downloadExport("csv")}><Download size={15}/> CSV</button>
          <button className={styles.hmAddBtn} onClick={() => downloadExport("xlsx")}><Download size={15}/> XLSX</button>
        </div>

        <div style={{ border: "1px solid #d8cbed", padding: 12, marginBottom: 12, background: "#fff" }}>
          <strong>Import products</strong>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 8, alignItems: "center" }}>
            <input type="file" accept=".csv,.xlsx" onChange={(event) => { setImportFile(event.target.files?.[0] || null); setImportPreview(null); }}/>
            <button className={styles.hmAddBtn} onClick={previewImport} disabled={busy}><Upload size={15}/> Preview</button>
            {importPreview?.totalRows !== undefined && <>
              <button className={styles.hmAddBtn} onClick={() => commitImport("create")} disabled={busy}>Create only</button>
              <button className={styles.hmAddBtn} onClick={() => commitImport("update")} disabled={busy}>Update only</button>
              <button className={styles.hmAddBtn} onClick={() => commitImport("upsert")} disabled={busy}>Create or update</button>
            </>}
          </div>
          {importPreview?.preview && <p style={{ margin: "8px 0 0", fontSize: 13 }}>Previewed {importPreview.preview.length} rows; {importPreview.preview.filter((row) => row.errors.length).length} have validation errors.</p>}
          {importPreview?.errors?.length > 0 && <div style={{ marginTop: 8, fontSize: 13 }}>
            <p>{importPreview.errors.length} row errors. First: row {importPreview.errors[0].row} — {importPreview.errors[0].message}</p>
            <button className={styles.hmAddBtn} onClick={downloadImportErrors}><Download size={15}/> Error report</button>
          </div>}
        </div>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12, alignItems: "center" }}>
          <label><input type="checkbox" checked={items.length > 0 && items.every((item) => selected.has(item._id))} onChange={toggleVisible}/> Select visible</label>
          {(selected.size > 0 || selectAllMatching) && <>
            <strong>{selectAllMatching ? totalItems : selected.size} selected</strong>
            {!selectAllMatching && totalItems > selected.size && <button className={styles.hmAddBtn} onClick={() => { if (confirm(`Select all ${totalItems} matching products?`)) setSelectAllMatching(true); }}>Select all matching</button>}
            <button className={styles.hmAddBtn} onClick={() => runBulkAction("publish")} disabled={busy}>Publish</button>
            <button className={styles.hmAddBtn} onClick={() => runBulkAction("unpublish")} disabled={busy}>Unpublish</button>
            <button className={styles.hmAddBtn} onClick={() => runBulkAction("archive")} disabled={busy}>Archive</button>
            <button className={styles.hmAddBtn} onClick={() => { const value = prompt("Set MOQ for selected products:"); if (value !== null) runBulkAction("moq", { moq: value }); }} disabled={busy}>Set MOQ</button>
            <button className={styles.hmAddBtn} onClick={() => {
              const operation = prompt("Price operation: set, increase_percent, decrease_percent, increase_fixed, or decrease_fixed", "set");
              if (!operation) return;
              const value = prompt("Price value:");
              if (value !== null) runBulkAction("price", { operation, value });
            }} disabled={busy}>Adjust price</button>
            <button className={styles.hmAddBtn} onClick={() => { const tags = prompt("Replace tags (comma separated):"); if (tags !== null) runBulkAction("tags", { tags }); }} disabled={busy}>Set tags</button>
            <button className={styles.hmAddBtn} onClick={() => {
              const metaTitle = prompt("SEO title (leave blank to clear):");
              if (metaTitle === null) return;
              const metaDescription = prompt("SEO description (leave blank to clear):");
              if (metaDescription !== null) runBulkAction("seo", { metaTitle, metaDescription });
            }} disabled={busy}>Set SEO</button>
            <select value={bulkCategory} onChange={(e) => { setBulkCategory(e.target.value); setBulkSubcategory(""); }} className={styles.hmSelect} aria-label="Bulk category">
              <option value="">Move to category…</option>
              {categories.map((category) => <option key={category._id} value={category._id}>{category.name}</option>)}
            </select>
            <select value={bulkSubcategory} onChange={(e) => setBulkSubcategory(e.target.value)} className={styles.hmSelect} aria-label="Bulk subcategory" disabled={!bulkCategory}>
              <option value="">Choose subcategory…</option>
              {bulkSubs.map((subcategory) => <option key={subcategory._id} value={subcategory._id}>{subcategory.name}</option>)}
            </select>
            <button className={styles.hmAddBtn} onClick={() => runBulkAction("category", { category: bulkCategory, subcategory: bulkSubcategory })} disabled={busy || !bulkSubcategory}>Move</button>
          </>}
        </div>

        {/* List */}
        <ul className={styles.hmSlideList}>
          {items.length === 0 ? (
            <li className={styles.hmEmpty}>No products found.</li>
          ) : items.map((p) => (
            <li className={styles.hmSlideItem} key={p._id}>
              <input type="checkbox" checked={selected.has(p._id)} onChange={() => toggleSelected(p._id)} aria-label={`Select ${p.name}`}/>
              <div className={styles.hmSlideInfo}>
                <strong className={styles.hmSlideTitle}>{p.name}</strong>
                <div className={styles.hmSlideType}>₹{p.price}{p.salePrice ? ` (Sale: ₹${p.salePrice})` : ""}</div>
                <div className={styles.hmSlideSub}>
                  {p.category?.name} {p.subcategory ? `› ${p.subcategory?.name}` : ""} • SKU: {p.sku || "N/A"}
                </div>
                <div className={styles.hmSlideSub}>Status: {p.status || (p.isActive ? "published" : "draft")}</div>
              </div>

              <div className={styles.hmSlideActions}>
                <button className={styles.hmEditBtn} onClick={() => handleEdit(p)}>
                  <Edit size={16}/> Edit
                </button>
                <button className={styles.hmDeleteBtn} onClick={() => handleDelete(p._id)}>
                  <Trash2 size={16}/> Archive
                </button>
              </div>
            </li>
          ))}
        </ul>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className={styles.paginationContainer}>

            {/* Prev */}
            <button className={styles.pgBtn} onClick={() => goTo(page - 1)} disabled={page === 1}>
              ◀ Prev
            </button>

            {/* Page Numbers with Ellipsis */}
            {(() => {
              const btns = [];
              const total = totalPages;

              const addBtn = (p) =>
                btns.push(
                  <button
                    key={p}
                    className={`${styles.pgNumber} ${page === p ? styles.active : ""}`}
                    onClick={() => goTo(p)}
                  >
                    {p}
                  </button>
                );

              // Always show 1
              if (page > 3) {
                addBtn(1);
                btns.push(<span key="dots-left" className={styles.pgDots}>...</span>);
              }

              // Middle range (visible pages)
              const start = Math.max(1, page - 1);
              const end = Math.min(total, page + 1);

              for (let p = start; p <= end; p++) {
                addBtn(p);
              }

              // Always show last
              if (page < total - 2) {
                btns.push(<span key="dots-right" className={styles.pgDots}>...</span>);
                addBtn(total);
              }

              return btns;
            })()}

            {/* Next */}
            <button className={styles.pgBtn} onClick={() => goTo(page + 1)} disabled={page === totalPages}>
              Next ▶
            </button>
          </div>
        )}
      </div>

      {/* Editor Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editId ? "Edit Product" : "Add Product"}
      >
        {/* BASIC INFO */}
        <h4>Basic Info</h4>
        <FormInput
          label="Name"
          value={form.name}
          onChange={(e) => {
            const name = e.target.value;
            setForm((prev) => ({
              ...prev,
              name,
              slug: slugEdited ? prev.slug : slugify(name),
            }));
          }}
        />
        <FormInput
          label="Slug"
          value={form.slug}
          onChange={(e) => {
            setSlugEdited(true);
            setForm({ ...form, slug: e.target.value });
          }}
        />
        <FormInput label="Short Description" value={form.description.short} onChange={(e) => setForm({ ...form, description: { ...form.description, short: e.target.value }})}/>
        <div className={styles.hmFormGroup}>
          <label className={styles.hmInputLabel}>Long Description</label>
          <textarea
            rows={4}
            className={styles.hmSelect}
            value={form.description.long}
            onChange={(e) => setForm({ ...form, description: { ...form.description, long: e.target.value }})}
          />
        </div>

        {/* PRICING */}
        <h4 style={{ marginTop: 16 }}>Pricing</h4>
        <FormInput label="Price" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })}/>
        <FormInput label="Sale Price (optional)" type="number" value={form.salePrice} onChange={(e) => setForm({ ...form, salePrice: e.target.value })}/>

        {/* CATEGORY/SUB */}
        <h4 style={{ marginTop: 16 }}>Categorization</h4>
        <div className={styles.hmFormGroup}>
          <label className={styles.hmInputLabel}>Category</label>
          <select className={styles.hmSelect} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value, subcategory: "" })}>
            <option value="">-- Select Category --</option>
            {categories.map(c => <option value={c._id} key={c._id}>{c.name}</option>)}
          </select>
        </div>
        <div className={styles.hmFormGroup}>
          <label className={styles.hmInputLabel}>Subcategory</label>
          <select className={styles.hmSelect} value={form.subcategory} onChange={(e) => setForm({ ...form, subcategory: e.target.value })}>
            <option value="">-- Select Subcategory --</option>
            {filteredSubs.map(s => <option value={s._id} key={s._id}>{s.name}</option>)}
          </select>
        </div>

        {/* MEDIA */}
        <h4 style={{ marginTop: 16 }}>Media</h4>
        <div className={styles.hmUploadGroup}>
          <label className={styles.hmInputLabel}>Upload Primary Images</label>
          <input type="file" accept="image/*" multiple onChange={handleUploadPrimary}/>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
          {form.images.map((img, i) => (
            <div key={i} style={{ border: "1px solid #e4e4e4", padding: 8 }}>
              <img src={img.url} alt="" style={{ width: "100%", height: 100, objectFit: "cover" }}/>
              <FormInput label="Alt text" value={img.altText} onChange={(e) => updateImageAlt("images", i, e.target.value)}/>
              <button className={styles.hmDeleteBtn} onClick={() => removeImage("images", i)}>Remove</button>
            </div>
          ))}
        </div>

        <div className={styles.hmUploadGroup} style={{ marginTop: 10 }}>
          <label className={styles.hmInputLabel}>Upload Sub Images</label>
          <input type="file" accept="image/*" multiple onChange={handleUploadSecondary}/>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
          {form.subImages.map((img, i) => (
            <div key={i} style={{ border: "1px solid #e4e4e4", padding: 8 }}>
              <img src={img.url} alt="" style={{ width: "100%", height: 100, objectFit: "cover" }}/>
              <FormInput label="Alt text" value={img.altText} onChange={(e) => updateImageAlt("subImages", i, e.target.value)}/>
              <button className={styles.hmDeleteBtn} onClick={() => removeImage("subImages", i)}>Remove</button>
            </div>
          ))}
        </div>

        {/* ATTRIBUTES */}
        <h4 style={{ marginTop: 16 }}>Attributes</h4>
        <FormInput label="Colors (comma separated)" value={form.attributes.color.join(", ")} onChange={(e) => setArrayFromComma("color", e.target.value)}/>
        <FormInput label="Sizes (comma separated)" value={form.attributes.size.join(", ")} onChange={(e) => setArrayFromComma("size", e.target.value)}/>
        <FormInput label="Material" value={form.attributes.material} onChange={(e) => setForm({ ...form, attributes: { ...form.attributes, material: e.target.value }})}/>
        <FormInput label="Dimensions" value={form.attributes.dimensions} onChange={(e) => setForm({ ...form, attributes: { ...form.attributes, dimensions: e.target.value }})}/>
        <FormInput label="Weight" value={form.attributes.weight} onChange={(e) => setForm({ ...form, attributes: { ...form.attributes, weight: e.target.value }})}/>
        <FormInput label="GSM" value={form.attributes.gsm} onChange={(e) => setForm({ ...form, attributes: { ...form.attributes, gsm: e.target.value }})}/>
        <FormInput label="Capacity" value={form.attributes.capacity} onChange={(e) => setForm({ ...form, attributes: { ...form.attributes, capacity: e.target.value }})}/>
        <FormInput label="Printing methods (comma separated)" value={form.attributes.printingMethods.join(", ")} onChange={(e) => setArrayFromComma("printingMethods", e.target.value)}/>
        <FormInput label="Branding areas (comma separated)" value={form.attributes.brandingAreas.join(", ")} onChange={(e) => setArrayFromComma("brandingAreas", e.target.value)}/>
        <FormInput label="Packaging" value={form.attributes.packaging} onChange={(e) => setForm({ ...form, attributes: { ...form.attributes, packaging: e.target.value }})}/>
        <FormInput label="MOQ (approved wording only)" value={form.attributes.moq} onChange={(e) => setForm({ ...form, attributes: { ...form.attributes, moq: e.target.value }})}/>
        <FormInput label="Lead time (approved wording only)" value={form.attributes.leadTime} onChange={(e) => setForm({ ...form, attributes: { ...form.attributes, leadTime: e.target.value }})}/>
        <FormInput label="Sample availability" value={form.attributes.sampleAvailability} onChange={(e) => setForm({ ...form, attributes: { ...form.attributes, sampleAvailability: e.target.value }})}/>
        <FormInput label="Customization" value={form.attributes.customization} onChange={(e) => setForm({ ...form, attributes: { ...form.attributes, customization: e.target.value }})}/>
        <FormInput label="Care instructions" value={form.attributes.careInstructions} onChange={(e) => setForm({ ...form, attributes: { ...form.attributes, careInstructions: e.target.value }})}/>

        {/* INVENTORY */}
        <h4 style={{ marginTop: 16 }}>Inventory</h4>
        <FormInput label="SKU" value={form.sku} onChange={(e) => setForm({ ...form, sku: e.target.value })}/>
        <FormInput label="Stock" type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })}/>
        <div style={{ display: "flex", gap: 12, marginTop: 8, alignItems: "center" }}>
          <label>Status&nbsp;
            <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value, isActive: e.target.value === "published" })}>
              <option value="draft">Draft</option><option value="published">Published</option><option value="archived">Archived</option>
            </select>
          </label>
          <label><input type="checkbox" checked={form.isFeatured} onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })}/> Featured</label>
        </div>

        {/* SEO */}
        <h4 style={{ marginTop: 16 }}>SEO</h4>
        <FormInput label="Meta Title" value={form.seo.metaTitle} onChange={(e) => setForm({ ...form, seo: { ...form.seo, metaTitle: e.target.value }})}/>
        <FormInput label="Meta Description" value={form.seo.metaDescription} onChange={(e) => setForm({ ...form, seo: { ...form.seo, metaDescription: e.target.value }})}/>
        <FormInput label="Keywords (comma separated)" value={form.seo.keywords} onChange={(e) => setForm({ ...form, seo: { ...form.seo, keywords: e.target.value }})}/>
        <FormInput label="Canonical URL (optional)" value={form.canonicalUrl} onChange={(e) => setForm({ ...form, canonicalUrl: e.target.value })}/>

        {/* ADDITIONAL INFO */}
        <h4 style={{ marginTop: 16 }}>Additional Info</h4>
        <button className={styles.hmAddBtn} onClick={() => addKV("additionalInfo")}><Plus size={14}/> Add Row</button>
        {form.additionalInfo.map((row, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr auto", gap: 8, marginTop: 8 }}>
            <FormInput label="Label" value={row.label} onChange={(e) => updateKV("additionalInfo", i, "label", e.target.value)}/>
            <FormInput label="Value" value={row.value} onChange={(e) => updateKV("additionalInfo", i, "value", e.target.value)}/>
            <button className={styles.hmDeleteBtn2} onClick={() => removeKV("additionalInfo", i)}>Remove</button>
          </div>
        ))}

        {/* SPECIFICATIONS */}
        <h4 style={{ marginTop: 16 }}>Specifications</h4>
        <button className={styles.hmAddBtn} onClick={addSpec}><Plus size={14}/> Add Spec</button>
        {form.specifications.map((row, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr auto", gap: 8, marginTop: 8 }}>
            <FormInput label="Key" value={row.key} onChange={(e) => updateSpec(i, "key", e.target.value)}/>
            <FormInput label="Value" value={row.value} onChange={(e) => updateSpec(i, "value", e.target.value)}/>
            <button className={styles.hmDeleteBtn} onClick={() => removeSpec(i)}>Remove</button>
          </div>
        ))}

        {/* TAGS */}
        <h4 style={{ marginTop: 16 }}>Tags</h4>
        <FormInput label="Tags (comma separated)" value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })}/>

        <button className={styles.hmSaveBtn} style={{ marginTop: 16 }} onClick={handleSave} disabled={busy}>
          {busy ? "Saving…" : editId ? "Update" : "Save"}
        </button>
      </Modal>
    </AdminLayout>
  );
};

export default ProductManager;
