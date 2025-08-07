import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import "../styles/FloatingButton.css";

const FloatingButtons = () => {
  return (
    <div className="floating-buttons">
      <a
        href="https://wa.me/+919266013059"
        className="whatsapp-button"
        target="_blank"
        rel="noopener noreferrer"
        data-title="Chat on WhatsApp"
      >
        <FaWhatsapp className="icon-btn" />
      </a>
    </div>
  );
};

export default FloatingButtons;
