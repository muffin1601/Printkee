// src/components/SubcategoryDescription.jsx

import React from "react";
import subcategoryDescriptions from "../../data/subcategorydescriptions";
import "./SubcategoryDescription.css";

const SubcategoryDescription = ({ subcategory }) => {
  const rawHTML = subcategoryDescriptions[subcategory];

  if (!rawHTML) return null;

  // Convert bullet lines (• something) into <p class="bullet-item">
  const formattedHTML = rawHTML.replace(
    /^ *• *(.*)$/gm,
    `<p class="bullet-item">$1</p>`
  );

  const formatTitle = (text) =>
    text.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

  return (
    <div className="subcategory-description-wrapper">
      {/* <h2 className="subcategory-description-title">
        {formatTitle(subcategory)}
      </h2> */}

      <div
        className="subcategory-description-content"
        dangerouslySetInnerHTML={{ __html: formattedHTML }}
      />
    </div>
  );
};

export default SubcategoryDescription;
