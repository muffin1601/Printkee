import React from "react";
import Link from "next/link";
import "../styles/Testimonials.css";

/* ── DATA (unchanged) ─────────────────────────────────────── */
const testimonials = [
  {
    name: "Ananya Sharma",
    position: "HR Manager",
    company: "TechNova Pvt Ltd",
    review:
      "Printkee made our festive gifting process effortless and stylish. Great support and timely delivery!",
  },
  {
    name: "Rajeev Bansal",
    position: "Procurement Head",
    company: "FinEdge Solutions",
    review:
      "The onboarding kits were beautifully packed and reflected our brand perfectly. Highly recommended!",
  },
  {
    name: "Sonal Mehta",
    position: "Marketing Lead",
    company: "GreenHive",
    review:
      "Our conference giveaways were a hit! Sleek tech gifts, fast execution, and custom branding was top-notch.",
  },
];

const brandLogos = [
  { src: "/assets/accenture.webp", alt: "Accenture" },
  { src: "/assets/amazon.webp",    alt: "Amazon" },
  { src: "/assets/google.webp",    alt: "Google" },
  { src: "/assets/microsoft.webp", alt: "Microsoft" },
  { src: "/assets/nike.webp",      alt: "Nike" },
  { src: "/assets/zomato.webp",    alt: "Zomato" },
];

const Testimonials = () => (
  <section className="testimonials-section" aria-labelledby="testimonials-heading">
    <h2 id="testimonials-heading" className="testimonials-heading">
      What Our Clients Say
    </h2>

    {/* Three-column layout: quotes | brands | CTA */}
    <div className="testimonials-layout">

      {/* Left: testimonial cards */}
      <div className="testimonials-grid">
        {testimonials.map((item, index) => (
          <figure key={index} className="testimonial-card" aria-label={`Testimonial from ${item.name}`}>
            <div className="quote-icon" aria-hidden="true">&ldquo;</div>
            <div className="star-rating" aria-label="5 stars">★★★★★</div>
            <blockquote className="testimonial-text">"{item.review}"</blockquote>
            <figcaption className="testimonial-client">
              <div className="client-avatar" aria-hidden="true">
                {item.name.charAt(0)}
              </div>
              <div>
                <p className="client-name">{item.name}</p>
                <p className="client-role">{item.position}, {item.company}</p>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>

      {/* Center: trusted brands */}
      <div className="testimonials-brands">
        <h3 className="testimonials-brands-title">
          Trusted by 1000+ brands across India
        </h3>
        <div className="brand-logos-strip">
          {brandLogos.map((brand, index) => (
            <div key={index} className="brand-logo-item">
              <img src={brand.src} alt={`${brand.alt} logo`} loading="lazy" />
            </div>
          ))}
        </div>
      </div>

      {/* Right: CTA card */}
      <div className="testimonials-cta-card">
        <div>
          <h3>Need something custom?</h3>
          <p>We create tailored solutions to match your brand needs.</p>
        </div>
        <Link href="/contact" className="testimonials-cta-btn">
          Get a Custom Quote →
        </Link>
      </div>

    </div>
  </section>
);

export default Testimonials;
