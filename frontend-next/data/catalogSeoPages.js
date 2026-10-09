import { SITE_URL } from "../lib/siteConfig";

const collection = (name, href, image, altText = name) => ({
  _id: `catalog-seo:${href}`,
  name,
  href,
  slug: href.split("/").filter(Boolean).at(-1),
  images: [{ url: image, altText }],
});

const intents = {
  corporate: {
    label: "Corporate",
    prefix: "corporate",
    lead: "business teams, employee programmes and client requirements",
    brief: "team size, intended use, approved brand assets, delivery destination and required date",
    focus: "A corporate order should balance brand consistency, recipient usefulness and a repeatable approval process.",
  },
  promotional: {
    label: "Promotional",
    prefix: "promotional",
    lead: "campaigns, events, launches and branded distribution",
    brief: "campaign purpose, audience, quantity, artwork, distribution plan and target date",
    focus: "A promotional order should make the brand visible without overlooking product usefulness or recipient context.",
  },
  personalized: {
    label: "Personalized",
    prefix: "personalized",
    lead: "names, team details, approved artwork and recipient-specific requirements",
    brief: "base product, shared artwork, variable details, quantity, destination and approval contact",
    focus: "Personalization needs controlled data and artwork approval because individual names or details may vary by item.",
  },
  bulk: {
    label: "Bulk",
    prefix: "bulk",
    lead: "planned multi-item business orders",
    brief: "product mix, quantities, variants, branding, packing, destinations and required date",
    focus: "A bulk enquiry becomes quote-ready when quantities are separated by product and variant instead of supplied as one total.",
  },
  logo: {
    label: "Logo-Printed",
    prefix: "logo-printed",
    lead: "approved company logos and branded merchandise programmes",
    brief: "selected product, logo file, preferred position, approximate size, quantity and destination",
    focus: "Logo reproduction depends on the selected material, available branding area, artwork detail and colour contrast.",
  },
};

