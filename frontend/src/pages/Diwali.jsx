import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../styles/Diwali.css";
import giftsList from "../data/diwalispl";
import brandsList from "../data/brandsspl";
import axios from "axios";

const Diwali = () => {
  const groupedGifts = giftsList.reduce((acc, gift) => {
    if (!acc[gift.category]) acc[gift.category] = [];
    acc[gift.category].push(gift);
    return acc;
  }, {});

  const [isLeadFormOpen, setIsLeadFormOpen] = useState(false);
  const [leadData, setLeadData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    
  });

  const handleLeadChange = (e) => {
    setLeadData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLeadSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(import.meta.env.VITE_CRM_API_URL, leadData, {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": import.meta.env.VITE_CRM_API_KEY,
        },
      });

      await axios.post(`${import.meta.env.VITE_API_URL}/send-email`, leadData);

      alert("Thank you! Catalogue will be downloaded shortly");
      setLeadData({
        name: "",
        company: "",
        email: "",
        phone: "",
        requirement: "",
      });
      setIsLeadFormOpen(false);
    } catch (error) {
      console.error("Lead form submission error:", error);
      alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="diwali-page">
      <div className="diwali-banner">
        <img
          src="/images/diwali-banner.webp"
          alt="Diwali Celebration"
          className="diwali-banner-img"
        />
      </div>

      {Object.keys(groupedGifts).map((category, idx) => (
        <div className="diwali-carousel-section" key={idx}>
          <h2 className="diwali-carousel-title">{category}</h2>
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation
            pagination={{
              clickable: true,
              bulletClass: "diwali-bullet swiper-pagination-bullet",
              bulletActiveClass: "diwali-bullet-active",
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
                <div className="diwali-carousel-card">
                  <img
                    src={gift.image}
                    alt={gift.name}
                    className="diwali-carousel-img"
                  />
                  <p className="diwali-gift-name">{gift.name}</p>
                  <p className="diwali-gift-description">{gift.description}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ))}

      <div className="diwali-cta-section">
        <h2>🎉 Download Our Diwali Catalogue!</h2>
        <button
          className="diwali-cta-button"
          onClick={() => setIsLeadFormOpen(true)}
        >
          Download Now
        </button>
      </div>

      <div className="diwali-brands-section">
        <h2>✨ Brands We Offer ✨</h2>
        <Swiper
          modules={[Autoplay]}
          spaceBetween={20}
          slidesPerView={5}
          breakpoints={{
            1024: { slidesPerView: 5 },
            768: { slidesPerView: 4 },
            480: { slidesPerView: 2 },
          }}
          autoplay={{ delay: 2000 }}
          loop={true}
        >
          {brandsList.map((brand) => (
            <SwiperSlide key={brand.slug}>
              <a href={brand.url} className="diwali-brand-card">
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="diwali-brand-logo"
                />
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {isLeadFormOpen && (
        <div className="lead-overlay">
          <div className="lead-modal">
            <h3>Get Your Free Diwali Catalogue</h3>
            <form onSubmit={handleLeadSubmit} className="lead-form">
              <input
                type="text"
                name="name"
                value={leadData.name}
                onChange={handleLeadChange}
                placeholder="Your Name"
                required
              />
              <input
                type="text"
                name="company"
                value={leadData.company}
                onChange={handleLeadChange}
                placeholder="Company Name"
              />
              <input
                type="email"
                name="email"
                value={leadData.email}
                onChange={handleLeadChange}
                placeholder="Email Address"
                required
              />
              <input
                type="tel"
                name="phone"
                value={leadData.phone}
                onChange={handleLeadChange}
                placeholder="Phone Number"
                required
              />
  
              <div className="lead-actions">
                <button type="submit" className="lead-submit">
                  Submit & Download
                </button>
                <button
                  type="button"
                  className="lead-cancel"
                  onClick={() => setIsLeadFormOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Diwali;
