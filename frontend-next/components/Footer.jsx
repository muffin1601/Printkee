import React from "react";
import Link from "next/link";
import "../styles/Footer.css";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";

const Footer = () => (
  <footer className="footer-wrapper" role="contentinfo">

    <div className="footer-grid">

      {/* Col 1: Brand */}
      <div className="footer-branding">
        <img src="/assets/printkeeLogo.webp" alt="Printkee logo" className="footer-logo-img" />
        <p className="footer-description">
          India's leading corporate gifting and custom merchandise solution for businesses of all sizes.
        </p>
        <div className="footer-socials">
          <a href="https://www.facebook.com/share/1DF9K4wAHX/" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FaFacebookF /></a>
          <a href="https://www.instagram.com/printkee" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedinIn /></a>
          <a href="#" aria-label="Twitter"><FaTwitter /></a>
        </div>
      </div>

      {/* Col 2: Shop by Category */}
      <div className="footer-column">
        <h3 className="footer-heading">Shop by Category</h3>
        <ul>
          <li><Link href="/apparel-and-accessories">Apparel & Accessories</Link></li>
          <li><Link href="/bags-and-travel">Bags & Travel</Link></li>
          <li><Link href="/drink-ware">Drink Ware</Link></li>
          <li><Link href="/office-and-writing">Office & Writing</Link></li>
          <li><Link href="/technology-accessories">Technology Accessories</Link></li>
          <li><Link href="/eco-products">Eco Products</Link></li>
          <li><Link href="/trophy-and-momento">Trophies & Mementos</Link></li>
          <li><Link href="/collection">Collections</Link></li>
        </ul>
      </div>

      {/* Col 3: Company */}
      <div className="footer-column">
        <h3 className="footer-heading">Company</h3>
        <ul>
          <li><Link href="/about">About Us</Link></li>
          <li><Link href="/contact">Our Services</Link></li>
          <li><Link href="/contact">Bulk Order</Link></li>
          <li><Link href="/contact">Industries</Link></li>
          <li><Link href="/blogs">Blog</Link></li>
          <li><Link href="/contact">Contact Us</Link></li>
        </ul>
      </div>

      {/* Col 4: Customer Care */}
      <div className="footer-column">
        <h3 className="footer-heading">Customer Care</h3>
        <ul>
          <li><Link href="/contact">Track Order</Link></li>
          <li><Link href="/contact">Shipping Policy</Link></li>
          <li><Link href="/contact">Bulk Order</Link></li>
          <li><Link href="/contact">Privacy Policy</Link></li>
          <li><Link href="/contact">Terms & Conditions</Link></li>
          <li><Link href="/sitemap">Sitemap</Link></li>
          <li><Link href="/contact">FAQs</Link></li>
        </ul>
      </div>

      {/* Col 5: Newsletter */}
      <div className="footer-column">
        <h3 className="footer-heading">Newsletter</h3>
        <p className="footer-newsletter-text">
          Subscribe to get updates on new products and offers.
        </p>
        <div className="footer-newsletter-form">
          <input
            type="email"
            placeholder="Enter your email"
            className="footer-newsletter-input"
            aria-label="Email for newsletter"
          />
          <button type="button" className="footer-newsletter-btn">
            Subscribe
          </button>
        </div>
        <div className="footer-secure" style={{ marginTop: "1rem" }}>
          🔒 <span>100% Secure &amp; Safe Payments</span>
        </div>
      </div>

    </div>

    {/* Bottom bar */}
    <div className="footer-bottom">
      <span>© {new Date().getFullYear()} Printkee. All rights reserved.</span>
      <div className="footer-bottom-right">
        <Link href="/contact">Privacy Policy</Link>
        <Link href="/contact">Terms of Service</Link>
        <Link href="/sitemap">Sitemap</Link>
      </div>
    </div>

  </footer>
);

export default Footer;
