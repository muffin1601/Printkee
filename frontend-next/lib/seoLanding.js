import { SITE_URL, brandedTitle } from "./siteConfig";

const BACKEND = process.env.BACKEND_URL || "http://localhost:5031";

export const pathFromSegments = (...segments) =>
  `/${segments.flat().filter(Boolean).map((segment) => String(segment).replace(/^\/+|\/+$/g, "")).join("/")}`;

export async function getSeoLandingPage(path) {
  try {
    const response = await fetch(
      `${BACKEND}/api/seo-pages/resolve?path=${encodeURIComponent(path)}`,
      { next: { revalidate: 3600, tags: ["seo-pages", `seo-page:${path}`] } }
    );
    return response.ok ? response.json() : null;
  } catch {
    return null;
  }
}

export function seoLandingMetadata(page) {
  const canonical = page.canonicalUrl || `${SITE_URL}${page.path}`;
  const title = brandedTitle(page.seoTitle || page.h1 || page.name);
  const description = page.metaDescription || page.intro;
  const image = page.ogImage || `${SITE_URL}/assets/printkeeLogo.webp`;

  return {
    title: { absolute: title },
    description,
    robots: { index: page.robots?.index === true, follow: page.robots?.follow !== false },
    alternates: { canonical },
    openGraph: {
      title: page.ogTitle || title,
      description: page.ogDescription || description,
      url: canonical,
      type: "website",
      images: [{ url: image, alt: page.h1 || page.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: page.ogTitle || title,
      description: page.ogDescription || description,
      images: [image],
    },
  };
}
