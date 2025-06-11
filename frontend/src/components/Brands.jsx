import React from "react";
import "../styles/Brands.css";

const brandLogos = [
  "/assets/nike.png",
  "/assets/microsoft.png",
  "/assets/google.png",
  "/assets/accenture.png",
  "/assets/amazon.png",
];

const Brands = () => {
  return (
    <section className="brands-section">
      <h2 className="brands-title">Trusted by Leading Brands</h2>
      <p className="brands-subtitle">We’ve partnered with top corporations for impactful corporate gifting.</p>
      <div className="brands-logos">
        {brandLogos.map((logo, idx) => (
          <div className="brand-logo-wrapper" key={idx}>
            <img src={logo} alt={`Brand ${idx}`} className="brand-logo" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Brands;
