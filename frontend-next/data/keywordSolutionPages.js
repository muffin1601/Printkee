import seeds from "./keywordSolutionSeeds.js";
import { SITE_URL } from "../lib/siteConfig.js";

const guidanceByCluster = {
  "Bags and travel merchandise": {
    image: "/assets/categories/bags-and-travel.webp",
    selection: "Compare carrying purpose, capacity, construction, closures, handles or straps, expected load and the usable branding area.",
    brief: "State the recipient group, intended use, product type, quantity, contents, artwork, destination and required date.",
  },
  "Technology gifts": {
    image: "/assets/categories/technology.webp",
    selection: "Review the documented technical specification, device compatibility, intended workplace use, packaging and available branding area.",
    brief: "Provide the recipient devices or work setting where known, required quantity, artwork, packing needs, destination and required date.",
  },
  "Notebooks, diaries, and pens": {
    image: "/assets/categories/officewriting.webp",
    selection: "Compare format, cover or body material, writing use, binding or presentation style, size and available branding position.",
    brief: "Specify the preferred format, quantity, colour, branding position, artwork, packing requirement and destination.",
  },
  "Custom T-shirts": {
    image: "/assets/subcategories/tshirt.webp",
    selection: "Choose the garment, fabric information, colour, fit, size range and branding position together instead of approving artwork before the base product.",
    brief: "Share the garment choice, checked size schedule, colour split, quantity, authorized artwork, destination and required date.",
  },
  "Polo shirts and uniforms": {
    image: "/assets/subcategories/polotshirt.webp",
    selection: "Compare garment type, workplace setting, fit, colour, size mix, repeat-order needs and the available branding area.",
    brief: "Provide a checked size schedule, garment preference, quantities, artwork, branding position, destination and required date.",
  },
  "Custom hoodies and jackets": {
    image: "/assets/subcategories/winterwear.webp",
    selection: "Review garment type, layer weight, size range, climate, workplace or event use, colour and branding position.",
    brief: "Provide the garment preference, size and colour breakdown, quantities, artwork, destination and required date.",
  },
  "Drinkware and branded bottles": {
    image: "/assets/categories/drinkware.webp",
    selection: "Compare capacity, material, lid or handle format, intended beverage use, carrying needs and the available branding surface.",
    brief: "State the intended use, preferred product, quantity, artwork, packing requirement, destination and required date.",
  },
  "Employee welcome kits": {
    image: "/assets/categories/collection.webp",
    selection: "Build the kit around the recipient journey, required components, useful product mix, message, packing format and delivery method.",
    brief: "List mandatory and optional items, recipient count, personalization data, insert copy, packing format and destinations.",
  },
  "Client and executive gifts": {
    image: "/assets/categories/collection.webp",
    selection: "Choose products around recipient context, presentation, practical use, approved budget and the relationship or occasion.",
    brief: "Share the recipient profile, occasion, product shortlist, quantity, branding, packing, destination and required date.",
  },
  "Corporate gifting": {
    image: "/assets/categories/collection.webp",
    selection: "Start with the recipient, occasion and programme objective, then compare live catalogue products for usefulness, presentation and branding fit.",
    brief: "Share the audience, occasion, quantity, budget range, preferred products, artwork, destinations and required date.",
  },
  "Promotional products": {
    image: "/assets/categories/collection.webp",
    selection: "Match the product to campaign purpose, audience, distribution setting, practical use, artwork visibility and available branding area.",
    brief: "Provide the campaign purpose, audience, quantity, shortlisted products, artwork, distribution plan, destination and target date.",
  },
  "Event and exhibition merchandise": {
    image: "/assets/categories/collection.webp",
    selection: "Plan merchandise around event format, audience, distribution method, portability, usefulness and the time available for review and approval.",
    brief: "State the event, audience, date, quantities, product shortlist, artwork, packing and delivery location.",
  },
  "Eco-friendly gifting": {
    image: "/assets/categories/ecoproducts.webp",
    selection: "Review actual materials, construction, expected use, presentation and product documentation without relying on broad unsupported environmental claims.",
    brief: "Explain the gifting programme, material preference, product type, quantity, artwork, destination and evidence requirements.",
  },
  "Industry-specific gifting": {
    image: "/assets/categories/collection.webp",
    selection: "Define the industry workflow and recipient group before selecting products; usefulness and compliance needs vary by workplace and event setting.",
    brief: "Share the industry, recipient role, use case, quantity, preferred products, artwork, destination and required date.",
  },
};

const defaultGuidance = {
  image: "/assets/categories/collection.webp",
  selection: "Connect the request to a real catalogue product, intended recipient, practical use, quantity and available branding area.",
  brief: "Provide the intended use, product shortlist, quantity, artwork, packing requirement, destination and required date.",
};

