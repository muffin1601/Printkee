import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../styles/HeroSection.css";

const slides = [
  {
    image: "/assets/banner1.jpeg",
    title: "Customized Corporate Apparel",
    description:
      "Dress your team in style with premium shirts, jackets, and uniforms—personalized with your company logo.",
    tag: "Apparel & Uniforms",
  },
  {
    image: "/assets/banner2.jpeg",
    title: "Eco-Friendly Gift Solutions",
    description:
      "Make a sustainable impact with eco-conscious gifting options made from recycled and biodegradable materials.",
    tag: "Eco Products",
  },
  {
    image: "/assets/banner3.jpeg",
    title: "Smart Tech Gifts",
    description:
      "Impress clients and employees with innovative, branded tech products like wireless chargers, earbuds, and gadgets.",
    tag: "Technology",
  },
  {
    image: "/assets/banner4.jpeg",
    title: "Premium Drinkware Collection",
    description:
      "From stainless steel bottles to personalized mugs, our drinkware is perfect for daily use and corporate branding.",
    tag: "Drinkware",
  },
  {
    image: "/assets/banner1.jpeg",
    title: "Bags, Office, & Writing Essentials",
    description:
      "Discover a wide range of custom office bags, notebooks, and writing instruments—perfect for gifting and branding.",
    tag: "Office & Bags",
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
