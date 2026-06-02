import "../styles/global.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Inter, Poppins } from "next/font/google";

/* Self-hosted via next/font — no external request, no render-block */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
  preload: false,
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
    "corporate gifting India",
    "MF Global Services",
    "business gifts",
    "employee gifts",
    "custom hampers",
    "promotional items",
    "branded merchandise",
  ],
  openGraph: {
    siteName: "Printkee",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/assets/printkeeLogo.webp",
        width: 1200,
        height: 630,
        alt: "Printkee — Corporate Gifting & Custom Branding",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@printkee",
    creator: "@printkee",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Printkee",
  alternateName: "MF Global Services",
  url: "https://printkee.com",
  logo: {
    "@type": "ImageObject",
    url: "https://printkee.com/assets/printkeeLogo.webp",
    width: 300,
    height: 130,
  },
  description:
    "Printkee is India's trusted partner for premium corporate gifting and custom branding solutions.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "F90/1, Beside ESIC Hospital, Okhla Industrial Area Phase 1",
    addressLocality: "New Delhi",
    addressRegion: "Delhi",
    postalCode: "110020",
    addressCountry: "IN",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+91-8800904543",
      contactType: "customer service",
      areaServed: "IN",
      availableLanguage: ["English", "Hindi"],
    },
  ],
  sameAs: [
    "https://www.facebook.com/share/1DF9K4wAHX/",
    "https://www.instagram.com/printkee",
    "https://linkedin.com",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Printkee",
  url: "https://printkee.com",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://printkee.com/search?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        {children}
        <ToastContainer
          position="bottom-right"
          autoClose={4000}
          hideProgressBar={false}
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </body>
    </html>
  );
}
