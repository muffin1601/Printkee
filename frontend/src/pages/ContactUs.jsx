import React, { useState } from 'react';
import '../styles/ContactUs.css';
import { Helmet } from 'react-helmet';
import axios from 'axios';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    requirement: '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 1. Send to CRM
      await axios.post(import.meta.env.VITE_CRM_API_URL, formData, {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": import.meta.env.VITE_CRM_API_KEY,
        },
      });

      // 2. Send to Email
      await axios.post(`${import.meta.env.VITE_API_URL}/send-email`, formData);

      alert("Thank you! Your message has been sent.");
      setFormData({
        name: '',
        company: '',
        email: '',
        phone: '',
        requirement: '',
      });
    } catch (error) {
      console.error("Contact form submission error:", error);
      alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="contact-page">
      <Helmet>
        <title>Contact Us | MF Global Services</title>
        <meta name="description" content="Get in touch with MF Global Services for customized corporate gifting solutions. Reach out via our contact form, email, or phone." />
      </Helmet>

      <div className="contact-hero">
        <h1>Let's Talk Business</h1>
        <p>Have questions or want to discuss a custom gifting solution? We'd love to hear from you.</p>
      </div>

      <div className="contact-content">
        <div className="contact-form">
          <h2>Send Us a Message</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              value={formData.name}
              onChange={handleChange}
            />
            <input
              type="text"
              name="company"
              placeholder="Company Name"
              required
              value={formData.company}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              required
              value={formData.phone}
              onChange={handleChange}
            />
            <textarea
              name="requirement"
              placeholder="Your Requirement"
              rows="5"
              required
              value={formData.requirement}
              onChange={handleChange}
            ></textarea>
            <button type="submit">Send Message</button>
          </form>
        </div>

        <div className="contact-details">
          <h2>Contact Information</h2>
          <p><strong>Email:</strong> sales@printkee.com</p>
          <p><strong>Phone:</strong> +91 8750708222</p>
          <p><strong>Address:</strong> F90/1, Beside ESIC Hospital, Okhla Industrial Area Phase 1, New Delhi – 110020, India</p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
