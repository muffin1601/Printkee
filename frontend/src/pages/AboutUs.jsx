import React from 'react';
import { Helmet } from 'react-helmet';
import '../styles/AboutUs.css';

const AboutUs = () => {
  return (
    <div className="aboutus-container">
      <Helmet>
        <title>About MF Global Services | Corporate Gifting Solutions</title>
        <meta
          name="description"
          content="Learn about MF Global Services – your trusted partner for premium corporate gifting solutions. Discover our mission, values, and why top brands choose us for personalized gifts."
        />
      </Helmet>

      <section className="aboutus-hero">
        <div className="aboutus-text">
          <h1>About MF Global Services</h1>
          <p>
            At MF Global Services, we specialize in premium corporate gifting solutions tailored to enhance your brand identity. With years of expertise, we bring creativity, quality, and reliability to every gift—whether it's for employees, clients, or events.
          </p>
        </div>
        <img
          src="/assets/1.png"
          height="300"
          width="500"
          alt="Corporate Gifting by MF Global Services"
          className="aboutus-hero-image"
        />
      </section>

      <section className="aboutus-section">
        <h2>Who We Are</h2>
        <div className="aboutus-flex">
          <p>
            MF Global Services is a trusted name in the corporate gifting industry. We offer a diverse product range—from eco-friendly items and branded apparel to premium office accessories and welcome kits. Our commitment is to deliver value-driven, thoughtful gifts that reflect your organization’s ethos.
          </p>
          <img src="/assets/2.webp" height="300" width="500" alt="Team behind MF Global" />
        </div>
      </section>

      <section className="aboutus-section">
        <h2>Our Mission</h2>
        <div className="aboutus-flex">
          <p>
            Our mission is to simplify corporate gifting with innovative, customizable solutions that elevate your brand. Whether you're welcoming new employees, rewarding top performers, or building client relationships, we make sure every gift makes an impact.
          </p>
          <img src="/assets/3.webp" height="300" width="500" alt="MF Global Mission Statement" />
        </div>
      </section>

      <section className="aboutus-section">
        <h2>Why Choose Us?</h2>
        <div className="aboutus-flex">
          <ul>
            <li><strong>Customization:</strong> Every product can be tailored with logos, messages, and packaging.</li>
            <li><strong>Quality:</strong> We source premium materials and ensure top-notch production standards.</li>
            <li><strong>Experience:</strong> Years of industry experience with top brands and institutions.</li>
            <li><strong>Eco-Friendly Options:</strong> Promote sustainability with our curated green gifting catalog.</li>
            <li><strong>End-to-End Service:</strong> From design to delivery, we handle everything for you.</li>
          </ul>
          <img src="/assets/5.jpeg" height="300" width="500" alt="Why Choose MF Global Services" />
        </div>
      </section>

      <section className="aboutus-section">
        <h2>Trusted by Leading Brands</h2>
        <div className="aboutus-flex">
          <p>
            We have proudly partnered with over 500+ corporate clients across industries like technology, finance, healthcare, and education. Our strong reputation is built on trust, transparency, and timely execution.
          </p>
          <img src="/assets/8.webp" height="300" width="500" alt="Our Corporate Clients" />
        </div>
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
