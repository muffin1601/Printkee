// src/pages/SubcategoryPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "../styles/SubcategoryDisplay.css";

const SubcategoryDisplay = () => {
  const { category } = useParams();
  const [subcategories, setSubcategories] = useState([]);
  const [categoryTag, setCategoryTag] = useState("");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/${category}`)
      .then((res) => {
        setSubcategories(res.data.subcategories || []);
        setCategoryTag(res.data.tag || "");
      })
      .catch((err) =>
        console.error("Failed to fetch category and subcategories:", err)
      );
  }, [category]);

  return (
    <>
      <div className="subcategory-header">
        <div className="subcategory-header-content">
          <Link to="/" className="back-link"><div class="circle">
            <span class="arrow">&larr;</span>
          </div><span className="span-name">Back to home</span></Link>
          <h1 className="subcategory-title">{category.replace(/-/g, " ")}</h1>
          <p className="subcategory-description">{categoryTag}</p>
        </div>
      </div>

      <div className="subcategory-container">
        <div className="subcategory-grid">
          {subcategories.map((sub) => (
            <Link
              key={sub._id}
              to={`/${encodeURIComponent(category)}/${encodeURIComponent(sub.name)}`}
              className="subcategory-card"
            >
              <img src={sub.image} alt={sub.name} className="subcategory-image" />
              <h3 className="subcategory-name">{sub.name}</h3>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default SubcategoryDisplay;
