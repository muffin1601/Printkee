"use client";

import { useEffect, useMemo, useState } from "react";
import axios from "../../lib/api";

const API = process.env.NEXT_PUBLIC_API_URL;
const emptyPage = {
  name: "", path: "", pageType: "CORE_CATEGORY", primaryKeyword: "", seoTitle: "", metaDescription: "", h1: "",
  intro: "", bodyContent: "", category: "", location: "", buyerType: "", industry: "", occasion: "", useCase: "",
  parentPath: "/corporate-gifting", ctaText: "Request a Quote", status: "DRAFT", priority: 0.5,
  secondaryKeywords: "", contentBlocksJson: "[]", faqsJson: "[]", featuredProductsJson: "[]", relatedPagesJson: "[]",
  relatedCategoriesJson: "[]", relatedLocationsJson: "[]", schemaOptionsJson: '{"collectionPage":true,"itemList":true,"faq":true,"breadcrumb":true}',
};

const parseJson = (value, field) => {
  try { return JSON.parse(value || "[]"); } catch { throw new Error(`${field} must be valid JSON`); }
};

export default function SeoPageManager() {
  const [pages, setPages] = useState([]);
  const [stats, setStats] = useState(null);
  const [form, setForm] = useState(emptyPage);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const [filter, setFilter] = useState("ALL");

  const load = async () => {
    try {
      const [pageResponse, statResponse] = await Promise.all([
        axios.get(`${API}/seo-pages/admin/pages`),
        axios.get(`${API}/seo-pages/admin/stats`),
      ]);
      setPages(pageResponse.data);
      setStats(statResponse.data);
    } catch { setMessage("Unable to load SEO records. Sign in again if your session has expired."); }
  };
  useEffect(() => { load(); }, []);

  const visiblePages = useMemo(() => filter === "ALL" ? pages : pages.filter((page) => page.status === filter), [filter, pages]);
  const update = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  const payload = () => ({
    ...form,
    priority: Number(form.priority),
    secondaryKeywords: form.secondaryKeywords.split(",").map((value) => value.trim()).filter(Boolean),
    contentBlocks: parseJson(form.contentBlocksJson, "Content blocks"),
    faqs: parseJson(form.faqsJson, "FAQs"),
    featuredProducts: parseJson(form.featuredProductsJson, "Featured product IDs"),
    relatedPages: parseJson(form.relatedPagesJson, "Related pages"),
    relatedCategories: parseJson(form.relatedCategoriesJson, "Related categories"),
    relatedLocations: parseJson(form.relatedLocationsJson, "Related locations"),
    schemaOptions: parseJson(form.schemaOptionsJson, "Schema options"),
  });
  const edit = (page) => {
    setEditingId(page._id);
    setForm({
      ...emptyPage, ...page,
      secondaryKeywords: (page.secondaryKeywords || []).join(", "),
      contentBlocksJson: JSON.stringify(page.contentBlocks || [], null, 2), faqsJson: JSON.stringify(page.faqs || [], null, 2),
      featuredProductsJson: JSON.stringify((page.featuredProducts || []).map((product) => product._id || product), null, 2),
      relatedPagesJson: JSON.stringify(page.relatedPages || [], null, 2), relatedCategoriesJson: JSON.stringify(page.relatedCategories || [], null, 2),
      relatedLocationsJson: JSON.stringify(page.relatedLocations || [], null, 2), schemaOptionsJson: JSON.stringify(page.schemaOptions || {}, null, 2),
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const save = async (event) => {
    event.preventDefault(); setMessage("");
    try {
      const data = payload();
      if (editingId) await axios.put(`${API}/seo-pages/admin/pages/${editingId}`, data);
      else await axios.post(`${API}/seo-pages/admin/pages`, data);
      setMessage("SEO page saved."); setForm(emptyPage); setEditingId(null); load();
    } catch (error) { setMessage(error.response?.data?.message || error.message); }
  };
  const validate = async () => {
    try {
      const response = await axios.post(`${API}/seo-pages/admin/pages/validate`, { ...payload(), _id: editingId });
      setMessage(response.data.eligible ? `Ready for INDEXABLE status (${response.data.score}/100).` : `Quality review: ${response.data.issues.join("; ")}`);
    } catch (error) { setMessage(error.response?.data?.message || error.message); }
  };
  const archive = async (id) => {
    if (!window.confirm("Archive this SEO page? It will be removed from the sitemap.")) return;
    try { await axios.delete(`${API}/seo-pages/admin/pages/${id}`); setMessage("Page archived."); load(); } catch { setMessage("Could not archive page."); }
  };

  return <div className="seo-admin">
    <div className="seo-admin-header"><div><h1>SEO landing pages</h1><p>Only pages that pass quality review can become indexable or enter the sitemap.</p></div>{stats && <div className="seo-admin-stats"><span>Indexable: {stats.statuses?.INDEXABLE || 0}</span><span>Review: {stats.statuses?.QUALITY_REVIEW || 0}</span><span>Draft: {stats.statuses?.DRAFT || 0}</span></div>}</div>
    {message && <p className="seo-admin-message">{message}</p>}
    <form className="seo-admin-form" onSubmit={save}>
      <h2>{editingId ? "Edit SEO page" : "Create SEO page"}</h2>
      <div className="seo-admin-fields">
        {[['name','Page name'],['path','Canonical path, e.g. /corporate-gifts/noida'],['primaryKeyword','Primary keyword'],['seoTitle','SEO title'],['metaDescription','Meta description'],['h1','H1'],['intro','Intro'],['parentPath','Parent path'],['category','Category'],['location','Location'],['buyerType','Buyer type'],['industry','Industry'],['occasion','Occasion'],['useCase','Use case'],['ctaText','CTA text'],['secondaryKeywords','Secondary keywords (comma separated)']].map(([name, label]) => <label key={name}>{label}{['metaDescription','intro'].includes(name) ? <textarea name={name} value={form[name] || ''} onChange={update} rows="3" /> : <input name={name} value={form[name] || ''} onChange={update} />}</label>)}
        <label>Page type<select name="pageType" value={form.pageType} onChange={update}>{['CORE_CATEGORY','LOCATION','CATEGORY_LOCATION','CATEGORY_BUYER','CATEGORY_BUYER_LOCATION','OCCASION','INDUSTRY','HUB','GUIDE'].map((value) => <option key={value}>{value}</option>)}</select></label>
        <label>Status<select name="status" value={form.status} onChange={update}>{['DRAFT','QUALITY_REVIEW','INDEXABLE','NOINDEX','ARCHIVED'].map((value) => <option key={value}>{value}</option>)}</select></label>
        <label>Priority (0–1)<input type="number" name="priority" min="0" max="1" step="0.1" value={form.priority} onChange={update} /></label>
      </div>
      <label>Body content<textarea name="bodyContent" value={form.bodyContent || ''} onChange={update} rows="8" /></label>
      <details><summary>Advanced structured fields (JSON)</summary><p>Use reviewed product IDs and visible content only. Example link: <code>[&#123;"label":"Welcome kits","url":"/collection/welcome-kits"&#125;]</code></p>{[['contentBlocksJson','Content blocks'],['faqsJson','FAQs'],['featuredProductsJson','Featured product IDs'],['relatedPagesJson','Related pages'],['relatedCategoriesJson','Related categories'],['relatedLocationsJson','Related locations'],['schemaOptionsJson','Schema options']].map(([name,label]) => <label key={name}>{label}<textarea name={name} value={form[name] || ''} onChange={update} rows="5" /></label>)}</details>
      <div className="seo-admin-actions"><button type="button" onClick={validate}>Validate quality</button><button type="submit">{editingId ? "Save changes" : "Save draft"}</button>{editingId && <button type="button" onClick={() => { setEditingId(null); setForm(emptyPage); }}>Cancel</button>}</div>
    </form>
    <div className="seo-admin-list"><div className="seo-admin-list-head"><h2>SEO page inventory</h2><select value={filter} onChange={(event) => setFilter(event.target.value)}><option value="ALL">All statuses</option>{['DRAFT','QUALITY_REVIEW','INDEXABLE','NOINDEX','ARCHIVED'].map((value) => <option key={value}>{value}</option>)}</select></div>{visiblePages.map((page) => <article key={page._id}><div><strong>{page.name}</strong><span>{page.path} · {page.status} · quality {page.contentQualityScore || 0}/100</span>{page.qualityIssues?.length > 0 && <small>{page.qualityIssues.join("; ")}</small>}</div><div><button onClick={() => edit(page)}>Edit</button>{page.status !== 'ARCHIVED' && <button onClick={() => archive(page._id)}>Archive</button>}</div></article>)}{visiblePages.length === 0 && <p>No SEO pages match this filter.</p>}</div>
  </div>;
}
