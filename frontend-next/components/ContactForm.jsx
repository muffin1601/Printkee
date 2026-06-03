"use client";
import React, { useState } from "react";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import styles from "../styles/ContactUs.module.css";
import axios from "axios";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    requirement: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch("/api/crm-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/send-email`, formData);
      alert("Thank you! Your message has been sent.");
      setFormData({ name: "", company: "", email: "", phone: "", requirement: "" });
    } catch (error) {
      console.error("Contact form submission error:", error);
      alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className={styles["contact-page"]}>

      {/* ── HERO BAND ── */}
      <div className={styles["contact-hero"]}>
        <p className={styles["contact-eyebrow"]}>Get In Touch</p>
        <h1>Let&apos;s Talk Business</h1>
        <p>Have questions or want to discuss a custom gifting solution? We&apos;d love to hear from you.</p>
      </div>

      {/* ── CONTENT GRID ── */}
      <div className={styles["contact-content"]}>

        {/* ── LEFT: Contact details ── */}
        <section className={styles["contact-details"]} aria-label="Contact information">
          <h2>Contact Information</h2>

          <div className={styles["contact-info-list"]}>
            <a href="tel:+918800904543" className={styles["contact-info-item"]}>
              <div className={styles["contact-info-icon"]}><Phone size={16} /></div>
              <div>
                <p className={styles["contact-info-label"]}>Phone</p>
                <p className={styles["contact-info-value"]}>+91 88009 04543</p>
              </div>
            </a>

            <a href="mailto:sales@printkee.com" className={styles["contact-info-item"]}>
              <div className={styles["contact-info-icon"]}><Mail size={16} /></div>
              <div>
                <p className={styles["contact-info-label"]}>Email</p>
                <p className={styles["contact-info-value"]}>sales@printkee.com</p>
              </div>
            </a>

            <div className={styles["contact-info-item"]}>
              <div className={styles["contact-info-icon"]}><MapPin size={16} /></div>
              <div>
                <p className={styles["contact-info-label"]}>Address</p>
                <p className={styles["contact-info-value"]}>
                  F90/1, Beside ESIC Hospital,<br />
                  Okhla Industrial Area Phase 1,<br />
                  New Delhi – 110020, India
                </p>
              </div>
            </div>

            <div className={styles["contact-info-item"]}>
              <div className={styles["contact-info-icon"]}><Clock size={16} /></div>
              <div>
                <p className={styles["contact-info-label"]}>Working Hours</p>
                <p className={styles["contact-info-value"]}>Mon – Sat &nbsp;9:00 AM – 6:00 PM</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── RIGHT: Form ── */}
        <section className={styles["contact-form"]}>
          <h2>Send Us a Message</h2>
          <form onSubmit={handleSubmit} aria-label="Contact form">
            <div className={styles["contact-form-row"]}>
              <div>
                <label htmlFor="contact-name">Your Name</label>
                <input id="contact-name" type="text" name="name" required value={formData.name} onChange={handleChange} placeholder="Your Name" />
              </div>
              <div>
                <label htmlFor="contact-company">Company Name</label>
                <input id="contact-company" type="text" name="company" required value={formData.company} onChange={handleChange} placeholder="Company Name" />
              </div>
            </div>

            <div className={styles["contact-form-row"]}>
              <div>
                <label htmlFor="contact-email">Email Address</label>
                <input id="contact-email" type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="your@email.com" />
              </div>
              <div>
                <label htmlFor="contact-phone">Phone Number</label>
                <input id="contact-phone" type="tel" name="phone" required value={formData.phone} onChange={handleChange} placeholder="+91 XXXXX XXXXX" />
              </div>
            </div>

            <div>
              <label htmlFor="contact-requirement">Your Requirement</label>
              <textarea id="contact-requirement" name="requirement" rows="5" required value={formData.requirement} onChange={handleChange} placeholder="Tell us about your gifting requirement…" />
            </div>

            <button type="submit" aria-label="Send message">
              Send Message →
            </button>
          </form>
        </section>

      </div>
    </div>
  );
};

export default ContactForm;
