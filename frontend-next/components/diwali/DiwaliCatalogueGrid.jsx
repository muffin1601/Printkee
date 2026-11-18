"use client";
import React from "react";
import Image from "next/image";
import { isLocalUpload } from "../../utils/newYearImages";
import styles from "../../styles/NewYear2027.module.css";

const CatalogueCard = ({ product, onEnquire }) => (
  <article className={styles.productCard}>
    <div className={styles.productMedia}>
      <Image
        className={styles.productImg}
        src={product.image}
        alt={product.name}
        fill
        unoptimized={isLocalUpload(product.image)}
        sizes="(max-width: 380px) 90vw, (max-width: 680px) 45vw, (max-width: 1000px) 30vw, 300px"
      />
    </div>
    <div className={styles.productBody}>
      <h3 className={styles.productName}>{product.name}</h3>
      <button type="button" className={styles.productCta} onClick={() => onEnquire(product)} aria-label={`Enquire Now about ${product.name}`}>
        Enquire Now
      </button>
    </div>
  </article>
);

const DiwaliCatalogueGrid = ({ sections = [], onEnquire }) => (
  <div className={styles.collection}>
    <div className={styles.collectionInner}>
      {sections.map(({ id, title, products }, index) => {
        const anchor = index === 0 ? "new-year-collection" : id;
        return (
          <section
            key={id}
            id={anchor}
            className={`${styles.productSection} ${title ? "" : styles.productRowContinued}`}
            aria-labelledby={title ? `${anchor}-heading` : undefined}
          >
            {title && (
              <header className={styles.sectionHead}>
                <h2 id={`${anchor}-heading`} className={styles.sectionTitle}>{title}</h2>
              </header>
            )}
            <ul className={styles.productGrid}>
              {products.map((product) => (
                <li key={product.id} className={styles.productGridItem}>
                  <CatalogueCard product={product} onEnquire={onEnquire} />
                </li>
              ))}
            </ul>
          </section>
        );
      })}
      {!sections.length && <p className={styles.emptyState}>Please enquire about our New Year 2027 collection.</p>}
    </div>
  </div>
);
export default DiwaliCatalogueGrid;
