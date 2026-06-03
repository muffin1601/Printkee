import React from "react";
import styles from "./WhyChooseUsProduct.module.css";

const WhyChooseUsProduct = ({ productName, subcategoryName }) => {
  const name = productName || subcategoryName || "this product";

  return (
    <section
      className={styles.wcupWrapper}
      aria-labelledby="why-choose-us-title"
    >
      <h2 id="why-choose-us-title" className={styles.wcupTitle}>
        Why Choose Us for {name}?
      </h2>

      <ul className={styles.wcupGrid} role="list">
        <li className={styles.wcupCard}>
          <h3 className={styles.wcupCardTitle}>Premium Material Quality</h3>
          <p className={styles.wcupCardText}>
            Every {name} undergoes strict multi-level quality checks to ensure
            durability, top-grade finishing, and a professional branded appearance.
          </p>
        </li>

        <li className={styles.wcupCard}>
          <h3 className={styles.wcupCardTitle}>Expert Custom Branding</h3>
          <p className={styles.wcupCardText}>
            Our team specializes in embroidery, engraving, UV printing, and
            premium logo customization to enhance the look of your {name}.
          </p>
        </li>

        <li className={styles.wcupCard}>
          <h3 className={styles.wcupCardTitle}>Bulk Order Capability</h3>
          <p className={styles.wcupCardText}>
            We deliver consistent printing and production quality whether you
            order 50 units or 5,000 — ideal for corporate events and gifting.
          </p>
        </li>

        <li className={styles.wcupCard}>
          <h3 className={styles.wcupCardTitle}>Fast & Reliable Delivery</h3>
          <p className={styles.wcupCardText}>
            Perfect for onboarding kits, event giveaways, marketing campaigns,
            and urgent requirements across Delhi NCR.
          </p>
        </li>

        <li className={styles.wcupCard}>
          <h3 className={styles.wcupCardTitle}>End-to-End Corporate Support</h3>
          <p className={styles.wcupCardText}>
            From concept to dispatch — branding, sampling, packaging, and
            logistics — we manage everything for a seamless experience.
          </p>
        </li>

        <li className={styles.wcupCard}>
          <h3 className={styles.wcupCardTitle}>Trusted by Top Corporates</h3>
          <p className={styles.wcupCardText}>
            Leading startups, SMEs, and global companies rely on us for
            reliability, premium quality, and professional service.
          </p>
        </li>
      </ul>
    </section>
  );
};

export default WhyChooseUsProduct;
