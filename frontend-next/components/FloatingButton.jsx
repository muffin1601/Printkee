import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import styles from "../styles/FloatingButton.module.css";

const FloatingButtons = () => {
  return (
    <div className={styles["floating-buttons"]}>
      <a
        href="https://wa.me/+918750708222"
        className={styles["whatsapp-button"]}
        target="_blank"
        rel="noopener noreferrer"
        title="Chat with us on WhatsApp"
        aria-label="Chat with us on WhatsApp"
        role="button"
      >
        <FaWhatsapp className={styles["icon-btn"]} aria-hidden="true" />
      </a>
    </div>
  );
};

export default FloatingButtons;
