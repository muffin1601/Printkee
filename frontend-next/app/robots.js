export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/", "/login", "/customize/", "/search", "/blogs/post"],
      },
    ],
    sitemap: "https://printkee.com/sitemap.xml",
    host: "https://printkee.com",
  };
}
