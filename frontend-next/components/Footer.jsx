import React from "react";
import Link from "next/link";
import "../styles/Footer.css";
/* Social icons — using compact SVG since lucide doesn't include brand icons */

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
          <a href="https://www.facebook.com/share/1DF9K4wAHX/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
          </a>
          <a href="https://www.instagram.com/printkee" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
          </a>
          <a href="#" aria-label="Twitter / X">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          </a>
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
