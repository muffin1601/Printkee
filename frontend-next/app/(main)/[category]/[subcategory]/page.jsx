import ProductDisplay from "../../../../components/ProductDisplay";
import seoConfig from "../../../../data/seoConfig";

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
  const seo = seoConfig[`/${category}/${subcategory}`];
  const data = await getSubcategory(category, subcategory);
  const sub = data?.subcategory;
  const cat = data?.category;
  const canonical = `${BASE}/${category}/${subcategory}`;

  const title = seo?.title
    || sub?.seo?.metaTitle
    || `${sub?.name} | ${cat?.name} - MF Global Services`;
  const description = seo?.description
    || sub?.seo?.metaDescription
    || sub?.description
    || `Explore premium ${sub?.name} under ${cat?.name}.`;
  const image = sub?.image || `${BASE}/assets/printkeeLogo.webp`;

  return {
    title,
    description,
    keywords: sub?.seo?.keywords || [sub?.name, cat?.name, "corporate gifting", "bulk orders India"],
    alternates: { canonical },
    openGraph: {
      title:       seo?.openGraph?.title       || title,
      description: seo?.openGraph?.description || description,
      url:         canonical,
      type:        "website",
      images:      image ? [{ url: image, alt: sub?.name || subcategory }] : [],
    },
    twitter: {
      card:        "summary_large_image",
      title:       seo?.twitter?.title       || title,
      description: seo?.twitter?.description || description,
      images:      image ? [image] : [],
    },
  };
}

export default async function SubcategoryPage({ params }) {
  const { category, subcategory } = await params;
  const seo = seoConfig[`/${category}/${subcategory}`];
  const data = await getSubcategory(category, subcategory);

  const products      = data?.products      || [];
  const categoryData  = data?.category      || null;
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
        name: seo?.h1 || subcategoryData?.name || subcategory,
        item: `${BASE}/${category}/${subcategory}`,
      },
    ],
  };

  /* ── ItemList JSON-LD ── */
  const itemListSchema =
    products.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: seo?.h1 || subcategoryData?.name || subcategory,
          url: `${BASE}/${category}/${subcategory}`,
          numberOfItems: products.length,
          itemListElement: products.slice(0, 20).map((prod, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url:  `${BASE}/${category}/${subcategory}/${prod.slug}`,
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
        seoH1={seo?.h1}
        seoH2={seo?.h2}
      />
    </>
  );
}
