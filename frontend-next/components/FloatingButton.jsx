"use client";
import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import styles from "../styles/FloatingButton.module.css";
import { BUSINESS } from "../lib/siteConfig";
import { trackContactClick } from "../utils/analytics";

const FloatingButtons = () => {
  return (
    <div className={styles["floating-buttons"]}>
      <a
        href={`https://wa.me/${BUSINESS.phoneE164.replace("+", "")}`}
        onClick={() => trackContactClick("whatsapp", "floating_button")}
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
