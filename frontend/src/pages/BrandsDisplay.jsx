import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
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

  const firstProducts = products.slice(0, 10);
  const remainingProducts = products.slice(10);

  if (!brandInfo) {
    return <p className="not-found">Brand not found.</p>;
  }

  const canonicalUrl = `${window.location.origin}/brands/${brand}`;

  return (
    <div className="brand-display-page">
      {/* 🔹 Helmet SEO */}
      <Helmet>
        <title>{`${brandInfo.name} Products | Corporate Gifting`}</title>
        <meta name="description" content={brandInfo.description} />
        <meta name="keywords" content={brandInfo.tags.join(", ")} />
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>

      {/* 🔹 Brand Header */}
      <div className="brand-top-section">
        <div className="brand-top-content">
          <Link to="/" className="brand-back-link">
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

      {/* 🔹 Products */}
      {products.length === 0 ? (
        <p className="not-found">No products found for this brand.</p>
      ) : (
        <>
          {/* First 10 */}
          <div className="brand-products-grid">
            {firstProducts.map((product, index) => (
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

          {/* CTA Banner */}
          <CTABanner />

          {/* Remaining */}
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

      {/* 🔹 Lead Form */}
      {isLeadFormOpen && (
        <div className="lead-overlay-2">
          <div className="lead-modal-2">
            <h3>Get the {brandInfo.name} Catalogue</h3>
            <form className="lead-form-2">
              <input type="text" placeholder="Your Name" required />
              <input type="text" placeholder="Company Name" />
              <input type="email" placeholder="Email Address" required />
              <input type="tel" placeholder="Phone Number" required />
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
