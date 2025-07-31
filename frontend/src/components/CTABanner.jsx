// components/CTABanner.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/CTABanner.css';

const CTABanner = ({ imageSrc, linkTo = '/contact', alt = 'Get a Quote' }) => {
  return (
    <section className="cta-banner">
      <Link to={linkTo}>
        <img src={imageSrc} alt={alt} className="cta-full-image" />
      </Link>
    </section>
  );
};

export default CTABanner;
