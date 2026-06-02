import SubcategoryDisplay from "../../../components/SubcategoryDisplay";

export async function generateMetadata({ params }) {
  const { category } = await params;
  try {
    const res = await fetch(
      `${process.env.BACKEND_URL}/api/category/categories/${category}`,
      { cache: "no-store" }
    );
    const data = await res.json();
    const canonicalUrl = `https://printkee.com/${category}`;

    return {
      title: data.seo?.metaTitle || `${data.name} | MF Global Services`,
      description:
        data.seo?.metaDescription ||
        data.description ||
        `Explore our premium collection of ${data.name} at MF Global Services.`,
      keywords: data.seo?.keywords || [`${data.name}`, "corporate gifts", `${data.name} India`],
      alternates: { canonical: canonicalUrl },
      openGraph: {
        title: data.name,
        description: data.seo?.metaDescription || data.description || `Explore ${data.name} category.`,
        url: canonicalUrl,
      },
    };
  } catch {
    return { title: "Category | MF Global Services" };
  }
}

export default async function CategoryPage({ params }) {
  const { category } = await params;

  let categoryData = null;
  try {
    const res = await fetch(
      `${process.env.BACKEND_URL}/api/category/categories/${category}`,
      { cache: "no-store" }
    );
    categoryData = await res.json();
  } catch (e) {
    console.error("Failed to fetch category:", e);
  }

  return <SubcategoryDisplay categoryData={categoryData} />;
}
