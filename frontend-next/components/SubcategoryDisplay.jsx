"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import styles from "../styles/SubcategoryDisplay.module.css";
import categoryHighlights from "../data/highlightsdata";
import aboutSubcategoryData from "../data/faqsdata";
import Testimonials from "./Testimonials";
import GetQuoteCTA from "./GetQuoteCTA";
import CategoryDescription from "./category/CategoryDescription";

const SubcategoryDisplay = ({ categoryData, seoH1, seoH2 }) => {
  const { category: categorySlug } = useParams();
  const [openFaq, setOpenFaq] = useState(null);

  if (!categoryData) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <p>Unable to load category. Please ensure the backend is running.</p>
      </div>
    );
  }

  /* seoH1/seoH2 from seoConfig override the DB name for SEO-optimized headings */
  const displayH1 = seoH1 || categoryData.name;
  const displayH2 = seoH2 || null;

  return (
    <>
      {/* HEADER */}
      <div className={styles["subcategory-header-3"]}>
        <div className={styles["subcategory-header-content-3"]}>
          <Link href="/" className={styles["back-link-3"]} aria-label="Go back to homepage">
            <div className={styles["circle-3"]}>
              <span className={styles["arrow-3"]}>&larr;</span>
            </div>
            <span className={styles["span-name-3"]}>Back to home</span>
          </Link>

          <h1 className={styles["subcategory-title-3"]}>{displayH1}</h1>
          {displayH2 && <h2 className={styles["subcategory-subtitle-3"]}>{displayH2}</h2>}
          <p className={styles["subcategory-description-3"]}>{categoryData.description}</p>
        </div>

        <div className={styles["head-img"]}>
          <img
            loading="lazy"
            src={`/assets/categories/${categorySlug}.webp`}
            alt={`${displayH1} — ${categoryData.name}`}
          />
        </div>
      </div>

      {/* SUBCATEGORY GRID */}
      <section className={styles["subcategory-container"]} aria-label="Subcategory list">
        <div className={styles["subcategory-grid"]}>
          {categoryData.subcategories?.map((sub) => (
            <Link
              key={sub._id}
              href={`/${categorySlug}/${sub.slug}`}
              className={styles["subcategory-card"]}
              aria-label={`Explore ${sub.name}`}
            >
              <img
                src={sub.image}
                loading="lazy"
                alt={`${sub.name} subcategory image`}
                className={styles["subcategory-image"]}
              />
              <h3 className={styles["subcategory-name"]}>{sub.name}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* HIGHLIGHTS */}
      {categoryHighlights[categorySlug] && (
        <section className={styles["highlights-section"]}>
          <h2 className={styles["highlights-heading"]}>
            {categoryHighlights[categorySlug].heading}
          </h2>
          <div className={styles["highlights-grid"]}>
            {categoryHighlights[categorySlug].highlights.map((highlight, index) => (
              <div key={index} className={styles["highlight-card"]}>
                <div className={styles["highlight-icon"]}>{highlight.icon}</div>
                <h3 className={styles["highlight-title"]}>{highlight.title}</h3>
                <p className={styles["highlight-description"]}>{highlight.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ABOUT + FAQ */}
      {aboutSubcategoryData[categorySlug] && (
        <section className={styles["aboutsubcat-wrapper"]}>
          <div className={styles["aboutsubcat-card"]}>
            <h2 className={styles["aboutsubcat-heading"]}>
              {aboutSubcategoryData[categorySlug].heading}
            </h2>
            <p className={styles["aboutsubcat-description"]}>
              {aboutSubcategoryData[categorySlug].description}
            </p>
            <div className={styles["aboutsubcat-faqs"]}>
              {aboutSubcategoryData[categorySlug].faqs.map((faq, index) => (
                <div key={index} className={styles["aboutsubcat-faq-item"]}>
                  <button
                    className={styles["aboutsubcat-faq-question"]}
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    aria-expanded={openFaq === index}
                  >
                    {faq.question}
                  </button>
                  {openFaq === index && (
                    <div className={styles["aboutsubcat-faq-answer"]}>
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CATEGORY SEO DESCRIPTION */}
      <CategoryDescription category={categorySlug} />

      <Testimonials />
      <GetQuoteCTA />
    </>
  );
};

export default SubcategoryDisplay;
