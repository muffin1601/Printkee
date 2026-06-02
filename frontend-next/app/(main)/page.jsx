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

const BASE = "https://printkee.com";

export const metadata = {
  title: "Premium Corporate Gifting & Custom Branding Solutions India",
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
    "Printkee",
  ],
  alternates: { canonical: BASE },
  openGraph: {
    title: "Premium Corporate Gifting & Custom Branding Solutions India",
    description:
      "Discover top corporate gifting items with custom branding for events, promotions, onboarding and office needs. Fast delivery, bulk order support across India.",
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
    title: "Premium Corporate Gifting & Custom Branding Solutions India",
    description:
      "Custom branding, bulk corporate gifts, fast delivery across India. Your trusted gifting partner.",
    images: [`${BASE}/assets/printkeeLogo.webp`],
  },
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <CategorySlider />
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
