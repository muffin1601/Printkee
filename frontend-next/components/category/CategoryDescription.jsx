// src/components/category/CategoryDescription.jsx

import React from "react";
import categoryDescriptions from "../../data/categorydescriptions";
import styles from "./CategoryDescription.module.css";

const CategoryDescription = ({ category }) => {
  const rawHTML = categoryDescriptions[category];

  if (!rawHTML) return null;

  return (
    <section className={styles.wrapper} aria-label="Category description">
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: rawHTML }}
      />
    </section>
  );
};

export default CategoryDescription;
