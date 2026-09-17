import { notFound } from "next/navigation";
import DiwaliHamperProduct from "../../../../../components/diwali/DiwaliHamperProduct";
import diwali2026Products from "../../../../../data/diwali-2026-products";

const BASE = "https://printkee.com";

const hampers = diwali2026Products.filter((product) => product.slug);

export function generateStaticParams() {
  return hampers.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const hamper = hampers.find((product) => product.slug === slug);

  if (!hamper) return { title: "Hamper Not Found | Printkee" };

  const title = `${hamper.name} | Diwali Corporate Gifts`;
  const description = `${hamper.description} Get bulk Diwali gifting prices and branding options on enquiry.`;
  const canonical = `${BASE}/diwali-special/hampers/${hamper.slug}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "website",
      images: [{ url: `${BASE}${hamper.image}`, alt: hamper.name }],
    },
  };
}

export default async function DiwaliHamperPage({ params }) {
  const { slug } = await params;
  const hamper = hampers.find((product) => product.slug === slug);

  if (!hamper) notFound();

  const canonical = `${BASE}/diwali-special/hampers/${hamper.slug}`;
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: hamper.name,
    description: hamper.description,
    image: hamper.gallery || [hamper.image],
    category: "Diwali Gift Hampers",
    brand: { "@type": "Brand", name: "Printkee" },
    url: canonical,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <DiwaliHamperProduct hamper={hamper} />
    </>
  );
}
