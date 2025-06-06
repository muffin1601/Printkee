import React, { useEffect, useState } from "react";
import "../styles/SingleProductDisplay.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaShareAlt, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FaScissors as FaScissorsAlt } from "react-icons/fa6";

const SingleProductDisplay = () => {
  const { category, subcategory, product } = useParams();
  const [productData, setProductData] = useState(null);
  const [selectedStyle, setSelectedStyle] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/${category}/${subcategory}/${product}`
        );
        setProductData(response.data);

        if (response.data.styles && response.data.styles.length > 0) {
          setSelectedStyle(response.data.styles[0]);
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
      <div className="product-left">
        <button className="back-button">
          <FaChevronLeft /> Back to category
        </button>

        <div className="product-rating">
          {productData.brand} ☆☆☆☆☆ · Write a Review
        </div>

        <h1 className="product-title">{productData.name}</h1>

        <h3 className="description-title">Description:</h3>
        <p className="product-description">{productData.description}</p>

        <div className="product-actions">
          <span>
            <FaScissorsAlt /> See Sizing Guide
          </span>
          <span>
            <FaShareAlt /> Share
          </span>
        </div>

        <div className="style-section">
          <label>Style:</label>
          <div className="style-buttons">
            {productData.styles?.map((style) => (
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

        <div className="quantity-section">
          <label>Quantity :</label>
          <div className="quantity-controls">
            <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity(quantity + 1)}>+</button>
          </div>
        </div>

        <div className="price-section">
          <span className="new-price">${productData.price?.toFixed(2)}</span>
          <span className="old-price">${productData.oldPrice?.toFixed(2)}</span>
        </div>

        <div className="cart-buttons">
          <button className="add-to-cart">
            Add to Cart <FaChevronRight />
          </button>
          <button className="buy-now">Buy it now</button>
        </div>
      </div>

          <div className="product-right">
              {productData.image && (
                  <img
                      src={productData.image}
                      alt="Main Product"
                      className="main-image"
                  />
              )}

              {productData.subImages && productData.subImages.length > 0 && (
                  <div className="thumbnail-row">
                      {productData.subImages.map((img, i) => (
                          <img
                              key={i}
                              src={img}
                              alt={`Thumbnail ${i}`}
                              className="thumbnail"
                          />
                      ))}
                  </div>
              )}
          </div>
    </div>
  );
};

export default SingleProductDisplay;
