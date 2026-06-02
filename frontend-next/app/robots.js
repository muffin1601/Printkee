export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/login", "/customize/", "/search"],
      },
    ],
    sitemap: "https://printkee.com/sitemap.xml",
    host: "https://printkee.com",
  };
}
