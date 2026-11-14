import NewYear2027Client from "../../../components/DiwaliClient";
import newYear2027Products from "../../../data/new-year-2027-products";

const BASE = "https://printkee.com";
const PATH = "/new-year-2027";
const socialImage =
  newYear2027Products.find((product) => product.id === "nutraj-gb52-leafy-whispers-300gm")?.image
  || newYear2027Products[0]?.image;

export const metadata = {
  title: "New Year 2027 Corporate Gifts & Customized Gift Collection",
  description:
    "Explore Printkee's New Year 2027 corporate gifting collection. Discover personalized gifts, premium drinkware, bags, technology, and bulk gifting solutions.",
  keywords: [
    "New Year 2027 corporate gifts",
    "customized corporate gifts",
    "personalized gifts",
    "bulk corporate gifting",
    "New Year gift collection",
  ],
  alternates: { canonical: `${BASE}${PATH}` },
  openGraph: {
    title: "New Year 2027 Corporate Gifts & Customized Gift Collection | Printkee",
    description:
      "Explore personalized gifts, premium drinkware, bags, technology, and thoughtful bulk corporate gifting solutions for a memorable start to 2027.",
    url: `${BASE}${PATH}`,
    type: "website",
    images: [
      {
        url: `${BASE}${socialImage}`,
        alt: "New Year corporate gift collection from Printkee",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "New Year 2027 Corporate Gifts & Customized Gift Collection | Printkee",
    description:
      "Explore personalized gifts, premium merchandise, and bulk corporate gifting solutions for 2027.",
    images: [`${BASE}${socialImage}`],
  },
};

export default function NewYear2027Page() {
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "New Year 2027 Corporate Gift Collection",
    url: `${BASE}${PATH}`,
    numberOfItems: newYear2027Products.length,
    itemListElement: newYear2027Products.map((product, i) => ({
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
        name: "New Year 2027 Gifts",
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
      <NewYear2027Client />
    </>
  );
}
