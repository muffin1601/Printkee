import React from "react";
import  allSubcategoryDescriptions  from "../../data/subcategorydescriptions";
import "./SubcategoryDescription.css";

const SubcategoryDescription = ({ slug }) => {
  const content = allSubcategoryDescriptions[slug];

  if (!content) return null;

  return (
    <div className="subcategory-description-wrapper">
      <div
        className="subcategory-description-content"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};

export default SubcategoryDescription;
