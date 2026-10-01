"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../styles/WhyChooseUs.module.css";
import { Truck, Leaf, BadgeCheck, Users, ClipboardList } from "lucide-react";

const features = [
  { icon: Users, title: "Requirement-Led Selection", subtitle: "Products matched to your programme", content: "Share the audience, occasion, quantity and branding requirement so the team can help narrow the available merchandise and gifting options." },
  { icon: Truck, title: "Pan-India Enquiries", subtitle: "Delivery requirements reviewed before confirmation", content: "Feasibility and timing depend on the product, quantity, customization and destination and should be confirmed in the quotation." },
  { icon: BadgeCheck, title: "Custom Branding", subtitle: "Artwork options vary by product", content: "Discuss logo application for apparel, bags, stationery, technology accessories and corporate gifts. Available methods depend on the product and artwork." },
  { icon: ClipboardList, title: "Bulk Order Quotations", subtitle: "Pricing based on the selected requirement", content: "Request a quotation for client gifting, employee programmes, event merchandise or promotional campaigns. Pricing is confirmed for the chosen scope." },
  { icon: Leaf, title: "Material-Led Options", subtitle: "Review the documented product material", content: "Explore products described by their supplied materials, including bamboo, jute, cork and recycled-content stationery. Confirm details for the exact item before ordering." },
];

export default function WhyChooseUs() {
  const router = useRouter();
  const [showPopup, setShowPopup] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const handleProceed = () => {
    const routes = { "Polo T-Shirt": "/customize/polotshirt", "Round Neck T-Shirt": "/customize/roundneck", Cap: "/customize/cap" };
    if (!routes[selectedOption]) return;
    router.push(routes[selectedOption]);
    setShowPopup(false);
  };
  return <section className={styles.whychooseSection} aria-labelledby="whychoose-heading">
    <div className={styles.whychooseInner}><div className={styles.whychooseLayout}>
      <div className={styles.whychooseLeft}><span className={styles.whychooseEyebrow}>WHY CHOOSE PRINTKEE</span><h2 id="whychoose-heading" className={styles.whychooseHeading}>Plan branded merchandise around your brief</h2><div className={styles.whychooseAccentLine} aria-hidden="true" /></div>
      <section className={styles.whychooseGrid} aria-label="How Printkee supports an enquiry">{features.map(({ icon: Icon, title, subtitle, content }) => <article className={styles.whychooseCard} key={title}><div className={styles.icon}><Icon size={52} aria-hidden="true" /></div><h3 className={styles.cardTitle}>{title}</h3><p className={styles.cardSubtitle}>{subtitle}</p><p className={styles.cardContent}>{content}</p></article>)}</section>
    </div></div>
    <button className={styles.whychooseCta} onClick={() => setShowPopup(true)}>Start Customizing <span className={styles.arrow1}>→</span></button>
    {showPopup && <div className={styles.popupOverlay} role="dialog" aria-modal="true" aria-labelledby="popup-title"><div className={styles.popup}><h4 id="popup-title">What would you like to customize?</h4><label htmlFor="wcu-customize-select" className={styles.visuallyHidden}>Choose an item</label><select id="wcu-customize-select" value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}><option value="">Select an option</option><option>Polo T-Shirt</option><option>Round Neck T-Shirt</option><option>Cap</option></select><div className={styles.popupButtons}><button onClick={handleProceed} disabled={!selectedOption}>Proceed</button><button className={styles.cancelBtn2} onClick={() => setShowPopup(false)}>Cancel</button></div></div></div>}
  </section>;
}
