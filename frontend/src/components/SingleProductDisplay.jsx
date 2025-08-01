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

const SingleProductDisplay = () => {
  const { category, subcategory, product } = useParams();
  const navigate = useNavigate();
  const [productData, setProductData] = useState(null);
  const [selectedStyle, setSelectedStyle] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState("");
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const slugify = (text) =>
    text
      .toLowerCase()
      .trim()
      .replace(/&/g, "and")
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/--+/g, "-");

  const formatCategory = (slug) =>
    slug
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

  const formatSubcategory = (slug) => {
    const exceptions = {
      "t-shirts": "T-Shirts",
    };
    return exceptions[slug.toLowerCase()] || formatCategory(slug);
  };

  const formatProduct = (slug) => {
    const exceptions = {
      "cotton-t-shirt": "Cotton T-Shirt",
      "polo-t-shirt": "Polo T-Shirt",
      "v-neck-t-shirt": "V-Neck T-Shirt",
      "long-sleeve-t-shirt": "Long Sleeve T-Shirt",
      "sports-t-shirt": "Sports T-Shirt",
      "raglan-t-shirt": "Raglan T-Shirt",
      "performance-t-shirt": "Performance T-Shirt",
    };
    return exceptions[slug.toLowerCase()] || formatCategory(slug);
  };

  const formattedCategory = formatCategory(category);
  const formattedSubcategory = formatSubcategory(subcategory);
  const formattedProduct = formatProduct(product);

  console.log("Formatted Category:", formattedCategory);
  console.log("Formatted Subcategory:", formattedSubcategory);  
  console.log("Formatted Product:", formattedProduct);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/${formattedCategory}/${formattedSubcategory}/${formattedProduct}`
        );
        setProductData(res.data);
        setSelectedStyle(res.data.styles?.[0] || "");
        setMainImage(res.data.image || res.data.subImages?.[0] || "");
      } catch (err) {
        console.error("Failed to fetch product", err);
      }
    };
    fetchProduct();
  }, [formattedCategory, formattedSubcategory, formattedProduct]);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/related-products/${formattedCategory}/${formattedSubcategory}/${formattedProduct}`
        );
        setRelatedProducts(res.data);
      } catch (err) {
        console.error("Failed to fetch related products", err);
      }
    };
    fetchRelatedProducts();
  }, [formattedCategory, formattedSubcategory, formattedProduct]);

  if (!productData) return <div>Loading...</div>;

  return (
    <>
      <div className="single-product-page">
        <div className="single-product-container">
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

          <div className="product-left">
            <button
              className="back-button"
              onClick={() =>
                window.history.length > 2
                  ? navigate(-1)
                  : navigate(`/${category}/${subcategory}`)
              }
            >
              <FaChevronLeft /> Back to {formattedSubcategory}
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
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                  -
                </button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
            </div>

            <div className="cart-buttons">
              <button className="add-to-cart" onClick={() => navigate(`/personalize/${category}/${subcategory}/${product}`)}>
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

        <ProductOverview subcategory={subcategory} productData={productData} />

        {relatedProducts.length > 0 && (
          <div className="related-products-section">
            <h2 className="related-title">You May Also Like</h2>
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
              className="related-swiper"
            >
              {relatedProducts.map((relProd, i) => (
                <SwiperSlide key={i}>
                  <div
                    className="related-product-card"
                    onClick={() =>
                      navigate(
                        `/${category}/${subcategory}/${slugify(relProd.name)}`
                      )
                    }
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
          </div>
        )}
      </div>
      <EnquiryModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
};

export default SingleProductDisplay;
