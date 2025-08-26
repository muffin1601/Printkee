// SidebarTools.jsx
import React, { useRef } from "react";
import {
  FaTextHeight,
  FaImage,
  FaPaintBrush,
  FaShapes,
  FaQrcode,
  FaLayerGroup,
  FaUser
} from "react-icons/fa";
import "../../styles/SidebarTools.css";

const SidebarTools = ({ onAddText, onAddImage, onChangeBgColor, onAddShape, onAddQRCode, onManageLayers, onUserInfo }) => {
  const imageInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      onAddImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="sidebar-tools">
      <button onClick={onAddText}><FaTextHeight /></button>

      <button onClick={() => imageInputRef.current.click()}><FaImage /></button>
      <input type="file" accept="image/*" ref={imageInputRef} style={{ display: "none" }} onChange={handleImageUpload} />

      <button onClick={onChangeBgColor}><FaPaintBrush /></button>
      <button onClick={onAddShape}><FaShapes /></button>
      <button onClick={onAddQRCode}><FaQrcode /></button>
      <button onClick={onManageLayers}><FaLayerGroup /></button>
      <button onClick={onUserInfo}><FaUser /></button>
    </div>
  );
};

export default SidebarTools;
