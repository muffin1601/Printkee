"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import axios from "axios";
import styles from "../styles/Footer.module.css";
import Image from "next/image";
import { BUSINESS } from "../lib/siteConfig";
import { trackContactClick } from "../utils/analytics";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [message, setMessage] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("loading");
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/newsletter/subscribe`, {
        email: email.trim(),
      });
      setStatus("success");
      setMessage(res.data?.message || "Subscribed successfully!");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setMessage(err.response?.data?.message || "Something went wrong. Please try again.");
    }
  };

  return (
  <footer className={styles["footer-wrapper"]} role="contentinfo">

    <div className={styles["footer-grid"]}>

      {/* Col 1: Brand */}
      <div className={styles["footer-branding"]}>
        <Image src="/assets/printkeeLogo.webp" alt="Printkee logo" width={180} height={78} className={styles["footer-logo-img"]} />
        <p className={styles["footer-description"]}>
          Corporate gifting and custom merchandise options for employee, client, event and promotional requirements.
        </p>
      </div>

      {/* Col 2: Shop by Category */}
      <div className={styles["footer-column"]}>
        <h3 className={styles["footer-heading"]}>Shop by Category</h3>
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
      <div className={styles["footer-column"]}>
        <h3 className={styles["footer-heading"]}>Company</h3>
        <ul>
          <li><Link href="/diwali-special">Diwali 2026</Link></li>
          <li><Link href="/about">About Us</Link></li>
          <li><Link href="/blogs">Blog</Link></li>
          <li><Link href="/brands">Brands</Link></li>
          <li><Link href="/contact">Contact Us</Link></li>
          <li><Link href="/sitemap">Sitemap</Link></li>
        </ul>
      </div>

      {/* Col 4: Contact */}
      <div className={styles["footer-column"]}>
        <h3 className={styles["footer-heading"]}>Contact Us</h3>
        <ul className={styles["footer-contact-list"]}>
          <li>
            <a href={`tel:${BUSINESS.phoneE164}`} onClick={() => trackContactClick("phone", "footer")} className={styles["footer-contact-item"]}>
              <Phone size={13} aria-hidden="true" />
              <span>{BUSINESS.phoneDisplay}</span>
            </a>
          </li>
          <li>
            <a href={`mailto:${BUSINESS.email}`} onClick={() => trackContactClick("email", "footer")} className={styles["footer-contact-item"]}>
              <Mail size={13} aria-hidden="true" />
              <span>{BUSINESS.email}</span>
            </a>
          </li>
          <li>
            <div className={styles["footer-contact-item"]}>
              <MapPin size={13} aria-hidden="true" />
              <span>F90/1, Beside ESIC Hospital, Okhla Industrial Area Phase 1, New Delhi – 110020, India</span>
            </div>
          </li>
        </ul>
      </div>

      {/* Col 5: Newsletter */}
      <div className={styles["footer-column"]}>
        <h3 className={styles["footer-heading"]}>Newsletter</h3>
        <p className={styles["footer-newsletter-text"]}>
          Subscribe to get updates on new products and offers.
        </p>
        <form className={styles["footer-newsletter-form"]} onSubmit={handleSubscribe}>
          <input
            type="email"
            placeholder="Enter your email"
            className={styles["footer-newsletter-input"]}
            aria-label="Email for newsletter"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className={styles["footer-newsletter-btn"]}
            disabled={status === "loading"}
          >
            {status === "loading" ? "Subscribing…" : "Subscribe"}
          </button>
        </form>
        {status === "success" && (
          <p className={styles["footer-newsletter-text"]} role="status">{message}</p>
        )}
        {status === "error" && (
          <p className={styles["footer-newsletter-text"]} role="alert">{message}</p>
        )}
        <div className={styles["footer-secure"]} style={{ marginTop: "1rem" }}>
          🔒 <span>100% Secure &amp; Safe Payments</span>
        </div>
      </div>

    </div>

    {/* Bottom bar */}
    <div className={styles["footer-bottom"]}>
      <span>© {new Date().getFullYear()} Printkee. All rights reserved.</span>
      <div className={styles["footer-bottom-right"]}>
        <Link href="/privacy-policy">Privacy Policy</Link>
        <Link href="/sitemap">Sitemap</Link>
      </div>
    </div>

  </footer>
  );
};

export default Footer;
