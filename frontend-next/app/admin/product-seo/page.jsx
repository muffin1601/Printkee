"use client";
import Sidebar from "../../../components/Dashboard/Sidebar";
import AdminNavbar from "../../../components/Dashboard/Navbar";
import DashboardFooter from "../../../components/Dashboard/DashboardFooter";
import ProductSeoContentManager from "../../../components/Dashboard/ProductSeoContentManager";

export default function AdminProductSeoPage() {
  return (
    <div className="ad-dashboard-layout">
      <Sidebar />
      <div className="ad-main-content">
        <AdminNavbar />
        <div className="ad-dashboard-content"><ProductSeoContentManager /></div>
        <DashboardFooter />
      </div>
    </div>
  );
}
