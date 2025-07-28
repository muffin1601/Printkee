import React from "react";
import "../styles/AboutUs.css";
import { FaBriefcase, FaUsers, FaRegSmile } from "react-icons/fa";

const AboutUs = () => {
  return (
    <section className="about-section">
      <div className="about-container">
        <div className="about-content">
          <h2 className="about-title">About Us</h2>
          <p className="about-description">
            At <strong>Printkee</strong>, we specialize in customized corporate gifting solutions that reflect your brand’s identity and values. With an extensive collection ranging from eco-friendly products and branded apparel to tech gadgets and welcome kits, we help businesses elevate their gifting experiences.
          </p>
          <p className="about-description">
            Whether you're welcoming new employees, celebrating milestones, or promoting your brand at events — our end-to-end service ensures every gift is memorable, thoughtful, and impactful.
          </p>
          <p className="about-highlight">
            Empower your corporate culture with gifts that leave a lasting impression.
          </p>
          <div className="about-stats">
            <div className="stat-card">
              <FaUsers className="stat-icon" />
              <h4>500+ Clients</h4>
              <p>Trusted by top brands across industries</p>
            </div>
            <div className="stat-card">
              <FaBriefcase className="stat-icon" />
              <h4>10+ Years</h4>
              <p>Experience in corporate gifting</p>
            </div>
            <div className="stat-card">
              <FaRegSmile className="stat-icon" />
              <h4>1M+ Gifts Delivered</h4>
              <p>Across India with quality assurance</p>
            </div>
          </div>
          <a href="/products" className="about-btn">Explore Products</a>
        </div>

        <div className="about-image-wrapper">
          <img
            src="https://images.pexels.com/photos/7581000/pexels-photo-7581000.jpeg"
            alt="Corporate Gifting"
            className="about-image"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
