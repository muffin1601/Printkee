import SubcategoryDisplay from "../../../components/SubcategoryDisplay";
import aboutSubcategoryData from "../../../data/faqsdata";

const BASE = "https://printkee.com";
const BACKEND = process.env.BACKEND_URL;

async function getCategory(slug) {
  try {
    const res = await fetch(`${BACKEND}/api/category/categories/${slug}`, {
      cache: "no-store",
    });
    return res.ok ? res.json() : null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { category } = await params;
  const data = await getCategory(category);
  if (!data) return { title: "Category | MF Global Services" };

  const canonical = `${BASE}/${category}`;
  const title = data.seo?.metaTitle || `${data.name} | MF Global Services`;
  const desc =
    data.seo?.metaDescription ||
    data.description ||
    `Explore our premium collection of ${data.name} at MF Global Services.`;

  return {
    title,
    description: desc,
    keywords: data.seo?.keywords || [
      data.name,
      "corporate gifts",
      `${data.name} India`,
    ],
    alternates: { canonical },
    openGraph: {
      title,
      description: desc,
      url: canonical,
      type: "website",
      images: data.image ? [{ url: data.image, alt: data.name }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: desc,
      images: data.image ? [data.image] : [],
    },
  };
}

export default async function CategoryPage({ params }) {
  const { category } = await params;
  const categoryData = await getCategory(category);

  /* ── BreadcrumbList JSON-LD ── */
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE },
      {
        "@type": "ListItem",
        position: 2,
        name: categoryData?.name || category,
        item: `${BASE}/${category}`,
      },
    ],
  };

  /* ── FAQPage JSON-LD from static data ── */
  const faqData = aboutSubcategoryData[category];
  const faqSchema =
    faqData?.faqs?.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqData.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer },
          })),
        }
      : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <SubcategoryDisplay categoryData={categoryData} />
    </>
  );
}
