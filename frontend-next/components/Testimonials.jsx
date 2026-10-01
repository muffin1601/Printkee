import React from "react";
import Link from "next/link";
import styles from "../styles/Testimonials.module.css";

const steps = [
  { title: "Define the brief", text: "Share the recipient group, quantity, occasion, budget context and required-in-hand date." },
  { title: "Review suitable options", text: "Compare products using their documented materials, sizes, colours and available branding methods." },
  { title: "Confirm the scope", text: "Approve the selected item, artwork, packaging and delivery details before production is arranged." },
];

const Testimonials = () => <section className={styles.section} aria-labelledby="buying-support-heading">
  <div className={styles.header}><h2 id="buying-support-heading" className={styles.heading}>A Clearer Corporate Gifting Brief</h2><p className={styles.sub}>A practical starting point for employee, client, event and promotional merchandise enquiries.</p></div>
  <div className={styles.cards}>{steps.map((item, index) => <article key={item.title} className={styles.card}><div className={styles.cardTop}><span className={styles.quoteIcon} aria-hidden="true">{index + 1}</span></div><h3 className={styles.name}>{item.title}</h3><p className={styles.review}>{item.text}</p></article>)}</div>
  <div className={styles.ctaWrap}><Link href="/contact" className={styles.ctaBtn}>Share your requirement →</Link></div>
</section>;

export default Testimonials;
