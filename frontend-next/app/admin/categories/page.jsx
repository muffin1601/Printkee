"use client";
import Sidebar from "../../../components/Dashboard/Sidebar";
import AdminNavbar from "../../../components/Dashboard/Navbar";
import CategoryManager from "../../../components/Dashboard/CategoryManager";
import DashboardFooter from "../../../components/Dashboard/DashboardFooter";

export default function AdminCategoriesPage() {
  return (
    <div className="ad-dashboard-layout">
      <Sidebar />
      <div className="ad-main-content">
        <AdminNavbar />
        <div className="ad-dashboard-content">
          <CategoryManager />
        </div>
        <DashboardFooter />
      </div>
    </div>
  );
}
