"use client";
import Sidebar from "../../components/Dashboard/Sidebar";
import AdminNavbar from "../../components/Dashboard/Navbar";
import Overview from "../../components/Dashboard/Overview";
import DashboardFooter from "../../components/Dashboard/DashboardFooter";

export default function AdminDashboardPage() {
  return (
    <div className="ad-dashboard-layout">
      <Sidebar />
      <div className="ad-main-content">
        <AdminNavbar />
        <div className="ad-dashboard-content">
          <Overview />
        </div>
        <DashboardFooter className="ad-dashboard-footer" />
      </div>
    </div>
  );
}
