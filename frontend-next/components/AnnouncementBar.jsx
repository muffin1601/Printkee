"use client";
import { Package, Palette, Truck, ShieldCheck } from "lucide-react";
import styles from "../styles/AnnouncementBar.module.css";

const items = [
  { icon: <Package size={13} />, label: "Bulk Order Support" },
  { icon: <Palette size={13} />, label: "Custom Branding" },
  { icon: <Truck size={13} />, label: "Pan India Delivery" },
  { icon: <ShieldCheck size={13} />, label: "Lowest Prices Guaranteed" },
];

const AnnouncementBar = () => (
  <div className={styles.bar} role="banner" aria-label="Site announcements">
    <ul className={styles.list}>
      {items.map(({ icon, label }) => (
        <li key={label} className={styles.item}>
          {icon}
          <span>{label}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default AnnouncementBar;
