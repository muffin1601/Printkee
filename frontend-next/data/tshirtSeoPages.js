import { SITE_URL } from "../lib/siteConfig";

const product = (name, slug, subcategory, image, altText) => ({
  _id: `curated-${slug}`,
  name,
  slug,
  category: { slug: "apparel-and-accessories" },
  subcategory: { slug: subcategory },
  images: [{ url: image, altText }],
});

const roundNeckProducts = [
  product("Classic White Round Neck T-Shirt", "classic-white-round-neck-t-shirt", "round-neck-t-shirts", "/assets/products/roundneck/classic-white (1).webp", "White round neck T-shirt for custom branding"),
  product("Classic Black Round Neck T-Shirt", "classic-black-round-neck-t-shirt", "round-neck-t-shirts", "/assets/products/roundneck/black (1).webp", "Black round neck T-shirt for logo printing"),
  product("Navy Blue Round Neck T-Shirt", "navy-blue-round-neck-t-shirt", "round-neck-t-shirts", "/assets/products/roundneck/navy-blue (1).webp", "Navy round neck T-shirt for teams and events"),
  product("Classic Red Round Neck T-Shirt", "classic-red-round-neck-t-shirt", "round-neck-t-shirts", "/assets/products/roundneck/red (1).webp", "Red round neck promotional T-shirt"),
];

const poloProducts = [
  product("Personalized Polo T-Shirts", "personalized-polo-t-shirts", "polo-t-shirts", "https://printkee.com/uploads/products/1784200966758-253827219.jfif", "Personalized polo T-shirts for branded teams"),
  product("Customized Company T-Shirts", "branding-t-shirt", "polo-t-shirts", "https://printkee.com/uploads/products/1784205779508-141624592.jfif", "Customized company T-shirts for team branding"),
  product("Customized T-Shirts", "customized-t-shirts", "polo-t-shirts", "/assets/products/polo/black (3).webp", "Black customized polo T-shirt"),
  product("Promotional Collar T-Shirts", "promotional-collar-t-shirts", "polo-t-shirts", "/assets/products/polo/grey (3).webp", "Grey promotional collar T-shirt"),
  product("Custom T-Shirt", "custom-t-shirt", "polo-t-shirts", "/assets/products/polo/royal-blue (3).webp", "Royal blue custom polo T-shirt"),
  product("Promotional Cotton T-Shirt", "event-t-shirts", "polo-t-shirts", "/assets/products/polo/green (2).webp", "Green promotional cotton T-shirt for events"),
];

const commonLinks = [
  { label: "Round neck T-shirts", url: "/apparel-and-accessories/round-neck-t-shirts" },
  { label: "Polo T-shirts", url: "/apparel-and-accessories/polo-t-shirts" },
  { label: "Apparel and accessories", url: "/apparel-and-accessories" },
  { label: "Request a T-shirt quotation", url: "/contact" },
];

const page = ({ path, name, primaryKeyword, title, description, h1, intro, bodyContent, contentBlocks, faqs, products, relatedPages }) => ({
  name,
  path,
  slug: path.split("/").filter(Boolean).at(-1),
  pageType: path === "/t-shirts" ? "HUB" : "CORE_CATEGORY",
  category: "apparel-and-accessories",
  subcategory: "t-shirts",
  location: "India",
  searchIntent: "commercial",
  primaryKeyword,
  secondaryKeywords: [],
  seoTitle: title,
  metaDescription: description,
  h1,
  intro,
  bodyContent,
  contentBlocks,
  faqs,
  featuredProducts: products,
  relatedCategories: commonLinks.slice(0, 3),
  relatedPages,
  relatedLocations: [{ label: "Corporate gifting locations", url: "/locations" }],
  parentPath: path === "/t-shirts" ? "/apparel-and-accessories" : "/t-shirts",
  ctaText: "Request a T-Shirt Quote",
  quotationPath: "/contact",
  canonicalUrl: `${SITE_URL}${path}`,
  robots: { index: true, follow: true },
  ogTitle: title,
  ogDescription: description,
  ogImage: `${SITE_URL}${products[0].images[0].url}`,
  images: products.map((item) => item.images[0]),
  schemaOptions: { collectionPage: true, itemList: true, faq: true, breadcrumb: true },
  status: "INDEXABLE",
  priority: path === "/t-shirts" ? 0.8 : 0.7,
});

