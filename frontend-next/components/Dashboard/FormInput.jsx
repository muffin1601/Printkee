"use client";
import React from "react";

const FormInput = ({ label, type = "text", value, onChange, ...props }) => (
  <div className="ap-form-group">
    <label className="ap-form-label">{label}</label>
    <input
      className="ap-form-input-2"
      type={type}
      value={value}
      onChange={onChange}
      {...props}
    />
  </div>
);

export default FormInput;
