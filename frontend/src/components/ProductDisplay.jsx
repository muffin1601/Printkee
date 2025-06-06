// src/pages/ProductDisplay.jsx
import React, { useEffect, useState } from "react";
import { useParams , Link} from "react-router-dom";
import axios from "axios";
import "../styles/ProductDisplay.css";

const ProductDisplay = () => {
  const { category, subcategory } = useParams();
  const [products, setProducts] = useState([]);
  const [subcategoryData, setSubcategoryData] = useState({});

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/${category}/${subcategory}`)
      .then((res) => {
        setProducts(res.data.products);
        setSubcategoryData(res.data.subcategory); // fix for subcategory.tag
      })
      .catch((err) => console.error("Failed to fetch products:", err));
  }, [category, subcategory]);

  return (
    <>
    <div className="subcategory-header">
      <div className="subcategory-header-content">
        <Link to={`/${category}`} className="back-link"><div class="circle">
                  <span class="arrow">&larr;</span>
                </div><span className="span-name">Back to {category}</span></Link>
        <h1 className="page-title">{subcategory}</h1>
        <p className="subcategory-description">{subcategoryData?.tag || ''}</p>
      </div>

    </div>
    <div className="page-wrapper">
        {/* LEFT SIDEBAR */}
        <div className="sidebar">
          <h3>Filters</h3>
          <div className="filter-section">
            <strong>AVAILABILITY</strong>
            <label><input type="checkbox" /> In stock</label>
            <label><input type="checkbox" /> Out of stock</label>
          </div>

          <div className="filter-section">
            <strong>PRICE</strong>
            <p>The highest price is $20.00</p>
            <div className="price-inputs">
              <input type="number" placeholder="0" />
              <input type="number" placeholder="20.00" />
            </div>
          </div>

          <div className="filter-section">
            <strong>BRAND</strong>
            <label><input type="checkbox" /> Anker</label>
            <label><input type="checkbox" /> UTSA</label>
          </div>

          <div className="filter-section">
            <strong>COLOR</strong>
            <label><input type="checkbox" /> Black</label>
            <label><input type="checkbox" /> Blue</label>
            <label><input type="checkbox" /> Red</label>
            <label><input type="checkbox" /> White</label>
          </div>
        </div>

        {/* RIGHT PRODUCTS GRID */}
        <div className="product-container">


          <div className="product-grid">
            {products.map((product) => (
              <div key={product._id} className="product-card">
                <div className="product-image-wrapper">
                  <img src={product.image} alt={product.name} />
                  <div className="countdown-banner">
                    <span>⏱</span> <span>307 : 08 : 36 : 20</span>
                  </div>
                </div>

                <h3>{product.name}</h3>
                <div className="rating">★★★★★</div>

                <p className="price">
                  ${product.price?.singlePrice?.toFixed(2) || "20.00"}{" "}
                  <span className="original-price">$25.00</span>
                </p>

                <div className="dropdown-group">
                  {product.colour?.length > 0 && (
                    <>
                      <label>Color:</label>
                      <select>
                        {product.colour.map((c, index) => (
                          <option key={index}>{c}</option>
                        ))}
                      </select>
                    </>
                  )}
                  {product.size?.length > 0 && (
                    <>
                      <label>Style:</label>
                      <select>
                        {product.size.map((s, index) => (
                          <option key={index}>{s}</option>
                        ))}
                      </select>
                    </>
                  )}
                </div>

                <button className="add-to-cart">
                  {product.quantity === 0 ? "Sold out" : "Add to Cart"} ➤
                </button>
              </div>
            ))}
          </div>
        </div>
      </div></>
  );
};

export default ProductDisplay;
