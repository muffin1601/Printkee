"use client";
import React, { useCallback, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/scrollbar";
import { Download } from "lucide-react";

import styles from "../styles/Diwali.module.css";
import brandsList from "../data/brandsspl";
import { submitLead } from "../utils/submitLead";
import { hasFestiveOffer } from "../utils/product";

import DiwaliHero from "./diwali/DiwaliHero";
import DiwaliCollection from "./diwali/DiwaliCollection";
import DiwaliOfferBanner from "./diwali/DiwaliOfferBanner";

import RecentlyViewed from "./diwali/RecentlyViewed";
import Reveal from "./diwali/Reveal";
import useConfetti from "./diwali/useConfetti";
import EnquiryModal from "./EnquiryModal";

/**
 * Diwali campaign page.
 *
 * All product data arrives pre-fetched from the server component; this
 * component owns only interaction state (enquiry modal, catalogue lead
 * form). Ordering runs through the site's existing enquiry/quote flow —
 * this storefront has no cart or checkout.
 */
const DiwaliClient = ({ collections = {} }) => {
  const {
    bestsellers = [],
    personalized = [],
    family = [],
    friends = [],
    corporate = [],
    recommended = [],
  } = collections;

  /* Real offers only: products the backend actually marked down. */
  const allProducts = [
    ...bestsellers,
    ...personalized,
    ...family,
    ...friends,
    ...corporate,
    ...recommended,
  ];
  const seen = new Set();
  const offerProducts = allProducts.filter((p) => {
    if (!hasFestiveOffer(p)) return false;
    if (seen.has(p.slug)) return false;
    seen.add(p.slug);
    return true;
  });

  const fireConfetti = useConfetti();

  /* ── Enquiry (quote) modal ───────────────────────────────── */
  const [enquiry, setEnquiry] = useState(null); // null = closed

  const openEnquiry = useCallback((product) => {
    setEnquiry({
      image: product?.images?.[0]?.url || "",
      description: product?.name
        ? `Diwali enquiry for ${product.name}. Tell us your quantity and branding needs and we'll send festive pricing within 24 hours.`
        : "Tell us what you'd like to gift this Diwali and we'll send festive pricing within 24 hours.",
    });
  }, []);

  const openGeneralEnquiry = useCallback(() => openEnquiry(null), [openEnquiry]);
  const closeEnquiry = useCallback(() => setEnquiry(null), []);

  /* ── Catalogue download lead form (existing functionality) ─ */
  const [isLeadFormOpen, setIsLeadFormOpen] = useState(false);
  const [leadSubmitting, setLeadSubmitting] = useState(false);
  const [leadData, setLeadData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
  });

  const handleLeadChange = (e) =>
    setLeadData({ ...leadData, [e.target.name]: e.target.value });

  const handleLeadSubmit = async (e) => {
    e.preventDefault();
    setLeadSubmitting(true);
    const { ok } = await submitLead(leadData);
    setLeadSubmitting(false);

    if (!ok) {
      alert("Something went wrong. Please try again later.");
      return;
    }

    fireConfetti();
    alert("Thank you! Catalogue will be downloaded shortly");

    const link = document.createElement("a");
    link.href = "/catalogue.pdf";
    link.download = "Diwali_Catalogue.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setLeadData({ name: "", company: "", email: "", phone: "" });
    setIsLeadFormOpen(false);
  };

  return (
    <div className={styles.page}>
      <DiwaliHero />

      <DiwaliCollection
        id="diwali-bestsellers"
        eyebrow="Most gifted this season"
        title="Diwali Bestsellers"
        description="The festive gifts our clients reorder year after year — proven, premium and ready to brand."
        products={bestsellers}
        onEnquire={openEnquiry}
        priority
      />

      <DiwaliOfferBanner
        offerCount={offerProducts.length}
        onEnquire={openGeneralEnquiry}
      />

      <DiwaliCollection
        id="diwali-personalized"
        alt
        eyebrow="Made just for them"
        title="Personalized Diwali Gifts"
        description="Add a name, a photo or a message. Every piece is printed to order in our own facility."
        products={personalized}
        onEnquire={openEnquiry}
        moreHref="/customize"
        moreLabel="Start customising"
      />

      <DiwaliCollection
        id="diwali-family"
        eyebrow="For the people at home"
        title="Gifts for Family"
        description="Warm, useful and beautifully packaged — hampers and keepsakes the whole household will enjoy."
        products={family}
        onEnquire={openEnquiry}
      />

      <DiwaliCollection
        id="diwali-friends"
        alt
        eyebrow="For your favourite people"
        title="Gifts for Friends"
        description="Thoughtful, playful and personal — the kind of gift that gets a photo sent back."
        products={friends}
        onEnquire={openEnquiry}
      />

      <DiwaliCollection
        id="diwali-corporate"
        eyebrow="Employees, clients & partners"
        title="Corporate Diwali Gifts"
        description="Branded festive hampers at scale, with logo placement, custom packaging and pan-India dispatch."
        products={corporate}
        onEnquire={openEnquiry}
        moreHref="/contact"
        moreLabel="Talk to our gifting team"
      />

      <DiwaliCollection
        id="diwali-offers"
        alt
        eyebrow="Best festive rates"
        title="Diwali Offers"
        description="Gifts carrying special festive pricing this season. Request a quote and we'll confirm your rate against your quantity."
        products={offerProducts.slice(0, 8)}
        onEnquire={openEnquiry}
      />

      <RecentlyViewed
        fallbackProducts={recommended.length ? recommended : bestsellers}
        onEnquire={openEnquiry}
      />

      {/* ── Catalogue download (existing lead-capture flow) ── */}
      <Reveal as="section" className={styles.catalogueWrap}>
        <div className={styles.catalogue}>
          <p className={styles.eyebrow}>Full festive range</p>
          <h2 className={styles.catalogueTitle}>
            Download the Diwali Catalogue
          </h2>
          <p className={styles.catalogueSub}>
            Every hamper, gadget and branded gift in one PDF — with indicative
            bulk pricing.
          </p>
          <button
            type="button"
            className={styles.catalogueBtn}
            onClick={() => setIsLeadFormOpen(true)}
          >
            <Download size={15} aria-hidden="true" />
            Download Now
          </button>
        </div>
      </Reveal>

      {/* ── Brands (existing) ── */}
      {brandsList.length > 0 && (
        <section className={styles.brands} aria-labelledby="diwali-brands-heading">
          <div className={styles.sectionInner}>
            <Reveal as="header" className={styles.sectionHead}>
              <p className={styles.eyebrow}>Trusted labels</p>
              <h2 id="diwali-brands-heading" className={styles.sectionTitle}>
                Brands We Offer
              </h2>
            </Reveal>

            <Swiper
              modules={[Autoplay, Scrollbar]}
              spaceBetween={20}
              scrollbar={{ draggable: true }}
              slidesPerView={2}
              breakpoints={{
                480: { slidesPerView: 2 },
                640: { slidesPerView: 3 },
                768: { slidesPerView: 4 },
                1024: { slidesPerView: 5 },
                1440: { slidesPerView: 6 },
              }}
              autoplay={{ delay: 2000, pauseOnMouseEnter: true }}
              loop={brandsList.length > 6}
            >
              {brandsList.map((brand) => (
                <SwiperSlide key={brand.slug}>
                  <a
                    href={brand.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.brandCard}
                    aria-label={`Visit ${brand.name} brand page`}
                  >
                    <img
                      src={brand.logo}
                      alt={`${brand.name} brand logo`}
                      className={styles.brandLogo}
                      loading="lazy"
                      decoding="async"
                    />
                  </a>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>
      )}

      {/* ── Enquiry / quote modal — the site's real ordering flow ── */}
      <EnquiryModal
        isOpen={enquiry !== null}
        onClose={closeEnquiry}
        image={enquiry?.image}
        description={enquiry?.description}
        onSuccess={fireConfetti}
      />

      {/* ── Catalogue lead form ── */}
      {isLeadFormOpen && (
        <div
          className={styles.leadOverlay}
          role="presentation"
          onClick={() => setIsLeadFormOpen(false)}
        >
          <div
            className={styles.leadModal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="diwali-lead-heading"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 id="diwali-lead-heading" className={styles.leadTitle}>
              Get Your Free Diwali Catalogue
            </h3>
            <form onSubmit={handleLeadSubmit} className={styles.leadForm}>
              <label htmlFor="diwali-lead-name">Your Name</label>
              <input
                id="diwali-lead-name"
                type="text"
                name="name"
                value={leadData.name}
                onChange={handleLeadChange}
                placeholder="Your Name"
                required
              />

              <label htmlFor="diwali-lead-company">Company Name</label>
              <input
                id="diwali-lead-company"
                type="text"
                name="company"
                value={leadData.company}
                onChange={handleLeadChange}
                placeholder="Company Name"
              />

              <label htmlFor="diwali-lead-email">Email Address</label>
              <input
                id="diwali-lead-email"
                type="email"
                name="email"
                value={leadData.email}
                onChange={handleLeadChange}
                placeholder="Email Address"
                required
              />

              <label htmlFor="diwali-lead-phone">Phone Number</label>
              <input
                id="diwali-lead-phone"
                type="tel"
                name="phone"
                value={leadData.phone}
                onChange={handleLeadChange}
                placeholder="Phone Number"
                required
              />

              <div className={styles.leadActions}>
                <button
                  type="submit"
                  className={styles.leadSubmit}
                  disabled={leadSubmitting}
                >
                  {leadSubmitting ? "Sending…" : "Submit & Download"}
                </button>
                <button
                  type="button"
                  className={styles.leadCancel}
                  onClick={() => setIsLeadFormOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiwaliClient;
