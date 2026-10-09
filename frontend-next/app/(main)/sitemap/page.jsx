import Link from "next/link";
import styles from "@/styles/Sitemap.module.css";
import { catalogSeoGroups } from "@/data/catalogSeoPages";

export const metadata = {
  title: { absolute: "Sitemap | Printkee" },
  description:
    "Navigate all Printkee pages including categories, brands, blogs, and contact information through our easy-to-use sitemap.",
  keywords: ["sitemap", "Printkee sitemap", "corporate gifting sitemap", "categories", "brands"],
  alternates: { canonical: "https://printkee.com/sitemap" },
};

const sections = [
  {
    title: "Custom T-Shirt Solutions",
    links: [
      { label: "All custom T-shirts", href: "/t-shirts" },
      { label: "Corporate T-shirts", href: "/t-shirts/corporate-t-shirts" },
      { label: "Promotional T-shirts", href: "/t-shirts/promotional-t-shirts" },
      { label: "Personalized T-shirts", href: "/t-shirts/personalized-t-shirts" },
      { label: "Bulk T-shirt printing", href: "/t-shirts/bulk-t-shirt-printing" },
      { label: "Logo-printed T-shirts", href: "/t-shirts/logo-printed-t-shirts" },
    ],
  },
  ...catalogSeoGroups.map((group) => ({
    title: `Custom ${group.label}`,
    links: group.pages.map((page) => ({ label: page.name, href: page.path })),
  })),
  {
    title: "Location Hubs",
    links: [
      { label: "All locations", href: "/locations" },
      { label: "Corporate gifts in Delhi", href: "/delhi/corporate-gifts" },
      { label: "Corporate gifts in Noida", href: "/noida/corporate-gifts" },
      { label: "Corporate gifts in Greater Noida", href: "/greater-noida/corporate-gifts" },
      { label: "Corporate gifts in Gurgaon", href: "/gurgaon/corporate-gifts" },
      { label: "Corporate gifts in Faridabad", href: "/faridabad/corporate-gifts" },
      { label: "Corporate gifts in Ghaziabad", href: "/ghaziabad/corporate-gifts" },
    ],
  },
  {
    title: "Main Pages",
    links: [
      { label: "Home",        href: "/" },
      { label: "About Us",    href: "/about" },
      { label: "Blog",        href: "/blogs" },
      { label: "Brands",      href: "/brands" },
      { label: "Contact Us",  href: "/contact" },
      { label: "Privacy Policy", href: "/privacy-policy" },
    ],
  },
  {
    title: "Shop by Category",
    links: [
      { label: "Apparel & Accessories",   href: "/apparel-and-accessories" },
      { label: "Bags and Travel",          href: "/bags-and-travel" },
      { label: "Drink Ware",              href: "/drink-ware" },
      { label: "Office & Writing",         href: "/office-and-writing" },
      { label: "Technology Accessories",   href: "/technology-accessories" },
      { label: "Eco-Products",             href: "/eco-products" },
      { label: "Trophy and Momento",       href: "/trophy-and-momento" },
      { label: "Collection",               href: "/collection" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us",     href: "/about" },
      { label: "Our Services", href: "/contact" },
      { label: "Bulk Orders",  href: "/contact" },
      { label: "Industries",   href: "/contact" },
      { label: "Blog",         href: "/blogs" },
      { label: "Contact Us",   href: "/contact" },
    ],
  },
  {
    title: "Customer Support",
    links: [
      { label: "Privacy Policy",    href: "/privacy-policy" },
      { label: "FAQs",              href: "/#faqhome-title" },
    ],
  },
];

export default async function Sitemap() {
  let approvedPages = [];
  try {
    const backend = process.env.BACKEND_URL || "http://localhost:5031";
    const response = await fetch(`${backend}/api/seo-pages/indexable`, { cache: "no-store" });
    if (response.ok) approvedPages = await response.json();
  } catch {}
  const visibleSections = approvedPages.length ? [...sections, {
    title: "Approved commercial guides",
    links: approvedPages.map((page) => ({ label: page.name || page.h1 || page.primaryKeyword, href: page.path })),
  }] : sections;
  return (
    <div className={styles.page}>

      {/* ── Page Header ── */}
      <div className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Navigation</p>
          <h1 className={styles.heading}>Sitemap</h1>
          <p className={styles.sub}>
            Explore all pages, categories and resources on Printkee.
          </p>
        </div>
      </div>

      {/* ── Sections Grid ── */}
      <div className={styles.content}>
        <div className={styles.grid}>
          {visibleSections.map(({ title, links }) => (
            <section key={title} className={styles.section}>
              <h2 className={styles.sectionTitle}>{title}</h2>
              <ul className={styles.list}>
                {links.map(({ label, href }) => (
                  <li key={label} className={styles.item}>
                    <Link href={href} className={styles.link}>
                      <span className={styles.arrow} aria-hidden="true">›</span>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>

    </div>
  );
}
