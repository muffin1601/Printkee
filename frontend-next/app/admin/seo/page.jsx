"use client";
import Sidebar from "../../../components/Dashboard/Sidebar";
import AdminNavbar from "../../../components/Dashboard/Navbar";
import DashboardFooter from "../../../components/Dashboard/DashboardFooter";
import SeoPageManager from "../../../components/Dashboard/SeoPageManager";
import SeoTaxonomyManager from "../../../components/Dashboard/SeoTaxonomyManager";
import SeoCandidateManager from "../../../components/Dashboard/SeoCandidateManager";

export default function AdminSeoPage() {
  return <div className="ad-dashboard-layout"><Sidebar /><div className="ad-main-content"><AdminNavbar /><div className="ad-dashboard-content"><SeoCandidateManager /><SeoPageManager /><SeoTaxonomyManager /></div><DashboardFooter /></div></div>;
}
