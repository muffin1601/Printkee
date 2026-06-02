"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "../styles/Diwali.css";
import giftsList from "../data/diwalispl";
import brandsList from "../data/brandsspl";
import axios from "axios";

const DiwaliClient = () => {
  const groupedGifts = giftsList.reduce((acc, gift) => {
    if (!acc[gift.category]) acc[gift.category] = [];
    acc[gift.category].push(gift);
    return acc;
  }, {});

  const [isLeadFormOpen, setIsLeadFormOpen] = useState(false);
  const [leadData, setLeadData] = useState({ name: "", company: "", email: "", phone: "" });

  const handleLeadChange = (e) => {
    setLeadData({ ...leadData, [e.target.name]: e.target.value });
  };

  const handleLeadSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch("/api/crm-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leadData),
      });
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/send-email`, leadData);
      alert("Thank you! Catalogue will be downloaded shortly");

      const link = document.createElement("a");
      link.href = "/catalogue.pdf";
      link.download = "Diwali_Catalogue.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setLeadData({ name: "", company: "", email: "", phone: "" });
      setIsLeadFormOpen(false);
    } catch (err) {
      console.error("Lead form submission error:", err);
      alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="diwali-page">
      <div className="diwali-banner">
        <img
          src="/images/diwali-banner.webp"
          alt="Premium Diwali Corporate Gifting Hampers for Employees & Clients"
          className="diwali-banner-img"
        />
      </div>

      {Object.keys(groupedGifts).map((category, idx) => (
        <section className="diwali-carousel-section" key={idx}>
          <h2 className="diwali-carousel-title">{category}</h2>
          <Swiper
            modules={[Navigation, Pagination, Autoplay, Scrollbar]}
            navigation
            pagination={{ clickable: true, bulletClass: "diwali-bullet swiper-pagination-bullet", bulletActiveClass: "diwali-bullet-active" }}
            scrollbar={{ draggable: true }}
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{ 480: { slidesPerView: 1 }, 640: { slidesPerView: 2 }, 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 }, 1280: { slidesPerView: 4 } }}
            autoplay={{ delay: 0, disableOnInteraction: false, pauseOnMouseEnter: true }}
            speed={4000}
            loop
            aria-label={`Diwali gifts carousel for ${category}`}
          >
            {groupedGifts[category].map((gift) => (
              <SwiperSlide key={gift.id}>
                <div className="diwali-carousel-card">
                  <img src={gift.image} alt={`${gift.name} – ${gift.description}`} className="diwali-carousel-img" />
                  <p className="diwali-gift-name">{gift.name}</p>
                  <p className="diwali-gift-description">{gift.description}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
      ))}

      <div className="diwali-cta-section">
        <h2>🎉 Download Our Diwali Catalogue!</h2>
        <button className="diwali-cta-button" aria-label="Open lead form to download Diwali catalogue" onClick={() => setIsLeadFormOpen(true)}>
          Download Now
        </button>
      </div>

      <section className="diwali-brands-section">
        <h2>✨ Brands We Offer ✨</h2>
        <Swiper
          modules={[Autoplay, Scrollbar]}
          spaceBetween={20}
          scrollbar={{ draggable: true }}
          slidesPerView={2}
          breakpoints={{ 480: { slidesPerView: 2 }, 640: { slidesPerView: 3 }, 768: { slidesPerView: 4 }, 1024: { slidesPerView: 5 }, 1440: { slidesPerView: 6 } }}
          autoplay={{ delay: 2000 }}
          loop
        >
          {brandsList.map((brand) => (
            <SwiperSlide key={brand.slug}>
              <a href={brand.url} target="_blank" rel="noopener noreferrer" className="diwali-brand-card" aria-label={`Visit ${brand.name} brand page`}>
                <img src={brand.logo} alt={`${brand.name} brand logo`} className="diwali-brand-logo" />
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {isLeadFormOpen && (
        <div className="lead-overlay" role="dialog" aria-modal="true" aria-label="Download Diwali catalogue form">
          <div className="lead-modal">
            <h3>Get Your Free Diwali Catalogue</h3>
            <form onSubmit={handleLeadSubmit} className="lead-form">
              <label htmlFor="diwali-lead-name">Your Name</label>
              <input id="diwali-lead-name" type="text" name="name" value={leadData.name} onChange={handleLeadChange} placeholder="Your Name" required />
              <label htmlFor="diwali-lead-company">Company Name</label>
              <input id="diwali-lead-company" type="text" name="company" value={leadData.company} onChange={handleLeadChange} placeholder="Company Name" />
              <label htmlFor="diwali-lead-email">Email Address</label>
              <input id="diwali-lead-email" type="email" name="email" value={leadData.email} onChange={handleLeadChange} placeholder="Email Address" required />
              <label htmlFor="diwali-lead-phone">Phone Number</label>
              <input id="diwali-lead-phone" type="tel" name="phone" value={leadData.phone} onChange={handleLeadChange} placeholder="Phone Number" required />
              <div className="lead-actions">
                <button type="submit" className="lead-submit" aria-label="Submit details and download the catalogue">Submit & Download</button>
                <button type="button" className="lead-cancel" aria-label="Close form" onClick={() => setIsLeadFormOpen(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiwaliClient;
