"use client";
import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import styles from "../../styles/Diwali.module.css";
import DiwaliProductCard from "./DiwaliProductCard";
import Reveal from "./Reveal";

/**
 * One festive product section: eyebrow, heading, optional link and a
 * responsive grid of real products. Renders nothing at all when the
 * backend returned no products for the collection, so the page never
 * shows an empty shell.
 */
const DiwaliCollection = ({
  id,
  eyebrow,
  title,
  description,
  products = [],
  onEnquire,
  moreHref,
  moreLabel = "View all",
  priority = false,
  alt = false,
}) => {
  if (!products.length) return null;

  const headingId = `${id}-heading`;

  return (
    <section
      className={`${styles.section} ${alt ? styles.sectionAlt : ""}`}
      id={id}
      aria-labelledby={headingId}
    >
      <div className={styles.sectionInner}>
        <Reveal as="header" className={styles.sectionHead}>
          {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
          <h2 id={headingId} className={styles.sectionTitle}>
            {title}
          </h2>
          {description && <p className={styles.sectionDesc}>{description}</p>}
          {moreHref && (
            <Link href={moreHref} className={styles.sectionMore}>
              {moreLabel} <ArrowRight size={13} aria-hidden="true" />
            </Link>
          )}
        </Reveal>

        <ul className={styles.grid}>
          {products.map((product, i) => (
            <Reveal
              as="li"
              key={product._id || product.slug}
              delay={Math.min(i, 3) * 70}
              className={styles.gridItem}
            >
              <DiwaliProductCard
                product={product}
                onEnquire={onEnquire}
                priority={priority && i < 4}
              />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default DiwaliCollection;
