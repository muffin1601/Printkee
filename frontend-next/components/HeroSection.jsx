"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Star, Truck, BadgePercent, HeadphonesIcon } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../styles/HeroSection.css";

/* ── STATIC HERO DATA (visual only — no logic change) ─────── */
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

/* ── TRUST INDICATORS ─────────────────────────────────────── */
const TrustStrip = () => (
  <div className="trust-strip" aria-label="Why choose Printkee">
    <div className="trust-strip__inner">
      {[
        { icon: <Star size={18} strokeWidth={1.5} />, title: "Premium Quality", sub: "Top quality products that represent your brand" },
        { icon: <Truck size={18} strokeWidth={1.5} />, title: "Pan India Delivery", sub: "Fast & reliable delivery across India" },
        { icon: <BadgePercent size={18} strokeWidth={1.5} />, title: "Best Price Guarantee", sub: "Competitive pricing for bulk orders" },
        { icon: <HeadphonesIcon size={18} strokeWidth={1.5} />, title: "Dedicated Support", sub: "Round the clock support for your queries" },
      ].map((item) => (
        <div key={item.title} className="trust-strip__item">
          <span className="trust-strip__icon" aria-hidden="true">{item.icon}</span>
          <div>
            <p className="trust-strip__title">{item.title}</p>
            <p className="trust-strip__sub">{item.sub}</p>
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
        className="hero-slider-container"
        aria-label="Corporate gifting highlights"
      >
        {/* SEO JSON-LD kept intact */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ImageGallery",
            name: "PrintKee Corporate Gifting Highlights",
            image: slides.map((s) => s.image),
          })}
        </script>

        {/* Hidden SEO images */}
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
          className="heroSwiper"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              {/* SPLIT LAYOUT: content left | image right */}
              <div className="hero-slide">

                {/* LEFT: Content */}
                <div className="hero-content">
                  <p className="hero-eyebrow">{slide.eyebrow}</p>

                  <h1 className="hero-title">
                    {slide.title}
                    <br />
                    <span className="hero-title-accent">{slide.titleAccent}</span>
                  </h1>

                  <p className="hero-description">{slide.description}</p>

                  <div className="hero-cta-group">
                    <button
                      className="hero-btn-primary"
                      onClick={() => router.push(slide.route)}
                      aria-label={`${slide.cta1} for ${slide.tag}`}
                    >
                      {slide.cta1} <span aria-hidden="true">→</span>
                    </button>
                    <button
                      className="hero-btn-ghost"
                      onClick={() => router.push("/contact")}
                      aria-label="Get a custom quote"
                    >
                      {slide.cta2} <span aria-hidden="true">→</span>
                    </button>
                  </div>

                  <div className="hero-social-proof">
                    <div className="hero-avatars" aria-hidden="true">
                      {["👤", "👤", "👤", "👤"].map((a, i) => (
                        <span key={i} className="hero-avatar">{a}</span>
                      ))}
                    </div>
                    <div>
                      <p className="hero-proof-number">5000+ Happy Customers</p>
                      <p className="hero-proof-sub">Trusted by 1000+ brands across India</p>
                    </div>
                  </div>
                </div>

                {/* RIGHT: Product image */}
                <div className="hero-image" aria-hidden="true">
                  <img
                    src={slide.image}
                    alt=""
                    className="hero-product-img"
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                </div>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Trust strip below hero */}
      <TrustStrip />
    </>
  );
};

export default HeroSection;
