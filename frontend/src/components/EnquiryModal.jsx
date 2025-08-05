import React, { useState } from 'react';
import '../styles/EnquiryModal.css';
import axios from 'axios';

const EnquiryModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    requirement: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        import.meta.env.VITE_CRM_API_URL,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": import.meta.env.VITE_CRM_API_KEY,
          },
        }
      );

      await axios.post(`${import.meta.env.VITE_API_URL}/send-email`, formData);

      alert("Thank you! Your inquiry has been submitted.");
      setFormData({
        name: "",
        company: "",
        email: "",
        phone: "",
        requirement: "",
      });
      onClose();
    } catch (error) {
      console.error("Submission failed:", error);
      alert("Something went wrong. Please try again later.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="enquiry-modal-overlay" onClick={onClose}>
      <div className="enquiry-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>
        <div className="modal-container">
          {/* LEFT CONTAINER */}
          <div className="left-content">
            <img
              src="/assets/t shirt.jpg" // Replace with actual image path
              alt="Enquiry Illustration"
              className="enquiry-image"
            />
            <p className="left-description">
              Reach out to us for tailored solutions, expert consultation, and a personalized quote that fits your business needs.
            </p>
          </div>

          {/* RIGHT CONTAINER - FORM */}
          <div className="right-form">
            <h2 className="enquiry-title">Get a Quote</h2>
            <form onSubmit={handleSubmit} className="enquiry-form">
              <input
                className="form-input"
                type="text"
                name="name"
                placeholder="Your Name"
                required
                onChange={handleChange}
              />
              <input
                className="form-input"
                type="text"
                name="company"
                placeholder="Company Name"
                required
                onChange={handleChange}
              />
              <input
                className="form-input"
                type="email"
                name="email"
                placeholder="Email Address"
                required
                onChange={handleChange}
              />
              <input
                className="form-input"
                type="tel"
                name="phone"
                placeholder="Phone Number"
                required
                onChange={handleChange}
              />
              <textarea
                className="form-textarea"
                name="requirement"
                placeholder="Your Requirement"
                rows="4"
                onChange={handleChange}
              ></textarea>
              <button type="submit" className="submit-btn">Get a Quote</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnquiryModal;