// ActionButtons.jsx
import React from "react";
import "../../styles/ActionButtons.css";

const ActionButtons = ({ onSave, onAddToCart, onRequestQuote }) => {
  return (
    <div className="action-buttons">
      <button onClick={onSave}>Save</button>
      <button onClick={onAddToCart}>Add to Cart</button>
      <button onClick={onRequestQuote}>Request a Quote</button>
    </div>
  );
};

export default ActionButtons;
