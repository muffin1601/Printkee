import Link from "next/link";
import "@/styles/Sitemap.css";

export const metadata = {
  title: "Sitemap | MF Global Services",
  description:
    "Navigate all MF Global Services pages including categories, brands, blogs, and contact information through our easy-to-use sitemap.",
  keywords: ["sitemap", "MF Global Services", "Printkee sitemap", "corporate gifting sitemap", "categories", "brands"],
  alternates: { canonical: "https://printkee.com/sitemap" },
};

export default function Sitemap() {
  return (
    <div className="sitemap-container">
      <h1 className="sitemap-heading">Sitemap</h1>
      <p className="sitemap-description">Explore all key pages and collections on Printkee.</p>

      <section className="sitemap-section">
        <h2 className="sitemap-subheading">Main Pages</h2>
        <ul className="sitemap-list">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/about">About Us</Link></li>
          <li><Link href="/blogs">Blog</Link></li>
          <li><Link href="/brands">Brands</Link></li>
          <li><Link href="/contact">Contact Us</Link></li>
        </ul>
      </section>

      <section className="sitemap-section">
        <h2 className="sitemap-subheading">Popular Categories</h2>
        <ul className="sitemap-list">
          <li><Link href="/bags-and-travel">Bags and Travel</Link></li>
          <li><Link href="/eco-products">Eco-Products</Link></li>
          <li><Link href="/apparel-and-accessories">Apparel & Accessories</Link></li>
          <li><Link href="/collection">Collection</Link></li>
          <li><Link href="/drink-ware">Drink Ware</Link></li>
          <li><Link href="/technology-accessories">Technology Accessories</Link></li>
          <li><Link href="/trophy-and-momento">Trophy and Momento</Link></li>
          <li><Link href="/office-and-writing">Office & Writing</Link></li>
        </ul>
      </section>
    </div>
  );
}
