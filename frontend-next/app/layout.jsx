import "../styles/global.css";
import "../styles/chatbot.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Montserrat } from "next/font/google";
import Script from "next/script";

/* Montserrat — self-hosted via next/font, no render-block */
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  preload: true,
});

export const metadata = {
  metadataBase: new URL("https://printkee.com"),
  title: {
    default: "Premium Corporate Gifting & Custom Branding Solutions India",
    template: "%s | Printkee",
  },
  description:
    "Discover top corporate gifting items with custom branding for events, promotions, onboarding and office needs. Fast delivery, bulk order support across India.",
  keywords: [
    "corporate gifting India", "MF Global Services", "business gifts",
    "employee gifts", "custom hampers", "promotional items", "branded merchandise", "Printkee",
  ],
  openGraph: {
    siteName: "Printkee",
    locale: "en_IN",
    type: "website",
    images: [{ url: "/assets/printkeeLogo.webp", width: 1200, height: 630, alt: "Printkee" }],
  },
  twitter: { card: "summary_large_image", site: "@printkee", creator: "@printkee" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
};

const organizationSchema = {
  "@context": "https://schema.org", "@type": "Organization",
  name: "Printkee", alternateName: "MF Global Services",
  url: "https://printkee.com",
  logo: { "@type": "ImageObject", url: "https://printkee.com/assets/printkeeLogo.webp", width: 300, height: 130 },
  description: "Printkee is India's trusted partner for premium corporate gifting and custom branding solutions.",
  address: { "@type": "PostalAddress", streetAddress: "F90/1, Beside ESIC Hospital, Okhla Industrial Area Phase 1", addressLocality: "New Delhi", addressRegion: "Delhi", postalCode: "110020", addressCountry: "IN" },
  contactPoint: [{ "@type": "ContactPoint", telephone: "+91-8800904543", contactType: "customer service", areaServed: "IN", availableLanguage: ["English", "Hindi"] }],
  sameAs: ["https://www.facebook.com/share/1DF9K4wAHX/", "https://www.instagram.com/printkee", "https://linkedin.com"],
};

const websiteSchema = {
  "@context": "https://schema.org", "@type": "WebSite",
  name: "Printkee", url: "https://printkee.com",
  potentialAction: { "@type": "SearchAction", target: { "@type": "EntryPoint", urlTemplate: "https://printkee.com/search?q={search_term_string}" }, "query-input": "required name=search_term_string" },
};

const extensionAttributeCleanup = `
(() => {
  const shouldRemove = (name) =>
    name.startsWith("bis_") || name.startsWith("__processed_");

  const clean = (node) => {
    if (!node || node.nodeType !== 1) return;
    Array.from(node.attributes || []).forEach((attr) => {
      if (shouldRemove(attr.name)) node.removeAttribute(attr.name);
    });
  };

  const cleanTree = (root) => {
    clean(root);
    root.querySelectorAll?.("*").forEach(clean);
  };

  cleanTree(document.documentElement);

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === "attributes") clean(mutation.target);
      mutation.addedNodes.forEach(cleanTree);
    });
  });

  observer.observe(document.documentElement, {
    attributes: true,
    childList: true,
    subtree: true,
  });

  window.addEventListener("load", () => {
    cleanTree(document.documentElement);
    setTimeout(() => observer.disconnect(), 1000);
  });
})();
`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={montserrat.variable} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-4BP50X9E7L" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-4BP50X9E7L');
          `}
        </Script>
        <script dangerouslySetInnerHTML={{ __html: extensionAttributeCleanup }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
        {children}
        <ToastContainer position="bottom-right" autoClose={4000} hideProgressBar={false} closeOnClick pauseOnFocusLoss draggable pauseOnHover theme="colored" />
      </body>
    </html>
  );
}
