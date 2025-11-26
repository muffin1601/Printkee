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
    image: "/assets/categories/apparel.jpg",
    hoverImage: "",
    tag: "Discover our range of apparel and accessories.\nPerfect for branding and gifting.\nTrendy, comfortable, and customizable.\nIdeal for all occasions.",
    subcategories: [
      {
        name: "Promotional  T-Shirt in Delhi",
        slug: "polo-t-shirts",
        image: "/assets/subcategories/polotshirt.webp",
        hoverImage: "",
        tag: "Premium custom polo and corporate t-shirts tailored for businesses, coaching institutes, and schools in Noida, Gurgaon,okhla and Delhi NCR.\nHigh-quality fabrics for comfort and durability.\nPerfect for branding, events, and team uniforms.",
        products: poloTshirts
      },
      {
        name: "Promotional Round Neck T-Shirts Manufacturers in Delhi",
        slug: "round-neck-t-shirts",
        image: "/assets/subcategories/round.webp",
        hoverImage: "",
        tag: "High-quality custom round neck t-shirts designed for businesses, coaching institutes, and schools in Noida, Gurgaon, Okhla, and Delhi NCR.\nComfortable fabrics ideal for everyday wear.\nPerfect for branding, events, and team uniforms.",
        products: roundneckTshirts
      },
      {
        name: "Promotional Caps & Custom Logo Caps Manufacturer in Delhi NCR",
        slug: "caps",
        image: "/assets/subcategories/cap.jpg",
        hoverImage: "",
        tag: "High-quality custom caps designed for businesses, coaching institutes, schools, and corporate events in Noida, Gurgaon, Okhla, and Delhi NCR.\nDurable materials ideal for outdoor use and promotions.\nPerfect for branding, giveaways, and team uniforms.",
        products: caps
      },
      {
        name: "Promotional Hats Manufacturers in Delhi",
        slug: "hats",
        image: "/assets/subcategories/hats.webp",
        hoverImage: "",
        tag: "Premium-quality custom hats designed for businesses, coaching institutes, schools, and corporate events in Noida, Gurgaon, Okhla, and Delhi NCR.\nDurable and stylish materials ideal for outdoor use and promotions.\nPerfect for branding, giveaways, and team uniforms.",
        products: hats
      },
      {
        name: "Promotional Formal Shirts Manufacturers in Delhi",
        slug: "corporate-shirts",
        image: "/assets/subcategories/corporateshirt.jpg",
        hoverImage: "",
        tag: "High-quality formal shirt and corporate shirts designed for businesses, coaching institutes, schools, and corporate events in Noida, Gurgaon, Okhla, and Delhi NCR.\nComfortable and durable fabrics ideal for professional settings.\nPerfect for branding, uniforms, and corporate gifting.",
        products: corporateShirts
      },
      {
        name: "Promotional Ties Manufacturers in Delhi",
        slug: "ties",
        image: "/assets/subcategories/tie.jpg",
        hoverImage: "",
        tag: "High-quality custom ties and corporate ties designed for businesses, coaching institutes, schools, and corporate events in Noida, Gurgaon, Okhla, and Delhi NCR.\nElegant materials ideal for professional settings and branding.\nPerfect for uniforms, corporate gifting, and special occasions.",
        products: ties
      },
      {
        name: "Promotional Aprons Manufacturers in Delhi",
        slug: "aprons",
        image: "/assets/subcategories/apron.jpg",
        hoverImage: "",
        tag: "High-quality custom aprons and corporate aprons designed for restaurants, cafes, catering services, schools, coaching institutes, and corporate events in Noida, Gurgaon, Okhla, and Delhi NCR.\nDurable and comfortable materials ideal for daily use and branding.\nPerfect for uniforms, promotional events, and corporate gifting.",
        products: aprons
      },
      {
        name: "Promotional Winter Wear Manufacturers in Delhi",
        slug: "winter-wear",
        image: "/assets/subcategories/winterwear.jpg",
        hoverImage: "",
        tag: "High-quality custom winter jackets, sweaters, and corporate winter wear designed for offices, schools, coaching institutes, and corporate events in Noida, Gurgaon, Okhla, and Delhi NCR.\nWarm and comfortable fabrics ideal for cold weather and branding.\nPerfect for uniforms, promotional events, and corporate gifting.",
        products: winterWear
      }
    ]
  },
  {
    name: "Office and Writing",
    slug: "office-and-writing",
    image: "/assets/categories/officewriting.jpg",
    hoverImage: "/assets/categories/office.jpg",
    tag: "Essential office and writing tools. Perfect for daily use and gifting. Custom branding options. Boost productivity and style.",
    subcategories: [
      {
        name: "Premium Quality Files & Folders for Office, Corporate & Personal Use in Delhi NCR",
        slug: "file-and-folder",
        image: "/assets/categories/filefolder.jpg",
        hoverImage: "",
        tag: "High-quality files and folders designed for offices, schools, corporate gifting, events, and promotional purposes in Noida, Gurgaon, Okhla, and Delhi NCR.\nDurable materials with customizable covers ideal for branding and daily use.\nPerfect for organizing documents, presentations, and employee kits.",
        products: filesAndFolders,
      },
      {
        name: "Pen & Writing Sets in Delhi NCR",
        slug: "pen-and-writing-set",
        image: "/assets/categories/penwriting.jpg",
        hoverImage: "",
        tag: "Premium pens and writing sets perfect for corporate gifting, employee kits, events, and branding. Smooth writing experience with custom engraving options.",
        products: pensAndWritingSets,
      },
      {
        name: "Lanyard & ID Card in Delhi NCR",
        slug: "lanyard-and-id-card",
        image: "/assets/categories/lanyardid.jpg",
        hoverImage: "",
        tag: "High-quality lanyards, ID card holders, designed for corporate gifting, employee identification, offices, and promotional events in Noida, Gurgaon, Okhla, and Delhi NCR.\nDurable materials ideal for daily use and branding.\nPerfect for enhancing professional appearance and brand visibility.",
        products: lanyardsWithIDCards,
      },
      {
        name: "Notebooks & Diaries in Delhi NCR",
        slug: "notebooks-and-diary-sets",
        image: "/assets/categories/notebooks.jpg",
        hoverImage: "",
        tag: "High-quality notebooks and diaries designed for offices, schools, corporate gifting, events, and promotional purposes in Noida, Gurgaon, Okhla, and Delhi NCR.\nDurable materials with customizable covers ideal for branding and daily use.\nPerfect for meetings, note-taking, and employee kits.",
        products: notebooksAndDiaries,
      }
    ],
  },
  {
    name: "Collection",
    slug: "collection",
    image: "/assets/categories/collection.jpg",
    hoverImage: "/assets/categories/apparel.jpg",
    tag: "Exclusive gift collections. Perfect for special occasions. Curated for every need. Customizable options available.",
    subcategories: [
      {
        name: "Welcome Kits Manufacturers in Delhi",
        slug: "welcome-kits",
        image: "/assets/categories/welcomekits.jpg",
        hoverImage: "",
        tag: "High-quality welcome kits designed for corporate gifts, events, hotels, onboarding programs, and promotional campaigns in Noida, Gurgaon, Okhla, and Delhi NCR.\nThoughtfully curated items ideal for new employees and clients.\nPerfect for making a lasting first impression.",
        products: welcomeKits,
      },
      {
        name: "Promotional Clocks Manufacturers in Delhi",
        slug: "promotional-clocks",
        image: "/assets/categories/promotionalclock.jpg",
        hoverImage: "",
        tag: "Durable and stylish promotional clocks designed for corporate gifts, events, giveaways, and branding campaigns in Delhi, Noida, Gurgaon, Okhla, and NCR.\nHigh-quality materials ideal for office and home use.\nPerfect for enhancing brand visibility with custom logo printing.",
        products: promotionalClocks,
      },
      {
        name: "Custom Keychains Manufacturers in Delhi NCR",
        slug: "keychains",
        image: "/assets/categories/keychains.jpg",
        hoverImage: "",
        tag: "High-quality, customizable keychains designed to enhance brand visibility and make perfect corporate gifts across Delhi, Noida, Gurgaon, Okhla, and NCR.\nDurable materials with unique designs ideal for daily use and promotions.\nPerfect for branding, giveaways, and employee gifts.",
        products: keychains,
      }
    ]
  },
  {
    name: "Bags and Travel",
    slug: "bags-and-travel",
    image: "/assets/categories/bags.jpg",
    hoverImage: "/assets/categories/bags-for-change.jpg",
    tag: "Travel in style with our bags. Backpacks, totes, and more. Durable and functional designs. Custom branding available.",
    subcategories: [
      {
        name: "Backpacks Manufacturers in Delhi NCR",
        slug: "backpacks",
        image: "/assets/categories/backpack.jpg",
        hoverImage: "",
        tag: "High-quality custom backpacks designed for corporates, schools, coaching institutes, colleges, and events in Noida, Gurgaon, Okhla, and Delhi NCR.\nDurable materials ideal for daily use and travel.\nPerfect for branding, giveaways, and team use.",
        products: promotionalBackpacks,
      },
      {
        name: "Foldable Bag Manufacturers in Delhi",
        slug: "foldable-bags",
        image: "/assets/categories/foldablebag.jpg",
        hoverImage: "",
        tag: "High-quality custom foldable bags designed for corporates, schools, coaching institutes, colleges, events, and marketing campaigns in Noida, Gurgaon, Okhla, and Delhi NCR.\nLightweight and durable materials ideal for shopping and travel.\nPerfect for branding, giveaways, and eco-friendly promotions.",
        products: foldableBags,
      },
      {
        name: "Custom Duffle Bag Manufacturer in Delhi NCR – Logo Printed & Promotional Duffle Bags",
        slug: "duffle-bags",
        image: "/assets/categories/dufflebag.jpg",
        hoverImage: "",
        tag: "High-quality duffle bags customized for corporates, schools, coaching institutes, colleges, gyms, events, and marketing campaigns in Delhi, Noida, Gurgaon, and Okhla.\nSpacious and durable materials ideal for travel and sports.\nPerfect for branding, giveaways, and promotional use.",
        products: duffleBags,
      },
      {
        name: "Tote Bags Manufacturers in Delhi",
        slug: "tote-bags",
        image: "/assets/categories/totebag.jpg",
        hoverImage: "",
        tag: "High-quality custom tote bags designed for corporates, retail stores, events, and marketing campaigns in Noida, Gurgaon, Okhla, and Delhi NCR.\nEco-friendly and durable materials ideal for shopping and daily use.\nPerfect for branding, giveaways, and sustainable promotions.",
        products: toteBags,
      }
    ]
  },
  {
    name: "Technology Accessories",
    slug: "technology-accessories",
    image: "/assets/categories/technology.jpg",
    hoverImage: "/assets/categories/technical.jpg",
    tag: "Latest tech accessories. Wireless, portable, and smart. Perfect for gifting and use. Custom branding available.",
    subcategories: [
      {
        name: "Wireless Charging Products Manufacturers in Delhi NCR",
        slug: "wireless-charging",
        image: "/assets/categories/wirelesscharging.jpg",
        hoverImage: "",
        tag: "High-quality, customizable wireless chargers designed for client gifts, employee rewards, and brand promotion across Delhi, Noida, Gurgaon, Okhla, and NCR.\nCompact and portable designs ideal for on-the-go charging.\nPerfect for enhancing brand visibility with custom logo printing.",
        products: wirelessChargers,
      },
      {
        name: "Computer Accessories Manufacturers in Delhi NCR",
        slug: "computer-accessories",
        image: "/assets/categories/computeraccess.jpg",
        hoverImage: "",
        tag: "High-quality, customizable computer accessories designed for offices, employees, clients, and promotional campaigns across Delhi, Noida, Gurgaon, Okhla, and NCR.\nDurable and practical items ideal for daily use and branding.\nPerfect for enhancing workspaces and corporate gifting.",
        products: computerAccessories,
      },
      {
        name: "Power Bank Manufacturers in Delhi NCR",
        slug: "power-banks",
        image: "/assets/categories/powerbank.jpg",
        hoverImage: "",
        tag: "High-quality, branded power banks designed for corporate gifting, client appreciation, employee rewards, and promotional campaigns across Delhi, Noida, Gurgaon, Okhla, and NCR.\nCompact and portable designs ideal for on-the-go charging.\nPerfect for enhancing brand visibility with custom logo printing.",
        products: powerBanks
      },
      {
        name: "Custom Desktop & Mousepad Manufacturers in Delhi NCR",
        slug: "desktop-and-mousepad",
        image: "/assets/categories/mousepad.jpg",
        hoverImage: "",
        tag: "High-quality, branded desktops and mousepads designed for offices, client gifts, employee rewards, and promotional campaigns across Delhi, Noida, Gurgaon, Okhla, and NCR.\nDurable materials with smooth surfaces ideal for daily use and branding.\nPerfect for enhancing workspaces and corporate gifting.",
        products: mousePads
      }
    ]
  },
  {
    name: "Eco Products",
    slug: "eco-products",
    image: "/assets/categories/ecoproducts.jpg",
    hoverImage: "/assets/categories/ecoproducts-hover.jpg",
    tag: "Eco-friendly product range. Sustainable and reusable. Perfect for green gifting. Custom branding available.",
    subcategories: [
      {
        name: "Cork Sheet Manufacturers in Delhi",
        slug: "cork-sheet",
        image: "/assets/subcategories/sheet.webp",
        hoverImage: "",
        tag: "High-quality cork sheets designed for industrial use, flooring, insulation, notice boards, packaging, and creative projects in Noida, Gurgaon, Okhla, and Delhi NCR.\nDurable and eco-friendly materials ideal for various applications.\nPerfect for promoting sustainability and green building practices.",
        products: corkSheetProducts
      },
      {
        name: "Cork Corporate Gifting Combos in Delhi",
        slug: "cork-corporate-gifting-combo",
        image: "/assets/subcategories/combo.webp",
        hoverImage: "",
        tag: "High-quality cork gifting combos designed for corporate gifting, client appreciation, employee rewards, trade shows, and promotional events in Noida, Gurgaon, Okhla, and Delhi NCR.\nElegant and durable materials ideal for showcasing gifts and enhancing brand image.\nPerfect for promoting sustainability and eco-friendly gifting practices.",
        products: corkCorporateGiftingComboProducts
      },
      {
        name: "Promotional Cork Coasters in Delhi NCR",
        slug: "cork-coaster",
        image: "/assets/subcategories/coaster.webp",
        hoverImage: "",
        tag: "High-quality cork coasters in Delhi NCR, designed for offices, restaurants, cafes, corporate gifting, promotional events, and everyday use in Noida, Gurgaon, Okhla, and surrounding NCR regions.\nDurable and eco-friendly materials ideal for protecting surfaces from drink stains and enhancing table aesthetics.\nPerfect for promoting sustainability and brand visibility with custom logo printing.",
        products: corkCoasterProducts
      },
      {
        name: "Cork Plant Decorate in Delhi NCR",
        slug: "cork-plant-decorate",
        image: "/assets/subcategories/plant.webp",
        hoverImage: "",
        tag: "High-quality cork plant décor designed for homes, offices, restaurants, corporate gifting, and creative spaces in Noida, Gurgaon, Okhla, and Delhi NCR.\nDurable and eco-friendly materials ideal for plant presentation and decoration.\nPerfect for promoting sustainability and enhancing green environments.",
        products: corkPlantDecorateProducts
      },
      {
        name: "Cork Serving Decoratives in Delhi NCR",
        slug: "cork-serving-decorate",
        image: "/assets/subcategories/serving.webp",
        hoverImage: "",
        tag: "High-quality cork serving décor designed for homes, restaurants, cafes, corporate gifting, and creative dining spaces in Noida, Gurgaon, Okhla, and Delhi NCR.\nDurable and eco-friendly materials ideal for food presentation and service.\nPerfect for promoting sustainability and enhancing dining experiences.",
        products: corkServingDecorateProducts
      },
      {
        name: "Cork Horeca Range in Delhi NCR",
        slug: "cork-horeca-range",
        image: "/assets/subcategories/horeca.webp",
        hoverImage: "",
        tag: "High-quality cork products designed for the hospitality industry including hotels, restaurants, cafes, and catering services in Noida, Gurgaon, Okhla, and Delhi NCR.High-quality cork products designed for the hospitality industry including hotels, restaurants, cafes, and catering services in Noida, Gurgaon, Okhla, and Delhi NCR.\nDurable and eco-friendly materials ideal for food and beverage service.\nPerfect for promoting sustainability and enhancing customer experience.",
        products: corkHorecaProducts
      },
      {
        name: "Cork Premium Lighting in Delhi NCR",
        slug: "cork-premium-lighting",
        image: "/assets/subcategories/lighting.webp",
        hoverImage: "",
        tag: "High-quality cork lighting fixtures designed for interior décor, home lighting, office spaces, hotels, restaurants, and sustainable design projects in Noida, Gurgaon, Okhla, and Delhi NCR.\nEco-friendly and durable materials ideal for ambient and accent lighting.\nPerfect for promoting sustainability and unique lighting solutions.",
        products: corkLightingProducts
      },
      {
        name: "Cork Premium Gift Boxes in Delhi NCR",
        slug: "cork-premium-gift-boxes",
        image: "/assets/subcategories/box.webp",
        hoverImage: "",
        tag: "High-quality cork gift boxes designed for corporate gifting, client appreciation, employee rewards, festive occasions, and premium promotional events in Noida, Gurgaon, Okhla, and Delhi NCR.\nElegant and durable materials ideal for showcasing gifts and enhancing brand image.\nPerfect for promoting sustainability and eco-friendly gifting practices.",
        products: corkGiftBoxProducts
      },
      {
        name: "Cork Desk Top Accessories in Delhi NCR",
        slug: "cork-desk-top-accessories",
        image: "/assets/subcategories/desk.webp",
        hoverImage: "",
        tag: "High-quality cork desk accessories designed for offices, workstations, home offices, corporate gifting, and creative workspaces in Noida, Gurgaon, Okhla, and Delhi NCR.\nDurable and eco-friendly materials ideal for organizing and enhancing workspaces.\nPerfect for promoting sustainability and stylish office setups.",
        products: corkDeskProducts
      },
      {
        name: "Cork Laptop Bags & Wallets in Delhi NCR",
        slug: "cork-laptop-bag-and-wallet",
        image: "/assets/subcategories/bag.webp",
        hoverImage: "",
        tag: "High-quality cork laptop bags and wallets designed for professionals, corporates, students, and eco-conscious users in Noida, Gurgaon, Okhla, and Delhi NCR.\nDurable and stylish materials ideal for everyday use and travel.\nPerfect for promoting sustainability and eco-friendly living.",
        products: corkBagWalletProducts
      },
      {
        name: "Cork Yoga Accessories in Delhi NCR",
        slug: "cork-yoga-accessories",
        image: "/assets/subcategories/yoga.webp",
        hoverImage: "",
        tag: "High-quality cork yoga mats, blocks, straps, and accessories designed for home, studios, gyms, and corporate wellness programs in Noida, Gurgaon, Okhla, and Delhi NCR.\nEco-friendly and durable materials ideal for all levels of practice.\nPerfect for promoting wellness, mindfulness, and sustainable living.",
        products: corkYogaProducts
      }
    ],

  },
  {
    name: "Drink Ware",
    slug: "drink-ware",
    image: "/assets/categories/drinkware.jpeg",
    hoverImage: "/assets/categories/drink.jpg",
    tag: "Premium drinkware collection. Sippers, mugs, bottles, and more. Perfect for daily use and gifting. Custom branding available.",
    subcategories: [
      {
        name: "Promotional Sippers Manufacturers in Delhi",
        slug: "sipper",
        image: "/assets/categories/sipper.jpg",
        hoverImage: "",
        tag: "High-quality custom sippers designed for corporates, retail stores, events, and marketing campaigns in Noida, Gurgaon, Okhla, and Delhi NCR.\nDurable and stylish materials ideal for daily hydration and promotions.\nPerfect for branding, giveaways, and sustainable gifting.",
        products: sipperBottles,
      },
      {
        name: "Promotional Bamboo Bottles Manufacturers in Delhi",
        slug: "bamboo-bottle",
        image: "/assets/categories/bamboobottle.jpg",
        hoverImage: "",
        tag: "High-quality bamboo bottles designed for corporates, retail stores, events, and marketing campaigns in Noida, Gurgaon, Okhla, and Delhi NCR.\nEco-friendly and durable materials ideal for daily hydration and sustainable promotions.\nPerfect for branding, giveaways, and green gifting.",
        products: bambooBottles,
      },
      {
        name: "Promotional Coffee Mugs Manufacturers in Delhi",
        slug: "coffee-mug",
        image: "/assets/categories/coffeemug.jpg",
        hoverImage: "",
        tag: "High-quality custom coffee mugs designed for corporates, retail stores, events, and marketing campaigns in Noida, Gurgaon, Okhla, and Delhi NCR.",
        products: coffeeMugs,
      },
      {
        name: "Promotional Ceramic Mugs Manufacturers in Delhi",
        slug: "ceramic-mug",
        image: "/assets/categories/ceramicmug.jpg",
        hoverImage: "",
        tag: "High-quality custom ceramic mugs designed for corporates, retail stores, events, and marketing campaigns in Noida, Gurgaon, Okhla, and Delhi NCR",
        products: ceramicMugs,
      }
    ]
  },
  {
    name: "Custom Trophies & Mementos Manufacturers in Delhi NCR",
    slug: "trophy-and-momento",
    image: "/assets/categories/trophy.jpg",
    hoverImage: "/assets/categories/trophy1.jpg",
    tag: "High-quality, customized trophies and mementos designed for corporate recognition, sports events, employee awards, and special occasions across Delhi, Noida, Gurgaon, Okhla, and NCR.\nPremium materials including glass, crystal, metal, wood, and acrylic.\nElegant designs with options for custom engraving and branding to celebrate achievements in style.",
    subcategories: [
      {
        name: "Trophy and Momento",
        slug: "trophy-and-momento",
        image: "/assets/categories/trophymomento.jpg",
        hoverImage: "",
        tag: "Exclusive trophies and momentos. Crystal and wooden options. Ideal for awards and events. Custom branding available.",
        products: trophies,
      }
    ]
  }
];

module.exports = categoryData;
