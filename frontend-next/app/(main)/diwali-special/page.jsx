import DiwaliClient from "../../../components/DiwaliClient";

const BASE = "https://printkee.com";

export const metadata = {
  title: "Diwali Corporate Gifting 2025 | Premium Gift Hampers",
  description:
    "Explore premium Diwali corporate gifting ideas for employees and clients. Download our Diwali catalogue featuring hampers, electronics, bags, and branded gifts.",
  keywords: [
    "Diwali corporate gifting",
    "Diwali gift hampers",
    "corporate Diwali gifts India",
    "festive gifting solutions",
    "Diwali branded gifts",
  ],
  alternates: { canonical: `${BASE}/diwali-special` },
  openGraph: {
    title: "Diwali Corporate Gifting 2025 | Premium Gift Hampers",
    description:
      "Premium Diwali corporate gifting ideas — custom hampers, electronics, bags, and branded gifts for employees and clients.",
    url: `${BASE}/diwali-special`,
    type: "website",
    images: [{ url: `${BASE}/images/diwali-banner.webp`, alt: "Diwali Corporate Gifting" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Diwali Corporate Gifting 2025 | Premium Gift Hampers",
    description:
      "Premium Diwali gift hampers and corporate gifting solutions for employees and clients across India.",
    images: [`${BASE}/images/diwali-banner.webp`],
  },
};

export default function DiwaliPage() {
  return <DiwaliClient />;
}
