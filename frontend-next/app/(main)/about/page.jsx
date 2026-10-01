import styles from "@/styles/AboutUs.module.css";

const BASE = "https://printkee.com";

export const metadata = {
  title: { absolute: "About Printkee | Corporate Gifting Solutions" },
  description:
    "Learn about Printkee, your partner for corporate gifting and branded merchandise. Explore our approach to custom products, employee gifts and business campaigns.",
  alternates: { canonical: `${BASE}/about` },
  openGraph: {
    title: "About Printkee | Corporate Gifting Solutions",
    description:
      "Printkee offers corporate gifting and custom branding solutions across India.",
    url: `${BASE}/about`,
    type: "website",
    images: [{ url: `${BASE}/assets/1.webp`, alt: "About Printkee" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Printkee | Corporate Gifting Solutions",
    description:
      "Trusted partner for premium corporate gifting across India — custom branding, eco-friendly options, bulk orders.",
    images: [`${BASE}/assets/1.webp`],
  },
};

export default function AboutUs() {
  return (
    <div className={styles.aboutusContainer}>

      {/* ── HERO ── */}
      <section className={styles.aboutusHero}>
        <div className={styles.aboutusText}>
          <h1>About Printkee</h1>
          <p>
            Printkee is your trusted destination for custom corporate gifting and
            promotional merchandise, designed to help brands stand out and leave a
            lasting impression. We specialize in high-quality, customized products that
            align perfectly with your brand identity and business goals.
            With a strong focus on creativity, quality, and reliability, Printkee works with
            corporates, startups, educational institutions, and event organizers to
            deliver end-to-end branding solutions. From product selection and
            customization to packaging and delivery planning, the scope is discussed
            for each requirement.
            Our extensive product range includes custom apparel, bags, drinkware,
            eco-friendly products, office and writing essentials, technology accessories,
            trophies, and curated welcome kits. Whether it&apos;s employee onboarding,
            corporate events, client gifting, promotional campaigns, or brand
            activations, Printkee provides solutions that make an impact.
            At Printkee, we believe corporate gifting is more than just a product—it&apos;s a
            powerful branding tool. Our commitment to premium quality, attention to
            detail, and customer satisfaction has made us a preferred partner for
            businesses across India.
            Let Printkee help you transform your brand ideas into memorable,
            customized experiences.
          </p>
        </div>
        <img
          src="/assets/1.webp"
          height="300"
          width="500"
          alt="Corporate gifting by Printkee"
          className={styles.aboutusHeroImage}
        />
      </section>

      {/* ── OUR MISSION ── */}
      <section className={styles.aboutusSection}>
        <h2>Our Mission</h2>
        <div className={styles.aboutusFlex}>
          <p>
            Our mission is to simplify corporate gifting with innovative, customizable solutions that elevate your brand. Whether you&apos;re welcoming new employees, rewarding performers, or building client relationships, every gift we create is designed to make an impact.
          </p>
          <img src="/assets/3.webp" height="300" width="500" alt="Printkee mission illustration" />
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className={styles.aboutusSection}>
        <h2>Why Choose Us?</h2>
        <div className={styles.aboutusFlex}>
          <ul>
            <li><strong>Customization:</strong> Tailor products with logos, messages, and premium packaging.</li>
            <li><strong>Product information:</strong> Review supplied materials, dimensions and specifications before approval.</li>
            <li><strong>Use cases:</strong> Explore options for employees, clients, events and promotions.</li>
            <li><strong>Material-led options:</strong> Confirm the material details for the exact product before ordering.</li>
            <li><strong>End-to-End Service:</strong> From concept to delivery—we manage everything.</li>
          </ul>
          <img src="/assets/5.webp" height="300" width="500" alt="Reasons to choose Printkee" />
        </div>
      </section>

      {/* ── TRUSTED BY BRANDS ── */}
      <section className={styles.aboutusSection}>
        <h2>Plan Around the Requirement</h2>
        <div className={styles.aboutusFlex}>
          <p>
            A useful brief identifies the recipient, occasion, quantity, budget context, branding files and required-in-hand date. These details help the team discuss relevant products without relying on generic promises.
          </p>
          <img src="/assets/8.webp" height="300" width="500" alt="Corporate gifting planning" />
        </div>
      </section>

      {/* ── CTA ── */}
      <section className={styles.aboutusContactCta}>
        <h3>Looking to Create an Unforgettable Gifting Experience?</h3>
        <p>
          Get in touch today! Whether you&apos;re planning a large corporate campaign or a one-time luxury gift box, Printkee is ready to help.
        </p>
        <a href="/contact" className={styles.aboutusBtn} aria-label="Contact Printkee">
          Contact Us
        </a>
      </section>

    </div>
  );
}
