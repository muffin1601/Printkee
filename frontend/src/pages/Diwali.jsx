import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../styles/Diwali.css";
import giftsList from "../data/diwalispl";
import brandsList from "../data/brandsspl"; // Array of {id, name, logo}

const Diwali = () => {
  const groupedGifts = giftsList.reduce((acc, gift) => {
    if (!acc[gift.category]) acc[gift.category] = [];
    acc[gift.category].push(gift);
    return acc;
  }, {});

  return (
    <div className="diwali-page">
      {/* Festive Banner */}
      <div className="diwali-banner">
        <img
          src="/images/diwali-banner.webp"
          alt="Diwali Celebration"
          className="banner-img"
        />
        {/* <div className="banner-text">
          <h1>🎆 Happy Diwali! Celebrate with Big Deals 🎁</h1>
          <p>Spread the light, share the joy, and grab the best festive offers!</p>
        </div> */}
      </div>

      {/* Dynamic Gift Carousels */}
      {Object.keys(groupedGifts).map((category, idx) => (
        <div className="carousel-section" key={idx}>
          <h2 className="carousel-title">{category}</h2>
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation
            pagination={{
              clickable: true,
              bulletClass: "diwali-bullet swiper-pagination-bullet", // custom bullet class
              bulletActiveClass: "diwali-bullet-active", // active bullet
            }}
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
                  <img
                    src={gift.image}
                    alt={gift.name}
                    className="carousel-img"
                  />
                  <p className="gift-name">{gift.name}</p>
                  <p className="gift-description">{gift.description}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ))}

      {/* Call-to-Action */}
      <div className="cta-section">
        <h2>🎉 Download Our Diwali Catalogue!</h2>
        <button className="cta-button">Download Now</button>
      </div>

      {/* Brands Section */}
      <div className="brands-section">
        <h2>✨ Brands We Offer ✨</h2>
        <Swiper
          modules={[Autoplay]}
          spaceBetween={20}
          slidesPerView={6}
          breakpoints={{
            1024: { slidesPerView: 6 },
            768: { slidesPerView: 4 },
            480: { slidesPerView: 2 },
          }}
          autoplay={{ delay: 2000 }}
          loop={true}
        >
          {brandsList.map((brand) => (
            <SwiperSlide key={brand.id}>
              <div className="brand-card">
                <img src={brand.logo} alt={brand.name} className="brand-logo" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Diwali;
