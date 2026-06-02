"use client";
import Sidebar from "../../../components/Dashboard/Sidebar";
import AdminNavbar from "../../../components/Dashboard/Navbar";
import ProductManager from "../../../components/Dashboard/ProductManager";
import DashboardFooter from "../../../components/Dashboard/DashboardFooter";

export default function AdminProductsPage() {
  return (
    <div className="ad-dashboard-layout">
      <Sidebar />
      <div className="ad-main-content">
        <AdminNavbar />
        <div className="ad-dashboard-content">
          <ProductManager />
        </div>
        <DashboardFooter />
      </div>
    </div>
  );
}
