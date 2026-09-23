import ContactForm from "../../../components/ContactForm";

const BASE = "https://printkee.com";

export const metadata = {
  title: "Contact Printkee | Corporate Gifting Enquiries",
  description:
    "Contact Printkee for customised corporate gifts, branded merchandise and bulk-gifting enquiries. Share your requirement, quantity and branding needs.",
  keywords: [
    "contact Printkee",
    "corporate gifting enquiry",
    "Printkee contact",
    "gifting solutions India",
    "corporate gifts Delhi",
  ],
  alternates: { canonical: `${BASE}/contact` },
  openGraph: {
    title: "Contact Printkee | Corporate Gifting Enquiries",
    description:
      "Reach out for customized corporate gifting solutions. Fast response, bulk orders, custom branding.",
    url: `${BASE}/contact`,
    type: "website",
    images: [{ url: `${BASE}/assets/printkeeLogo.webp`, alt: "Contact Printkee" }],
  },
  twitter: {
    card: "summary",
    title: "Contact Printkee | Corporate Gifting Enquiries",
    description:
      "Get in touch with Printkee for customised corporate gifting solutions.",
  },
};

export default function ContactPage() {
  return <ContactForm />;
}
