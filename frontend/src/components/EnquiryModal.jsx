// components/EnquiryModal.jsx
import React, { useState } from 'react';
import '../styles/EnquiryModal.css';

const EnquiryModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log('Enquiry Submitted:', formData);
    alert('Thank you! We’ll get back to you shortly.');
    onClose(); 
  };

  if (!isOpen) return null;

  return (
    <div className="enquiry-modal-overlay" onClick={onClose}>
      <div className="enquiry-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>Get a Quote</h2>
        <form onSubmit={handleSubmit} className="enquiry-form">
          <input type="text" name="name" placeholder="Your Name" required onChange={handleChange} />
          <input type="email" name="email" placeholder="Email Address" required onChange={handleChange} />
          <input type="tel" name="phone" placeholder="Phone Number" required onChange={handleChange} />
          <textarea name="message" placeholder="Your Requirement" rows="4" onChange={handleChange}></textarea>
          <button type="submit" className="submit-btn">Get a Quote</button>
        </form>
      </div>
    </div>
  );
};

export default EnquiryModal;
