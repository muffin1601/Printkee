import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../styles/HeroSection.css";

const slides = [
  {
    image: "/assets/banner(1).jpeg",
    title: "Personal Achievements",
    description:
      "Recognizing and celebrating personal achievements with thoughtful gifts.",
    tag: "Gift Shop",
  },
  {
    image: "/assets/banner (2).jpeg",
    title: "Birthday",
    description: "Celebrate birthdays with our curated gift selections.",
    tag: "Gift Shop",
  },
  {
    image: "/assets/banner (3).jpeg",
    title: "Anniversary",
    description: "Find the perfect gift to commemorate anniversaries.",
    tag: "Gift Shop",
  },
  {
    image: "/assets/banner (4).jpeg",
    title: "Farewell",
    description: "Say goodbye with meaningful farewell gifts.",
    tag: "Gift Shop",
  },
  {
    image: "/assets/banner (1).jpeg",
    title: "New Arrival",
    description: "Explore our latest collection of gifts.",
    tag: "Gift Shop",
  },
];

const HeroSection = () => {
  return (
    <div className="hero-slider-container">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        loop={true}
        className="heroSwiper"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="hero-slide"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="overlay">
                <div className="content-box">
                  <p className="tag">{slide.tag}</p>
                  <h1 className="title">{slide.title}</h1>
                  <p className="description">{slide.description}</p>
                  <button className="show-products">
                    <span>Show products</span>
                    <span className="arrow">→</span>
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSection;
