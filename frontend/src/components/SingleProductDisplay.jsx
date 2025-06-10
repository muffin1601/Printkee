import React, { useEffect, useState } from "react";
import "../styles/SingleProductDisplay.css";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaShareAlt, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FaScissors as FaScissorsAlt } from "react-icons/fa6";

const SingleProductDisplay = () => {
  const { category, subcategory, product } = useParams();
  const navigate = useNavigate();
  const [productData, setProductData] = useState(null);
  const [selectedStyle, setSelectedStyle] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/${category}/${subcategory}/${product}`
        );
        setProductData(response.data);

        if (response.data.styles?.length > 0) {
          setSelectedStyle(response.data.styles[0]);
        }

        if (response.data.image) {
          setMainImage(response.data.image);
        }
      } catch (err) {
        console.error("Failed to fetch product", err);
      }
    };

    fetchProduct();
  }, [category, subcategory, product]);

  if (!productData) return <div>Loading...</div>;

  return (
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
            <img src={mainImage} alt="Main Product" className="main-image" />
          </div>
        </div>
      </div>

      <div className="product-left">
        <button className="back-button" onClick={() => navigate(-1)}>
          <FaChevronLeft /> Back to {subcategory}
        </button>

        <h1 className="product-title-1">{productData.name}</h1>

        <h3 className="description-title">Description:</h3>
        <p className="product-description">{productData.description}</p>

      
        {/* Style Options */}
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

        {/* Quantity Controls */}
        <div className="quantity-section">
          <label>Quantity:</label>
          <div className="quantity-controls">
            <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity(quantity + 1)}>+</button>
          </div>
        </div>

        {/* Cart Button */}
        <div className="cart-buttons">
          <button className="add-to-cart">
            Customize <FaChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleProductDisplay;
