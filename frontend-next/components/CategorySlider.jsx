"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import Link from "next/link";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "../styles/CategorySlider.css";
import { categoryContent } from "../data/categoryContent";

const CategorySlider = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000); // 8s max

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/category/categories`, {
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => setCategories(Array.isArray(data) ? data : []))
      .catch(() => setError(true))
      .finally(() => clearTimeout(timeout));
  }, []);

  return (
    <section
      className="category-slider-container"
      aria-labelledby="category-slider-heading"
    >
      {/* Header with "View all" link — matches reference */}
      <div className="category-slider-header">
        <h2 id="category-slider-heading" className="category-slider-heading">
          Shop by Category
        </h2>
        <Link href="/sitemap" className="category-view-all">
          View all categories →
        </Link>
      </div>

      {error || categories.length === 0 ? null : (
      <Swiper
        aria-label="Browse product categories"
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={4}
        navigation
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        loop={true}
        pagination={{ clickable: true }}
        className="category-swiper"
        breakpoints={{
          1280: { slidesPerView: 8, spaceBetween: 16 },
          1024: { slidesPerView: 6, spaceBetween: 14 },
          768:  { slidesPerView: 4, spaceBetween: 12 },
          480:  { slidesPerView: 3, spaceBetween: 10 },
          0:    { slidesPerView: 2.5, spaceBetween: 8 },
        }}
      >
        {categories.map((item) => {
          const content = categoryContent[item.slug?.toLowerCase()] || {};

          return (
            <SwiperSlide key={item._id}>
              <article className="category-card">
                <div className="category-image-container">
                  {item.isNew && (
                    <span
                      className="category-new-badge"
                      aria-label="New category"
                    >
                      New
                    </span>
                  )}

                  <img
                    className="category-image"
                    src={item.image}
                    alt={`${item.name} category`}
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                <h3 className="category-title">
                  {content.title || item.name}
                </h3>

                <p className="category-description">
                  {content.description || ""}
                </p>

                <Link
                  href={`/${item.slug}`}
                  className="category-explore-btn"
                  aria-label={`Explore ${item.name} category`}
                >
                  Explore <span aria-hidden="true">→</span>
                </Link>
              </article>
            </SwiperSlide>
          );
        })}
      </Swiper>
      )}
    </section>
  );
};

export default CategorySlider;
