"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import "../styles/SubcategoryDisplay.css";
import categoryHighlights from "../data/highlightsdata";
import aboutSubcategoryData from "../data/faqsdata";
import Testimonials from "./Testimonials";
import GetQuoteCTA from "./GetQuoteCTA";

const SubcategoryDisplay = ({ categoryData }) => {
  const { category: categorySlug } = useParams();
  const [openFaq, setOpenFaq] = useState(null);

  if (!categoryData) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <p>Unable to load category. Please ensure the backend is running.</p>
      </div>
    );
  }

  return (
    <>
      {/* HEADER */}
      <div className="subcategory-header-3">
        <div className="subcategory-header-content-3">
          <Link href="/" className="back-link-3" aria-label="Go back to homepage">
            <div className="circle-3">
              <span className="arrow-3">&larr;</span>
            </div>
            <span className="span-name-3">Back to home</span>
          </Link>

          <h1 className="subcategory-title-3">{categoryData.name}</h1>
          <p className="subcategory-description-3">{categoryData.description}</p>
        </div>

        <div className="head-img">
          <img
            loading="lazy"
            src={`/assets/categories/${categorySlug}.webp`}
            alt={`${categoryData.name} category banner`}
          />
        </div>
      </div>

      {/* SUBCATEGORY GRID */}
      <section className="subcategory-container" aria-label="Subcategory list">
        <div className="subcategory-grid">
          {categoryData.subcategories?.map((sub) => (
            <Link
              key={sub._id}
              href={`/${categorySlug}/${sub.slug}`}
              className="subcategory-card"
              aria-label={`Explore ${sub.name}`}
            >
              <img
                src={sub.image}
                loading="lazy"
                alt={`${sub.name} subcategory image`}
                className="subcategory-image"
              />
              <h3 className="subcategory-name">{sub.name}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* HIGHLIGHTS */}
      {categoryHighlights[categorySlug] && (
        <section className="highlights-section">
          <h2 className="highlights-heading">
            {categoryHighlights[categorySlug].heading}
          </h2>
          <div className="highlights-grid">
            {categoryHighlights[categorySlug].highlights.map((highlight, index) => (
              <div key={index} className="highlight-card">
                <div className="highlight-icon">{highlight.icon}</div>
                <h3 className="highlight-title">{highlight.title}</h3>
                <p className="highlight-description">{highlight.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ABOUT + FAQ */}
      {aboutSubcategoryData[categorySlug] && (
        <section className="aboutsubcat-wrapper">
          <div className="aboutsubcat-card">
            <h2 className="aboutsubcat-heading">
              {aboutSubcategoryData[categorySlug].heading}
            </h2>
            <p className="aboutsubcat-description">
              {aboutSubcategoryData[categorySlug].description}
            </p>
            <div className="aboutsubcat-faqs">
              {aboutSubcategoryData[categorySlug].faqs.map((faq, index) => (
                <div key={index} className="aboutsubcat-faq-item">
                  <button
                    className="aboutsubcat-faq-question"
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    aria-expanded={openFaq === index}
                  >
                    {faq.question}
                  </button>
                  {openFaq === index && (
                    <div className="aboutsubcat-faq-answer">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <Testimonials />
      <GetQuoteCTA />
    </>
  );
};

export default SubcategoryDisplay;
