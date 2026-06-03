"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Star, Truck, BadgePercent, HeadphonesIcon } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import styles from "../styles/HeroSection.module.css";

const slides = [
  {
    image: "/assets/banner1.webp",
    title: "Custom Products.",
    titleAccent: "Stronger Connections.",
    eyebrow: "PREMIUM CORPORATE MERCHANDISE",
    description:
      "Elevate your brand with high-quality custom merchandise that leaves a lasting impression.",
    route: "/apparel-and-accessories",
    cta1: "Explore Products",
    cta2: "Get a Quote",
    tag: "Apparel & Uniforms",
  },
  {
    image: "/assets/banner2.webp",
    title: "Eco-Friendly",
    titleAccent: "Gift Solutions.",
    eyebrow: "SUSTAINABLE CORPORATE GIFTING",
    description:
      "Make a lasting impact with eco-conscious products made from recycled and biodegradable materials.",
    route: "/eco-products",
    cta1: "Explore Products",
    cta2: "Get a Quote",
    tag: "Eco Products",
  },
  {
    image: "/assets/banner3.webp",
    title: "Smart Tech",
    titleAccent: "Gifts for Teams.",
    eyebrow: "TECHNOLOGY ACCESSORIES",
    description:
      "Impress clients and employees with innovative branded tech products — chargers, earbuds and more.",
    route: "/technology-accessories",
    cta1: "Explore Products",
    cta2: "Get a Quote",
    tag: "Technology",
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

const HeroSection = () => {
  const router = useRouter();

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
            alt={`${slide.title} ${slide.titleAccent} – ${slide.tag}`}
            loading={i === 0 ? "eager" : "lazy"}
            style={{ display: "none" }}
          />
        ))}

        <Swiper
          aria-roledescription="carousel"
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5500, disableOnInteraction: false }}
          loop={true}
          className={styles.heroSwiper}
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              {/* Full-bleed background slide */}
              <div
                className={styles.heroSlide}
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                {/* Dark purple gradient overlay */}
                <div className={styles.heroOverlay} aria-hidden="true" />

                {/* Content — constrained to max-width, left-aligned */}
                <div className={styles.heroInner}>
                  <div className={styles.heroContent}>

                    <p className={styles.heroEyebrow}>{slide.eyebrow}</p>

                    <h1 className={styles.heroTitle}>
                      {slide.title}
                      <br />
                      <span className={styles.heroTitleAccent}>{slide.titleAccent}</span>
                    </h1>

                    <p className={styles.heroDescription}>{slide.description}</p>

                    <div className={styles.heroCTAGroup}>
                      <button
                        className={styles.heroBtnPrimary}
                        onClick={() => router.push(slide.route)}
                        aria-label={`${slide.cta1} for ${slide.tag}`}
                      >
                        {slide.cta1} <span aria-hidden="true">→</span>
                      </button>
                      <button
                        className={styles.heroBtnGhost}
                        onClick={() => router.push("/contact")}
                        aria-label="Get a custom quote"
                      >
                        {slide.cta2} <span aria-hidden="true">→</span>
                      </button>
                    </div>

                    <div className={styles.heroSocialProof}>
                      <div className={styles.heroAvatars} aria-hidden="true">
                        {["👤", "👤", "👤", "👤"].map((a, i) => (
                          <span key={i} className={styles.heroAvatar}>{a}</span>
                        ))}
                      </div>
                      <div>
                        <p className={styles.heroProofNumber}>5000+ Happy Customers</p>
                        <p className={styles.heroProofSub}>Trusted by 1000+ brands across India</p>
                      </div>
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
