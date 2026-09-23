import BlogListClient from "../../../components/BlogListClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Corporate Gifting Insights & Ideas | Printkee",
  description:
    "Explore Printkee insights on corporate gifting, branded merchandise, employee onboarding and business-event gift ideas.",
  keywords: [
    "corporate gifting blog",
    "branding tips",
    "promotional products India",
    "Printkee blog",
    "corporate gifting trends",
  ],
  alternates: { canonical: "https://printkee.com/blogs" },
  openGraph: {
    title: "Corporate Gifting Insights & Ideas | Printkee",
    description:
      "Explore Printkee insights on corporate gifting, branding and promotional products.",
    url: "https://printkee.com/blogs",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Corporate Gifting Insights & Ideas | Printkee",
    description:
      "Corporate gifting trends, branding tips and industry insights from Printkee.",
  },
};

export default async function BlogsPage() {
  let blogs = [];
  try {
    const res = await fetch(`${process.env.BACKEND_URL}/api/blogs`, {
      cache: "no-store",
    });
    blogs = await res.json();
  } catch (err) {
    console.error("Failed to fetch blogs server-side:", err);
  }

  return <BlogListClient initialBlogs={blogs} />;
}
