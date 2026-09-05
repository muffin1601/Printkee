"use client";
import React from "react";
import Link from "next/link";
import { Star, ArrowRight, MessageSquareQuote } from "lucide-react";
import styles from "../../styles/Diwali.module.css";
import { productUrl, productImage, productImageAlt } from "../../utils/product";

/**
 * Festive product card, built on real backend product data.
 *
 * Prices are deliberately not shown: this is a quote-based B2B storefront and
 * the rest of the site (see ProductDisplay) never publishes figures either.
 * No discount badge either — almost every product carries a salePrice, so a
 * per-card offer flag would appear on all of them and mean nothing. The offer
 * signal lives in the "Diwali Offers" section, which is genuinely filtered.
 *
 * The primary CTA opens the site's existing enquiry/quote modal.
 */
const DiwaliProductCard = ({ product, onEnquire, priority = false }) => {
  const href = productUrl(product);
  const image = productImage(product);

  const rating = Number(product?.ratings?.average) || 0;
  const ratingCount = Number(product?.ratings?.count) || 0;
  const soldOut = product?.stock === 0;

  const media = (
    <div className={styles.cardMedia}>
      <img
        className={styles.cardImg}
        src={image}
        alt={productImageAlt(product)}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        width="400"
        height="400"
      />
      {soldOut && <span className={styles.cardSoldOut}>Sold Out</span>}
    </div>
  );

  return (
    <article className={styles.card}>
      {href ? (
        <Link
          href={href}
          className={styles.cardMediaLink}
          aria-label={`View details for ${product.name}`}
        >
          {media}
        </Link>
      ) : (
        media
      )}

      <div className={styles.cardBody}>
        <h3 className={styles.cardTitle}>
          {href ? (
            <Link href={href} className={styles.cardTitleLink}>
              {product.name}
            </Link>
          ) : (
            product.name
          )}
        </h3>

        {rating > 0 && (
          <p className={styles.cardRating}>
            <Star size={11} aria-hidden="true" className={styles.cardStar} />
            <span>{rating.toFixed(1)}</span>
            {ratingCount > 0 && <span>({ratingCount})</span>}
          </p>
        )}

        <div className={styles.cardActions}>
          <button
            type="button"
            className={styles.cardCta}
            onClick={() => onEnquire?.(product)}
          >
            <MessageSquareQuote size={13} aria-hidden="true" />
            <span>Request Quote</span>
            <span className="sr-only"> for {product.name}</span>
          </button>

          {href && (
            <Link href={href} className={styles.cardLink}>
              Details
              <ArrowRight size={12} aria-hidden="true" />
              <span className="sr-only"> for {product.name}</span>
            </Link>
          )}
        </div>
      </div>
    </article>
  );
};

export default DiwaliProductCard;
