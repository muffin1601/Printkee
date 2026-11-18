import NewYear2027Client from "../../../components/DiwaliClient";
import newYear2027Products from "../../../data/new-year-2027-products";
import { getNewYearPage } from "../../../lib/newYearPage";

const BASE = "https://printkee.com";
const PATH = "/new-year-2027";
const socialImage = newYear2027Products[0]?.image;

export const dynamic = "force-dynamic";

export const metadata = {
  title: "New Year 2027 Gift Kits, Diaries, Pens & Calendars",
  description:
    "Explore Printkee's New Year 2027 Gifta Guru gift kits, diaries, pens, notebooks, and calendars for corporate teams, clients, and partners.",
  keywords: [
    "New Year 2027 corporate gifts",
    "Gifta Guru gift kits",
    "New Year diaries pens and calendars",
    "notebook and pen gift kits",
    "corporate stationery gifts",
    "bulk corporate gifting",
    "New Year gift collection",
  ],
  alternates: { canonical: `${BASE}${PATH}` },
  openGraph: {
    title: "New Year 2027 Gift Kits, Diaries, Pens & Calendars | Printkee",
    description:
      "Explore Gifta Guru gift kits, diaries, pens, notebooks, and calendars for New Year 2027 corporate gifting.",
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
    title: "New Year 2027 Gift Kits, Diaries, Pens & Calendars | Printkee",
    description:
      "Explore Gifta Guru gift kits, diaries, pens, notebooks, and calendars for New Year 2027 corporate gifting.",
    images: [`${BASE}${socialImage}`],
  },
};

export default async function NewYear2027Page() {
  const { sections, banner } = await getNewYearPage();
  const displayedProducts = sections.flatMap((section) => section.products);
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "New Year 2027 Corporate Gift Collection",
    url: `${BASE}${PATH}`,
    numberOfItems: displayedProducts.length,
    itemListElement: displayedProducts.map((product, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Product",
        name: product.name,
        image: new URL(product.image, BASE).href,
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
      <NewYear2027Client banner={banner} sections={sections} />
    </>
  );
}
