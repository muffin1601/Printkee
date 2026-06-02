import BlogListClient from "../../../components/BlogListClient";

export const metadata = {
  title: "Latest Blogs on Corporate Gifting | MF Global Services",
  description:
    "Explore insightful blogs and updates from MF Global Services. Stay informed about corporate gifting trends, branding tips, and industry insights.",
  keywords: [
    "corporate gifting blog",
    "branding tips",
    "promotional products India",
    "MF Global Services blog",
    "corporate gifting trends",
  ],
  alternates: { canonical: "https://printkee.com/blogs" },
  openGraph: {
    title: "Latest Blogs on Corporate Gifting | MF Global Services",
    description:
      "Explore insightful blogs from MF Global Services on corporate gifting, branding, and promotional products.",
    url: "https://printkee.com/blogs",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Latest Blogs on Corporate Gifting | MF Global Services",
    description:
      "Corporate gifting trends, branding tips, and industry insights from MF Global Services.",
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
