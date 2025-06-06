import React from "react";
import "../styles/Navbar.css";
import { IoPersonOutline } from "react-icons/io5";
import { FaHome, FaThList, FaBoxOpen, FaServicestack, FaTags } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar-wrapper">
      {/* Top bar */}
      <div className="navbar-top">
        <div className="navbar-logo">
          <img className="navbar-logo-img" src="/assets/printkeeLogo.png" alt="Printkee Logo" />
        </div>

        <div className="navbar-search">
          <input type="text" placeholder="Search Product..." />
          <select >
            <option>All Categories</option>
            <option>Apparel</option>
            <option>Bags</option>
            <option>Drinkware</option>
            <option>Collection</option>
          </select>
        </div>

        <div className="navbar-lang-currency">
          <select>
            <option>English</option>
          </select>
          <select>
            <option>INR</option>
          </select>
        </div>

        <div className="navbar-login">
          <IoPersonOutline />
          <span>Login</span>
        </div>
      </div>

      {/* Bottom menu */}
      <div className="navbar-bottom">
        <ul className="menu">
          <li>
            <a href="/" className="nav-link">
              <FaHome style={{ marginRight: 5 }} /> Home
            </a>
          </li>
          <li>
            <a href="/categories" className="nav-link">
              <FaThList style={{ marginRight: 5 }} /> All Categories ▾
            </a>
          </li>
          <li>
            <a href="#" className="nav-link">
              <FaBoxOpen style={{ marginRight: 5 }} /> Products ▾
            </a>
          </li>
          <li>
            <a href="#" className="nav-link">
              <FaServicestack style={{ marginRight: 5 }} /> Our Services
            </a>
          </li>
          <li>
            <a href="#" className="nav-link">
              <FaTags style={{ marginRight: 5 }} /> Brands
            </a>
          </li>
        </ul>

        <div className="navbar-contact">
          Contact with Us: <br />
          <a href="mailto:sales@mfglobalservices.com">sales@mfglobalservices.com</a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
