import { notFound } from "next/navigation";
import SubcategoryDisplay from "../../../components/SubcategoryDisplay";
import aboutSubcategoryData from "../../../data/faqsdata";
import seoConfig from "../../../data/seoConfig";

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
  const seo = seoConfig[`/${category}`];
  const data = await getCategory(category);
  if (!data) return { title: "Category Not Found | Printkee" };

  const canonical = `${BASE}/${category}`;

  const title = seo?.title
    || data?.seo?.metaTitle
    || `${data?.name} | MF Global Services`;
  const description = seo?.description
    || data?.seo?.metaDescription
    || data?.description
    || `Explore ${data?.name} at MF Global Services.`;
  const image = data?.image || `${BASE}/assets/printkeeLogo.webp`;

  return {
    title,
    description,
    keywords: data?.seo?.keywords || [data?.name, "corporate gifts", `${data?.name} India`],
    alternates: { canonical },
    openGraph: {
      title:       seo?.openGraph?.title       || title,
      description: seo?.openGraph?.description || description,
      url:         canonical,
      type:        "website",
      images:      [{ url: image, alt: data?.name || category }],
    },
    twitter: {
      card:        "summary_large_image",
      title:       seo?.twitter?.title       || title,
      description: seo?.twitter?.description || description,
      images:      [image],
    },
  };
}

export default async function CategoryPage({ params }) {
  const { category } = await params;
  const seo = seoConfig[`/${category}`];
  const categoryData = await getCategory(category);

  if (!categoryData) notFound();

  /* ── BreadcrumbList JSON-LD ── */
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE },
      {
        "@type": "ListItem",
        position: 2,
        name: seo?.h1 || categoryData?.name || category,
        item: `${BASE}/${category}`,
      },
    ],
  };

  /* ── FAQPage JSON-LD ── */
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
      <SubcategoryDisplay
        categoryData={categoryData}
        seoH1={seo?.h1}
        seoH2={seo?.h2}
      />
    </>
  );
}
