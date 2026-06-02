"use client";
import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { FaHeart, FaEye } from "react-icons/fa";
import "../styles/ProductDisplay.css";
import CTABanner from "./CTABanner";
import RelatedCategories from "./RelatedCategories";
import FAQSection from "./category/FAQSection";
import banners from "../data/banners";
import SubcategoryDescription from "./category/SubcategoryDescription";

const ProductDisplay = ({ subcategoryData, categoryData, products = [], seoH1, seoH2 }) => {
  const { category: categorySlug, subcategory: subcategorySlug } = useParams();
  const router = useRouter();

  if (!subcategoryData || !categoryData) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <p>Unable to load products. Please ensure the backend is running.</p>
      </div>
    );
  }

  const categoryName = categoryData.name;
  const subcategoryName = subcategoryData.name;
  /* seoH1/seoH2 override the DB name for SEO-optimized headings */
  const displayH1 = seoH1 || subcategoryName;
  const displayH2 = seoH2 || null;

  const bannerImage =
    banners[categorySlug]?.subcategories?.[subcategorySlug] ||
    banners[categorySlug]?.banner ||
    "/assets/product-banner.webp";

  return (
    <>
      {/* Header */}
      <div className="subcategory-header-2">
        <div className="subcategory-header-content">
          <Link
            href={`/${categorySlug}`}
            className="back-link"
            aria-label={`Go back to ${categoryName}`}
          >
            <div className="circle">
              <span className="arrow-2">&larr;</span>
            </div>
            <span className="span-name">Back to {categoryName}</span>
          </Link>

          <h1 className="page-title">{displayH1}</h1>
          {displayH2 && <h2 className="page-subtitle">{displayH2}</h2>}
          <p className="subcategory-description">{subcategoryData?.description || ""}</p>
        </div>
      </div>

      {/* Product Grid */}
      <div className="product-container-2">
        <div className="page-wrapper">
          <div className="product-container">
            <nav className="breadcrumbs" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span className="breadcrumb-separator">/</span>
              <Link href={`/${categorySlug}`}>{categoryName}</Link>
              <span className="breadcrumb-separator">/</span>
              <span className="current">{subcategoryName}</span>
            </nav>

            <div className="product-grid">
              {products.map((product) => {
                const sizeSelectId = `size-select-${product._id}`;
                const colorSelectId = `color-select-${product._id}`;
                const imageUrl = product.images?.[0]?.url || "/assets/placeholder.webp";

                return (
                  <div key={product._id} className="product-card">
                    <div className="product-image-wrapper">
                      <img
                        className="product-img"
                        src={imageUrl}
                        alt={product.images?.[0]?.altText || product.name}
                      />
                      <div className="product-icons">
                        <button aria-label={`Add ${product.name} to wishlist`}>
                          <FaHeart />
                        </button>
                        <button aria-label={`View details of ${product.name}`}>
                          <FaEye />
                        </button>
                      </div>
                    </div>

                    <h3 className="product-title">{product.name}</h3>

                    <div className="dropdown-group">
                      {product.attributes?.size?.length > 0 && (
                        <>
                          <label htmlFor={sizeSelectId}>Style:</label>
                          <select id={sizeSelectId}>
                            {product.attributes.size.map((s, index) => (
                              <option key={index}>{s}</option>
                            ))}
                          </select>
                        </>
                      )}

                      {product.attributes?.color?.length > 0 && (
                        <>
                          <label htmlFor={colorSelectId}>Color:</label>
                          <select id={colorSelectId}>
                            {product.attributes.color.map((c, index) => (
                              <option key={index}>{c}</option>
                            ))}
                          </select>
                        </>
                      )}
                    </div>

                    <button
                      className="add-to-cart"
                      aria-label={`View product: ${product.name}`}
                      onClick={() =>
                        router.push(`/${categorySlug}/${subcategorySlug}/${product.slug}`)
                      }
                      disabled={product.stock === 0}
                    >
                      {product.stock === 0 ? "Sold out" : "View"} ➤
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <SubcategoryDescription subcategory={subcategorySlug} />

        <CTABanner
          imageSrc={bannerImage}
          linkTo="/contact"
          alt={`Get a Quote for ${subcategoryName}`}
        />
      </div>

      <FAQSection subcategory={subcategorySlug} />

      <RelatedCategories
        categorySlug={categorySlug}
        currentSubcategorySlug={subcategorySlug}
      />
    </>
  );
};

export default ProductDisplay;
