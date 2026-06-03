"use client";
import React, { useState, useEffect } from "react";
import styles from "../styles/SingleProductDisplay.module.css";
import { useParams, useRouter } from "next/navigation";
import { FaChevronLeft } from "react-icons/fa";
import { MdRequestQuote } from "react-icons/md";
import EnquiryModal from "./EnquiryModal";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import WhyChooseUsProduct from "./category/WhyChooseUsProduct";
import ProductFAQ from "./category/FAQProduct";

const SingleProductDisplay = ({
  productData,
  subcategoryData,
  categoryData,
  relatedProducts = [],
}) => {
  const { category: categorySlug, subcategory: subcategorySlug } = useParams();
  const router = useRouter();

  const [selectedStyle, setSelectedStyle] = useState(
    productData?.attributes?.size?.[0] || ""
  );
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(
    productData?.images?.[0]?.url || productData?.subImages?.[0]?.url || ""
  );
  const [showModal, setShowModal] = useState(false);

  /* Sync image/style when productData prop changes (e.g. navigation) */
  useEffect(() => {
    if (!productData) return;
    setSelectedStyle(productData.attributes?.size?.[0] || "");
    setMainImage(
      productData.images?.[0]?.url || productData.subImages?.[0]?.url || ""
    );
  }, [productData]);

  if (!productData || !subcategoryData || !categoryData) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <p>Unable to load product. Please ensure the backend is running.</p>
      </div>
    );
  }

  return (
    <>
      <div className={styles["single-product-page"]}>
        <div className={styles["single-product-container"]}>

          {/* PRODUCT IMAGES */}
          <div className={styles["product-right"]}>
            <div className={styles["image-section"]}>
              {productData.subImages?.length > 0 && (
                <div className={styles["thumbnail-column"]}>
                  {productData.subImages.map((img, i) => (
                    <img
                      key={i}
                      src={img.url}
                      loading="lazy"
                      alt={img.altText || productData.name}
                      className={`${styles.thumbnail} ${mainImage === img.url ? styles.active : ""}`}
                      onClick={() => setMainImage(img.url)}
                    />
                  ))}
                </div>
              )}

              <div className={styles["main-image-wrapper"]}>
                <img
                  src={mainImage}
                  alt={productData.images?.[0]?.altText || productData.name}
                  className={styles["main-image"]}
                />
              </div>
            </div>
          </div>

          {/* PRODUCT DETAILS */}
          <div className={styles["product-left"]}>
            <button
              className={styles["back-button-2"]}
              onClick={() =>
                window.history.length > 2
                  ? router.back()
                  : router.push(`/${categorySlug}/${subcategorySlug}`)
              }
            >
              <FaChevronLeft /> Back to {subcategoryData.name}
            </button>

            <h1 className={styles["product-title-1"]}>{productData.name}</h1>

            <h3 className={styles["description-title"]}>Description:</h3>
            <p className={styles["product-description"]}>{productData.description?.long}</p>

            {/* STYLES */}
            {productData.attributes?.size?.length > 0 && (
              <div className={styles["style-section"]}>
                <label>Style:</label>
                <div className={styles["style-buttons"]}>
                  {productData.attributes.size.map((style) => (
                    <button
                      key={style}
                      className={selectedStyle === style ? styles.active : ""}
                      onClick={() => setSelectedStyle(style)}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* QUANTITY */}
            <div className={styles["quantity-section"]}>
              <label>Quantity:</label>
              <div className={styles["quantity-controls"]}>
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
            </div>

            {/* CTA */}
            <div className={styles["cart-buttons"]}>
              <button
                className={styles["add-to-cart-2"]}
                onClick={() => {
                  let route = "/customize";
                  if (subcategorySlug === "polo-t-shirts") route = "/customize/polotshirt";
                  if (subcategorySlug === "round-neck-t-shirts") route = "/customize/roundneck";
                  if (subcategorySlug === "caps") route = "/customize/cap";
                  sessionStorage.setItem(
                    "customizerState",
                    JSON.stringify({
                      productName: productData.name,
                      productImages: [
                        productData.images?.[0]?.url,
                        ...(productData.subImages?.map((img) => img.url) || []),
                      ],
                      subcategory: subcategoryData.name,
                    })
                  );
                  router.push(route);
                }}
              >
                Customize Now
              </button>

              <button className={styles["get-quote"]} onClick={() => setShowModal(true)}>
                Get a Quote <MdRequestQuote />
              </button>
            </div>
          </div>
        </div>

        {/* SPECIFICATIONS */}
        <div className={styles["product-spec-section"]}>
          <h3 className={styles["spec-title"]}>Product Specifications</h3>
          <table className={styles["spec-table"]}>
            <tbody>
              {productData.sku && (
                <tr><td>SKU</td><td>{productData.sku}</td></tr>
              )}
              {productData.attributes?.material && (
                <tr><td>Material</td><td>{productData.attributes.material}</td></tr>
              )}
              {productData.attributes?.size?.length > 0 && (
                <tr>
                  <td>Available Sizes</td>
                  <td>{productData.attributes.size.join(", ")}</td>
                </tr>
              )}
              {productData.attributes?.color?.length > 0 && (
                <tr>
                  <td>Available Colours</td>
                  <td>{productData.attributes.color.join(", ")}</td>
                </tr>
              )}
              {productData.additionalInfo?.length > 0 &&
                productData.additionalInfo.map((info, i) => (
                  <tr key={`add-${i}`}><td>{info.label}</td><td>{info.value}</td></tr>
                ))}
              {productData.specifications?.length > 0 &&
                productData.specifications.map((spec, i) => (
                  <tr key={`spec-${i}`}><td>{spec.key}</td><td>{spec.value}</td></tr>
                ))}
            </tbody>
          </table>
        </div>

        <WhyChooseUsProduct
          productName={productData.name}
          subcategoryName={subcategoryData.name}
        />

        {/* RELATED PRODUCTS */}
        {relatedProducts.length > 0 && (
          <div className={styles["related-products-section"]}>
            <h2 className={styles["related-title"]}>You May Also Like</h2>
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={20}
              slidesPerView={2}
              navigation
              pagination={{ clickable: true }}
              breakpoints={{
                640: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
              }}
            >
              {relatedProducts.map((relProd, i) => (
                <SwiperSlide key={i}>
                  <button
                    className={styles["related-product-card"]}
                    onClick={() => {
                      router.push(
                        `/${categorySlug}/${subcategorySlug}/${relProd.slug}`
                      );
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  >
                    <img
                      src={relProd.images?.[0]?.url}
                      alt={relProd.name}
                      className={styles["related-product-image"]}
                    />
                    <p className={styles["related-product-name"]}>{relProd.name}</p>
                  </button>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </div>

      <ProductFAQ
        productName={productData.name}
        subcategoryName={subcategoryData.name}
        categoryName={categoryData.name}
      />

      <EnquiryModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        image={productData.images?.[0]?.url}
        description={`Get a personalized quote for ${productData.name}.`}
      />
    </>
  );
};

export default SingleProductDisplay;
