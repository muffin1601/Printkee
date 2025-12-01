// src/components/FAQSection.jsx

import React, { useState } from "react";
import "./FAQSection.css";
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
    <div className="pk-faq-wrapper">
      <h2 className="pk-faq-title">
        {formatTitle(subcategory)} – Frequently Asked Questions
      </h2>

      <div className="pk-faq-list">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <div key={index} className="pk-faq-card">
              <div
                className="pk-faq-question"
                onClick={() => toggleFAQ(index)}
              >
                <span className="pk-faq-question-text">{faq.question}</span>
                <span
                  className={`pk-faq-icon ${isOpen ? "pk-faq-rotate" : ""}`}
                >
                  ⌄
                </span>
              </div>

              <div
                className="pk-faq-answer"
                style={{ maxHeight: isOpen ? "300px" : "0px" }}
              >
                <p className="pk-faq-answer-text">{faq.answer}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FAQSection;
