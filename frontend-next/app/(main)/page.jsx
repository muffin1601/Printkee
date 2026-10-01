import HeroSection from "../../components/HeroSection";
import CategorySlider from "../../components/CategorySlider";
import OurServices from "../../components/OurServices";
import ShopByOccasion from "../../components/ShopByOccasion";
import WhyChooseUs from "../../components/WhyChooseUs";
import Industries from "../../components/Industries";
import HowitWorks from "../../components/HowitWorks";
import Testimonials from "../../components/Testimonials";
import GetQuoteCTA from "../../components/GetQuoteCTA";
import FaqSectionHome from "../../components/FaqSectionHome";
import HomeCommercialOverview from "../../components/HomeCommercialOverview";

import { SITE_URL } from "../../lib/siteConfig";

const BASE = SITE_URL;

export const metadata = {
  title: "Corporate Gifts & Branded Merchandise India",
  description:
    "Explore corporate gifts and branded merchandise for employee, client, event, onboarding and promotional requirements across India.",
  keywords: [
    "corporate gifting India",
    "business gifts",
    "employee gifts",
    "custom hampers",
    "promotional items",
    "branded merchandise",
    "Printkee",
  ],
  alternates: { canonical: BASE },
  openGraph: {
    title: "Corporate Gifts & Branded Merchandise India",
    description:
      "Explore corporate gifts and branded merchandise for employee, client, event, onboarding and promotional requirements across India.",
    url: BASE,
    type: "website",
    images: [
      {
        url: `${BASE}/assets/printkeeLogo.webp`,
        width: 1200,
        height: 630,
        alt: "Printkee Corporate Gifting",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Corporate Gifts & Branded Merchandise India",
    description:
      "Corporate gifts and branded merchandise for employee, client, event and promotional requirements.",
    images: [`${BASE}/assets/printkeeLogo.webp`],
  },
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <CategorySlider />
      <HomeCommercialOverview />
      <ShopByOccasion />
      <OurServices />
      <WhyChooseUs />
      <Industries />
      <FaqSectionHome />
      <HowitWorks />
      <Testimonials />
      <GetQuoteCTA />
    </>
  );
}
