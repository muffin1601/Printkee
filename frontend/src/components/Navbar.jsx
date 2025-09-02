import React, { useState , useEffect} from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import { IoPersonOutline } from "react-icons/io5";
import { FaHome, FaThList, FaBoxOpen, FaServicestack, FaTags, FaGift } from "react-icons/fa";
import { FaInfoCircle } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import navbarSubcategories from "../data/list";
import { FaPen, FaEnvelope } from "react-icons/fa";
import axios from "axios";

const Navbar = () => {
  const [showMegaMenu, setShowMegaMenu] = useState(false);

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All Categories");
  const navigate = useNavigate();
  const [visitorCount, setVisitorCount] = useState(0); 

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/visitors/count`) 
      .then((res) => setVisitorCount(res.data.totalVisitors))
      .catch((err) => console.error("Failed to fetch visitor count", err));
  }, []);

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      navigate(`/search?q=${encodeURIComponent(query)}&cat=${encodeURIComponent(category)}`);
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
          <input
            type="text"
            placeholder="Search Product..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleSearch}
          />
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
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

        {/* <div className="navbar-login">
          <IoPersonOutline />
          <span>Login</span>
        </div> */}
        <div className="navbar-visitor-count">
        Visitors Today: <span id="visitor-count">{visitorCount}</span>
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
            <a href="/diwali-special" className="nav-link">
              <FaGift style={{ marginRight: 5 }} /> Diwali Special
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
          <a href="mailto:sales@printkee.com">sales@printkee.com</a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
