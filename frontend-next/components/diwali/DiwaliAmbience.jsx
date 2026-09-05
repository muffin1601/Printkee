"use client";
import React, { useEffect, useState } from "react";
import styles from "../../styles/Diwali.module.css";

/* Fixed, hand-tuned positions — never Math.random(), so the markup is
   deterministic and a re-render can't shuffle the scene. */
const SPARKS = [
  { left: 6, top: 18, size: 3, delay: 0, duration: 7 },
  { left: 14, top: 62, size: 2, delay: 1.4, duration: 9 },
  { left: 23, top: 34, size: 4, delay: 2.6, duration: 8 },
  { left: 31, top: 78, size: 2, delay: 0.7, duration: 10 },
  { left: 42, top: 12, size: 3, delay: 3.1, duration: 7.5 },
  { left: 55, top: 48, size: 2, delay: 1.9, duration: 9.5 },
  { left: 64, top: 24, size: 4, delay: 0.3, duration: 8.5 },
  { left: 72, top: 70, size: 3, delay: 2.2, duration: 7 },
  { left: 81, top: 38, size: 2, delay: 4, duration: 10 },
  { left: 88, top: 15, size: 3, delay: 1.1, duration: 8 },
  { left: 94, top: 58, size: 2, delay: 3.6, duration: 9 },
  { left: 48, top: 86, size: 3, delay: 2.9, duration: 8.2 },
];

/**
 * Decorative golden embers drifting inside the dark hero.
 *
 * Scoped to its positioned parent rather than the whole viewport — the rest
 * of the page uses the site's light surfaces, where gold sparks would read as
 * rendering artefacts.
 *
 * Purely presentational: `aria-hidden` and pointer-events none, so it adds
 * nothing to the accessibility tree and cannot shift layout. Mounted only
 * after hydration and only when the visitor has not asked for reduced motion.
 */
const DiwaliAmbience = () => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (typeof window.matchMedia !== "function") {
      setActive(true);
      return;
    }

    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setActive(!query.matches);
    sync();

    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  if (!active) return null;

  return (
    <div className={styles.ambience} aria-hidden="true">
      {SPARKS.map((spark, i) => (
        <span
          key={i}
          className={styles.spark}
          style={{
            left: `${spark.left}%`,
            top: `${spark.top}%`,
            width: `${spark.size}px`,
            height: `${spark.size}px`,
            animationDelay: `${spark.delay}s`,
            animationDuration: `${spark.duration}s`,
          }}
        />
      ))}
    </div>
  );
};

export default DiwaliAmbience;
