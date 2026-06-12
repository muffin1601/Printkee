// Reusable product CTA block. Renders the approved document CTA title +
// paragraph verbatim. Data-driven: pass the strings in; renders nothing if absent.
import React from "react";
import styles from "./ProductCTA.module.css";

const ProductCTA = ({ title, description }) => {
  if (!title && !description) return null;

  return (
    <section className={styles.ctaWrapper} aria-label="Call to action">
      <div className={styles.ctaInner}>
        {title && <h2 className={styles.ctaTitle}>{title}</h2>}
        {description && <p className={styles.ctaDescription}>{description}</p>}
      </div>
    </section>
  );
};

export default ProductCTA;
