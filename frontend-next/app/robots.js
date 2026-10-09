export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api/", "/login", "/customize", "/search", "/blogs/post"],
      },
    ],
    sitemap: ["https://printkee.com/sitemap.xml", "https://printkee.com/sitemap-index.xml"],
    host: "https://printkee.com",
  };
}
