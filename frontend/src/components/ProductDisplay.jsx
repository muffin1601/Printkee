import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import axios from "axios";
import { FaHeart, FaEye } from "react-icons/fa";
import "../styles/ProductDisplay.css";
import CTABanner from "./CTABanner";
import RelatedCategories from "./RelatedCategories";
import FAQSection from "./FAQSection";
import BottomCategoryDescription from "./BottomCategoryDescription";
import banners from "../data/banners";

const ProductDisplay = () => {
  const { category: categorySlug, subcategory: subcategorySlug } = useParams();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [categoryData, setCategoryData] = useState(null);
  const [subcategoryData, setSubcategoryData] = useState(null);

  useEffect(() => {
    
    axios
      .get(
        `${import.meta.env.VITE_API_URL}/subcategory/subcategory-fetch/${categorySlug}/${subcategorySlug}`
      )
      .then((res) => {
        setProducts(res.data.products || []);
        setCategoryData(res.data.category || null);
        setSubcategoryData(res.data.subcategory || null);
      })
      .catch((err) => console.error("Failed to fetch products:", err));
  }, [categorySlug, subcategorySlug]);

  if (!subcategoryData || !categoryData) return <div>Loading...</div>;

 
  const categoryName = categoryData.name;
  const subcategoryName = subcategoryData.name;

  console.log (subcategoryName);

  const bannerImage =
    banners[categoryName]?.subcategories?.[subcategoryName] ||
    banners[categoryName]?.banner ||
    "/assets/product-banner.webp";

  return (
    <>
      <Helmet>
        <title>
          {`${subcategoryName} | ${categoryName} - MF Global Services`}
        </title>
        <meta
          name="description"
          content={
            subcategoryData?.tag
              ? subcategoryData.tag.replace(/\n/g, " ")
              : `Explore ${subcategoryName} under ${categoryName} at MF Global Services. Discover custom branded gifts for every need.`
          }
        />
      </Helmet>

      {/* Header */}
      <div className="subcategory-header">
        <div className="subcategory-header-content">
          <Link to={`/${categorySlug}`} className="back-link">
            <div className="circle">
              <span className="arrow-2">&larr;</span>
            </div>
            <span className="span-name">Back to {categoryName}</span>
          </Link>
          <h1 className="page-title">{subcategoryName}</h1>
          <p className="subcategory-description">{subcategoryData?.tag || ""}</p>
        </div>
      </div>

      {/* Products grid */}
      <div className="product-container-2">
        <div className="page-wrapper">
          <div className="product-container">
            <div className="sort-bar">
              <span>
                Home / {categoryName} / {subcategoryName}
              </span>
            </div>

            <div className="product-grid">
              {products.map((product) => (
                <div key={product._id} className="product-card">
                  <div className="product-image-wrapper">
                    <img
                      className="product-img"
                      src={product.image}
                      alt={product.name}
                    />
                    <div className="product-icons">
                      <button>
                        <FaHeart />
                      </button>
                      <button>
                        <FaEye />
                      </button>
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
                      navigate(
                        `/${categorySlug}/${subcategorySlug}/${product.slug}`
                      )
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
        imageSrc={bannerImage}
        linkTo="/contact"
        alt={`Get a Quote for ${subcategoryName}`}
      />

      <FAQSection subcategory={subcategoryName} />
      <RelatedCategories
        categorySlug={categorySlug}
        currentSubcategorySlug={subcategorySlug}
      />
      <BottomCategoryDescription subcategory={subcategoryName} />
    </>
  );
};

export default ProductDisplay;
