"use client";
import React from "react";
import { Sparkles, ArrowRight } from "lucide-react";
import styles from "../../styles/Diwali.module.css";
import Reveal from "./Reveal";

/**
 * Festive offer banner.
 *
 * `productCount` is how many products the 2026 catalogue lists — used only to
 * decide the wording, never to publish a price. Pricing is quoted per enquiry,
 * so the banner points at the quote flow instead of advertising a percentage.
 */
const DiwaliOfferBanner = ({ productCount = 0, onEnquire }) => (
  <Reveal as="section" className={styles.offerWrap}>
    <div className={styles.offer} aria-labelledby="diwali-offer-heading">
      <p className={styles.offerEyebrow}>
        <Sparkles size={13} aria-hidden="true" />
        Diwali Special
      </p>

      <h2 id="diwali-offer-heading" className={styles.offerTitle}>
        Create More. Gift Better.{" "}
        <span className={styles.offerTitleAccent}>Celebrate Brighter.</span>
      </h2>

      <p className={styles.offerBody}>
        {productCount > 0
          ? `Bulk festive pricing across all ${productCount} gifts in the 2026 catalogue — the more you gift, the better the rate. Share your quantities and we'll send a costed proposal within 24 hours.`
          : "Bulk festive pricing on every gift in the 2026 catalogue — the more you gift, the better the rate. Share your quantities and we'll send a costed proposal within 24 hours."}
      </p>

      <div className={styles.offerActions}>
        <button type="button" className={styles.offerCta} onClick={onEnquire}>
          Get Festive Pricing
          <ArrowRight size={14} aria-hidden="true" />
        </button>
        {productCount > 0 && (
          <a href="#diwali-catalogue" className={styles.offerLink}>
            Browse the catalogue
          </a>
        )}
      </div>
    </div>
  </Reveal>
);

export default DiwaliOfferBanner;
