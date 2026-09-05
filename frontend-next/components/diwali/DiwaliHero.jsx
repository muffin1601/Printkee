"use client";
import React from "react";
import { ArrowRight, Sparkles, Palette } from "lucide-react";
import Link from "next/link";
import styles from "../../styles/Diwali.module.css";
import DiwaliAmbience from "./DiwaliAmbience";

/* Diyas are drawn as inline SVG rather than images: no extra network
   request, no layout shift, and they scale crisply at every breakpoint.
   The gradients live in a single hidden <defs> sprite so that repeating the
   lamp never duplicates an element id in the document. */
const DiyaDefs = () => (
  <svg className={styles.svgDefs} aria-hidden="true" focusable="false">
    <defs>
      <radialGradient id="diya-flame" cx="50%" cy="60%" r="55%">
        <stop offset="0%" stopColor="#FFF6D8" />
        <stop offset="45%" stopColor="#FFC64A" />
        <stop offset="100%" stopColor="#E8752A" stopOpacity="0.15" />
      </radialGradient>
      <linearGradient id="diya-bowl" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#E0A24C" />
        <stop offset="55%" stopColor="#9C5B22" />
        <stop offset="100%" stopColor="#4E2A10" />
      </linearGradient>
    </defs>
  </svg>
);

const Diya = ({ className }) => (
  <svg className={className} viewBox="0 0 120 90" aria-hidden="true" focusable="false">
    <ellipse className={styles.diyaHalo} cx="60" cy="40" rx="34" ry="30" fill="url(#diya-flame)" />
    <path
      className={styles.diyaFlame}
      d="M60 20c7 9 11 15 11 21a11 11 0 0 1-22 0c0-6 4-12 11-21z"
      fill="url(#diya-flame)"
    />
    <path
      d="M18 58c0-3 3-5 7-5h70c4 0 7 2 7 5 0 13-13 22-31 22H49C31 80 18 71 18 58z"
      fill="url(#diya-bowl)"
    />
    <ellipse cx="60" cy="56" rx="42" ry="6" fill="#B9762F" opacity="0.85" />
  </svg>
);

/**
 * Campaign hero. The headline is plain server-rendered text (no typing or
 * counting effects) so the Largest Contentful Paint element is present in
 * the initial HTML and never shifts.
 */
const DiwaliHero = ({ onSecondaryAction }) => (
  <section className={styles.hero} aria-labelledby="diwali-hero-heading">
    {/* Decorative rangoli arcs — hidden from assistive tech */}
    <div className={styles.heroDecor} aria-hidden="true">
      <svg className={styles.rangoli} viewBox="0 0 400 400" focusable="false">
        {Array.from({ length: 12 }).map((_, i) => (
          <ellipse
            key={i}
            cx="200"
            cy="200"
            rx="180"
            ry="62"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            transform={`rotate(${i * 15} 200 200)`}
          />
        ))}
        <circle cx="200" cy="200" r="52" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="200" cy="200" r="26" fill="none" stroke="currentColor" strokeWidth="1" />
      </svg>
    </div>

    <DiwaliAmbience />

    <div className={styles.heroInner}>
      <p className={styles.heroEyebrow}>
        <Sparkles size={13} aria-hidden="true" />
        Diwali Collection 2026
      </p>

      <h1 id="diwali-hero-heading" className={styles.heroTitle}>
        This Diwali, Gift{" "}
        <span className={styles.heroTitleAccent}>Something Personal</span>
      </h1>

      <p className={styles.heroSub}>
        Custom-printed hampers, desk gifts and festive kits — branded with your
        logo or a loved one&apos;s name. Designed in-house, produced at scale and
        delivered across India in time for the festival.
      </p>

      <div className={styles.heroActions}>
        <a href="#diwali-bestsellers" className={styles.heroCtaPrimary}>
          Shop Diwali Gifts
          <ArrowRight size={15} aria-hidden="true" />
        </a>
        <Link
          href="/customize"
          className={styles.heroCtaGhost}
          onClick={onSecondaryAction}
        >
          <Palette size={15} aria-hidden="true" />
          Create Your Gift
        </Link>
      </div>

      <ul className={styles.heroTrust}>
        <li>Free design mock-ups</li>
        <li>Bulk pricing from 25 units</li>
        <li>Pan-India festive delivery</li>
      </ul>
    </div>

    <DiyaDefs />

    {/* Diya row sits at the base of the hero as a lit shelf of lamps */}
    <div className={styles.diyaRow} aria-hidden="true">
      {[0, 1, 2, 3, 4].map((i) => (
        <span
          key={i}
          className={styles.diyaWrap}
          style={{ animationDelay: `${i * 0.45}s` }}
        >
          <Diya className={styles.diya} />
        </span>
      ))}
    </div>
  </section>
);

export default DiwaliHero;
