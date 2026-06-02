import BlogViewClient from "../../../../components/BlogViewClient";

const IMG_URL = process.env.NEXT_PUBLIC_IMG_URL || "";
const BASE = "https://printkee.com";

async function getBlog(id) {
  try {
    const res = await fetch(`${process.env.BACKEND_URL}/api/blogs/${id}`, {
      cache: "no-store",
    });
    return res.ok ? res.json() : null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const blog = await getBlog(id);
  if (!blog) return { title: "Blog | MF Global Services" };

  const desc = blog.content?.replace(/<[^>]+>/g, "").slice(0, 160) || "";
  const imageUrl = blog.image ? `${IMG_URL}/uploads/${blog.image}` : "";
  const canonical = `${BASE}/blog/${id}`;

  return {
    title: `${blog.title} | MF Global Blog`,
    description: desc,
    alternates: { canonical },
    openGraph: {
      title: blog.title,
      description: desc,
      url: canonical,
      type: "article",
      publishedTime: blog.date,
      authors: [blog.author || "MF Global Services"],
      images: imageUrl ? [{ url: imageUrl, alt: blog.title }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: desc,
      images: imageUrl ? [imageUrl] : [],
    },
  };
}

export default async function BlogPage({ params }) {
  const { id } = await params;
  const blog = await getBlog(id);

  /* ── BlogPosting JSON-LD — server-rendered, visible to Googlebot ── */
  const jsonLd = blog
    ? {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: blog.title,
        description: blog.content?.replace(/<[^>]+>/g, "").slice(0, 200) || "",
        image: blog.image ? `${IMG_URL}/uploads/${blog.image}` : undefined,
        author: {
          "@type": "Person",
          name: blog.author || "MF Global Services",
        },
        publisher: {
          "@type": "Organization",
          name: "Printkee",
          logo: {
            "@type": "ImageObject",
            url: `${BASE}/assets/printkeeLogo.webp`,
          },
        },
        datePublished: blog.date,
        dateModified: blog.date,
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${BASE}/blog/${id}`,
        },
        url: `${BASE}/blog/${id}`,
      }
    : null;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <BlogViewClient initialBlog={blog} blogId={id} />
    </>
  );
}
