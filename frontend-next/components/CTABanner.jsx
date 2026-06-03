import React from "react";
import Link from "next/link";
import styles from "../styles/CTABanner.module.css";

const CTABanner = ({
  imageSrc,
  linkTo = "/contact",
  alt = "Get a Quote – Corporate Gifting with PrintKee",
}) => {
  return (
    <div
      className={styles["cta-banner"]}
      role="region"
      aria-label="Promotional call to action banner"
    >
      <figure className={styles["cta-figure"]}>
        <Link href={linkTo} aria-label="Visit contact page to request a quote">
          <img
            src={imageSrc}
            alt={alt}
            className={styles["cta-full-image"]}
            loading="lazy"
            decoding="async"
          />
        </Link>
      </figure>
    </div>
  );
};

export default CTABanner;
