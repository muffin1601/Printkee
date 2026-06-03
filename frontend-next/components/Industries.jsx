"use client";
import React from "react";
import styles from "../styles/Industries.module.css";
import {
  Building2,
  GraduationCap,
  Briefcase,
  Stethoscope,
  Globe,
  Rocket,
} from "lucide-react";

const industries = [
  { icon: <Building2 size={52} aria-hidden="true" />, title: "IT Companies" },
  { icon: <Rocket size={52} aria-hidden="true" />, title: "Startups" },
  { icon: <Globe size={52} aria-hidden="true" />, title: "Automobile" },
  { icon: <GraduationCap size={52} aria-hidden="true" />, title: "Education" },
  { icon: <Stethoscope size={52} aria-hidden="true" />, title: "Healthcare" },
  { icon: <Briefcase size={52} aria-hidden="true" />, title: "Corporate Offices" },
];

const Industries = () => {
  return (
    <section
      className={styles["industries-section-full"]}

      aria-labelledby="industries-heading"
    >
      <div className={styles["industries-section"]}>
        <h2 className={styles["industries-heading"]} id="industries-heading">
          Industries We Serve
        </h2>

        <div className={styles["industries-grid"]}>
          {industries.map((industry, index) => (
            <div
              className={styles["industry-card"]}
              key={index}

              aria-label={industry.title}
            >
              <div className={styles["industry-icon"]}>{industry.icon}</div>
              <p className={styles["industry-title"]}>{industry.title}</p>
            </div>
          ))}
        </div>

        <button
          className={styles["industries-cta"]}
          aria-label="Talk to a gifting expert"
          onClick={() => (window.location.href = "/contact")}
        >
          Talk to Gifting Expert <span aria-hidden="true">→</span>
        </button>
      </div>
    </section>
  );
};

export default Industries;
