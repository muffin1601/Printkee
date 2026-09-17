"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check, MessageSquareQuote } from "lucide-react";
import EnquiryModal from "../EnquiryModal";
import styles from "../../styles/DiwaliHamperProduct.module.css";

export default function DiwaliHamperProduct({ hamper }) {
  const gallery = hamper.gallery?.length ? hamper.gallery : [hamper.image];
  const [selectedImage, setSelectedImage] = useState(gallery[0]);
  const [enquiryOpen, setEnquiryOpen] = useState(false);

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <Link href="/diwali-special#diwali-catalogue" className={styles.backLink}>
          <ArrowLeft size={16} aria-hidden="true" /> Back to Diwali hampers
        </Link>

        <section className={styles.product} aria-labelledby="hamper-name">
          <div className={styles.gallery}>
            <div className={styles.mainImageWrap}>
              <img
                className={styles.mainImage}
                src={selectedImage}
                alt={hamper.name}
                width="1600"
                height="1600"
              />
            </div>
            {gallery.length > 1 && (
              <div className={styles.thumbnails} aria-label="Hamper images">
                {gallery.map((image, index) => (
                  <button
                    key={image}
                    type="button"
                    className={`${styles.thumbnail} ${
                      selectedImage === image ? styles.thumbnailActive : ""
                    }`}
                    onClick={() => setSelectedImage(image)}
                    aria-label={`Show image ${index + 1} of ${hamper.name}`}
                    aria-pressed={selectedImage === image}
                  >
                    <img src={image} alt="" width="120" height="120" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className={styles.details}>
            <p className={styles.eyebrow}>Diwali 2026 · Corporate gifting</p>
            <h1 id="hamper-name">{hamper.name}</h1>
            <p className={styles.description}>{hamper.description}</p>

            <div className={styles.enquiryBox}>
              <p className={styles.priceLabel}>Price on enquiry</p>
              <p>Tell us your quantity and branding requirements for a tailored bulk quote.</p>
              <button
                type="button"
                className={styles.enquiryButton}
                onClick={() => setEnquiryOpen(true)}
              >
                <MessageSquareQuote size={18} aria-hidden="true" />
                Get price on enquiry
              </button>
            </div>

            <div className={styles.contents}>
              <h2>What&apos;s inside</h2>
              <ul>
                {hamper.specifications.map((item) => (
                  <li key={item}>
                    <Check size={16} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <p className={styles.note}>
              Ideal for employee, client and corporate Diwali gifting. Custom branding and bulk quantities are available on request.
            </p>
          </div>
        </section>
      </div>

      <EnquiryModal
        isOpen={enquiryOpen}
        onClose={() => setEnquiryOpen(false)}
        image={hamper.image}
        description={`Diwali 2026 price enquiry for ${hamper.name}. Tell us your quantity and branding needs and we'll send festive pricing within 24 hours.`}
      />
    </main>
  );
}
