import React , {useState} from "react";
import { useNavigate } from "react-router-dom";
import "../styles/HowitWorks.css";
import { FaGift, FaPaintBrush, FaCheckCircle, FaTruck } from "react-icons/fa";

const HowitWorks = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const handleProceed = () => {
    if (!selectedOption) return;

    if (selectedOption === "Polo T-Shirt") {
      navigate("/customize/polotshirt");
    } else if (selectedOption === "Round Neck T-Shirt") {
      navigate("/customize/roundneck");
    } else if (selectedOption === "Cap") {
      navigate("/customize/cap");
    }
    setShowPopup(false);
  };

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
          <button className="how-it-works-cta" onClick={() => setShowPopup(true)}>Get Started</button>
        </div>
      </div>

      {/* Popup */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h4>What would you like to customize?</h4>
            <select
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
            >
              <option value="">Select an option</option>
              <option value="Polo T-Shirt">Polo T-Shirt</option>
              <option value="Round Neck T-Shirt">Round Neck T-Shirt</option>
              <option value="Cap">Cap</option>
            
            </select>
            <div className="popup-buttons">
              <button onClick={handleProceed} disabled={!selectedOption}>
                Proceed
              </button>
              <button className="cancel-btn-2" onClick={() => setShowPopup(false)}>
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
