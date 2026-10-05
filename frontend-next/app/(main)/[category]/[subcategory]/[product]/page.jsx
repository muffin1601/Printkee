import { notFound } from "next/navigation";
import SingleProductDisplay from "../../../../../components/SingleProductDisplay";
import { brandedTitle, toBackendProductSlug, toBackendSubcategorySlug, toPublicProductSlug } from "../../../../../lib/siteConfig";
import { neutralizeUnverifiedClaims } from "../../../../../lib/contentCompliance";
import SeoLandingPage from "../../../../../components/SeoLandingPage";
import { getSeoLandingPage, pathFromSegments, seoLandingMetadata } from "../../../../../lib/seoLanding";

const BASE = "https://printkee.com";
const BACKEND = process.env.BACKEND_URL;

async function getProduct(category, subcategory, product) {
  const backendSubcategory = toBackendSubcategorySlug(subcategory);
  const backendProduct = toBackendProductSlug(product);
  try {
    const res = await fetch(
      `${BACKEND}/api/product/product-fetch/${encodeURIComponent(category)}/${encodeURIComponent(backendSubcategory)}/${encodeURIComponent(backendProduct)}`,
      { cache: "no-store" }
    );
    return res.ok ? neutralizeUnverifiedClaims(await res.json()) : null;
  } catch {
    return null;
  }
}

async function getRelatedProducts(category, subcategory, product) {
  const backendSubcategory = toBackendSubcategorySlug(subcategory);
  const backendProduct = toBackendProductSlug(product);
  try {
    const res = await fetch(
      `${BACKEND}/api/product/related-products/${encodeURIComponent(category)}/${encodeURIComponent(backendSubcategory)}/${encodeURIComponent(backendProduct)}`,
      { cache: "no-store" }
    );
    return res.ok ? neutralizeUnverifiedClaims(await res.json()) : [];
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }) {
  const { category, subcategory, product } = await params;
  const data = await getProduct(category, subcategory, product);
  if (!data) {
    const seoPage = await getSeoLandingPage(pathFromSegments(category, subcategory, product));
    return seoPage ? seoLandingMetadata(seoPage) : { title: "Product Not Found | Printkee", robots: { index: false, follow: false } };
  }

  const prod = data.product;
  const sub = data.subcategory;
  const cat = data.category;
  const canonical = `${BASE}/${category}/${subcategory}/${toPublicProductSlug(product)}`;

  const desc =
    prod?.seo?.metaDescription ||
    prod?.description?.short ||
    `Explore premium ${prod?.name} from our ${sub?.name} range.`;
  const rawTitle = prod?.seo?.metaTitle || `${prod?.name} | ${sub?.name}`;
  const title = brandedTitle(rawTitle);
  const image = prod?.images?.[0]?.url;

  return {
    title: { absolute: title },
    description: desc,
    keywords: prod?.seo?.keywords || [
      prod?.name,
      sub?.name,
      cat?.name,
      "corporate gifting India",
    ],
    alternates: { canonical },
    openGraph: {
      title,
      description: desc,
      url: canonical,
      type: "website",
      images: image ? [{ url: image, alt: prod?.name }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: desc,
      images: image ? [image] : [],
    },
  };
}

export default async function ProductPage({ params }) {
  const { category, subcategory, product } = await params;

  const [data, relatedProducts] = await Promise.all([
    getProduct(category, subcategory, product),
    getRelatedProducts(category, subcategory, product),
  ]);

  if (!data) {
    const seoPage = await getSeoLandingPage(pathFromSegments(category, subcategory, product));
    if (!seoPage) notFound();
    return <SeoLandingPage page={seoPage} />;
  }

  const productData = data?.product || null;
  const subcategoryData = data?.subcategory || null;
  const categoryData = data?.category || null;

  const canonical = `${BASE}/${category}/${subcategory}/${toPublicProductSlug(product)}`;

  const schemaProperties = [
    ["Dimensions", productData?.attributes?.dimensions],
    ["Weight", productData?.attributes?.weight],
    ["GSM", productData?.attributes?.gsm],
    ["Capacity", productData?.attributes?.capacity],
    ["Printing Methods", productData?.attributes?.printingMethods?.join(", ")],
    ["Branding Areas", productData?.attributes?.brandingAreas?.join(", ")],
    ["Packaging", productData?.attributes?.packaging],
    ["Customization", productData?.attributes?.customization],
    ["Care Instructions", productData?.attributes?.careInstructions],
  ].filter(([, value]) => value).map(([name, value]) => ({ "@type": "PropertyValue", name, value }));

  /* ── Product JSON-LD ── */
  const productSchema = productData
    ? {
        "@context": "https://schema.org",
        "@type": "Product",
        name: productData.name,
        description:
          productData.description?.short ||
          (productData.description?.long || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim() ||
          productData.name,
        image: productData.images?.map((img) => img.url) || [],
        sku: productData.sku || undefined,
        brand: { "@type": "Brand", name: "Printkee" },
        material: productData.attributes?.material || undefined,
        size: productData.attributes?.size?.join(", ") || undefined,
        weight: productData.attributes?.weight || undefined,
        additionalProperty: schemaProperties.length ? schemaProperties : undefined,
      }
    : null;

  /* ── BreadcrumbList JSON-LD ── */
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: BASE,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: categoryData?.name || category,
        item: `${BASE}/${category}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: subcategoryData?.name || subcategory,
        item: `${BASE}/${category}/${subcategory}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: productData?.name || product,
        item: canonical,
      },
    ],
  };

  /* ── ProductFAQ JSON-LD (from subcategory FAQs if available) ── */
  const productFAQSchema =
    productData?.faqs?.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: productData.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer },
          })),
        }
      : null;

  return (
    <>
      {productSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {productFAQSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productFAQSchema) }}
        />
      )}
      <SingleProductDisplay
        productData={productData}
        subcategoryData={subcategoryData}
        categoryData={categoryData}
        relatedProducts={relatedProducts}
      />
    </>
  );
}
