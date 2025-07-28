import React from "react";
import "../styles/ShopByOccasion.css";


import onboardingImg from "/assets/onboarding.jpg";
import festiveImg from "/assets/festive.jpg";
import clientImg from "/assets/client.jpg";
import conferenceImg from "/assets/conference.jpg";

const occasions = [
  {
    id: 1,
    title: "Welcome Onboard Kits",
    description: "Kickstart new employee journeys with personalized welcome boxes.",
    image: onboardingImg,
    cta: "Explore Kits",
  },
  {
    id: 2,
    title: "Festive Celebration Hampers",
    description: "Spread joy during Diwali, Christmas, and more with curated hampers.",
    image: festiveImg,
    cta: "Shop Hampers",
  },
  {
    id: 3,
    title: "Client Thank You Gifts",
    description: "Strengthen partnerships with premium corporate presents.",
    image: clientImg,
    cta: "Send a Gift",
  },
  {
    id: 4,
    title: "Event & Expo Giveaways",
    description: "Impress at events with branded merchandise and useful swag.",
    image: conferenceImg,
    cta: "Browse Giveaways",
  },
];

const ShopByOccasion = () => (
  <section className="occasion-wrapper">
    <h2 className="occasion-heading">Corporate Gifting by Category</h2>
    <p className="occasion-sub">
      Discover curated gifting solutions tailored for every business occasion.
    </p>

    <div className="occasion-grid">
      {occasions.map(({ id, title, description, image, cta }) => (
        <div key={id} className="occasion-card">
          <div className="image-box">
            <img src={image} alt={title} className="occasion-img" />
          </div>
          <h3>{title}</h3>
          <p>{description}</p>
          <button className="occasion-btn">{cta} →</button>
        </div>
      ))}
    </div>
  </section>
);

export default ShopByOccasion;
