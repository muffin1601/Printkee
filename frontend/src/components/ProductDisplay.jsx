import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import axios from "axios";
import { FaHeart, FaEye } from "react-icons/fa";
import "../styles/ProductDisplay.css";
import CTABanner from "./CTABanner";
import RelatedCategories from "./RelatedCategories";
import FAQSection from "./FAQSection";
import BottomCategoryDescription from "./BottomCategoryDescription";

const ProductDisplay = () => {
  const { category, subcategory } = useParams();
  const [products, setProducts] = useState([]);
  const [subcategoryData, setSubcategoryData] = useState({});

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
      "round-neck-t-shirts": "Round Neck T-Shirts",
      "polo-t-shirts": "Polo T-Shirts",
    };
    return exceptions[slug.toLowerCase()] || formatCategory(slug);
  };

  const formattedCategory = formatCategory(category);
  const formattedSubcategory = formatSubcategory(subcategory);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/${formattedCategory}/${formattedSubcategory}`)
      .then((res) => {
        setProducts(res.data.products);
        setSubcategoryData(res.data.subcategory);
      })
      .catch((err) => console.error("Failed to fetch products:", err));
  }, [category, subcategory]);

  return (
    <>
      <Helmet>
        <title>{`${formattedSubcategory} | ${formattedCategory} - MF Global Services`}</title>
        <meta
          name="description"
          content={
            subcategoryData?.tag
              ? subcategoryData.tag.replace(/\n/g, " ")
              : `Explore ${formattedSubcategory} under ${formattedCategory} at MF Global Services. Discover custom branded gifts for every need.`
          }
        />
      </Helmet>

      <div className="subcategory-header">
        <div className="subcategory-header-content">
          <Link to={`/${category}`} className="back-link">
            <div className="circle">
              <span className="arrow-2">&larr;</span>
            </div>
            <span className="span-name">Back to {formattedCategory}</span>
          </Link>
          <h1 className="page-title">{formattedSubcategory}</h1>
          <p className="subcategory-description">{subcategoryData?.tag || ""}</p>
        </div>
      </div>

      <div className="product-container-2">
        <div className="page-wrapper">
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

          <div className="product-container">
            <div className="sort-bar">
              <span>Home / {formattedCategory} / {formattedSubcategory}</span>
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
                    <img className="product-img" src={product.image} alt={product.name} />
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

                  <button
                    className="add-to-cart"
                    onClick={() =>
                      window.location.href = `/${slugify(category)}/${slugify(subcategory)}/${slugify(product.name)}`
                    }
                  >
                    {product.quantity === 0 ? "Sold out" : "View"} ➤
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <CTABanner
        imageSrc="/assets/product-banner.jpeg"
        linkTo="/contact"
        alt="Get a Quote"
      />
      <FAQSection subcategory={formattedSubcategory} />
      <RelatedCategories currentSubcategory={formattedSubcategory} />
      <BottomCategoryDescription subcategory={formattedSubcategory} />
    </>
  );
};

export default ProductDisplay;
