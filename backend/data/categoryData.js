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

const categoryData = [
  {
    name: "Apparel and Accessories",
    slug: "apparel-and-accessories",
    image: "/assets/categories/apparel.jpg",
    hoverImage: "",
    tag: "Discover our range of apparel and accessories.\nPerfect for branding and gifting.\nTrendy, comfortable, and customizable.\nIdeal for all occasions.",
    subcategories: [
      {
        name: "Polo T-Shirts",
        slug: "polo-t-shirts",
        image: "/assets/subcategories/polotshirt.webp",
        hoverImage: "",
        tag: "Smart and comfortable polo t-shirts.\nPerfect for corporate wear.\nCustom logo printing available.",
        products: poloTshirts
      },
      {
        name: "Round Neck T-Shirts",
        slug: "round-neck-t-shirts",
        image: "/assets/subcategories/round.webp",
        hoverImage: "",
        tag: "Classic round neck t-shirts.\nSoft, breathable materials.\nCustomizable for events, teams, and promotions.",
        products: roundneckTshirts
      },
      {
        name: "Caps",
        slug: "caps",
        image: "/assets/subcategories/cap.jpg",
        hoverImage: "",
        tag: "Stylish and comfortable caps.\nPerfect for branding and giveaways.\nCustom embroidery options.",
        products: caps
      },
      {
        name: "Hats",
        slug: "hats",
        image: "/assets/subcategories/hats.webp",
        hoverImage: "",
        tag: "Trendy hats for outdoor and casual wear.\nIdeal for sun protection and custom branding.",
        products: hats
      },
      {
        name: "Corporate Shirts",
        slug: "corporate-shirts",
        image: "/assets/subcategories/corporateshirt.jpg",
        hoverImage: "",
        tag: "Professional corporate shirts.\nPerfect for office wear.\nCustom branding options.\nAvailable in various styles.",
        products: corporateShirts
      },
      {
        name: "Ties",
        slug: "ties",
        image: "/assets/subcategories/tie.jpg",
        hoverImage: "",
        tag: "Elegant ties for professionals.\nPremium fabrics and designs.\nIdeal for gifting.\nCustom prints available.",
        products: ties
      },
      {
        name: "Aprons",
        slug: "aprons",
        image: "/assets/subcategories/apron.jpg",
        hoverImage: "",
        tag: "Durable aprons for all uses.\nKitchen and industrial styles.\nCustomizable with logos.\nGreat for branding.",
        products: aprons
      },
      {
        name: "Winter Wear",
        slug: "winter-wear",
        image: "/assets/subcategories/winterwear.jpg",
        hoverImage: "",
        tag: "Warm winter essentials.\nHoodies, jackets, and more.\nPerfect for cold seasons.\nCustom branding available.",
        products: winterWear
      }
    ]
  },
  {
    name: "Office and Writing",
    image: "/assets/categories/officewriting.jpg",
    hoverImage: "/assets/categories/office.jpg",
    tag: "Essential office and writing tools. Perfect for daily use and gifting. Custom branding options. Boost productivity and style.",
    subcategories: [
      {
        name: "File and Folder",
        image: "/assets/categories/filefolder.jpg",
        hoverImage: "",
        tag: "Organize documents efficiently. Premium files and folders. Ideal for offices and events. Custom branding available.",
        products: [
          {
            name: "Leather Folder",
            description: "A4 size PU leather folder.",
            image: "/assets/products/folder1.jpg",
            tags: [
              "leather folder",
              "PU folder",
              "a4 file",
              "office folder",
              "corporate file",
              "branding folder",
              "document holder",
              "file and folder",
              "office and writing"
            ]
          },
          {
            name: "Document File",
            description: "Plastic file with branding.",
            image: "/assets/products/folder2.jpg",
            tags: [
              "plastic file",
              "document file",
              "file with logo",
              "stationery file",
              "office file",
              "branding stationery",
              "file and folder",
              "office and writing"
            ]
          }
        ]
      },
      {
        name: "Notebook & Diary",
        image: "/assets/categories/notebookdiary.jpg",
        hoverImage: "",
        tag: "Stylish notebooks and diaries. Perfect for notes and planning. Custom covers and branding. Great for gifting.",
        products: [
          {
            name: "Spiral Notebook",
            description: "Custom cover spiral notebook.",
            image: "/assets/products/notebook1.jpg",
            tags: [
              "spiral notebook",
              "branded notebook",
              "notepad",
              "writing pad",
              "stationery",
              "notes book",
              "office gift",
              "notebook & diary",
              "office and writing"
            ]
          },
          {
            name: "Hardcover Diary",
            description: "Premium diary with pen slot.",
            image: "/assets/products/notebook2.jpg",
            tags: [
              "diary with pen",
              "premium diary",
              "corporate diary",
              "hard diary",
              "office planner",
              "branding diary",
              "notebook & diary",
              "office and writing"
            ]
          }
        ]
      },
      {
        name: "Pen & Writing Set",
        image: "/assets/categories/penwriting.jpg",
        hoverImage: "",
        tag: "Elegant pens and writing sets. Ideal for corporate gifting. Custom engravings available. Smooth writing experience.",
        products: [
          {
            name: "Ball Pen",
            description: "Stylish metal ball pen.",
            image: "/assets/products/pen1.jpg",
            tags: [
              "ball pen",
              "metal pen",
              "logo pen",
              "writing tool",
              "gift pen",
              "office pen",
              "pen & writing set",
              "office and writing"
            ]
          },
          {
            name: "Gift Pen Set",
            description: "Pen + Box gift combo.",
            image: "/assets/products/pen2.jpg",
            tags: [
              "pen gift set",
              "branded pen",
              "pen combo",
              "pen box",
              "corporate writing gift",
              "pen & writing set",
              "office and writing"
            ]
          }
        ]
      },
      {
        name: "Lanyard & ID Card",
        image: "/assets/categories/lanyardid.jpg",
        hoverImage: "",
        tag: "Custom lanyards and ID cards. Perfect for events and offices. Durable and stylish designs. Brand your identity.",
        products: [
          {
            name: "Lanyard with Logo",
            description: "Printed polyester lanyard.",
            image: "/assets/products/lanyard1.jpg",
            tags: [
              "custom lanyard",
              "logo lanyard",
              "event badge",
              "ID holder",
              "lanyard tag",
              "office accessory",
              "lanyard & id card",
              "office and writing"
            ]
          },
          {
            name: "ID Card Holder",
            description: "PVC ID with branding.",
            image: "/assets/products/idcard1.jpg",
            tags: [
              "id card holder",
              "office id",
              "PVC badge",
              "custom id card",
              "branded badge",
              "lanyard & id card",
              "office and writing"
            ]
          }
        ]
      },
      {
        name: "Miscellaneous",
        image: "/assets/categories/miscellaneous.jpg",
        hoverImage: "",
        tag: "Unique office accessories. Calendars, sticky notes, and more. Enhance your workspace. Custom branding available.",
        products: [
          {
            name: "Desk Calendar",
            description: "Custom printed desk calendar.",
            image: "/assets/products/misc1.jpg",
            tags: [
              "desk calendar",
              "branded calendar",
              "office calendar",
              "corporate gift",
              "custom desk item",
              "miscellaneous",
              "office and writing"
            ]
          },
          {
            name: "Sticky Notes",
            description: "Branded sticky note pad.",
            image: "/assets/products/misc2.jpg",
            tags: [
              "sticky notes",
              "post-it pad",
              "branded notepad",
              "office memo",
              "stationery notes",
              "miscellaneous",
              "office and writing"
            ]
          }
        ]
      }
    ]
  },
  {
    name: "Collection",
    image: "/assets/categories/collection.jpg",
    hoverImage: "/assets/categories/apparel.jpg",
    tag: "Exclusive gift collections. Perfect for special occasions. Curated for every need. Customizable options available.",
    subcategories: [
      {
        name: "Welcome Kits",
        image: "/assets/categories/welcomekits.jpg",
        hoverImage: "",
        tag: "Thoughtful welcome kits. Ideal for new joiners. Includes essentials and gifts. Custom branding available.",
        products: [
          {
            name: "New Joiner Kit",
            description: "Includes bottle, diary, pen.",
            image: "/assets/products/welcome1.jpg",
            tags: [
              "new joiner kit",
              "employee welcome kit",
              "welcome gifts",
              "corporate onboarding",
              "diary pen bottle set",
              "company welcome pack",
              "gift collection",
              "collection",
              "welcome kits"
            ]
          },
          {
            name: "Basic Kit",
            description: "Includes mug, pen, notepad.",
            image: "/assets/products/welcome2.jpg",
            tags: [
              "basic gift kit",
              "starter gift kit",
              "welcome set",
              "mug pen notebook kit",
              "employee gift box",
              "gift collection",
              "collection",
              "welcome kits"
            ]
          }
        ]
      },
      {
        name: "Promotional Clocks",
        image: "/assets/categories/promotionalclock.jpg",
        hoverImage: "",
        tag: "Promotional clocks for branding. Wall and table clocks. Custom printed designs. Perfect for gifting.",
        products: [
          {
            name: "Wall Clock",
            description: "Printed wall clock.",
            image: "/assets/products/clock1.jpg",
            tags: [
              "wall clock",
              "printed clock",
              "promotional wall clock",
              "branding clock",
              "custom wall decor",
              "gift clocks",
              "collection",
              "promotional clocks"
            ]
          },
          {
            name: "Table Clock",
            description: "Desktop clock with logo.",
            image: "/assets/products/clock2.jpg",
            tags: [
              "table clock",
              "desk clock",
              "corporate desk accessory",
              "promotional table clock",
              "logo printed clock",
              "gift clocks",
              "collection",
              "promotional clocks"
            ]
          }
        ]
      },
      {
        name: "Desktop and Executive Gifts",
        image: "/assets/categories/desktopgifts.jpg",
        hoverImage: "",
        tag: "Premium executive gifts. Perfect for desktops. Elegant and functional. Custom branding options.",
        products: [
          {
            name: "Pen Stand",
            description: "Wooden pen holder.",
            image: "/assets/products/desktop1.jpg",
            tags: [
              "pen stand",
              "desk organizer",
              "executive pen holder",
              "wooden pen stand",
              "office desktop gift",
              "collection",
              "desktop and executive gifts"
            ]
          },
          {
            name: "Combo Set",
            description: "Diary, pen, card holder set.",
            image: "/assets/products/desktop2.jpg",
            tags: [
              "executive combo set",
              "diary pen combo",
              "corporate gift set",
              "office desktop combo",
              "pen cardholder set",
              "collection",
              "desktop and executive gifts"
            ]
          }
        ]
      },
      {
        name: "Keychains",
        image: "/assets/categories/keychains.jpg",
        hoverImage: "",
        tag: "Custom keychains for all. Metal, LED, and more. Great for promotions. Personalize with your logo.",
        products: [
          {
            name: "Metal Keychain",
            description: "Custom engraved.",
            image: "/assets/products/keychain1.jpg",
            tags: [
              "metal keychain",
              "custom keychain",
              "branded key ring",
              "engraved keychain",
              "promotional keychain",
              "collection",
              "keychains"
            ]
          },
          {
            name: "LED Keychain",
            description: "With light and logo print.",
            image: "/assets/products/keychain2.jpg",
            tags: [
              "led keychain",
              "light keychain",
              "branded key ring",
              "logo printed keychain",
              "custom flashlight keychain",
              "collection",
              "keychains"
            ]
          }
        ]
      },
      {
        name: "Miscellaneous",
        image: "/assets/categories/miscellaneousgift.jpg",
        hoverImage: "",
        tag: "Unique gift items. Mobile holders, magnets, and more. Perfect for any occasion. Custom branding available.",
        products: [
          {
            name: "Mobile Holder",
            description: "Adjustable mobile stand.",
            image: "/assets/products/miscgift1.jpg",
            tags: [
              "mobile holder",
              "phone stand",
              "adjustable phone stand",
              "desk mobile stand",
              "custom mobile stand",
              "collection",
              "miscellaneous"
            ]
          },
          {
            name: "Fridge Magnet",
            description: "Custom magnet with branding.",
            image: "/assets/products/miscgift2.jpg",
            tags: [
              "fridge magnet",
              "custom magnet",
              "promotional magnet",
              "logo printed magnet",
              "refrigerator decor",
              "collection",
              "miscellaneous"
            ]
          }
        ]
      }
    ]
  },
  {
    name: "Bags and Travel",
    image: "/assets/categories/bags.jpg",
    hoverImage: "/assets/categories/bags-for-change.jpg",
    tag: "Travel in style with our bags. Backpacks, totes, and more. Durable and functional designs. Custom branding available.",
    subcategories: [
      {
        name: "Backpacks",
        image: "/assets/categories/backpack.jpg",
        hoverImage: "",
        tag: "Versatile backpacks for all. Laptop and casual options. Spacious and comfortable. Custom branding available.",
        products: [
          {
            name: "Laptop Backpack",
            description: "Padded laptop section.",
            image: "/assets/products/bag1.jpg",
            tags: [
              "laptop backpack",
              "office backpack",
              "padded bag",
              "corporate bag",
              "travel backpack",
              "custom logo backpack",
              "bags and travel",
              "backpacks"
            ]
          },
          {
            name: "Casual Backpack",
            description: "Lightweight travel bag.",
            image: "/assets/products/bag2.jpg",
            tags: [
              "casual backpack",
              "lightweight bag",
              "everyday backpack",
              "travel bag",
              "school backpack",
              "branded backpack",
              "bags and travel",
              "backpacks"
            ]
          }
        ]
      },
      {
        name: "Foldable Bags",
        image: "/assets/categories/foldablebag.jpg",
        hoverImage: "",
        tag: "Eco-friendly foldable bags. Reusable and compact. Easy to carry anywhere. Custom branding available.",
        products: [
          {
            name: "Eco Fold Bag",
            description: "Reusable foldable bag.",
            image: "/assets/products/foldbag1.jpg",
            tags: [
              "eco fold bag",
              "reusable shopping bag",
              "foldable bag",
              "compact travel bag",
              "environment friendly bag",
              "custom printed fold bag",
              "bags and travel",
              "foldable bags"
            ]
          },
          {
            name: "Compact Bag",
            description: "Easy to carry, foldable.",
            image: "/assets/products/foldbag2.jpg",
            tags: [
              "compact foldable bag",
              "portable travel bag",
              "custom eco bag",
              "lightweight bag",
              "travel friendly bag",
              "bags and travel",
              "foldable bags"
            ]
          }
        ]
      },
      {
        name: "Duffle Bags",
        image: "/assets/categories/dufflebag.jpg",
        hoverImage: "",
        tag: "Spacious duffle bags. Ideal for travel and gym. Durable and stylish. Custom branding available.",
        products: [
          {
            name: "Travel Duffle",
            description: "Large capacity bag.",
            image: "/assets/products/duffle1.jpg",
            tags: [
              "travel duffle bag",
              "large capacity bag",
              "travel kit bag",
              "branded duffle",
              "sports travel bag",
              "bags and travel",
              "duffle bags"
            ]
          },
          {
            name: "Gym Duffle",
            description: "With side shoe pocket.",
            image: "/assets/products/duffle2.jpg",
            tags: [
              "gym duffle bag",
              "sports duffle",
              "bag with shoe pocket",
              "fitness bag",
              "branded gym bag",
              "bags and travel",
              "duffle bags"
            ]
          }
        ]
      },
      {
        name: "Tote Bags",
        image: "/assets/categories/totebag.jpg",
        hoverImage: "",
        tag: "Trendy tote bags. Eco-friendly materials. Perfect for daily use. Custom branding available.",
        products: [
          {
            name: "Canvas Tote",
            description: "Durable canvas bag.",
            image: "/assets/products/tote1.jpg",
            tags: [
              "canvas tote bag",
              "eco shopping bag",
              "daily use tote",
              "fabric tote",
              "custom printed tote",
              "bags and travel",
              "tote bags"
            ]
          },
          {
            name: "Eco Tote",
            description: "Eco-friendly fabric bag.",
            image: "/assets/products/tote2.jpg",
            tags: [
              "eco tote bag",
              "sustainable tote",
              "reusable tote bag",
              "fabric shopping bag",
              "environment friendly bag",
              "bags and travel",
              "tote bags"
            ]
          }
        ]
      },
      {
        name: "Accessories",
        image: "/assets/categories/accesories.jpg",
        hoverImage: "",
        tag: "Travel accessories for convenience. Luggage tags, pouches, and more. Organize your journey. Custom branding available.",
        products: [
          {
            name: "Luggage Tag",
            description: "Custom name tag.",
            image: "/assets/products/accessory1.jpg",
            tags: [
              "luggage tag",
              "travel name tag",
              "bag tag",
              "custom printed tag",
              "travel accessory",
              "bags and travel",
              "accessories"
            ]
          },
          {
            name: "Travel Pouch",
            description: "Multipurpose organizer.",
            image: "/assets/products/accessory2.jpg",
            tags: [
              "travel pouch",
              "travel organizer",
              "multipurpose pouch",
              "custom printed pouch",
              "utility travel case",
              "bags and travel",
              "accessories"
            ]
          }
        ]
      }
    ]
  },
  {
    name: "Technology Accessories",
    image: "/assets/categories/technology.jpg",
    hoverImage: "/assets/categories/technical.jpg",
    tag: "Latest tech accessories. Wireless, portable, and smart. Perfect for gifting and use. Custom branding available.",
    subcategories: [
      {
        name: "Wireless Charging",
        image: "/assets/categories/wirelesscharging.jpg",
        hoverImage: "",
        tag: "Wireless charging solutions. Fast and efficient. Compatible with most devices. Custom branding available.",
        products: [
          {
            name: "Wireless Charger",
            description: "Fast charging pad.",
            image: "/assets/products/tech1.jpg",
            tags: [
              "wireless charger",
              "tech gift",
              "fast charging pad",
              "qi charger",
              "mobile accessory",
              "technology accessories",
              "wireless charging",
              "corporate gift"
            ]
          },
          {
            name: "Charging Stand",
            description: "Vertical wireless dock.",
            image: "/assets/products/tech2.jpg",
            tags: [
              "charging stand",
              "wireless dock",
              "phone charging stand",
              "desktop charger",
              "branded tech accessory",
              "technology accessories",
              "wireless charging"
            ]
          }
        ]
      },
      {
        name: "Computer Accessories",
        image: "/assets/categories/computeraccess.jpg",
        hoverImage: "",
        tag: "Essential computer accessories. USB hubs, webcam covers, and more. Enhance productivity. Custom branding available.",
        products: [
          {
            name: "USB Hub",
            description: "4-in-1 USB hub.",
            image: "/assets/products/comp1.jpg",
            tags: [
              "usb hub",
              "computer accessory",
              "4 port usb",
              "usb splitter",
              "tech gift",
              "technology accessories",
              "computer accessories"
            ]
          },
          {
            name: "Webcam Cover",
            description: "Privacy slider.",
            image: "/assets/products/comp2.jpg",
            tags: [
              "webcam cover",
              "privacy slider",
              "laptop accessory",
              "camera cover",
              "cybersecurity tool",
              "technology accessories",
              "computer accessories"
            ]
          }
        ]
      },
      {
        name: "Power Bank",
        image: "/assets/categories/powerbank.jpg",
        hoverImage: "",
        tag: "Reliable power banks. Stay charged on the go. Various capacities available. Custom branding options.",
        products: [
          {
            name: "10,000mAh Power Bank",
            description: "Fast charge compatible.",
            image: "/assets/products/powerbank1.jpg",
            tags: [
              "10000mah power bank",
              "portable charger",
              "fast charging power bank",
              "mobile backup battery",
              "technology accessories",
              "power bank",
              "tech gift"
            ]
          },
          {
            name: "Slim Power Bank",
            description: "Pocket-sized backup.",
            image: "/assets/products/powerbank2.jpg",
            tags: [
              "slim power bank",
              "pocket power bank",
              "travel battery pack",
              "portable charger",
              "branded tech gift",
              "technology accessories",
              "power bank"
            ]
          }
        ]
      },
      {
        name: "Speaker",
        image: "/assets/categories/speaker.jpg",
        hoverImage: "",
        tag: "Portable speakers for music. Bluetooth and wired options. Great sound quality. Custom branding available.",
        products: [
          {
            name: "Bluetooth Speaker",
            description: "Portable music speaker.",
            image: "/assets/products/speaker1.jpg",
            tags: [
              "bluetooth speaker",
              "wireless speaker",
              "portable speaker",
              "music device",
              "tech gift",
              "technology accessories",
              "speaker"
            ]
          },
          {
            name: "Mini Speaker",
            description: "Compact sound device.",
            image: "/assets/products/speaker2.jpg",
            tags: [
              "mini speaker",
              "small bluetooth speaker",
              "pocket speaker",
              "portable audio",
              "corporate speaker gift",
              "technology accessories",
              "speaker"
            ]
          }
        ]
      },
      {
        name: "Desktop & Mousepad",
        image: "/assets/categories/mousepad.jpg",
        hoverImage: "",
        tag: "Desktop accessories and mousepads. Smooth and comfortable. Enhance your workspace. Custom branding available.",
        products: [
          {
            name: "Mousepad",
            description: "Smooth surface pad.",
            image: "/assets/products/mousepad1.jpg",
            tags: [
              "mousepad",
              "custom mousepad",
              "office desk accessory",
              "branded mousepad",
              "technology accessories",
              "desktop gift",
              "computer accessory"
            ]
          },
          {
            name: "Wrist Mousepad",
            description: "With wrist support.",
            image: "/assets/products/mousepad2.jpg",
            tags: [
              "wrist support mousepad",
              "ergonomic mousepad",
              "comfortable desk pad",
              "tech accessory",
              "technology accessories",
              "desktop & mousepad"
            ]
          }
        ]
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
        name: "Cork Sheet",
        slug: "cork-sheet",
        image: "/assets/subcategories/sheet.webp",
        hoverImage: "",
        tag: "Durable and eco-friendly cork sheets for multiple uses.",
        products: corkSheetProducts
      },
      {
        name: "Cork Corporate Gifting Combo",
        slug: "cork-corporate-gifting-combo",
        image: "/assets/subcategories/combo.webp",
        hoverImage: "",
        tag: "Premium cork gifting combos for corporate events.",
        products: corkCorporateGiftingComboProducts
      },
      {
        name: "Cork Coaster",
        slug: "cork-coaster",
        image: "/assets/subcategories/coaster.webp",
        hoverImage: "",
        tag: "Stylish cork coasters for homes, offices, and gifts.",
        products: corkCoasterProducts
      },
      {
        name: "Cork Plant Decorate",
        slug: "cork-plant-decorate",
        image: "/assets/subcategories/plant.webp",
        hoverImage: "",
        tag: "Eco-friendly decorative cork plant items.",
        products: corkPlantDecorateProducts
      },
      {
        name: "Cork Serving Decorate",
        slug: "cork-serving-decorate",
        image: "/assets/subcategories/serving.webp",
        hoverImage: "",
        tag: "Sustainable cork serving and decorative items.",
        products: corkServingDecorateProducts
      },
      {
        name: "Cork Horeca Range",
        slug: "cork-horeca-range",
        image: "/assets/subcategories/horeca.webp",
        hoverImage: "",
        tag: "Eco-friendly cork range for hotels, restaurants, and cafes.",
        products: corkHorecaProducts
      },
      {
        name: "Cork Premium Lighting",
        slug: "cork-premium-lighting",
        image: "/assets/subcategories/lighting.webp",
        hoverImage: "",
        tag: "Stylish premium lighting made from sustainable cork.",
        products: corkLightingProducts
      },
      {
        name: "Cork Premium Gift Boxes",
        slug: "cork-premium-gift-boxes",
        image: "/assets/subcategories/box.webp",
        hoverImage: "",
        tag: "Elegant cork gift boxes for premium eco gifting.",
        products: corkGiftBoxProducts
      },
      {
        name: "Cork Desk Top Accessories",
        slug: "cork-desk-top-accessories",
        image: "/assets/subcategories/desk.webp",
        hoverImage: "",
        tag: "Eco-friendly cork desk accessories for modern workspaces.",
        products: corkDeskProducts
      },
      {
        name: "Cork Laptop Bag and Wallet",
        slug: "cork-laptop-bag-and-wallet",
        image: "/assets/subcategories/bag.webp",
        hoverImage: "",
        tag: "Stylish cork laptop bags and wallets – sustainable and trendy.",
        products: corkBagWalletProducts
      },
      {
        name: "Cork Yoga Accessories",
        slug: "cork-yoga-accessories",
        image: "/assets/subcategories/yoga.webp",
        hoverImage: "",
        tag: "Durable and natural cork yoga mats and accessories.",
        products: corkYogaProducts
      }
    ],

  },
  {
    name: "Drink Ware",
    image: "/assets/categories/drinkware.jpeg",
    hoverImage: "/assets/categories/drink.jpg",
    tag: "Premium drinkware collection. Sippers, mugs, bottles, and more. Perfect for daily use and gifting. Custom branding available.",
    subcategories: [
      {
        name: "Sipper",
        image: "/assets/categories/sipper.jpg",
        hoverImage: "",
        tag: "Durable sippers for all. Sports and daily use. Various sizes and styles. Custom branding available.",
        products: [
          {
            name: "Aluminum Sipper",
            description: "750ml sports bottle.",
            image: "/assets/products/sipper.webp",
            tags: [
              "aluminum sipper",
              "sports sipper",
              "metal drink bottle",
              "custom sipper",
              "drinkware",
              "750ml water bottle",
              "branded water bottle",
              "corporate sipper gift"
            ]
          },
          {
            name: "Steel Sipper",
            description: "Insulated bottle.",
            image: "/assets/products/sipper2.jpg",
            tags: [
              "steel sipper",
              "insulated bottle",
              "thermo bottle",
              "branded sipper",
              "corporate gifting",
              "drinkware",
              "custom water bottle",
              "sports drinkware"
            ]
          }
        ]
      },
      {
        name: "Bamboo Bottle",
        image: "/assets/categories/bamboobottle.jpg",
        hoverImage: "",
        tag: "Eco-friendly bamboo bottles. Thermos and flasks. Natural and stylish. Custom branding available.",
        products: [
          {
            name: "Bamboo Thermos",
            description: "Eco thermos with filter.",
            image: "/assets/products/bottle1.jpg",
            tags: [
              "bamboo thermos",
              "eco-friendly bottle",
              "tea flask with filter",
              "natural drinkware",
              "bamboo drink bottle",
              "eco corporate gift",
              "custom bamboo bottle"
            ]
          },
          {
            name: "Wood Flask",
            description: "Natural design flask.",
            image: "/assets/products/bottle2.jpg",
            tags: [
              "wood flask",
              "eco thermos",
              "natural flask bottle",
              "wood finish drinkware",
              "branded eco gift",
              "customized bamboo drinkware",
              "eco flask"
            ]
          }
        ]
      },
      {
        name: "Coffee Mug",
        image: "/assets/categories/coffeemug.jpg",
        hoverImage: "",
        tag: "Classic coffee mugs. Ceramic and steel options. Perfect for gifting. Custom branding available.",
        products: [
          {
            name: "Printed Mug",
            description: "Ceramic mug with print.",
            image: "/assets/products/mug1.jpg",
            tags: [
              "printed mug",
              "custom mug",
              "branded ceramic mug",
              "coffee mug gift",
              "corporate mug",
              "customized drinkware",
              "gift mug"
            ]
          },
          {
            name: "Steel Mug",
            description: "Stainless coffee mug.",
            image: "/assets/products/mug2.jpg",
            tags: [
              "steel coffee mug",
              "stainless mug",
              "metal coffee cup",
              "insulated mug",
              "drinkware gift",
              "custom steel mug",
              "corporate mug"
            ]
          }
        ]
      },
      {
        name: "Ceramic Mug",
        image: "/assets/categories/ceramicmug.jpg",
        hoverImage: "",
        tag: "Premium ceramic mugs. Various designs and colors. Ideal for home and office. Custom branding available.",
        products: [
          {
            name: "Classic Mug",
            description: "350ml white ceramic mug.",
            image: "/assets/products/ceramic1.jpg",
            tags: [
              "classic ceramic mug",
              "white coffee cup", "350ml mug", "branded mug",
              "home office mug", "ceramic drinkware", "promotional mug"
            ]
          },
          {
            name: "Color Handle Mug",
            description: "Two-tone mug.",
            image: "/assets/products/ceramic2.jpg",
            tags: [
              "color handle mug", "two-tone mug", "custom color mug", "personalized mug",
              "ceramic drinkware", "corporate gifting mug", "branded ceramic mug"
            ]
          }
        ]
      }
    ]
  },
  {
    name: "Trophy and Momento",
    image: "/assets/categories/trophy.jpg",
    hoverImage: "/assets/categories/trophy1.jpg",
    tag: "Awards and momentos for recognition. Crystal, wood, and more. Perfect for ceremonies. Custom branding available.",
    subcategories: [
      {
        name: "Trophy and Momento",
        image: "/assets/categories/trophymomento.jpg",
        hoverImage: "",
        tag: "Exclusive trophies and momentos. Crystal and wooden options. Ideal for awards and events. Custom branding available.",
        products: [
          {
            name: "Crystal Trophy",
            description: "Custom crystal award.",
            image: "/assets/products/trophy1.jpg",
            tags: [
              "crystal trophy", "glass award", "recognition trophy", "corporate award",
              "event trophy", "premium award", "engraved trophy", "custom crystal momento"
            ]
          },
          {
            name: "Wooden Shield",
            description: "Classic wooden momento.",
            image: "/assets/products/trophy2.jpg",
            tags: [
              "wooden shield", "wooden momento", "event award plaque", "corporate recognition",
              "engraved wooden trophy", "award ceremony momento", "classic wood award"
            ]
          }
        ]
      }
    ]
  }
];

module.exports = categoryData;
