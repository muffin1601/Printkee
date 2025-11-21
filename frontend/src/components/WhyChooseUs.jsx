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
<<<<<<< HEAD
      icon: <Users size={52} />,
      title: "1000+ Happy Clients",
      subtitle: "Trusted for Customized Promotional Products",
      content:
        "We have delivered promotional products across Delhi NCR, Okhla, Gurgaon, Noida, and Haryana to more than a thousand satisfied clients. From corporates to coaching institutes, startups, and schools, PrintKee helps brands create a lasting impression with high-quality custom promotional items.",
    },
    {
      icon: <Truck size={52} />,
      title: "Pan-India Shipping",
      subtitle: "Nationwide Delivery, Always On-Time",
      content:
        "Get your branded merchandise, corporate gifts, and promotional items delivered anywhere in India. With affordable pricing and timely logistics, PrintKee ensures your brand reaches the right audience without delays.",
    },
    {
      icon: <BadgeCheck size={52} />,
      title: "Custom Branding",
      subtitle: "Personalized Corporate Gifting Solutions",
      content:
        "Boost your brand identity with fully customizable merchandise — including T-shirts, bags, stationery, tech items, and premium corporate gifts. Our high-quality materials and finishing ensure your promotional items truly stand out.",
    },
    {
      icon: <Percent size={52} />,
      title: "Bulk Order Discounts",
      subtitle: "Save More on Promotional Gifts",
      content:
        "Enjoy exclusive discounts on large-quantity orders for client gifting, employee giveaways, event merchandise, and promotional campaigns. More quantity means more savings — without sacrificing quality.",
    },
    {
      icon: <Leaf size={52} />,
      title: "Sustainable Options",
      subtitle: "Eco-Friendly Branded Merchandise",
      content:
        "Support a greener tomorrow with eco-friendly corporate gifting options. Choose from sustainable materials including bamboo, jute, recycled stationery, and other earth-friendly promotional products.",
=======
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
>>>>>>> 5dcfb0b802b3dfa5af995a72d59d01ba65526a46
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
<<<<<<< HEAD
      <h2 className="whychoose-heading">
        Why Choose PrintKee for Your Customized Promotional Products?
      </h2>
      <h3 className="whychoose-subheading">PrintKee is your trusted partner for customized promotional products,
        corporate gifting, branded merchandise, and promotional gift items in
        Delhi NCR, Okhla, Gurgaon, Noida, and Haryana.</h3>

=======
      <h2 className="whychoose-heading">Why Choose Printkee?</h2>
      <h3 className="whychoose-subheading">Experience the Printkee Advantage</h3>
>>>>>>> 5dcfb0b802b3dfa5af995a72d59d01ba65526a46
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
<<<<<<< HEAD

      {/* <p className="whychoose-bottom-text">
        PrintKee is your trusted partner for customized promotional products,
        corporate gifting, branded merchandise, and promotional gift items in
        Delhi NCR, Okhla, Gurgaon, Noida, and Haryana.
      </p> */}

      <button className="whychoose-cta" onClick={() => setShowPopup(true)}>
        Start Customizing <span className="arrow-1">→</span>
      </button>

=======
      <button className="whychoose-cta" onClick={() => setShowPopup(true)}>
        Start Customizing<span className="arrow-1">→</span>
      </button>

      {/* Popup */}
>>>>>>> 5dcfb0b802b3dfa5af995a72d59d01ba65526a46
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
<<<<<<< HEAD
            </select>

=======
            
            </select>
>>>>>>> 5dcfb0b802b3dfa5af995a72d59d01ba65526a46
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
