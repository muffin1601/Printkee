"use client";
import { useEffect, useRef, useState } from "react";
import Sidebar from "../../../components/Dashboard/Sidebar";
import AdminNavbar from "../../../components/Dashboard/Navbar";
import DashboardFooter from "../../../components/Dashboard/DashboardFooter";
import api from "../../../lib/api";
import { canUseInRow, defaultSettings, legacyProducts, rowDefinitions } from "../../../data/new-year-page-layout";
import styles from "../../../styles/admin/NewYearManager.module.css";

const API = process.env.NEXT_PUBLIC_API_URL;
const errorMessage = (error) => error.response?.data?.message || error.message || "Something went wrong. Please try again.";

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
  const [targetRow, setTargetRow] = useState("gifts");
  const searchVersion = useRef(0);

  const remember = (items) => setKnown((previous) => ({ ...previous, ...Object.fromEntries(items.map((p) => [p.id, p])) }));
  const load = async () => {
    setError("");
    try {
      const { data } = await api.get(`${API}/new-year-page/admin`);
      setSettings(data.settings || defaultSettings());
      remember(data.products || []);
      setDirty(false);
    } catch (err) { setError(errorMessage(err)); }
  };
  useEffect(() => { load(); }, []);
  useEffect(() => {
    if (!dirty) return;
    const warn = (event) => { event.preventDefault(); event.returnValue = ""; };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

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
  const assigned = new Set(Object.values(settings?.rows || {}).flat());
  const assign = (id, row) => {
    if (row && (!known[id] || !canUseInRow(known[id], row))) return;
    const rows = Object.fromEntries(rowDefinitions.map(({ key }) => [key, settings.rows[key].filter((item) => item !== id)]));
    if (row) rows[row].push(id);
    change({ ...settings, rows });
  };
  const move = (row, index, direction) => {
    const items = [...settings.rows[row]];
    [items[index], items[index + direction]] = [items[index + direction], items[index]];
    change({ ...settings, rows: { ...settings.rows, [row]: items } });
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
  const save = async () => {
    setBusy(true); setError(""); setMessage("");
    try {
      const { data } = await api.put(`${API}/new-year-page/admin`, {
        rows: settings.rows, bannerMode: settings.bannerMode, banner: settings.banner,
      });
      setSettings(data.settings); remember(data.products || []); setDirty(false);
      setMessage("Saved. The New Year page will use these settings on its next load.");
    } catch (err) { setError(errorMessage(err)); }
    finally { setBusy(false); }
  };
  const choices = (source === "database" ? results : legacyProducts.map((product) => known[product.id] || product))
    .filter((p) => p.available !== false && !assigned.has(p.id) && canUseInRow(p, targetRow) && p.name.toLowerCase().includes(query.toLowerCase()));
  const bannerUrl = settings?.bannerMode === "default" ? "/printkee-new-yea-banner.webp" : settings?.bannerMode === "custom" ? settings.banner?.url : "";

  return (
    <div className="ad-dashboard-layout">
      <Sidebar />
      <div className="ad-main-content">
        <AdminNavbar />
        <div className="ad-dashboard-content">
          <div className={styles.manager}>
            <header className={styles.header}>
              <div><h1>New Year 2027 page</h1><p>Manage the banner, products and their order in each row.</p></div>
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
                    {uploading && <p role="status">Uploading banner...</p>}
                    {settings.bannerMode === "custom" && <label>Banner alternative text<input maxLength={500} value={settings.banner?.alt || ""} onChange={(e) => change({ ...settings, banner: { ...settings.banner, alt: e.target.value } })} /></label>}
                    {bannerUrl && <img className={styles.banner} src={bannerUrl} alt={settings.bannerMode === "custom" ? settings.banner?.alt : "Existing New Year banner"} />}
                    {settings.bannerMode === "custom" && !settings.banner?.url && <p>Upload a banner before saving this option.</p>}
                  </section>
                  {rowDefinitions.map((row, rowIndex) => (
                    <section key={row.key} className={styles.panel} aria-labelledby={`${row.key}-heading`}>
                      <h2 id={`${row.key}-heading`}>Row {rowIndex + 1}: {row.title}</h2>
                      <p>{settings.rows[row.key].length} products. Use the arrows to change display order. Removal affects only this landing page.</p>
                      <ol className={styles.list}>
                        {settings.rows[row.key].map((id, index) => {
                          const product = known[id];
                          return <li key={id} className={styles.item}>
                            {product?.image && <img src={product.image} alt="" width={64} height={64} loading="lazy" />}
                            <div className={styles.product}><strong>{product?.name || `Unavailable product (${id})`}</strong>{product?.available === false && <small>Unavailable on the public page. Remove this selection before saving.</small>}{product?.sku && <small>{product.sku}</small>}</div>
                            <div className={styles.actions}>
                              <button aria-label={`Move ${product?.name || id} up`} disabled={index === 0} onClick={() => move(row.key, index, -1)}>&uarr;</button>
                              <button aria-label={`Move ${product?.name || id} down`} disabled={index === settings.rows[row.key].length - 1} onClick={() => move(row.key, index, 1)}>&darr;</button>
                              <select aria-label={`Row for ${product?.name || id}`} value={row.key} onChange={(e) => assign(id, e.target.value)}>
                                {rowDefinitions.map((r) => <option key={r.key} value={r.key} disabled={!product || !canUseInRow(product, r.key)}>{r.title}</option>)}
                              </select>
                              <button onClick={() => assign(id, "")} aria-label={`Remove ${product?.name || id} from page`}>Remove</button>
                            </div>
                          </li>;
                        })}
                      </ol>
                      {!settings.rows[row.key].length && <p>No products selected for this row.</p>}
                    </section>
                  ))}
                  <section className={styles.panel} aria-labelledby="add-products-heading">
                    <h2 id="add-products-heading">Add products to a row</h2>
                    <div className={styles.filters}>
                      <label>Add to<select aria-label="Add to" value={targetRow} onChange={(e) => setTargetRow(e.target.value)}>{rowDefinitions.map((row) => <option key={row.key} value={row.key}>{row.title}</option>)}</select></label>
                      <label>Product source<select aria-label="Product source" value={source} onChange={(e) => { setSource(e.target.value); setPage(1); }}><option value="collection">Existing New Year collection</option><option value="database">Product catalogue</option></select></label>
                      <label>Search products<input type="search" value={query} onChange={(e) => { setQuery(e.target.value); setPage(1); }} placeholder="Search by product name" /></label>
                    </div>
                    <p>Only standalone diaries can be added to Row 2, and calendars to Row 3. Catalogue products must be active, published and have an image.</p>
                    {searching ? <p role="status">Searching catalogue...</p> : <ul className={styles.list}>{choices.map((product) => <li key={product.id} className={styles.item}><img src={product.image} alt="" width={64} height={64} loading="lazy" /><strong className={styles.product}>{product.name}</strong><button onClick={() => assign(product.id, targetRow)} aria-label={`Add ${product.name} to ${targetRow}`}>Add to row</button></li>)}</ul>}
                    {!searching && !choices.length && <p>No matching unselected products on this page.</p>}
                    {source === "database" && <div className={styles.actions}><button disabled={page <= 1 || searching} onClick={() => setPage(page - 1)}>Previous</button><span>Page {page} of {pages}</span><button disabled={page >= pages || searching} onClick={() => setPage(page + 1)}>Next</button></div>}
                  </section>
                </fieldset>
                <div className={styles.saveBar}>
                  <span>{dirty ? "You have unsaved changes." : "No unsaved changes."}</span>
                  <button disabled={!dirty || busy || uploading || (settings.bannerMode === "custom" && (!settings.banner?.url || !settings.banner?.alt?.trim()))} onClick={save}>{busy ? "Saving..." : "Save changes"}</button>
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
