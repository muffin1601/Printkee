import { notFound, permanentRedirect } from "next/navigation";
import DiwaliHamperProduct from "../../../../../components/diwali/DiwaliHamperProduct";
import newYear2027Products from "../../../../../data/new-year-2027-products";
import catalogueProducts from "../../../../../data/diwali-2026-products";
import { brandedTitle } from "../../../../../lib/siteConfig";

const BASE = "https://printkee.com";

const hampers = newYear2027Products.filter((product) => product.slug);
const knownHamperSlugs = new Set(
  catalogueProducts.filter((product) => product.slug).map((product) => product.slug)
);

export function generateStaticParams() {
  return hampers.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const hamper = hampers.find((product) => product.slug === slug);

  if (!hamper) return { title: "Hamper Not Found | Printkee" };

  const title = `${hamper.name} | New Year 2027 Corporate Gifts`;
  const description = `${hamper.description} Request a bulk corporate gifting quote and ask about available branding options.`;
  const canonical = `${BASE}/new-year-2027/hampers/${hamper.slug}`;

  return {
    title: { absolute: brandedTitle(title) },
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

  if (!hamper) {
    if (knownHamperSlugs.has(slug)) {
      permanentRedirect("/new-year-2027#new-year-collection");
    }
    notFound();
  }

  const canonical = `${BASE}/new-year-2027/hampers/${hamper.slug}`;
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: hamper.name,
    description: hamper.description,
    image: hamper.gallery || [hamper.image],
    category: "Corporate Gifts",
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
