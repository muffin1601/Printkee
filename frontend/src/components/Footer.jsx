import React from "react";
import "../styles/Footer.css";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer-wrapper">
      <div className="footer-column">
        <h4>Company</h4>
        <ul>
          <li><a href="/about">About Us</a></li>
          <li><a href="/careers">Careers</a></li>
          <li><a href="/blogs">Blogs</a></li>
        </ul>
      </div>
      <div className="footer-column">
        <h4>Support</h4>
        <ul>
          <li><a href="/help">Help Center</a></li>
          <li><a href="/contact">Contact Us</a></li>
          <li><a href="/returns">Returns & Refunds</a></li>
        </ul>
      </div>
      <div className="footer-column">
        <h4>Legal</h4>
        <ul>
          <li><a href="/privacy">Privacy Policy</a></li>
          <li><a href="/terms">Terms of Service</a></li>
        </ul>
      </div>
      <div className="footer-column">
        <h4>Follow Us</h4>
        <div className="footer-socials">
          <a href="#"><FaFacebookF /></a>
          <a href="#"><FaInstagram /></a>
          <a href="#"><FaTwitter /></a>
          <a href="#"><FaLinkedinIn /></a>
        </div>
      </div>

      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} Printkee. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
