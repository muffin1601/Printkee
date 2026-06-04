"use client";
import Sidebar from "../../../components/Dashboard/Sidebar";
import AdminNavbar from "../../../components/Dashboard/Navbar";
import BlogManager from "../../../components/Dashboard/BlogManager";
import DashboardFooter from "../../../components/Dashboard/DashboardFooter";

export default function AdminBlogsPage() {
  return (
    <div className="ad-dashboard-layout">
      <Sidebar />
      <div className="ad-main-content">
        <AdminNavbar />
        <div className="ad-dashboard-content">
          <BlogManager />
        </div>
        <DashboardFooter />
      </div>
    </div>
  );
}
