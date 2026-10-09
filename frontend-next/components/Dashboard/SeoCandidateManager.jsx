"use client";

import { useEffect, useState } from "react";
import axios from "../../lib/api";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function SeoCandidateManager() {
  const [stats, setStats] = useState(null);
  const [keywordStats, setKeywordStats] = useState(null);
  const [keywordItems, setKeywordItems] = useState([]);
  const [keywordPage, setKeywordPage] = useState(1);
  const [keywordPages, setKeywordPages] = useState(1);
  const [keywordStatus, setKeywordStatus] = useState("");
  const [keywordSearch, setKeywordSearch] = useState("");
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState([]);
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [message, setMessage] = useState("");

  const load = async (nextPage = page) => {
    try {
      const [candidateResponse, statResponse, keywordResponse] = await Promise.all([
        axios.get(`${API}/seo-pages/admin/candidates`, { params: { page: nextPage, limit: 50, status: status || undefined } }),
        axios.get(`${API}/seo-pages/admin/candidates/stats`),
        axios.get(`${API}/seo-pages/admin/keywords/stats`),
      ]);
      setItems(candidateResponse.data.items || []);
      setPages(candidateResponse.data.pages || 1);
      setStats(statResponse.data);
      setKeywordStats(keywordResponse.data);
      setSelected([]);
    } catch { setMessage("Unable to load the programmatic SEO inventory."); }
  };

  useEffect(() => { load(1); }, [status]);

  const loadKeywords = async (nextPage = keywordPage, nextStatus = keywordStatus, nextSearch = keywordSearch) => {
    try {
      const response = await axios.get(`${API}/seo-pages/admin/keywords`, {
        params: { page: nextPage, limit: 25, status: nextStatus || undefined, search: nextSearch.trim() || undefined },
      });
      setKeywordItems(response.data.items || []);
      setKeywordPage(response.data.page || 1);
      setKeywordPages(response.data.pages || 1);
    } catch (error) {
      setMessage(error.response?.data?.message || "Unable to load keyword-to-URL mappings.");
    }
  };

  useEffect(() => { loadKeywords(1, keywordStatus, keywordSearch); }, [keywordStatus]);

  const importKeywords = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    if (file.size > 950000) {
      setMessage("This CSV is too large for the production upload proxy. Use PRINTKEE_KEYWORD_IMPORT_CATALOG_MAPPED.csv from seo/03-keywords-and-search-data.");
      return;
    }
    try {
      const text = await file.text();
      const config = { headers: { "Content-Type": "text/csv" } };
      const validation = await axios.post(`${API}/seo-pages/admin/keywords/import`, text, config);
      if (!window.confirm(`Validated ${validation.data.rowCount} keyword rows. Commit the complete import?`)) {
        setMessage(`Validated ${validation.data.rowCount} rows; no database records changed.`);
        return;
      }
      const result = await axios.post(`${API}/seo-pages/admin/keywords/import?commit=true`, text, config);
      setMessage(`Imported ${result.data.rowCount} accounted keyword rows.`);
      load(1);
      loadKeywords(1);
    } catch (error) {
      const errors = error.response?.data?.error?.errors;
      const statusCode = error.response?.status;
      if (statusCode === 401) setMessage("Your admin session expired. Sign in again, return to this page, and retry the import.");
      else if (statusCode === 413) setMessage("The upload proxy rejected this file as too large. Use PRINTKEE_KEYWORD_IMPORT_CATALOG_MAPPED.csv.");
      else if (statusCode === 404) setMessage("The keyword-import API is not available on the deployed backend. Redeploy or restart backend-next.");
      else setMessage(errors?.length ? errors.slice(0, 5).join("; ") : error.response?.data?.message || `Keyword import failed${statusCode ? ` (HTTP ${statusCode})` : ""}.`);
    }
  };

  const generate = async () => {
    try {
      const preview = await axios.post(`${API}/seo-pages/admin/candidates/generate`);
      const metrics = preview.data.metrics;
      if (!window.confirm(`Preview: ${metrics.unique} unique candidates, ${metrics.exactDuplicates} exact duplicates. Commit inventory updates?`)) {
        setMessage(`Generation preview complete: ${metrics.unique} unique candidates; nothing changed.`);
        return;
      }
      const result = await axios.post(`${API}/seo-pages/admin/candidates/generate?commit=true`);
      setMessage(`Candidate inventory committed: ${result.data.metrics.unique} unique paths.`);
      load(1);
    } catch (error) { setMessage(error.response?.data?.message || "Candidate generation failed."); }
  };

  const bulk = async (action) => {
    if (!selected.length) return setMessage("Select at least one candidate.");
    try {
      const payload = { ids: selected, action, reason: `Admin bulk ${action.toLowerCase()}` };
      const preview = await axios.post(`${API}/seo-pages/admin/candidates/bulk`, payload);
      if (preview.data.preview.invalidApprovals?.length) {
        setMessage(`Approval blocked: ${preview.data.preview.invalidApprovals.length} candidates fail the quality gate.`);
        return;
      }
      if (!window.confirm(`${action} ${preview.data.preview.matched} candidates? This commit will be audit logged.`)) return;
      await axios.post(`${API}/seo-pages/admin/candidates/bulk?commit=true`, payload);
      setMessage(`${action} completed and audit logged.`);
      load(page);
    } catch (error) { setMessage(error.response?.data?.message || `Bulk ${action.toLowerCase()} failed.`); }
  };

  const toggle = (id) => setSelected((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);

  return <section className="seo-admin taxonomy-admin">
    <div className="seo-admin-header">
      <div><h2>Programmatic SEO candidate inventory</h2><p>Candidates are research records. Approval creates no public page; publishing still requires the landing-page quality gate.</p></div>
      {stats && <div className="seo-admin-stats"><span>Total: {stats.total}</span><span>Published: {stats.statuses?.PUBLISHED || 0}</span><span>Duplicates: {stats.exactDuplicatePaths}</span><span>Route conflicts: {stats.unresolvedRouteConflicts}</span></div>}
    </div>
    {keywordStats && <p>Keyword ledger: {keywordStats.total} rows · {keywordStats.unmapped} unmapped.</p>}
    {message && <p className="seo-admin-message">{message}</p>}
    <div className="seo-admin-actions">
      <label>Import PRINTKEE_KEYWORD_IMPORT_CATALOG_MAPPED.csv<input type="file" accept=".csv,text/csv" onChange={importKeywords} /></label>
      <button type="button" onClick={generate}>Preview candidate generation</button>
      <button type="button" onClick={() => bulk("APPROVE")}>Preview approval</button>
      <button type="button" onClick={() => bulk("REJECT")}>Preview rejection</button>
      <button type="button" onClick={() => bulk("ARCHIVE")}>Preview archive</button>
    </div>
    <div className="seo-admin-list-head">
      <h3>Keyword-to-URL mapping</h3>
      <form className="seo-admin-actions" onSubmit={(event) => { event.preventDefault(); loadKeywords(1, keywordStatus, keywordSearch); }}>
        <input aria-label="Search keyword mappings" placeholder="Search keywords" value={keywordSearch} onChange={(event) => setKeywordSearch(event.target.value)} />
        <select aria-label="Filter keyword mapping status" value={keywordStatus} onChange={(event) => setKeywordStatus(event.target.value)}>
          <option value="">All mapping statuses</option>
          {["MAPPED", "MERGED", "DEFERRED", "APPROVED", "REJECTED", "UNMAPPED"].map((value) => <option key={value}>{value}</option>)}
        </select>
        <button type="submit">Search mappings</button>
      </form>
    </div>
    <div className="seo-admin-list">
      {keywordItems.map((item) => <article key={item._id}>
        <div>
          <strong>{item.originalKeyword}</strong>
          <span>{item.assignedCanonicalUrl || "No publishable URL assigned"} · {item.status} · {item.priority}</span>
          <small>{item.cluster}{item.dispositionReason ? ` — ${item.dispositionReason}` : ""}</small>
        </div>
      </article>)}
      {!keywordItems.length && <p>No keyword mappings match this filter.</p>}
    </div>
    <div className="seo-admin-actions">
      <button type="button" disabled={keywordPage <= 1} onClick={() => loadKeywords(keywordPage - 1)}>Previous mappings</button>
      <span>Mapping page {keywordPage} of {keywordPages}</span>
      <button type="button" disabled={keywordPage >= keywordPages} onClick={() => loadKeywords(keywordPage + 1)}>Next mappings</button>
    </div>
    <div className="seo-admin-list-head"><h3>Review queue</h3><select value={status} onChange={(event) => { setStatus(event.target.value); setPage(1); }}><option value="">All statuses</option>{["CANDIDATE", "REJECTED", "MERGED", "DRAFT", "REVIEW", "APPROVED", "PUBLISHED", "CANONICALIZED", "ARCHIVED"].map((value) => <option key={value}>{value}</option>)}</select></div>
    <div className="seo-admin-list">
      {items.map((item) => <article key={item._id}>
        <input aria-label={`Select ${item.proposedPath}`} type="checkbox" checked={selected.includes(item._id)} onChange={() => toggle(item._id)} />
        <div><strong>{item.targetKeyword}</strong><span>{item.proposedPath} · {item.status} · quality {item.qualityScore}/100</span><small>{item.dispositionReason}</small></div>
      </article>)}
      {!items.length && <p>No candidates match this filter.</p>}
    </div>
    <div className="seo-admin-actions"><button type="button" disabled={page <= 1} onClick={() => { const value = page - 1; setPage(value); load(value); }}>Previous</button><span>Page {page} of {pages}</span><button type="button" disabled={page >= pages} onClick={() => { const value = page + 1; setPage(value); load(value); }}>Next</button></div>
  </section>;
}
