const poloTshirts = require("./products/poloTshirts");
const aprons = require("./products/aprons");
const roundneckTshirts = require("./products/roundneckTshirts");
const caps = require("./products/caps");
const hats = require("./products/hats");
const corporateShirts = require("./products/corporateShirts");
const winterWear = require("./products/winterWear");
const ties = require("./products/ties");
const corkSheetProducts = require("./products/ecoproducts/corkSheetProducts");
const corkCorporateGiftingComboProducts = require("./products/ecoproducts/corkCorporateGiftingComboProducts");
const corkCoasterProducts = require("./products/ecoproducts/corkCoasterProducts");
const corkPlantDecorateProducts = require("./products/ecoproducts/corkPlantDecorateProducts");
const corkServingDecorateProducts = require("./products/ecoproducts/corkServingDecorateProducts");
const corkHorecaProducts = require("./products/ecoproducts/corkHorecaProducts");
const corkLightingProducts = require("./products/ecoproducts/corkLightingProducts");
const corkYogaProducts = require("./products/ecoproducts/corkYogaProducts");
const corkGiftBoxProducts = require("./products/ecoproducts/corkGiftBoxProducts");
const corkDeskProducts = require("./products/ecoproducts/corkDeskProducts");
const corkBagWalletProducts = require("./products/ecoproducts/corkBagWalletProducts");
const filesAndFolders = require("./products/office/filefolder");
const pensAndWritingSets = require("./products/office/pensAndWritingSets");
const lanyardsWithIDCards = require("./products/office/lanyardsWithIDCards");
const notebooksAndDiaries = require("./products/office/notebooksAndDiaries");
const promotionalClocks = require("./products/collection/promotionalClocks");
const promotionalBackpacks = require("./products/bags/promotionalBackpacks");
const foldableBags = require("./products/bags/foldableBags");
const duffleBags = require("./products/bags/duffleBags");
const toteBags = require("./products/bags/toteBags");
const sipperBottles = require("./products/drinkware/sipperBottles");
const bambooBottles = require("./products/drinkware/bambooBottles");
const ceramicMugs = require("./products/drinkware/ceramicMugs");
const trophies = require("./products/trophiesMomento/trophies");
const coffeeMugs = require("./products/drinkware/coffeeMugs");
const welcomeKits = require("./products/collection/welcomeKits");
const keychains = require("./products/collection/keychains");
const wirelessChargers = require("./products/technology/wirelessChargers");
const computerAccessories = require("./products/technology/computerAccessories");
const powerBanks = require("./products/technology/powerBanks");
const mousePads = require("./products/technology/mousePads");

