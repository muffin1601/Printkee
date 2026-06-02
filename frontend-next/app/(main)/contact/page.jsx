import ContactForm from "../../../components/ContactForm";

const BASE = "https://printkee.com";

export const metadata = {
  title: "Contact Us | MF Global Services",
  description:
    "Get in touch with MF Global Services for customized corporate gifting solutions. Reach out via our contact form, email, or phone.",
  keywords: [
    "contact MF Global Services",
    "corporate gifting enquiry",
    "Printkee contact",
    "gifting solutions India",
    "corporate gifts Delhi",
  ],
  alternates: { canonical: `${BASE}/contact` },
  openGraph: {
    title: "Contact Us | MF Global Services",
    description:
      "Reach out for customized corporate gifting solutions. Fast response, bulk orders, custom branding.",
    url: `${BASE}/contact`,
    type: "website",
    images: [{ url: `${BASE}/assets/printkeeLogo.webp`, alt: "Contact Printkee" }],
  },
  twitter: {
    card: "summary",
    title: "Contact Us | MF Global Services",
    description:
      "Get in touch with MF Global Services for customized corporate gifting solutions.",
  },
};

export default function ContactPage() {
  return <ContactForm />;
}
