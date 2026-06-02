import BlogFormClient from "../../../../components/BlogFormClient";

export const metadata = {
  title: "Post a New Blog | MF Global Services",
  description:
    "Contribute to MF Global Services blog. Share your insights, ideas, and news with our community by posting a new blog today!",
  alternates: { canonical: "https://printkee.com/blogs/post" },
};

export default function BlogPostPage() {
  return <BlogFormClient />;
}
