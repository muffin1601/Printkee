"use client";
import React from "react";
import { Sparkles, ArrowRight, BadgeCheck, Boxes, Gift, Paintbrush } from "lucide-react";
import styles from "../../styles/NewYear2027.module.css";
import Reveal from "./Reveal";

const DiwaliOfferBanner = ({ productCount = 0, onEnquire }) => (
  <Reveal as="section" className={styles.promoWrap}>
    <div className={styles.promo} aria-labelledby="new-year-promo-heading">
      <div className={styles.promoCopy}>
        <p className={styles.promoEyebrow}>
          <Sparkles size={14} aria-hidden="true" />
          Corporate gifting for a fresh start
        </p>
        <h2 id="new-year-promo-heading" className={styles.promoTitle}>
          Make Every New Beginning Memorable
        </h2>
        <p className={styles.promoBody}>
          Start 2027 by appreciating your employees, clients, and business
          partners with thoughtful customized corporate gifts.
          {productCount > 0 && (
            <span> Explore {productCount} considered gift ideas from Printkee.</span>
          )}
        </p>
        <button type="button" className={styles.promoCta} onClick={onEnquire}>
          Request a Quote
          <ArrowRight size={14} aria-hidden="true" />
        </button>
      </div>
      <ul className={styles.promoBenefits}>
        <li><BadgeCheck size={18} aria-hidden="true" /> Personalized Branding</li>
        <li><Boxes size={18} aria-hidden="true" /> Bulk Order Solutions</li>
        <li><Gift size={18} aria-hidden="true" /> Premium Gift Collections</li>
        <li><Paintbrush size={18} aria-hidden="true" /> Corporate Customization</li>
      </ul>
    </div>
  </Reveal>
);

export default DiwaliOfferBanner;
