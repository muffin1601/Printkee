"use client";
import React from "react";
import { Sparkles, ArrowRight } from "lucide-react";
import styles from "../../styles/Diwali.module.css";
import Reveal from "./Reveal";

/**
 * Festive offer banner.
 *
 * `offerCount` is the number of products the backend has genuinely marked
 * down — used only to decide the wording, never to publish a figure. Pricing
 * is quoted per enquiry, so the banner points at the quote flow instead of
 * advertising a percentage.
 */
const DiwaliOfferBanner = ({ offerCount = 0, onEnquire }) => (
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
        {offerCount > 0
          ? "Festive pricing is live across the collection this season, with bulk rates that improve the more you gift. Share your quantities and we'll send a costed proposal within 24 hours."
          : "Bulk festive pricing on every gift below — the more you gift, the better the rate. Share your quantities and we'll send a costed proposal within 24 hours."}
      </p>

      <div className={styles.offerActions}>
        <button type="button" className={styles.offerCta} onClick={onEnquire}>
          Get Festive Pricing
          <ArrowRight size={14} aria-hidden="true" />
        </button>
        {offerCount > 0 && (
          <a href="#diwali-offers" className={styles.offerLink}>
            See festive offers
          </a>
        )}
      </div>
    </div>
  </Reveal>
);

export default DiwaliOfferBanner;
