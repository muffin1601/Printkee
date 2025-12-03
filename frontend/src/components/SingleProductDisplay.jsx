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
import { Helmet } from "react-helmet";
import WhyChooseUsProduct from "./category/WhyChooseUsProduct";
import ProductFAQ from "./category/FAQProduct";

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

  const canonicalUrl = `https://printkee.com/${categorySlug}/${subcategorySlug}/${productSlug}`;

  // Fetch product
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

  // Fetch related products
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
      {/* SEO */}
      <Helmet>
        <title>{`${productData.name} | ${subcategoryData.name} - MF Global Services`}</title>
        <meta
          name="description"
          content={
            productData.description
              ? productData.description.slice(0, 150)
              : `Explore premium ${productData.name} from our ${subcategoryData.name} range.`
          }
        />
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>

      <div className="single-product-page">
        <div className="single-product-container">

          {/* PRODUCT IMAGES */}
          <div className="product-right">
            <div className="image-section">

              {productData.subImages?.length > 0 && (
                <div className="thumbnail-column">
                  {productData.subImages.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      loading="lazy"
                      alt={`${productData.name} - additional view ${i + 1}`}
                      className={`thumbnail ${mainImage === img ? "active" : ""}`}
                      onClick={() => setMainImage(img)}
                    />
                  ))}
                </div>
              )}

              <div className="main-image-wrapper">
                <img
                  src={mainImage}
                  alt={`${productData.name} main product image`}
                  className="main-image"
                />
              </div>
            </div>
          </div>

          {/* PRODUCT DETAILS */}
          <div className="product-left">

            <button
              className="back-button-2"
              aria-label={`Go back to ${subcategoryData.name}`}
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

            {/* STYLES */}
            {productData.styles?.length > 0 && (
              <div className="style-section">
                <label>Style:</label>
                <div className="style-buttons">
                  {productData.styles.map((style) => (
                    <button
                      key={style}
                      aria-pressed={selectedStyle === style}
                      className={selectedStyle === style ? "active" : ""}
                      onClick={() => setSelectedStyle(style)}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* QUANTITY */}
            <div className="quantity-section">
              <label htmlFor="qty">Quantity:</label>
              <div className="quantity-controls">
                <button
                  aria-label="Decrease quantity"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </button>
                <span id="qty">{quantity}</span>
                <button
                  aria-label="Increase quantity"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>

            {/* CTA BUTTONS */}
            <div className="cart-buttons">
              <button
                className="add-to-cart-2"
                aria-label={`Customize ${productData.name}`}
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
                aria-label="Request a quote"
                onClick={() => setShowModal(true)}
              >
                Get a Quote <MdRequestQuote />
              </button>
            </div>
          </div>
        </div>

        {/* PRODUCT SPECIFICATIONS */}
        <div className="product-spec-section">
          <h3 className="spec-title">Product Specifications</h3>

          <table className="spec-table">
            <tbody>
              {productData.productCode && (
                <tr><td>Product Code</td><td>{productData.productCode}</td></tr>
              )}
              {productData.SKU && (
                <tr><td>SKU</td><td>{productData.SKU}</td></tr>
              )}
              {productData.brand && (
                <tr><td>Brand</td><td>{productData.brand}</td></tr>
              )}
              {productData.fabricType && (
                <tr><td>Fabric Type</td><td>{productData.fabricType}</td></tr>
              )}
              {productData.size?.length > 0 && (
                <tr><td>Available Sizes</td><td>{productData.size.join(", ")}</td></tr>
              )}
              {productData.colour?.length > 0 && (
                <tr><td>Available Colours</td><td>{productData.colour.join(", ")}</td></tr>
              )}
              {productData.weight && (
                <tr><td>Weight</td><td>{productData.weight} g</td></tr>
              )}
              {(productData.dimensions?.length ||
                productData.dimensions?.width ||
                productData.dimensions?.height) && (
                <tr>
                  <td>Dimensions</td>
                  <td>
                    {productData.dimensions.length} × {productData.dimensions.width} ×{" "}
                    {productData.dimensions.height} cm
                  </td>
                </tr>
              )}
              {productData.HSNCode && (
                <tr><td>HSN Code</td><td>{productData.HSNCode}</td></tr>
              )}
              {productData.GSTRate && (
                <tr><td>GST Rate</td><td>{productData.GSTRate}%</td></tr>
              )}
              {productData.minOrderQty && (
                <tr><td>Minimum Order Quantity</td><td>{productData.minOrderQty}</td></tr>
              )}
              {productData.maxOrderQty && (
                <tr><td>Maximum Order Quantity</td><td>{productData.maxOrderQty}</td></tr>
              )}
            </tbody>
          </table>
        </div>

        <WhyChooseUsProduct
          productName={productData.name}
          subcategoryName={subcategoryData.name}
        />

        {/* RELATED PRODUCTS */}
        {relatedProducts.length > 0 && (
          <div className="related-products-section">
            <h2 className="related-title">You May Also Like</h2>

            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={20}
              slidesPerView={2}
              navigation
              pagination={{ clickable: true, el: ".custom-pagination" }}
              autoplay={{ delay: 3000 }}
              breakpoints={{
                640: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
              }}
              className="related-swiper"
            >
              {relatedProducts.map((relProd, i) => (
                <SwiperSlide key={i}>
                  <button
                    className="related-product-card"
                    aria-label={`View product ${relProd.name}`}
                    onClick={() => {
                      navigate(`/${categorySlug}/${subcategorySlug}/${relProd.slug}`);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  >
                    <img
                      loading="lazy"
                      src={relProd.image}
                      alt={`${relProd.name} product image`}
                      className="related-product-image"
                    />
                    <p className="related-product-name">{relProd.name}</p>
                  </button>
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="custom-pagination"></div>
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
        image={productData.image}
        description={`Get a personalized quote for ${productData.name}. Our team is here to assist you!`}
      />
    </>
  );
};

export default SingleProductDisplay;
