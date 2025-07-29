import React from "react";
import "../styles/OurServices.css";
import {
  FaGift,
  FaRecycle,
  FaRegLightbulb,
  FaUserTie,
  FaLaptop,
  FaRegClock,
} from "react-icons/fa";

const services = [
  {
    icon: <FaGift />,
    title: "Corporate Gifting Solutions",
    description: "Premium gifting ideas tailored for employees, clients, and events to enhance your brand image.",
  },
  {
    icon: <FaRecycle />,
    title: "Eco-Friendly Options",
    description: "Choose from sustainable items like bamboo bottles, reusable bags, and recycled notebooks to support green initiatives.",
  },
  {
    icon: <FaUserTie />,
    title: "Apparel & Uniform Customization",
    description: "Branded t-shirts, caps, and corporate wear with your company’s logo for promotions or internal branding.",
  },
  {
    icon: <FaLaptop />,
    title: "Tech Accessories & Gadgets",
    description: "Modern and useful promotional tech items including power banks, speakers, and wireless chargers.",
  },
  {
    icon: <FaRegClock />,
    title: "Executive & Desktop Gifts",
    description: "Elegant desktop items like clocks, pen stands, and diaries that reflect your company’s professionalism.",
  },
  {
    icon: <FaRegLightbulb />,
    title: "Fully Customizable Kits",
    description: "Welcome kits and curated collections designed to suit onboarding, festive occasions, or marketing campaigns.",
  },
];

const OurServices = () => {
  return (
    <section className="our-services">
      <h2 className="section-title">Our Services</h2>
      <p className="section-description">
        Explore our diverse range of corporate gifting solutions designed to enhance your brand and delight your clients.</p>
      <div className="services-grid">
        {services.map((service, index) => (
          <div className="service-card" key={index}>
            <div className="service-icon">{service.icon}</div>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurServices;
