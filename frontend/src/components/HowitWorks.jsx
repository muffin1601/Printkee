import React from "react";
import "../styles/HowitWorks.css";
import { FaGift, FaPaintBrush, FaCheckCircle, FaTruck } from "react-icons/fa";

const HowitWorks = () => {
  return (
    <section className="how-it-works-section">
      <div className="how-it-works-banner">
        <div className="how-it-works-overlay">
          <h2 className="how-it-works-title">How It Works</h2>
        <p className="how-it-works-subheading">
            Seamless gifting, made simple. Here’s how our process works:
        </p>
          <div className="how-it-works-steps">
            <div className="step-card">
              <FaGift className="step-icon" />
              <h3>Choose Gifts</h3>
              <p>Explore curated gifting options for your audience.</p>
            </div>
            <div className="step-card">
              <FaPaintBrush className="step-icon" />
              <h3>Customize</h3>
              <p>Add your logo, colors, and message to make it personal.</p>
            </div>
            <div className="step-card">
              <FaCheckCircle className="step-icon" />
              <h3>Approve & Pay</h3>
              <p>Confirm your order with a secure checkout process.</p>
            </div>
            <div className="step-card">
              <FaTruck className="step-icon" />
              <h3>Deliver with Care</h3>
              <p>We pack and ship gifts with precision and love.</p>
            </div>
          </div>
          <button className="how-it-works-cta">Get Started</button>
        </div>
      </div>
    </section>
  );
};

export default HowitWorks;
