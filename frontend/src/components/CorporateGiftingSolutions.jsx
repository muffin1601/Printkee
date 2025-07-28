import React from "react";
import "../styles/CorporateGiftingSolutions.css";

const CorporateGiftingSolutions = () => {
  return (
    <div className="giftshop-wrapper">
      <div className="giftshop-header">
        <h2>Corporate Gifting Solutions</h2>
        <p>
          Premium gifting ideas tailored for employees, clients, and events to
          enhance your brand image.
        </p>
        <button className="show-products-btn">Show products</button>
      </div>

      <div className="giftshop-cards">
        <div className="giftshop-card eco">
          <div className="giftshop-icon">♻️</div>
          <h3>Eco-Friendly Options</h3>
          <p>
            Choose from sustainable items like bamboo bottles, reusable bags,
            and recycled notebooks to support green initiatives.
          </p>
        </div>

        <div className="giftshop-card apparel">
          <div className="giftshop-icon">👕</div>
          <h3>Apparel & Uniform Customization</h3>
          <p>
            Branded t-shirts, caps, and corporate wear with your company’s logo
            for promotions or internal branding.
          </p>
        </div>

        <div className="giftshop-card tech">
          <div className="giftshop-icon">🔌</div>
          <h3>Tech Accessories & Gadgets</h3>
          <p>
            Modern and useful promotional tech items including power banks,
            speakers, and wireless chargers.
          </p>
        </div>

        <div className="giftshop-card executive">
          <div className="giftshop-icon">🖋️</div>
          <h3>Executive & Desktop Gifts</h3>
          <p>
            Elegant desktop items like clocks, pen stands, and diaries that
            reflect your company’s professionalism.
          </p>
        </div>

        <div className="giftshop-card kits">
          <div className="giftshop-icon">🎁</div>
          <h3>Fully Customizable Kits</h3>
          <p>
            Welcome kits and curated collections designed to suit onboarding,
            festive occasions, or marketing campaigns.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CorporateGiftingSolutions;
