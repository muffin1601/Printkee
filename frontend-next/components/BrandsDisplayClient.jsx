"use client";
import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import styles from "../styles/BrandsDisplay.module.css";
import brandProducts from "../data/brandProducts";

const BrandsDisplayClient = ({ brand, brandInfo }) => {
  const products = brandProducts[brand] || [];
  const [isLeadFormOpen, setIsLeadFormOpen] = useState(false);
  const [leadData, setLeadData] = useState({ name: "", company: "", email: "", phone: "" });

  const firstProducts     = products.slice(0, 5);
  const remainingProducts = products.slice(5);

  if (!brandInfo) return <p className={styles["not-found"]}>Brand not found.</p>;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeadData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLeadSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch("/api/crm-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leadData),
      });
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/send-email`, leadData);
      alert("Thank you! Catalogue will be downloaded shortly");

      const link = document.createElement("a");
      link.href = "/catalogue.pdf";
      link.download = `${brandInfo.name}_Catalogue.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setLeadData({ name: "", company: "", email: "", phone: "" });
      setIsLeadFormOpen(false);
    } catch (error) {
      console.error("Lead form submission error:", error);
      alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className={styles["brand-display-page"]}>
      <div className={styles["brand-top-section"]}>
        <div className={styles["brand-top-content"]}>
          <Link href="/brands" className={styles["brand-back-link"]} aria-label="Go back to all brands">
            <div className={styles["brand-back-circle"]}>
              <span className={styles["brand-back-arrow"]}>&larr;</span>
            </div>
            <span>Back to Brands</span>
          </Link>
          <h1 className={styles["brand-heading"]}>{brandInfo.name}</h1>
          <p className={styles["brand-subtext"]}>{brandInfo.description}</p>
          <button
            className={styles["brand-download-btn"]}
            aria-label="Download brand catalogue"
            onClick={() => setIsLeadFormOpen(true)}
          >
            Download Catalogue →
          </button>
        </div>
        <div className={styles["brand-logo-wrapper"]}>
          <img
            src={brandInfo.logo}
            alt={`${brandInfo.name} brand logo`}
            className={styles["brand-logo-7"]}
          />
        </div>
      </div>

      {products.length === 0 ? (
        <p className={styles["not-found"]}>No products found for this brand.</p>
      ) : (
        <>
          <div className={styles["brand-products-grid"]}>
            {firstProducts.map((product, index) => (
              <Link href="#" key={index} className={styles["brand-product-card"]} aria-label={`View product: ${product.name}`}>
                <img src={product.image} alt={`${product.name} product image`} className={styles["brand-product-image"]} />
                <div className={styles["brand-product-name"]}>{product.name}</div>
              </Link>
            ))}
          </div>

          {remainingProducts.length > 0 && (
            <div className={styles["brand-products-grid"]}>
              {remainingProducts.map((product, index) => (
                <Link href="#" key={index} className={styles["brand-product-card"]} aria-label={`View product: ${product.name}`}>
                  <img src={product.image} alt={`${product.name} product image`} className={styles["brand-product-image"]} />
                  <div className={styles["brand-product-name"]}>{product.name}</div>
                </Link>
              ))}
            </div>
          )}
        </>
      )}

      {isLeadFormOpen && (
        <div className={styles["lead-overlay-2"]} role="dialog" aria-modal="true">
          <div className={styles["lead-modal-2"]}>
            <h3>Get the {brandInfo.name} Catalogue</h3>
            <form onSubmit={handleLeadSubmit} className={styles["lead-form-2"]}>
              <label htmlFor="lead-name">Your Name</label>
              <input id="lead-name" type="text" name="name" value={leadData.name} onChange={handleChange} placeholder="Your Name" required />
              <label htmlFor="lead-company">Company Name</label>
              <input id="lead-company" type="text" name="company" value={leadData.company} onChange={handleChange} placeholder="Company Name" />
              <label htmlFor="lead-email">Email Address</label>
              <input id="lead-email" type="email" name="email" value={leadData.email} onChange={handleChange} placeholder="Email Address" required />
              <label htmlFor="lead-phone">Phone Number</label>
              <input id="lead-phone" type="tel" name="phone" value={leadData.phone} onChange={handleChange} placeholder="Phone Number" required />
              <div className={styles["lead-actions-2"]}>
                <button type="submit" className={styles["lead-submit-2"]}>Submit & Download</button>
                <button type="button" className={styles["lead-cancel-2"]} onClick={() => setIsLeadFormOpen(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BrandsDisplayClient;
