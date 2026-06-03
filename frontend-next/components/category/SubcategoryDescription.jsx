// src/components/SubcategoryDescription.jsx

import React from "react";
import subcategoryDescriptions from "../../data/subcategorydescriptions";
import styles from "./SubcategoryDescription.module.css";

const SubcategoryDescription = ({ subcategory }) => {
  const rawHTML = subcategoryDescriptions[subcategory];

  if (!rawHTML) return null;

  // Convert bullet lines into <li> items
  const bulletLines = rawHTML.match(/^ *• *(.*)$/gm);
  let formattedHTML = rawHTML;

  if (bulletLines) {
    const listItems = bulletLines
      .map((line) => line.replace(/^ *• */, "").trim())
      .map((item) => `<li>${item}</li>`)
      .join("");

    // Replace the bullet block with a proper unordered list
    formattedHTML = rawHTML.replace(
      /(^ *• *.*(\n|$))+/gm,
      `<ul class="subcategory-description-list">${listItems}</ul>`
    );
  }

  const formatTitle = (text) =>
    text.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  const title = formatTitle(subcategory);

  return (
    <section
      className={styles.subcategoryDescriptionWrapper}
      aria-labelledby="subcategory-desc-title"
    >
      {/* <h2 id="subcategory-desc-title" className={styles.subcategoryDescriptionTitle}>
        {title}
      </h2> */}

      <div
        className={styles.subcategoryDescriptionContent}
        dangerouslySetInnerHTML={{ __html: formattedHTML }}
      />
    </section>
  );
};

export default SubcategoryDescription;
