"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../styles/OurServices.module.css";
import {
  FaGift,
  FaRecycle,
  FaRegLightbulb,
  FaUserTie,
  FaLaptop,
  FaRegClock,
} from "react-icons/fa";

const services = [
  {
    icon: <FaGift aria-hidden="true" />,
    title: "Corporate Gifting Solutions",
    description:
      "Enhance your brand presence with our premium corporate gifting solutions. From employee appreciation gifts to client giveaways and event merchandise, we create thoughtful and high-quality promotional items that strengthen business relationships and build trust.",
    keywords: "Corporate Gifts Delhi NCR, Business Promotional Products, Client Gifting Ideas",
  },
  {
    icon: <FaRecycle aria-hidden="true" />,
    title: "Eco-Friendly Promotional Products",
    description:
      "Go green with our eco-friendly promotional products! Choose from bamboo bottles, reusable jute bags, recycled notebooks, and other sustainable items designed to support your company's green initiatives and showcase your commitment to the environment.",
    keywords: "Eco-Friendly Corporate Gifts, Sustainable Promotional Items, Green Gifting Solutions",
  },
  {
    icon: <FaUserTie aria-hidden="true" />,
    title: "Apparel & Uniform Customization",
    description:
      "Stand out with customized branded apparel – including t-shirts, caps, polo shirts, and jackets – printed or embroidered with your company logo. Perfect for team events, promotions, and internal branding campaigns.",
    keywords: "Custom T-Shirts in Delhi NCR, Branded Apparel Manufacturer, Logo Printed Uniforms",
  },
  {
    icon: <FaLaptop aria-hidden="true" />,
    title: "Tech Accessories & Gadgets",
    description:
      "Upgrade your brand with useful tech promotional products like power banks, Bluetooth speakers, USB drives, and wireless chargers. Modern, practical, and perfect for impressing clients and employees alike.",
    keywords: "Promotional Tech Gadgets, Custom Branded Tech Items, Corporate Tech Gifts",
  },
  {
    icon: <FaRegClock aria-hidden="true" />,
    title: "Executive & Desktop Gifts",
    description:
      "Choose from a wide range of premium executive gifts like diaries, pens, desk organizers, and clocks. Ideal for creating a professional touch in your corporate gifting strategy.",
    keywords: "Executive Gifts Delhi NCR, Desktop Promotional Products, Office Branding Items",
  },
  {
    icon: <FaRegLightbulb aria-hidden="true" />,
    title: "Fully Customizable Gift Kits",
    description:
      "Create your own branded gift box with our fully customizable kits. Mix and match products like apparel, stationery, and accessories to create the perfect gift set for employees, clients, or event participants.",
    keywords: "Custom Gift Kits, Corporate Gift Boxes, Employee Gift Sets",
  },
];

const OurServices = () => {
  const router = useRouter();
  const [showPopup, setShowPopup]       = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const handleProceed = () => {
    if (!selectedOption) return;
    const routes = {
      "Polo T-Shirt":       "/customize/polotshirt",
      "Round Neck T-Shirt": "/customize/roundneck",
      "Cap":                "/customize/cap",
    };
    router.push(routes[selectedOption]);
    setShowPopup(false);
  };

  return (
    <section className={styles.ourServices} aria-labelledby="our-services-heading">

      <h2 id="our-services-heading" className={styles.sectionTitle}>
        Our Services
      </h2>

      <p className={styles.sectionDescription}>
        Explore our diverse range of custom promotional products and corporate gifting
        solutions designed to boost your brand visibility and leave a lasting impression
        on your clients.
      </p>

      <div className={styles.servicesGrid}>
        {services.map((service, index) => (
          <article
            className={styles.serviceCard}
            key={index}
            aria-labelledby={`service-title-${index}`}
            data-keywords={service.keywords}
          >
            <div className={styles.serviceIcon}>{service.icon}</div>
            <h3 id={`service-title-${index}`} className={styles.serviceTitle}>
              {service.title}
            </h3>
            <p className={styles.serviceDescription}>{service.description}</p>
          </article>
        ))}
      </div>

      {/* ── Customize CTA ── */}
      <div className={styles.servicesCTAWrap}>
        <button
          className={styles.servicesCTA}
          onClick={() => setShowPopup(true)}
          aria-label="Customize your product"
        >
          Start Customizing →
        </button>
      </div>

      {/* ── Popup ── */}
      {showPopup && (
        <div
          className={styles.popupOverlay}
          role="dialog"
          aria-modal="true"
          aria-labelledby="services-popup-title"
        >
          <div className={styles.popup}>
            <h4 id="services-popup-title">What would you like to customize?</h4>
            <label htmlFor="svc-customize-select" className={styles.visuallyHidden}>
              Choose an item
            </label>
            <select
              id="svc-customize-select"
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
            >
              <option value="">Select an option</option>
              <option value="Polo T-Shirt">Polo T-Shirt</option>
              <option value="Round Neck T-Shirt">Round Neck T-Shirt</option>
              <option value="Cap">Cap</option>
            </select>
            <div className={styles.popupButtons}>
              <button onClick={handleProceed} disabled={!selectedOption}>
                Proceed
              </button>
              <button
                className={styles.cancelBtn2}
                onClick={() => setShowPopup(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default OurServices;
