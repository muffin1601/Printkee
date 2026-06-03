"use client";
import React from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft, ChevronRight, Heart, Eye,
  ArrowRight, ShoppingBag, Package, Home, Phone,
} from "lucide-react";
import styles from "../styles/ProductDisplay.module.css";
import RelatedCategories from "./RelatedCategories";
import FAQSection from "./category/FAQSection";
import SubcategoryDescription from "./category/SubcategoryDescription";

const ProductDisplay = ({ subcategoryData, categoryData, products = [], seoH1, seoH2 }) => {
  const { category: categorySlug, subcategory: subcategorySlug } = useParams();
  const router = useRouter();

  if (!subcategoryData || !categoryData) {
    return (
      <div className={styles["empty-state"]}>
        <Package size={32} className={styles["empty-icon"]} />
        <p>Unable to load products. Please ensure the backend is running.</p>
      </div>
    );
  }

  const categoryName    = categoryData.name;
  const subcategoryName = subcategoryData.name;
  const displayH1       = seoH1 || subcategoryName;
  const displayH2       = seoH2 || null;

  return (
    <>
      {/* ── HERO HEADER ── */}
      <div className={styles["subcategory-header-2"]}>
        <div className={styles["subcategory-header-content"]}>
          <Link href={`/${categorySlug}`} className={styles["back-link"]} aria-label={`Back to ${categoryName}`}>
            <span className={styles.circle}><ArrowLeft size={13} /></span>
            <span className={styles["span-name"]}>Back to {categoryName}</span>
          </Link>
          <h1 className={styles["page-title"]}>{displayH1}</h1>
          {displayH2 && <h2 className={styles["page-subtitle"]}>{displayH2}</h2>}
          {subcategoryData?.description && (
            <p className={styles["subcategory-description"]}>{subcategoryData.description}</p>
          )}
        </div>
      </div>

      {/* ── PRODUCT GRID ── */}
      <div className={styles["product-container-2"]}>
        <div className={styles["page-wrapper"]}>
          <div className={styles["product-container"]}>

            <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
              <Link href="/"><Home size={12} /> Home</Link>
              <ChevronRight size={11} className={styles["breadcrumb-separator"]} />
              <Link href={`/${categorySlug}`}>{categoryName}</Link>
              <ChevronRight size={11} className={styles["breadcrumb-separator"]} />
              <span className={styles.current}>{subcategoryName}</span>
            </nav>

            {products.length === 0 ? (
              <div className={styles["empty-state"]}>
                <ShoppingBag size={32} className={styles["empty-icon"]} />
                <p>No products found in this category.</p>
              </div>
            ) : (
              <div className={styles["product-grid"]}>
                {products.map((product) => {
                  const sizeSelectId  = `size-${product._id}`;
                  const colorSelectId = `color-${product._id}`;
                  const imageUrl = product.images?.[0]?.url || "/assets/placeholder.webp";

                  return (
                    <article key={product._id} className={styles["product-card"]}>
                      <div className={styles["product-image-wrapper"]}>
                        <img className={styles["product-img"]} src={imageUrl}
                          alt={product.images?.[0]?.altText || product.name} loading="lazy" />
                        <div className={styles["product-icons"]}>
                          <button aria-label={`Save ${product.name}`} title="Save"><Heart size={13} /></button>
                          <button aria-label={`Quick view ${product.name}`} title="Quick view"
                            onClick={() => router.push(`/${categorySlug}/${subcategorySlug}/${product.slug}`)}>
                            <Eye size={13} />
                          </button>
                        </div>
                      </div>
                      <div className={styles["product-body"]}>
                        <h3 className={styles["product-title"]}>{product.name}</h3>
                        {(product.attributes?.size?.length > 0 || product.attributes?.color?.length > 0) && (
                          <div className={styles["dropdown-group"]}>
                            {product.attributes?.size?.length > 0 && (
                              <div>
                                <label htmlFor={sizeSelectId}>Style</label>
                                <select id={sizeSelectId}>
                                  {product.attributes.size.map((s, i) => <option key={i}>{s}</option>)}
                                </select>
                              </div>
                            )}
                            {product.attributes?.color?.length > 0 && (
                              <div>
                                <label htmlFor={colorSelectId}>Color</label>
                                <select id={colorSelectId}>
                                  {product.attributes.color.map((c, i) => <option key={i}>{c}</option>)}
                                </select>
                              </div>
                            )}
                          </div>
                        )}
                        <button className={styles["add-to-cart"]} disabled={product.stock === 0}
                          onClick={() => router.push(`/${categorySlug}/${subcategorySlug}/${product.slug}`)}>
                          {product.stock === 0 ? "Sold Out" : <><span>View Details</span><ArrowRight size={13} /></>}
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <SubcategoryDescription subcategory={subcategorySlug} />
      </div>

      {/* ── FAQ ── */}
      <FAQSection subcategory={subcategorySlug} />

      {/* ── RELATED CATEGORIES ── */}
      <RelatedCategories categorySlug={categorySlug} currentSubcategorySlug={subcategorySlug} />

      {/* ── BOTTOM CTA — matches home page dark section style ── */}
      <section className={styles["product-cta"]}>
        <div className={styles["product-cta-inner"]}>
          <p className={styles["product-cta-eyebrow"]}>Bulk Orders Available</p>
          <h2 className={styles["product-cta-heading"]}>
            Need Custom {subcategoryName}?
          </h2>
          <p className={styles["product-cta-sub"]}>
            Premium branding, bulk discounts and fast pan-India delivery. Let&apos;s create something memorable.
          </p>
          <div className={styles["product-cta-actions"]}>
            <Link href="/contact" className={styles["product-cta-btn-primary"]}>
              Get a Quote <ArrowRight size={14} />
            </Link>
            <a href="tel:+918800904543" className={styles["product-cta-btn-ghost"]}>
              <Phone size={13} /> +91 88009 04543
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDisplay;
