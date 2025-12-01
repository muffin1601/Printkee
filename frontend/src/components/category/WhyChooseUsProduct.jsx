import React from "react";
import "./WhyChooseUsProduct.css";

const WhyChooseUsProduct = ({ productName, subcategoryName }) => {
  const name = productName || subcategoryName || "Our Products";

  return (
    <section className="wcup-wrapper">
      <h2 className="wcup-title">Why Choose Us for {name}?</h2>

      <div className="wcup-grid">

        <div className="wcup-card">
          <h3 className="wcup-card-title">Premium Material Quality</h3>
          <p className="wcup-card-text">
            Every {name} undergoes multi-level quality checks to ensure superior
            durability, finishing, and professional branding output.
          </p>
        </div>

        <div className="wcup-card">
          <h3 className="wcup-card-title">Expert Custom Branding</h3>
          <p className="wcup-card-text">
            We specialize in logo printing, embroidery, engraving, UV printing,
            and custom packaging to make your {name} look premium.
          </p>
        </div>

        <div className="wcup-card">
          <h3 className="wcup-card-title">Bulk Order Capability</h3>
          <p className="wcup-card-text">
            From small batches to large corporate orders — we deliver consistent,
            high-quality production across Delhi NCR.
          </p>
        </div>

        <div className="wcup-card">
          <h3 className="wcup-card-title">Fast & Reliable Delivery</h3>
          <p className="wcup-card-text">
            We ensure quick turnarounds for urgent events, employee onboarding,
            gifting campaigns, and marketing initiatives.
          </p>
        </div>

        <div className="wcup-card">
          <h3 className="wcup-card-title">End-to-End Corporate Support</h3>
          <p className="wcup-card-text">
            From designing to sampling and dispatch, we handle everything to
            provide a seamless bulk ordering experience.
          </p>
        </div>

        <div className="wcup-card">
          <h3 className="wcup-card-title">Trusted by Top Corporates</h3>
          <p className="wcup-card-text">
            Startups, SMEs, and MNCs choose us for professional branding,
            reliability, and exceptional product quality.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsProduct;
