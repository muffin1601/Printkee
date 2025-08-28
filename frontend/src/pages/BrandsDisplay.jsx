import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import axios from "axios"; 
import "../styles/BrandsDisplay.css";
import brandProducts from "../data/brandProducts";
import brandsList from "../data/brandsspl";

const CTABanner = () => (
  <Link to="/diwali-special" className="cta-banner-4">
    <img
      src="/assets/diwali-brand-banner.webp"
      alt="Diwali Offer"
      className="cta-banner-image-4"
    />
  </Link>
);

const BrandsDisplay = () => {
  const { brand } = useParams();
  const products = brandProducts[brand] || [];
  const brandInfo = brandsList.find((b) => b.slug === brand);

  const [isLeadFormOpen, setIsLeadFormOpen] = useState(false);
  const [leadData, setLeadData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
  });

  const firstProducts = products.slice(0, 5);
  const remainingProducts = products.slice(5);

  if (!brandInfo) {
    return <p className="not-found">Brand not found.</p>;
  }

 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeadData((prev) => ({ ...prev, [name]: value }));
  };


  const handleLeadSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(import.meta.env.VITE_CRM_API_URL, leadData, {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": import.meta.env.VITE_CRM_API_KEY,
        },
      });

      await axios.post(`${import.meta.env.VITE_API_URL}/send-email`, leadData);

      alert("Thank you! Catalogue will be downloaded shortly");

      
      const link = document.createElement("a");
      link.href = "/catalogue.pdf";
      link.download = "Diwali_Catalogue.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      
      setLeadData({
        name: "",
        company: "",
        email: "",
        phone: "",
      });
      setIsLeadFormOpen(false);
    } catch (error) {
      console.error("Lead form submission error:", error);
      alert("Something went wrong. Please try again later.");
    }
  };

  const canonicalUrl = `${window.location.origin}/brands/${brand}`;

  return (
    <div className="brand-display-page">
      <Helmet>
        <title>{`${brandInfo.name} Products | Corporate Gifting`}</title>
        <meta name="description" content={brandInfo.description} />
        <meta name="keywords" content={brandInfo.tags.join(", ")} />
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>

     
      <div className="brand-top-section">
        <div className="brand-top-content">
          <Link to="/brands" className="brand-back-link">
            <div className="brand-back-circle">
              <span className="brand-back-arrow">&larr;</span>
            </div>
            <span>Back to Brands</span>
          </Link>

          <h1 className="brand-heading">{brandInfo.name}</h1>
          <p className="brand-subtext">{brandInfo.description}</p>

          <button
            className="brand-download-btn"
            onClick={() => setIsLeadFormOpen(true)}
          >
            Download Catalogue &#x2192;
          </button>
        </div>

        <div className="brand-logo-wrapper">
          <img
            src={brandInfo.logo}
            alt={brandInfo.name}
            className="brand-logo-7"
          />
        </div>
      </div>

      
      {products.length === 0 ? (
        <p className="not-found">No products found for this brand.</p>
      ) : (
        <>
          <div className="brand-products-grid">
            {firstProducts.map((product, index) => (
              <div
                to={`/${brand}/${product.slug}`}
                key={index}
                className="brand-product-card"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="brand-product-image"
                />
                <div className="brand-product-name">{product.name}</div>
              </div >
            ))}
          </div>

          <CTABanner />

          {remainingProducts.length > 0 && (
            <div className="brand-products-grid">
              {remainingProducts.map((product, index) => (
                <Link
                  to={`/${brand}/${product.slug}`}
                  key={index}
                  className="brand-product-card"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="brand-product-image"
                  />
                  <div className="brand-product-name">{product.name}</div>
                </Link>
              ))}
            </div>
          )}
        </>
      )}

      
      {isLeadFormOpen && (
        <div className="lead-overlay-2">
          <div className="lead-modal-2">
            <h3>Get the {brandInfo.name} Catalogue</h3>
            <form onSubmit={handleLeadSubmit} className="lead-form-2">
              <input
                type="text"
                name="name"
                value={leadData.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
              />
              <input
                type="text"
                name="company"
                value={leadData.company}
                onChange={handleChange}
                placeholder="Company Name"
              />
              <input
                type="email"
                name="email"
                value={leadData.email}
                onChange={handleChange}
                placeholder="Email Address"
                required
              />
              <input
                type="tel"
                name="phone"
                value={leadData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                required
              />
              <div className="lead-actions-2">
                <button type="submit" className="lead-submit-2">
                  Submit & Download
                </button>
                <button
                  type="button"
                  className="lead-cancel-2"
                  onClick={() => setIsLeadFormOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BrandsDisplay;
