import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { FaArrowLeft, FaHeart, FaSyncAlt, FaEye } from "react-icons/fa";
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
        setSubcategoryData(res.data.subcategory);
      })
      .catch((err) => console.error("Failed to fetch products:", err));
  }, [category, subcategory]);

  return (
    <>
      <div className="subcategory-header">
        <div className="subcategory-header-content">
          <Link to={`/${category}`} className="back-link">
            <div className="circle">
              <span className="arrow">&larr;</span>
            </div>
            <span className="span-name">Back to {category}</span>
          </Link>
          <h1 className="page-title">{subcategory}</h1>
          <p className="subcategory-description">{subcategoryData?.tag || ''}</p>
        </div>
      </div>

      <div className="page-wrapper">
        {/* Sidebar Filters */}
        <div className="sidebar">
          <h3>Filters</h3>

          <div className="filter-section">
            <div className="filter-header">
              <strong>AVAILABILITY</strong>
              <span className="reset">Reset</span>
            </div>
            <label><input type="checkbox" /> In stock</label>
            <label><input type="checkbox" /> Out of stock</label>
          </div>

          <div className="filter-section">
            <div className="filter-header">
              <strong>PRICE</strong>
              <span className="reset">Reset</span>
            </div>
            <p>The highest price is $20.00</p>
            <div className="price-inputs">
              <input type="number" placeholder="0" />
              <input type="number" placeholder="20.00" />
            </div>
          </div>

          <div className="filter-section">
            <div className="filter-header">
              <strong>BRAND</strong>
              <span className="reset">Reset</span>
            </div>
            <label><input type="checkbox" /> Anker</label>
            <label><input type="checkbox" /> UTSA</label>
          </div>

          <div className="filter-section">
            <div className="filter-header">
              <strong>COLOR</strong>
              <span className="reset">Reset</span>
            </div>
            <label><input type="checkbox" /> Black</label>
            <label><input type="checkbox" /> Blue</label>
            <label><input type="checkbox" /> Red</label>
            <label><input type="checkbox" /> White</label>
          </div>
        </div>

        {/* Product Grid */}
        <div className="product-container">
           <div className="sort-bar">
            <span>Home / {category}/ {subcategory}</span>
            <div className="sort-dropdown">
              <label>Sort by:</label>
              <select>
                <option>Best selling</option>
                <option>Price, low to high</option>
                <option>Price, high to low</option>
                <option>Alphabetically, A-Z</option>
              </select>
            </div>
          </div>

          <div className="product-grid">
            {products.map((product) => (
              <div key={product._id} className="product-card">
                <div className="product-image-wrapper">
                  <img className="product-img"src={product.image} alt={product.name} />
                  <div className="product-icons">
                    <button><FaHeart /></button>
                    <button><FaEye /></button>
                  </div>
                 
                </div>

                <h3 className="product-title">{product.name}</h3>
             

                <div className="dropdown-group">
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
                </div>

                <button className="add-to-cart" onClick={() =>
                          window.location.href = `/${encodeURIComponent(category)}/${encodeURIComponent(subcategory)}/${encodeURIComponent(product.name)}`
                        }>
                  {product.quantity === 0 ? "Sold out" : "View"} ➤
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDisplay;