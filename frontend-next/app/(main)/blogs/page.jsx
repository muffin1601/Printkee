import BlogListClient from "../../../components/BlogListClient";

export const metadata = {
  title: "Latest Blogs | MF Global Services",
  description:
    "Explore insightful blogs and updates from MF Global Services. Stay informed about corporate gifting trends, branding tips, and industry insights.",
  alternates: { canonical: "https://printkee.com/blogs" },
};

export default function BlogsPage() {
  return <BlogListClient />;
}
