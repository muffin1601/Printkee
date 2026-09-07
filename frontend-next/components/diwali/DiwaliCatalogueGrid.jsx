"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { MessageSquareQuote, Tag } from "lucide-react";
import styles from "../../styles/Diwali.module.css";
import Reveal from "./Reveal";

/**
 * The Diwali 2026 catalogue product grid.
 *
 * Renders `data/diwali-2026-products.js` — products transcribed from the
 * catalogue artwork. These are ENQUIRY-ONLY catalogue items: they have no
 * slug, stock or product route, so nothing here links out to a product page
 * and there is no add-to-cart. Every card routes to the site's existing
 * enquiry modal, matching the quote-based flow used elsewhere.
 *
 * `mrp` is the printing brand's own MRP and is labelled as such, so it is
 * never mistaken for a Printkee quote.
 */

const inr = (n) =>
  typeof n === "number" ? `₹${n.toLocaleString("en-IN")}` : null;

/** One catalogue product. Image gets its own load state so a slow PNG
 *  shows a placeholder tile instead of collapsing the grid row. */
const CatalogueCard = ({ product, onEnquire, priority }) => {
  const imgRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  /* An image served from cache can finish decoding before React attaches the
     onLoad handler during hydration, in which case that event never fires and
     the tile would stay transparent forever. Re-check `complete` on mount. */
  useEffect(() => {
    if (imgRef.current?.complete) setLoaded(true);
  }, []);

  const price = inr(product.mrp);
  const multi = product.variants && product.variants.length > 1;

  return (
    <article className={styles.catCard}>
      <div className={styles.catMedia}>
        {!loaded && <span className={styles.catSkeleton} aria-hidden="true" />}
        <img
          ref={imgRef}
          className={styles.catImg}
          src={product.image}
          alt={`${product.name}${
            product.brand ? ` by ${product.brand}` : ""
          } — Diwali 2026 catalogue, page ${product.cataloguePage}`}
          width="560"
          height="560"
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setLoaded(true)}
          data-loaded={loaded ? "true" : "false"}
        />
      </div>

      <div className={styles.catBody}>
        {product.brand && <p className={styles.catBrand}>{product.brand}</p>}
        <h3 className={styles.catName}>{product.name}</h3>

        {product.description && (
          <p className={styles.catDesc}>{product.description}</p>
        )}

        {!!product.specifications?.length && (
          <ul className={styles.catSpecs}>
            {product.specifications.slice(0, 3).map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        )}

        <div className={styles.catMeta}>
          {/* Only ever shown when the catalogue actually prints a figure. */}
          {price ? (
            <span className={styles.catPrice}>
              {multi ? "From " : ""}
              {price}
              <span className={styles.catPriceNote}>MRP</span>
            </span>
          ) : (
            <span className={styles.catPriceAsk}>Price on enquiry</span>
          )}
          {product.sku && (
            <span className={styles.catSku}>
              <Tag size={11} aria-hidden="true" />
              {product.sku}
            </span>
          )}
        </div>

        <button
          type="button"
          className={styles.catCta}
          onClick={() => onEnquire?.(product)}
        >
          <MessageSquareQuote size={14} aria-hidden="true" />
          Enquire
        </button>
      </div>
    </article>
  );
};

const DiwaliCatalogueGrid = ({ products = [], categories = [], onEnquire }) => {
  const [active, setActive] = useState("All");

  const counts = useMemo(() => {
    const map = { All: products.length };
    products.forEach((p) => {
      map[p.category] = (map[p.category] || 0) + 1;
    });
    return map;
  }, [products]);

  const visible = useMemo(
    () =>
      active === "All"
        ? products
        : products.filter((p) => p.category === active),
    [products, active]
  );

  const tabs = ["All", ...categories];

  return (
    <section
      className={styles.section}
      id="diwali-catalogue"
      aria-labelledby="diwali-catalogue-heading"
    >
      <div className={styles.sectionInner}>
        <Reveal as="header" className={styles.sectionHead}>
          <p className={styles.eyebrow}>Diwali Catalogue 2026</p>
          <h2 id="diwali-catalogue-heading" className={styles.sectionTitle}>
            This Year&apos;s Diwali Range
          </h2>
          <p className={styles.sectionDesc}>
            Every gift in our Diwali 2026 catalogue — dry-fruit hampers,
            audio and desk tech, luggage, cookware and home textiles. Tell us
            your quantity and branding and we&apos;ll send costed options.
          </p>
        </Reveal>

        <div
          className={styles.catFilters}
          role="tablist"
          aria-label="Filter catalogue by category"
        >
          {tabs.map((cat) => (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={active === cat}
              className={`${styles.catFilter} ${
                active === cat ? styles.catFilterOn : ""
              }`}
              onClick={() => setActive(cat)}
            >
              {cat}
              <span className={styles.catFilterCount}>{counts[cat] || 0}</span>
            </button>
          ))}
        </div>

        {visible.length === 0 ? (
          <p className={styles.catEmpty} role="status">
            No catalogue products in this category yet.
          </p>
        ) : (
          <ul className={styles.catGrid}>
            {visible.map((product, i) => (
              <Reveal
                as="li"
                key={product.id}
                delay={Math.min(i, 5) * 55}
                className={styles.catGridItem}
              >
                <CatalogueCard
                  product={product}
                  onEnquire={onEnquire}
                  priority={i < 4}
                />
              </Reveal>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default DiwaliCatalogueGrid;
