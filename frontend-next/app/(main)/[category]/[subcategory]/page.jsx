import { notFound } from "next/navigation";
import ProductDisplay from "../../../../components/ProductDisplay";
import LocationCorporateGifts from "../../../../components/LocationCorporateGifts";
import { getLocationCorporateGiftPage, locationCorporateGiftPages } from "../../../../data/locationSeo";
import seoConfig from "../../../../data/seoConfig";
import { brandedTitle, toBackendSubcategorySlug, toPublicProductSlug } from "../../../../lib/siteConfig";

const BASE = "https://printkee.com";
const BACKEND = process.env.BACKEND_URL;

// Cache successful category pages and refresh them in the background. If the
// backend is briefly unavailable during revalidation, Next.js keeps serving
// the last successful page instead of returning a crawler-visible 5xx.
export const revalidate = 900;
export const dynamicParams = true;

async function getSubcategory(category, subcategory) {
  const backendSubcategory = toBackendSubcategorySlug(subcategory);
  const res = await fetch(
    `${BACKEND}/api/subcategory/subcategory-fetch/${encodeURIComponent(category)}/${encodeURIComponent(backendSubcategory)}`,
    { next: { revalidate: 900, tags: [`subcategory:${category}:${subcategory}`] } }
  );

  if (res.status === 404) return null;
  if (!res.ok) {
    throw new Error(`Subcategory API returned ${res.status} for ${category}/${subcategory}`);
  }

  return res.json();
}

export async function generateMetadata({ params }) {
  const { category, subcategory } = await params;
  const locationPage = getLocationCorporateGiftPage(category, subcategory);
  if (locationPage) {
    const canonical = `${BASE}/${category}/${subcategory}`;
    return {
      title: { absolute: locationPage.title },
      description: locationPage.description,
      keywords: [locationPage.primaryKeyword, `customised corporate gifts ${locationPage.name}`, `branded corporate gifts ${locationPage.name}`, "bulk corporate gifting"],
      alternates: { canonical },
      openGraph: { title: locationPage.title, description: locationPage.description, url: canonical, type: "website" },
      twitter: { card: "summary_large_image", title: locationPage.title, description: locationPage.description },
    };
  }
  if (locationCorporateGiftPages[category]) return { title: "Page Not Found | Printkee", robots: { index: false, follow: false } };
  const seo = seoConfig[`/${category}/${subcategory}`];
  const data = await getSubcategory(category, subcategory);
  if (!data) return { title: "Subcategory Not Found | Printkee" };

  const sub = data?.subcategory;
  const cat = data?.category;
  const canonical = `${BASE}/${category}/${subcategory}`;

  const rawTitle = seo?.title
    || sub?.seo?.metaTitle
    || `${sub?.name} | ${cat?.name}`;
  const title = brandedTitle(rawTitle);
  const description = seo?.description
    || sub?.seo?.metaDescription
    || sub?.description
    || `Explore premium ${sub?.name} under ${cat?.name}.`;
  const image = sub?.image || `${BASE}/assets/printkeeLogo.webp`;

  return {
    title: { absolute: title },
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
  const locationPage = getLocationCorporateGiftPage(category, subcategory);
  if (locationPage) return <LocationCorporateGifts location={category} page={locationPage} />;
  if (locationCorporateGiftPages[category]) notFound();
  const seo = seoConfig[`/${category}/${subcategory}`];
  const data = await getSubcategory(category, subcategory);

  if (!data) notFound();

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
            url:  `${BASE}/${category}/${subcategory}/${toPublicProductSlug(prod.slug)}`,
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
