import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../styles/Diwali.css";
import giftsList from "../data/diwalispl";

const Diwali = () => {
  
  const groupedGifts = giftsList.reduce((acc, gift) => {
    if (!acc[gift.category]) acc[gift.category] = [];
    acc[gift.category].push(gift);
    return acc;
  }, {});

  return (
    <div className="diwali-page">
      {/* Header */}
      <div className="diwali-header">
        <h1>🎆 Happy Diwali! Celebrate with Big Deals 🎁</h1>
        <p>Enjoy the lights and unlock amazing offers across all categories!</p>
      </div>

      {/* Dynamic Swipers from JSON */}
      {Object.keys(groupedGifts).map((category, idx) => (
        <div className="carousel-section" key={idx}>
          <h2 className="carousel-title">{category}</h2>
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={20}
            slidesPerView={4}
            breakpoints={{
              1024: { slidesPerView: 3 },
              768: { slidesPerView: 2 },
              480: { slidesPerView: 1 },
            }}
            autoplay={{
              delay: 0, 
              disableOnInteraction: false,
              pauseOnMouseEnter: true, 
            }}
            speed={4000} 
            loop={true} 
          >
            {groupedGifts[category].map((gift) => (
              <SwiperSlide key={gift.id}>
                <div className="carousel-card">
                  <img src={gift.image} alt={gift.name} className="carousel-img" />
                  <p className="gift-name">{gift.name}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ))}

      {/* CTA */}
      <div className="cta-section">
        <h2>🎉 Download Our Diwali Catalogue!</h2>
        <button className="cta-button">Download Now</button>
      </div>
    </div>
  );
};

export default Diwali;
