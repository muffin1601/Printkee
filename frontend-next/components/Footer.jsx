import React from "react";
import "../styles/Footer.css";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="footer-wrapper light-footer" role="contentinfo">
      <div className="footer-grid">

        {/* Column 1: Branding & About */}
        <div className="footer-branding">
          <img
            src="/assets/printkeeLogo.webp"
            alt="MF Global Services company logo"
            className="footer-logo-img"
          />

          <p className="footer-description">
            Printkee is your trusted partner in corporate gifting.
            We provide end-to-end customized gifting solutions that help brands
            create meaningful connections — with premium packaging, high-quality
            products, and timely delivery.
          </p>

          <Link
            href="/about"
            className="footer-about-btn"
            aria-label="Read more about Printkee"
          >
            Read More <span className="sr-only"> about Printkee</span>
          </Link>
        </div>

        {/* Column 2: Important Links */}
        <div className="footer-column">
          <h3 className="footer-heading">Important Links</h3>
          <ul>
            <li><Link href="/about" aria-label="About Us page">About Us</Link></li>
            <li><Link href="/contact" aria-label="Contact page">Contact</Link></li>
            <li><Link href="/brands" aria-label="Brands page">Brands</Link></li>
            <li><Link href="/blogs" aria-label="Blog page">Blog</Link></li>
            <li><Link href="/services" aria-label="Services page">Services</Link></li>
            <li><Link href="/sitemap" aria-label="Sitemap page">Sitemap</Link></li>
          </ul>
        </div>

        {/* Column 3: Our Products */}
        <div className="footer-column">
          <h3 className="footer-heading">Our Products</h3>
          <ul>
            <li><Link href="/custom-gifting" aria-label="Custom gifting products">Custom Gifting</Link></li>
            <li><Link href="/bulk-orders" aria-label="Bulk orders page">Bulk Orders</Link></li>
            <li><Link href="/branding-solutions" aria-label="Branding solutions page">Branding Solutions</Link></li>
            <li><Link href="/employee-gifts" aria-label="Employee gifts page">Employee Gifts</Link></li>
            <li><Link href="/festival-gifts" aria-label="Festival gifts page">Festival Gifts</Link></li>
          </ul>
        </div>

        {/* Column 4: Social Media */}
        <div className="footer-column">
          <h3 className="footer-heading">Follow Us</h3>

          <div className="footer-socials">
            <a
              href="https://www.facebook.com/share/1DF9K4wAHX/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit our Facebook page"
            >
              <FaFacebookF aria-hidden="true" />
            </a>

            <a
              href="https://www.instagram.com/printkee?igsh=MThmZDVhamJ1dGp6Mw=="
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit our Instagram profile"
            >
              <FaInstagram aria-hidden="true" />
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit our LinkedIn page"
            >
              <FaLinkedinIn aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} Printkee. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
