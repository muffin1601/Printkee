"use client";
import React, { useState } from "react";
import Image from "next/image";
import { isLocalUpload } from "../../utils/newYearImages";
import styles from "../../styles/NewYear2027.module.css";

const DiwaliHero = ({ banner, onQuote }) => {
  const [failed, setFailed] = useState(false);
  return (
    <section className={styles.banner} aria-labelledby="new-year-hero-heading">
      <h1 id="new-year-hero-heading" className={styles.srOnly}>New Year 2027 Corporate Gifts</h1>
      {banner && !failed ? (
        <a href="#new-year-collection" aria-label="Explore the New Year 2027 gift collection">
          <Image
            src={banner.url}
            alt={banner.alt}
            width={banner.width}
            height={banner.height}
            sizes="100vw"
            preload
            unoptimized={isLocalUpload(banner.url)}
            className={styles.bannerImage}
            onError={() => setFailed(true)}
          />
        </a>
      ) : (
        <div className={styles.bannerFallback}>
          <p className={styles.eyebrow}>Printkee corporate gifting</p>
          <h2 className={styles.sectionTitle}>Welcome New Year 2027</h2>
          <p>Explore gift sets, corporate diaries and calendars for your team and clients.</p>
          <button type="button" className={styles.productCta} onClick={onQuote}>Request a Quote</button>
        </div>
      )}
    </section>
  );
};
export default DiwaliHero;
