"use client";
import Sidebar from "../../../components/Dashboard/Sidebar";
import AdminNavbar from "../../../components/Dashboard/Navbar";
import HeroManager from "../../../components/Dashboard/HeroManager";
import DashboardFooter from "../../../components/Dashboard/DashboardFooter";

export default function AdminBannersPage() {
  return (
    <div className="ad-dashboard-layout">
      <Sidebar />
      <div className="ad-main-content">
        <AdminNavbar />
        <div className="ad-dashboard-content">
          <HeroManager />
        </div>
        <DashboardFooter />
      </div>
    </div>
  );
}
