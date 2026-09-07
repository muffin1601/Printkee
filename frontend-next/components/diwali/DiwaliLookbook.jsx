"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { X, ChevronLeft, ChevronRight, BookOpen, Download } from "lucide-react";
import styles from "../../styles/Diwali.module.css";
import catalogueImages from "../../data/catalogueImages";
import diwali2026Products from "../../data/diwali-2026-products";
import Reveal from "./Reveal";

/**
 * Catalogue lookbook — every page of the Diwali Catalogue 2026 as browsable
 * artwork, extracted straight from the PDF.
 *
 * These are catalogue *artwork*, not backend products: they carry no slug,
 * stock or quote flow, so nothing here links to a product page. The section
 * exists to let a visitor read the catalogue without downloading 34 MB, and
 * every tile routes to the same enquiry modal the real product cards use.
 *
 * Images render in batches: 131 full-resolution PNGs would otherwise put
 * tens of MB of decoding work on the main thread at once.
 */
const BATCH = 12;

const FILTERS = [
  { key: "all", label: "Everything" },
  { key: "plate", label: "Gift Sets" },
  { key: "product", label: "Product Shots" },
];

const DiwaliLookbook = ({ onEnquire }) => {
  /* Two exclusions:
     1. Cover furniture (lattice background tiles, cover diyas, brand logos)
        and small ornaments — page decoration, not catalogue content.
     2. Anything already listed as a product in the grid above, so the same
        gift is never shown twice on the page.
     What remains is the catalogue's unnamed artwork — chiefly the corporate
     and eco gift sets on pages 3-5, which print no name, SKU or price and so
     cannot become products without inventing one. */
  const items = useMemo(() => {
    const used = new Set(diwali2026Products.map((p) => p.image));
    return catalogueImages.filter(
      (i) => (i.kind === "plate" || i.kind === "product") && !used.has(i.src)
    );
  }, []);

  const [filter, setFilter] = useState("all");
  const [shown, setShown] = useState(BATCH);
  const [lightbox, setLightbox] = useState(null); // index into `visible`

  const visible = useMemo(
    () => (filter === "all" ? items : items.filter((i) => i.kind === filter)),
    [items, filter]
  );

  const selectFilter = useCallback((key) => {
    setFilter(key);
    setShown(BATCH); // a new filter starts a fresh batch, not a 143-tile dump
  }, []);

  const close = useCallback(() => setLightbox(null), []);
  const step = useCallback(
    (delta) =>
      setLightbox((i) =>
        i === null ? null : (i + delta + visible.length) % visible.length
      ),
    [visible.length]
  );

  /* Keyboard control + scroll lock while the lightbox owns the screen. */
  useEffect(() => {
    if (lightbox === null) return undefined;

    const onKey = (e) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    };

    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [lightbox, close, step]);

  const active = lightbox === null ? null : visible[lightbox];

  return (
    <section
      className={styles.lookbook}
      id="diwali-lookbook"
      aria-labelledby="diwali-lookbook-heading"
    >
      <div className={styles.lookbookInner}>
        <Reveal as="header" className={styles.sectionHead}>
          <p className={styles.eyebrow}>
            <BookOpen size={13} aria-hidden="true" />
            Catalogue 2026
          </p>
          <h2 id="diwali-lookbook-heading" className={styles.sectionTitle}>
            More From the Catalogue
          </h2>
          <p className={styles.sectionDesc}>
            Corporate and eco gift sets photographed for the 2026 catalogue.
            These pages carry no printed names or codes, so they aren&apos;t
            listed above — tap any piece to see it full size and enquire.
          </p>
        </Reveal>

        <div className={styles.lookbookFilters} role="tablist" aria-label="Filter catalogue">
          {FILTERS.map((f) => {
            const count =
              f.key === "all"
                ? items.length
                : items.filter((i) => i.kind === f.key).length;
            const selected = filter === f.key;
            return (
              <button
                key={f.key}
                type="button"
                role="tab"
                aria-selected={selected}
                className={`${styles.lookbookFilter} ${
                  selected ? styles.lookbookFilterOn : ""
                }`}
                onClick={() => selectFilter(f.key)}
              >
                {f.label}
                <span className={styles.lookbookCount}>{count}</span>
              </button>
            );
          })}
        </div>

        <ul className={styles.lookbookGrid}>
          {visible.slice(0, shown).map((img, i) => (
            <Reveal
              as="li"
              key={img.src}
              delay={Math.min(i % BATCH, 5) * 55}
              className={styles.lookbookItem}
            >
              <button
                type="button"
                className={styles.lookbookTile}
                onClick={() => setLightbox(i)}
                aria-label={`View catalogue artwork from page ${img.page}, full size`}
              >
                <img
                  className={styles.lookbookImg}
                  src={img.src}
                  alt={`Diwali Catalogue 2026 gifting artwork, page ${img.page}`}
                  width={img.w}
                  height={img.h}
                  loading="lazy"
                  decoding="async"
                />
                <span className={styles.lookbookPage}>Page {img.page}</span>
              </button>
            </Reveal>
          ))}
        </ul>

        {shown < visible.length && (
          <div className={styles.lookbookMoreWrap}>
            <button
              type="button"
              className={styles.lookbookMore}
              onClick={() => setShown((n) => n + BATCH)}
            >
              Load more — {visible.length - shown} left
            </button>
          </div>
        )}
      </div>

      {active && (
        <div
          className={styles.lightbox}
          role="dialog"
          aria-modal="true"
          aria-label={`Catalogue artwork, page ${active.page}`}
          onClick={close}
        >
          <button
            type="button"
            className={styles.lightboxClose}
            onClick={close}
            aria-label="Close"
          >
            <X size={20} aria-hidden="true" />
          </button>

          <button
            type="button"
            className={`${styles.lightboxNav} ${styles.lightboxPrev}`}
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
            aria-label="Previous"
          >
            <ChevronLeft size={22} aria-hidden="true" />
          </button>

          {/* Stops a click on the artwork itself from dismissing the dialog */}
          <figure
            className={styles.lightboxFigure}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              className={styles.lightboxImg}
              src={active.src}
              alt={`Diwali Catalogue 2026 gifting artwork, page ${active.page}`}
              width={active.w}
              height={active.h}
            />
            <figcaption className={styles.lightboxCap}>
              <span>
                Page {active.page} · {lightbox + 1} of {visible.length}
              </span>
              <span className={styles.lightboxActions}>
                <button
                  type="button"
                  className={styles.lightboxCta}
                  onClick={() => {
                    close();
                    onEnquire?.(null);
                  }}
                >
                  Enquire about this gift
                </button>
                <a
                  className={styles.lightboxGhost}
                  href="/diwali-catalogue-2026.pdf"
                  download="Diwali_Catalogue_2026.pdf"
                >
                  <Download size={13} aria-hidden="true" />
                  Full catalogue
                </a>
              </span>
            </figcaption>
          </figure>

          <button
            type="button"
            className={`${styles.lightboxNav} ${styles.lightboxNext}`}
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
            aria-label="Next"
          >
            <ChevronRight size={22} aria-hidden="true" />
          </button>
        </div>
      )}
    </section>
  );
};

export default DiwaliLookbook;
