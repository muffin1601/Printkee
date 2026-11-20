"use client";
import { useEffect, useRef, useState } from "react";
import Sidebar from "../../../components/Dashboard/Sidebar";
import AdminNavbar from "../../../components/Dashboard/Navbar";
import DashboardFooter from "../../../components/Dashboard/DashboardFooter";
import api from "../../../lib/api";
import { MAX_ROW_ITEMS, defaultSettings, legacyProducts } from "../../../data/new-year-page-layout";
import styles from "../../../styles/admin/NewYearManager.module.css";

const API = process.env.NEXT_PUBLIC_API_URL;
const errorMessage = (error) => error.response?.data?.message || error.message || "Something went wrong. Please try again.";
const randomHex = (bytes) => Array.from(crypto.getRandomValues(new Uint8Array(bytes)), (b) => b.toString(16).padStart(2, "0")).join("");
const normalise = (settings) => ({ customProducts: [], deletedProducts: [], productOverrides: [], ...settings });

export default function NewYearManagerPage() {
  const [settings, setSettings] = useState(null);
  const [known, setKnown] = useState(() => Object.fromEntries(legacyProducts.map((p) => [p.id, p])));
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [dirty, setDirty] = useState(false);
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [source, setSource] = useState("collection");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [searching, setSearching] = useState(false);
  const [targetRow, setTargetRow] = useState("");
  const [newName, setNewName] = useState("");
  const [newFile, setNewFile] = useState(null);
  const [editing, setEditing] = useState(null);
  const [editPreview, setEditPreview] = useState("");
  const searchVersion = useRef(0);
  const editForm = useRef(null);

  useEffect(() => {
    if (editing) editForm.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [editing?.id]);

  useEffect(() => {
    if (!editing?.file) { setEditPreview(""); return; }
    const url = URL.createObjectURL(editing.file);
    setEditPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [editing?.file]);

  const remember = (items) => setKnown((previous) => ({ ...previous, ...Object.fromEntries(items.map((p) => [p.id, p])) }));
  const load = async () => {
    setError("");
    try {
      const { data } = await api.get(`${API}/new-year-page/admin`);
      setSettings(normalise(data.settings || defaultSettings()));
      remember(data.products || []);
      setDirty(false);
    } catch (err) { setError(errorMessage(err)); }
  };
  useEffect(() => { load(); }, []);
  useEffect(() => {
    if (!dirty && !editing) return;
    const warn = (event) => { event.preventDefault(); event.returnValue = ""; };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty, !!editing]);

  const layout = settings?.layout || [];
  const customProducts = settings?.customProducts || [];
  const deletedProducts = settings?.deletedProducts || [];
  const productOverrides = settings?.productOverrides || [];
  const placed = new Set(layout.flatMap((row) => row.items));
  const deletedSet = new Set(deletedProducts);
  const lookup = { ...known, ...Object.fromEntries(customProducts.map((c) => [`custom:${c.id}`, { id: `custom:${c.id}`, name: c.name, image: c.image, available: true }])) };
  for (const override of productOverrides) {
    if (lookup[override.id]) lookup[override.id] = { ...lookup[override.id], ...override };
  }
  const rowLabel = (row, index) => `Row ${index + 1}${row.title ? `: ${row.title}` : ""}`;
  const target = layout.find((row) => row.id === targetRow) || layout[0];

  useEffect(() => {
    const version = ++searchVersion.current;
    if (source !== "database") { setSearching(false); return; }
    setSearching(true);
    const timeout = setTimeout(async () => {
      try {
        const { data } = await api.get(`${API}/product/all`, { params: { search: query, page, limit: 25, status: "published" } });
        if (version !== searchVersion.current) return;
        const items = data.items.filter((p) => p.isActive && p.images?.[0]?.url).map((p) => ({
          id: legacyProducts.some((legacy) => legacy.id === `legacy:${p.slug}`) ? `legacy:${p.slug}` : `product:${p._id}`,
          name: p.name, image: p.images[0].url, sku: p.sku || "", available: true,
        }));
        setResults(items); remember(items); setPages(data.totalPages || 1);
      } catch (err) { if (version === searchVersion.current) setError(errorMessage(err)); }
      finally { if (version === searchVersion.current) setSearching(false); }
    }, 300);
    return () => { clearTimeout(timeout); ++searchVersion.current; };
  }, [source, query, page]);

  const change = (next) => { setSettings(next); setDirty(true); setMessage(""); setError(""); };
  const withoutItem = (rows, id) => rows.map((row) => ({ ...row, items: row.items.filter((item) => item !== id) }));
  const setRows = (rows, extra = {}) => change({ ...settings, ...extra, layout: rows });

  const place = (id, rowId) => {
    const row = layout.find((r) => r.id === rowId);
    if (!row || !lookup[id]) return;
    if (row.items.filter((item) => item !== id).length >= MAX_ROW_ITEMS) { setError(`A row holds at most ${MAX_ROW_ITEMS} products.`); return; }
    const rows = withoutItem(layout, id).map((r) => (r.id === rowId ? { ...r, items: [...r.items, id] } : r));
    setRows(rows);
  };
  const moveItem = (rowId, index, direction) => setRows(layout.map((row) => {
    if (row.id !== rowId) return row;
    const items = [...row.items];
    [items[index], items[index + direction]] = [items[index + direction], items[index]];
    return { ...row, items };
  }));
  const deleteItem = (id) => {
    const product = lookup[id];
    const custom = id.startsWith("custom:");
    const text = custom
      ? `Delete "${product?.name}" and its image? This takes effect when you save and cannot be undone.`
      : `Delete "${product?.name || id}" from this page? It stays in the product catalogue, and you can restore it later from "Deleted products".`;
    if (!window.confirm(text)) return;
    if (editing?.id === id) setEditing(null);
    if (custom) {
      setRows(withoutItem(layout, id), { customProducts: customProducts.filter((c) => `custom:${c.id}` !== id) });
    } else {
      setRows(withoutItem(layout, id), { deletedProducts: [...deletedProducts, id] });
    }
  };
  const restoreItem = (id) => change({ ...settings, deletedProducts: deletedProducts.filter((item) => item !== id) });

  const startEditing = (product) => {
    setEditing({ id: product.id, name: product.name, image: product.image, file: null });
    setError(""); setMessage("");
  };
  const applyProductEdit = async (event) => {
    event.preventDefault();
    const name = editing.name.trim();
    if (!name) { setError("Enter a product name."); return; }
    const file = editing.file;
    if (file && (file.size > 5 * 1024 * 1024 || !["image/jpeg", "image/png", "image/webp"].includes(file.type))) {
      setError("Choose a JPEG, PNG or WebP image up to 5 MB."); return;
    }
    setUploading(true); setError("");
    try {
      let image = editing.image;
      if (file) {
        const body = new FormData(); body.append("file", file);
        const { data } = await api.post(`${API}/new-year-page/upload`, body);
        image = data.url;
      }
      if (editing.id.startsWith("custom:")) {
        change({ ...settings, customProducts: customProducts.map((product) => `custom:${product.id}` === editing.id ? { ...product, name, image } : product) });
      } else {
        const previous = productOverrides.find((product) => product.id === editing.id);
        const override = { ...previous, id: editing.id, name, ...(file ? { image } : {}) };
        change({ ...settings, productOverrides: [...productOverrides.filter((product) => product.id !== editing.id), override] });
      }
      setEditing(null);
    } catch (err) { setError(errorMessage(err)); }
    finally { setUploading(false); }
  };
  const productEditor = (id) => editing?.id === id && (
    <form ref={editForm} className={styles.productEditor} onSubmit={applyProductEdit}>
      <h3>Edit product</h3>
      <p>Changes apply only to this New Year page. Apply the edit, then select Save changes.</p>
      <label>Product name<input autoFocus required maxLength={120} value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} /></label>
      <label>Replace product image<input type="file" accept="image/jpeg,image/png,image/webp" onChange={(e) => setEditing({ ...editing, file: e.target.files?.[0] || null })} /></label>
      <p>JPEG, PNG or WebP, up to 5 MB. Leave empty to keep the current image.</p>
      {(editPreview || editing.image) && <img className={styles.editPreview} src={editPreview || editing.image} alt="Product image preview" width={120} height={120} />}
      <div className={styles.actions}>
        <button type="submit">{uploading ? "Uploading..." : "Apply edit"}</button>
        <button type="button" onClick={() => setEditing(null)}>Cancel</button>
      </div>
    </form>
  );

  const addRow = () => {
    const id = `row-${Date.now().toString(36)}${randomHex(2)}`;
    setRows([...layout, { id, title: "", items: [] }]);
    setTargetRow(id);
  };
  const updateRow = (rowId, patch) => setRows(layout.map((row) => (row.id === rowId ? { ...row, ...patch } : row)));
  const moveRow = (index, direction) => {
    const rows = [...layout];
    [rows[index], rows[index + direction]] = [rows[index + direction], rows[index]];
    setRows(rows);
  };
  const removeRow = (row) => {
    if (row.items.length && !window.confirm("Remove this row? Its products are not deleted; add them to another row afterwards.")) return;
    setRows(layout.filter((r) => r.id !== row.id));
  };

  const upload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    event.target.value = "";
    if (file.size > 5 * 1024 * 1024 || !["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setError("Choose a JPEG, PNG or WebP image up to 5 MB."); return;
    }
    setUploading(true); setError("");
    const localUrl = URL.createObjectURL(file);
    try {
      const image = new window.Image();
      image.src = localUrl;
      await image.decode();
      const form = new FormData(); form.append("file", file);
      const { data } = await api.post(`${API}/new-year-page/upload`, form);
      change({ ...settings, bannerMode: "custom", banner: {
        url: data.url, width: image.naturalWidth, height: image.naturalHeight,
        alt: settings.banner?.alt || "Printkee New Year 2027 corporate gifting collection",
      } });
    } catch (err) { setError(errorMessage(err)); }
    finally { URL.revokeObjectURL(localUrl); setUploading(false); }
  };
  const createProduct = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const name = newName.trim();
    if (!target) { setError("Add a row first."); return; }
    if (target.items.length >= MAX_ROW_ITEMS) { setError(`${rowLabel(target, layout.indexOf(target))} is full. Choose another row or add a new one.`); return; }
    if (!name) { setError("Enter a product name."); return; }
    if (!newFile) { setError("Choose a product image."); return; }
    if (newFile.size > 5 * 1024 * 1024 || !["image/jpeg", "image/png", "image/webp"].includes(newFile.type)) {
      setError("Choose a JPEG, PNG or WebP image up to 5 MB."); return;
    }
    setUploading(true); setError("");
    try {
      const body = new FormData(); body.append("file", newFile);
      const { data } = await api.post(`${API}/new-year-page/upload`, body);
      const id = randomHex(12);
      change({
        ...settings,
        customProducts: [...customProducts, { id, name, image: data.url }],
        layout: layout.map((row) => (row.id === target.id ? { ...row, items: [...row.items, `custom:${id}`] } : row)),
      });
      setNewName(""); setNewFile(null); form.reset();
    } catch (err) { setError(errorMessage(err)); }
    finally { setUploading(false); }
  };
  const save = async () => {
    setBusy(true); setError(""); setMessage("");
    try {
      const { data } = await api.put(`${API}/new-year-page/admin`, {
        layout, bannerMode: settings.bannerMode, banner: settings.banner, customProducts, deletedProducts, productOverrides,
      });
      setSettings(normalise(data.settings)); remember(data.products || []); setDirty(false);
      setMessage("Saved. The New Year page will use these settings on its next load.");
    } catch (err) { setError(errorMessage(err)); }
    finally { setBusy(false); }
  };

  const q = query.toLowerCase();
  const visible = (p) => p && p.available !== false && !placed.has(p.id) && !deletedSet.has(p.id) && p.name.toLowerCase().includes(q);
  const choices = source === "database" ? results.map((p) => lookup[p.id] || p).filter(visible)
    : source === "custom" ? customProducts.map((c) => lookup[`custom:${c.id}`]).filter(visible)
      : source === "deleted" ? deletedProducts.map((id) => lookup[id] || { id, name: id, image: "" }).filter((p) => p.name.toLowerCase().includes(q))
        : legacyProducts.map((product) => lookup[product.id] || product).filter(visible);
  const bannerUrl = settings?.bannerMode === "default" ? "/printkee-new-yea-banner.webp" : settings?.bannerMode === "custom" ? settings.banner?.url : "";

  return (
    <div className="ad-dashboard-layout">
      <Sidebar />
      <div className="ad-main-content">
        <AdminNavbar />
        <div className="ad-dashboard-content">
          <div className={styles.manager}>
            <header className={styles.header}>
              <div><h1>New Year 2027 page</h1><p>Manage the banner and the rows of products. Each row shows up to {MAX_ROW_ITEMS} products.</p></div>
              <a href="/new-year-2027" target="_blank" rel="noopener noreferrer">View public page</a>
            </header>
            {error && <p role="alert" className={styles.error}>{error}</p>}
            {message && <p role="status" className={styles.success}>{message}</p>}
            {!settings ? <div className={styles.panel}><p>{error ? "The editor could not load." : "Loading page settings..."}</p>{error && <button onClick={load}>Retry</button>}</div> : (
              <>
                <fieldset disabled={busy || uploading} className={styles.editor}>
                  <section className={styles.panel} aria-labelledby="banner-heading">
                    <h2 id="banner-heading">Hero banner</h2>
                    <label>Banner display
                      <select aria-label="Banner display" value={settings.bannerMode} onChange={(e) => change({ ...settings, bannerMode: e.target.value })}>
                        <option value="default">Use the existing project banner</option>
                        <option value="custom">Use an uploaded banner</option>
                        <option value="none">Show a simple text introduction</option>
                      </select>
                    </label>
                    <label>Upload replacement banner<input type="file" accept="image/jpeg,image/png,image/webp" onChange={upload} /></label>
                    <p>JPEG, PNG or WebP, up to 5 MB. The complete image scales to the screen without cropping. Uploading takes effect after Save changes.</p>
                    {uploading && <p role="status">Uploading...</p>}
                    {settings.bannerMode === "custom" && <label>Banner alternative text<input maxLength={500} value={settings.banner?.alt || ""} onChange={(e) => change({ ...settings, banner: { ...settings.banner, alt: e.target.value } })} /></label>}
                    {bannerUrl && <img className={styles.banner} src={bannerUrl} alt={settings.bannerMode === "custom" ? settings.banner?.alt : "Existing New Year banner"} />}
                    {settings.bannerMode === "custom" && !settings.banner?.url && <p>Upload a banner before saving this option.</p>}
                  </section>

                  {editing && productEditor(editing.id)}

                  {layout.map((row, rowIndex) => (
                    <section key={row.id} className={styles.panel} aria-labelledby={`${row.id}-heading`}>
                      <h2 id={`${row.id}-heading`}>Row {rowIndex + 1}</h2>
                      <div className={styles.rowHead}>
                        <input aria-label={`Title for row ${rowIndex + 1}`} maxLength={120} value={row.title} placeholder="Row title (optional, shown above the row)" onChange={(e) => updateRow(row.id, { title: e.target.value })} />
                        <button aria-label={`Move row ${rowIndex + 1} up`} disabled={rowIndex === 0} onClick={() => moveRow(rowIndex, -1)}>&uarr;</button>
                        <button aria-label={`Move row ${rowIndex + 1} down`} disabled={rowIndex === layout.length - 1} onClick={() => moveRow(rowIndex, 1)}>&darr;</button>
                        <button className={styles.danger} onClick={() => removeRow(row)}>Remove row</button>
                      </div>
                      <p>{row.items.length} of {MAX_ROW_ITEMS} products. Rows with no title continue the row above.</p>
                      <ol className={styles.list}>
                        {row.items.map((id, index) => {
                          const product = lookup[id];
                          return <li key={id} className={styles.item}>
                            {product?.image && <img src={product.image} alt="" width={64} height={64} loading="lazy" />}
                            <div className={styles.product}><strong>{product?.name || `Unavailable product (${id})`}</strong>{product?.available === false && <small>Unavailable on the public page. Remove or delete this product before saving.</small>}{product?.sku && <small>{product.sku}</small>}</div>
                            <div className={styles.actions}>
                              {product && <button disabled={!!editing} onClick={() => startEditing(product)} aria-label={`Edit ${product.name}`}>Edit</button>}
                              <button aria-label={`Move ${product?.name || id} left`} disabled={index === 0} onClick={() => moveItem(row.id, index, -1)}>&uarr;</button>
                              <button aria-label={`Move ${product?.name || id} right`} disabled={index === row.items.length - 1} onClick={() => moveItem(row.id, index, 1)}>&darr;</button>
                              <select aria-label={`Move ${product?.name || id} to another row`} value="" disabled={layout.length < 2} onChange={(e) => e.target.value && place(id, e.target.value)}>
                                <option value="">Move to row...</option>
                                {layout.map((r, i) => r.id !== row.id && <option key={r.id} value={r.id} disabled={r.items.length >= MAX_ROW_ITEMS}>{rowLabel(r, i)}{r.items.length >= MAX_ROW_ITEMS ? " (full)" : ""}</option>)}
                              </select>
                              <button onClick={() => setRows(withoutItem(layout, id))} aria-label={`Remove ${product?.name || id} from the page rows`}>Remove</button>
                              <button className={styles.danger} onClick={() => deleteItem(id)} aria-label={`Delete ${product?.name || id}`}>Delete</button>
                            </div>
                          </li>;
                        })}
                      </ol>
                      {!row.items.length && <p>This row is empty and will not show on the page.</p>}
                    </section>
                  ))}
                  {!layout.length && <section className={styles.panel}><p>The page has no rows yet.</p></section>}
                  <div><button onClick={addRow}>Add a new row</button></div>

                  <section className={styles.panel} aria-labelledby="create-product-heading">
                    <h2 id="create-product-heading">Create a new product</h2>
                    <p>Adds a product with its own name and image, only for this landing page. It is not added to the main product catalogue.</p>
                    <form onSubmit={createProduct}>
                      <div className={styles.filters}>
                        <label>Product name<input value={newName} maxLength={120} onChange={(e) => setNewName(e.target.value)} placeholder="e.g. Desk Calendar 2027" /></label>
                        <label>Add to row<select aria-label="New product row" value={target?.id || ""} onChange={(e) => setTargetRow(e.target.value)}>{layout.map((r, i) => <option key={r.id} value={r.id}>{rowLabel(r, i)} ({r.items.length}/{MAX_ROW_ITEMS})</option>)}</select></label>
                        <label>Product image<input type="file" accept="image/jpeg,image/png,image/webp" onChange={(e) => setNewFile(e.target.files?.[0] || null)} /></label>
                      </div>
                      <button type="submit">{uploading ? "Uploading..." : "Create and add to row"}</button>
                    </form>
                  </section>

                  <section className={styles.panel} aria-labelledby="add-products-heading">
                    <h2 id="add-products-heading">Add existing products to a row</h2>
                    <div className={styles.filters}>
                      <label>Add to<select aria-label="Add to" value={target?.id || ""} onChange={(e) => setTargetRow(e.target.value)}>{layout.map((r, i) => <option key={r.id} value={r.id}>{rowLabel(r, i)} ({r.items.length}/{MAX_ROW_ITEMS})</option>)}</select></label>
                      <label>Product source<select aria-label="Product source" value={source} onChange={(e) => { setSource(e.target.value); setPage(1); }}>
                        <option value="collection">Existing New Year collection</option>
                        <option value="database">Product catalogue</option>
                        <option value="custom">My custom products ({customProducts.length})</option>
                        <option value="deleted">Deleted products ({deletedProducts.length})</option>
                      </select></label>
                      <label>Search products<input type="search" value={query} onChange={(e) => { setQuery(e.target.value); setPage(1); }} placeholder="Search by product name" /></label>
                    </div>
                    <p>Catalogue products must be active, published and have an image. Deleting a catalogue or collection product only hides it from this page.</p>
                    {searching ? <p role="status">Searching catalogue...</p> : <ul className={styles.list}>{choices.map((product) => <li key={product.id} className={styles.item}>
                      {product.image && <img src={product.image} alt="" width={64} height={64} loading="lazy" />}
                      <strong className={styles.product}>{product.name}</strong>
                      {source === "deleted"
                        ? <button onClick={() => restoreItem(product.id)} aria-label={`Restore ${product.name}`}>Restore</button>
                        : <>
                          <button disabled={!!editing} onClick={() => startEditing(product)} aria-label={`Edit ${product.name}`}>Edit</button>
                          <button disabled={!target || target.items.length >= MAX_ROW_ITEMS} onClick={() => place(product.id, target.id)} aria-label={`Add ${product.name} to the selected row`}>Add to row</button>
                          {(source === "custom" || source === "collection") && <button className={styles.danger} onClick={() => deleteItem(product.id)} aria-label={`Delete ${product.name}`}>Delete</button>}
                        </>}
                    </li>)}</ul>}
                    {!searching && !choices.length && <p>No matching products.</p>}
                    {target && target.items.length >= MAX_ROW_ITEMS && <p>The selected row is full. Choose another row or add a new one.</p>}
                    {source === "database" && <div className={styles.actions}><button disabled={page <= 1 || searching} onClick={() => setPage(page - 1)}>Previous</button><span>Page {page} of {pages}</span><button disabled={page >= pages || searching} onClick={() => setPage(page + 1)}>Next</button></div>}
                  </section>
                </fieldset>
                <div className={styles.saveBar}>
                  <span>{editing ? "Apply or cancel the product edit before saving." : dirty ? "You have unsaved changes." : "No unsaved changes."}</span>
                  <button disabled={!dirty || busy || uploading || !!editing || (settings.bannerMode === "custom" && (!settings.banner?.url || !settings.banner?.alt?.trim()))} onClick={save}>{busy ? "Saving..." : "Save changes"}</button>
                </div>
              </>
            )}
          </div>
        </div>
        <DashboardFooter />
      </div>
    </div>
  );
}
