"use client";

import { useEffect, useState } from "react";
import axios from "../../lib/api";

const API = process.env.NEXT_PUBLIC_API_URL;
const taxonomyEmpty = { type: "LOCATION", name: "", slug: "", aliases: "", description: "", serviceInformation: "", nearbyAreas: "", status: "ACTIVE", priority: 50 };
const opportunityEmpty = { keyword: "", searchVolume: "", difficulty: "", location: "", category: "", buyerType: "", intent: "", existingUrl: "", proposedUrl: "", pageNeeded: false, priority: 50, status: "NEW", notes: "", source: "manual" };

export default function SeoTaxonomyManager() {
  const [taxonomies, setTaxonomies] = useState([]);
  const [opportunities, setOpportunities] = useState([]);
  const [taxonomy, setTaxonomy] = useState(taxonomyEmpty);
  const [opportunity, setOpportunity] = useState(opportunityEmpty);
  const [taxonomyId, setTaxonomyId] = useState(null);
  const [opportunityId, setOpportunityId] = useState(null);
  const [message, setMessage] = useState("");

  const load = async () => {
    try {
      const [taxonomyResponse, opportunityResponse] = await Promise.all([
        axios.get(`${API}/seo-pages/admin/taxonomy`),
        axios.get(`${API}/seo-pages/admin/opportunities`),
      ]);
      setTaxonomies(taxonomyResponse.data);
      setOpportunities(opportunityResponse.data);
    } catch {
      setMessage("Unable to load taxonomy records.");
    }
  };
  useEffect(() => { load(); }, []);

  const change = (setter) => (event) => setter((item) => ({
    ...item,
    [event.target.name]: event.target.type === "checkbox" ? event.target.checked : event.target.value,
  }));

  const saveTaxonomy = async (event) => {
    event.preventDefault();
    try {
      const payload = {
        ...taxonomy,
        priority: Number(taxonomy.priority),
        aliases: taxonomy.aliases.split(",").map((item) => item.trim()).filter(Boolean),
        nearbyAreas: taxonomy.nearbyAreas.split(",").map((item) => item.trim()).filter(Boolean),
      };
      if (taxonomyId) await axios.put(`${API}/seo-pages/admin/taxonomy/${taxonomyId}`, payload);
      else await axios.post(`${API}/seo-pages/admin/taxonomy`, payload);
      setTaxonomy(taxonomyEmpty);
      setTaxonomyId(null);
      setMessage("Taxonomy saved.");
      load();
    } catch (error) {
      setMessage(error.response?.data?.message || "Could not save taxonomy.");
    }
  };

  const saveOpportunity = async (event) => {
    event.preventDefault();
    try {
      const payload = {
        ...opportunity,
        searchVolume: opportunity.searchVolume === "" ? null : Number(opportunity.searchVolume),
        difficulty: opportunity.difficulty === "" ? null : Number(opportunity.difficulty),
        priority: Number(opportunity.priority),
      };
      if (opportunityId) await axios.put(`${API}/seo-pages/admin/opportunities/${opportunityId}`, payload);
      else await axios.post(`${API}/seo-pages/admin/opportunities`, payload);
      setOpportunity(opportunityEmpty);
      setOpportunityId(null);
      setMessage("Opportunity saved.");
      load();
    } catch (error) {
      setMessage(error.response?.data?.message || "Could not save opportunity.");
    }
  };

  const exportOpportunities = async () => {
    try {
      const response = await axios.get(`${API}/seo-pages/admin/opportunities.csv`, { responseType: "blob" });
      const url = URL.createObjectURL(response.data);
      const link = document.createElement("a");
      link.href = url;
      link.download = "printkee-seo-opportunities.csv";
      link.click();
      URL.revokeObjectURL(url);
      setMessage("Opportunity CSV exported.");
    } catch (error) {
      setMessage(error.response?.data?.message || "Could not export opportunities.");
    }
  };

  const importOpportunities = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    try {
      const text = await file.text();
      const headers = { "Content-Type": "text/csv" };
      const validation = await axios.post(`${API}/seo-pages/admin/opportunities/import`, text, { headers });
      const rowCount = validation.data?.rowCount || 0;
      if (!window.confirm(`Validation passed for ${rowCount} rows. Import and update these opportunity records?`)) {
        setMessage(`CSV validation passed for ${rowCount} rows; no records were changed.`);
        return;
      }
      const result = await axios.post(`${API}/seo-pages/admin/opportunities/import?commit=true`, text, { headers });
      setMessage(`Imported ${result.data?.rowCount || rowCount} validated opportunity rows.`);
      load();
    } catch (error) {
      const details = error.response?.data?.error?.errors;
      setMessage(details?.length ? details.slice(0, 5).join("; ") : error.response?.data?.message || "Could not import opportunities.");
    }
  };

  return (
    <section className="seo-admin taxonomy-admin">
      <h2>Taxonomy and opportunity engine</h2>
      <p>Use manually researched data only. Metrics are optional and are never generated by the system.</p>
      {message && <p className="seo-admin-message">{message}</p>}
      <div className="seo-admin-actions">
        <button type="button" onClick={exportOpportunities}>Export opportunity CSV</button>
        <label>Validate and import CSV<input type="file" accept=".csv,text/csv" onChange={importOpportunities} /></label>
      </div>

      <div className="taxonomy-grid">
        <form onSubmit={saveTaxonomy}>
          <h3>{taxonomyId ? "Edit taxonomy" : "Add taxonomy"}</h3>
          <label>Type<select name="type" value={taxonomy.type} onChange={change(setTaxonomy)}>{["CATEGORY", "LOCATION", "BUYER_TYPE", "INDUSTRY", "OCCASION", "USE_CASE", "SEARCH_INTENT"].map((value) => <option key={value}>{value}</option>)}</select></label>
          {[["name", "Name"], ["slug", "Slug"], ["aliases", "Aliases (comma separated)"], ["nearbyAreas", "Nearby areas (comma separated)"]].map(([name, label]) => <label key={name}>{label}<input name={name} value={taxonomy[name]} onChange={change(setTaxonomy)} /></label>)}
          <label>Description<textarea name="description" value={taxonomy.description} onChange={change(setTaxonomy)} /></label>
          <label>Service information<textarea name="serviceInformation" value={taxonomy.serviceInformation} onChange={change(setTaxonomy)} /></label>
          <label>Status<select name="status" value={taxonomy.status} onChange={change(setTaxonomy)}><option>ACTIVE</option><option>INACTIVE</option></select></label>
          <button>Save taxonomy</button>
        </form>
        <div>
          <h3>Managed taxonomy</h3>
          <ul className="compact-list">{taxonomies.map((item) => <li key={item._id}><button onClick={() => { setTaxonomy({ ...taxonomyEmpty, ...item, aliases: (item.aliases || []).join(", "), nearbyAreas: (item.nearbyAreas || []).join(", ") }); setTaxonomyId(item._id); }}>{item.type}: {item.name}</button></li>)}</ul>
        </div>
      </div>

      <div className="taxonomy-grid">
        <form onSubmit={saveOpportunity}>
          <h3>{opportunityId ? "Edit opportunity" : "Add opportunity"}</h3>
          {[["keyword", "Keyword"], ["location", "Location"], ["category", "Category"], ["buyerType", "Buyer type"], ["intent", "Intent"], ["existingUrl", "Existing URL"], ["proposedUrl", "Proposed URL"], ["searchVolume", "Verified search volume"], ["difficulty", "Difficulty"], ["priority", "Priority"], ["notes", "Notes"]].map(([name, label]) => <label key={name}>{label}<input name={name} value={opportunity[name]} onChange={change(setOpportunity)} /></label>)}
          <label><input type="checkbox" name="pageNeeded" checked={opportunity.pageNeeded} onChange={change(setOpportunity)} /> Page needed</label>
          <label>Status<select name="status" value={opportunity.status} onChange={change(setOpportunity)}>{["NEW", "RESEARCH", "APPROVED", "REJECTED", "IMPLEMENTED"].map((value) => <option key={value}>{value}</option>)}</select></label>
          <button>Save opportunity</button>
        </form>
        <div>
          <h3>Opportunity backlog</h3>
          <ul className="compact-list">{opportunities.map((item) => <li key={item._id}><button onClick={() => { setOpportunity({ ...opportunityEmpty, ...item, searchVolume: item.searchVolume ?? "", difficulty: item.difficulty ?? "" }); setOpportunityId(item._id); }}>{item.keyword} · {item.status}</button></li>)}</ul>
        </div>
      </div>
    </section>
  );
}
