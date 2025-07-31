import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Sitemap.css';

const Sitemap = () => {
  return (
    <div className="sitemap-container">
      <h1 className="sitemap-heading">Sitemap</h1>
      <p className="sitemap-description">Easily explore all the key pages on MF Global Services.</p>

      <ul className="sitemap-list">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About Us</Link></li>
        <li><Link to="/blogs">Blog</Link></li>
        <li><Link to="/brands">Brands</Link></li>
        <li><Link to="/contact">Contact Us</Link></li>

        <li className="sitemap-subheading">Popular Categories</li>
        <li><Link to="/category/Bags and Travel">Bags and Travel</Link></li>
        <li><Link to="/category/Eco-Products">Eco-Products</Link></li>
        <li><Link to="/category/Apparel and Accessories">Apparel and Accessories</Link></li>
        <li><Link to="/category/Collection">Collection</Link></li>
        <li><Link to="/category/Drink Ware">Drink Ware</Link></li>
        <li><Link to="/category/Technology Accessories">Technology Accessories</Link></li>
        <li><Link to="/category/Trophy and Momento">Trophy and Momento</Link></li>
        <li><Link to="/category/Office and Writing">Office and Writing</Link></li>
      </ul>
    </div>
  );
};

export default Sitemap;
