"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../styles/RelatedCategories.module.css";
import Link from "next/link";
import navbarSubcategories from "../data/list";
import { LayoutGrid } from "lucide-react";

const RelatedCategories = ({ categorySlug, currentSubcategorySlug }) => {
  const [related, setRelated]     = useState([]);
  const [useFallback, setUseFallback] = useState(false);

  useEffect(() => {
    const fetchRelated = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/subcategory/subcategories/related-subcategories/${currentSubcategorySlug}`
        );
        const data = res.data.relatedSubcategories || [];
        if (data.length > 0) {
          setRelated(data);
        } else {
          setUseFallback(true);
        }
      } catch {
        setUseFallback(true);
      }
    };
    fetchRelated();
  }, [currentSubcategorySlug]);

  /* ── Static fallback from navbarSubcategories ── */
  if (useFallback) {
    const allCategories = Object.entries(navbarSubcategories)
      .filter(([, data]) => !data.href.includes(currentSubcategorySlug))
      .slice(0, 8);

    if (allCategories.length === 0) return null;

    return (
      <section className={styles["related-categories"]} aria-labelledby="related-heading">
        <div className={styles["related-header"]}>
          <LayoutGrid size={16} className={styles["related-icon"]} aria-hidden="true" />
          <h2 id="related-heading">Explore More Categories</h2>
        </div>
        <div className={styles["related-grid"]}>
          {allCategories.map(([cat, data]) => (
            <Link key={cat} href={data.href} className={styles["related-item"]} aria-label={`Explore ${cat}`}>
              <div className={styles["related-item-label"]}>
                <span className={styles["item-name"]}>{cat}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    );
  }

  /* ── API data ── */
  if (related.length === 0) return null;

  return (
    <section className={styles["related-categories"]} aria-labelledby="related-heading">
      <div className={styles["related-header"]}>
        <LayoutGrid size={16} className={styles["related-icon"]} aria-hidden="true" />
        <h2 id="related-heading">Explore More in This Category</h2>
      </div>
      <div className={styles["related-grid"]}>
        {related.map((cat) => (
          <article key={cat.slug} className={styles["related-item-wrapper"]}>
            <Link href={`/${categorySlug}/${cat.slug}`} className={styles["related-item"]} aria-label={`Explore ${cat.name}`}>
              <img src={cat.image} alt={cat.name || "Related category"} className={styles["related-item-img"]} loading="lazy" />
              <p className={styles["item-name"]}>{cat.name}</p>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
};

export default RelatedCategories;
