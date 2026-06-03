"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../styles/HowitWorks.module.css";
import { Gift, Paintbrush, CheckCircle2, Truck } from "lucide-react";

const HowitWorks = () => {
  const router = useRouter();
  const [showPopup, setShowPopup] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const handleProceed = () => {
    if (!selectedOption) return;
    if (selectedOption === "Polo T-Shirt") router.push("/customize/polotshirt");
    if (selectedOption === "Round Neck T-Shirt") router.push("/customize/roundneck");
    if (selectedOption === "Cap") router.push("/customize/cap");
    setShowPopup(false);
  };

  return (
    <section
      className={styles["how-it-works-section"]}
      role="region"
      aria-labelledby="howitworks-title"
    >
      <div className={styles["how-it-works-banner"]}>
        <div className={styles["how-it-works-overlay"]}>
          <h2 id="howitworks-title" className={styles["how-it-works-title"]}>
            How It Works
          </h2>

          <p className={styles["how-it-works-subheading"]}>
            Seamless gifting, made simple. Here's how our process works:
          </p>

          <div className={styles["how-it-works-steps"]}>
            <div className={styles["step-card"]}>
              <Gift className={styles["step-icon"]} size={32} aria-hidden="true" />
              <h3>Choose Gifts</h3>
              <p>Explore curated gifting options for your audience.</p>
            </div>

            <div className={styles["step-card"]}>
              <Paintbrush className={styles["step-icon"]} size={32} aria-hidden="true" />
              <h3>Customize</h3>
              <p>Add your logo, colors, and message to make it personal.</p>
            </div>

            <div className={styles["step-card"]}>
              <CheckCircle2 className={styles["step-icon"]} size={32} aria-hidden="true" />
              <h3>Approve & Pay</h3>
              <p>Confirm your order with a secure checkout process.</p>
            </div>

            <div className={styles["step-card"]}>
              <Truck className={styles["step-icon"]} size={32} aria-hidden="true" />
              <h3>Deliver with Care</h3>
              <p>We pack and ship gifts with precision and love.</p>
            </div>
          </div>

          <button
            className={styles["how-it-works-cta"]}
            onClick={() => setShowPopup(true)}
            aria-label="Get started with customizing your products"
          >
            Get Started
          </button>
        </div>
      </div>

      {showPopup && (
        <div
          className={styles.popupOverlay}
          role="dialog"
          aria-modal="true"
          aria-labelledby="popup-heading"
        >
          <div className={styles.popup}>
            <h4 id="popup-heading">What would you like to customize?</h4>

            <label htmlFor="hiw-customize-select" className={styles.visuallyHidden}>
              Choose an item to customize
            </label>
            <select
              id="hiw-customize-select"
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
              aria-label="Select a product to customize"
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
                aria-label="Proceed to customization"
              >
                Proceed
              </button>
              <button
                className={styles.cancelBtn2}
                onClick={() => setShowPopup(false)}
                aria-label="Close customization popup"
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

export default HowitWorks;
