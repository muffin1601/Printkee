import React from 'react';
import '../styles/AboutUs.css';

const AboutUs = () => {
  return (
    <div className="aboutus-container">
      <section className="aboutus-hero">
        <div className="aboutus-text">
          <h1>About MF Global Services</h1>
          <p>
            At MF Global Services, we specialize in premium corporate gifting solutions tailored to enhance your brand identity. With years of expertise, we bring creativity, quality, and reliability to every gift—whether it's for employees, clients, or events.
          </p>
        </div>
        <img src="/assets/about-hero.jpg" alt="Corporate Gifting by MF Global Services" className="aboutus-hero-image" />
      </section>

      <section className="aboutus-section">
        <h2>Who We Are</h2>
        <p>
          MF Global Services is a trusted name in the corporate gifting industry. We offer a diverse product range—from eco-friendly items and branded apparel to premium office accessories and welcome kits. Our commitment is to deliver value-driven, thoughtful gifts that reflect your organization’s ethos.
        </p>
        <img src="/assets/about-who.jpg" alt="Team behind MF Global" />
      </section>

      <section className="aboutus-section">
        <h2>Our Mission</h2>
        <p>
          Our mission is to simplify corporate gifting with innovative, customizable solutions that elevate your brand. Whether you're welcoming new employees, rewarding top performers, or building client relationships, we make sure every gift makes an impact.
        </p>
        <img src="/assets/about-mission.jpg" alt="MF Global Mission Statement" />
      </section>

      <section className="aboutus-section">
        <h2>Why Choose Us?</h2>
        <ul>
          <li><strong>Customization:</strong> Every product can be tailored with logos, messages, and packaging.</li>
          <li><strong>Quality:</strong> We source premium materials and ensure top-notch production standards.</li>
          <li><strong>Experience:</strong> Years of industry experience with top brands and institutions.</li>
          <li><strong>Eco-Friendly Options:</strong> Promote sustainability with our curated green gifting catalog.</li>
          <li><strong>End-to-End Service:</strong> From design to delivery, we handle everything for you.</li>
        </ul>
        <img src="/assets/about-why.jpg" alt="Why Choose MF Global Services" />
      </section>

      <section className="aboutus-section">
        <h2>Trusted by Leading Brands</h2>
        <p>
          We have proudly partnered with over 500+ corporate clients across industries like technology, finance, healthcare, and education. Our strong reputation is built on trust, transparency, and timely execution.
        </p>
        <img src="/assets/about-clients.jpg" alt="Our Corporate Clients" />
      </section>

      <section className="aboutus-contact-cta">
        <h3>Looking to Create an Unforgettable Gifting Experience?</h3>
        <p>
          Reach out to us today to discuss your requirements. Whether you're planning a large corporate campaign or a one-time gift box, MF Global Services is your ideal gifting partner.
        </p>
        <a href="/contact" className="aboutus-btn">Contact Us</a>
      </section>
    </div>
  );
};

export default AboutUs;
