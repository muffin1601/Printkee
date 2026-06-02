/**
 * MASTER SEO CONFIGURATION
 * Source of truth for all category and subcategory page SEO.
 *
 * Structure:
 *   "/category-slug" or "/category-slug/subcategory-slug" => {
 *     h1, h2, title, description, openGraph: { title, description }, twitter: { title, description }
 *   }
 *
 * Pages read from this config in generateMetadata() and in the Server Component.
 * To update any SEO value, change it here — no other file needs to change.
 */

const BASE = "https://printkee.com";

const seoConfig = {

  /* ====================================================================
     CATEGORY PAGES
  ==================================================================== */

  "/apparel-and-accessories": {
    h1: "Corporate Apparel & Accessories for Branding",
    h2: "Custom Apparel Solutions for Events, Offices & Corporate Gifting",
    title: "Corporate Apparel & Accessories for Branding | Bulk Orders",
    description: "Shop premium custom apparel & accessories for corporate gifting in Delhi NCR. T-shirts, caps, ties, aprons with logo printing. Bulk orders, fast delivery Pan-India.",
    openGraph: { title: "Corporate Apparel & Accessories for Branding", description: "Premium custom apparel with logo printing for corporate gifting and events in Delhi NCR. Bulk orders available." },
    twitter:   { title: "Corporate Apparel & Accessories for Branding", description: "Custom apparel with logo printing — T-shirts, caps, ties & more for corporate gifting in Delhi NCR." },
  },

  "/office-and-writing": {
    h1: "Custom Office & Writing Essentials for Corporate Branding",
    h2: "Branded Stationery, Notebooks & Writing Sets for Corporate Gifting",
    title: "Custom Office Stationery & Writing Essentials for Corporate Branding",
    description: "Buy custom office & writing essentials with logo printing in Delhi NCR. Pens, notebooks, diaries, lanyards & ID cards for corporate gifting and brand promotions.",
    openGraph: { title: "Custom Office & Writing Essentials for Corporate Branding", description: "Branded pens, notebooks, lanyards and office stationery for corporate gifting in Delhi NCR." },
    twitter:   { title: "Custom Office & Writing Essentials for Corporate Branding", description: "Branded stationery, notebooks & writing sets for corporate gifting in Delhi NCR." },
  },

  "/collection": {
    h1: "Premium Corporate Gifting Collection — Welcome Kits & Promotional Gifts",
    h2: "Curated Corporate Gift Collections for Every Occasion",
    title: "Premium Corporate Gifting Collection | Welcome Kits & Promotional Gifts",
    description: "Explore our premium corporate gifting collection — custom welcome kits, promotional clocks, keychains & combos. Logo branding, bulk orders, Pan-India delivery.",
    openGraph: { title: "Premium Corporate Gifting Collection", description: "Custom welcome kits, promotional clocks & keychains for corporate gifting in Delhi NCR." },
    twitter:   { title: "Premium Corporate Gifting Collection", description: "Premium corporate gifting collection — custom welcome kits, keychains & more." },
  },

  "/bags-and-travel": {
    h1: "Custom Bags & Travel Accessories for Corporate Gifting",
    h2: "Branded Bags, Backpacks & Travel Accessories for Events & Promotions",
    title: "Custom Bags & Travel Accessories for Corporate Gifting | Bulk Orders",
    description: "Shop custom bags & travel accessories with logo printing in Delhi NCR. Backpacks, duffle bags, tote bags & foldable bags for corporate gifting and brand promotions.",
    openGraph: { title: "Custom Bags & Travel Accessories for Corporate Gifting", description: "Branded backpacks, duffle bags, tote bags & travel accessories for corporate gifting in Delhi NCR." },
    twitter:   { title: "Custom Bags & Travel Accessories for Corporate Gifting", description: "Custom bags & travel accessories with logo printing for corporate gifting in Delhi NCR." },
  },

  "/technology-accessories": {
    h1: "Custom Technology Accessories for Corporate Branding",
    h2: "Branded Tech Gifts — Power Banks, Wireless Chargers & Computer Accessories",
    title: "Custom Technology Accessories for Corporate Branding | Bulk Orders",
    description: "Buy custom tech accessories with logo branding in Delhi NCR. Power banks, wireless chargers, mouse pads & computer accessories for corporate gifting. Bulk orders.",
    openGraph: { title: "Custom Technology Accessories for Corporate Branding", description: "Branded power banks, wireless chargers & tech accessories for corporate gifting in Delhi NCR." },
    twitter:   { title: "Custom Technology Accessories for Corporate Branding", description: "Custom tech accessories with logo branding — corporate gifting in Delhi NCR." },
  },

  "/eco-products": {
    h1: "Eco-Friendly Corporate Gifts — Sustainable Cork Products",
    h2: "Sustainable Cork Gifting Solutions for Corporate Branding & CSR",
    title: "Eco-Friendly Corporate Gifts & Sustainable Cork Products",
    description: "Shop eco-friendly cork corporate gifts in Delhi NCR. Cork coasters, desk accessories, yoga products, gift boxes & more. Sustainable branding solutions for CSR initiatives.",
    openGraph: { title: "Eco-Friendly Corporate Gifts & Sustainable Cork Products", description: "Sustainable cork corporate gifting solutions for eco-conscious brands in Delhi NCR." },
    twitter:   { title: "Eco-Friendly Corporate Gifts & Sustainable Cork Products", description: "Eco-friendly cork gifts for sustainable corporate branding and CSR initiatives." },
  },

  "/drink-ware": {
    h1: "Custom Drinkware — Bottles, Mugs & Sippers with Logo Print",
    h2: "Branded Drinkware for Corporate Events, Employee Gifting & Promotions",
    title: "Custom Drinkware — Bottles, Mugs & Sippers with Logo Print | Bulk Orders",
    description: "Buy custom drinkware with logo printing in Delhi NCR. Bamboo bottles, ceramic mugs, coffee mugs & sippers for corporate gifting. Eco-friendly & premium options available.",
    openGraph: { title: "Custom Drinkware — Bottles, Mugs & Sippers with Logo Print", description: "Branded bamboo bottles, mugs & sippers for corporate gifting in Delhi NCR." },
    twitter:   { title: "Custom Drinkware — Bottles, Mugs & Sippers with Logo Print", description: "Custom drinkware with logo printing for corporate gifting in Delhi NCR." },
  },

  "/trophy-and-momento": {
    h1: "Custom Trophies & Mementos for Corporate Recognition",
    h2: "Premium Trophies, Awards & Mementos for Events & Corporate Recognition",
    title: "Custom Trophies & Mementos for Corporate Recognition | Bulk Orders",
    description: "Order custom trophies & mementos with logo engraving in Delhi NCR. Crystal, acrylic & metal awards for employee recognition, corporate events & sports achievements.",
    openGraph: { title: "Custom Trophies & Mementos for Corporate Recognition", description: "Premium custom trophies and awards for employee recognition and corporate events in Delhi NCR." },
    twitter:   { title: "Custom Trophies & Mementos for Corporate Recognition", description: "Custom trophies & mementos with logo engraving for corporate events in Delhi NCR." },
  },

  /* ====================================================================
     APPAREL & ACCESSORIES — SUBCATEGORY PAGES
  ==================================================================== */

  "/apparel-and-accessories/polo-t-shirts": {
    h1: "Promotional Polo T-Shirts for Corporate Branding in Delhi",
    h2: "Buy polo t-shirts for branding, events and promotional campaigns. Bulk order pricing with logo print.",
    title: "Custom Polo T-Shirts in Delhi NCR | Logo Print | Bulk Corporate Orders",
    description: "Buy promotional polo t-shirts with logo printing in Delhi NCR. Premium fabric, bulk discounts, custom embroidery & screen print. Ideal for corporate events, uniforms & gifting.",
    openGraph: { title: "Custom Polo T-Shirts in Delhi NCR | Logo Print", description: "Promotional polo t-shirts with logo printing for corporate branding. Bulk orders available in Delhi NCR." },
    twitter:   { title: "Custom Polo T-Shirts in Delhi NCR | Bulk Orders", description: "Promotional polo t-shirts with logo printing — bulk corporate orders in Delhi NCR." },
  },

  "/apparel-and-accessories/round-neck-t-shirts": {
    h1: "Promotional Round Neck T-Shirts Manufacturers in Delhi NCR",
    h2: "Custom Round Neck T-Shirts for Branding, Events & Corporate Teams",
    title: "Custom Round Neck T-Shirt Manufacturers in Delhi | Bulk Orders",
    description: "Order custom round neck t-shirts with logo printing from top manufacturers in Delhi NCR. Bulk orders for corporate teams, events & promotional campaigns. Fast delivery Pan-India.",
    openGraph: { title: "Custom Round Neck T-Shirt Manufacturers in Delhi", description: "Promotional round neck t-shirts with logo printing for corporate teams and events in Delhi NCR." },
    twitter:   { title: "Custom Round Neck T-Shirt Manufacturers in Delhi", description: "Custom round neck t-shirts in bulk for corporate branding in Delhi NCR." },
  },

  "/apparel-and-accessories/caps": {
    h1: "Promotional Caps Manufacturers in Delhi NCR",
    h2: "Custom Caps with Logo for Corporate Events, Promotions & Gifting",
    title: "Promotional Caps Manufacturers in Delhi NCR | Bulk Orders",
    description: "Buy promotional caps with custom logo printing from top manufacturers in Delhi NCR. Baseball caps, snapbacks & sports caps in bulk for corporate events, gifting & brand promotions.",
    openGraph: { title: "Promotional Caps Manufacturers in Delhi NCR", description: "Custom caps with logo printing for corporate events and promotions in Delhi NCR." },
    twitter:   { title: "Promotional Caps Manufacturers in Delhi NCR", description: "Promotional caps with custom logo printing — bulk orders in Delhi NCR." },
  },

  "/apparel-and-accessories/hats": {
    h1: "Custom Hats with Logo for Corporate Branding in Delhi",
    h2: "Branded Hats for Events, Outdoor Promotions & Corporate Gifting",
    title: "Custom Hats with Logo Print in Delhi | Bulk Corporate Orders",
    description: "Order custom hats with logo printing in Delhi NCR. Wide-brim, bucket & fashion hats in bulk for corporate branding, outdoor events & gifting. Premium quality, fast delivery.",
    openGraph: { title: "Custom Hats with Logo Print in Delhi", description: "Custom hats with logo printing for corporate branding and events in Delhi NCR." },
    twitter:   { title: "Custom Hats with Logo Print in Delhi", description: "Custom hats with logo print — bulk orders for corporate events in Delhi NCR." },
  },

  "/apparel-and-accessories/corporate-shirts": {
    h1: "Customized Formal Shirt in Delhi for Corporate Uniform & Gifting",
    h2: "Custom Corporate Shirts with Logo for Teams, Offices & Events",
    title: "Custom Corporate Shirts in Delhi | Formal Uniform & Gifting",
    description: "Order custom corporate formal shirts with logo printing in Delhi NCR. Premium fabric, professional finish for office uniforms, employee gifting & brand promotions. Bulk orders.",
    openGraph: { title: "Custom Corporate Shirts in Delhi | Formal Uniform & Gifting", description: "Custom formal shirts with logo printing for corporate uniforms and gifting in Delhi NCR." },
    twitter:   { title: "Custom Corporate Shirts in Delhi | Formal Uniform & Gifting", description: "Custom corporate shirts for offices, uniforms and employee gifting in Delhi NCR." },
  },

  "/apparel-and-accessories/ties": {
    h1: "Promotional Ties in Delhi for Corporate Gifting & Uniform",
    h2: "Custom Branded Ties for Corporate Events, Gifting & Formal Wear",
    title: "Promotional Ties in Delhi | Custom Logo Ties | Corporate Gifting",
    description: "Buy promotional ties with custom logo & branding in Delhi NCR. Premium silk & polyester ties for corporate gifting, formal uniforms & brand promotions. Bulk order discounts.",
    openGraph: { title: "Promotional Ties in Delhi | Custom Logo Ties", description: "Custom branded ties for corporate gifting and formal uniforms in Delhi NCR." },
    twitter:   { title: "Promotional Ties in Delhi | Custom Logo Ties", description: "Promotional ties with custom logo branding for corporate gifting in Delhi NCR." },
  },

  "/apparel-and-accessories/aprons": {
    h1: "Custom Apron Manufacturers in Delhi for Corporate Gifting & Events",
    h2: "Branded Aprons with Logo for Hospitality, Kitchen & Corporate Events",
    title: "Custom Apron Manufacturers in Delhi | Logo Print | Bulk Orders",
    description: "Order custom aprons with logo printing from top manufacturers in Delhi NCR. Chef, cooking & hospitality aprons for corporate gifting, events & brand promotions. Bulk orders.",
    openGraph: { title: "Custom Apron Manufacturers in Delhi | Logo Print", description: "Custom aprons with logo printing for hospitality and corporate events in Delhi NCR." },
    twitter:   { title: "Custom Apron Manufacturers in Delhi | Logo Print", description: "Custom aprons with logo printing — bulk orders for corporate events in Delhi NCR." },
  },

  "/apparel-and-accessories/winter-wear": {
    h1: "Custom Winter Wear for Corporate Gifting & Employee Wellness",
    h2: "Branded Jackets, Hoodies & Warm Wear for Corporate Teams",
    title: "Custom Winter Wear in Delhi | Branded Jackets & Hoodies | Bulk Orders",
    description: "Shop custom winter wear with logo printing in Delhi NCR. Jackets, hoodies, sweatshirts & fleece vests for corporate gifting, employee welfare & brand promotions. Bulk orders.",
    openGraph: { title: "Custom Winter Wear in Delhi | Branded Jackets & Hoodies", description: "Custom winter wear with logo printing for corporate gifting and employee welfare in Delhi NCR." },
    twitter:   { title: "Custom Winter Wear in Delhi | Branded Jackets & Hoodies", description: "Custom winter wear for corporate gifting and employee wellness in Delhi NCR." },
  },

  /* ====================================================================
     OFFICE & WRITING — SUBCATEGORY PAGES
  ==================================================================== */

  "/office-and-writing/file-and-folder": {
    h1: "Custom File & Folder for Office Branding in Delhi NCR",
    h2: "Branded Document Folders & Files for Corporate & Office Use",
    title: "Custom Office Files & Folders in Delhi NCR | Logo Branding",
    description: "Buy custom files & folders with logo printing in Delhi NCR. A4 files, certificate folders & document holders for corporate branding, gifting & professional events. Bulk orders.",
    openGraph: { title: "Custom Office Files & Folders in Delhi NCR", description: "Custom files and folders with logo printing for corporate branding in Delhi NCR." },
    twitter:   { title: "Custom Office Files & Folders in Delhi NCR", description: "Custom files & folders with logo branding for corporate offices in Delhi NCR." },
  },

  "/office-and-writing/pen-and-writing-set": {
    h1: "Custom Pen & Writing Set for Corporate Gifting in Delhi",
    h2: "Premium Branded Pens & Writing Sets for Business Events & Gifting",
    title: "Custom Pens & Writing Sets for Corporate Gifting in Delhi | Bulk Orders",
    description: "Order custom pens & writing sets with logo printing in Delhi NCR. Metal pens, pen sets & stationery combos for corporate gifting, events & brand promotions. Bulk discounts.",
    openGraph: { title: "Custom Pens & Writing Sets for Corporate Gifting in Delhi", description: "Branded pens and writing sets for corporate gifting and promotions in Delhi NCR." },
    twitter:   { title: "Custom Pens & Writing Sets for Corporate Gifting in Delhi", description: "Custom pens & writing sets with logo printing for corporate gifting in Delhi NCR." },
  },

  "/office-and-writing/lanyard-and-id-card": {
    h1: "Custom Lanyard & ID Card in Delhi NCR for Offices & Events",
    h2: "Branded Lanyards with ID Cards for Corporate & Event Management",
    title: "Custom Lanyards & ID Cards in Delhi NCR | Bulk Orders",
    description: "Buy custom lanyards & ID cards with logo printing in Delhi NCR. Polyester, nylon & eco-friendly lanyards for offices, events, conferences & corporate branding. Bulk orders.",
    openGraph: { title: "Custom Lanyards & ID Cards in Delhi NCR", description: "Branded lanyards and ID cards for offices and corporate events in Delhi NCR." },
    twitter:   { title: "Custom Lanyards & ID Cards in Delhi NCR", description: "Custom lanyards with ID cards for offices and events in Delhi NCR." },
  },

  "/office-and-writing/notebooks-and-diary-sets": {
    h1: "Custom Notebooks & Diaries for Corporate Gifting in Delhi",
    h2: "Branded Notebooks & Diary Sets for Employee & Client Gifting",
    title: "Custom Notebooks & Diaries for Corporate Gifting in Delhi | Bulk Orders",
    description: "Order custom notebooks & diaries with logo printing in Delhi NCR. A4, A5 notebooks, spiral & hardbound diaries for corporate gifting, employee onboarding & events. Bulk discounts.",
    openGraph: { title: "Custom Notebooks & Diaries for Corporate Gifting in Delhi", description: "Branded notebooks and diaries for corporate gifting and employee onboarding in Delhi NCR." },
    twitter:   { title: "Custom Notebooks & Diaries for Corporate Gifting in Delhi", description: "Custom notebooks & diaries with logo printing for corporate gifting in Delhi NCR." },
  },

  /* ====================================================================
     COLLECTION — SUBCATEGORY PAGES
  ==================================================================== */

  "/collection/welcome-kits": {
    h1: "Customized Welcome Kits in Delhi for Employee Onboarding & Gifting",
    h2: "Premium Employee Welcome Kits with Custom Branding",
    title: "Custom Employee Welcome Kits in Delhi | Onboarding Gifts | Bulk Orders",
    description: "Order customized welcome kits for employee onboarding in Delhi NCR. Curated combo boxes with t-shirts, notebooks, pens & branded merchandise. Bulk orders, custom packaging.",
    openGraph: { title: "Custom Employee Welcome Kits in Delhi | Onboarding Gifts", description: "Customized welcome kits for employee onboarding with branded merchandise in Delhi NCR." },
    twitter:   { title: "Custom Employee Welcome Kits in Delhi | Onboarding Gifts", description: "Customized welcome kits for employee onboarding and corporate gifting in Delhi NCR." },
  },

  "/collection/promotional-clocks": {
    h1: "Custom Promotional Clock in Delhi for Corporate Gifting",
    h2: "Branded Desk & Wall Clocks for Corporate Events & Client Gifting",
    title: "Custom Promotional Clocks in Delhi | Branded Corporate Clocks | Bulk Orders",
    description: "Buy custom promotional clocks with logo printing in Delhi NCR. Desk clocks, wall clocks & digital clocks for corporate gifting, awards & brand promotions. Bulk discounts.",
    openGraph: { title: "Custom Promotional Clocks in Delhi | Branded Corporate Clocks", description: "Custom branded clocks for corporate gifting and events in Delhi NCR." },
    twitter:   { title: "Custom Promotional Clocks in Delhi | Branded Corporate Clocks", description: "Custom promotional clocks for corporate gifting in Delhi NCR." },
  },

  "/collection/keychains": {
    h1: "Custom Keychains in Delhi for Promotional & Corporate Gifting",
    h2: "Branded Keychains for Events, Trade Shows & Corporate Giveaways",
    title: "Custom Keychains in Delhi | Promotional & Corporate Gifting | Bulk Orders",
    description: "Order custom keychains with logo printing in Delhi NCR. Metal, acrylic & leather keychains for corporate gifting, trade shows & promotional events. Bulk order discounts.",
    openGraph: { title: "Custom Keychains in Delhi | Promotional & Corporate Gifting", description: "Custom keychains with logo printing for corporate events and promotions in Delhi NCR." },
    twitter:   { title: "Custom Keychains in Delhi | Promotional & Corporate Gifting", description: "Custom keychains for corporate gifting and promotional events in Delhi NCR." },
  },

  /* ====================================================================
     BAGS & TRAVEL — SUBCATEGORY PAGES
  ==================================================================== */

  "/bags-and-travel/backpacks": {
    h1: "Promotional Backpacks Manufacturers in Delhi for Corporate Gifting",
    h2: "Custom Branded Backpacks for Students, Teams & Corporate Events",
    title: "Custom Promotional Backpacks in Delhi | Logo Print | Bulk Orders",
    description: "Buy custom backpacks with logo printing from top manufacturers in Delhi NCR. Laptop, travel & sports backpacks for corporate gifting, employee onboarding & events. Bulk orders.",
    openGraph: { title: "Custom Promotional Backpacks in Delhi | Logo Print", description: "Custom backpacks with logo printing for corporate gifting and events in Delhi NCR." },
    twitter:   { title: "Custom Promotional Backpacks in Delhi | Logo Print", description: "Promotional backpacks with logo printing — bulk orders for corporate gifting in Delhi NCR." },
  },

  "/bags-and-travel/foldable-bags": {
    h1: "Promotional Foldable Bags in Delhi for Eco-Friendly Gifting",
    h2: "Custom Foldable Shopping Bags with Logo for Corporate & Retail Promotions",
    title: "Custom Foldable Bags in Delhi | Eco-Friendly Corporate Gifting | Bulk Orders",
    description: "Order custom foldable bags with logo printing in Delhi NCR. Reusable foldable shopping & tote bags for eco-friendly corporate gifting, events & retail promotions. Bulk discounts.",
    openGraph: { title: "Custom Foldable Bags in Delhi | Eco-Friendly Corporate Gifting", description: "Custom foldable bags for eco-friendly corporate gifting and promotions in Delhi NCR." },
    twitter:   { title: "Custom Foldable Bags in Delhi | Eco-Friendly Corporate Gifting", description: "Custom foldable bags with logo printing — eco-friendly corporate gifting in Delhi NCR." },
  },

  "/bags-and-travel/duffle-bags": {
    h1: "Custom Duffle Bag Manufacturers in Delhi for Corporate Gifting",
    h2: "Branded Sports & Travel Duffle Bags for Events & Corporate Gifting",
    title: "Custom Duffle Bags in Delhi | Logo Print | Bulk Corporate Orders",
    description: "Buy custom duffle bags with logo printing from top manufacturers in Delhi NCR. Sports, gym & travel duffle bags for corporate gifting, employee rewards & events. Bulk orders.",
    openGraph: { title: "Custom Duffle Bags in Delhi | Logo Print", description: "Custom duffle bags with logo printing for corporate gifting and events in Delhi NCR." },
    twitter:   { title: "Custom Duffle Bags in Delhi | Logo Print", description: "Custom duffle bags — bulk orders for corporate gifting in Delhi NCR." },
  },

  "/bags-and-travel/tote-bags": {
    h1: "Custom Tote Bags Manufacturers in Delhi for Branding & Gifting",
    h2: "Branded Canvas & Non-Woven Tote Bags for Events & Eco-Gifting",
    title: "Custom Tote Bags in Delhi | Eco-Friendly Branding | Bulk Orders",
    description: "Order custom tote bags with logo printing from top manufacturers in Delhi NCR. Canvas, jute & non-woven tote bags for corporate gifting, events & eco-friendly promotions.",
    openGraph: { title: "Custom Tote Bags in Delhi | Eco-Friendly Branding", description: "Custom tote bags with logo printing for eco-friendly corporate gifting in Delhi NCR." },
    twitter:   { title: "Custom Tote Bags in Delhi | Eco-Friendly Branding", description: "Custom tote bags for eco-friendly corporate branding in Delhi NCR." },
  },

  /* ====================================================================
     TECHNOLOGY ACCESSORIES — SUBCATEGORY PAGES
  ==================================================================== */

  "/technology-accessories/wireless-charging": {
    h1: "Custom Wireless Charger with Logo for Corporate Gifting in Delhi",
    h2: "Branded Wireless Charging Pads & Stands for Tech Corporate Gifting",
    title: "Custom Wireless Chargers with Logo in Delhi | Corporate Tech Gifts",
    description: "Buy custom wireless chargers with logo branding in Delhi NCR. Qi-enabled pads, stands & fast chargers for corporate gifting, employee rewards & tech promotions. Bulk orders.",
    openGraph: { title: "Custom Wireless Chargers with Logo in Delhi | Corporate Tech Gifts", description: "Branded wireless chargers for corporate gifting and tech promotions in Delhi NCR." },
    twitter:   { title: "Custom Wireless Chargers with Logo in Delhi | Corporate Tech Gifts", description: "Custom wireless chargers with logo branding for corporate tech gifting in Delhi NCR." },
  },

  "/technology-accessories/computer-accessories": {
    h1: "Custom Computer Accessories in Delhi NCR for Corporate Gifting",
    h2: "Branded Laptop & Computer Accessories for Tech Corporate Gifting",
    title: "Custom Computer Accessories in Delhi NCR | Corporate Tech Gifts",
    description: "Order custom computer accessories with logo branding in Delhi NCR. USB hubs, webcam covers, laptop stands & tech accessories for corporate gifting & employee rewards.",
    openGraph: { title: "Custom Computer Accessories in Delhi NCR | Corporate Tech Gifts", description: "Branded computer accessories for corporate tech gifting and employee rewards in Delhi NCR." },
    twitter:   { title: "Custom Computer Accessories in Delhi NCR | Corporate Tech Gifts", description: "Custom computer accessories with logo branding for corporate gifting in Delhi NCR." },
  },

  "/technology-accessories/power-banks": {
    h1: "Customized Power Bank in Delhi NCR with Logo Print",
    h2: "Branded Power Banks for Corporate Events & Tech Gifting",
    title: "Custom Power Bank in Delhi NCR | Logo Branding | Bulk Corporate Orders",
    description: "Buy custom power banks with logo printing in Delhi NCR. 10000mAh & 20000mAh branded power banks for corporate gifting, events & employee rewards. Bulk order discounts.",
    openGraph: { title: "Custom Power Bank in Delhi NCR | Logo Branding", description: "Branded power banks for corporate gifting and tech events in Delhi NCR." },
    twitter:   { title: "Custom Power Bank in Delhi NCR | Logo Branding", description: "Custom power banks with logo branding — bulk orders for corporate gifting in Delhi NCR." },
  },

  "/technology-accessories/desktop-and-mousepad": {
    h1: "Custom Mouse Pad in Delhi with Logo for Corporate & Office Use",
    h2: "Branded Desk & Mouse Pads for Offices, Events & Corporate Gifting",
    title: "Custom Mouse Pads in Delhi | Logo Branding | Corporate Office Gifts",
    description: "Order custom mouse pads with logo printing in Delhi NCR. Rubber, foam & extended gaming pads for office branding, corporate gifting & employee desk accessories. Bulk orders.",
    openGraph: { title: "Custom Mouse Pads in Delhi | Logo Branding | Corporate Office Gifts", description: "Branded mouse pads and desk accessories for offices and corporate gifting in Delhi NCR." },
    twitter:   { title: "Custom Mouse Pads in Delhi | Logo Branding | Corporate Office Gifts", description: "Custom mouse pads with logo printing for office branding and corporate gifting in Delhi NCR." },
  },

  /* ====================================================================
     ECO PRODUCTS — SUBCATEGORY PAGES
  ==================================================================== */

  "/eco-products/cork-sheet": {
    h1: "Customized Cork Sheet for Eco-Friendly Corporate Branding",
    h2: "Custom Cork Sheets for Gifting, Packaging & Sustainable Branding",
    title: "Custom Cork Sheets for Eco Corporate Gifting | Sustainable Branding",
    description: "Buy customized cork sheets for eco-friendly corporate branding in Delhi NCR. Natural cork sheets for gifting, decor, flooring & sustainable packaging. Bulk orders available.",
    openGraph: { title: "Custom Cork Sheets for Eco Corporate Gifting", description: "Customized cork sheets for sustainable corporate branding and eco-friendly gifting." },
    twitter:   { title: "Custom Cork Sheets for Eco Corporate Gifting", description: "Custom cork sheets for eco-friendly corporate branding and gifting." },
  },

  "/eco-products/cork-corporate-gifting-combo": {
    h1: "Custom Cork Corporate Gifting Combos for Sustainable Gifting",
    h2: "Eco-Friendly Cork Gift Combos for Events, CSR & Corporate Gifting",
    title: "Custom Cork Corporate Gifting Combos | Eco-Friendly Gifts",
    description: "Order custom cork corporate gifting combos for sustainable gifting in Delhi NCR. Eco-friendly cork product bundles for CSR initiatives, corporate events & employee gifting.",
    openGraph: { title: "Custom Cork Corporate Gifting Combos | Eco-Friendly Gifts", description: "Eco-friendly cork gift combos for sustainable corporate gifting and CSR initiatives." },
    twitter:   { title: "Custom Cork Corporate Gifting Combos | Eco-Friendly Gifts", description: "Custom cork gift combos for eco-friendly corporate gifting and CSR initiatives." },
  },

  "/eco-products/cork-coaster": {
    h1: "Customized Cork Coaster in Delhi NCR for Corporate Gifting",
    h2: "Branded Cork Coasters for Offices, Events & Eco-Friendly Gifting",
    title: "Custom Cork Coasters in Delhi NCR | Eco Corporate Gifts | Bulk Orders",
    description: "Buy custom cork coasters with logo printing in Delhi NCR. Round, square & custom-shaped cork coasters for corporate gifting, hospitality & eco-friendly brand promotions.",
    openGraph: { title: "Custom Cork Coasters in Delhi NCR | Eco Corporate Gifts", description: "Custom cork coasters for eco-friendly corporate gifting in Delhi NCR." },
    twitter:   { title: "Custom Cork Coasters in Delhi NCR | Eco Corporate Gifts", description: "Custom cork coasters with logo printing for eco-friendly corporate gifting in Delhi NCR." },
  },

  "/eco-products/cork-plant-decorate": {
    h1: "Custom Cork Plant Decorate in Delhi NCR for Eco-Friendly Gifting",
    h2: "Sustainable Cork Plant Accessories for Offices & Corporate Gifting",
    title: "Custom Cork Plant Decoratives in Delhi NCR | Eco-Friendly Gifts",
    description: "Order custom cork plant decoratives in Delhi NCR. Eco-friendly cork pot covers, plant stands & accessories for offices, homes & sustainable corporate gifting.",
    openGraph: { title: "Custom Cork Plant Decoratives in Delhi NCR | Eco-Friendly Gifts", description: "Custom cork plant decoratives for eco-friendly offices and corporate gifting." },
    twitter:   { title: "Custom Cork Plant Decoratives in Delhi NCR | Eco-Friendly Gifts", description: "Custom cork plant accessories for eco-friendly offices and corporate gifting." },
  },

  "/eco-products/cork-serving-decorate": {
    h1: "Custom Cork Serving Decoratives for Hospitality & Corporate Gifting",
    h2: "Branded Cork Trays, Boards & Serving Accessories for Gifting",
    title: "Custom Cork Serving Decoratives | Eco Hospitality Gifts",
    description: "Buy custom cork serving decoratives for hospitality and corporate gifting. Cork trays, cheese boards, serving mats & eco-friendly decor. Sustainable branding solutions.",
    openGraph: { title: "Custom Cork Serving Decoratives | Eco Hospitality Gifts", description: "Custom cork serving accessories for eco-friendly hospitality and corporate gifting." },
    twitter:   { title: "Custom Cork Serving Decoratives | Eco Hospitality Gifts", description: "Custom cork serving decoratives for hospitality and eco-friendly corporate gifting." },
  },

  "/eco-products/cork-horeca-range": {
    h1: "Custom Cork HoReCa Range in Delhi NCR for Hospitality Gifting",
    h2: "Premium Cork Products for Hotels, Restaurants & Café Branding",
    title: "Custom Cork HoReCa Range in Delhi NCR | Hospitality Gifts",
    description: "Shop the custom cork HoReCa range in Delhi NCR. Premium cork products for hotels, restaurants & cafés — placemats, coasters, boards & eco-friendly serving accessories.",
    openGraph: { title: "Custom Cork HoReCa Range in Delhi NCR | Hospitality Gifts", description: "Custom cork products for hotels, restaurants and cafés in Delhi NCR." },
    twitter:   { title: "Custom Cork HoReCa Range in Delhi NCR | Hospitality Gifts", description: "Custom cork HoReCa products for hospitality gifting in Delhi NCR." },
  },

  "/eco-products/cork-premium-lighting": {
    h1: "Custom Cork Premium Lighting for Eco-Friendly Home & Office Decor",
    h2: "Sustainable Cork Lamps & Lighting Accessories for Gifting",
    title: "Custom Cork Premium Lighting | Eco-Friendly Lamps & Decor Gifts",
    description: "Buy custom cork premium lighting for eco-friendly home & office decor. Cork table lamps, pendants & lighting accessories with natural cork base. Sustainable gifting solutions.",
    openGraph: { title: "Custom Cork Premium Lighting | Eco-Friendly Lamps & Decor Gifts", description: "Custom cork lighting accessories for eco-friendly home and office decor gifting." },
    twitter:   { title: "Custom Cork Premium Lighting | Eco-Friendly Lamps & Decor Gifts", description: "Custom cork lamps & lighting for eco-friendly home and office gifting." },
  },

  "/eco-products/cork-premium-gift-boxes": {
    h1: "Custom Cork Premium Gift Boxes for Sustainable Corporate Gifting",
    h2: "Eco-Friendly Cork Gift Boxes for Premium Corporate & Festive Gifting",
    title: "Custom Cork Gift Boxes for Sustainable Corporate Gifting",
    description: "Order custom cork premium gift boxes for sustainable corporate gifting. Eco-friendly cork gift packaging for employee rewards, client gifting & festive occasions. Bulk orders.",
    openGraph: { title: "Custom Cork Gift Boxes for Sustainable Corporate Gifting", description: "Premium cork gift boxes for sustainable corporate and festive gifting." },
    twitter:   { title: "Custom Cork Gift Boxes for Sustainable Corporate Gifting", description: "Custom cork premium gift boxes for sustainable corporate gifting." },
  },

  "/eco-products/cork-desk-top-accessories": {
    h1: "Custom Cork Desk Top Accessories for Eco-Friendly Office Gifting",
    h2: "Branded Cork Desk Organizers & Accessories for Office & Corporate Gifting",
    title: "Custom Cork Desk Accessories in Delhi | Eco Office Gifts",
    description: "Buy custom cork desk top accessories in Delhi NCR. Eco-friendly cork organizers, pen holders, mouse pads & desk sets for corporate gifting, offices & sustainable branding.",
    openGraph: { title: "Custom Cork Desk Accessories in Delhi | Eco Office Gifts", description: "Custom cork desk accessories for eco-friendly offices and corporate gifting." },
    twitter:   { title: "Custom Cork Desk Accessories in Delhi | Eco Office Gifts", description: "Custom cork desk accessories for eco-friendly office gifting." },
  },

  "/eco-products/cork-laptop-bag-and-wallet": {
    h1: "Custom Cork Laptop Bags & Wallets for Eco Corporate Gifting",
    h2: "Sustainable Cork Bags & Wallets for Tech Professionals & Corporate Gifting",
    title: "Custom Cork Laptop Bags & Wallets | Sustainable Tech Gifts",
    description: "Order custom cork laptop bags & wallets for eco-friendly corporate gifting. Natural cork tech accessories for professionals — laptop sleeves, wallets & card holders. Bulk orders.",
    openGraph: { title: "Custom Cork Laptop Bags & Wallets | Sustainable Tech Gifts", description: "Custom cork laptop bags and wallets for sustainable corporate tech gifting." },
    twitter:   { title: "Custom Cork Laptop Bags & Wallets | Sustainable Tech Gifts", description: "Custom cork laptop bags & wallets for eco-friendly corporate gifting." },
  },

  "/eco-products/cork-yoga-accessories": {
    h1: "Custom Cork Yoga Accessories for Wellness & Corporate Gifting",
    h2: "Eco-Friendly Cork Yoga Mats & Blocks for Wellness Corporate Gifts",
    title: "Custom Cork Yoga Accessories | Eco Wellness Corporate Gifts",
    description: "Buy custom cork yoga accessories for wellness gifting. Eco-friendly cork yoga mats, blocks & accessories for employee wellness, CSR initiatives & corporate gifting.",
    openGraph: { title: "Custom Cork Yoga Accessories | Eco Wellness Corporate Gifts", description: "Custom cork yoga accessories for wellness gifting and CSR initiatives." },
    twitter:   { title: "Custom Cork Yoga Accessories | Eco Wellness Corporate Gifts", description: "Custom cork yoga accessories for eco-friendly wellness and corporate gifting." },
  },

  /* ====================================================================
     DRINKWARE — SUBCATEGORY PAGES
  ==================================================================== */

  "/drink-ware/sipper": {
    h1: "Custom Sippers in Delhi with Logo for Corporate Gifting",
    h2: "Branded Sipper Bottles for Sports, Travel & Corporate Promotions",
    title: "Custom Sippers in Delhi | Logo Print | Bulk Corporate Orders",
    description: "Buy custom sippers with logo printing in Delhi NCR. Stainless steel, plastic & insulated sippers for corporate gifting, sports events & brand promotions. Bulk order discounts.",
    openGraph: { title: "Custom Sippers in Delhi | Logo Print", description: "Custom sippers with logo printing for corporate gifting and sports promotions in Delhi NCR." },
    twitter:   { title: "Custom Sippers in Delhi | Logo Print", description: "Custom sippers with logo printing — bulk orders for corporate gifting in Delhi NCR." },
  },

  "/drink-ware/bamboo-bottle": {
    h1: "Custom Bamboo Bottles in Delhi for Eco-Friendly Corporate Gifting",
    h2: "Sustainable Bamboo Water Bottles with Logo for Eco Corporate Gifting",
    title: "Custom Bamboo Bottles in Delhi | Eco Corporate Gifting | Bulk Orders",
    description: "Order custom bamboo bottles with logo printing in Delhi NCR. Eco-friendly, sustainable bamboo water bottles for corporate gifting, CSR initiatives & eco promotions.",
    openGraph: { title: "Custom Bamboo Bottles in Delhi | Eco Corporate Gifting", description: "Custom bamboo bottles for eco-friendly corporate gifting and CSR in Delhi NCR." },
    twitter:   { title: "Custom Bamboo Bottles in Delhi | Eco Corporate Gifting", description: "Custom bamboo bottles for eco-friendly corporate gifting in Delhi NCR." },
  },

  "/drink-ware/coffee-mug": {
    h1: "Custom Coffee Mugs for Corporate Gifting & Office Branding",
    h2: "Branded Coffee & Tea Mugs with Logo for Offices & Events",
    title: "Custom Coffee Mugs Near Me | Corporate Gifting | Bulk Orders",
    description: "Buy custom coffee mugs with logo printing near you in Delhi NCR. Ceramic, stainless steel & magic mugs for corporate gifting, office branding & promotional events. Bulk orders.",
    openGraph: { title: "Custom Coffee Mugs Near Me | Corporate Gifting", description: "Custom coffee mugs with logo printing for corporate gifting and office branding." },
    twitter:   { title: "Custom Coffee Mugs Near Me | Corporate Gifting", description: "Custom coffee mugs — bulk orders for corporate gifting and office branding." },
  },

  "/drink-ware/ceramic-mug": {
    h1: "Custom Ceramic Mugs for Corporate Gifting & Sublimation Printing",
    h2: "Branded Ceramic Tea & Coffee Mugs for Office & Corporate Gifting",
    title: "Custom Ceramic Mugs | Corporate Gifting & Sublimation Printing",
    description: "Order custom ceramic mugs with sublimation & logo printing for corporate gifting. Premium ceramic tea & coffee mugs for offices, events & employee gifting. Bulk discounts.",
    openGraph: { title: "Custom Ceramic Mugs | Corporate Gifting & Sublimation Printing", description: "Custom ceramic mugs with logo printing for corporate gifting and offices." },
    twitter:   { title: "Custom Ceramic Mugs | Corporate Gifting & Sublimation Printing", description: "Custom ceramic mugs with sublimation printing for corporate gifting." },
  },

  /* ====================================================================
     TROPHY & MOMENTO — SUBCATEGORY PAGES
  ==================================================================== */

  "/trophy-and-momento/trophy-and-momento": {
    h1: "Custom Trophy and Momento for Corporate Recognition & Awards",
    h2: "Premium Custom Trophies & Awards for Employee Recognition & Events",
    title: "Custom Trophy & Momento | Corporate Recognition Awards | Bulk Orders",
    description: "Order custom trophies & mementos with logo engraving in Delhi NCR. Crystal, acrylic, metal & resin awards for employee recognition, sports events & corporate occasions.",
    openGraph: { title: "Custom Trophy & Momento | Corporate Recognition Awards", description: "Custom trophies and mementos for employee recognition and corporate events in Delhi NCR." },
    twitter:   { title: "Custom Trophy & Momento | Corporate Recognition Awards", description: "Custom trophies & mementos for corporate recognition and awards in Delhi NCR." },
  },

};

export default seoConfig;
