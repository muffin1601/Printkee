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
    h1: "Apparel and Accessories",
    h2: "Custom Apparel Solutions for Events, Offices & Corporate Gifting",
    title: "Corporate Apparel & Accessories for Branding | Bulk Orders",
    description: "Shop premium custom apparel & accessories for corporate gifting in Delhi NCR. T-shirts, caps, ties, aprons with logo printing. Bulk orders, fast delivery Pan-India.",
    openGraph: { title: "Corporate Apparel & Accessories for Branding", description: "Premium custom apparel with logo printing for corporate gifting and events in Delhi NCR. Bulk orders available." },
    twitter:   { title: "Corporate Apparel & Accessories for Branding", description: "Custom apparel with logo printing — T-shirts, caps, ties & more for corporate gifting in Delhi NCR." },
  },

  "/office-and-writing": {
    h1: "Custom Office and stationary",
    h2: "Branded Stationery, Notebooks & Writing Sets for Corporate Gifting",
    title: "Custom Office Stationery & Supplies with Logo Bulk Order",
    description: "Buy custom office & writing essentials with logo printing in Delhi NCR. Pens, notebooks, diaries, lanyards & ID cards for corporate gifting and brand promotions.",
    openGraph: { title: "Custom Office & Writing Essentials for Corporate Branding", description: "Branded pens, notebooks, lanyards and office stationery for corporate gifting in Delhi NCR." },
    twitter:   { title: "Custom Office & Writing Essentials for Corporate Branding", description: "Branded stationery, notebooks & writing sets for corporate gifting in Delhi NCR." },
  },

  "/collection": {
    h1: "Collection",
    h2: "Curated Corporate Gift Collections for Every Occasion",
    title: "Corporate Gift Collections - Custom Branded Products India",
    description: "Explore our premium corporate gifting collection — custom welcome kits, promotional clocks, keychains & combos. Logo branding, bulk orders, Pan-India delivery.",
    openGraph: { title: "Premium Corporate Gifting Collection", description: "Custom welcome kits, promotional clocks & keychains for corporate gifting in Delhi NCR." },
    twitter:   { title: "Premium Corporate Gifting Collection", description: "Premium corporate gifting collection — custom welcome kits, keychains & more." },
  },

  "/bags-and-travel": {
    h1: "Customised Bags and Travel",
    h2: "Branded Bags, Backpacks & Travel Accessories for Events & Promotions",
    title: "Custom Bags & Travel Accessories for Corporate Gifting | Bulk Orders",
    description: "Shop custom bags & travel accessories with logo printing in Delhi NCR. Backpacks, duffle bags, tote bags & foldable bags for corporate gifting and brand promotions.",
    openGraph: { title: "Custom Bags & Travel Accessories for Corporate Gifting", description: "Branded backpacks, duffle bags, tote bags & travel accessories for corporate gifting in Delhi NCR." },
    twitter:   { title: "Custom Bags & Travel Accessories for Corporate Gifting", description: "Custom bags & travel accessories with logo printing for corporate gifting in Delhi NCR." },
  },

  "/technology-accessories": {
    h1: "Custom Technology Accessories",
    h2: "Branded Tech Gifts — Power Banks, Wireless Chargers & Computer Accessories",
    title: "Custom Technology Accessories with Logo Bulk Gifts India",
    description: "Buy custom tech accessories with logo branding in Delhi NCR. Power banks, wireless chargers, mouse pads & computer accessories for corporate gifting. Bulk orders.",
    openGraph: { title: "Custom Technology Accessories for Corporate Branding", description: "Branded power banks, wireless chargers & tech accessories for corporate gifting in Delhi NCR." },
    twitter:   { title: "Custom Technology Accessories for Corporate Branding", description: "Custom tech accessories with logo branding — corporate gifting in Delhi NCR." },
  },

  "/eco-products": {
    h1: "Our Eco Products",
    h2: "Sustainable Cork Gifting Solutions for Corporate Branding & CSR",
    title: "Eco-Friendly Corporate Gifts - Sustainable Products with Logo",
    description: "Shop eco-friendly cork corporate gifts in Delhi NCR. Cork coasters, desk accessories, yoga products, gift boxes & more. Sustainable branding solutions for CSR initiatives.",
    openGraph: { title: "Eco-Friendly Corporate Gifts & Sustainable Cork Products", description: "Sustainable cork corporate gifting solutions for eco-conscious brands in Delhi NCR." },
    twitter:   { title: "Eco-Friendly Corporate Gifts & Sustainable Cork Products", description: "Eco-friendly cork gifts for sustainable corporate branding and CSR initiatives." },
  },

  "/drink-ware": {
    h1: "Customised Drink Ware",
    h2: "Branded Drinkware for Corporate Events, Employee Gifting & Promotions",
    title: "Custom Drinkware - Bottles, Mugs & Sippers with Logo Print India",
    description: "Buy custom drinkware with logo printing in Delhi NCR. Bamboo bottles, ceramic mugs, coffee mugs & sippers for corporate gifting. Eco-friendly & premium options available.",
    openGraph: { title: "Custom Drinkware — Bottles, Mugs & Sippers with Logo Print", description: "Branded bamboo bottles, mugs & sippers for corporate gifting in Delhi NCR." },
    twitter:   { title: "Custom Drinkware — Bottles, Mugs & Sippers with Logo Print", description: "Custom drinkware with logo printing for corporate gifting in Delhi NCR." },
  },

  "/trophy-and-momento": {
    h1: "Custom Trophies & Mementos",
    h2: "Premium Trophies, Awards & Mementos for Events & Corporate Recognition",
    title: "Custom Trophies & Mementos with Engraving Awards India",
    description: "Order custom trophies & mementos with logo engraving in Delhi NCR. Crystal, acrylic & metal awards for employee recognition, corporate events & sports achievements.",
    openGraph: { title: "Custom Trophies & Mementos for Corporate Recognition", description: "Premium custom trophies and awards for employee recognition and corporate events in Delhi NCR." },
    twitter:   { title: "Custom Trophies & Mementos for Corporate Recognition", description: "Custom trophies & mementos with logo engraving for corporate events in Delhi NCR." },
  },

  /* ====================================================================
     APPAREL & ACCESSORIES — SUBCATEGORY PAGES
  ==================================================================== */

  "/apparel-and-accessories/polo-t-shirts": {
    h1: "Custom T-Shirt Manufacturers in Delhi",
    h2: "Customised printing T-Shirts by printkee",
    title: "Custom T-Shirt Manufacturers in Delhi Bulk Printing",
    description: "Shop premium polo t-shirts for men & women - 100% cotton, custom logo printing, bulk corporate orders. Vibrant colors, fast India delivery. Order now!",
    openGraph: { title: "Custom Polo T-Shirts in Delhi NCR | Logo Print", description: "Promotional polo t-shirts with logo printing for corporate branding. Bulk orders available in Delhi NCR." },
    twitter:   { title: "Custom Polo T-Shirts in Delhi NCR | Bulk Orders", description: "Promotional polo t-shirts with logo printing — bulk corporate orders in Delhi NCR." },
  },

  "/apparel-and-accessories/round-neck-t-shirts": {
    h1: "Custom  Round Neck T-Shirts Manufacturers in Delhi",
    h2: "Personalised Round Neck T-Shirt",
    title: "Round Neck T-Shirt Manufacturers in Delhi Custom Print",
    description: "Buy round neck t-shirts online - soft cotton, perfect for printing, events & daily wear. Bulk discounts, custom designs, pan-India shipping. Get a quote today!",
    openGraph: { title: "Custom Round Neck T-Shirt Manufacturers in Delhi", description: "Promotional round neck t-shirts with logo printing for corporate teams and events in Delhi NCR." },
    twitter:   { title: "Custom Round Neck T-Shirt Manufacturers in Delhi", description: "Custom round neck t-shirts in bulk for corporate branding in Delhi NCR." },
  },

  "/apparel-and-accessories/caps": {
    h1: "Custom Cap Manufacturer in Delhi NCR",
    h2: "Custom Caps with Name & Logo",
    title: "Custom Cap Manufacturer in Delhi NCR Logo Embroidery",
    description: "Custom printed caps for brands & teams - adjustable, premium fabric with embroidery & printing. Low MOQ, fast delivery across India. Design your caps now!",
    openGraph: { title: "Promotional Caps Manufacturers in Delhi NCR", description: "Custom caps with logo printing for corporate events and promotions in Delhi NCR." },
    twitter:   { title: "Promotional Caps Manufacturers in Delhi NCR", description: "Promotional caps with custom logo printing — bulk orders in Delhi NCR." },
  },

  "/apparel-and-accessories/hats": {
    h1: "Custom Hat in Delhi",
    h2: "Custom hats with Name & Logo",
    title: "Custom Hats in Delhi with Logo Bulk Corporate Gifts",
    description: "Stylish hats for sun protection & branding - bucket, snapback & fedora styles with custom logo. Durable, bulk orders, India-wide shipping. Shop hats today!",
    openGraph: { title: "Custom Hats with Logo Print in Delhi", description: "Custom hats with logo printing for corporate branding and events in Delhi NCR." },
    twitter:   { title: "Custom Hats with Logo Print in Delhi", description: "Custom hats with logo print — bulk orders for corporate events in Delhi NCR." },
  },

  "/apparel-and-accessories/corporate-shirts": {
    h1: "Customized shirt printing near me",
    h2: "Custom Formal shirts Printing",
    title: "Custom Shirt Printing Near Me Fast Delivery Delhi NCR",
    description: "Premium corporate shirts for office uniforms - wrinkle-free fabrics with custom embroidery. Bulk pricing, perfect fit, delivered across India. Enquire now!",
    openGraph: { title: "Custom Corporate Shirts in Delhi | Formal Uniform & Gifting", description: "Custom formal shirts with logo printing for corporate uniforms and gifting in Delhi NCR." },
    twitter:   { title: "Custom Corporate Shirts in Delhi | Formal Uniform & Gifting", description: "Custom corporate shirts for offices, uniforms and employee gifting in Delhi NCR." },
  },

  "/apparel-and-accessories/ties": {
    h1: "Custom Tie in Delhi",
    h2: "Customized Ties with Logo & Embroidery",
    title: "Custom Ties in Delhi Logo Woven Corporate Ties",
    description: "Buy corporate ties in silk & polyester - custom colors, logo woven, ideal for uniforms & gifting. Bulk orders, quick turnaround, pan-India delivery. Order now!",
    openGraph: { title: "Promotional Ties in Delhi | Custom Logo Ties", description: "Custom branded ties for corporate gifting and formal uniforms in Delhi NCR." },
    twitter:   { title: "Promotional Ties in Delhi | Custom Logo Ties", description: "Promotional ties with custom logo branding for corporate gifting in Delhi NCR." },
  },

  "/apparel-and-accessories/aprons": {
    h1: "Custom Aprons in Delhi",
    h2: "Customised Printed Apron with Logo",
    title: "Custom Aprons in Delhi with Logo Print  Bulk Orders",
    description: "Durable aprons for kitchen, salon & industry - waterproof, custom printing & embroidery. Bulk supply, multiple colors, fast India shipping. Get branded aprons!",
    openGraph: { title: "Custom Apron Manufacturers in Delhi | Logo Print", description: "Custom aprons with logo printing for hospitality and corporate events in Delhi NCR." },
    twitter:   { title: "Custom Apron Manufacturers in Delhi | Logo Print", description: "Custom aprons with logo printing — bulk orders for corporate events in Delhi NCR." },
  },

  "/apparel-and-accessories/winter-wear": {
    h1: "Custom Winter Wear in Delhi",
    h2: "Customised Printed Winter Wear with Logo",
    title: "Custom Winter Wear in Delhi Jackets & Hoodies Printing",
    description: "Bulk winter wear for corporates - jackets, hoodies & sweatshirts with custom logo. Warm, stylish, all sizes, pan-India delivery. Request winter collection!",
    openGraph: { title: "Custom Winter Wear in Delhi | Branded Jackets & Hoodies", description: "Custom winter wear with logo printing for corporate gifting and employee welfare in Delhi NCR." },
    twitter:   { title: "Custom Winter Wear in Delhi | Branded Jackets & Hoodies", description: "Custom winter wear for corporate gifting and employee wellness in Delhi NCR." },
  },

  /* ====================================================================
     OFFICE & WRITING — SUBCATEGORY PAGES
  ==================================================================== */

  "/office-and-writing/file-and-folder": {
    h1: "Custom Files & Folder for Office",
    h2: "Promotional Branding File and Folder",
    title: "Custom Files & Folders for Office Logo Printing India",
    description: "Buy corporate file folders with logo printing - button & zipper styles for documents. Bulk orders, custom branding, fast pan-India delivery. Order now!",
    openGraph: { title: "Custom Office Files & Folders in Delhi NCR", description: "Custom files and folders with logo printing for corporate branding in Delhi NCR." },
    twitter:   { title: "Custom Office Files & Folders in Delhi NCR", description: "Custom files & folders with logo branding for corporate offices in Delhi NCR." },
  },

  "/office-and-writing/pen-and-writing-set": {
    h1: "Custom Pen & Writing Set",
    h2: "Customized Plastic Pens & Metal Pens Printing",
    title: "Custom Pens & Writing Sets with Logo Bulk Gifts India",
    description: "Premium pen & writing sets for branding - metal ball pens, gift boxes with custom logo. Bulk corporate orders, fast turnaround, India-wide delivery. Shop now!",
    openGraph: { title: "Custom Pens & Writing Sets for Corporate Gifting in Delhi", description: "Branded pens and writing sets for corporate gifting and promotions in Delhi NCR." },
    twitter:   { title: "Custom Pens & Writing Sets for Corporate Gifting in Delhi", description: "Custom pens & writing sets with logo printing for corporate gifting in Delhi NCR." },
  },

  "/office-and-writing/lanyard-and-id-card": {
    h1: "Custom Lanyard & ID Card in Delhi NCR",
    h2: "Customized Lanyard & ID Card Printing by Printkee",
    title: "Custom Lanyards & ID Cards Delhi NCR Bulk Printing",
    description: "Custom lanyards & ID card holders for offices & events - sublimation print, metal hooks, bulk supply. Durable, vibrant colors, pan-India delivery. Desig",
    openGraph: { title: "Custom Lanyards & ID Cards in Delhi NCR", description: "Branded lanyards and ID cards for offices and corporate events in Delhi NCR." },
    twitter:   { title: "Custom Lanyards & ID Cards in Delhi NCR", description: "Custom lanyards with ID cards for offices and events in Delhi NCR." },
  },

  "/office-and-writing/notebooks-and-diary-sets": {
    h1: "Custom Notebooks & Diaries",
    h2: "Custom Printed Notebook",
    title: "Custom Notebooks & Diaries with Logo Corporate Gifts",
    description: "Order custom notebooks & diaries with logo printing in Delhi NCR. A4, A5 notebooks, spiral & hardbound diaries for corporate gifting, employee onboarding & events. Bulk discounts.",
    openGraph: { title: "Custom Notebooks & Diaries for Corporate Gifting in Delhi", description: "Branded notebooks and diaries for corporate gifting and employee onboarding in Delhi NCR." },
    twitter:   { title: "Custom Notebooks & Diaries for Corporate Gifting in Delhi", description: "Custom notebooks & diaries with logo printing for corporate gifting in Delhi NCR." },
  },

  /* ====================================================================
     COLLECTION — SUBCATEGORY PAGES
  ==================================================================== */

  "/collection/welcome-kits": {
    h1: "Custom Welcome Kit",
    h2: "Customized Employee Welcome Kit",
    title: "Custom Welcome Kits for Employees Onboarding Gifts India",
    description: "Order customized welcome kits in Delhi - onboarding boxes with t-shirt, bottle, diary. Logo branding, bulk corporate gifting, Delhi NCR delivery. Get quote!",
    openGraph: { title: "Custom Employee Welcome Kits in Delhi | Onboarding Gifts", description: "Customized welcome kits for employee onboarding with branded merchandise in Delhi NCR." },
    twitter:   { title: "Custom Employee Welcome Kits in Delhi | Onboarding Gifts", description: "Customized welcome kits for employee onboarding and corporate gifting in Delhi NCR." },
  },

  "/collection/promotional-clocks": {
    h1: "Custom Promotional Clocks in delhi",
    h2: "Customized  Promotional Clocks",
    title: "Promotional Clocks in Delhi Custom Logo Wall Clocks",
    description: "Buy promotional clocks in Delhi - wall & table clocks with custom logo for corporate gifts. Bulk pricing, premium quality, fast delivery in Delhi NCR. Shop now!",
    openGraph: { title: "Custom Promotional Clocks in Delhi | Branded Corporate Clocks", description: "Custom branded clocks for corporate gifting and events in Delhi NCR." },
    twitter:   { title: "Custom Promotional Clocks in Delhi | Branded Corporate Clocks", description: "Custom promotional clocks for corporate gifting in Delhi NCR." },
  },

  "/collection/keychains": {
    h1: "Custom made keychains",
    h2: "Promotional made keychains",
    title: "Custom Keychains with Logo Metal & Acrylic Bulk India",
    description: "Custom keychains in Delhi - metal, acrylic & leather with logo print for promotions. Low MOQ, bulk orders, quick delivery across Delhi NCR. Order today!",
    openGraph: { title: "Custom Keychains in Delhi | Promotional & Corporate Gifting", description: "Custom keychains with logo printing for corporate events and promotions in Delhi NCR." },
    twitter:   { title: "Custom Keychains in Delhi | Promotional & Corporate Gifting", description: "Custom keychains for corporate gifting and promotional events in Delhi NCR." },
  },

  /* ====================================================================
     BAGS & TRAVEL — SUBCATEGORY PAGES
  ==================================================================== */

  "/bags-and-travel/backpacks": {
    h1: "Custom Backpack in Delhi",
    h2: "Customized Promotional Backpacks with Logo",
    title: "Custom Backpacks in Delhi Logo Printing Bulk Supply",
    description: "Shop custom backpacks for corporate & college - durable, laptop-friendly with logo print & embroidery. Bulk orders, all colors, pan-India delivery. Order now!",
    openGraph: { title: "Custom Promotional Backpacks in Delhi | Logo Print", description: "Custom backpacks with logo printing for corporate gifting and events in Delhi NCR." },
    twitter:   { title: "Custom Promotional Backpacks in Delhi | Logo Print", description: "Promotional backpacks with logo printing — bulk orders for corporate gifting in Delhi NCR." },
  },

  "/bags-and-travel/foldable-bags": {
    h1: "Custom Foldable Bag in Delhi",
    h2: "Customised Printed Folding  Bag",
    title: "Custom Foldable Bags in Delhi Eco Reusable Printing",
    description: "Buy foldable bags online - reusable shopping bags with custom logo print. Eco-friendly, bulk pricing, compact storage, pan-India shipping. Get quote today!",
    openGraph: { title: "Custom Foldable Bags in Delhi | Eco-Friendly Corporate Gifting", description: "Custom foldable bags for eco-friendly corporate gifting and promotions in Delhi NCR." },
    twitter:   { title: "Custom Foldable Bags in Delhi | Eco-Friendly Corporate Gifting", description: "Custom foldable bags with logo printing — eco-friendly corporate gifting in Delhi NCR." },
  },

  "/bags-and-travel/duffle-bags": {
    h1: "Custom Duffle Bag Manufacturers in Delhi",
    h2: "Promotional Printed  Duffle Bag",
    title: "Duffle Bag Manufacturers in Delhi Custom Logo Bags",
    description: "Premium duffle bags for gym, travel & corporate kits - water-resistant, custom branding, multiple sizes. Bulk discounts, fast India-wide delivery. Shop now!",
    openGraph: { title: "Custom Duffle Bags in Delhi | Logo Print", description: "Custom duffle bags with logo printing for corporate gifting and events in Delhi NCR." },
    twitter:   { title: "Custom Duffle Bags in Delhi | Logo Print", description: "Custom duffle bags — bulk orders for corporate gifting in Delhi NCR." },
  },

  "/bags-and-travel/tote-bags": {
    h1: "Custom Tote Bags Manufacturers in Delhi",
    h2: "promotional tote bags with logo",
    title: "Tote Bag Manufacturers in Delhi Custom Cotton Bags",
    description: "Custom tote bags for branding & retail - cotton, canvas & jute with logo printing. Eco-friendly, bulk orders, fast delivery across India. Design yours today!",
    openGraph: { title: "Custom Tote Bags in Delhi | Eco-Friendly Branding", description: "Custom tote bags with logo printing for eco-friendly corporate gifting in Delhi NCR." },
    twitter:   { title: "Custom Tote Bags in Delhi | Eco-Friendly Branding", description: "Custom tote bags for eco-friendly corporate branding in Delhi NCR." },
  },

  /* ====================================================================
     TECHNOLOGY ACCESSORIES — SUBCATEGORY PAGES
  ==================================================================== */

  "/technology-accessories/wireless-charging": {
    h1: "Custom Wireless Charger with Logo & Name",
    h2: "Personalised Custom Chargers With Logo",
    title: "Custom Wireless Chargers with Logo Corporate Gifts",
    description: "Buy wireless chargers for corporate gifting - Qi-enabled pads & stands with custom logo printing. Bulk orders, fast pan-India delivery. Order now!",
    openGraph: { title: "Custom Wireless Chargers with Logo in Delhi | Corporate Tech Gifts", description: "Branded wireless chargers for corporate gifting and tech promotions in Delhi NCR." },
    twitter:   { title: "Custom Wireless Chargers with Logo in Delhi | Corporate Tech Gifts", description: "Custom wireless chargers with logo branding for corporate tech gifting in Delhi NCR." },
  },

  "/technology-accessories/computer-accessories": {
    h1: "Custom Computer Accessories in Delhi NCR",
    h2: "personalized computer accessories",
    title: "Custom Computer Accessories Delhi NCR Logo Branding",
    description: "Shop computer accessories for branding - mouse, keyboards, USB hubs with logo print. Bulk corporate gifting, fast delivery across India. Get quote today!",
    openGraph: { title: "Custom Computer Accessories in Delhi NCR | Corporate Tech Gifts", description: "Branded computer accessories for corporate tech gifting and employee rewards in Delhi NCR." },
    twitter:   { title: "Custom Computer Accessories in Delhi NCR | Corporate Tech Gifts", description: "Custom computer accessories with logo branding for corporate gifting in Delhi NCR." },
  },

  "/technology-accessories/power-banks": {
    h1: "Customized Power Bank in Delhi NCR",
    h2: "Promotional custom Power Bank",
    title: "Custom Power Banks Delhi NCR Logo Print Bulk Orders",
    description: "Custom power banks for promotions - 10000mAh & 20000mAh with logo printing. Bulk pricing, certified quality, pan-India shipping. Order power banks now!",
    openGraph: { title: "Custom Power Bank in Delhi NCR | Logo Branding", description: "Branded power banks for corporate gifting and tech events in Delhi NCR." },
    twitter:   { title: "Custom Power Bank in Delhi NCR | Logo Branding", description: "Custom power banks with logo branding — bulk orders for corporate gifting in Delhi NCR." },
  },

  "/technology-accessories/desktop-and-mousepad": {
    h1: "Custom Mouse pad in Delhi",
    h2: "Custom Printing  Mouse pad By Printkee",
    title: "Custom Mouse Pads in Delhi Logo Printing Bulk",
    description: "Custom desktop mousepads with logo print - rubber base, smooth surface for offices. Bulk orders, vibrant printing, fast pan-India delivery. Design now!",
    openGraph: { title: "Custom Mouse Pads in Delhi | Logo Branding | Corporate Office Gifts", description: "Branded mouse pads and desk accessories for offices and corporate gifting in Delhi NCR." },
    twitter:   { title: "Custom Mouse Pads in Delhi | Logo Branding | Corporate Office Gifts", description: "Custom mouse pads with logo printing for office branding and corporate gifting in Delhi NCR." },
  },

  /* ====================================================================
     ECO PRODUCTS — SUBCATEGORY PAGES
  ==================================================================== */

  "/eco-products/cork-sheet": {
    h1: "customized Cork Sheet",
    h2: "Promotional Cork Sheet",
    title: "Custom Cork Sheets Eco-Friendly Craft & Branding India",
    description: "Buy natural cork sheets for crafts & branding - eco-friendly, custom sizes with logo print. Bulk supply, fast pan-India delivery. Order now!",
    openGraph: { title: "Custom Cork Sheets for Eco Corporate Gifting", description: "Customized cork sheets for sustainable corporate branding and eco-friendly gifting." },
    twitter:   { title: "Custom Cork Sheets for Eco Corporate Gifting", description: "Custom cork sheets for eco-friendly corporate branding and gifting." },
  },

  "/eco-products/cork-corporate-gifting-combo": {
    h1: "Custom Cork Corporate Gifting Combos",
    h2: "Promotional Cork Corporate Gifting Combo",
    title: "Cork Corporate Gift Combos Eco Sustainable Kits India",
    description: "Cork corporate gifting combos - kits with diary, coaster, bottle & more. Custom logo, bulk pricing, sustainable gifts, pan-India shipping. Get quote!",
    openGraph: { title: "Custom Cork Corporate Gifting Combos | Eco-Friendly Gifts", description: "Eco-friendly cork gift combos for sustainable corporate gifting and CSR initiatives." },
    twitter:   { title: "Custom Cork Corporate Gifting Combos | Eco-Friendly Gifts", description: "Custom cork gift combos for eco-friendly corporate gifting and CSR initiatives." },
  },

  "/eco-products/cork-coaster": {
    h1: "customized Cork Coaster in Delhi NCR",
    h2: "Promotional Cork Coaster",
    title: "Custom Cork Coasters Delhi NCR Logo Print Bulk",
    description: "Custom cork coasters for branding - natural, heat-resistant with logo printing. Eco-friendly gifts, bulk orders, multiple shapes, fast India delivery. Shop now!",
    openGraph: { title: "Custom Cork Coasters in Delhi NCR | Eco Corporate Gifts", description: "Custom cork coasters for eco-friendly corporate gifting in Delhi NCR." },
    twitter:   { title: "Custom Cork Coasters in Delhi NCR | Eco Corporate Gifts", description: "Custom cork coasters with logo printing for eco-friendly corporate gifting in Delhi NCR." },
  },

  "/eco-products/cork-plant-decorate": {
    h1: "Custom Cork Plant Decorate in Delhi NCR",
    h2: "Promotional Cork Plant Decorate",
    title: "Cork Plant Decor Delhi NCR Eco Office Planters",
    description: "Cork plant decor for offices & homes - sustainable pots & planters with natural finish. Eco gifting, bulk orders, branding, pan-India delivery. Buy!",
    openGraph: { title: "Custom Cork Plant Decoratives in Delhi NCR | Eco-Friendly Gifts", description: "Custom cork plant decoratives for eco-friendly offices and corporate gifting." },
    twitter:   { title: "Custom Cork Plant Decoratives in Delhi NCR | Eco-Friendly Gifts", description: "Custom cork plant accessories for eco-friendly offices and corporate gifting." },
  },

  "/eco-products/cork-serving-decorate": {
    h1: "Custom Cork Serving Decoratives",
    h2: "Promotional Cork Serving Decorate",
    title: "Custom Cork Serving Trays Eco Horeca Decor India",
    description: "Cork serving trays & decor - eco-friendly, heat-resistant with natural look. Perfect for Horeca & gifting, custom logo, bulk supply, pan-India shipping. Order!",
    openGraph: { title: "Custom Cork Serving Decoratives | Eco Hospitality Gifts", description: "Custom cork serving accessories for eco-friendly hospitality and corporate gifting." },
    twitter:   { title: "Custom Cork Serving Decoratives | Eco Hospitality Gifts", description: "Custom cork serving decoratives for hospitality and eco-friendly corporate gifting." },
  },

  "/eco-products/cork-horeca-range": {
    h1: "Custom Cork Horeca Range in Delhi NCR",
    h2: "Promotional Cork Horeca Range",
    title: "Cork Horeca Range Delhi NCR Trays & Coasters Bulk",
    description: "Cork Horeca range for hotels & cafes - trays, coasters, menus with natural cork. Eco-friendly, bulk orders, custom branding, pan-India delivery. Enquire!",
    openGraph: { title: "Custom Cork HoReCa Range in Delhi NCR | Hospitality Gifts", description: "Custom cork products for hotels, restaurants and cafés in Delhi NCR." },
    twitter:   { title: "Custom Cork HoReCa Range in Delhi NCR | Hospitality Gifts", description: "Custom cork HoReCa products for hospitality gifting in Delhi NCR." },
  },

  "/eco-products/cork-premium-lighting": {
    h1: "Custom Cork Premium Lighting",
    h2: "Promotional Cork Premium Lighting",
    title: "Custom Cork Lighting Premium Eco Lamps India",
    description: "Premium cork lighting - eco-friendly table lamps & pendants with natural cork base. Sustainable decor, custom branding, bulk gifting, India-wide delivery. Shop!",
    openGraph: { title: "Custom Cork Premium Lighting | Eco-Friendly Lamps & Decor Gifts", description: "Custom cork lighting accessories for eco-friendly home and office decor gifting." },
    twitter:   { title: "Custom Cork Premium Lighting | Eco-Friendly Lamps & Decor Gifts", description: "Custom cork lamps & lighting for eco-friendly home and office gifting." },
  },

  "/eco-products/cork-premium-gift-boxes": {
    h1: "Custom Cork Premium Gift Box",
    h2: "Promotional Cork Premium Gift Boxes",
    title: "Cork Premium Gift Boxes Eco Packaging with Logo",
    description: "Cork premium gift boxes - sustainable packaging with natural finish. Custom logo printing, bulk corporate orders, eco-friendly, pan-India shipping. Order!",
    openGraph: { title: "Custom Cork Gift Boxes for Sustainable Corporate Gifting", description: "Premium cork gift boxes for sustainable corporate and festive gifting." },
    twitter:   { title: "Custom Cork Gift Boxes for Sustainable Corporate Gifting", description: "Custom cork premium gift boxes for sustainable corporate gifting." },
  },

  "/eco-products/cork-desk-top-accessories": {
    h1: "Custom Cork Desk Top Accessories",
    h2: "Promotional Cork Desk Top Accessories",
    title: "Cork Desk Accessories Organizers & Mats with Logo",
    description: "Cork desktop accessories - organizers, pen stands & mouse pads in natural cork. Eco-friendly supplies, custom branding, bulk pricing, pan-India delivery. Buy!",
    openGraph: { title: "Custom Cork Desk Accessories in Delhi | Eco Office Gifts", description: "Custom cork desk accessories for eco-friendly offices and corporate gifting." },
    twitter:   { title: "Custom Cork Desk Accessories in Delhi | Eco Office Gifts", description: "Custom cork desk accessories for eco-friendly office gifting." },
  },

  "/eco-products/cork-laptop-bag-and-wallet": {
    h1: "Custom Cork Laptop Bags & Wallets",
    h2: "Promotional Custom Cork Laptop Bags & Wallets",
    title: "Cork Laptop Bags & Wallets Vegan Custom Gifts India",
    description: "Cork laptop bags & wallets - vegan, water-resistant with natural cork finish. Custom logo, sustainable gifts, bulk orders, fast India delivery. Shop collection!",
    openGraph: { title: "Custom Cork Laptop Bags & Wallets | Sustainable Tech Gifts", description: "Custom cork laptop bags and wallets for sustainable corporate tech gifting." },
    twitter:   { title: "Custom Cork Laptop Bags & Wallets | Sustainable Tech Gifts", description: "Custom cork laptop bags & wallets for eco-friendly corporate gifting." },
  },

  "/eco-products/cork-yoga-accessories": {
    h1: "Custom Cork Yoga Accessories",
    h2: "Promotional Custom Cork Yoga Accessories",
    title: "Custom Cork Yoga Mats & Blocks Eco Wellness Gifts",
    description: "Cork yoga accessories - eco-friendly mats, blocks & rollers with natural grip. Wellness gifts, custom branding, bulk supply, pan-India shipping. Order!",
    openGraph: { title: "Custom Cork Yoga Accessories | Eco Wellness Corporate Gifts", description: "Custom cork yoga accessories for wellness gifting and CSR initiatives." },
    twitter:   { title: "Custom Cork Yoga Accessories | Eco Wellness Corporate Gifts", description: "Custom cork yoga accessories for eco-friendly wellness and corporate gifting." },
  },

  /* ====================================================================
     DRINKWARE — SUBCATEGORY PAGES
  ==================================================================== */

  "/drink-ware/sipper": {
    h1: "Custom Sippers in Delhi",
    h2: "Personalized Sipper Bottles By Pintkee",
    title: "Custom Sippers in Delhi Steel Bottles with Logo",
    description: "Buy custom sipper bottles for corporate gifts - stainless steel, leak-proof with logo print. Bulk orders, multiple colors, fast India delivery. Shop now!",
    openGraph: { title: "Custom Sippers in Delhi | Logo Print", description: "Custom sippers with logo printing for corporate gifting and sports promotions in Delhi NCR." },
    twitter:   { title: "Custom Sippers in Delhi | Logo Print", description: "Custom sippers with logo printing — bulk orders for corporate gifting in Delhi NCR." },
  },

  "/drink-ware/bamboo-bottle": {
    h1: "Custom Bamboo Bottles in Delhi for Eco-Friendly Corporate Gifting",
    h2: "Sustainable Bamboo Water Bottles with Logo for Eco Corporate Gifting",
    title: "Custom Bamboo Bottles in Delhi | Eco Corporate Gifting | Bulk Orders",
    description: "Eco-friendly bamboo bottles with custom logo - sustainable corporate gifting. Leak-proof steel interior, bulk pricing, pan-India delivery. Order now!",
    openGraph: { title: "Custom Bamboo Bottles in Delhi | Eco Corporate Gifting", description: "Custom bamboo bottles for eco-friendly corporate gifting and CSR in Delhi NCR." },
    twitter:   { title: "Custom Bamboo Bottles in Delhi | Eco Corporate Gifting", description: "Custom bamboo bottles for eco-friendly corporate gifting in Delhi NCR." },
  },

  "/drink-ware/coffee-mug": {
    h1: "custom coffee mugs near me",
    h2: "Custom Printed Coffee Mug",
    title: "Custom Coffee Mugs Near Me Print Delhi NCR",
    description: "Custom coffee mugs for branding - ceramic, sublimation printing with logo & photos. Bulk corporate gifts, dishwasher safe, fast India delivery. Get yours!",
    openGraph: { title: "Custom Coffee Mugs Near Me | Corporate Gifting", description: "Custom coffee mugs with logo printing for corporate gifting and office branding." },
    twitter:   { title: "Custom Coffee Mugs Near Me | Corporate Gifting", description: "Custom coffee mugs — bulk orders for corporate gifting and office branding." },
  },

  "/drink-ware/ceramic-mug": {
    h1: "Custom Ceramic Mugs",
    h2: "Custom Promotional Ceramic Mugs",
    title: "Custom Ceramic Mugs with Logo Bulk Corporate Gifts",
    description: "Buy ceramic mugs with custom printing - premium white mugs for corporate gifting & events. Bulk orders, vibrant colors, quick pan-India shipping. Design today!",
    openGraph: { title: "Custom Ceramic Mugs | Corporate Gifting & Sublimation Printing", description: "Custom ceramic mugs with logo printing for corporate gifting and offices." },
    twitter:   { title: "Custom Ceramic Mugs | Corporate Gifting & Sublimation Printing", description: "Custom ceramic mugs with sublimation printing for corporate gifting." },
  },

  /* ====================================================================
     TROPHY & MOMENTO — SUBCATEGORY PAGES
  ==================================================================== */

  "/trophy-and-momento/trophy-and-momento": {
    h1: "Custom Trophy and Momento",
    h2: "Customised Corporate Trophies and Awards",
    title: "Custom Trophies & Mementos Award Engraving India",
    description: "Buy custom trophies & mementos for awards - crystal, acrylic, metal with logo engraving. Corporate events, bulk orders, fast pan-India delivery. Order now!",
    openGraph: { title: "Custom Trophy & Momento | Corporate Recognition Awards", description: "Custom trophies and mementos for employee recognition and corporate events in Delhi NCR." },
    twitter:   { title: "Custom Trophy & Momento | Corporate Recognition Awards", description: "Custom trophies & mementos for corporate recognition and awards in Delhi NCR." },
  },

};

export default seoConfig;
