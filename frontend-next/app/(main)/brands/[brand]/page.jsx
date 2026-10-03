import { notFound } from "next/navigation";
import BrandsDisplayClient from "../../../../components/BrandsDisplayClient";
import { brandedTitle } from "../../../../lib/siteConfig";

const BASE = "https://printkee.com";
const BACKEND = process.env.BACKEND_URL || "http://localhost:5031";

export const revalidate = 3600;

async function getBrand(slug) {
  try {
    const res = await fetch(`${BACKEND}/api/brands/${slug}`, {
      next: { revalidate: 3600, tags: [`brand:${slug}`] },
    });
    return res.ok ? res.json() : null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { brand } = await params;
  const brandInfo = await getBrand(brand);
  if (!brandInfo) return { title: "Brand Not Found" };

  return {
    title: { absolute: brandedTitle(`${brandInfo.name} Corporate Gifts`) },
    description: brandInfo.description,
    keywords: brandInfo.tags,
    alternates: { canonical: `${BASE}/brands/${brand}` },
    openGraph: {
      title: `${brandInfo.name} Corporate Gifts | Printkee`,
      description: brandInfo.description,
      url: `${BASE}/brands/${brand}`,
      type: "website",
      images: brandInfo.logo
        ? [{ url: `${BASE}${brandInfo.logo}`, alt: `${brandInfo.name} brand` }]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${brandInfo.name} Corporate Gifts | Printkee`,
      description: brandInfo.description,
      images: brandInfo.logo ? [`${BASE}${brandInfo.logo}`] : [],
    },
  };
}

export default async function BrandsDisplayPage({ params }) {
  const { brand } = await params;
  const brandInfo = await getBrand(brand);

  if (!brandInfo) notFound();

  const breadcrumb = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: BASE },
    { "@type": "ListItem", position: 2, name: "Brands", item: `${BASE}/brands` },
    { "@type": "ListItem", position: 3, name: brandInfo.name, item: `${BASE}/brands/${brand}` },
  ] };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} /><BrandsDisplayClient brand={brand} brandInfo={brandInfo} /></>;
}
