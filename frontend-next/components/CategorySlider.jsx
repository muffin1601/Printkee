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
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/category/categories`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => setCategories(Array.isArray(data) ? data : []))
      .catch(() => setError(true));
  }, []);

  return (
    <section
      className="category-slider-container"
      aria-labelledby="category-slider-heading"
    >
      <h2 id="category-slider-heading" className="category-slider-heading">
        All Categories to Explore
      </h2>

      <p className="category-slider-subheading">
        Discover the best range of customized promotional products with PrintKee —
        your trusted Promotional Items Manufacturer. From stylish personalized
        apparel to eco-friendly gifts, we create impactful marketing giveaways
        that leave a lasting impression.
      </p>

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
          1280: { slidesPerView: 4, spaceBetween: 30 },
          1024: { slidesPerView: 3, spaceBetween: 24 },
          768: { slidesPerView: 2, spaceBetween: 20 },
          480: { slidesPerView: 1.5, spaceBetween: 16 },
          0: { slidesPerView: 1, spaceBetween: 12 },
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
