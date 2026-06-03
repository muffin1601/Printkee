import Link from "next/link";
import styles from "@/styles/Sitemap.module.css";

export const metadata = {
  title: "Sitemap | Printkee",
  description:
    "Navigate all Printkee pages including categories, brands, blogs, and contact information through our easy-to-use sitemap.",
  keywords: ["sitemap", "Printkee sitemap", "corporate gifting sitemap", "categories", "brands"],
  alternates: { canonical: "https://printkee.com/sitemap" },
};

const sections = [
  {
    title: "Main Pages",
    links: [
      { label: "Home",        href: "/" },
      { label: "About Us",    href: "/about" },
      { label: "Blog",        href: "/blogs" },
      { label: "Brands",      href: "/brands" },
      { label: "Contact Us",  href: "/contact" },
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
      { label: "Shipping Policy",   href: "/contact" },
      { label: "Privacy Policy",    href: "/contact" },
      { label: "Terms & Conditions",href: "/contact" },
      { label: "FAQs",              href: "/contact" },
    ],
  },
];

export default function Sitemap() {
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
          {sections.map(({ title, links }) => (
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
