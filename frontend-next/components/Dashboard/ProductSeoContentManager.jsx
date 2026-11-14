"use client";
import React, { useEffect, useState } from "react";
import api from "../../lib/api";
import styles from "../../styles/admin/ProductSeoContentManager.module.css";

const API = `${process.env.NEXT_PUBLIC_API_URL}/product/seo-content`;
const text = (value) => String(value || "").replace(/<\/(?:p|div|li)>/gi, "\n\n")
  .replace(/<[^>]+>/g, " ").replace(/&nbsp;/gi, " ").replace(/&amp;/gi, "&").replace(/\n\s*\n\s*\n/g, "\n\n").trim();
const initialForm = (product) => ({
  description: { short: text(product.description?.short), long: text(product.description?.long) },
  seo: { metaTitle: product.seo?.metaTitle || "", metaDescription: product.seo?.metaDescription || "" },
  imageAlts: (product.images || []).map((image) => image.altText || ""),
});

export default function ProductSeoContentManager() {
  const [search, setSearch] = useState("");
  const [eligibility, setEligibility] = useState("excluded");
  const [issue, setIssue] = useState("all");
  const [page, setPage] = useState(1);
  const [list, setList] = useState({ items: [], totals: {}, totalPages: 1, totalItems: 0 });
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState(null);
  const [draft, setDraft] = useState(null);
  const [verifiedFactKeys, setVerifiedFactKeys] = useState([]);
  const [factsConfirmed, setFactsConfirmed] = useState(false);
  const [preview, setPreview] = useState(null);
  const [reviewed, setReviewed] = useState(false);
  const [verifiedConflict, setVerifiedConflict] = useState(false);
  const [busy, setBusy] = useState("");
  const [message, setMessage] = useState("");

  const loadList = async (nextPage = page, nextSearch = search) => {
    try {
      const response = await api.get(API, { params: { page: nextPage, search: nextSearch, eligibility, issue } });
      setList(response.data);
      setPage(response.data.page);
    } catch (error) { setMessage(error.response?.data?.message || "Could not load product SEO status."); }
  };
  useEffect(() => { loadList(1); }, [eligibility, issue]);

  const openProduct = async (id) => {
    setBusy("open"); setMessage("");
    try {
      const response = await api.get(`${API}/${id}`);
      setSelected(response.data);
      setForm(initialForm(response.data.product));
      setDraft(null); setPreview(null); setReviewed(false); setVerifiedConflict(false);
      setVerifiedFactKeys([]); setFactsConfirmed(false);
    } catch (error) { setMessage(error.response?.data?.message || "Could not load this product."); }
    finally { setBusy(""); }
  };
  const update = (section, field, value) => {
    setForm((current) => ({ ...current, [section]: { ...current[section], [field]: value } }));
    setPreview(null); setReviewed(false);
  };
  const updateAlt = (index, value) => {
    setForm((current) => ({ ...current, imageAlts: current.imageAlts.map((alt, position) => position === index ? value : alt) }));
    setPreview(null); setReviewed(false);
  };
  const generate = async () => {
    setBusy("draft"); setMessage(""); setDraft(null);
    try {
      const response = await api.post(`${API}/${selected._id}/draft`, { verifiedFactKeys, factsConfirmed, verifiedConflict });
      setDraft(response.data);
      setMessage("Draft generated for review. It has not changed the product record.");
    } catch (error) { setMessage(error.response?.data?.message || "Draft generation failed."); }
    finally { setBusy(""); }
  };
  const applyDraft = () => {
    if (!draft) return;
    setForm((current) => ({ ...current,
      description: { short: draft.shortDescription || current.description.short, long: draft.longDescription || current.description.long },
      seo: { metaTitle: draft.metaTitle || current.seo.metaTitle, metaDescription: draft.metaDescription || current.seo.metaDescription },
    }));
    setPreview(null); setReviewed(false);
    setMessage("Draft copied into the editor. Verify every claim and image description before saving.");
  };
  const check = async () => {
    setBusy("preview"); setMessage("");
    try {
      const response = await api.post(`${API}/${selected._id}/preview`, form);
      setPreview(response.data);
      setMessage(response.data.quality.eligible ? "Site quality checks pass. Accuracy still needs review." : "Preview ready; some site quality checks still fail.");
    } catch (error) { setPreview(null); setMessage(error.response?.data?.message || "Preview validation failed."); }
    finally { setBusy(""); }
  };
  const save = async () => {
    if (!reviewed) { setMessage("Confirm that you verified every claim before saving."); return; }
    setBusy("save"); setMessage("");
    try {
      await api.put(`${API}/${selected._id}`, { ...form, version: selected.version, reviewed, verifiedConflict });
      await openProduct(selected._id);
      await loadList(page);
      setMessage("Reviewed content saved. Verify the live page and sitemap after deployment.");
    } catch (error) { setMessage(error.response?.data?.message || "Content could not be saved."); }
    finally { setBusy(""); }
  };

  return (
    <div className={styles.manager}>
      <header className={styles.header}>
        <div><h1>Product SEO Content Manager</h1><p>Review real product facts, improve copy, and check indexability. Thresholds below are site policy, not Google requirements.</p></div>
        <div className={styles.stats}><span>{list.totals.products || 0} products</span><span>{list.totals.eligible || 0} eligible</span><span>{list.totals.excluded || 0} excluded</span><span>{list.totals.flagged || 0} fact conflicts</span></div>
      </header>
      {message && <p className={styles.message} role="status">{message}</p>}
      <div className={styles.columns}>
        <section className={styles.panel} aria-label="Product SEO queue">
          <form className={styles.filters} onSubmit={(event) => { event.preventDefault(); loadList(1, search); }}>
            <input aria-label="Search products" placeholder="Search name, SKU or slug" value={search} onChange={(event) => setSearch(event.target.value)} />
            <select aria-label="Eligibility" value={eligibility} onChange={(event) => setEligibility(event.target.value)}><option value="excluded">Excluded</option><option value="eligible">Eligible</option><option value="flagged">Fact conflicts</option><option value="all">All products</option></select>
            <select aria-label="Missing field" value={issue} onChange={(event) => setIssue(event.target.value)}><option value="all">All issues</option><option value="description">Descriptions</option><option value="seo.metaDescription">Meta descriptions</option><option value="attributes">Product details</option><option value="images">Images</option></select>
            <button type="submit">Search</button>
          </form>
          <p className={styles.count}>{list.totalItems} matching products</p>
          <div className={styles.queue}>
            {list.items.map((item) => <button key={item._id} type="button" className={selected?._id === item._id ? styles.activeItem : styles.item} onClick={() => openProduct(item._id)}>
              <strong>{item.name}</strong><span>{item.category} / {item.subcategory}</span>
              <small>{item.quality.eligible ? "Eligible" : `${item.quality.issues.length} quality checks`}{item.editorialFlags.length ? " · Fact conflict" : ""}</small>
            </button>)}
          </div>
          <div className={styles.pager}><button disabled={page <= 1} onClick={() => loadList(page - 1)}>Previous</button><span>{page} / {list.totalPages || 1}</span><button disabled={page >= (list.totalPages || 1)} onClick={() => loadList(page + 1)}>Next</button></div>
        </section>
        <section className={styles.panel} aria-label="Product SEO editor">
          {!selected || !form ? <p>Select a product to review its content and source facts.</p> : <>
            <div className={styles.productHead}><div><h2>{selected.name}</h2><p>{selected.slug} · {selected.status}</p></div><span className={selected.quality.eligible ? styles.good : styles.excluded}>{selected.quality.eligible ? "Eligible" : "Excluded"}</span></div>
            <div className={styles.alertList}>{selected.quality.issues.map((reason) => <p key={reason}>{reason}</p>)}{selected.editorialFlags.map((flag) => <p key={flag} className={styles.conflict}>{flag}</p>)}</div>
            {selected.editorialFlags.length > 0 && <label className={styles.confirm}><input type="checkbox" checked={verifiedConflict} onChange={(event) => setVerifiedConflict(event.target.checked)} /> I verified the flagged product fact with a supplier or catalog owner.</label>}
            <details className={styles.facts}><summary>Select facts verified against the product record or supplier</summary><div className={styles.factList}>{Object.entries(selected.sourceFacts || {}).map(([key, value]) => <label key={key}><input type="checkbox" checked={verifiedFactKeys.includes(key)} onChange={(event) => { setVerifiedFactKeys((current) => event.target.checked ? [...current, key] : current.filter((item) => item !== key)); setFactsConfirmed(false); }} /><span><strong>{key}</strong> {Array.isArray(value) ? value.join(", ") : value}</span></label>)}</div></details>
            <label className={styles.confirm}><input type="checkbox" checked={factsConfirmed} onChange={(event) => setFactsConfirmed(event.target.checked)} /> I verified the selected facts. Only these facts may be sent for AI drafting.</label>
            <div className={styles.actions}><button type="button" disabled={!!busy || (selected.editorialFlags.length > 0 && !verifiedConflict) || !factsConfirmed || !verifiedFactKeys.includes("product.name") || verifiedFactKeys.filter((key) => !["product.name", "category.name", "subcategory.name"].includes(key)).length < 2} onClick={generate}>{busy === "draft" ? "Generating…" : "Generate AI draft"}</button><span>Draft uses selected facts and is never saved automatically.</span></div>
            {draft && <div className={styles.draft}><h3>AI draft — review required</h3><p><strong>Short:</strong> {draft.shortDescription}</p><p><strong>Long:</strong> {draft.longDescription}</p><p><strong>SEO title:</strong> {draft.metaTitle}</p><p><strong>Meta description:</strong> {draft.metaDescription}</p>{draft.insufficientFacts && <p className={styles.conflict}>Not enough verified facts for complete copy.</p>}{draft.reviewNotes?.map((note, index) => <p key={index}>{note}</p>)}<p>Sources: {draft.usedFactKeys?.join(", ") || "none cited"}</p><button type="button" onClick={applyDraft}>Copy draft into editor</button></div>}
            <div className={styles.form}><label>Short description<textarea rows="3" value={form.description.short} onChange={(event) => update("description", "short", event.target.value)} /></label><label>Visible product description<textarea rows="8" value={form.description.long} onChange={(event) => update("description", "long", event.target.value)} /></label><label>SEO title<input value={form.seo.metaTitle} onChange={(event) => update("seo", "metaTitle", event.target.value)} /></label><label>Meta description<textarea rows="3" value={form.seo.metaDescription} onChange={(event) => update("seo", "metaDescription", event.target.value)} /></label>
              {(selected.product.images || []).map((image, index) => <label key={image._id || index}>Image {index + 1} alt text <small>{image.url}</small><input value={form.imageAlts[index] || ""} onChange={(event) => updateAlt(index, event.target.value)} /></label>)}
            </div>
            <div className={styles.searchPreview}><h3>Search preview</h3><strong>{form.seo.metaTitle || selected.name} | Printkee</strong><span>https://printkee.com/{selected.product.category?.slug}/{selected.product.subcategory?.slug}/{selected.slug}</span><p>{form.seo.metaDescription}</p></div>
            <div className={styles.actions}><button type="button" disabled={!!busy} onClick={check}>Validate preview</button>{preview && <span>{preview.quality.eligible ? "Passes site gate" : `Still excluded: ${preview.quality.issues.join("; ")}`}</span>}</div>
            <label className={styles.confirm}><input type="checkbox" checked={reviewed} onChange={(event) => setReviewed(event.target.checked)} /> I reviewed every claim against verified product information and approve saving this content.</label>
            <button type="button" className={styles.save} disabled={!!busy || !reviewed || (selected.editorialFlags.length > 0 && !verifiedConflict)} onClick={save}>{busy === "save" ? "Saving…" : "Approve and save content"}</button>
          </>}
        </section>
      </div>
    </div>
  );
}
