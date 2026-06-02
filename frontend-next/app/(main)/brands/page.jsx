import "@/styles/Brands.css";
import brandsList from "../../../data/brandsspl";
import Link from "next/link";

const BASE = "https://printkee.com";

export const metadata = {
  title: "Our Brand Partners | MF Global Services",
  description:
    "MF Global Services partners with premium brands like Adidas, Puma, Noise, and American Tourister to provide top-quality corporate gifts. Explore our brand collaborations.",
  keywords: [
    "brand partners corporate gifting",
    "Adidas corporate gifts",
    "Puma promotional products",
    "American Tourister bulk gifting",
    "premium brand gifting India",
  ],
  alternates: { canonical: `${BASE}/brands` },
  openGraph: {
    title: "Our Brand Partners | MF Global Services",
    description:
      "Premium brand partnerships — Adidas, Puma, Noise, American Tourister and more for top-quality corporate gifting.",
    url: `${BASE}/brands`,
    type: "website",
    images: [{ url: `${BASE}/assets/printkeeLogo.webp`, alt: "Brand Partners Printkee" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Brand Partners | MF Global Services",
    description:
      "Adidas, Puma, Noise, American Tourister and more — premium brands for corporate gifting.",
    images: [`${BASE}/assets/printkeeLogo.webp`],
  },
};

export default function Brands() {
  return (
    <div className="brands-container">
      <h1 className="brands-heading">Brands We Offer</h1>
      <p className="brands-description">
        At MF Global Services, we collaborate with top-tier national and international brands to deliver high-quality corporate gifts. From tech to lifestyle, these brands ensure your gifting experience is premium and memorable.
      </p>

      <div className="brands-grid" role="list">
        {brandsList.map((brand, index) => (
          <Link
            href={`/brands/${brand.slug}`}
            className="brand-card"
            key={index}
            role="listitem"
            aria-label={`View ${brand.name} products`}
          >
            <img src={brand.logo} alt={`${brand.name} logo`} className="brand-logo" />
            <p className="brand-name">{brand.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
