import Link from "next/link";
import styles from "../styles/HomeCommercialOverview.module.css";

const pathways = [
  ["Employee welcome kits", "/collection/welcome-kits", "Build a joining-kit brief around recipients, product categories, branding and delivery locations."],
  ["Custom apparel", "/apparel-and-accessories", "Explore branded clothing for teams, uniforms, events and employee programmes."],
  ["Bags and travel", "/bags-and-travel", "Compare backpacks, duffle bags, tote bags and other available branded bag formats."],
  ["Office merchandise", "/office-and-writing", "Find custom files, notebooks, pens, lanyards and identification products."],
  ["Corporate tech gifts", "/technology-accessories", "Review available charging, desk and computer accessories for business gifting."],
  ["Sustainable options", "/eco-products", "Explore options where material and environmental details can be verified for the selected item."],
  ["Seasonal gifting", "/diwali-special", "Plan festive employee and client gifting using the current seasonal catalogue."],
  ["Request a quotation", "/contact", "Share quantity, artwork, target date and delivery locations for a relevant proposal."],
];

export default function HomeCommercialOverview() {
  return (
    <section className={styles.section} aria-labelledby="business-gifting-heading">
      <div className={styles.intro}>
        <p className={styles.eyebrow}>Corporate gifting and promotional merchandise</p>
        <h2 id="business-gifting-heading">Start with your business requirement</h2>
        <p>Printkee helps business buyers explore corporate gifts and branded merchandise for employees, clients, events and promotional programmes. Use the relevant collection below, then confirm product specifications, branding, quantities and delivery details before ordering.</p>
      </div>
      <div className={styles.grid}>
        {pathways.map(([title, href, description]) => (
          <Link key={href} href={href} className={styles.card}>
            <h3>{title}</h3><p>{description}</p><span>Explore →</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