const titleCase = (value) => String(value).replace(/\b\w/g, (letter) => letter.toUpperCase());
const personaText = (value) => String(value || "business buyers").replace(/\s*\/\s*/g, " and ").toLowerCase();

const buildPage = (seed) => {
  const guidance = guidanceByCluster[seed.topicCluster] || defaultGuidance;
  const name = titleCase(seed.primaryKeyword);
  const path = `/solutions/${seed.slug}`;
  const verified = seed.indexable;
  const targetName = seed.recommendedUrl === "/" ? "Printkee corporate gifting catalogue" : seed.topicCluster;

  return {
    name,
    path,
    slug: seed.slug,
    pageType: "KEYWORD_SOLUTION",
    category: seed.category,
    subcategory: seed.topicCluster,
    location: "India",
    searchIntent: seed.searchIntent.toLowerCase(),
    primaryKeyword: seed.primaryKeyword,
    secondaryKeywords: seed.secondaryKeywords,
    seoTitle: `${name} for Business Orders | Printkee`,
    metaDescription: `Explore ${seed.primaryKeyword} for business requirements. Compare relevant catalogue options and prepare a complete product, branding and delivery brief.`,
    h1: `${name}: Product and Quotation Guide`,
    intro: `${name} is a ${seed.searchIntent.toLowerCase()} search theme used by ${personaText(seed.buyerPersona)}. This page connects that requirement to the most relevant Printkee catalogue area without creating separate thin pages for every spelling, location or buying modifier. Product availability, branding feasibility, quantities, commercial terms and delivery timing are confirmed after the complete brief is reviewed.`,
    bodyContent: verified
      ? `${guidance.selection} The linked catalogue is the starting point for product selection, not a promise that every item, colour, size or branding method is continuously available. Review the product information and identify the closest option before requesting commercial details.\n\n${guidance.brief} Separate quantities by product and variant wherever applicable. Supply only artwork and recipient data you are authorized to use. Final specifications, branding method, artwork reproduction, availability, price and timing must be confirmed through quotation and approval.`
      : `${name} appears in the keyword research file, but the underlying product or service is not currently verified in the Printkee catalogue. This page is therefore excluded from search indexing and does not advertise an unsupported offering.\n\nIf this service becomes available, the catalogue record, specifications, fulfilment scope, imagery and quotation process should be verified before this page is approved for indexing. Until then, buyers can contact Printkee to describe the requirement without assuming availability.`,
    contentBlocks: [
      {
        heading: `How to evaluate ${seed.primaryKeyword}`,
        body: `${guidance.selection} Compare documented facts and suitability for the actual recipient or programme instead of choosing from the search phrase alone.`,
      },
      {
        heading: "Prepare a quotation-ready requirement",
        body: `${guidance.brief} A structured brief reduces ambiguity and makes product, artwork and delivery review more useful.`,
      },
      {
        heading: "Confirm product and branding details",
        body: "Ask for confirmation of the selected product, specification, branding position, artwork version, packaging and delivery scope. Do not rely on a generic page for fixed stock, minimum quantity or turnaround claims.",
      },
    ],
    faqs: [
      {
        question: `Where can I review products for ${seed.primaryKeyword}?`,
        answer: verified
          ? `Use the linked ${targetName} page to review relevant catalogue options, then request confirmation for the selected product and complete requirement.`
          : "This offering is not currently verified in the catalogue. Contact Printkee with the requirement before assuming that it is available.",
      },
      {
        question: `Can ${seed.primaryKeyword} include approved company artwork?`,
        answer: "Branding can be requested where suitable. Feasibility depends on the selected product, artwork, placement, quantity and available production method.",
      },
      {
        question: `Is pricing fixed for ${seed.primaryKeyword}?`,
        answer: "No fixed price is stated on this page. Pricing requires a selected product and confirmed quantity, specification, branding, packing and delivery scope.",
      },
    ],
    featuredHeading: verified ? `Explore ${seed.topicCluster.toLowerCase()}` : "Offering verification required",
    featuredProducts: verified ? [{
      _id: `keyword-solution:${seed.slug}`,
      name: `Browse ${targetName}`,
      href: seed.recommendedUrl,
      images: [{ url: guidance.image, altText: `${seed.primaryKeyword} catalogue options` }],
    }] : [],
    relatedCategories: verified ? [{ label: `Browse ${targetName}`, url: seed.recommendedUrl }] : [],
    relatedPages: [],
    relatedLocations: [{ label: "Corporate gifting locations", url: "/locations" }],
    parentPath: "/solutions",
    ctaText: verified ? `Request a ${name} Quote` : "Ask About This Requirement",
    quotationPath: "/contact",
    canonicalUrl: `${SITE_URL}${path}`,
    robots: { index: verified, follow: true },
    ogTitle: `${name} for Business Requirements`,
    ogDescription: `Review ${seed.primaryKeyword} options and prepare a product-specific quotation brief with Printkee.`,
    ogImage: `${SITE_URL}${guidance.image}`,
    images: [{ url: guidance.image, altText: `${seed.primaryKeyword} catalogue options` }],
    schemaOptions: { collectionPage: true, breadcrumb: true, itemList: verified, faq: true },
  };
};

