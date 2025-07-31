import React, { useState } from "react";
import "../styles/Navbar.css";
import { IoPersonOutline } from "react-icons/io5";
import { FaHome, FaThList, FaBoxOpen, FaServicestack, FaTags } from "react-icons/fa";
import { FaInfoCircle } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import navbarSubcategories from "../data/list";
import { FaPen, FaEnvelope } from "react-icons/fa";

const Navbar = () => {
  const [showMegaMenu, setShowMegaMenu] = useState(false);

  // Group categories into pairs for 2 per column
  const groupedCategories = Object.entries(navbarSubcategories).reduce((acc, curr, index) => {
    if (index % 2 === 0) acc.push([curr]);
    else acc[acc.length - 1].push(curr);
    return acc;
  }, []);

  return (
    <div className="navbar-wrapper">
      {/* Top bar */}
      <div className="navbar-top">
        <div className="navbar-logo">
          <img className="navbar-logo-img" src="/assets/printkeeLogo.png" alt="Printkee Logo" />
        </div>

        <div className="navbar-search">
          <input type="text" placeholder="Search Product..." />
          <select>
            <option>All Categories</option>
            <option>Apparel</option>
            <option>Bags</option>
            <option>Drinkware</option>
            <option>Collection</option>
          </select>
        </div>

        <div className="navbar-lang-currency">
          <select><option>English</option></select>
          <select><option>INR</option></select>
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
            <NavLink to="/" className="nav-link">
              <FaHome style={{ marginRight: 5 }} /> Home
            </NavLink>
          </li>

          <li
            className="dropdown"
            onMouseEnter={() => setShowMegaMenu(true)}
            onMouseLeave={() => setShowMegaMenu(false)}
          >
            <span className="nav-link">
              <FaThList style={{ marginRight: 5 }} /> All Categories ▾
            </span>

            <div className={`mega-menu-wrapper ${showMegaMenu ? "open" : ""}`}>
              <div className="mega-menu">
                {groupedCategories.map((group, idx) => (
                  <div className="mega-menu-column" key={idx}>
                    {group.map(([mainCategory, subcategories], i) => (
                      <div key={i} className="category-group">
                        <h4>{mainCategory}</h4>
                        <ul>
                          {subcategories.map((sub, j) => (
                            <li key={j}>
                              <NavLink
                                to={`/${encodeURIComponent(mainCategory)}/${encodeURIComponent(sub)}`}
                              >
                                {sub}
                              </NavLink>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </li>


          <li>
            <a href="/brands" className="nav-link">
              <FaTags style={{ marginRight: 5 }} /> Brands
            </a>
          </li>
          <li>
            <a href="/blogs" className="nav-link">
              <FaPen style={{ marginRight: 5 }} /> Blog
            </a>
          </li>
          <li>
            <a href="/contact" className="nav-link">
              <FaEnvelope style={{ marginRight: 5 }} /> Contact Us
            </a>
          </li>
          <li>
            <a href="/about" className="nav-link">
              <FaInfoCircle style={{ marginRight: 5 }} /> About Us
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
