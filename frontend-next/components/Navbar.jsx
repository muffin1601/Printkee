"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  LayoutGrid,
  Tag,
  Info,
  PenLine,
  Mail,
  ChevronDown,
  ChevronUp,
  Phone,
  Menu,
  X,
  Search,
  Home,
  User,
  ArrowRight,
  AtSign,
} from "lucide-react";
import navbarSubcategories from "../data/list";
import styles from "../styles/Navbar.module.css";

const Navbar = () => {
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const [isMenuOpen, setIsMenuOpen]   = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState(null);
  const [query, setQuery] = useState("");

  const router = useRouter();

  const handleSearch = (e) => {
    if (e.key === "Enter" && query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}&cat=All Categories`);
      setIsMenuOpen(false);
      setIsSearchOpen(false);
    }
  };

  return (
    <header className={styles.root}>

      {/* ── ROW 2 ─ Logo | Search | Phone | Login ──────────── */}
      <div className={styles.mainBar}>
        <div className={styles.mainBarInner}>

          {/* Logo */}
          <Link href="/" className={styles.logoLink} aria-label="Printkee home">
            <img
              src="/assets/printkeeLogo.webp"
              alt="Printkee"
              className={styles.logo}
            />
          </Link>

          {/* Search ─ desktop */}
          <div className={styles.searchBar}>
            <Search size={15} className={styles.searchIcon} aria-hidden="true" />
            <label htmlFor="nav-search" className={styles.srOnly}>Search products</label>
            <input
              id="nav-search"
              type="text"
              placeholder="Search products…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleSearch}
            />
          </div>

          {/* Right cluster ─ desktop */}
          <div className={styles.rightCluster}>
            <a href="mailto:sales@printkee.com" className={styles.phoneLink}>
              <AtSign size={13} aria-hidden="true" />
              <span>sales@printkee.com</span>
            </a>
            <span className={styles.divider} aria-hidden="true" />
            <a href="tel:8800904543" className={styles.phoneLink}>
              <Phone size={14} aria-hidden="true" />
              <span>88009 04543</span>
            </a>
            <button
              className={styles.loginBtn}
              onClick={() => router.push("/login")}
              aria-label="Admin login"
            >
              <User size={14} aria-hidden="true" />
              Login
            </button>
          </div>

          {/* Mobile controls — search toggle (mobile only) + hamburger (tablet+mobile) */}
          <div className={styles.mobileControls}>
            <button
              className={`${styles.iconBtn} ${styles.searchToggleBtn}`}
              aria-label="Open search"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search size={20} />
            </button>
            <button
              className={styles.iconBtn}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* ── ROW 3 ─ Nav links ───────────────────────────────── */}
      <nav className={styles.navBar} aria-label="Main navigation">
        {/* Full-width mega menu anchors to this element */}
        <ul className={styles.navList}>

          <li>
            <Link href="/" className={styles.navLink}>
              <Home size={14} aria-hidden="true" /> Home
            </Link>
          </li>

          {/* All Categories trigger */}
          <li
            className={styles.megaTrigger}
            onMouseEnter={() => setShowMegaMenu(true)}
            onMouseLeave={() => setShowMegaMenu(false)}
          >
            <button className={`${styles.navLink} ${styles.navBtn}`} aria-haspopup="true" aria-expanded={showMegaMenu}>
              <LayoutGrid size={14} aria-hidden="true" />
              All Categories
              <ChevronDown
                size={13}
                className={`${styles.chevron} ${showMegaMenu ? styles.chevronUp : ""}`}
                aria-hidden="true"
              />
            </button>

            {/* ── MEGA MENU ───────────────────────────────── */}
            <div
              className={`${styles.megaMenu} ${showMegaMenu ? styles.megaOpen : ""}`}
              role="region"
              aria-label="Product categories"
            >
              <div className={styles.megaScroll}>
                {/* Group 8 categories into 4 columns, 2 per column */}
                {(() => {
                  const entries = Object.entries(navbarSubcategories);
                  const cols = [
                    entries.slice(0, 2),   // Apparel + Collection
                    entries.slice(2, 4),   // Bags + Office
                    entries.slice(4, 6),   // Drink Ware + Technology
                    entries.slice(6),      // Eco-Products + Trophy
                  ];
                  return (
                    <div className={styles.megaGrid}>
                      {cols.map((group, colIdx) => (
                        <div key={colIdx} className={styles.megaColGroup}>
                          {group.map(([cat, data]) => (
                            <div key={cat} className={styles.megaCol}>

                              {/* Category heading */}
                              <Link
                                href={data.href}
                                className={styles.megaHeading}
                                onClick={() => setShowMegaMenu(false)}
                              >
                                {cat}
                                <ArrowRight size={11} aria-hidden="true" />
                              </Link>

                              {/* Subcategories */}
                              <ul>
                                {data.items.map((sub) => (
                                  <li key={sub.name}>
                                    <Link
                                      href={sub.href}
                                      className={styles.megaItem}
                                      onClick={() => setShowMegaMenu(false)}
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
                  );
                })()}
              </div>
            </div>
          </li>

          <li>
            <Link href="/brands" className={styles.navLink}>
              <Tag size={14} aria-hidden="true" /> Brands
            </Link>
          </li>
          
          <li>
            <Link href="/contact" className={styles.navLink}>
              <Mail size={14} aria-hidden="true" /> Contact Us
            </Link>
          </li>
          <li>
            <Link href="/about" className={styles.navLink}>
              <Info size={14} aria-hidden="true" /> About Us
            </Link>
          </li>
          <li>
            <Link href="/blogs" className={styles.navLink}>
              <PenLine size={14} aria-hidden="true" /> Blog
            </Link>
          </li>

        </ul>
      </nav>

      {/* Drawer backdrop — closes menu when tapping outside */}
      {isMenuOpen && (
        <div
          className={styles.drawerBackdrop}
          aria-hidden="true"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* ── MOBILE DRAWER ───────────────────────────────────── */}
      <nav
        className={`${styles.drawer} ${isMenuOpen ? styles.drawerOpen : ""}`}
        aria-label="Mobile navigation"
      >
        <div className={styles.drawerHead}>
          <img src="/assets/printkeeLogo.webp" alt="Printkee" className={styles.drawerLogo} />
          <button className={styles.drawerClose} aria-label="Close menu" onClick={() => setIsMenuOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <ul className={styles.drawerNav}>
          <li>
            <Link href="/" className={styles.drawerLink} onClick={() => setIsMenuOpen(false)}>
              <Home size={15} /> Home
            </Link>
          </li>

          <li>
            <button
              className={styles.drawerToggle}
              aria-expanded={openCategory === "all"}
              onClick={() => setOpenCategory(openCategory === "all" ? null : "all")}
            >
              <span><LayoutGrid size={15} /> All Categories</span>
              {openCategory === "all" ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
            {openCategory === "all" && (
              <div className={styles.drawerSub}>
                {Object.entries(navbarSubcategories).map(([cat, data]) => (
                  <Link
                    key={cat}
                    href={data.href}
                    className={styles.drawerSubLink}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            )}
          </li>

          <li><Link href="/brands"  className={styles.drawerLink} onClick={() => setIsMenuOpen(false)}><Tag size={15} /> Brands</Link></li>
          <li><Link href="/blogs"   className={styles.drawerLink} onClick={() => setIsMenuOpen(false)}><PenLine size={15} /> Blog</Link></li>
          <li><Link href="/contact" className={styles.drawerLink} onClick={() => setIsMenuOpen(false)}><Mail size={15} /> Contact Us</Link></li>
          <li><Link href="/about"   className={styles.drawerLink} onClick={() => setIsMenuOpen(false)}><Info size={15} /> About Us</Link></li>
        </ul>

        <div className={styles.drawerFoot}>
          <a href="tel:8800904543" className={styles.drawerPhone}><Phone size={14} /> 88009 04543</a>
          <button className={styles.drawerLoginBtn} onClick={() => { router.push("/login"); setIsMenuOpen(false); }}>
            <User size={14} /> Login
          </button>
        </div>
      </nav>

      {/* ── MOBILE SEARCH OVERLAY ───────────────────────────── */}
      {isSearchOpen && (
        <div className={styles.searchOverlay} onClick={() => setIsSearchOpen(false)}>
          <div className={styles.searchModal} onClick={(e) => e.stopPropagation()}>
            <Search size={18} className={styles.searchIcon} />
            <label htmlFor="m-search" className={styles.srOnly}>Search</label>
            <input
              id="m-search"
              type="text"
              placeholder="Search products…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleSearch}
              autoFocus
            />
            <button className={styles.searchCloseBtn} aria-label="Close" onClick={() => setIsSearchOpen(false)}>
              <X size={20} />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
