import React from "react";
import styles from "./WhyChooseUsProduct.module.css";

const WhyChooseUsProduct = ({ productName, subcategoryName }) => {
  const name = productName || subcategoryName || "this product";
  const items = [
    ["Review Product Details", `Check the listed material, sizes, colours and specifications for ${name}. Ask the team to confirm any detail important to your brief.`],
    ["Discuss Branding", `Suitable branding methods depend on the product surface and artwork. Share your logo so available options can be reviewed for ${name}.`],
    ["Confirm Quantity", "Share the required quantity for your employee, client, event or promotional programme. Minimum quantities vary by item."],
    ["Plan Delivery", "Provide the required-in-hand date and destinations so production and delivery feasibility can be reviewed before confirmation."],
    ["Agree the Scope", "Confirm product selection, artwork, packaging and delivery requirements in the quotation and order approval."],
    ["Match the Use Case", `Choose ${name} when its documented specifications fit the recipient, occasion and purpose of the programme.`],
  ];
  return <section className={styles.wcupWrapper} aria-labelledby="why-choose-us-title"><h2 id="why-choose-us-title" className={styles.wcupTitle}>Planning an Order for {name}</h2><ul className={styles.wcupGrid} role="list">{items.map(([title, text]) => <li className={styles.wcupCard} key={title}><h3 className={styles.wcupCardTitle}>{title}</h3><p className={styles.wcupCardText}>{text}</p></li>)}</ul></section>;
};

export default WhyChooseUsProduct;
