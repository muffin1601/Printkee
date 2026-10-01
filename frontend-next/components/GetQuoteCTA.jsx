"use client";
import React, { useState } from "react";
import styles from "../styles/GetQuoteCTA.module.css";
import { FaGift, FaClock, FaBoxOpen, FaPhoneAlt } from "react-icons/fa";
import EnquiryModal from './EnquiryModal';
import { BUSINESS } from "../lib/siteConfig";
import { trackContactClick, trackQuoteRequest } from "../utils/analytics";

const GetQuoteCTA = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <section
        className={styles["quote-cta-section"]}
        role="region"
        aria-labelledby="quote-cta-heading"
      >
        <div className={styles["quote-cta-overlay"]}>
          <div className={styles["quote-cta-content"]}>
            {/* Accessible heading */}
            <h2 className={styles["quote-heading"]} id="quote-cta-heading">
              Need 100+ Gifts? Let's Customize Something Perfect.
            </h2>

            {/* Feature List (screen-reader semantic) */}
            <div className={styles["quote-features"]} role="list">
              <div className={styles["feature-item"]} role="listitem">
                <FaGift className={styles["feature-icon"]} aria-hidden="true" />
                <span>Bulk Discounts</span>
              </div>

              <div className={styles["feature-item"]} role="listitem">
                <FaClock className={styles["feature-icon"]} aria-hidden="true" />
                <span>Delivery Planning</span>
              </div>

              <div className={styles["feature-item"]} role="listitem">
                <FaBoxOpen className={styles["feature-icon"]} aria-hidden="true" />
                <span>Premium Packaging</span>
              </div>
            </div>

            {/* Accessible button */}
            <button
              className={styles["quote-cta-button"]}
              onClick={() => { trackQuoteRequest("homepage_cta"); setShowModal(true); }}
              aria-label="Request a customized quote for bulk gifting"
            >
              Request a Quote <span className={styles["arrow-1"]} aria-hidden="true">→</span>
            </button>

            <p className={styles["quote-cta-extra-info"]}>
              Have questions?{" "}
              <a
                href={`mailto:${BUSINESS.email}`}
                onClick={() => trackContactClick("email", "homepage_cta")}
                aria-label="Email our gifting support team"
              >
                Contact our team
              </a>{" "}
              for personalized assistance.
            </p>

            <p className={`${styles["quote-cta-extra-info"]} ${styles["call-us"]}`}>
              <FaPhoneAlt className={styles["call-icon"]} aria-hidden="true" />
              <span>Call us at </span>
              <a
                href={`tel:${BUSINESS.phoneE164}`}
                onClick={() => trackContactClick("phone", "homepage_cta")}
                aria-label={`Call Printkee at ${BUSINESS.phoneDisplay}`}
              >
                {BUSINESS.phoneDisplay}
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Modal (unchanged functionality – just improved trigger) */}
      <EnquiryModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        image="/assets/t-shirt.jpg"
        description="Let us help you create the perfect customized gift for your business."
      />
    </>
  );
};

export default GetQuoteCTA;
