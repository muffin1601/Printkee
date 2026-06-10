// src/components/SubcategoryDescription.jsx

import React from "react";
import subcategoryDescriptions from "../../data/subcategorydescriptions";
import styles from "./SubcategoryDescription.module.css";

const SubcategoryDescription = ({ subcategory, seoH2 }) => {
  const rawHTML = subcategoryDescriptions[subcategory];

  if (!rawHTML) return null;

  // When an SEO h2 is supplied, use it as the block's top heading and strip
  // the hardcoded leading <h2> from the content so it isn't duplicated.
  let baseHTML = rawHTML;
  if (seoH2) {
    baseHTML = baseHTML.replace(/^\s*<h2>[\s\S]*?<\/h2>\s*/, "");
  }

  // Convert bullet lines into <li> items
  const bulletLines = baseHTML.match(/^ *• *(.*)$/gm);
  let formattedHTML = baseHTML;

  if (bulletLines) {
    const listItems = bulletLines
      .map((line) => line.replace(/^ *• */, "").trim())
      .map((item) => `<li>${item}</li>`)
      .join("");

    // Replace the bullet block with a proper unordered list
    formattedHTML = baseHTML.replace(
      /(^ *• *.*(\n|$))+/gm,
      `<ul class="subcategory-description-list">${listItems}</ul>`
    );
  }

  return (
    <section
      className={styles.subcategoryDescriptionWrapper}
      aria-labelledby="subcategory-desc-title"
    >
      {seoH2 && (
        <h2 id="subcategory-desc-title" className={styles.subcategoryDescriptionTitle}>
          {seoH2}
        </h2>
      )}

      <div
        className={styles.subcategoryDescriptionContent}
        dangerouslySetInnerHTML={{ __html: formattedHTML }}
      />
    </section>
  );
};

export default SubcategoryDescription;
