"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "../../styles/Diwali.module.css";

/**
 * Reveals children on scroll with a short fade/rise.
 *
 * The element is laid out at its final size from the first paint — only
 * opacity and transform animate — so revealing never causes layout shift.
 * Users with `prefers-reduced-motion` get the content immediately.
 */
const Reveal = ({ children, delay = 0, as: Tag = "div", className = "" }) => {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduced =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced || typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShown(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`${styles.reveal} ${shown ? styles.revealVisible : ""} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
};

export default Reveal;