const profiles = [
  {
    slug: "bags", singular: "bag", plural: "bags", intents: ["corporate", "promotional", "personalized", "bulk", "logo"],
    categories: [collection("Corporate backpacks", "/bags-and-travel/backpacks", "/assets/categories/bags.webp"), collection("Tote bags", "/bags-and-travel/tote-bags", "/assets/subcategories/bag.webp"), collection("Duffle bags", "/bags-and-travel/duffle-bags", "/assets/categories/bags-and-travel.webp"), collection("Foldable bags", "/bags-and-travel/foldable-bags", "/assets/categories/bags.webp")],
    selection: "Compare carrying purpose, expected load, material, closure, handle or strap format and the usable branding area. Backpacks, tote bags, duffle bags and foldable bags serve different recipient and travel needs.",
    planning: "State whether the bags are for employees, events, travel, onboarding or distribution. Include the expected contents because capacity and construction should be reviewed against real use.",
  },
  {
    slug: "bottles", singular: "bottle", plural: "bottles", intents: ["corporate", "promotional", "personalized", "bulk", "logo"],
    categories: [collection("Sipper bottles", "/drink-ware/sipper", "/assets/categories/drinkware.webp"), collection("Bamboo bottles", "/drink-ware/bamboo-bottle", "/assets/categories/drink-ware.webp"), collection("Coffee mugs", "/drink-ware/coffee-mug", "/assets/categories/drinkware.webp")],
    selection: "Compare capacity, material, lid format, intended beverage use, carrying needs and available branding area. Product specifications and stock must be confirmed for the selected bottle rather than assumed from a keyword.",
    planning: "Identify whether recipients will use the bottle at a desk, during travel, at events or in a kit. Mention any packing or combination requirement when requesting review.",
  },
  {
    slug: "shirts", singular: "shirt", plural: "shirts", intents: ["corporate", "promotional", "personalized", "bulk", "logo"],
    categories: [collection("Corporate formal shirts", "/apparel-and-accessories/corporate-shirts", "/assets/subcategories/corporateshirt.webp"), collection("Polo T-shirts", "/apparel-and-accessories/polo-t-shirts", "/assets/subcategories/polotshirt.webp"), collection("Ties", "/apparel-and-accessories/ties", "/assets/subcategories/tie.webp")],
    selection: "Start with the workplace or event setting, preferred fit, colour, size mix and branding position. Formal corporate shirts and polo styles should not be treated as interchangeable garments.",
    planning: "Collect a checked size schedule and authorized logo before quotation. If repeat ordering matters, state that requirement so product continuity can be discussed.",
  },
  {
    slug: "welcome-kits", singular: "welcome kit", plural: "welcome kits", intents: ["corporate", "personalized", "bulk", "logo"],
    categories: [collection("Employee welcome kits", "/collection/welcome-kits", "/assets/categories/collection.webp"), collection("Notebooks and diaries", "/office-and-writing/notebooks-and-diary-sets", "/assets/categories/officewriting.webp"), collection("Drinkware", "/drink-ware", "/assets/categories/drink-ware.webp"), collection("Technology accessories", "/technology-accessories", "/assets/categories/technology.webp")],
    selection: "Define the recipient journey before choosing items. A joining kit, remote employee pack and client onboarding kit can require different product mixes, messages, packing and delivery coordination.",
    planning: "List mandatory items, optional items, recipient count, personalization data, insert copy, packing format and destinations. Each component remains subject to availability and branding review.",
  },
  {
    slug: "mugs", singular: "mug", plural: "mugs", intents: ["corporate", "promotional", "personalized", "bulk", "logo"],
    categories: [collection("Coffee mugs", "/drink-ware/coffee-mug", "/assets/categories/drinkware.webp"), collection("Ceramic mugs", "/drink-ware/ceramic-mug", "/assets/categories/drink-ware.webp"), collection("Sipper bottles", "/drink-ware/sipper", "/assets/categories/drinkware.webp")],
    selection: "Compare material, capacity, handle and lid format, surface colour and usable branding area. A desk mug, travel-oriented mug and ceramic presentation item may call for different artwork and packing decisions.",
    planning: "Provide the intended use, quantity, artwork and destination. If the mug will be included in a gift set, identify the other components and required presentation format.",
  },
  {
    slug: "caps", singular: "cap", plural: "caps", intents: ["promotional", "personalized", "bulk", "logo"],
    categories: [collection("Custom caps", "/apparel-and-accessories/caps", "/assets/subcategories/cap.webp"), collection("Promotional hats", "/apparel-and-accessories/hats", "/assets/subcategories/hats.webp"), collection("Apparel and accessories", "/apparel-and-accessories", "/assets/categories/apparel.webp")],
    selection: "Compare cap structure, closure, panel design, colour, wearer setting and branding area. Artwork with fine detail may need a different treatment from a simple approved mark.",
    planning: "State the event or team use, expected quantity, colour preference and logo position. Final decoration method and product availability require confirmation.",
  },
  {
    slug: "notebooks-diaries", singular: "notebook or diary", plural: "notebooks and diaries", intents: ["corporate", "personalized", "bulk", "logo"],
    categories: [collection("Notebooks and diary sets", "/office-and-writing/notebooks-and-diary-sets", "/assets/categories/officewriting.webp"), collection("Pen and writing sets", "/office-and-writing/pen-and-writing-set", "/assets/categories/office-and-writing.webp"), collection("Cork desk accessories", "/eco-products/cork-desk-top-accessories", "/assets/categories/ecoproducts.webp")],
    selection: "Compare format, cover material, binding, page layout, writing use and branding area. A daily-use notebook and a presentation diary set should be evaluated against different recipient needs.",
    planning: "Specify quantity, preferred format, cover colour, branding position and whether a pen or presentation box is required. Confirm dated or undated requirements where relevant.",
  },
  {
    slug: "pens", singular: "pen", plural: "pens and writing sets", intents: ["corporate", "promotional", "bulk", "logo"],
    categories: [collection("Pens and writing sets", "/office-and-writing/pen-and-writing-set", "/assets/categories/officewriting.webp"), collection("Notebooks and diaries", "/office-and-writing/notebooks-and-diary-sets", "/assets/categories/office-and-writing.webp"), collection("Office and writing", "/office-and-writing", "/assets/categories/officewriting.webp")],
    selection: "Compare writing type, body material, finish, grip, presentation format and available branding area. Individual pens and boxed writing sets suit different budgets and recipient contexts.",
    planning: "Provide the quantity, product preference, approved logo and packing requirement. If pens form part of a larger kit, include the full component list.",
  },
  {
    slug: "keychains", singular: "keychain", plural: "keychains", intents: ["corporate", "promotional", "personalized", "bulk", "logo"],
    categories: [collection("Custom keychains", "/collection/keychains", "/assets/categories/collection.webp"), collection("Welcome kits", "/collection/welcome-kits", "/assets/categories/collections.webp"), collection("Promotional collection", "/collection", "/assets/categories/collection.webp")],
    selection: "Compare material, attachment style, shape, weight, surface area and the level of artwork detail. Metal, leather-look and printed formats create different presentation and branding options.",
    planning: "Identify whether the keychains are standalone giveaways, kit components or recipient-specific items. Include quantities and variable details in a checked list.",
  },
  {
    slug: "tech-gifts", singular: "technology gift", plural: "technology gifts", intents: ["corporate", "promotional", "bulk", "logo"],
    categories: [collection("Power banks", "/technology-accessories/power-banks", "/assets/categories/technology.webp"), collection("Wireless chargers", "/technology-accessories/wireless-charging", "/assets/categories/technology-accessories.webp"), collection("Computer accessories", "/technology-accessories/computer-accessories", "/assets/categories/technology.webp"), collection("Desktop and mousepads", "/technology-accessories/desktop-and-mousepad", "/assets/categories/technology-accessories.webp")],
    selection: "Review the real technical specification, device compatibility, intended use, product documentation and available branding area. Capacity or compatibility must never be inferred only from a product name.",
    planning: "State the recipient devices or work setting where known, along with quantity, branding and packing needs. Technical suitability and stock require product-level confirmation.",
  },
  {
    slug: "eco-friendly-gifts", singular: "eco-conscious gift", plural: "eco-friendly gifts", intents: ["corporate", "promotional", "bulk"],
    categories: [collection("Cork corporate gift combos", "/eco-products/cork-corporate-gifting-combo", "/assets/categories/ecoproducts.webp"), collection("Cork gift boxes", "/eco-products/cork-premium-gift-boxes", "/assets/subcategories/box.webp"), collection("Cork desk accessories", "/eco-products/cork-desk-top-accessories", "/assets/categories/eco-products.webp"), collection("Cork laptop bags and wallets", "/eco-products/cork-laptop-bag-and-wallet", "/assets/categories/ecoproducts.webp")],
    selection: "Review the actual materials, construction, expected use, presentation and available product information. Avoid broad environmental claims that are not supported by a specific product record or supplier evidence.",
    planning: "Explain the gifting programme and any material preference, but allow the quotation review to confirm what can be substantiated for the chosen item.",
  },
  {
    slug: "awards-trophies", singular: "award or trophy", plural: "awards and trophies", intents: ["corporate", "personalized", "bulk"],
    categories: [collection("Trophies and mementos", "/trophy-and-momento/trophy-and-momento", "/assets/categories/trophy.webp"), collection("Corporate gifting", "/corporate-gifting", "/assets/categories/trophy-and-momento.webp")],
    selection: "Compare award format, material, size, display setting, inscription area and presentation needs. Recognition awards, event trophies and commemorative mementos require different wording and approval steps.",
    planning: "Supply final recipient names, award titles, event date, logo and required quantities in a checked schedule. Spelling approval is especially important before production.",
  },
  {
    slug: "winter-wear", singular: "winter-wear item", plural: "winter wear", intents: ["corporate", "promotional", "personalized", "bulk", "logo"],
    categories: [collection("Corporate winter wear", "/apparel-and-accessories/winter-wear", "/assets/subcategories/winterwear.webp"), collection("Corporate shirts", "/apparel-and-accessories/corporate-shirts", "/assets/subcategories/corporateshirt.webp"), collection("Caps and hats", "/apparel-and-accessories/caps", "/assets/subcategories/cap.webp")],
    selection: "Compare garment type, layer weight, size range, work setting, colour and branding position. Jackets, hoodies and other winter styles should be reviewed against climate and wearer needs.",
    planning: "Provide a size schedule, garment preference, approved artwork, destination and required date. Seasonal availability and repeat-order continuity need confirmation.",
  },
  {
    slug: "office-stationery", singular: "office stationery item", plural: "office stationery", intents: ["corporate", "promotional", "bulk", "logo"],
    categories: [collection("Files and folders", "/office-and-writing/file-and-folder", "/assets/categories/officewriting.webp"), collection("Lanyards and ID cards", "/office-and-writing/lanyard-and-id-card", "/assets/categories/office-and-writing.webp"), collection("Notebooks and diaries", "/office-and-writing/notebooks-and-diary-sets", "/assets/categories/officewriting.webp"), collection("Pens and writing sets", "/office-and-writing/pen-and-writing-set", "/assets/categories/office-and-writing.webp")],
    selection: "Choose products around the real workflow: document handling, employee identification, meetings, onboarding or everyday writing. Each item has a different usable branding area and information requirement.",
    planning: "List products and quantities separately, then provide artwork, colours, packing and destination details. Lanyards or ID-related items may need additional checked data.",
  },
];

