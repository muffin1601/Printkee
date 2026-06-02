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
  ],
  alternates: {
    canonical: "https://printkee.com",
  },
  openGraph: {
    title: "Premium Corporate Gifting & Custom Branding Solutions India",
    description:
      "Discover top corporate gifting items with custom branding for events, promotions, onboarding and office needs.",
    url: "https://printkee.com",
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