export const tshirtSeoPages = {
  "/t-shirts": page({
    path: "/t-shirts",
    name: "Custom T-Shirts",
    primaryKeyword: "custom t shirts",
    title: "Custom T-Shirts for Companies, Teams and Events | Printkee",
    description: "Compare round neck and polo T-shirts for corporate teams, promotions and custom branding. Review real products and request a quote from Printkee.",
    h1: "Custom T-Shirts for Business, Teams and Events",
    intro: "Choose a T-shirt route based on how the garments will be used, not only on a printing keyword. Printkee offers real round neck and polo products that can be shortlisted for company teams, campaigns, events and other approved branding requirements. This hub helps buyers compare those intents before requesting a quotation.",
    bodyContent: "A useful T-shirt order starts with the garment and use case. Round neck styles are often considered for event crews, campaigns and casual team wear, while polo T-shirts may be more suitable where a collared presentation is preferred. Available colours, sizes, material details and printing methods vary by product and must be confirmed during quotation.\n\nUse the pages below to narrow the requirement. Corporate buyers can focus on consistent team presentation and repeat ordering. Promotional buyers can consider campaign visibility and distribution. Personalized requirements need artwork and variable-detail review. Bulk and logo-printing pages explain the information required for an accurate quote without inventing fixed quantities, prices or delivery promises.",
    contentBlocks: [
      { heading: "Select the garment first", body: "Compare the live round neck and polo ranges, then shortlist colours and styles relevant to the people who will wear them. Product availability should be confirmed before artwork is finalized." },
      { heading: "Prepare a clear branding brief", body: "Share the logo or artwork, preferred print position, approximate quantity, size mix, required location and target date. Printkee can then confirm suitable branding methods and commercial details." },
      { heading: "Use the right intent page", body: "Separate pages below cover corporate, promotional, personalized, bulk and logo-printed needs. They consolidate close spelling variants so buyers and search engines reach one useful canonical answer." },
    ],
    faqs: [
      { question: "Which T-shirt styles are available on Printkee?", answer: "The current catalogue includes round neck and polo T-shirt products in multiple colours. Open the relevant product page to review its available information." },
      { question: "Can I get a price directly from this page?", answer: "Pricing depends on the selected product, quantity, branding method and artwork. Submit those details through the quotation form for confirmation." },
      { question: "Does Printkee support T-shirt orders across India?", answer: "Service feasibility, fulfilment timing and delivery requirements must be confirmed for each order and destination during quotation." },
    ],
    products: [...roundNeckProducts, ...poloProducts],
    relatedPages: [
      { label: "Corporate T-shirts", url: "/t-shirts/corporate-t-shirts" },
      { label: "Promotional T-shirts", url: "/t-shirts/promotional-t-shirts" },
      { label: "Personalized T-shirts", url: "/t-shirts/personalized-t-shirts" },
      { label: "Bulk T-shirt printing", url: "/t-shirts/bulk-t-shirt-printing" },
      { label: "Logo-printed T-shirts", url: "/t-shirts/logo-printed-t-shirts" },
    ],
  }),
  "/t-shirts/corporate-t-shirts": page({
    path: "/t-shirts/corporate-t-shirts",
    name: "Corporate T-Shirts",
    primaryKeyword: "corporate t shirts",
    title: "Corporate T-Shirts for Company Teams and Staff | Printkee",
    description: "Shortlist corporate round neck and polo T-shirts for staff, teams and company events. Compare products and request a branding quotation.",
    h1: "Corporate T-Shirts for Company Teams",
    intro: "Corporate T-shirts need to support a clear business use: daily team wear, an internal event, field activity, onboarding or a branded company programme. This page combines relevant polo and round neck products with practical selection guidance, while leaving product availability, printing method, quantity and fulfilment terms to the quotation process.",
    bodyContent: "A company T-shirt order usually involves more stakeholders than a personal garment purchase. Procurement may need a consistent product reference, marketing may control logo use, and team managers may need an accurate size mix. Start by choosing between a collared polo style and a casual round neck style. Then confirm colour compatibility with the approved brand artwork.\n\nFor a useful quotation, provide the expected quantity, size distribution, preferred branding position, delivery destination and required date. If the same garment may be reordered, mention that requirement so product continuity can be discussed. Printkee does not assume a fixed minimum order, production method or delivery promise on this page; those details depend on the selected product and approved brief.",
    contentBlocks: [
      { heading: "Polo or round neck for a corporate team?", body: "Polo T-shirts can suit teams seeking a collared appearance, while round neck products can suit casual programmes and events. The correct choice depends on wearer comfort, work setting and brand guidelines." },
      { heading: "Plan sizes and repeat orders", body: "Collect a realistic size mix before quotation and identify whether future repeat ordering matters. Confirming these details early reduces avoidable changes after artwork review." },
      { heading: "Submit approved brand assets", body: "Use an authorized logo file and state the intended placement. Branding feasibility and the most suitable method must be checked against the selected garment." },
    ],
    faqs: [
      { question: "Are corporate T-shirts the same as employee uniforms?", answer: "They may be used for team wear or company programmes, but suitability as a uniform depends on the garment, work environment and approved company requirements." },
      { question: "Can departments use different colours?", answer: "You can request different colours, subject to product availability and artwork suitability. Include the colour split in the quotation brief." },
      { question: "Can the same design be reordered later?", answer: "Repeat-order feasibility depends on product and colour availability at that time. Mention continuity requirements before the first order is confirmed." },
    ],
    products: [...poloProducts, ...roundNeckProducts.slice(0, 2)],
    relatedPages: [{ label: "All custom T-shirts", url: "/t-shirts" }, { label: "Logo-printed T-shirts", url: "/t-shirts/logo-printed-t-shirts" }, { label: "Bulk T-shirt printing", url: "/t-shirts/bulk-t-shirt-printing" }],
  }),
  "/t-shirts/promotional-t-shirts": page({
    path: "/t-shirts/promotional-t-shirts",
    name: "Promotional T-Shirts",
    primaryKeyword: "promotional t shirts",
    title: "Promotional T-Shirts for Campaigns and Events | Printkee",
    description: "Explore promotional T-shirts for campaigns, events and branded activities. Compare available products and prepare an accurate quotation brief.",
    h1: "Promotional T-Shirts for Campaigns and Events",
    intro: "Promotional T-shirts are usually selected for visibility during campaigns, events, launches, community activities or branded distribution. The garment must still be appropriate for the wearer, artwork and expected use. This page focuses on campaign planning and product selection rather than treating every promotional search as the same purchase.",
    bodyContent: "Begin with the audience and use period. A one-day event crew, a multi-location campaign and a customer distribution programme may need different product choices and size planning. Round neck styles offer a familiar casual format, while polo styles may suit selected staff-facing activities. Review the live products rather than assuming every colour, size or branding technique is available.\n\nYour brief should identify the campaign, expected quantity, size mix, artwork colours, required print position, distribution location and target date. If garments will be packed or distributed in a particular way, include that requirement for review. Printkee will confirm feasible options during quotation; this page does not claim fixed turnaround times or guaranteed stock.",
    contentBlocks: [
      { heading: "Match the garment to the campaign", body: "Consider who will wear or receive the T-shirt, how long it will be used and whether the garment needs to coordinate with other campaign materials." },
      { heading: "Design for real viewing conditions", body: "Logo scale, contrast and placement should work with the selected garment colour. Share production-ready artwork where possible and request review before approval." },
      { heading: "Plan distribution details", body: "Provide quantities by size and location. Campaign orders become easier to quote when the distribution plan is known before production decisions are made." },
    ],
    faqs: [
      { question: "Which product is suitable for a promotional event?", answer: "Suitability depends on the audience, event format, expected wear and budget. Compare the listed round neck and polo products, then request confirmation." },
      { question: "Can promotional T-shirts use multicolour artwork?", answer: "Share the artwork for review. Feasibility depends on the garment, artwork details, placement and available branding method." },
      { question: "Should campaign quantities include spare sizes?", answer: "That is a planning decision for the buyer. Provide the final size breakdown and any contingency quantity when requesting the quote." },
    ],
    products: [...roundNeckProducts, ...poloProducts.slice(0, 2)],
    relatedPages: [{ label: "All custom T-shirts", url: "/t-shirts" }, { label: "Personalized T-shirts", url: "/t-shirts/personalized-t-shirts" }, { label: "Logo-printed T-shirts", url: "/t-shirts/logo-printed-t-shirts" }],
  }),
  "/t-shirts/personalized-t-shirts": page({
    path: "/t-shirts/personalized-t-shirts",
    name: "Personalized T-Shirts",
    primaryKeyword: "personalized t shirts",
    title: "Personalized T-Shirts with Reviewed Custom Artwork | Printkee",
    description: "Plan personalized T-shirts using names, approved artwork or team details. Select a real garment and request feasibility and pricing review.",
    h1: "Personalized T-Shirts for Names, Teams and Custom Artwork",
    intro: "Personalized T-shirt requests can involve one shared design or variable details such as names, roles or team identifiers. Those variations affect artwork preparation and production review, so this page focuses on gathering the right information before quotation. Personalization is confirmed only after the selected garment and artwork have been assessed.",
    bodyContent: "Choose the base garment before preparing final artwork. The current catalogue includes round neck and polo options in several colours, but availability must be checked for the required sizes and quantity. Decide whether every garment uses the same design or whether individual details change. A structured list of names, numbers or roles is easier to review than separate messages.\n\nSubmit only artwork and personal details that you are authorized to use. Printkee can review the requested placement and advise whether the selected approach is feasible. Exact pricing, minimum quantities, production timing and colour matching are not assumed here because they vary with the garment and personalization brief.",
    contentBlocks: [
      { heading: "Separate shared and variable artwork", body: "Identify the elements printed on every garment and the details that change by wearer. Supply variable information in a clear, checked list." },
      { heading: "Confirm spelling before approval", body: "Names, numbers and titles should be reviewed by the buyer before artwork approval. Personalized details can be difficult to correct after production begins." },
      { heading: "Choose readable placement", body: "Consider the garment colour, artwork contrast and intended viewing distance. Final placement and branding feasibility must be confirmed during quotation." },
    ],
    faqs: [
      { question: "Can each T-shirt have a different name?", answer: "Variable names can be requested, but feasibility and cost must be reviewed against the product, quantity and supplied data." },
      { question: "Can I submit a photograph or illustration?", answer: "You may submit authorized artwork for review. Reproduction quality depends on the file, garment and available branding method." },
      { question: "Who checks personalized spelling?", answer: "The buyer should provide and approve the final details. Printkee can prepare the quotation and artwork workflow based on the supplied information." },
    ],
    products: [...roundNeckProducts, ...poloProducts.slice(0, 2)],
    relatedPages: [{ label: "All custom T-shirts", url: "/t-shirts" }, { label: "Promotional T-shirts", url: "/t-shirts/promotional-t-shirts" }, { label: "Logo-printed T-shirts", url: "/t-shirts/logo-printed-t-shirts" }],
  }),
  "/t-shirts/bulk-t-shirt-printing": page({
    path: "/t-shirts/bulk-t-shirt-printing",
    name: "Bulk T-Shirt Printing",
    primaryKeyword: "bulk t shirt printing",
    title: "Bulk T-Shirt Printing for Planned Business Orders | Printkee",
    description: "Prepare a bulk T-shirt printing requirement with garment, size, artwork and destination details. Compare real products and request a tailored quote.",
    h1: "Bulk T-Shirt Printing for Business Requirements",
    intro: "Bulk T-shirt enquiries need more than a total quantity. A useful quotation depends on the chosen garment, size distribution, colour split, artwork, print placement, destination and required date. This page helps procurement and marketing teams prepare those inputs without advertising an unverified fixed MOQ or universal delivery promise.",
    bodyContent: "Start with one or more live catalogue products. If the requirement mixes polo and round neck styles, separate the quantities for each product. Provide sizes and colours in a structured breakdown and indicate whether the same artwork is used throughout. Orders involving multiple destinations or individually labelled packs should identify those requirements before pricing is finalized.\n\nArtwork complexity and print position can affect the recommended branding approach. Supply the best available source file and explain the intended use. Printkee will review product availability, branding feasibility and commercial details through the quotation process. No wholesale or manufacturing claim is implied by this page.",
    contentBlocks: [
      { heading: "Create a quantity and size schedule", body: "List quantities by product, colour and size. A structured schedule is more useful than a single total and helps identify missing information before quotation." },
      { heading: "State packaging and destination needs", body: "Mention multiple delivery destinations, labelling or special packing requirements at the start. Their feasibility and cost require review." },
      { heading: "Keep artwork approval controlled", body: "Nominate the person authorized to approve artwork and order details. Production should rely on one confirmed version of the brief." },
    ],
    faqs: [
      { question: "What quantity counts as a bulk T-shirt order?", answer: "There is no universal quantity stated on this page. Feasibility and commercial terms depend on the chosen product and complete requirement." },
      { question: "Can one bulk order contain several colours?", answer: "A colour split can be requested, subject to stock and branding review. Include quantities and sizes for every colour." },
      { question: "Can bulk orders be sent to several locations?", answer: "Provide the destination list for feasibility and pricing review. Do not assume split delivery until it is confirmed in the quotation." },
    ],
    products: [...roundNeckProducts, ...poloProducts],
    relatedPages: [{ label: "All custom T-shirts", url: "/t-shirts" }, { label: "Corporate T-shirts", url: "/t-shirts/corporate-t-shirts" }, { label: "Promotional T-shirts", url: "/t-shirts/promotional-t-shirts" }],
  }),
  "/t-shirts/logo-printed-t-shirts": page({
    path: "/t-shirts/logo-printed-t-shirts",
    name: "Logo-Printed T-Shirts",
    primaryKeyword: "logo printed t shirts",
    title: "Logo-Printed T-Shirts with Artwork Review | Printkee",
    description: "Choose round neck or polo T-shirts for approved logo printing. Prepare artwork, placement and quantity details for a Printkee quotation.",
    h1: "Logo-Printed T-Shirts for Approved Brand Artwork",
    intro: "A logo-printing requirement should connect an approved brand asset to a suitable garment, colour and placement. This page helps buyers prepare that decision using Printkee’s live T-shirt products. Printing feasibility is reviewed against the artwork and selected product rather than promised from the keyword alone.",
    bodyContent: "Select a garment whose colour provides appropriate contrast with the logo. Then identify the required placement, approximate dimensions and quantity. If the artwork includes fine text, gradients or several colours, supply the original source file so the production approach can be reviewed. Avoid using screenshots or compressed images where a vector or high-resolution source is available.\n\nLogo ownership and permission remain the buyer’s responsibility. The final branding method, reproduction limitations, product availability, price and timing are confirmed through quotation and artwork approval. Buyers comparing casual and collared options can review both round neck and polo products below.",
    contentBlocks: [
      { heading: "Use authorized artwork", body: "Provide the approved logo version and any brand guidelines that control colour, clear space or placement. Do not submit artwork you are not permitted to reproduce." },
      { heading: "Choose garment and logo contrast together", body: "A logo that works on a white garment may need a different approved version on a dark colour. State the intended combinations in the brief." },
      { heading: "Confirm placement and scale", body: "Identify the requested print area and approximate size. Final feasibility must be checked against the garment and artwork before approval." },
    ],
    faqs: [
      { question: "What file should I provide for logo printing?", answer: "Provide the best available authorized source artwork, ideally a vector or high-resolution file, together with applicable brand guidelines." },
      { question: "Can the same logo be used on different T-shirt colours?", answer: "Yes, subject to artwork and contrast review. Some brand systems use approved light and dark logo variants." },
      { question: "Is the printing method selected from this page?", answer: "No. The appropriate method is confirmed after reviewing the garment, artwork, placement and order requirement." },
    ],
    products: [...poloProducts, ...roundNeckProducts],
    relatedPages: [{ label: "All custom T-shirts", url: "/t-shirts" }, { label: "Corporate T-shirts", url: "/t-shirts/corporate-t-shirts" }, { label: "Personalized T-shirts", url: "/t-shirts/personalized-t-shirts" }],
  }),
};

export const tshirtSeoPaths = Object.keys(tshirtSeoPages);

export const getTshirtSeoPage = (path) => tshirtSeoPages[path] || null;
