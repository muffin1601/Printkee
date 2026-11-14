"use client";
import React, { useCallback, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/scrollbar";

import styles from "../styles/NewYear2027.module.css";
import brandsList from "../data/brandsspl";
import newYear2027Products, {
  newYear2027Categories,
} from "../data/new-year-2027-products";

import DiwaliHero from "./diwali/DiwaliHero";
import DiwaliOfferBanner from "./diwali/DiwaliOfferBanner";
import DiwaliCatalogueGrid from "./diwali/DiwaliCatalogueGrid";

import useConfetti from "./diwali/useConfetti";
import EnquiryModal from "./EnquiryModal";

const NewYear2027Client = () => {
  const fireConfetti = useConfetti();

  const [enquiry, setEnquiry] = useState(null); // null = closed

  const openEnquiry = useCallback((product) => {
    setEnquiry({
      image: product?.image || "",
      description: product?.name
        ? `New Year 2027 gifting enquiry for ${product.name}${
            product.sku ? ` (${product.sku})` : ""
          }. Tell us your quantity and branding needs and we'll prepare a tailored corporate gifting quote.`
        : "Tell us about your New Year 2027 corporate gifting plans and we'll prepare a tailored quote.",
    });
  }, []);
  const openGeneralEnquiry = useCallback(() => openEnquiry(null), [openEnquiry]);
  const closeEnquiry = useCallback(() => setEnquiry(null), []);

  return (
    <div className={styles.page}>
      <DiwaliHero products={newYear2027Products} onQuote={openGeneralEnquiry} />

      <DiwaliCatalogueGrid
        products={newYear2027Products}
        categories={newYear2027Categories}
        onEnquire={openEnquiry}
      />

      <DiwaliOfferBanner
        productCount={newYear2027Products.length}
        onEnquire={openGeneralEnquiry}
      />

      {brandsList.length > 0 && (
        <section className={styles.brands} aria-labelledby="new-year-brands-heading">
          <div className={styles.sectionInner}>
            <header className={styles.sectionHead}>
              <p className={styles.eyebrow}>Trusted labels</p>
              <h2 id="new-year-brands-heading" className={styles.sectionTitle}>
                Brands We Offer
              </h2>
            </header>

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

      <EnquiryModal
        isOpen={enquiry !== null}
        onClose={closeEnquiry}
        image={enquiry?.image}
        description={enquiry?.description}
        onSuccess={fireConfetti}
      />
    </div>
  );
};

export default NewYear2027Client;
