"use client";
import React, { useState } from "react";
import { X, Mail, Lock, Loader2, Eye, EyeOff } from "lucide-react";
import styles from "../styles/Login.module.css";

const LoginClient = () => {
  const [email, setEmail]               = useState("");
  const [password, setPassword]         = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading]           = useState(false);
  const [error, setError]               = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }
      const data = await response.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      window.location.href = "/admin";
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles["login-wrapper"]}>
      <div className={styles["login-card"]}>

        {/* Close → back to site */}
        <button
          className={styles["login-close"]}
          onClick={() => (window.location.href = "/")}
          aria-label="Back to site"
        >
          <X size={14} />
        </button>

        {/* Header */}
        <p className={styles["login-eyebrow"]}>Printkee</p>
        <h2 className={styles["login-title"]}>Admin Login</h2>
        <p className={styles["login-subtitle"]}>Sign in to access the admin panel.</p>

        {/* Form */}
        <form onSubmit={handleSubmit}>

          <div className={styles["input-group"]}>
            <Mail className={styles["input-icon"]} />
            <label htmlFor="login-email" className={styles["sr-only"]}>Email</label>
            <input
              id="login-email"
              type="email"
              value={email}
              required
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className={`${styles["input-group"]} ${styles["password-group"]}`}>
            <Lock className={styles["input-icon"]} />
            <label htmlFor="login-password" className={styles["sr-only"]}>Password</label>
            <input
              id="login-password"
              type={showPassword ? "text" : "password"}
              value={password}
              required
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
            <button
              type="button"
              className={styles["toggle-password-btn"]}
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              tabIndex={-1}
            >
              {showPassword
                ? <EyeOff className={styles["toggle-icon"]} />
                : <Eye    className={styles["toggle-icon"]} />}
            </button>
          </div>

          {error && <p className={styles["error"]}>{error}</p>}

          <button
            type="submit"
            className={styles["login-button"]}
            disabled={loading}
          >
            {loading ? (
              <span className={styles["loader-container"]}>
                <Loader2 className={styles["spinner"]} /> Signing in…
              </span>
            ) : "Log In →"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default LoginClient;
