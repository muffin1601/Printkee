import React from "react";
import Link from "next/link";
import styles from "../styles/Testimonials.module.css";

const testimonials = [
  {
    name: "Ananya Sharma",
    position: "HR Manager",
    company: "TechNova Pvt Ltd",
    review:
      "Printkee made our festive gifting process effortless and stylish. Great support and timely delivery!",
  },
  {
    name: "Rajeev Bansal",
    position: "Procurement Head",
    company: "FinEdge Solutions",
    review:
      "The onboarding kits were beautifully packed and reflected our brand perfectly. Highly recommended!",
  },
  {
    name: "Sonal Mehta",
    position: "Marketing Lead",
    company: "GreenHive",
    review:
      "Our conference giveaways were a hit! Sleek tech gifts, fast execution, and custom branding was top-notch.",
  },
];

const brandLogos = [
  { src: "/assets/accenture.webp", alt: "Accenture" },
  { src: "/assets/amazon.webp",    alt: "Amazon"    },
  { src: "/assets/google.webp",    alt: "Google"    },
  { src: "/assets/microsoft.webp", alt: "Microsoft" },
  { src: "/assets/nike.webp",      alt: "Nike"      },
];

const Testimonials = () => (
  <section className={styles.section} aria-labelledby="testimonials-heading">

    {/* ── Header ── */}
    <div className={styles.header}>
      <h2 id="testimonials-heading" className={styles.heading}>
        What Our Clients Say
      </h2>
      <p className={styles.sub}>
        Trusted by 1000+ brands across India for corporate gifting and custom branding.
      </p>
    </div>

    {/* ── 3 equal testimonial cards ── */}
    <div className={styles.cards}>
      {testimonials.map((item, i) => (
        <figure
          key={i}
          className={styles.card}
          aria-label={`Testimonial from ${item.name}`}
        >
          {/* Quote + stars */}
          <div className={styles.cardTop}>
            <span className={styles.quoteIcon} aria-hidden="true">&ldquo;</span>
            <div className={styles.stars} aria-label="5 stars">★★★★★</div>
          </div>

          {/* Review */}
          <blockquote className={styles.review}>
            {item.review}
          </blockquote>

          {/* Author */}
          <figcaption className={styles.author}>
            <div className={styles.avatar} aria-hidden="true">
              {item.name.charAt(0)}
            </div>
            <div>
              <p className={styles.name}>{item.name}</p>
              <p className={styles.role}>{item.position}, {item.company}</p>
            </div>
          </figcaption>
        </figure>
      ))}
    </div>

    {/* ── Brand logos strip ── */}
    <div className={styles.brandsRow}>
      <p className={styles.brandsLabel}>Trusted by</p>
      {brandLogos.map((b) => (
        <div key={b.alt} className={styles.brandLogo}>
          <img src={b.src} alt={`${b.alt} logo`} loading="lazy" />
        </div>
      ))}
    </div>

    {/* ── CTA ── */}
    <div className={styles.ctaWrap}>
      <Link href="/contact" className={styles.ctaBtn}>
        Need something custom? Get a Quote →
      </Link>
    </div>

  </section>
);

export default Testimonials;
