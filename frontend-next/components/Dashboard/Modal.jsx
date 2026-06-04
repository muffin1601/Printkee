"use client";
import React from "react";

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="ap-modal-overlay" onClick={onClose}>
      <div className="ap-modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="ap-modal-header">
          <h3 className="ap-modal-title">{title}</h3>
          <button className="ap-close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="ap-modal-content">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
