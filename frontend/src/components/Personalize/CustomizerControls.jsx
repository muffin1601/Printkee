// CustomizerControls.jsx
import React from "react";
import { SketchPicker } from "react-color";
import "../../styles/CustomizerControls.css";

const CustomizerControls = ({ color, setColor, sizes, selectedSize, setSelectedSize, quantity, setQuantity }) => {
  return (
    <div className="customizer-controls">
      <h3>Product Color:</h3>
      <SketchPicker color={color} onChangeComplete={(c) => setColor(c.hex)} />

      <div className="form-group">
        <label>Size:</label>
        <select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)}>
          <option value="">Choose a size</option>
          {sizes.map((s, i) => (
            <option key={i} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Quantity:</label>
        <input type="number" min="1" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} />
      </div>
    </div>
  );
};

export default CustomizerControls;
