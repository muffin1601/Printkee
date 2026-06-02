import BlogViewClient from "../../../../components/BlogViewClient";

export async function generateMetadata({ params }) {
  const { id } = await params;
  try {
    const res = await fetch(`${process.env.BACKEND_URL}/api/blogs/${id}`, {
      cache: "no-store",
    });
    const blog = await res.json();
    return {
      title: `${blog.title} | MF Global Blog`,
      description: blog.content?.slice(0, 160).replace(/<[^>]+>/g, "") || "",
      alternates: { canonical: `https://printkee.com/blog/${id}` },
      openGraph: {
        title: blog.title,
        description: blog.content?.slice(0, 160).replace(/<[^>]+>/g, "") || "",
        images: [`${process.env.NEXT_PUBLIC_IMG_URL}/uploads/${blog.image}`],
      },
    };
  } catch {
    return { title: "Blog | MF Global Services" };
  }
}

export default function BlogPage({ params }) {
  return <BlogViewClient params={params} />;
}
