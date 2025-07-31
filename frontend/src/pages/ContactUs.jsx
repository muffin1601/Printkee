import React from 'react';
import '../styles/ContactUs.css';
import { Helmet } from 'react-helmet';

const ContactUs = () => {
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
          <form>
            <input type="text" name="name" placeholder="Your Name" required />
            <input type="email" name="email" placeholder="Your Email" required />
            <input type="text" name="subject" placeholder="Subject" />
            <textarea name="message" placeholder="Your Message" rows="5" required></textarea>
            <button type="submit">Send Message</button>
          </form>
        </div>

        <div className="contact-details">
          <h2>Contact Information</h2>
          <p><strong>Email:</strong> info@mfglobalservices.com</p>
          <p><strong>Phone:</strong> +91-9876543210</p>
          <p><strong>Address:</strong> 123 Corporate Avenue, Mumbai, Maharashtra, India</p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
