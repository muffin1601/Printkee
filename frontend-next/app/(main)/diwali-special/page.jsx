import DiwaliClient from "../../../components/DiwaliClient";
import { productUrl } from "../../../utils/product";

const BASE = "https://printkee.com";
const BACKEND = process.env.BACKEND_URL;

export const metadata = {
  title: "Diwali Gifts 2026 | Personalized & Corporate Diwali Gifting",
  description:
    "Shop premium personalized Diwali gifts — custom hampers, branded desk gifts and festive kits for family, friends and corporate gifting. Bulk pricing, pan-India delivery.",
  keywords: [
    "Diwali gifts",
    "personalized Diwali gifts",
    "Diwali corporate gifting",
    "Diwali gift hampers",
    "custom printed Diwali gifts",
    "festive gifting India",
  ],
  alternates: { canonical: `${BASE}/diwali-special` },
  openGraph: {
    title: "Diwali Gifts 2026 | Personalized & Corporate Diwali Gifting",
    description:
      "This Diwali, gift something personal — custom hampers, branded desk gifts and festive kits, delivered across India.",
    url: `${BASE}/diwali-special`,
    type: "website",
    images: [{ url: `${BASE}/images/diwali-banner.webp`, alt: "Printkee Diwali Gifts" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Diwali Gifts 2026 | Personalized & Corporate Diwali Gifting",
    description:
      "Personalized and corporate Diwali gifts with custom branding. Bulk pricing, pan-India delivery.",
    images: [`${BASE}/images/diwali-banner.webp`],
  },
};

/**
 * Fetches one curated collection of real products.
 * Never throws: a failing section renders as empty rather than taking the
 * whole campaign page down.
 */
async function getCollection(tags, limit = 8, exclude = []) {
  if (!BACKEND) return [];
  try {
    const params = new URLSearchParams({
      tags: tags.join(","),
      limit: String(limit),
    });
    if (exclude.length) params.set("exclude", exclude.join(","));

    const res = await fetch(`${BACKEND}/api/product/collection?${params}`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return [];
    const body = await res.json();
    /* utils/response `ok()` returns the raw payload — an array here. */
    return Array.isArray(body) ? body : [];
  } catch {
    return [];
  }
}

export default async function DiwaliPage() {
  /* Themes are resolved in order, each excluding everything already shown,
     so the six rails stay distinct even when the tag data is sparse and the
     backend falls back to featured/newest products. Sequential rather than
     parallel for that reason — six indexed queries against a page that is
     ISR-cached for five minutes. */
  const THEMES = [
    { key: "bestsellers",  tags: ["diwali", "bestseller", "gift set"] },
    { key: "personalized", tags: ["personalized", "custom", "printing", "branding"] },
    { key: "family",       tags: ["hamper", "home", "kitchen", "drink"] },
    { key: "friends",      tags: ["lifestyle", "mug", "apparel", "accessor"] },
    { key: "corporate",    tags: ["corporate", "executive", "employee", "office"] },
    { key: "recommended",  tags: ["premium", "trophy", "technology"] },
  ];

  const collections = {};
  const used = [];

  for (const theme of THEMES) {
    const items = await getCollection(theme.tags, 8, used);
    collections[theme.key] = items;
    items.forEach((p) => p?.slug && used.push(p.slug));
  }

  /* ── ItemList JSON-LD built from the real bestseller products ── */
  const listed = (collections.bestsellers || []).filter((p) => productUrl(p));
  const itemListSchema = listed.length
    ? {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Diwali Bestsellers",
        url: `${BASE}/diwali-special`,
        numberOfItems: listed.length,
        /* No `offers`/price block: pricing is quoted per enquiry and is not
           published anywhere on the site, so it must not leak into search
           results through structured data either. */
        itemListElement: listed.map((product, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "Product",
            name: product.name,
            url: `${BASE}${productUrl(product)}`,
            image: product.images?.[0]?.url || undefined,
          },
        })),
      }
    : null;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE },
      {
        "@type": "ListItem",
        position: 2,
        name: "Diwali Gifts",
        item: `${BASE}/diwali-special`,
      },
    ],
  };

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
      <DiwaliClient collections={collections} />
    </>
  );
}
