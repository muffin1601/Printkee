import React, { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import {
  FaHome,
  FaThList,
  FaTags,
  FaGift,
  FaInfoCircle,
  FaPen,
  FaEnvelope,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { IoMenu, IoClose, IoSearch } from "react-icons/io5";
import navbarSubcategories from "../data/list";
import axios from "axios";
import "../styles/Navbar.css";

const Navbar = () => {
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState(null);

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [visitorCount, setVisitorCount] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/visitors/count`)
      .then((res) => setVisitorCount(res.data.totalVisitors))
      .catch(() => console.warn("⚠ Visitor API failed"));
  }, []);

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      navigate(
        `/search?q=${encodeURIComponent(query)}&cat=${encodeURIComponent(
          category
        )}`
      );
      setIsMenuOpen(false);
      setIsSearchOpen(false);
    }
  };

  const slugify = (text) =>
    text
      .toLowerCase()
      .trim()
      .replace(/&/g, "and")
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/--+/g, "-");

  const groupedCategories = Object.entries(navbarSubcategories).reduce(
    (acc, curr, index) => {
      if (index % 2 === 0) acc.push([curr]);
      else acc[acc.length - 1].push(curr);
      return acc;
    },
    []
  );

  return (
    <div className="navbar-wrapper">
      {/* -------- Top bar -------- */}
      <div className="navbar-top">
        <div className="navbar-logo">
          <img
            className="navbar-logo-img"
            src="/assets/printkeeLogo.png"
            alt="Printkee Logo"
          />
        </div>

        {/* Desktop search */}
        <div className="navbar-search desktop-only">
          <input
            type="text"
            placeholder="Search Product..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleSearch}
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>All Categories</option>
            <option>Apparel</option>
            <option>Bags</option>
            <option>Drinkware</option>
            <option>Collection</option>
          </select>
        </div>

        <div className="navbar-visitor-count desktop-only">
          Visitors Today: <span>{visitorCount}</span>
        </div>

        
        <div className="mobile-controls mobile-only">
          <button
            className="search-toggle"
            onClick={() => setIsSearchOpen(true)}
          >
            <IoSearch size={28} />
          </button>
          <button
            className="menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <IoClose size={35} /> : <IoMenu size={35} />}
          </button>
        </div>
      </div>

      
      <div className="navbar-bottom desktop-only">
        <ul className="menu">
          <li>
            <NavLink to="/" className="nav-link">
              <FaHome /> Home
            </NavLink>
          </li>

          <li
            className="dropdown"
            onMouseEnter={() => setShowMegaMenu(true)}
            onMouseLeave={() => setShowMegaMenu(false)}
          >
            <span className="nav-link">
              <FaThList /> All Categories ▾
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
                                to={`/${slugify(mainCategory)}/${slugify(sub)}`}
                                onClick={() => setShowMegaMenu(false)}
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
            <NavLink to="/brands" className="nav-link">
              <FaTags /> Brands
            </NavLink>
          </li>
          <li>
            <NavLink to="/blogs" className="nav-link">
              <FaPen /> Blog
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className="nav-link">
              <FaEnvelope /> Contact Us
            </NavLink>
          </li>
          <li>
            <NavLink to="/diwali-special" className="nav-link">
              <FaGift /> Diwali Special
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className="nav-link">
              <FaInfoCircle /> About Us
            </NavLink>
          </li>
        </ul>

        <div className="navbar-contact">
          Contact with Us: <br />
          <a href="mailto:sales@printkee.com">sales@printkee.com</a>
        </div>
      </div>

      {/* -------- Mobile Side Drawer -------- */}
      <nav className={`side-menu ${isMenuOpen ? "open" : ""}`}>
        <div className="side-menu-header">
          <img src="/assets/printkeeLogo.png" alt="Logo" className="side-logo" />
          <button className="close-btn-side" onClick={() => setIsMenuOpen(false)}>
            <IoClose size={30} />
          </button>
        </div>

        <ul>
          <li>
            <NavLink to="/" onClick={() => setIsMenuOpen(false)}>
              <FaHome /> Home
            </NavLink>
          </li>
          <li className="mobile-dropdown">
            <button
              className="dropdown-toggle"
              onClick={() =>
                setOpenCategory(openCategory === "all" ? null : "all")
              }
            >
              <span >
                <FaThList /> All Categories
              </span>
              {openCategory === "all" ? <FaChevronUp /> : <FaChevronDown />}
            </button>

            {openCategory === "all" && (
              <div className="dropdown-list">
                {Object.entries(navbarSubcategories).map(([mainCategory], idx) => (
                  <NavLink
                    key={idx}
                    to={`/${slugify(mainCategory)}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {mainCategory}
                  </NavLink>
                ))}
              </div>
            )}
          </li>
          <li>
            <NavLink to="/brands" onClick={() => setIsMenuOpen(false)}>
              <FaTags /> Brands
            </NavLink>
          </li>
          <li>
            <NavLink to="/blogs" onClick={() => setIsMenuOpen(false)}>
              <FaPen /> Blogs
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" onClick={() => setIsMenuOpen(false)}>
              <FaEnvelope /> Contact Us
            </NavLink>
          </li>
          <li>
            <NavLink to="/diwali-special" onClick={() => setIsMenuOpen(false)}>
              <FaGift /> Diwali Special
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" onClick={() => setIsMenuOpen(false)}>
              <FaInfoCircle /> About Us
            </NavLink>
          </li>
        </ul>

        <div className="side-menu-footer">
          <p>Visitors Today: {visitorCount}</p>
        </div>
      </nav>

      {/* -------- Search Overlay -------- */}
      {isSearchOpen && (
        <div className="search-overlay">
          <div className="search-box">
            <div className="search-input-group">
              <input
                type="text"
                placeholder="Search.."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleSearch}
              />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>All Categories</option>
                <option>Apparel</option>
                <option>Bags</option>
                <option>Drinkware</option>
                <option>Collection</option>
              </select>
            </div>
            <button
              className="close-btn-search"
              onClick={() => setIsSearchOpen(false)}
            >
              <IoClose size={30} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
