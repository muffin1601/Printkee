import React from "react";
import "../../styles/CustomizerControls.css";

const CustomizerControls = ({
  availableColors = [],
  selectedColor,
  setSelectedColor,
  sizes = [],
  selectedSize,
  setSelectedSize,
  quantity,
  setQuantity,
  deliveryTerm,
  setDeliveryTerm,
  onSave,
  onAddToCart,
  onQuote
}) => {
  return (
    <div className="sidebar-customizer">
      <h4>MEN’S T-SHIRT</h4>

      <div className="section">
        <label>Product color:</label>
        <div className="color-grid">
          {availableColors.map((color, index) => (
            <button
              key={index}
              className={`color-circle ${selectedColor === color ? "selected" : ""}`}
              style={{ backgroundColor: color }}
              onClick={() => setSelectedColor(color)}
            />
          ))}
        </div>
      </div>

      <div className="section">
        <label>Delivery term:</label>
        <select value={deliveryTerm} onChange={(e) => setDeliveryTerm(e.target.value)}>
          <option value="24 hours">24 hours</option>
          <option value="3-5 days">3–5 days</option>
          <option value="1 week">1 week</option>
        </select>
      </div>

      <div className="section">
        <label>Quantity:</label>
        <select value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
          {[...Array(10).keys()].map((n) => (
            <option key={n + 1} value={n + 1}>
              {n + 1} Unit{n > 0 ? "s" : ""}
            </option>
          ))}
        </select>
      </div>

      <div className="section">
        <label>PSize:</label>
        <select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)}>
          <option value="">Choose an option</option>
          {sizes.map((size, i) => (
            <option key={i} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>

      <div className="quantity-row">
        <span>+ Quantity</span>
        <input
          type="number"
          value={quantity}
          min={1}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />
      </div>

      <div className="buttons">
        <button onClick={onSave}>💾 SAVE</button>
        <button onClick={onAddToCart}>🛒 ADD TO CART</button>
        <button onClick={onQuote}>📩 REQUEST A QUOTE</button>
      </div>
    </div>
  );
};

export default CustomizerControls;
