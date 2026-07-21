"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  X, User, Building2, Mail, Phone,
  FileText, Send, CheckCircle2, Truck, BadgePercent,
} from "lucide-react";
import styles from "../styles/EnquiryModal.module.css";
import { submitLead } from "../utils/submitLead";

const perks = [
  { icon: <CheckCircle2 size={14} />, text: "Premium quality guaranteed" },
  { icon: <Truck size={14} />,        text: "Pan-India delivery" },
  { icon: <BadgePercent size={14} />, text: "Bulk order discounts" },
];

const EnquiryModal = ({ isOpen, onClose, image, description }) => {
  const [formData, setFormData] = useState({
    name: "", company: "", email: "", phone: "", requirement: "",
  });
  const [loading, setLoading] = useState(false);
  const modalRef = useRef(null);

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { emailOk } = await submitLead(formData);
    if (emailOk) {
      alert("Thank you! Your inquiry has been submitted.");
      setFormData({ name: "", company: "", email: "", phone: "", requirement: "" });
      onClose();
    } else {
      alert("Something went wrong. Please try again later.");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className={styles["enquiry-modal-overlay"]}
      onClick={onClose}
      role="presentation"
    >
      <div
        className={styles["enquiry-modal"]}
        role="dialog"
        aria-modal="true"
        aria-labelledby="enquiry-title"
        onClick={(e) => e.stopPropagation()}
        ref={modalRef}
      >
        {/* Close */}
        <button className={styles["close-btn-enquiry"]} onClick={onClose} aria-label="Close">
          <X size={16} />
        </button>

        <div className={styles["modal-container"]}>

          {/* ── LEFT — dark purple brand panel ── */}
          <div className={styles["left-content"]}>
            <p className={styles["left-eyebrow"]}>Get In Touch</p>
            <h3 className={styles["left-title"]}>Let&apos;s Create Something Great</h3>
            <p id="enquiry-description" className={styles["left-description"]}>
              {description ||
                "Tell us your requirement and we'll get back within 24 hours with a personalised quote."}
            </p>

            {/* Perks */}
            <ul className={styles["left-perks"]}>
              {perks.map(({ icon, text }) => (
                <li key={text} className={styles["left-perk"]}>
                  <span className={styles["perk-icon"]}>{icon}</span>
                  <span>{text}</span>
                </li>
              ))}
            </ul>

            {/* Product image */}
            {image && (
              <img
                src={image}
                alt="Product enquiry"
                className={styles["enquiry-image"]}
              />
            )}
          </div>

          {/* ── RIGHT — form ── */}
          <div className={styles["right-form"]}>
            <h2 id="enquiry-title" className={styles["enquiry-title"]}>
              Request a Quote
            </h2>
            <p className={styles["enquiry-subtitle"]}>
              Fill in the details and we&apos;ll send you a custom pricing plan.
            </p>

            <form onSubmit={handleSubmit} className={styles["enquiry-form"]}>

              {/* Name */}
              <div className={styles["input-wrap"]}>
                <User size={14} className={styles["input-icon"]} aria-hidden="true" />
                <label htmlFor="enq-name" className={styles["sr-label"]}>Your Name</label>
                <input id="enq-name" className={styles["form-input"]} type="text"
                  name="name" placeholder="Your Name" required
                  onChange={handleChange} value={formData.name} />
              </div>

              {/* Company */}
              <div className={styles["input-wrap"]}>
                <Building2 size={14} className={styles["input-icon"]} aria-hidden="true" />
                <label htmlFor="enq-company" className={styles["sr-label"]}>Company</label>
                <input id="enq-company" className={styles["form-input"]} type="text"
                  name="company" placeholder="Company Name" required
                  onChange={handleChange} value={formData.company} />
              </div>

              {/* Email + Phone row */}
              <div className={styles["form-row"]}>
                <div className={styles["input-wrap"]}>
                  <Mail size={14} className={styles["input-icon"]} aria-hidden="true" />
                  <label htmlFor="enq-email" className={styles["sr-label"]}>Email</label>
                  <input id="enq-email" className={styles["form-input"]} type="email"
                    name="email" placeholder="Email Address" required
                    onChange={handleChange} value={formData.email} />
                </div>
                <div className={styles["input-wrap"]}>
                  <Phone size={14} className={styles["input-icon"]} aria-hidden="true" />
                  <label htmlFor="enq-phone" className={styles["sr-label"]}>Phone</label>
                  <input id="enq-phone" className={styles["form-input"]} type="tel"
                    name="phone" placeholder="Phone Number" required
                    onChange={handleChange} value={formData.phone} />
                </div>
              </div>

              {/* Requirement */}
              <div className={styles["input-wrap"]} style={{ alignItems: "flex-start" }}>
                <FileText size={14} className={styles["input-icon"]} style={{ marginTop: "0.7rem" }} aria-hidden="true" />
                <label htmlFor="enq-requirement" className={styles["sr-label"]}>Requirement</label>
                <textarea id="enq-requirement" className={styles["form-textarea"]}
                  name="requirement" placeholder="Describe your requirement…"
                  rows="4" onChange={handleChange} value={formData.requirement} />
              </div>

              <button type="submit" className={styles["submit-btn-enquiry"]}
                disabled={loading} aria-label="Submit enquiry">
                {loading ? "Sending…" : <><Send size={14} /> Get a Quote</>}
              </button>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnquiryModal;