const builtPages = seeds.map(buildPage);

const solutionHub = {
  name: "Corporate Gifting and Merchandise Solutions",
  path: "/solutions",
  slug: "solutions",
  pageType: "KEYWORD_SOLUTION_HUB",
  primaryKeyword: "corporate gifting solutions",
  secondaryKeywords: ["corporate merchandise", "branded business gifts", "custom promotional products"],
  seoTitle: "Corporate Gifting and Merchandise Solutions | Printkee",
  metaDescription: "Browse Printkee solution pages for corporate gifts, custom apparel, branded merchandise, welcome kits, drinkware, bags, stationery and technology accessories.",
  h1: "Corporate Gifting and Merchandise Solutions",
  intro: "Explore distinct business-buying themes from the Printkee keyword and catalogue architecture. Each page represents one primary search intent and connects buyers to the closest relevant product collection. Closely related spelling, location and buying modifiers remain grouped with their primary intent so the site does not create repetitive doorway pages.",
  bodyContent: "Choose the solution that most closely matches the required product or programme. The linked pages explain what to compare and what information is needed for a useful quotation. Product availability, branding feasibility, commercial terms and delivery timing remain subject to review against the selected catalogue item and complete requirement.\n\nThe solution directory includes only verified or partially available catalogue themes in its indexable list. Printing, packaging or other expansion themes that are not currently verified remain excluded from search indexing until the service, product data and fulfilment scope are confirmed.",
  contentBlocks: [
    { heading: "Start with one clear search intent", body: "Select the closest product, recipient or programme theme. A focused requirement produces a clearer product shortlist than combining unrelated merchandise into one search request." },
    { heading: "Continue to the live catalogue", body: "Each solution page links to the strongest current Printkee collection for that intent. Review actual products before finalizing quantities, artwork or delivery assumptions." },
    { heading: "Request confirmation", body: "Submit the chosen products, quantities, variants, artwork, packing, destinations and required date for quotation and feasibility review." },
  ],
  faqs: [
    { question: "Why are similar keywords grouped together?", answer: "Keywords with the same buyer intent are grouped to one useful page. This avoids duplicate pages competing for the same search result." },
    { question: "Does every solution have fixed pricing?", answer: "No. Pricing depends on the selected product and confirmed quantity, specification, branding, packing and delivery scope." },
    { question: "Where can I see actual products?", answer: "Open a solution page and follow its catalogue link to review the closest relevant Printkee products." },
  ],
  featuredHeading: "Browse solution themes",
  featuredProducts: builtPages.filter((page) => page.robots.index).map((page) => ({
    _id: `solution-hub:${page.slug}`,
    name: page.name,
    href: page.path,
    images: page.images,
  })),
  relatedCategories: [{ label: "Corporate gifting catalogue", url: "/corporate-gifting" }, { label: "All product categories", url: "/sitemap" }],
  relatedPages: [],
  relatedLocations: [{ label: "Corporate gifting locations", url: "/locations" }],
  parentPath: "/",
  ctaText: "Discuss a Business Requirement",
  quotationPath: "/contact",
  canonicalUrl: `${SITE_URL}/solutions`,
  robots: { index: true, follow: true },
  ogTitle: "Corporate Gifting and Merchandise Solutions",
  ogDescription: "Browse verified Printkee solution themes and continue to relevant catalogue collections.",
  ogImage: `${SITE_URL}/assets/categories/collection.webp`,
  images: [{ url: "/assets/categories/collection.webp", altText: "Corporate gifting and merchandise solutions" }],
  schemaOptions: { collectionPage: true, breadcrumb: true, itemList: true, faq: true },
};

export const keywordSolutionPages = Object.fromEntries([solutionHub, ...builtPages].map((page) => {
  const relatedPages = builtPages
    .filter((candidate) => candidate.path !== page.path && candidate.subcategory === page.subcategory && candidate.robots.index)
    .slice(0, 4)
    .map((candidate) => ({ label: candidate.name, url: candidate.path }));
  return [page.path, { ...page, relatedPages: page.path === "/solutions" ? [] : [{ label: "All solution themes", url: "/solutions" }, ...relatedPages] }];
}));

export const keywordSolutionPaths = Object.values(keywordSolutionPages)
  .filter((page) => page.robots.index)
  .map((page) => page.path);

export const getKeywordSolutionPage = (path) => keywordSolutionPages[path] || null;