const categoryData = [
  {
    name: "Apparel and Accessories",
    slug: "apparel-and-accessories",
    image: "/assets/categories/apparel.webp",
    hoverImage: "",
    tag: "Discover our range of apparel and accessories.\nPerfect for branding and gifting.\nTrendy, comfortable, and customizable.\nIdeal for all occasions.",
    subcategories: [
      {
        name: "Promotional T-Shirt Manufacturers in Delhi",
        slug: "polo-t-shirts",
        image: "/assets/subcategories/polotshirt.webp",
        hoverImage: "",
        tag: "Premium custom polo and corporate t-shirts tailored for businesses, coaching institutes, and schools in Noida, Gurgaon,okhla and Delhi NCR.\nHigh-quality fabrics for comfort and durability.\nPerfect for branding, events, and team uniforms.",
        products: poloTshirts,
        metaTitle: "Custom Polo T-Shirts for Corporate Branding & Promotions",
        metaDescription:
          "custom polo t-shirts with logo printing for corporate uniforms, events, promotions and gifting. Bulk order support, quality fabric and fast delivery across India.",
      },
      {
        name: "Promotional Round Neck T-Shirts ",
        slug: "round-neck-t-shirts",
        image: "/assets/subcategories/round.webp",
        hoverImage: "",
        tag: "High-quality custom round neck t-shirts designed for businesses, coaching institutes, and schools in Noida, Gurgaon, Okhla, and Delhi NCR.\nComfortable fabrics ideal for everyday wear.\nPerfect for branding, events, and team uniforms.",
        products: roundneckTshirts,
        metaTitle: "Custom Round Neck T-Shirts for Corporate Branding & Events",
        metaDescription:
          "Premium round neck t-shirts with custom logo printing for corporate branding, events and staff uniforms. Best bulk prices, top quality and fast India-wide delivery."
      },
      {
        name: "Custom Cap Manufacturer in Delhi NCR",
        slug: "caps",
        image: "/assets/subcategories/cap.webp",
        hoverImage: "",
        tag: "High-quality custom caps designed for businesses, coaching institutes, schools, and corporate events in Noida, Gurgaon, Okhla, and Delhi NCR.\nDurable materials ideal for outdoor use and promotions.\nPerfect for branding, giveaways, and team uniforms.",
        products: caps,
        metaTitle: "Custom Caps for Brand Promotion, Events & Corporate Use",
        metaDescription:
          "Premium custom caps with logo embroidery and printing for events, marketing, corporate gifting and outdoor branding. Fast delivery and affordable bulk order pricing."
      },
      {
        name: "Promotional Hat in Delhi",
        slug: "hats",
        image: "/assets/subcategories/hats.webp",
        hoverImage: "",
        tag: "Premium-quality custom hats designed for businesses, coaching institutes, schools, and corporate events in Noida, Gurgaon, Okhla, and Delhi NCR.\nDurable and stylish materials ideal for outdoor use and promotions.\nPerfect for branding, giveaways, and team uniforms.",
        products: hats,
        metaTitle: "Promotional Hats with Custom Logo for Events & Branding",
        metaDescription:
          "Premium promotional hats with custom logo printing for corporate branding, outdoor events and marketing campaigns. Bulk order support with fast delivery across India."
      },
      {
        name: "Customized Formal Shirt in Delhi",
        slug: "corporate-shirts",
        image: "/assets/subcategories/corporateshirt.webp",
        hoverImage: "",
        tag: "High-quality Custom formal shirt and corporate shirts designed for businesses, coaching institutes, schools, and corporate events in Noida, Gurgaon, Okhla, and Delhi NCR.\nComfortable and durable fabrics ideal for professional settings.\nPerfect for branding, uniforms, and corporate gifting.",
        products: corporateShirts,
        metaTitle: "Corporate Shirts with Custom Logo for Office Uniforms",
        metaDescription:
          "Premium corporate shirts for office uniforms with custom logo printing and embroidery. Ideal for branding and promotions, with bulk order support and fast delivery"
      },
      {
        name: "Promotional Tie in Delhi",
        slug: "ties",
        image: "/assets/subcategories/tie.webp",
        hoverImage: "",
        tag: "High-quality custom ties and corporate ties designed for businesses, coaching institutes, schools, and corporate events in Noida, Gurgaon, Okhla, and Delhi NCR.\nElegant materials ideal for professional settings and branding.\nPerfect for uniforms, corporate gifting, and special occasions.",
        products: ties,
        metaTitle: "Custom Corporate Ties for Office Uniforms & Brand Identity",
        metaDescription:
          "Premium corporate ties with custom branding for office uniforms, events and corporate gifting. Bulk order support with reliable delivery across India for all branding needs."
      },
      {
        name: "Promotional Apron in Delhi",
        slug: "aprons",
        image: "/assets/subcategories/apron.webp",
        hoverImage: "",
        tag: "High-quality custom aprons and corporate aprons designed for restaurants, cafes, catering services, schools, coaching institutes, and corporate events in Noida, Gurgaon, Okhla, and Delhi NCR.\nDurable and comfortable materials ideal for daily use and branding.\nPerfect for uniforms, promotional events, and corporate gifting.",
        products: aprons,
        metaTitle: "Custom Printed Aprons for Events, Kitchens & Branding",
        metaDescription:
          "Premium round neck t-shirts with custom logo printing for corporate branding, events and staff uniforms. Best bulk prices, reliable quality and hassle-free pan India supply."
      },
      {
        name: "Promotional Winter Wear in Delhi",
        slug: "winter-wear",
        image: "/assets/subcategories/winterwear.webp",
        hoverImage: "",
        tag: "High-quality custom winter jackets, sweaters, and corporate winter wear designed for offices, schools, coaching institutes, and corporate events in Noida, Gurgaon, Okhla, and Delhi NCR.\nWarm and comfortable fabrics ideal for cold weather and branding.\nPerfect for uniforms, promotional events, and corporate gifting.",
        products: winterWear,
        metaTitle: "Branded Winter Wear for Employees & Promotional Gifting",
        metaDescription:
          "Premium winter wear with custom logo printing for employees, gifting and outdoor events. Soft fabric, bulk order support and fast delivery across India."
      }
    ]
  },
  {
    name: "Office and Writing",
    slug: "office-and-writing",
    image: "/assets/categories/officewriting.webp",
    hoverImage: "/assets/categories/office.webp",
    tag: "Essential office and writing tools. Perfect for daily use and gifting. Custom branding options. Boost productivity and style.",
    subcategories: [
      {
        name: "Custom Files & Folder for Office",
        slug: "file-and-folder",
        image: "/assets/products/filesfolder/4.webp",
        hoverImage: "",
        tag: "High-quality Promotional files and folders designed for offices, schools, corporate gifting, events, and promotional purposes in Noida, Gurgaon, Okhla, and Delhi NCR.\nDurable materials with customizable covers ideal for branding and daily use.\nPerfect for organizing documents, presentations, and employee kits.",
        products: filesAndFolders,
        metaTitle: "Custom Files & Folders for Office Branding and Gifting",
        metaDescription:
          "Branded office files and folders for employee kits and promotional gifting. High-quality material, custom printing and bulk supply for corporates across India."
      },
      {
        name: "Custom Pen & Writing Set in Delhi NCR",
        slug: "pen-and-writing-set",
        image: "/assets/products/pens/1.webp",
        hoverImage: "",
        tag: "Premium Promotional pens and writing sets perfect for corporate gifting, employee kits, events, and branding. Smooth writing experience with custom engraving options.",
        products: pensAndWritingSets,
        metaTitle: "customized Pen & Writing Sets for Corporate Gifts",
        metaDescription:
          "Elegant writing sets for premium corporate gifting, events, and branding. Custom logo printing, bulk pricing, and fast delivery across India."
      },
      {
        name: "Custom Lanyard & ID Card in Delhi NCR",
        slug: "lanyard-and-id-card",
        image: "/assets/products/lanyards/1.webp",
        hoverImage: "",
        tag: "High-quality Promotional lanyards, ID card holders, designed for corporate gifting, employee identification, offices, and promotional events in Noida, Gurgaon, Okhla, and Delhi NCR.\nDurable materials ideal for daily use and branding.\nPerfect for enhancing professional appearance and brand visibility.",
        products: lanyardsWithIDCards,
        metaTitle: "Custom Printed Lanyards & ID Cards for Offices & Events",
        metaDescription:
          "High-quality lanyards and ID cards for offices, events and branding. Logo printing available with bulk orders and fast delivery across India."
      },
      {
        name: "Customized Notebooks & Diaries in Delhi ",
        slug: "notebooks-and-diary-sets",
        image: "/assets/products/notebooks/16.webp",
        hoverImage: "",
        tag: "High-quality Custom notebooks and diaries designed for offices, schools, corporate gifting, events, and promotional purposes in Noida, Gurgaon, Okhla, and Delhi NCR.\nDurable materials with customizable covers ideal for branding and daily use.\nPerfect for meetings, note-taking, and employee kits.",
        products: notebooksAndDiaries,
        metaTitle: "Custom Notebooks & Diary Sets for Corporate Gifting",
        metaDescription:
          "Premium notebooks and diaries with logo printing for office, clients and events. Perfect for corporate gifting with bulk order support and fast delivery across India."
      }
    ],
  },
  {
    name: "Collection",
    slug: "collection",
    image: "/assets/categories/collections.webp",
    hoverImage: "/assets/categories/apparel.webp",
    tag: "Exclusive gift collections. Perfect for special occasions. Curated for every need. Customizable options available.",
    subcategories: [
      {
        name: "Customized Welcome Kit in Delhi",
        slug: "welcome-kits",
        image: "/assets/products/welcomekits/13.webp",
        hoverImage: "",
        tag: "High-quality Promotional welcome kits designed for corporate gifts, events, hotels, onboarding programs, and promotional campaigns in Noida, Gurgaon, Okhla, and Delhi NCR.\nThoughtfully curated items ideal for new employees and clients.\nPerfect for making a lasting first impression.",
        products: welcomeKits,
        metaTitle: "Custom Welcome Kits for Corporate Onboarding & Events",
        metaDescription:
          "Personalized welcome kits with branded products for new employees, events and promotional gifting. Bulk pricing and India-wide fast delivery available."
      },
      {
        name: "Promotional Clock in Delhi",
        slug: "promotional-clocks",
        image: "/assets/products/clocks/1.webp",
        hoverImage: "",
        tag: "Durable and stylish customized clocks designed for corporate gifts, events, giveaways, and branding campaigns in Delhi, Noida, Gurgaon, Okhla, and NCR.\nHigh-quality materials ideal for office and home use.\nPerfect for enhancing brand visibility with custom logo printing.",
        products: promotionalClocks,
        metaTitle: "Custom Logo Promotional Clocks for Office & Brand Gifting",
        metaDescription:
          "Elegant promotional clocks with custom logo printing for offices, events, and brand gifting. Bulk orders and fast delivery across India."
      },
      {
        name: "Custom Keychain in Delhi",
        slug: "keychains",
        image: "/assets/products/keychains/9.webp",
        hoverImage: "",
        tag: "High-quality, Promotional  keychains designed to enhance brand visibility and make perfect corporate gifts across Delhi, Noida, Gurgaon, Okhla, and NCR.\nDurable materials with unique designs ideal for daily use and promotions.\nPerfect for branding, giveaways, and employee gifts.",
        products: keychains,
        metaTitle: "Custom Keychains for Corporate Branding & Promotional Gifts",
        metaDescription:
          "Branded keychains for events, advertising and gifting. Durable quality, multiple designs and logo customization available. Bulk order pricing and fast India-wide delivery for corporates."
      }
    ]
  },
  {
    name: "Bags and Travel",
    slug: "bags-and-travel",
    image: "/assets/categories/bags.webp",
    hoverImage: "/assets/categories/bags-for-change.webp",
    tag: "Travel in style with our bags. Backpacks, totes, and more. Durable and functional designs. Custom branding available.",
    subcategories: [
      {
        name: "Backpacks Manufacturers in Delhi NCR",
        slug: "backpacks",
        image: "/assets/products/backpacks/1.webp",
        hoverImage: "",
        tag: "High-quality custom backpacks designed for corporates, schools, coaching institutes, colleges, and events in Noida, Gurgaon, Okhla, and Delhi NCR.\nDurable materials ideal for daily use and travel.\nPerfect for branding, giveaways, and team use.",
        products: promotionalBackpacks,
        metaTitle: "Custom Backpacks for Corporate Gifting, Travel & Promotions",
        metaDescription:
          "Durable custom backpacks for employees, events and corporate gifting. Premium printing, bulk order support and fast delivery across India to boost brand visibility."
      },
      {
        name: "Foldable Bag Manufacturers in Delhi",
        slug: "foldable-bags",
        image: "/assets/products/foldablebags/1.webp",
        hoverImage: "",
        tag: "High-quality custom foldable bags designed for corporates, schools, coaching institutes, colleges, events, and marketing campaigns in Noida, Gurgaon, Okhla, and Delhi NCR.\nLightweight and durable materials ideal for shopping and travel.\nPerfect for branding, giveaways, and eco-friendly promotions.",
        products: foldableBags,
        metaTitle: "Branded Foldable Bags for Corporate Gifting & Promotions",
        metaDescription:
          "Easy-to-carry foldable bags with custom logo printing for events, giveaways and eco-friendly branding. Best quality for bulk orders with fast delivery across India."
      },
      {
        name: " Custom Duffle Bag Manufacturers in Delhi ",
        slug: "duffle-bags",
        image: "/assets/products/dufflebags/1.webp",
        hoverImage: "",
        tag: "High-quality duffle bags customized for corporates, schools, coaching institutes, colleges, gyms, events, and marketing campaigns in Delhi, Noida, Gurgaon, and Okhla.\nSpacious and durable materials ideal for travel and sports.\nPerfect for branding, giveaways, and promotional use.",
        products: duffleBags,
        metaTitle: "Custom Duffle Bags for Corporate Travel & Brand Promotions",
        metaDescription:
          "Premium duffle bags with custom branding for corporate teams, travel gifting and event promotions. Bulk order pricing with reliable delivery all over India."
      },
      {
        name: "Tote Bags Manufacturers in Delhi",
        slug: "tote-bags",
        image: "/assets/products/totebags/1.webp",
        hoverImage: "",
        tag: "High-quality custom tote bags designed for corporates, retail stores, events, and marketing campaigns in Noida, Gurgaon, Okhla, and Delhi NCR.\nEco-friendly and durable materials ideal for shopping and daily use.\nPerfect for branding, giveaways, and sustainable promotions.",
        products: toteBags,
        metaTitle: "Custom Logo Tote Bags for Branding & Eco-Friendly Gifting",
        metaDescription:
          "tote bags with custom logo printing for events, trade shows and corporate gifting. Eco-friendly materials, bulk order pricing and fast delivery across India."
      }
    ]
  },
  {
    name: "Technology Accessories",
    slug: "technology-accessories",
    image: "/assets/categories/technology.webp",
    hoverImage: "/assets/categories/technical.webp",
    tag: "Latest tech accessories. Wireless, portable, and smart. Perfect for gifting and use. Custom branding available.",
    subcategories: [
      {
        name: "Custom Wireless Charger ",
        slug: "wireless-charging",
        image: "/assets/products/wirelesschargers/17.webp",
        hoverImage: "",
        tag: "High-quality, Promotional wireless chargers designed for client gifts, employee rewards, and brand promotion across Delhi, Noida, Gurgaon, Okhla, and NCR.\nCompact and portable designs ideal for on-the-go charging.\nPerfect for enhancing brand visibility with custom logo printing.",
        products: wirelessChargers,
        metaTitle: "Wireless Charging Accessories with Custom Branding",
        metaDescription:
          "Modern wireless chargers for promotional gifting and office accessories. Custom branding, premium build quality and bulk delivery options across India."
      },
      {
        name: "Custom Computer Accessories in Delhi NCR",
        slug: "computer-accessories",
        image: "/assets/products/computeraccessories/1.webp",
        hoverImage: "",
        tag: "High-quality Promotional computer accessories designed for offices, employees, clients, and promotional campaigns across Delhi, Noida, Gurgaon, Okhla, and NCR.\nDurable and practical items ideal for daily use and branding.\nPerfect for enhancing workspaces and corporate gifting.",
        products: computerAccessories,
        metaTitle: "Custom Computer Accessories for Office Branding",
        metaDescription:
          "Custom computer accessories for corporate gifting and office branding. Bulk orders, logo printing and fast delivery across India for employee welcome kits."
      },
      {
        name: "Custom Power Bank in Delhi NCR",
        slug: "power-banks",
        image: "/assets/products/powerbanks/13.webp",
        hoverImage: "",
        tag: "Promotional High-quality, branded power banks designed for corporate gifting, client appreciation, employee rewards, and promotional campaigns across Delhi, Noida, Gurgaon, Okhla, and NCR.\nCompact and portable designs ideal for on-the-go charging.\nPerfect for enhancing brand visibility with custom logo printing.",
        products: powerBanks,
        metaTitle: "Branded Power Banks for Corporate & Promotional Gifts",
        metaDescription:
          "Premium power banks with custom logo printing. Perfect for corporate gifting, events and branding. Bulk pricing and fast nationwide delivery."
      },
      {
        name: "Custom Desktop & Mousepad ",
        slug: "desktop-and-mousepad",
        image: "/assets/products/mousepads/10.webp",
        hoverImage: "",
        tag: "High-quality Promotional branded desktops and mousepads designed for offices, client gifts, employee rewards, and promotional campaigns across Delhi, Noida, Gurgaon, Okhla, and NCR.\nDurable materials with smooth surfaces ideal for daily use and branding.\nPerfect for enhancing workspaces and corporate gifting.",
        products: mousePads,
        metaTitle: "Custom Mousepads & Desktop Accessories for Branding",
        metaDescription:
          "High-quality mousepads and desktop accessories for promotional gifting and office branding. Custom printing with bulk order support and fast India delivery."
      }
    ]
  },
  {
    name: "Eco Products",
    slug: "eco-products",
    image: "/assets/categories/ecoproducts.webp",
    hoverImage: "/assets/categories/ecoproducts-hover.webp",
    tag: "Eco-friendly product range. Sustainable and reusable. Perfect for green gifting. Custom branding available.",
    subcategories: [
      {
        name: "Custom Cork Sheet ",
        slug: "cork-sheet",
        image: "/assets/subcategories/sheet.webp",
        hoverImage: "",
        tag: "High-quality Promotional cork sheets designed for industrial use, flooring, insulation, notice boards, packaging, and creative projects in Noida, Gurgaon, Okhla, and Delhi NCR.\nDurable and eco-friendly materials ideal for various applications.\nPerfect for promoting sustainability and green building practices.",
        products: corkSheetProducts,
        metaTitle: "Cork Sheets for Eco-Friendly Corporate Branding Solutions",
        metaDescription:
          "Premium cork sheets for sustainable innovation, office décor & product designing. Eco-friendly material available with competitive bulk pricing and fast delivery across India."
      },
      {
        name: "Custom Cork Corporate Gifting Combos ",
        slug: "cork-corporate-gifting-combo",
        image: "/assets/subcategories/combo.webp",
        hoverImage: "",
        tag: "High-quality Promotional cork gifting combos designed for corporate gifting, client appreciation, employee rewards, trade shows, and promotional events in Noida, Gurgaon, Okhla, and Delhi NCR.\nElegant and durable materials ideal for showcasing gifts and enhancing brand image.\nPerfect for promoting sustainability and eco-friendly gifting practices.",
        products: corkCorporateGiftingComboProducts,
        metaTitle: "Cork Corporate Gift Combos for Sustainable Brand Promotion",
        metaDescription:
          "Eco-friendly cork gifting combos with custom branding, ideal for corporate events and employee welcome kits. Bulk order pricing with fast delivery"
      },
      {
        name: "Promotional Cork Coaster in Delhi NCR",
        slug: "cork-coaster",
        image: "/assets/subcategories/coaster.webp",
        hoverImage: "",
        tag: "High-quality Promotional cork coasters in Delhi NCR, designed for offices, restaurants, cafes, corporate gifting, promotional events, and everyday use in Noida, Gurgaon, Okhla, and surrounding NCR regions.\nDurable and eco-friendly materials ideal for protecting surfaces from drink stains and enhancing table aesthetics.\nPerfect for promoting sustainability and brand visibility with custom logo printing.",
        products: corkCoasterProducts,
        metaTitle: "Custom Cork Coasters for Branding & Promotional Gifting",
        metaDescription:
          "Stylish cork coasters with custom logo printing for offices, cafés & events. Eco-friendly promotional product with reliable bulk supply and timely delivery."
      },
      {
        name: "Custom Cork Plant Decorate in Delhi NCR",
        slug: "cork-plant-decorate",
        image: "/assets/subcategories/plant.webp",
        hoverImage: "",
        tag: "High-quality Promotional cork plant décor designed for homes, offices, restaurants, corporate gifting, and creative spaces in Noida, Gurgaon, Okhla, and Delhi NCR.\nDurable and eco-friendly materials ideal for plant presentation and decoration.\nPerfect for promoting sustainability and enhancing green environments.",
        products: corkPlantDecorateProducts,
        metaTitle: "Cork Plant Decor Items with Custom Branding for Offices",
        metaDescription:
          "Eco-friendly cork plant décor for office spaces, events and gifting. Unique design with custom branding and premium quality available for reliable bulk delivery."
      },
      {
        name: "Custom Cork Serving Decoratives ",
        slug: "cork-serving-decorate",
        image: "/assets/subcategories/serving.webp",
        hoverImage: "",
        tag: "High-quality Promotional cork serving décor designed for homes, restaurants, cafes, corporate gifting, and creative dining spaces in Noida, Gurgaon, Okhla, and Delhi NCR.\nDurable and eco-friendly materials ideal for food presentation and service.\nPerfect for promoting sustainability and enhancing dining experiences.",
        products: corkServingDecorateProducts,
        metaTitle: "Custom Cork Products for Hotels & Restaurants",
        metaDescription:
          "Custom-branded cork serving décor for restaurants, events and premium corporate gifting. Eco-friendly, stylish and available with reliable bulk customization options."
      },
      {
        name: "Custom Cork Horeca Range in Delhi NCR",
        slug: "cork-horeca-range",
        image: "/assets/subcategories/horeca.webp",
        hoverImage: "",
        tag: "High-quality Promotional cork products designed for the hospitality industry including hotels, restaurants, cafes, and catering services in Noida, Gurgaon, Okhla, and Delhi NCR.High-quality cork products designed for the hospitality industry including hotels, restaurants, cafes, and catering services in Noida, Gurgaon, Okhla, and Delhi NCR.\nDurable and eco-friendly materials ideal for food and beverage service.\nPerfect for promoting sustainability and enhancing customer experience.",
        products: corkHorecaProducts,
        metaTitle: "Premium Cork HoReCa Products for Hotels, Bars & Restaurants",
        metaDescription:
          "High-quality sustainable cork products for hotels, bars, and restaurants. Custom branding, durable finish, bulk supplies, and fast delivery across India."
      },
      {
        name: "Custom Cork Premium Lighting ",
        slug: "cork-premium-lighting",
        image: "/assets/subcategories/lighting.webp",
        hoverImage: "",
        tag: "High-quality Promotional cork lighting fixtures designed for interior décor, home lighting, office spaces, hotels, restaurants, and sustainable design projects in Noida, Gurgaon, Okhla, and Delhi NCR.\nEco-friendly and durable materials ideal for ambient and accent lighting.\nPerfect for promoting sustainability and unique lighting solutions.",
        products: corkLightingProducts,
        metaTitle: "Premium Cork Lighting for Eco-Friendly Office & Home",
        metaDescription:
          "Stylish premium cork lighting for office and home décor. Eco-friendly, modern design, custom branding, and bulk delivery"
      },
      {
        name: "Custom Cork Premium Gift Box ",
        slug: "cork-premium-gift-boxes",
        image: "/assets/subcategories/box.webp",
        hoverImage: "",
        tag: "High-quality Promotional cork gift boxes designed for corporate gifting, client appreciation, employee rewards, festive occasions, and premium promotional events in Noida, Gurgaon, Okhla, and Delhi NCR.\nElegant and durable materials ideal for showcasing gifts and enhancing brand image.\nPerfect for promoting sustainability and eco-friendly gifting practices.",
        products: corkGiftBoxProducts,
        metaTitle: "Cork Premium Gift Boxes for Sustainable Corporate Gifting",
        metaDescription:
          "Eco-friendly and durable cork gift boxes ideal for premium gifting and brand promotions. Custom logo available with bulk orders and quick India delivery."
      },
      {
        name: "Custom Cork Desk Top Accessories ",
        slug: "cork-desk-top-accessories",
        image: "/assets/subcategories/desk.webp",
        hoverImage: "",
        tag: "High-quality Promotional cork desk accessories designed for offices, workstations, home offices, corporate gifting, and creative workspaces in Noida, Gurgaon, Okhla, and Delhi NCR.\nDurable and eco-friendly materials ideal for organizing and enhancing workspaces.\nPerfect for promoting sustainability and stylish office setups.",
        products: corkDeskProducts,
        metaTitle: "Cork Desk Accessories for Offices & Sustainable Brand Gifting",
        metaDescription:
          "Stylish cork desktop accessories for employee kits, workstation décor and branding gifts. Eco-friendly, durable and available for bulk orders across India."
      },
      {
        name: "Custom Cork Laptop Bags & Wallets",
        slug: "cork-laptop-bag-and-wallet",
        image: "/assets/subcategories/bag.webp",
        hoverImage: "",
        tag: "High-quality Promotional cork laptop bags and wallets designed for professionals, corporates, students, and eco-conscious users in Noida, Gurgaon, Okhla, and Delhi NCR.\nDurable and stylish materials ideal for everyday use and travel.\nPerfect for promoting sustainability and eco-friendly living.",
        products: corkBagWalletProducts,
        metaTitle: "Cork Laptop Bags & Wallets for Premium Eco Corporate Gifts",
        metaDescription:
          "Trendy cork laptop bags and wallets with custom branding for corporate gifting. Strong build, eco-conscious design and bulk delivery anywhere in India."
      },
      {
        name: "Custom Cork Yoga Accessories ",
        slug: "cork-yoga-accessories",
        image: "/assets/subcategories/yoga.webp",
        hoverImage: "",
        tag: "High-quality Promotional cork yoga mats, blocks, straps, and accessories designed for home, studios, gyms, and corporate wellness programs in Noida, Gurgaon, Okhla, and Delhi NCR.\nEco-friendly and durable materials ideal for all levels of practice.\nPerfect for promoting wellness, mindfulness, and sustainable living.",
        products: corkYogaProducts,
        metaTitle: "Eco-Friendly Cork Yoga Accessories for Fitness Branding",
        metaDescription:
          "Anti-slip cork yoga accessories perfect for wellness branding, gyms and corporate gifting. Sustainable products with bulk order support and fast delivery."
      }
    ],

  },
  {
    name: "Drink Ware",
    slug: "drink-ware",
    image: "/assets/categories/drinkware.webp",
    hoverImage: "/assets/categories/drink.webp",
    tag: "Promotional drinkware collection. Sippers, mugs, bottles, and more. Perfect for daily use and gifting. Custom branding available.",
    subcategories: [
      {
        name: "Custom Sippers in Delhi",
        slug: "sipper",
        image: "/assets/products/sipperbottles/1.webp",
        hoverImage: "",
        tag: "High-quality Promotional sippers designed for corporates, retail stores, events, and marketing campaigns in Noida, Gurgaon, Okhla, and Delhi NCR.\nDurable and stylish materials ideal for daily hydration and promotions.\nPerfect for branding, giveaways, and sustainable gifting.",
        products: sipperBottles,
        metaTitle: "Custom Sipper Bottles for Branding & Promotional Gifting",
        metaDescription:
          "Premium sipper bottles with custom logo printing for branding, events & corporate gifting. Bulk orders with fast delivery across India."
      },
      {
        name: "Custom Bamboo Bottles  in Delhi",
        slug: "bamboo-bottle",
        image: "/assets/products/bamboobottles/1.webp",
        hoverImage: "",
        tag: "High-quality Promotional bamboo bottles designed for corporates, retail stores, events, and marketing campaigns in Noida, Gurgaon, Okhla, and Delhi NCR.\nEco-friendly and durable materials ideal for daily hydration and sustainable promotions.\nPerfect for branding, giveaways, and green gifting.",
        products: bambooBottles,
        metaTitle: "Customized Bamboo Bottles for Corporate Gifting",
        metaDescription:
          "Eco-friendly bamboo bottles with custom branding for corporate gifting, events & employee welcome kits. Bulk order pricing with fast delivery across India"
      },
      {
        name: "Custom Coffee Mugs in Delhi",
        slug: "coffee-mug",
        image: "/assets/products/coffeemugs/1.webp",
        hoverImage: "",
        tag: "High-quality Promotional coffee mugs designed for corporates, retail stores, events, and marketing campaigns in Noida, Gurgaon, Okhla, and Delhi NCR.",
        products: coffeeMugs,
        metaTitle: "Custom Coffee Mugs for Office Branding & Corporate Gifts",
        metaDescription:
          "Premium coffee mugs with custom logo printing for employee gifting, events & office branding. Bulk order pricing with fast delivery across India. Request a quote today!"
      },
      {
        name: "Custom Ceramic Mugs ",
        slug: "ceramic-mug",
        image: "/assets/products/ceramicmugs/1.webp",
        hoverImage: "",
        tag: "High-quality Promotional ceramic mugs designed for corporates, retail stores, events, and marketing campaigns in Noida, Gurgaon, Okhla, and Delhi NCR",
        products: ceramicMugs,
        metaTitle: "Custom Ceramic Mugs for Promotions & Corporate Branding",
        metaDescription:
          "Premium ceramic mugs with custom logo printing for corporate gifting, events & office branding. Bulk order pricing with fast and reliable delivery across India."
      }
    ]
  },
  {
    name: "Custom Trophies & Mementos",
    slug: "trophy-and-momento",
    image: "/assets/categories/trophy.webp",
    hoverImage: "/assets/categories/trophy1.webp",
    tag: "High-quality, Promotional trophies and mementos designed for corporate recognition, sports events, employee awards, and special occasions across Delhi, Noida, Gurgaon, Okhla, and NCR.\nPremium materials including glass, crystal, metal, wood, and acrylic.\nElegant designs with options for custom engraving and branding to celebrate achievements in style.",
    subcategories: [
      {
        name: "Custom Trophy and Momento",
        slug: "trophy-and-momento",
        image: "/assets/products/trophies/11.webp",
        hoverImage: "",
        tag: "Exclusive trophies and momentos. Crystal and wooden options. Ideal for awards and events. Custom branding available.",
        products: trophies,
        metaTitle: "Custom Trophies & Mementos for Awards and Corporate Events",
        metaDescription:
          "Premium trophies and mementos designed for recognition events and corporate awards. Logo engraving and customization available with fast delivery across India."
      }
    ]
  }
];

module.exports = categoryData;