"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../styles/WhyChooseUs.module.css";
import { Truck, Leaf, BadgeCheck, Users, Percent } from "lucide-react";

const WhyChooseUs = () => {
  const router = useRouter();
  const [showPopup, setShowPopup] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const features = [
    {
      icon: <Users size={52} aria-hidden="true" role="presentation" />,
      title: "1000+ Happy Clients",
      subtitle: "Trusted for Customized Promotional Products",
      content:
        "We have delivered promotional products across Delhi NCR, Okhla, Gurgaon, Noida, and Haryana to more than a thousand satisfied clients. From corporates to coaching institutes, startups, and schools, PrintKee helps brands create a lasting impression with high-quality custom promotional items.",
    },
    {
      icon: <Truck size={52} aria-hidden="true" role="presentation" />,
      title: "Pan-India Shipping",
      subtitle: "Nationwide Delivery, Always On-Time",
      content:
        "Get your branded merchandise, corporate gifts, and promotional items delivered anywhere in India. With affordable pricing and timely logistics, PrintKee ensures your brand reaches the right audience without delays.",
    },
    {
      icon: <BadgeCheck size={52} aria-hidden="true" role="presentation" />,
      title: "Custom Branding",
      subtitle: "Personalized Corporate Gifting Solutions",
      content:
        "Boost your brand identity with fully customizable merchandise — including T-shirts, bags, stationery, tech items, and premium corporate gifts. Our high-quality materials and finishing ensure your promotional items truly stand out.",
    },
    {
      icon: <Percent size={52} aria-hidden="true" role="presentation" />,
      title: "Bulk Order Discounts",
      subtitle: "Save More on Promotional Gifts",
      content:
        "Enjoy exclusive discounts on large-quantity orders for client gifting, employee giveaways, event merchandise, and promotional campaigns. More quantity means more savings — without sacrificing quality.",
    },
    {
      icon: <Leaf size={52} aria-hidden="true" role="presentation" />,
      title: "Sustainable Options",
      subtitle: "Eco-Friendly Branded Merchandise",
      content:
        "Support a greener tomorrow with eco-friendly corporate gifting options. Choose from sustainable materials including bamboo, jute, recycled stationery, and other earth-friendly promotional products.",
    },
  ];

  const handleProceed = () => {
    if (!selectedOption) return;
    const routes = {
      "Polo T-Shirt": "/customize/polotshirt",
      "Round Neck T-Shirt": "/customize/roundneck",
      Cap: "/customize/cap",
    };
    router.push(routes[selectedOption]);
    setShowPopup(false);
  };

  return (
    <section className={styles.whychooseSection} aria-labelledby="whychoose-heading">
      <div className={styles.whychooseInner}>
        <div className={styles.whychooseLayout}>
          {/* Left: eyebrow + heading + accent line */}
          <div className={styles.whychooseLeft}>
            <span className={styles.whychooseEyebrow}>WHY CHOOSE PRINTKEE</span>
            <h2 id="whychoose-heading" className={styles.whychooseHeading}>
              Everything you need for perfect branding
            </h2>
            <div className={styles.whychooseAccentLine} aria-hidden="true" />
          </div>

          {/* Right: cards grid */}
          <section className={styles.whychooseGrid} aria-label="Reasons to choose PrintKee">
        {features.map((feature, index) => (
          <article className={styles.whychooseCard} key={index}>
            <div className={styles.icon}>{feature.icon}</div>
            <h3 className={styles.cardTitle}>{feature.title}</h3>
            <p className={styles.cardSubtitle}>{feature.subtitle}</p>
            <p className={styles.cardContent}>{feature.content}</p>
          </article>
        ))}
          </section>
        </div>
      </div>

      <button
        className={styles.whychooseCta}
        aria-label="Start customizing your promotional product"
        onClick={() => setShowPopup(true)}
      >
        Start Customizing <span className={styles.arrow1}>→</span>
      </button>

      {showPopup && (
        <div
          className={styles.popupOverlay}
          role="dialog"
          aria-modal="true"
          aria-labelledby="popup-title"
        >
          <div className={styles.popup}>
            <h4 id="popup-title">What would you like to customize?</h4>

            <label htmlFor="wcu-customize-select" className={styles.visuallyHidden}>
              Choose an item to customize
            </label>
            <select
              id="wcu-customize-select"
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
            >
              <option value="">Select an option</option>
              <option value="Polo T-Shirt">Polo T-Shirt</option>
              <option value="Round Neck T-Shirt">Round Neck T-Shirt</option>
              <option value="Cap">Cap</option>
            </select>

            <div className={styles.popupButtons}>
              <button
                onClick={handleProceed}
                disabled={!selectedOption}
                aria-disabled={!selectedOption}
              >
                Proceed
              </button>
              <button
                className={styles.cancelBtn2}
                aria-label="Close popup"
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

export default WhyChooseUs;
