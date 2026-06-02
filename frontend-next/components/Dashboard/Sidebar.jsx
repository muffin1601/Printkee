"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Layers, Package, ShoppingBag } from "lucide-react";

const Sidebar = () => {
  const pathname = usePathname();

  const isActive = (href) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-header">
        <Link href="/" style={{ display: "inline-block" }}>
          <img
            src="/assets/printkeeLogo.webp"
            alt="Logo"
            className="admin-sidebar-logo"
            style={{ width: 180, height: 80, objectFit: "contain", borderRadius: 6 }}
          />
        </Link>
      </div>

      <ul className="admin-sidebar-menu">
        <li>
          <Link href="/admin" className={isActive("/admin") ? "active" : ""}>
            <LayoutDashboard className="icon-3" />
            <span>Dashboard</span>
          </Link>
        </li>
        <li>
          <Link href="/admin/categories" className={isActive("/admin/categories") ? "active" : ""}>
            <Layers className="icon-3" />
            <span>Categories</span>
          </Link>
        </li>
        <li>
          <Link href="/admin/subcategories" className={isActive("/admin/subcategories") ? "active" : ""}>
            <Package className="icon-3" />
            <span>Subcategories</span>
          </Link>
        </li>
        <li>
          <Link href="/admin/products" className={isActive("/admin/products") ? "active" : ""}>
            <ShoppingBag className="icon-3" />
            <span>Products</span>
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
