import React, { useEffect, useState } from "react";
import "../styles/SingleProductDisplay.css";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaChevronLeft } from "react-icons/fa";
import { MdRequestQuote } from "react-icons/md";
import EnquiryModal from "./EnquiryModal";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import ProductOverview from "./ProductOverview";
import { Helmet } from "react-helmet";

const SingleProductDisplay = () => {
  const { category: categorySlug, subcategory: subcategorySlug, product: productSlug } = useParams();
  const navigate = useNavigate();

  const [productData, setProductData] = useState(null);
  const [subcategoryData, setSubcategoryData] = useState(null);
  const [categoryData, setCategoryData] = useState(null);
  const [selectedStyle, setSelectedStyle] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState("");
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // fetch product by slugs
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/product/product-fetch/${categorySlug}/${subcategorySlug}/${productSlug}`
        );


        setCategoryData(res.data.category);
        setSubcategoryData(res.data.subcategory);
        setProductData(res.data.product);

        setSelectedStyle(res.data.product.styles?.[0] || "");
        setMainImage(res.data.product.image || res.data.product.subImages?.[0] || "");
      } catch (err) {
        console.error("Failed to fetch product", err);
      }
    };
    fetchProduct();
  }, [categorySlug, subcategorySlug, productSlug]);

  // fetch related products
  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/product/related-products/${categorySlug}/${subcategorySlug}/${productSlug}`
        );
        setRelatedProducts(res.data);
      } catch (err) {
        console.error("Failed to fetch related products", err);
      }
    };
    fetchRelatedProducts();
  }, [categorySlug, subcategorySlug, productSlug]);

  if (!productData || !subcategoryData || !categoryData) return <div>Loading...</div>;

  return (
    <>
      {/* SEO Meta Title and Description */}
      <Helmet>
        <title>{`${productData.name} | ${subcategoryData.name} - MF Global Services`}</title>
        <meta
          name="description"
          content={
            productData.description
              ? productData.description.slice(0, 150)
              : `Explore ${productData.name}, a top pick from our ${subcategoryData.name} collection at MF Global Services.`
          }
        />
      </Helmet>

      <div className="single-product-page">
        <div className="single-product-container">
          {/* IMAGE SECTION */}
          <div className="product-right">
            <div className="image-section">
              {productData.subImages?.length > 0 && (
                <div className="thumbnail-column">
                  {productData.subImages.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt={`Thumbnail ${i}`}
                      className={`thumbnail ${mainImage === img ? "active" : ""}`}
                      onClick={() => setMainImage(img)}
                    />
                  ))}
                </div>
              )}
              <div className="main-image-wrapper">
                <img
                  src={mainImage || "/default-image.jpg"}
                  alt="Main Product"
                  className="main-image"
                />
              </div>
            </div>
          </div>

          {/* PRODUCT DETAILS */}
          <div className="product-left">
            <button
              className="back-button-2"
              onClick={() =>
                window.history.length > 2
                  ? navigate(-1)
                  : navigate(`/${categorySlug}/${subcategorySlug}`)
              }
            >
              <FaChevronLeft /> Back to {subcategoryData.name}
            </button>

            <h1 className="product-title-1">{productData.name}</h1>

            <h3 className="description-title">Description:</h3>
            <p className="product-description">{productData.description}</p>

            {productData.styles?.length > 0 && (
              <div className="style-section">
                <label>Style:</label>
                <div className="style-buttons">
                  {productData.styles.map((style) => (
                    <button
                      key={style}
                      className={selectedStyle === style ? "active" : ""}
                      onClick={() => setSelectedStyle(style)}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="quantity-section">
              <label>Quantity:</label>
              <div className="quantity-controls">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
            </div>

            <div className="cart-buttons">
              <button
                className="add-to-cart-2"
                onClick={() => {
                  let route = "/customize";
                  if (subcategorySlug === "polo-t-shirts") route = "/customize/polotshirt";
                  if (subcategorySlug === "round-neck-t-shirts") route = "/customize/roundneck";
                  if (subcategorySlug === "caps") route = "/customize/cap";

                  navigate(route, {
                    state: {
                      productName: productData.name,
                      productImages: [productData.image, ...(productData.subImages || [])],
                      subcategory: subcategoryData.name,
                    },
                  });
                }}
              >
                Customize Now
              </button>
              <button
                className="get-quote"
                onClick={() => setShowModal(true)}
                aria-label="Request a Quote"
              >
                Get a Quote <MdRequestQuote />
              </button>
            </div>
          </div>
        </div>

        <ProductOverview subcategory={subcategoryData.slug} productData={productData} />


        {relatedProducts.length > 0 && (
          <div className="related-products-section">
            <h2 className="related-title">You May Also Like</h2>
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={20}
              slidesPerView={2}
              navigation
              pagination={{ clickable: true, el: ".custom-pagination" }}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              breakpoints={{
                640: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
              }}
              className="related-swiper"
            >
              {relatedProducts.map((relProd, i) => (
                <SwiperSlide key={i}>
                  <div
                    className="related-product-card"
                    onClick={() => {
                      navigate(`/${categorySlug}/${subcategorySlug}/${relProd.slug}`);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  >
                    <img
                      loading="lazy"
                      src={relProd.image}
                      alt={relProd.name}
                      className="related-product-image"
                    />
                    <p className="related-product-name">{relProd.name}</p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="custom-pagination"></div>
          </div>
        )}
      </div>

      <EnquiryModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        image={productData.image}
        description={`Get a personalized quote for ${productData.name}. Our team is here to assist you!`}
      />

    </>
  );
};

export default SingleProductDisplay;
