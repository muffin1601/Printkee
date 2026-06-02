import SingleProductDisplay from "../../../../../components/SingleProductDisplay";

export async function generateMetadata({ params }) {
  const { category, subcategory, product } = await params;
  try {
    const res = await fetch(
      `${process.env.BACKEND_URL}/api/product/product-fetch/${category}/${subcategory}/${product}`,
      { cache: "no-store" }
    );
    const data = await res.json();
    const prod = data.product;
    const sub = data.subcategory;
    const canonicalUrl = `https://printkee.com/${category}/${subcategory}/${product}`;

    return {
      title:
        prod?.seo?.metaTitle ||
        `${prod?.name} | ${sub?.name} - MF Global Services`,
      description:
        prod?.seo?.metaDescription ||
        prod?.description?.short ||
        `Explore premium ${prod?.name} from our ${sub?.name} range.`,
      alternates: { canonical: canonicalUrl },
      openGraph: {
        title: prod?.name,
        description: prod?.seo?.metaDescription || prod?.description?.short || "",
        images: prod?.images?.[0]?.url ? [prod.images[0].url] : [],
        url: canonicalUrl,
      },
    };
  } catch {
    return { title: "Product | MF Global Services" };
  }
}

export default async function ProductPage({ params }) {
  const { category, subcategory, product } = await params;

  let productData = null;
  let subcategoryData = null;
  let categoryData = null;

  try {
    const res = await fetch(
      `${process.env.BACKEND_URL}/api/product/product-fetch/${category}/${subcategory}/${product}`,
      { cache: "no-store" }
    );
    const data = await res.json();
    productData = data.product;
    subcategoryData = data.subcategory;
    categoryData = data.category;
  } catch (e) {
    console.error("Failed to fetch product:", e);
  }

  return (
    <SingleProductDisplay
      productData={productData}
      subcategoryData={subcategoryData}
      categoryData={categoryData}
    />
  );
}
