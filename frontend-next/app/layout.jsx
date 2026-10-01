import "../styles/global.css";
import "../styles/chatbot.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Montserrat } from "next/font/google";
import Script from "next/script";
import { BUSINESS, SITE_URL, absoluteUrl } from "../lib/siteConfig";

/* Montserrat — self-hosted via next/font, no render-block */
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  preload: true,
});

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Premium Corporate Gifting & Custom Branding Solutions India",
    template: "%s | Printkee",
  },
  description:
    "Explore corporate gifts and branded merchandise for employee, client, event, onboarding and promotional requirements across India.",
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
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
};

const organizationSchema = {
  "@context": "https://schema.org", "@type": "Organization",
  name: BUSINESS.name, alternateName: BUSINESS.legalName,
  url: SITE_URL,
  logo: { "@type": "ImageObject", url: absoluteUrl("/assets/printkeeLogo.webp"), width: 300, height: 130 },
  description: "Printkee provides corporate gifting, promotional merchandise and custom branding solutions for businesses in India.",
  address: { "@type": "PostalAddress", streetAddress: BUSINESS.address.street, addressLocality: BUSINESS.address.locality, addressRegion: BUSINESS.address.region, postalCode: BUSINESS.address.postalCode, addressCountry: "IN" },
  contactPoint: [{ "@type": "ContactPoint", telephone: BUSINESS.phoneE164, contactType: "sales", areaServed: "IN", availableLanguage: ["English", "Hindi"] }],
};

const websiteSchema = {
  "@context": "https://schema.org", "@type": "WebSite",
  name: BUSINESS.name, url: SITE_URL,
  potentialAction: { "@type": "SearchAction", target: { "@type": "EntryPoint", urlTemplate: `${SITE_URL}/search?q={search_term_string}` }, "query-input": "required name=search_term_string" },
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
        <Script id="meta-pixel" strategy="lazyOnload">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '2573522316405153');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=2573522316405153&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        <script dangerouslySetInnerHTML={{ __html: extensionAttributeCleanup }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
        {children}
        <ToastContainer position="bottom-right" autoClose={4000} hideProgressBar={false} closeOnClick pauseOnFocusLoss draggable pauseOnHover theme="colored" />
      </body>
    </html>
  );
}
