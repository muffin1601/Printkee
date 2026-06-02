import ProductDisplay from "../../../../components/ProductDisplay";

export async function generateMetadata({ params }) {
  const { category, subcategory } = await params;
  try {
    const res = await fetch(
      `${process.env.BACKEND_URL}/api/subcategory/subcategory-fetch/${category}/${subcategory}`,
      { cache: "no-store" }
    );
    const data = await res.json();
    const sub = data.subcategory;
    const cat = data.category;
    const canonicalUrl = `https://printkee.com/${category}/${subcategory}`;

    return {
      title:
        sub?.seo?.metaTitle ||
        `${sub?.name} | ${cat?.name} - MF Global Services`,
      description:
        sub?.seo?.metaDescription ||
        sub?.description ||
        `Explore premium ${sub?.name} under ${cat?.name}.`,
      alternates: { canonical: canonicalUrl },
      openGraph: {
        title: sub?.name,
        url: canonicalUrl,
      },
    };
  } catch {
    return { title: "Products | MF Global Services" };
  }
}

export default async function SubcategoryPage({ params }) {
  const { category, subcategory } = await params;

  let subcategoryData = null;
  let categoryData = null;
  let products = [];

  try {
    const res = await fetch(
      `${process.env.BACKEND_URL}/api/subcategory/subcategory-fetch/${category}/${subcategory}`,
      { cache: "no-store" }
    );
    const data = await res.json();
    products = data.products || [];
    categoryData = data.category || null;
    subcategoryData = data.subcategory || null;
  } catch (e) {
    console.error("Failed to fetch subcategory:", e);
  }

  return (
    <ProductDisplay
      subcategoryData={subcategoryData}
      categoryData={categoryData}
      products={products}
    />
  );
}
