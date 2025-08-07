import React from "react";
import "../styles/Industries.css";
import { Building2, GraduationCap, Briefcase, Stethoscope, Globe, Rocket } from "lucide-react";

const industries = [
  { icon: <Building2 size={52} />, title: "IT Companies" },
  { icon: <Rocket size={52} />, title: "Startups" },
  { icon: <Globe size={52} />, title: "Automobile" },
  { icon: <GraduationCap size={52} />, title: "Education" },
  { icon: <Stethoscope size={52} />, title: "Healthcare" },
  { icon: <Briefcase size={52} />, title: "Corporate Offices" }
];

const Industries = () => {
  return (
    <div className="industries-section-full">
    <section className="industries-section">
      <h2 className="industries-heading">Industries We Serve</h2>
      <div className="industries-grid">
        {industries.map((industry, index) => (
          <div className="industry-card" key={index}>
            <div className="industry-icon">{industry.icon}</div>
            <p>{industry.title}</p>
          </div>
        ))}
      </div>
      <button className="industries-cta" onClick={() => window.location.href = '/contact' }>Talk to Gifting Expert<span className="arrow-1">→</span></button>
    </section>
    
    </div>
  );
};

export default Industries;
