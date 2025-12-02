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

  const canonicalUrl = `https://printkee.com/${categorySlug}`;

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/category/categories/${categorySlug}`)
      .then((res) => setCategoryData(res.data))
      .catch((err) => console.error("Error fetching category:", err));
  }, [categorySlug]);

  if (!categoryData) return <div>Loading...</div>;

  return (
    <>
      {/* SEO */}
      <Helmet>
        <title>{categoryData.name} | MF Global Services</title>
        <meta
          name="description"
          content={
            categoryData.tag
              ? categoryData.tag.replace(/\n/g, " ")
              : `Explore our premium collection of ${categoryData.name} at MF Global Services. Customizable, branded, and corporate-ready gifting options.`
          }
        />
        <meta
          name="keywords"
          content={`${categoryData.name}, corporate gifts, ${categoryData.name} India, gifting categories, Printkee corporate gifting`}
        />
        <meta property="og:title" content={categoryData.name} />
        <meta
          property="og:description"
          content={categoryData.tag || `Explore ${categoryData.name} category.`}
        />
        <meta property="og:url" content={canonicalUrl} />
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>

      {/* HEADER */}
      <div className="subcategory-header-3">
        <div className="subcategory-header-content-3">
          <Link
            to="/"
            className="back-link-3"
            aria-label="Go back to homepage"
          >
            <div className="circle-3">
              <span className="arrow-3">&larr;</span>
            </div>
            <span className="span-name-3">Back to home</span>
          </Link>

          <h1 className="subcategory-title-3">{categoryData.name}</h1>
          <p className="subcategory-description-3">{categoryData.tag}</p>
        </div>

        <div className="head-img">
          <img
            loading="lazy"
            src={`/assets/categories/${categorySlug}.png`}
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
              to={`/${categorySlug}/${sub.slug}`}
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
      {categoryHighlights[categoryData.name] && (
        <section className="highlights-section" aria-label="Category highlights">
          <h2 className="highlights-heading">
            {categoryHighlights[categoryData.name].heading}
          </h2>

          <div className="highlights-grid">
            {categoryHighlights[categoryData.name].highlights.map(
              (highlight, index) => (
                <div key={index} className="highlight-card">
                  <div className="highlight-icon" aria-hidden="true">
                    {highlight.icon}
                  </div>
                  <h3 className="highlight-title">{highlight.title}</h3>
                  <p className="highlight-description">{highlight.description}</p>
                </div>
              )
            )}
          </div>
        </section>
      )}

      {/* ABOUT + FAQ */}
      {aboutSubcategoryData[categoryData.name] && (
        <section
          className="aboutsubcat-wrapper"
          aria-label={`About ${categoryData.name} and FAQs`}
        >
          <div className="aboutsubcat-card">
            <h2 className="aboutsubcat-heading">
              {aboutSubcategoryData[categoryData.name].heading}
            </h2>

            <p className="aboutsubcat-description">
              {aboutSubcategoryData[categoryData.name].description}
            </p>

            <div className="aboutsubcat-faqs">
              {aboutSubcategoryData[categoryData.name].faqs.map(
                (faq, index) => (
                  <div
                    key={index}
                    className="aboutsubcat-faq-item"
                    role="region"
                    aria-label={`FAQ item ${index + 1}`}
                  >
                    <button
                      className="aboutsubcat-faq-question"
                      aria-expanded="false"
                      aria-controls={`faq-answer-${index}`}
                      onClick={(e) => {
                        const answer = document.getElementById(`faq-answer-${index}`);
                        const expanded = e.target.getAttribute("aria-expanded") === "true";
                        e.target.setAttribute("aria-expanded", !expanded);
                        answer.style.display = expanded ? "none" : "block";
                      }}
                    >
                      {faq.question}
                    </button>

                    <div
                      id={`faq-answer-${index}`}
                      className="aboutsubcat-faq-answer"
                      style={{ display: "none" }}
                    >
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </section>
      )}

      {/* TESTIMONIALS + CTA */}
      <Testimonials />
      <GetQuoteCTA />
    </>
  );
};

export default SubcategoryDisplay;
