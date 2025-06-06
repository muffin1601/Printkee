import React from "react";
import "../styles/Navbar.css";

const Dropdown = () => {
  return (
    <div className="dropdown-menu">
      <div>
        <strong>Scalers</strong>
        <p>Addison Wireless Speaker</p>
        <p>Anthracite Dial Men's Watch</p>
      </div>
      <div>
        <strong>Dental Materials</strong>
        <p>Electric Gift</p>
        <p>Perfumes</p>
      </div>
      <div>
        <strong>Endo Motors</strong>
        <p>JBL Flip 5</p>
        <p>The Hemaksi Necklace</p>
      </div>
      <img src="https://via.placeholder.com/100" alt="Toy" />
    </div>
  );
};

export default Dropdown;
