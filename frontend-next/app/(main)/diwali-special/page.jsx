import DiwaliClient from "../../../components/DiwaliClient";
import diwali2026Products from "../../../data/diwali-2026-products";

const BASE = "https://printkee.com";
const PATH = "/diwali-special";

/**
 * Diwali 2026 campaign page.
 *
 * Products are read from the local catalogue dataset, not from the backend.
 * The page previously fetched `/api/product/collection`, which returns the
 * shared ecommerce catalogue filtered by tag — that surfaced general products
 * rather than this season's catalogue, so the fetch has been removed. The
 * products database itself is untouched and still powers every other route.
 *
 * With no remote data left, the page is fully static.
 */
export const metadata = {
  /* The root layout's "%s | Printkee" template supplies the brand suffix, so
     this stays a bare page title. */
  title: "Diwali 2026 Gifts, Hampers & Corporate Gifts",
  description:
    "Browse the Diwali 2026 catalogue — Nutraj dry-fruit hampers, boAt and TEMPT audio, FUZO desk gadgets, American Tourister and Swiss Military luggage, Prestige and Skyline kitchen appliances, copper gift sets and home textiles. Bulk enquiry pricing, pan-India delivery.",
  keywords: [
    "Diwali 2026 gifts",
    "Diwali gift hampers",
    "Diwali corporate gifting",
    "Diwali catalogue 2026",
    "festive gifting India",
  ],
  alternates: { canonical: `${BASE}${PATH}` },
  openGraph: {
    title: "Diwali 2026 Gifts, Hampers & Corporate Gifts | Printkee",
    description:
      "The full Diwali 2026 catalogue — dry-fruit hampers, audio and desk tech, luggage, kitchen appliances, copper sets and home textiles. Enquire for bulk festive pricing.",
    url: `${BASE}${PATH}`,
    type: "website",
    images: [
      {
        url: `${BASE}/catalogue-2026-images/page-02-img-01_560x396.png`,
        alt: "Nutraj Wishes Leafy Whispers gift box from the Diwali 2026 catalogue",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Diwali 2026 Gifts, Hampers & Corporate Gifts | Printkee",
    description:
      "Browse the Diwali 2026 catalogue — hampers, tech, luggage, kitchen and home gifts. Bulk enquiry pricing, pan-India delivery.",
    images: [`${BASE}/catalogue-2026-images/page-02-img-01_560x396.png`],
  },
};

export default function DiwaliPage() {
  /* ItemList of the real catalogue products. No `offers` block: an `mrp` here
     is the originating brand's printed MRP, not a price this site sells at, so
     publishing it as an offer would be inaccurate structured data. */
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Diwali 2026 Catalogue",
    url: `${BASE}${PATH}`,
    numberOfItems: diwali2026Products.length,
    itemListElement: diwali2026Products.map((product, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Product",
        name: product.name,
        image: `${BASE}${product.image}`,
        ...(product.brand ? { brand: { "@type": "Brand", name: product.brand } } : {}),
        ...(product.sku ? { sku: product.sku } : {}),
        ...(product.description ? { description: product.description } : {}),
      },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE },
      {
        "@type": "ListItem",
        position: 2,
        name: "Diwali 2026",
        item: `${BASE}${PATH}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <DiwaliClient />
    </>
  );
}
