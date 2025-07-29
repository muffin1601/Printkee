import React from "react";
import "../styles/WhyChooseUs.css";
import { Truck, Leaf, BadgeCheck, Users, Percent } from "lucide-react";

const WhyChooseUs = () => {
  const features = [
    {
      icon: <Users size={32} />,
      title: "1000+ Happy Clients",
      subtitle: "Trusted by Businesses",
      content: "We have served over a thousand satisfied clients across various industries."
    },
    {
      icon: <Truck size={32} />,
      title: "Pan-India Shipping",
      subtitle: "Nationwide Delivery",
      content: "Get your products delivered anywhere in India with our reliable shipping partners."
    },
    {
      icon: <BadgeCheck size={32} />,
      title: "Custom Branding",
      subtitle: "Personalized Solutions",
      content: "Enhance your brand identity with fully customizable products and packaging."
    },
    {
      icon: <Percent size={32} />,
      title: "Bulk Order Discounts",
      subtitle: "Save More on Volume",
      content: "Enjoy special pricing and discounts on large quantity orders."
    },
    {
      icon: <Leaf size={32} />,
      title: "Sustainable Options",
      subtitle: "Eco-Friendly Choices",
      content: "Choose from a range of sustainable materials and products for a greener future."
    },
  ];

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
      <button className="whychoose-cta">
        Start Customizing<span className="arrow-1">→</span>
      </button>
    </section>
  );
};

export default WhyChooseUs;
