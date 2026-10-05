import SeoHub from "../../../components/SeoHub";

export const revalidate = 3600;
export const metadata = {
  title: { absolute: "Corporate Gifting Planning Hub | Printkee" },
  description: "Explore Printkee's corporate gifting collections, buyer use cases, location guidance and procurement resources for customised business gifting.",
  alternates: { canonical: "https://printkee.com/corporate-gifting" },
};

export default function CorporateGiftingHub() {
  return <SeoHub path="/corporate-gifting" pageType="CORE_CATEGORY" title="Corporate Gifting Planning Hub" intro="Use this hub to navigate product collections and reviewed commercial guides for employee, client, event and business gifting requirements.">
    <section><h2>Plan around the requirement</h2><p>Start with the recipient, the purpose of the programme, the branding requirement and the quantity range. The catalogue provides product-led routes; approved landing pages add guidance only where they have a distinct purpose and relevant product selection.</p></section>
  </SeoHub>;
}
