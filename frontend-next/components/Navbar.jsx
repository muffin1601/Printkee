"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
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
  FaPhoneAlt,
} from "react-icons/fa";
import { IoMenu, IoClose, IoSearch } from "react-icons/io5";
import navbarSubcategories from "../data/list";
import "../styles/Navbar.css";

const Navbar = () => {
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState(null);

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All Categories");

  const router = useRouter();

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      router.push(
        `/search?q=${encodeURIComponent(query)}&cat=${encodeURIComponent(category)}`
      );
      setIsMenuOpen(false);
      setIsSearchOpen(false);
    }
  };

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
          <Link href="/">
            <img
              className="navbar-logo-img"
              src="/assets/printkeeLogo.webp"
              alt="Printkee Corporate Gifting Logo"
            />
          </Link>
        </div>

        {/* Desktop search */}
        <div className="navbar-search desktop-only">
          <label htmlFor="navbar-search-input" className="sr-only">
            Search Products
          </label>
          <input
            id="navbar-search-input"
            type="text"
            placeholder="Search Product..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleSearch}
          />
        </div>

        <div className="navbar-phone desktop-only">
          <a href="tel:8800904543" className="phone-link">
            <FaPhoneAlt /> 88009 04543
          </a>
        </div>

        <button
          className="login-btn"
          onClick={() => router.push("/login")}
          aria-label="Login to account"
        >
          Login
        </button>

        {/* Mobile controls */}
        <div className="mobile-controls mobile-only">
          <button
            aria-label="Open search bar"
            className="search-toggle"
            onClick={() => setIsSearchOpen(true)}
          >
            <IoSearch size={28} />
          </button>
          <button
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <IoClose size={35} /> : <IoMenu size={35} />}
          </button>
        </div>
      </div>

      {/* -------- Desktop Menu -------- */}
      <nav className="navbar-bottom desktop-only" aria-label="Main menu">
        <ul className="menu">
          <li>
            <Link href="/" className="nav-link">
              <FaHome aria-hidden="true" /> Home
            </Link>
          </li>

          <li
            className="dropdown"
            onMouseEnter={() => setShowMegaMenu(true)}
            onMouseLeave={() => setShowMegaMenu(false)}
          >
            <span className="nav-link">
              <FaThList aria-hidden="true" /> All Categories ▾
            </span>

            <div className={`mega-menu-wrapper ${showMegaMenu ? "open" : ""}`}>
              <div className="mega-menu">
                {groupedCategories.map((group, idx) => (
                  <div className="mega-menu-column" key={idx}>
                    {group.map(([mainCategory, mainCategoryData], i) => (
                      <div key={i} className="category-group">
                        <h4>{mainCategory}</h4>
                        <ul>
                          {mainCategoryData.items.map((sub, j) => (
                            <li key={j}>
                              <Link
                                href={sub.href}
                                onClick={() => setShowMegaMenu(false)}
                                aria-label={`Go to ${sub.name}`}
                              >
                                {sub.name}
                              </Link>
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
            <Link href="/brands" className="nav-link">
              <FaTags aria-hidden="true" /> Brands
            </Link>
          </li>

          <li>
            <Link href="/blogs" className="nav-link">
              <FaPen aria-hidden="true" /> Blog
            </Link>
          </li>

          <li>
            <Link href="/contact" className="nav-link">
              <FaEnvelope aria-hidden="true" /> Contact Us
            </Link>
          </li>

          <li>
            <Link href="/about" className="nav-link">
              <FaInfoCircle aria-hidden="true" /> About Us
            </Link>
          </li>
        </ul>

        <div className="navbar-contact">
          Contact with Us: <br />
          <a href="mailto:sales@printkee.com">sales@printkee.com</a>
        </div>
      </nav>

      {/* -------- Mobile Side Drawer -------- */}
      <nav
        className={`side-menu ${isMenuOpen ? "open" : ""}`}
        aria-label="Mobile menu"
      >
        <div className="side-menu-header">
          <img
            src="/assets/printkeeLogo.webp"
            alt="Printkee Logo"
            className="side-logo"
          />
          <button
            className="close-btn-side"
            aria-label="Close menu"
            onClick={() => setIsMenuOpen(false)}
          >
            <IoClose size={30} />
          </button>
        </div>

        <ul>
          <li>
            <Link href="/" onClick={() => setIsMenuOpen(false)}>
              <FaHome aria-hidden="true" /> Home
            </Link>
          </li>

          <li className="mobile-dropdown">
            <button
              className="dropdown-toggle"
              aria-expanded={openCategory === "all"}
              aria-label="Toggle category list"
              onClick={() =>
                setOpenCategory(openCategory === "all" ? null : "all")
              }
            >
              <span>
                <FaThList aria-hidden="true" /> All Categories
              </span>
              {openCategory === "all" ? <FaChevronUp /> : <FaChevronDown />}
            </button>

            {openCategory === "all" && (
              <div className="dropdown-list">
                {Object.entries(navbarSubcategories).map(
                  ([mainCategory, mainCategoryData], idx) => (
                    <div key={idx} className="mobile-category-block">
                      <Link
                        href={mainCategoryData.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="mobile-category-link"
                        aria-label={`View ${mainCategory}`}
                      >
                        {mainCategory}
                      </Link>
                    </div>
                  )
                )}
              </div>
            )}
          </li>

          <li>
            <Link href="/brands" onClick={() => setIsMenuOpen(false)}>
              <FaTags aria-hidden="true" /> Brands
            </Link>
          </li>

          <li>
            <Link href="/blogs" onClick={() => setIsMenuOpen(false)}>
              <FaPen aria-hidden="true" /> Blogs
            </Link>
          </li>

          <li>
            <Link href="/contact" onClick={() => setIsMenuOpen(false)}>
              <FaEnvelope aria-hidden="true" /> Contact Us
            </Link>
          </li>

          <li>
            <Link href="/about" onClick={() => setIsMenuOpen(false)}>
              <FaInfoCircle aria-hidden="true" /> About Us
            </Link>
          </li>
        </ul>

        <div className="side-menu-footer">
          <a href="tel:8800904543" className="phone-link">
            <FaPhoneAlt /> 88009 04543
          </a>
        </div>
      </nav>

      {/* -------- Search Overlay -------- */}
      {isSearchOpen && (
        <div className="search-overlay">
          <div className="search-box">
            <div className="search-input-group">
              <label htmlFor="mobile-search" className="sr-only">
                Search
              </label>
              <input
                id="mobile-search"
                type="text"
                placeholder="Search.."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleSearch}
              />
            </div>
            <button
              className="close-btn-search"
              aria-label="Close search"
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
