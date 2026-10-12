"use client";
import React, { useState } from "react";
import styles from "./FAQProduct.module.css";

const FAQProduct = ({ productName, subcategoryName, categoryName, faqs: productFaqs }) => {
  const [openIndex, setOpenIndex] = useState(null);

  // Prefer the product's own approved FAQs (from the DB) when present;
  // otherwise fall back to the generic generated set.
  const faqs = productFaqs?.length
    ? productFaqs.map((f) => ({ q: f.question, a: f.answer }))
    : [
    {
      q: `Can ${productName} be branded with a company logo?`,
      a: `Branding depends on the product material, available print area and artwork. Share your logo and preferred placement so Printkee can confirm suitable options for this item.`
    },
    {
      q: `What information is needed for a ${productName} quotation?`,
      a: `Provide the required quantity, delivery location, target date, artwork and any packaging or personalization requirements. Product availability and commercial terms are confirmed in the quotation.`
    },
    {
      q: `Can I request ${productName} for a business programme or event?`,
      a: `Yes. Explain the intended audience and use so the team can review whether the selected product and branding approach fit the requirement.`
    },
    {
      q: `Which branding method is used for ${productName}?`,
      a: `The method is selected after reviewing the product surface, artwork, colour count and placement. Do not assume one printing or engraving method applies to every item.`
    },
    {
      q: `Can I review a sample before a larger order?`,
      a: `Ask about sample availability for the exact product and branding requirement. Availability, cost and timing are confirmed during quotation.`
    },
    {
      q: `Can ${productName} be delivered outside Delhi NCR?`,
      a: `Share the delivery postcode and required date. Destination feasibility and timing depend on the product, quantity and customization and must be confirmed before ordering.`
    }
  ];

  return (
    <div className={styles.productFaqWrapper}>
      <h2 className={styles.productFaqTitle}>Frequently Asked Questions</h2>

      <div className={styles.productFaqList}>
        {faqs.map((item, index) => (
          <div key={index} className={styles.productFaqItem}>
            <button
              className={styles.productFaqQuestion}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              {item.q}
              <span>{openIndex === index ? "-" : "+"}</span>
            </button>

            {openIndex === index && (
              <div className={styles.productFaqAnswer}>
                <p>{item.a}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQProduct;
