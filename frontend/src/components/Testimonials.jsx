import React from "react";
import "../styles/Testimonials.css";
import { FaQuoteLeft } from "react-icons/fa";

const testimonials = [
  {
    name: "Ananya Sharma",
    position: "HR Manager",
    company: "TechNova Pvt Ltd",
    review:
      "Printkee made our festive gifting process effortless and stylish. Great support and timely delivery!",
    logo: "/logos/technova.png",
  },
  {
    name: "Rajeev Bansal",
    position: "Procurement Head",
    company: "FinEdge Solutions",
    review:
      "The onboarding kits were beautifully packed and reflected our brand perfectly. Highly recommended!",
    logo: "/logos/finedge.png",
  },
  {
    name: "Sonal Mehta",
    position: "Marketing Lead",
    company: "GreenHive",
    review:
      "Our conference giveaways were a hit! Sleek tech gifts, fast execution, and custom branding was top-notch.",
    logo: "/logos/greenhive.png",
  },
];

const brandLogos = [
  "/assets/accenture.png",
  "/assets/amazon.png",
  "/assets/google.png",
  "/assets/microsoft.png",
  "/assets/nike.png",
];

const Testimonials = () => {
  return (
    <section className="testimonials-section">
      <h2 className="section-title-2">What Our Clients Say</h2>
      <p className="section-subtitle-2">
        Hear from our happy clients about their experience with Printkee.
      </p>
      <div className="testimonials-container">
        {testimonials.map((item, index) => (
          <div className="testimonial-card" key={index}>
            <FaQuoteLeft className="quote-icon" />
            <p className="testimonial-text">"{item.review}"</p>
            <div className="testimonial-footer">
              
                <h4 className="client-name">{item.name}</h4>
                <p className="client-role">
                  {item.position}, {item.company}
                </p>
              
            </div>
          </div>
        ))}
      </div>

      <div className="brand-logos-strip-2">
        <h3 className="brand-title-2">Trusted by Leading Brands</h3>
        <div className="brands-logo-container-2">
          {brandLogos.map((logo, index) => (
            <img
              key={index}
              src={logo}
              alt={`Brand ${index + 1}`}
              className="brand-logo-2"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
