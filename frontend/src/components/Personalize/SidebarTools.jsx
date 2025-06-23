// SidebarTools.jsx
import React from "react";
import { FaTextHeight, FaImage, FaQrcode, FaShapes, FaLayerGroup } from "react-icons/fa";
import "../../styles/SidebarTools.css";

const SidebarTools = ({ onAddText, onAddImage }) => {
  return (
    <div className="sidebar-tools">
      <button onClick={onAddText}><FaTextHeight /></button>
      <button onClick={onAddImage}><FaImage /></button>
      <button><FaQrcode /></button>
      <button><FaShapes /></button>
      <button><FaLayerGroup /></button>
    </div>
  );
};

export default SidebarTools;
