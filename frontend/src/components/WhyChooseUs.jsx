import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/WhyChooseUs.css";
import { Truck, Leaf, BadgeCheck, Users, Percent } from "lucide-react";

const WhyChooseUs = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const features = [
    {
      icon: <Users size={32} />,
      title: "1000+ Happy Clients",
      subtitle: "Trusted by Businesses",
      content: "We have served over a thousand satisfied clients across various industries.",
    },
    {
      icon: <Truck size={32} />,
      title: "Pan-India Shipping",
      subtitle: "Nationwide Delivery",
      content: "Get your products delivered anywhere in India with our reliable shipping partners.",
    },
    {
      icon: <BadgeCheck size={32} />,
      title: "Custom Branding",
      subtitle: "Personalized Solutions",
      content: "Enhance your brand identity with fully customizable products and packaging.",
    },
    {
      icon: <Percent size={32} />,
      title: "Bulk Order Discounts",
      subtitle: "Save More on Volume",
      content: "Enjoy special pricing and discounts on large quantity orders.",
    },
    {
      icon: <Leaf size={32} />,
      title: "Sustainable Options",
      subtitle: "Eco-Friendly Choices",
      content: "Choose from a range of sustainable materials and products for a greener future.",
    },
  ];

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
    <section className="whychoose-section">
      <h2 className="whychoose-heading">Why Choose Printkee?</h2>
      <h3 className="whychoose-subheading">Experience the Printkee Advantage</h3>
      <div className="whychoose-grid">
        {features.map((feature, index) => (
          <div className="whychoose-card" key={index}>
            <div className="icon">{feature.icon}</div>
            <h4 className="card-title">{feature.title}</h4>
            <div className="card-subtitle">{feature.subtitle}</div>
            <p className="card-content">{feature.content}</p>
          </div>
        ))}
      </div>
      <button className="whychoose-cta" onClick={() => setShowPopup(true)}>
        Start Customizing<span className="arrow-1">→</span>
      </button>

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

export default WhyChooseUs;