const titleCase = (value) => value.replace(/\b\w/g, (letter) => letter.toUpperCase());
const pagePath = (profile, intentKey) => intentKey ? `/${profile.slug}/${intents[intentKey].prefix}-${profile.slug}` : `/${profile.slug}`;

const relatedLinks = (profile, currentIntent) => [
  { label: `All custom ${profile.plural}`, url: pagePath(profile) },
  ...profile.intents.filter((key) => key !== currentIntent).slice(0, 4).map((key) => ({
    label: `${intents[key].label} ${titleCase(profile.plural)}`,
    url: pagePath(profile, key),
  })),
];

const buildPage = (profile, intentKey = "") => {
  const intent = intentKey ? intents[intentKey] : null;
  const descriptor = intent ? `${intent.label} ${titleCase(profile.plural)}` : `Custom ${titleCase(profile.plural)}`;
  const keyword = descriptor.toLowerCase();
  const path = pagePath(profile, intentKey);
  const useCase = intent?.lead || "corporate gifting, branding, team use and planned distribution";
  const brief = intent?.brief || "intended use, preferred product, quantity, artwork, destination and required date";
  const focus = intent?.focus || `A useful ${profile.singular} enquiry starts with the recipient, intended use and an actual catalogue product rather than a generic search term.`;
  const image = profile.categories[0].images[0].url;

  return {
    name: descriptor,
    path,
    slug: path.split("/").filter(Boolean).at(-1),
    pageType: intent ? "CURATED_PRODUCT_INTENT" : "PRODUCT_FAMILY_HUB",
    category: profile.slug,
    subcategory: intentKey || "custom",
    location: "India",
    searchIntent: "commercial",
    primaryKeyword: keyword,
    secondaryKeywords: [`custom ${profile.plural}`, `branded ${profile.plural}`, `${profile.plural} for business`],
    seoTitle: `${descriptor} for Business Requirements | Printkee`,
    metaDescription: `Compare catalogue options for ${keyword}. Review selection guidance and request a quotation based on product, quantity, artwork and destination.`,
    h1: `${descriptor} for Business Requirements`,
    intro: `${descriptor} should connect a real catalogue product to a clear business requirement. This page brings together relevant Printkee collections for ${useCase}. Product availability, branding feasibility, quantities, commercial terms and delivery timing are confirmed only after the complete brief is reviewed.`,
    bodyContent: `${focus} ${profile.selection}\n\nFor an accurate quotation, provide the ${brief}. ${profile.planning} The listed collections are starting points for comparison; they do not promise a fixed minimum quantity, universal printing method, guaranteed stock or delivery date.`,
    contentBlocks: [
      { heading: `Choose the right ${profile.singular}`, body: `${profile.selection} Open the linked catalogue collection and identify the closest available product before finalizing artwork or quantities.` },
      { heading: "Prepare a complete requirement", body: `Share the ${brief}. Separate quantities by product, colour, size or other variant wherever applicable so feasibility and pricing can be reviewed against the actual requirement.` },
      { heading: "Review branding and approval", body: `Submit only artwork and recipient data you are authorized to use. Final placement, reproduction limits, product availability and production details must be confirmed through quotation and artwork approval.` },
    ],
    faqs: [
      { question: `How do I choose between the listed ${profile.plural}?`, answer: `Start with recipient use, product format and required quantity, then compare the linked catalogue collections. Printkee can review the selected product and complete brief during quotation.` },
      { question: `Can these ${profile.plural} include a company logo?`, answer: `Logo branding can be requested where suitable. Feasibility depends on the selected product, artwork, placement, quantity and available branding method.` },
      { question: `Is there a fixed minimum quantity for ${profile.plural}?`, answer: `No universal minimum is stated on this page. Product availability, quantity requirements, pricing and timing must be confirmed for the chosen item and brief.` },
    ],
    featuredHeading: `Explore ${profile.plural} collections`,
    featuredProducts: profile.categories,
    relatedCategories: profile.categories.map(({ name, href }) => ({ label: name, url: href })),
    relatedPages: relatedLinks(profile, intentKey),
    relatedLocations: [{ label: "Corporate gifting locations", url: "/locations" }],
    parentPath: intent ? `/${profile.slug}` : profile.categories[0].href,
    ctaText: `Request a ${titleCase(profile.plural)} Quote`,
    quotationPath: "/contact",
    canonicalUrl: `${SITE_URL}${path}`,
    robots: { index: true, follow: true },
    ogTitle: `${descriptor} for Business Requirements`,
    ogDescription: `Compare relevant ${profile.plural} and prepare a product-specific quotation brief with Printkee.`,
    ogImage: image.startsWith("http") ? image : `${SITE_URL}${image}`,
    images: profile.categories.map((item) => item.images[0]),
    schemaOptions: { collectionPage: true, itemList: true, faq: true, breadcrumb: true },
    significantContentUpdatedAt: "2026-10-09T00:00:00.000Z",
  };
};

export const catalogSeoGroups = profiles.map((profile) => ({
  label: titleCase(profile.plural),
  pages: [buildPage(profile), ...profile.intents.map((intentKey) => buildPage(profile, intentKey))],
}));

export const catalogSeoPages = Object.fromEntries(catalogSeoGroups.flatMap((group) => group.pages).map((page) => [page.path, page]));
export const catalogSeoPaths = Object.keys(catalogSeoPages);
export const getCatalogSeoPage = (path) => catalogSeoPages[path] || null;
