"use client";
import React from "react";
import { ArrowRight, Sparkles, Quote } from "lucide-react";
import styles from "../../styles/NewYear2027.module.css";

const HERO_PRODUCT_IDS = [
  "nutraj-gb52-leafy-whispers-300gm",
  "boat-stone-135",
  "fuzo-gale-tgz-1755",
];

const DiwaliHero = ({ products = [], onQuote }) => {
  const featuredProducts = HERO_PRODUCT_IDS.map((id) =>
    products.find((product) => product.id === id)
  ).filter(Boolean);

  return (
    <section className={styles.hero} aria-labelledby="new-year-hero-heading">
      <div className={styles.heroSparkles} aria-hidden="true">
        {Array.from({ length: 12 }, (_, index) => (
          <span key={index} className={styles.heroSparkle} />
        ))}
      </div>

      <div className={styles.heroInner}>
        <div className={styles.heroCopy}>
          <p className={styles.heroEyebrow}>
            <Sparkles size={14} aria-hidden="true" />
            Printkee presents
          </p>
          <h1 id="new-year-hero-heading" className={styles.heroTitle}>
            <span className={styles.heroWelcome}>WELCOME</span>
            <span className={styles.heroYear}>2027</span>
          </h1>
          <h2 className={styles.heroSubheading}>
            New Year. New Beginnings. Memorable Gifts.
          </h2>
          <p className={styles.heroSub}>
            Celebrate new beginnings with personalized corporate gifts,
            premium merchandise, and thoughtful gifting collections from
            Printkee.
          </p>

          <div className={styles.heroActions}>
            <a href="#new-year-collection" className={styles.heroCtaPrimary}>
              Explore Collection
              <ArrowRight size={16} aria-hidden="true" />
            </a>
            <button
              type="button"
              className={styles.heroCtaGhost}
              onClick={onQuote}
            >
              <Quote size={15} aria-hidden="true" />
              Get Bulk Quote
            </button>
          </div>

          <ul className={styles.heroTrust}>
            <li>Personalized branding</li>
            <li>Bulk order solutions</li>
            <li>Pan-India delivery</li>
          </ul>
        </div>

        <div
          className={styles.heroVisual}
          role="group"
          aria-label="Gift ideas from the collection"
        >
          <span className={styles.heroVisualYear} aria-hidden="true">2027</span>
          <span className={`${styles.heroOrbit} ${styles.heroOrbitOne}`} aria-hidden="true" />
          <span className={`${styles.heroOrbit} ${styles.heroOrbitTwo}`} aria-hidden="true" />
          {featuredProducts.map((product, index) => (
            <article
              key={product.id}
              className={`${styles.heroProduct} ${styles[`heroProduct${index + 1}`]}`}
            >
              <img
                src={product.image}
                alt={`${product.name}${product.brand ? ` by ${product.brand}` : ""}`}
                width="560"
                height="560"
                loading={index === 0 ? "eager" : "lazy"}
                fetchPriority={index === 0 ? "high" : "auto"}
                decoding="async"
              />
              <span>{product.category}</span>
            </article>
          ))}
          <span className={styles.heroRibbon} aria-hidden="true" />
        </div>
      </div>
    </section>
  );
};

export default DiwaliHero;
