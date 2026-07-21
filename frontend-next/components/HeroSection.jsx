"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Star, Truck, BadgePercent, HeadphonesIcon } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import styles from "../styles/HeroSection.module.css";

// Fallback content shown until the API responds, and permanently if the
// backend is unreachable or no active banners exist — the homepage must
// never render an empty hero.
const FALLBACK_SLIDES = [
  {
    image: "/assets/banner12.webp",
    badgeText: "PREMIUM CORPORATE MERCHANDISE",
    title: "Custom Products. Stronger Connections.",
    description:
      "Elevate your brand with high-quality custom merchandise that leaves a lasting impression.",
    ctaText: "Explore Products",
    ctaUrl: "/apparel-and-accessories",
    showButton: true,
  },
  {
    image: "/assets/banner34.webp",
    badgeText: "SUSTAINABLE CORPORATE GIFTING",
    title: "Eco-Friendly Gift Solutions.",
    description:
      "Make a lasting impact with eco-conscious products made from recycled and biodegradable materials.",
    ctaText: "Explore Products",
    ctaUrl: "/eco-products",
    showButton: true,
  },
  {
    image: "/assets/banner56.webp",
    badgeText: "TECHNOLOGY ACCESSORIES",
    title: "Smart Tech Gifts for Teams.",
    description:
      "Impress clients and employees with innovative branded tech products — chargers, earbuds and more.",
    ctaText: "Explore Products",
    ctaUrl: "/technology-accessories",
    showButton: true,
  },
];

const trustItems = [
  { icon: <Star size={20} strokeWidth={1.5} />, title: "Premium Quality", sub: "Top quality products that represent your brand" },
  { icon: <Truck size={20} strokeWidth={1.5} />, title: "Pan India Delivery", sub: "Fast & reliable delivery across India" },
  { icon: <BadgePercent size={20} strokeWidth={1.5} />, title: "Best Price Guarantee", sub: "Competitive pricing for bulk orders" },
  { icon: <HeadphonesIcon size={20} strokeWidth={1.5} />, title: "Dedicated Support", sub: "Round the clock support for your queries" },
];

const TrustStrip = () => (
  <div className={styles.trustStrip} aria-label="Why choose Printkee">
    <div className={styles.trustInner}>
      {trustItems.map((item) => (
        <div key={item.title} className={styles.trustItem}>
          <span className={styles.trustIcon} aria-hidden="true">{item.icon}</span>
          <div>
            <p className={styles.trustTitle}>{item.title}</p>
            <p className={styles.trustSub}>{item.sub}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const isExternal = (url) => /^https?:\/\//.test(url || "");

const HeroSection = () => {
  const router = useRouter();
  const [slides, setSlides] = useState(FALLBACK_SLIDES);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/slides/active`);
        if (!res.ok) return;

        const banners = await res.json();
        if (!cancelled && Array.isArray(banners) && banners.length > 0) {
          setSlides(banners);
        }
      } catch (err) {
        // Network/API failure (including third-party browser extensions that
        // intercept fetch, e.g. ad-blockers/privacy tools) — keep the
        // fallback slides so the homepage never breaks or shows an empty
        // hero. Logged at warn, not error: this is an expected, self-healing
        // path, not an application fault.
        console.warn("Failed to load hero banners, using fallback:", err);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const goTo = (url) => {
    if (!url) return;
    if (isExternal(url)) {
      window.location.href = url;
    } else {
      router.push(url);
    }
  };

  return (
    <>
      <section
        className={styles.heroContainer}
        aria-label="Corporate gifting highlights"
      >
        {/* SEO — hidden images for crawlers */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ImageGallery",
            name: "PrintKee Corporate Gifting Highlights",
            image: slides.map((s) => s.image),
          })}
        </script>
        {slides.map((slide, i) => (
          <img
            key={i}
            src={slide.image}
            alt={slide.title}
            loading={i === 0 ? "eager" : "lazy"}
            fetchPriority={i === 0 ? "high" : "low"}
            style={{ display: "none" }}
          />
        ))}

        <Swiper
          aria-roledescription="carousel"
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5500, disableOnInteraction: false }}
          loop={slides.length > 1}
          className={styles.heroSwiper}
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={slide._id || index}>
              {/* Full-bleed background slide */}
              <div
                className={styles.heroSlide}
                style={{
                  "--hero-bg-desktop": `url(${slide.image})`,
                  ...(slide.mobileImage
                    ? { "--hero-bg-mobile": `url(${slide.mobileImage})` }
                    : {}),
                }}
              >
                {/* Dark purple gradient overlay */}
                <div className={styles.heroOverlay} aria-hidden="true" />

                {/* Content — constrained to max-width, left-aligned */}
                <div className={styles.heroInner}>
                  <div className={styles.heroContent}>
                    {slide.badgeText && (
                      <p className={styles.heroEyebrow}>{slide.badgeText}</p>
                    )}

                    <h1 className={styles.heroTitle}>{slide.title}</h1>

                    {slide.subtitle && (
                      <p className={styles.heroSubtitle}>{slide.subtitle}</p>
                    )}

                    {slide.description && (
                      <p className={styles.heroDescription}>{slide.description}</p>
                    )}

                    <div className={styles.heroCTAGroup}>
                      {slide.showButton !== false && slide.ctaText && (
                        <button
                          className={styles.heroBtnPrimary}
                          onClick={() => goTo(slide.ctaUrl)}
                          aria-label={slide.ctaText}
                        >
                          {slide.ctaText} <span aria-hidden="true">→</span>
                        </button>
                      )}
                      <button
                        className={styles.heroBtnGhost}
                        onClick={() => router.push("/contact")}
                        aria-label="Get a custom quote"
                      >
                        Get a Quote <span aria-hidden="true">→</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <TrustStrip />
    </>
  );
};

export default HeroSection;
