"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { MessageSquareQuote, Tag } from "lucide-react";
import styles from "../../styles/NewYear2027.module.css";
import Reveal from "./Reveal";

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

  return (
    <article className={styles.productCard}>
      <div className={styles.productMedia}>
        {!loaded && <span className={styles.productSkeleton} aria-hidden="true" />}
        <img
          ref={imgRef}
          className={styles.productImg}
          src={product.image}
          alt={`${product.name}${
            product.brand ? ` by ${product.brand}` : ""
          }`}
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

      <div className={styles.productBody}>
        {product.brand && <p className={styles.productBrand}>{product.brand}</p>}
        <h3 className={styles.productName}>{product.name}</h3>

        {product.description && (
          <p className={styles.productDesc}>{product.description}</p>
        )}

        {!!product.specifications?.length && (
          <ul className={styles.productSpecs}>
            {product.specifications.slice(0, 3).map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        )}

        <div className={styles.productMeta}>
          <span className={styles.productPriceAsk}>Price on enquiry</span>
          {product.sku && (
            <span className={styles.productSku}>
              <Tag size={11} aria-hidden="true" />
              {product.sku}
            </span>
          )}
        </div>

        <button
          type="button"
          className={styles.productCta}
          onClick={() => onEnquire?.(product)}
        >
          <MessageSquareQuote size={14} aria-hidden="true" />
          Enquire
        </button>
        {product.slug && (
          <Link
            className={styles.productDetailLink}
            href={`/new-year-2027/hampers/${product.slug}`}
          >
            View product details
          </Link>
        )}
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
      className={styles.collection}
      id="new-year-collection"
      aria-labelledby="new-year-collection-heading"
    >
      <div className={styles.collectionInner}>
        <Reveal as="header" className={styles.sectionHead}>
          <p className={styles.eyebrow}>Thoughtful gifts. Lasting impressions.</p>
          <h2 id="new-year-collection-heading" className={styles.sectionTitle}>
            New Year 2027 Gift Collection
          </h2>
          <p className={styles.sectionDesc}>
            Find practical, premium gifts for teams, clients, and partners.
            Choose a collection, then tell us your quantity and branding needs
            for a tailored quote.
          </p>
        </Reveal>

        <div
          className={styles.categoryFilters}
          role="tablist"
          aria-label="Filter New Year gifts by category"
        >
          {tabs.map((cat) => (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={active === cat}
              className={`${styles.categoryFilter} ${
                active === cat ? styles.categoryFilterActive : ""
              }`}
              onClick={() => setActive(cat)}
            >
              {cat}
              <span className={styles.categoryCount}>{counts[cat] || 0}</span>
            </button>
          ))}
        </div>

        {visible.length === 0 ? (
          <p className={styles.emptyState} role="status">
            No gifts are available in this category.
          </p>
        ) : (
          <ul className={styles.productGrid}>
            {visible.map((product, i) => (
              <Reveal
                as="li"
                key={product.id}
                delay={Math.min(i, 5) * 55}
                className={styles.productGridItem}
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
