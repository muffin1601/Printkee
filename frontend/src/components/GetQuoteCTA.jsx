import React, {useState} from "react";
import "../styles/GetQuoteCTA.css";
import { FaGift, FaClock, FaBoxOpen, FaPhoneAlt } from "react-icons/fa";
import EnquiryModal from './EnquiryModal';

const GetQuoteCTA = () => {
    const [showModal, setShowModal] = useState(false);
  return (
    <>
    <section className="quote-cta-section">
      <div className="quote-cta-overlay">
        <div className="quote-cta-content">
          <h2 className="quote-heading">Need 100+ Gifts? Let’s Customize Something Perfect.</h2>

          <div className="quote-features">
            <div className="feature-item">
              <FaGift className="feature-icon" />
              Bulk Discounts
            </div>
            <div className="feature-item">
              <FaClock className="feature-icon" />
              Fast Delivery
            </div>
            <div className="feature-item">
              <FaBoxOpen className="feature-icon" />
              Premium Packaging
            </div>
          </div>

          <button className="quote-cta-button" onClick={() => setShowModal(true)}>
            Request a Quote <span className="arrow-1">→</span>
          </button>

          <p className="quote-cta-extra-info">
            Have questions?{" "}
            <a href="mailto:sales@mfglobalservices.com">
              Contact our team
            </a>{" "}
            for personalized assistance.
          </p>

          <p className="quote-cta-extra-info call-us">
            <FaPhoneAlt className="call-icon" /> Call us at{" "}
            <a href="tel:+919266013059">+91 9266 013059</a>
          </p>
        </div>
      </div>

    </section>
<EnquiryModal isOpen={showModal} onClose={() => setShowModal(false)} /></>
  );
};

export default GetQuoteCTA;
