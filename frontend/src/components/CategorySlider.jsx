import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../styles/CategorySlider.css";
import { categoryContent } from "../data/categoryContent";

const CategorySlider = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/category/categories`)
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Failed to fetch categories:", err));
  }, []);

  return (
    <div className="category-slider-container">
      <h2 className="category-slider-heading">All Categories to Explore</h2>

      <p className="category-slider-subheading">
        Discover the best range of customized promotional products with PrintKee – your trusted Promotional Items Manufacturer. From stylish personalized apparel to eco-friendly gifts, we create unique and impactful marketing giveaways that leave a lasting impression. Whether you’re in Noida, Delhi NCR, or anywhere in India, explore our curated categories designed for businesses, corporates, coaching institutes, and schools.
      </p>

      <Swiper
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
          0: { slidesPerView: 1, spaceBetween: 12 }
        }}
      >
        {categories.map((item) => {
          const content =
            categoryContent[item.slug?.toLowerCase()] || {};

          return (
            <SwiperSlide key={item._id}>
              <div className="category-card">
                <div className="category-image-container">
                  {item.isNew && (
                    <span className="category-new-badge">New</span>
                  )}
                  <img
                    className="category-image"
                    src={item.image}
                    alt={item.name}
                  />
                </div>

                <h3 className="category-title">
                  {content.title || item.name}
                </h3>

                <p className="category-description">
                  {content.description || ""}
                </p>

                <button
                  className="category-explore-btn"
                  onClick={() =>
                    (window.location.href = `/${item.slug}`)
                  }
                >
                  Explore →
                </button>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default CategorySlider;
