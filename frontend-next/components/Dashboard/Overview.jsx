"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Package, Layers, Eye, Image } from "lucide-react";

const Overview = () => {
  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
    visitors: 0,
    subcategories: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/admin/stats`
        );
        setStats(res.data);
      } catch (error) {
        console.log("Error fetching stats", error);
      }
    };

    fetchStats();
  }, []);

  const cards = [
    { label: "Total Products", value: stats.products, icon: <Package />, color: "var(--green)" },
    { label: "Categories", value: stats.categories, icon: <Layers />, color: "var(--orange)" },
    { label: "Total Visitors", value: stats.visitors, icon: <Eye />, color: "var(--green-mid)" },
    { label: "Total Subcategories", value: stats.subcategories, icon: <Image />, color: "var(--peach)" },
  ];

  return (
    <div className="overview-section">
      <div className="overview-header">
        <h2>Welcome back, Admin</h2>
        <p>Here’s a quick look at your site’s management.</p>
      </div>

      <div className="overview-grid">
        {cards.map((item, index) => (
          <div key={index} className="overview-card-4">
            <div
              className="overview-icon-4"
              style={{ background: `color-mix(in srgb, ${item.color} 14%, #fff)`, color: item.color }}
            >
              {item.icon}
            </div>

            <div className="overview-info">
              <h3 className="info1">{item.value}</h3>
              <p className="info2">{item.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Overview;
