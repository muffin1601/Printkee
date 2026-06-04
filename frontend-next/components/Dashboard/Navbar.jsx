"use client";
import React from "react";
import { Search, Bell, User, LogOut } from "lucide-react";

const AdminNavbar = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <nav className="admin-navbar-container">
      <div className="admin-navbar-left">
        <h2 className="admin-navbar-title">Dashboard</h2>
      </div>

      <div className="admin-navbar-right">
        <div className="admin-navbar-search">
          <Search className="admin-navbar-search-icon" size={18} />
          <input type="text" placeholder="Search" />
        </div>

        <div className="admin-navbar-actions">
          <div className="admin-navbar-icon-box">
            <Bell className="admin-navbar-icon" />
            <span className="admin-navbar-notif-dot"></span>
          </div>

          <div className="admin-navbar-profile">
            <User className="admin-navbar-icon" />
            <span className="admin-navbar-username">Admin</span>
          </div>

          <button className="admin-navbar-logout" onClick={handleLogout}>
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
