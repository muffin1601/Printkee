import Link from "next/link";
import { locationPageEntries } from "../../../data/locationSeo";
import styles from "../../../styles/LocationLanding.module.css";

const BASE = "https://printkee.com";

export const metadata = {
  title: "Corporate Gifting Service Areas in Delhi NCR | Printkee",
  description: "Explore Printkee corporate gifting guidance for key Delhi NCR business locations, including Delhi, Noida, Greater Noida, Gurgaon, Faridabad and Ghaziabad.",
  alternates: { canonical: `${BASE}/locations` },
  openGraph: { title: "Corporate Gifting Service Areas in Delhi NCR | Printkee", description: "Find corporate gifting guidance for Printkee’s key Delhi NCR service areas.", url: `${BASE}/locations`, type: "website" },
};

export default function LocationsPage() {
  const schema = { "@context": "https://schema.org", "@type": "ItemList", name: "Printkee corporate gifting locations", itemListElement: locationPageEntries.map((entry, index) => ({ "@type": "ListItem", position: index + 1, name: `Corporate Gifts in ${entry.name}`, url: `${BASE}/${entry.slug}/corporate-gifts` })) };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /><main className={styles.page}><header className={styles.hero}><p>Locations</p><h1>Corporate Gifting Across Delhi NCR</h1><span>Explore location-specific corporate gifting guidance for business teams planning a relevant, well-organised brief.</span></header><div className={styles.content}><nav className={styles.breadcrumbs} aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><span>Locations</span></nav><section><h2>Choose your business location</h2><p>Each location page supports city-specific corporate-gifting research while the national <Link href="/collection">corporate gift collection</Link> remains the primary place to explore product categories.</p><div className={styles.nearby}>{locationPageEntries.map((entry) => <Link key={entry.slug} href={`/${entry.slug}/corporate-gifts`}>Corporate gifts in {entry.name}</Link>)}</div></section><section><h2>Planning a multi-location programme?</h2><p>Use one clear recipient and delivery brief, then discuss product fit, customisation and dispatch requirements with the team.</p><Link href="/contact">Request a corporate gifting quote</Link></section></div></main></>;
}
