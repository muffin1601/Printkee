import "../styles/global.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

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
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
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
