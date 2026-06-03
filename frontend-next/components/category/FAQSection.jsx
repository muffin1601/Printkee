"use client";
// src/components/FAQSection.jsx

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import styles from "./FAQSection.module.css";
import productFAQs from "../../data/productfaqs";

const FAQSection = ({ subcategory }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = productFAQs[subcategory] || [];
  if (faqs.length === 0) return null;

  const formatTitle = (text) =>
    text.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <section className={styles.pkFaqWrapper} aria-labelledby="faq-title">
      <h2 id="faq-title" className={styles.pkFaqTitle}>
        {formatTitle(subcategory)} – Frequently Asked Questions
      </h2>

      <div className={styles.pkFaqList}>
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          const answerId = `faq-answer-${index}`;
          const questionId = `faq-question-${index}`;

          return (
            <div key={index} className={styles.pkFaqCard}>

              {/* Accessible button for screen readers */}
              <button
                id={questionId}
                className={styles.pkFaqQuestion}
                onClick={() => toggleFAQ(index)}
                aria-expanded={isOpen}
                aria-controls={answerId}
              >
                <span className={styles.pkFaqQuestionText}>{faq.question}</span>
                <span className={styles.pkFaqIcon} aria-hidden="true">
                  {isOpen ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                </span>
              </button>

              <div
                id={answerId}
                role="region"
                aria-labelledby={questionId}
                className={styles.pkFaqAnswer}
                style={{ maxHeight: isOpen ? "300px" : "0px" }}
              >
                <p className={styles.pkFaqAnswerText}>{faq.answer}</p>
              </div>

            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FAQSection;
