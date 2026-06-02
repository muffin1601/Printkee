import BrandsDisplayClient from "../../../../components/BrandsDisplayClient";
import brandsList from "../../../../data/brandsspl";

const BASE = "https://printkee.com";

export async function generateMetadata({ params }) {
  const { brand } = await params;
  const brandInfo = brandsList.find((b) => b.slug === brand);
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
        ? [{ url: brandInfo.logo, alt: `${brandInfo.name} brand` }]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${brandInfo.name} Corporate Gifts | MF Global Services`,
      description: brandInfo.description,
      images: brandInfo.logo ? [brandInfo.logo] : [],
    },
  };
}

export default async function BrandsDisplayPage({ params }) {
  const { brand } = await params;
  return <BrandsDisplayClient brand={brand} />;
}
