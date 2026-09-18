export const locationCorporateGiftPages = {
  delhi: {
    name: "Delhi", label: "Delhi", primaryKeyword: "corporate gifts Delhi",
    title: "Corporate Gifts in Delhi for Business Gifting | Printkee",
    description: "Explore corporate gifts in Delhi for employee recognition, client gifting, events and branded business campaigns. Request a tailored bulk-gifting quote from Printkee.",
    intro: "Delhi businesses often need corporate gifting that balances brand presentation with practical coordination across teams, events and recipient groups.",
    context: "For a programme centred on New Delhi offices, an event venue or several business locations across the city, agreeing the recipient list and artwork approval process early keeps the final selection focused.",
    useCase: "employee appreciation, client relationship gifting and business-event merchandise",
  },
  noida: {
    name: "Noida", label: "Noida", primaryKeyword: "corporate gifts Noida",
    title: "Corporate Gifts in Noida for Employees & Clients | Printkee",
    description: "Source customised corporate gifts in Noida for employees, clients, onboarding and brand campaigns. Explore Printkee’s practical B2B gifting categories and request a quote.",
    intro: "Noida teams planning a corporate gifting programme can use one clear brief to align employee gifts, client selections and brand-led campaign requirements.",
    context: "Where teams work across offices or use a combination of office and recipient deliveries, a confirmed address sheet and one internal approver make the process easier to manage.",
    useCase: "onboarding kits, team recognition and branded campaign giveaways",
  },
  "greater-noida": {
    name: "Greater Noida", label: "Greater Noida", primaryKeyword: "corporate gifts Greater Noida",
    title: "Corporate Gifts in Greater Noida for Bulk Business Orders | Printkee",
    description: "Find corporate gifts in Greater Noida for bulk business gifting, branded events and employee programmes. Browse Printkee’s corporate collection and request a quote.",
    intro: "Greater Noida organisations can plan corporate gifts around the actual purpose of the programme—whether that is a team moment, client engagement or a brand event.",
    context: "For larger recipient lists, separating core gifts from a smaller premium tier helps procurement teams compare choices without losing the consistency of the main programme.",
    useCase: "bulk employee programmes, conferences and partner gifting",
  },
  gurgaon: {
    name: "Gurgaon", label: "Gurgaon (Gurugram)", primaryKeyword: "corporate gifts Gurgaon",
    title: "Corporate Gifts in Gurgaon (Gurugram) for Businesses | Printkee",
    description: "Discover corporate gifts in Gurgaon and Gurugram for client, employee and branded business gifting. Explore Printkee’s B2B collection and request a tailored quote.",
    intro: "Gurgaon, also known as Gurugram, has a broad mix of corporate teams that need gifting choices to be polished, useful and simple to approve.",
    context: "A short product shortlist with brand-artwork requirements, recipient groups and required-in-hand dates gives stakeholders a practical basis for selecting corporate gifts in Gurgaon.",
    useCase: "client appreciation, leadership gifting and hybrid-team recognition",
  },
  faridabad: {
    name: "Faridabad", label: "Faridabad", primaryKeyword: "corporate gifts Faridabad",
    title: "Corporate Gifts in Faridabad for Branded Business Gifting | Printkee",
    description: "Explore corporate gifts in Faridabad for employee appreciation, client gifting and branded campaigns. Request a relevant bulk-gifting quote from Printkee.",
    intro: "Faridabad businesses can use corporate gifts to recognise teams, support customer relationships and make branded events more memorable.",
    context: "A useful brief identifies the audience first, then the product type and branding detail; this protects the programme from becoming a generic assortment with no clear purpose.",
    useCase: "employee milestones, promotional activity and client thank-yous",
  },
  ghaziabad: {
    name: "Ghaziabad", label: "Ghaziabad", primaryKeyword: "corporate gifts Ghaziabad",
    title: "Corporate Gifts in Ghaziabad for Employee & Client Gifting | Printkee",
    description: "Browse corporate gifts in Ghaziabad for employees, clients, events and customised brand campaigns. Explore Printkee’s B2B gifting options and request a quote.",
    intro: "Ghaziabad teams looking for corporate gifts can begin with a practical selection that is appropriate for the recipient and clear about the business objective.",
    context: "When a programme includes several teams or destinations, use a structured recipient list and confirm brand artwork before finalising the order details.",
    useCase: "corporate events, festive gifting and everyday brand visibility",
  },
};

export const getLocationCorporateGiftPage = (location, service) =>
  service === "corporate-gifts" ? locationCorporateGiftPages[location] || null : null;

export const locationPageEntries = Object.entries(locationCorporateGiftPages).map(([slug, page]) => ({ slug, ...page }));
