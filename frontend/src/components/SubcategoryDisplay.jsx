import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet";
import "../styles/SubcategoryDisplay.css";
import categoryHighlights from "../data/highlightsdata";
import aboutSubcategoryData from "../data/faqsdata";
import Testimonials from "./Testimonials";
import GetQuoteCTA from "./GetQuoteCTA";

const SubcategoryDisplay = () => {
  const { category: categorySlug } = useParams(); 
  const [categoryData, setCategoryData] = useState(null);

  

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/category/categories/${categorySlug}`) 
      .then((res) => setCategoryData(res.data))
      .catch((err) => console.error("Error fetching category:", err));
  }, [categorySlug]);

  if (!categoryData) return <div>Loading...</div>;

  return (
    <>
      
      <Helmet>
        <title>{categoryData.name} | MF Global Services</title>
        <meta
          name="description"
          content={
            categoryData.tag
              ? categoryData.tag.replace(/\n/g, " ")
              : `Explore our premium range of ${categoryData.name} at MF Global Services. Discover corporate gifting options with customization.`
          }
        />
      </Helmet>

      <div className="subcategory-header-3">
        <div className="subcategory-header-content-3">
          <Link to="/" className="back-link-3">
            <div className="circle-3">
              <span className="arrow-3">&larr;</span>
            </div>
            <span className="span-name-3">Back to home</span>
          </Link>
          <h1 className="subcategory-title-3">{categoryData.name}</h1>
          <p className="subcategory-description-3">{categoryData.tag}</p>
        </div>
        <div className="head-img">
          <img src={`/assets/categories/${categoryData.name}.png`} alt={categoryData.name} />
        </div>
      </div>

      
      <div className="subcategory-container">
        <div className="subcategory-grid">
          {categoryData.subcategories?.map((sub) => (
            <Link
              key={sub._id}
              to={`/${categorySlug}/${sub.slug}`} 
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

      
      {categoryHighlights[categoryData.name] && (
        <div className="highlights-section">
          <h2 className="highlights-heading">
            {categoryHighlights[categoryData.name].heading}
          </h2>
          <div className="highlights-grid">
            {categoryHighlights[categoryData.name].highlights.map(
              (highlight, i) => (
                <div key={i} className="highlight-card">
                  <div className="highlight-icon">{highlight.icon}</div>
                  <h3 className="highlight-title">{highlight.title}</h3>
                  <p className="highlight-description">
                    {highlight.description}
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      )}

    
      {aboutSubcategoryData[categoryData.name] && (
        <div className="about-subcategory-container">
          <div className="about-subcategory">
            <h2 className="about-heading">
              {aboutSubcategoryData[categoryData.name].heading}
            </h2>
            <p className="about-description">
              {aboutSubcategoryData[categoryData.name].description}
            </p>
            <div className="faq-section">
              {aboutSubcategoryData[categoryData.name].faqs.map(
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
              src={aboutSubcategoryData[categoryData.name].image}
              alt={categoryData.name}
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
