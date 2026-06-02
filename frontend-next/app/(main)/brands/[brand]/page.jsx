import BrandsDisplayClient from "../../../../components/BrandsDisplayClient";

const BASE = "https://printkee.com";
const BACKEND = process.env.BACKEND_URL || "http://localhost:5031";

async function getBrand(slug) {
  try {
    const res = await fetch(`${BACKEND}/api/brands/${slug}`, { cache: "no-store" });
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
    title: `${brandInfo.name} Corporate Gifts | MF Global Services`,
    description: brandInfo.description,
    keywords: brandInfo.tags,
    alternates: { canonical: `${BASE}/brands/${brand}` },
    openGraph: {
      title: `${brandInfo.name} Corporate Gifts | MF Global Services`,
      description: brandInfo.description,
      url: `${BASE}/brands/${brand}`,
      type: "website",
      images: brandInfo.logo
        ? [{ url: `${BASE}${brandInfo.logo}`, alt: `${brandInfo.name} brand` }]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${brandInfo.name} Corporate Gifts | MF Global Services`,
      description: brandInfo.description,
      images: brandInfo.logo ? [`${BASE}${brandInfo.logo}`] : [],
    },
  };
}

export default async function BrandsDisplayPage({ params }) {
  const { brand } = await params;
  const brandInfo = await getBrand(brand);
  return <BrandsDisplayClient brand={brand} brandInfo={brandInfo} />;
}
