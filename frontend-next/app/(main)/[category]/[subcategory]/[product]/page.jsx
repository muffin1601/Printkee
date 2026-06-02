import SingleProductDisplay from "../../../../../components/SingleProductDisplay";

const BASE = "https://printkee.com";
const BACKEND = process.env.BACKEND_URL;

async function getProduct(category, subcategory, product) {
  try {
    const res = await fetch(
      `${BACKEND}/api/product/product-fetch/${category}/${subcategory}/${product}`,
      { cache: "no-store" }
    );
    return res.ok ? res.json() : null;
  } catch {
    return null;
  }
}

async function getRelatedProducts(category, subcategory, product) {
  try {
    const res = await fetch(
      `${BACKEND}/api/product/related-products/${category}/${subcategory}/${product}`,
      { cache: "no-store" }
    );
    return res.ok ? res.json() : [];
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }) {
  const { category, subcategory, product } = await params;
  const data = await getProduct(category, subcategory, product);
  if (!data) return { title: "Product | MF Global Services" };

  const prod = data.product;
  const sub = data.subcategory;
  const cat = data.category;
  const canonical = `${BASE}/${category}/${subcategory}/${product}`;
  const desc =
    prod?.seo?.metaDescription ||
    prod?.description?.short ||
    `Explore premium ${prod?.name} from our ${sub?.name} range.`;
  const title =
    prod?.seo?.metaTitle || `${prod?.name} | ${sub?.name} - MF Global Services`;
  const image = prod?.images?.[0]?.url;

  return {
    title,
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

  const productData = data?.product || null;
  const subcategoryData = data?.subcategory || null;
  const categoryData = data?.category || null;

  const canonical = `${BASE}/${category}/${subcategory}/${product}`;

  /* ── Product JSON-LD ── */
  const productSchema = productData
    ? {
        "@context": "https://schema.org",
        "@type": "Product",
        name: productData.name,
        description:
          productData.description?.long ||
          productData.description?.short ||
          productData.name,
        image: productData.images?.map((img) => img.url) || [],
        sku: productData.sku || undefined,
        brand: { "@type": "Brand", name: "Printkee" },
        offers: {
          "@type": "Offer",
          url: canonical,
          priceCurrency: "INR",
          price: productData.price ? String(productData.price) : undefined,
          availability:
            productData.stock === 0
              ? "https://schema.org/OutOfStock"
              : "https://schema.org/InStock",
          seller: { "@type": "Organization", name: "Printkee" },
        },
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
