import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "../styles/SubcategoryDisplay.css";
import categoryHighlights from "../data/highlightsdata";
import aboutSubcategoryData from "../data/faqsdata";
import Testimonials from "./Testimonials";
import GetQuoteCTA from "./GetQuoteCTA";

const SubcategoryDisplay = () => {
  const { category } = useParams();
  const [subcategories, setSubcategories] = useState([]);
  const [categoryTag, setCategoryTag] = useState("");

  const slugify = (text) =>
    text
      .toLowerCase()
      .trim()
      .replace(/&/g, "and")
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/--+/g, "-");

  const formatCategory = (slug) =>
    slug
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

  const formattedCategory = formatCategory(category);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/${formattedCategory}`)
      .then((res) => {
        setSubcategories(res.data.subcategories || []);
        setCategoryTag(res.data.tag || "");
      })
      .catch((err) => console.error("Error fetching subcategories:", err));
  }, [category]);

  return (
    <>
      <div className="subcategory-header">
        <div className="subcategory-header-content">
          <Link to="/" className="back-link">
            <div className="circle">
              <span className="arrow-2">&larr;</span>
            </div>
            <span className="span-name">Back to home</span>
          </Link>
          <h1 className="subcategory-title">{formattedCategory}</h1>
          <p className="subcategory-description">{categoryTag}</p>
        </div>
      </div>

      <div className="subcategory-container">
        <div className="subcategory-grid">
          {subcategories.map((sub) => (
            <Link
              key={sub._id}
              to={`/${slugify(category)}/${slugify(sub.name)}`}
              className="subcategory-card"
            >
              <img
                src={sub.image}
                alt={sub.name}
                className="subcategory-image"
              />
              <h3 className="subcategory-name">{sub.name}</h3>
            </Link>
          ))}
        </div>
      </div>

      {categoryHighlights[formattedCategory] && (
        <div className="highlights-section">
          <h2 className="highlights-heading">
            {categoryHighlights[formattedCategory].heading}
          </h2>
          <div className="highlights-grid">
            {categoryHighlights[formattedCategory].highlights.map(
              (highlight, i) => (
                <div key={i} className="highlight-card">
                  <div className="highlight-icon">{highlight.icon}</div>
                  <h3 className="highlight-title">{highlight.title}</h3>
                  <p className="highlight-description">{highlight.description}</p>
                </div>
              )
            )}
          </div>
        </div>
      )}

      {aboutSubcategoryData[formattedCategory] && (
        <div className="about-subcategory-container">
          <div className="about-subcategory">
            <h2 className="about-heading">
              {aboutSubcategoryData[formattedCategory].heading}
            </h2>
            <p className="about-description">
              {aboutSubcategoryData[formattedCategory].description}
            </p>
            <div className="faq-section">
              {aboutSubcategoryData[formattedCategory].faqs.map(
                (faq, index) => (
                  <div key={index} className="faq-item">
                    <h4 className="faq-question">{faq.question}</h4>
                    <p className="faq-answer">{faq.answer}</p>
                  </div>
                )
              )}
            </div>
          </div>
          <div className="subcategory-image-container">
            <img
              src={aboutSubcategoryData[formattedCategory].image}
              alt={formattedCategory}
              className="subcategory-about-image"
            />
          </div>
        </div>
      )}

      <Testimonials />
      <GetQuoteCTA />
    </>
  );
};

export default SubcategoryDisplay;
