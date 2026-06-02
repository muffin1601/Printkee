import BrandsDisplayClient from "../../../../components/BrandsDisplayClient";
import brandProducts from "../../../../data/brandProducts";
import brandsList from "../../../../data/brandsspl";

export async function generateMetadata({ params }) {
  const { brand } = await params;
  const brandInfo = brandsList.find((b) => b.slug === brand);
  if (!brandInfo) return { title: "Brand Not Found" };
  return {
    title: `${brandInfo.name} Products | Corporate Gifting`,
    description: brandInfo.description,
    keywords: brandInfo.tags,
    alternates: { canonical: `https://printkee.com/brands/${brand}` },
  };
}

export default async function BrandsDisplayPage({ params }) {
  const { brand } = await params;
  return <BrandsDisplayClient brand={brand} />;
}
