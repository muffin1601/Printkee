"use client";
// components/Toast.jsx
import React, { useEffect, useRef, useState } from 'react';
import styles from '../styles/Toast.module.css';
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaTimes } from 'react-icons/fa';

const icons = {
  success: <FaCheckCircle aria-hidden="true" />,
  error: <FaExclamationCircle aria-hidden="true" />,
  info: <FaInfoCircle aria-hidden="true" />,
};

const Toast = ({ type = 'info', message, onClose }) => {
  const toastRef = useRef(null);
  const [closing, setClosing] = useState(false);

  // Auto-close after 4 seconds
  useEffect(() => {
    const timer = setTimeout(() => triggerClose(), 4000);
    return () => clearTimeout(timer);
  }, []);

  // Close with ESC key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') {
        triggerClose();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const triggerClose = () => {
    setClosing(true);
    setTimeout(() => onClose(), 200); // allow fade-out animation if CSS exists
  };

  const typeClass = {
    success: styles.printkeToastSuccess,
    error: styles.printkeToastError,
    info: styles.printkeToastInfo,
    warning: styles.printkeToastWarning,
  }[type] || "";

  return (
    <div
      ref={toastRef}
      className={`${styles.printkeeToast} ${typeClass} ${closing ? styles.closing : ""}`}
      role="alert"
      aria-live="assertive"
      tabIndex="0"
    >
      <span className={styles.toastIcon}>{icons[type]}</span>

      <span className={styles.toastMessage}>{message}</span>

      <button
        className={styles.toastClose}
        aria-label="Close notification"
        onClick={triggerClose}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") triggerClose();
        }}
      >
        <FaTimes aria-hidden="true" />
      </button>
    </div>
  );
};

export default Toast;
