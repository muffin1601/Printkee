"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import Link from "next/link";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import styles from "../styles/CategorySlider.module.css";
import { categoryContent } from "../data/categoryContent";

const CategorySlider = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError]           = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const timeout    = setTimeout(() => controller.abort(), 8000);

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/category/categories`, {
      signal: controller.signal,
    })
      .then((res) => { if (!res.ok) throw new Error(); return res.json(); })
      .then((data) => setCategories(Array.isArray(data) ? data : []))
      .catch(() => setError(true))
      .finally(() => clearTimeout(timeout));
  }, []);

  if (error || categories.length === 0) return null;

  return (
    <section className={styles.section} aria-labelledby="cat-heading">

      {/* ── Header ── */}
      <div className={styles.header}>
        <h2 id="cat-heading" className={styles.heading}>
          Shop by Category
        </h2>
        <Link href="/sitemap" className={styles.viewAll}>
          View all →
        </Link>
      </div>

      {/* ── Swiper ── */}
      <Swiper
        aria-label="Browse product categories"
        modules={[Navigation, Pagination, Autoplay]}
        loop={categories.length > 8}
        autoplay={{ delay: 2800, disableOnInteraction: false }}
        navigation
        pagination={{ clickable: true }}
        className={styles.swiper}
        breakpoints={{
          1280: { slidesPerView: 8, spaceBetween: 12 },
          1024: { slidesPerView: 6, spaceBetween: 12 },
          768:  { slidesPerView: 5, spaceBetween: 10 },
          640:  { slidesPerView: 4, spaceBetween: 10 },
          480:  { slidesPerView: 3, spaceBetween: 8  },
          0:    { slidesPerView: 2.4, spaceBetween: 8 },
        }}
      >
        {categories.map((item) => {
          const content = categoryContent[item.slug?.toLowerCase()] || {};

          return (
            <SwiperSlide key={item._id}>
              <Link
                href={`/${item.slug}`}
                className={styles.card}
                aria-label={`Browse ${item.name}`}
              >
                {/* Image */}
                <div className={styles.imgWrap}>
                  {item.isNew && (
                    <span className={styles.badge} aria-label="New">New</span>
                  )}
                  <img
                    className={styles.img}
                    src={item.image}
                    alt={`${item.name} category`}
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                {/* Name */}
                <p className={styles.name}>
                  {content.title || item.name}
                </p>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
};

export default CategorySlider;
