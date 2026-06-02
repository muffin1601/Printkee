"use client";
import Sidebar from "../../../components/Dashboard/Sidebar";
import AdminNavbar from "../../../components/Dashboard/Navbar";
import SubcategoryManager from "../../../components/Dashboard/SubcategoryManager";
import DashboardFooter from "../../../components/Dashboard/DashboardFooter";

export default function AdminSubcategoriesPage() {
  return (
    <div className="ad-dashboard-layout">
      <Sidebar />
      <div className="ad-main-content">
        <AdminNavbar />
        <div className="ad-dashboard-content">
          <SubcategoryManager />
        </div>
        <DashboardFooter />
      </div>
    </div>
  );
}
