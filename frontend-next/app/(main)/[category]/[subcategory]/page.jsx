import ProductDisplay from "../../../../components/ProductDisplay";

const BASE = "https://printkee.com";
const BACKEND = process.env.BACKEND_URL;

async function getSubcategory(category, subcategory) {
  try {
    const res = await fetch(
      `${BACKEND}/api/subcategory/subcategory-fetch/${category}/${subcategory}`,
      { cache: "no-store" }
    );
    return res.ok ? res.json() : null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { category, subcategory } = await params;
  const data = await getSubcategory(category, subcategory);
  if (!data) return { title: "Products | MF Global Services" };

  const sub = data.subcategory;
  const cat = data.category;
  const canonical = `${BASE}/${category}/${subcategory}`;
  const title =
    sub?.seo?.metaTitle || `${sub?.name} | ${cat?.name} - MF Global Services`;
  const desc =
    sub?.seo?.metaDescription ||
    sub?.description ||
    `Explore premium ${sub?.name} under ${cat?.name}.`;

  return {
    title,
    description: desc,
    keywords: sub?.seo?.keywords || [
      sub?.name,
      cat?.name,
      "corporate gifting",
      "bulk orders India",
    ],
    alternates: { canonical },
    openGraph: {
      title,
      description: desc,
      url: canonical,
      type: "website",
      images: sub?.image ? [{ url: sub.image, alt: sub.name }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: desc,
      images: sub?.image ? [sub.image] : [],
    },
  };
}

export default async function SubcategoryPage({ params }) {
  const { category, subcategory } = await params;
  const data = await getSubcategory(category, subcategory);

  const products = data?.products || [];
  const categoryData = data?.category || null;
  const subcategoryData = data?.subcategory || null;

  /* ── BreadcrumbList JSON-LD ── */
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE },
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
    ],
  };

  /* ── ItemList JSON-LD (product listing) ── */
  const itemListSchema =
    products.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: subcategoryData?.name || subcategory,
          url: `${BASE}/${category}/${subcategory}`,
          numberOfItems: products.length,
          itemListElement: products.slice(0, 20).map((prod, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `${BASE}/${category}/${subcategory}/${prod.slug}`,
            name: prod.name,
          })),
        }
      : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {itemListSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
        />
      )}
      <ProductDisplay
        subcategoryData={subcategoryData}
        categoryData={categoryData}
        products={products}
      />
    </>
  );
}
