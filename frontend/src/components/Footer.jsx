import React from "react";
import "../styles/Footer.css";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import logo from "/assets/printkeeLogo.png";

const Footer = () => {
  return (
    <footer className="footer-wrapper light-footer">
      <div className="footer-grid">
        {/* Column 1: Branding & About */}
        <div className="footer-branding">
          <img src={logo} alt="MF Global Services Logo" className="footer-logo-img" />
          <p className="footer-description">
            MF Global Services is your trusted partner in corporate gifting. <br />
            We offer end-to-end personalized gifting solutions <br />
            to help brands connect meaningfully. <br />
            From premium packaging to on-time delivery, <br />
            we make gifting seamless and impactful.
          </p>
          <a
            href="/about"
            className="footer-about-btn"
            aria-label="Learn more about Printkee"
            name="about-link"
          >
            Read More <span className="sr-only"> about Printkee</span>
          </a>
        </div>

        {/* Column 2: Important Links */}
        <div className="footer-column">
          <h4>Important Links</h4>
          <ul>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/brands">Brands</a></li>
            <li><a href="/blogs">Blog</a></li>
            <li><a href="#">Services</a></li>
            <li><a href="/sitemap">Sitemap</a></li>
          </ul>
        </div>

        {/* Column 3: Our Products */}
        <div className="footer-column">
          <h4>Our Products</h4>
          <ul>
            <li><a href="#">Custom Gifting</a></li>
            <li><a href="#">Bulk Orders</a></li>
            <li><a href="#">Branding Solutions</a></li>
            <li><a href="#">Employee Gifts</a></li>
            <li><a href="#">Festival Gifts</a></li>
          </ul>
        </div>

        {/* Column 4: Socials */}
        <div className="footer-column">
          <h4>Follow Us</h4>
          <div className="footer-socials">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaLinkedinIn /></a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} MF Global Services. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
