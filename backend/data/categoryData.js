const categoryData = [
  {
    name: "Apparel and Accessories",
    image: "/assets/categories/apparel.jpg",
    hoverImage: "",
    tag: "Discover our range of apparel and accessories.\nPerfect for branding and gifting.\nTrendy, comfortable, and customizable.\nIdeal for all occasions.",
    subcategories: [
      {
        name: "T-Shirts",
        image: "/assets/subcategories/tshirt.jpg",
        hoverImage: "",
        tag: "Classic and custom t-shirts.\nSoft, durable fabrics.\nIdeal for events and teams.\nPersonalize with your logo.",
        products: [
          { name: "Cotton T-Shirt", description: "100% cotton round neck t-shirt.", image: "/assets/products/tshirt1.jpg" },
          { name: "Polo T-Shirt", description: "Comfort-fit polo t-shirt with logo print.", image: "/assets/products/tshirt2.jpg" },
        ],
      },
      {
        name: "Caps and Hats",
        image: "/assets/subcategories/cap.jpg",
        hoverImage: "",
        tag: "Stylish caps and hats.\nGreat for promotions.\nComfortable and adjustable.\nCustom embroidery available.",
        products: [
          { name: "Baseball Cap", description: "Adjustable cotton cap with embroidery.", image: "/assets/products/cap1.jpg" },
          { name: "Bucket Hat", description: "Reversible bucket hat for sun protection.", image: "/assets/products/cap2.jpg" },
        ],
      },
      {
        name: "Corporate Shirts",
        image: "/assets/subcategories/corporateshirt.jpg",
        hoverImage: "",
        tag: "Professional corporate shirts.\nPerfect for office wear.\nCustom branding options.\nAvailable in various styles.",
        products: [
          { name: "Formal Shirt", description: "Slim-fit shirt with logo print.", image: "/assets/products/shirt1.jpg" },
          { name: "Checked Shirt", description: "Office wear with check pattern.", image: "/assets/products/shirt2.jpg" },
        ],
      },
      {
        name: "Ties",
        image: "/assets/subcategories/tie.jpg",
        hoverImage: "",
        tag: "Elegant ties for professionals.\nPremium fabrics and designs.\nIdeal for gifting.\nCustom prints available.",
        products: [
          { name: "Silk Tie", description: "Premium silk tie with custom design.", image: "/assets/products/tie1.jpg" },
          { name: "Corporate Tie Set", description: "Tie, cufflink, and pocket square.", image: "/assets/products/tie2.jpg" },
        ],
      },
      {
        name: "Aprons",
        image: "/assets/subcategories/apron.jpg",
        hoverImage: "",
        tag: "Durable aprons for all uses.\nKitchen and industrial styles.\nCustomizable with logos.\nGreat for branding.",
        products: [
          { name: "Kitchen Apron", description: "Durable kitchen apron with print.", image: "/assets/products/apron1.jpg" },
          { name: "Canvas Apron", description: "Heavy-duty canvas apron.", image: "/assets/products/apron2.jpg" },
        ],
      },
      {
        name: "Winter Wear",
        image: "/assets/subcategories/winterwear.jpg",
        hoverImage: "",
        tag: "Warm winter essentials.\nHoodies, jackets, and more.\nPerfect for cold seasons.\nCustom branding available.",
        products: [
          { name: "Corporate Hoodie", description: "Fleece-lined hoodie.", image: "/assets/products/winter1.jpg" },
          { name: "Zipper Jacket", description: "Warm winter jacket.", image: "/assets/products/winter2.jpg" },
        ],
      },
    ],
  },
  {
    name: "Office and Writing",
    image: "/assets/categories/officewriting.jpg",
    hoverImage: "/assets/categories/office.jpg",
    tag: "Essential office and writing tools.\nPerfect for daily use and gifting.\nCustom branding options.\nBoost productivity and style.",
    subcategories: [
      {
        name: "File and Folder",
        image: "/assets/categories/filefolder.jpg",
        hoverImage: "",
        tag: "Organize documents efficiently.\nPremium files and folders.\nIdeal for offices and events.\nCustom branding available.",
        products: [
          { name: "Leather Folder", description: "A4 size PU leather folder.", image: "/assets/products/folder1.jpg" },
          { name: "Document File", description: "Plastic file with branding.", image: "/assets/products/folder2.jpg" },
        ],
      },
      {
        name: "Notebook & Diary",
        image: "/assets/categories/notebookdiary.jpg",
        hoverImage: "",
        tag: "Stylish notebooks and diaries.\nPerfect for notes and planning.\nCustom covers and branding.\nGreat for gifting.",
        products: [
          { name: "Spiral Notebook", description: "Custom cover spiral notebook.", image: "/assets/products/notebook1.jpg" },
          { name: "Hardcover Diary", description: "Premium diary with pen slot.", image: "/assets/products/notebook2.jpg" },
        ],
      },
      {
        name: "Pen & Writing Set",
        image: "/assets/categories/penwriting.jpg",
        hoverImage: "",
        tag: "Elegant pens and writing sets.\nIdeal for corporate gifting.\nCustom engravings available.\nSmooth writing experience.",
        products: [
          { name: "Ball Pen", description: "Stylish metal ball pen.", image: "/assets/products/pen1.jpg" },
          { name: "Gift Pen Set", description: "Pen + Box gift combo.", image: "/assets/products/pen2.jpg" },
        ],
      },
      {
        name: "Lanyard & ID Card",
        image: "/assets/categories/lanyardid.jpg",
        hoverImage: "",
        tag: "Custom lanyards and ID cards.\nPerfect for events and offices.\nDurable and stylish designs.\nBrand your identity.",
        products: [
          { name: "Lanyard with Logo", description: "Printed polyester lanyard.", image: "/assets/products/lanyard1.jpg" },
          { name: "ID Card Holder", description: "PVC ID with branding.", image: "/assets/products/idcard1.jpg" },
        ],
      },
      {
        name: "Miscellaneous",
        image: "/assets/categories/miscellaneous.jpg",
        hoverImage: "",
        tag: "Unique office accessories.\nCalendars, sticky notes, and more.\nEnhance your workspace.\nCustom branding available.",
        products: [
          { name: "Desk Calendar", description: "Custom printed desk calendar.", image: "/assets/products/misc1.jpg" },
          { name: "Sticky Notes", description: "Branded sticky note pad.", image: "/assets/products/misc2.jpg" },
        ],
      },
    ],
  },
  {
    name: "Collection",
    image: "/assets/categories/collection.jpg",
    hoverImage: "/assets/categories/apparel.jpg",
    tag: "Exclusive gift collections.\nPerfect for special occasions.\nCurated for every need.\nCustomizable options available.",
    subcategories: [
      {
        name: "Welcome Kits",
        image: "/assets/categories/welcomekits.jpg",
        hoverImage: "",
        tag: "Thoughtful welcome kits.\nIdeal for new joiners.\nIncludes essentials and gifts.\nCustom branding available.",
        products: [
          { name: "New Joiner Kit", description: "Includes bottle, diary, pen.", image: "/assets/products/welcome1.jpg" },
          { name: "Basic Kit", description: "Includes mug, pen, notepad.", image: "/assets/products/welcome2.jpg" },
        ],
      },
      {
        name: "Promotional Clocks",
        image: "/assets/categories/promotionalclock.jpg",
        hoverImage: "",
        tag: "Promotional clocks for branding.\nWall and table clocks.\nCustom printed designs.\nPerfect for gifting.",
        products: [
          { name: "Wall Clock", description: "Printed wall clock.", image: "/assets/products/clock1.jpg" },
          { name: "Table Clock", description: "Desktop clock with logo.", image: "/assets/products/clock2.jpg" },
        ],
      },
      {
        name: "Desktop and Executive Gifts",
        image: "/assets/categories/desktopgifts.jpg",
        hoverImage: "",
        tag: "Premium executive gifts.\nPerfect for desktops.\nElegant and functional.\nCustom branding options.",
        products: [
          { name: "Pen Stand", description: "Wooden pen holder.", image: "/assets/products/desktop1.jpg" },
          { name: "Combo Set", description: "Diary, pen, card holder set.", image: "/assets/products/desktop2.jpg" },
        ],
      },
      {
        name: "Keychains",
        image: "/assets/categories/keychains.jpg",
        hoverImage: "",
        tag: "Custom keychains for all.\nMetal, LED, and more.\nGreat for promotions.\nPersonalize with your logo.",
        products: [
          { name: "Metal Keychain", description: "Custom engraved.", image: "/assets/products/keychain1.jpg" },
          { name: "LED Keychain", description: "With light and logo print.", image: "/assets/products/keychain2.jpg" },
        ],
      },
      {
        name: "Miscellaneous",
        image: "/assets/categories/miscellaneousgift.jpg",
        hoverImage: "",
        tag: "Unique gift items.\nMobile holders, magnets, and more.\nPerfect for any occasion.\nCustom branding available.",
        products: [
          { name: "Mobile Holder", description: "Adjustable mobile stand.", image: "/assets/products/miscgift1.jpg" },
          { name: "Fridge Magnet", description: "Custom magnet with branding.", image: "/assets/products/miscgift2.jpg" },
        ],
      },
    ],
  },
  {
    name: "Bags and Travel",
    image: "/assets/categories/bags.jpg",
    hoverImage: "/assets/categories/bags-for-change.jpg",
    tag: "Travel in style with our bags.\nBackpacks, totes, and more.\nDurable and functional designs.\nCustom branding available.",
    subcategories: [
      {
        name: "Backpacks",
        image: "/assets/categories/backpack.jpg",
        hoverImage: "",
        tag: "Versatile backpacks for all.\nLaptop and casual options.\nSpacious and comfortable.\nCustom branding available.",
        products: [
          { name: "Laptop Backpack", description: "Padded laptop section.", image: "/assets/products/bag1.jpg" },
          { name: "Casual Backpack", description: "Lightweight travel bag.", image: "/assets/products/bag2.jpg" },
        ],
      },
      {
        name: "Foldable Bags",
        image: "/assets/categories/foldablebag.jpg",
        hoverImage: "",
        tag: "Eco-friendly foldable bags.\nReusable and compact.\nEasy to carry anywhere.\nCustom branding available.",
        products: [
          { name: "Eco Fold Bag", description: "Reusable foldable bag.", image: "/assets/products/foldbag1.jpg" },
          { name: "Compact Bag", description: "Easy to carry, foldable.", image: "/assets/products/foldbag2.jpg" },
        ],
      },
      {
        name: "Duffle Bags",
        image: "/assets/categories/dufflebag.jpg",
        hoverImage: "",
        tag: "Spacious duffle bags.\nIdeal for travel and gym.\nDurable and stylish.\nCustom branding available.",
        products: [
          { name: "Travel Duffle", description: "Large capacity bag.", image: "/assets/products/duffle1.jpg" },
          { name: "Gym Duffle", description: "With side shoe pocket.", image: "/assets/products/duffle2.jpg" },
        ],
      },
      {
        name: "Tote Bags",
        image: "/assets/categories/totebag.jpg",
        hoverImage: "",
        tag: "Trendy tote bags.\nEco-friendly materials.\nPerfect for daily use.\nCustom branding available.",
        products: [
          { name: "Canvas Tote", description: "Durable canvas bag.", image: "/assets/products/tote1.jpg" },
          { name: "Eco Tote", description: "Eco-friendly fabric bag.", image: "/assets/products/tote2.jpg" },
        ],
      },
      {
        name: "Accessories",
        image: "/assets/categories/accesories.jpg",
        hoverImage: "",
        tag: "Travel accessories for convenience.\nLuggage tags, pouches, and more.\nOrganize your journey.\nCustom branding available.",
        products: [
          { name: "Luggage Tag", description: "Custom name tag.", image: "/assets/products/accessory1.jpg" },
          { name: "Travel Pouch", description: "Multipurpose organizer.", image: "/assets/products/accessory2.jpg" },
        ],
      },
    ],
  },
  {
    name: "Technology Accessories",
    image: "/assets/categories/technology.jpg",
    hoverImage: "/assets/categories/technical.jpg",
    tag: "Latest tech accessories.\nWireless, portable, and smart.\nPerfect for gifting and use.\nCustom branding available.",
    subcategories: [
      {
        name: "Wireless Charging",
        image: "/assets/categories/wirelesscharging.jpg",
        hoverImage: "",
        tag: "Wireless charging solutions.\nFast and efficient.\nCompatible with most devices.\nCustom branding available.",
        products: [
          { name: "Wireless Charger", description: "Fast charging pad.", image: "/assets/products/tech1.jpg" },
          { name: "Charging Stand", description: "Vertical wireless dock.", image: "/assets/products/tech2.jpg" },
        ],
      },
      {
        name: "Computer Accessories",
        image: "/assets/categories/computeraccess.jpg",
        hoverImage: "",
        tag: "Essential computer accessories.\nUSB hubs, webcam covers, and more.\nEnhance productivity.\nCustom branding available.",
        products: [
          { name: "USB Hub", description: "4-in-1 USB hub.", image: "/assets/products/comp1.jpg" },
          { name: "Webcam Cover", description: "Privacy slider.", image: "/assets/products/comp2.jpg" },
        ],
      },
      {
        name: "Power Bank",
        image: "/assets/categories/powerbank.jpg",
        hoverImage: "",
        tag: "Reliable power banks.\nStay charged on the go.\nVarious capacities available.\nCustom branding options.",
        products: [
          { name: "10,000mAh Power Bank", description: "Fast charge compatible.", image: "/assets/products/powerbank1.jpg" },
          { name: "Slim Power Bank", description: "Pocket-sized backup.", image: "/assets/products/powerbank2.jpg" },
        ],
      },
      {
        name: "Speaker",
        image: "/assets/categories/speaker.jpg",
        hoverImage: "",
        tag: "Portable speakers for music.\nBluetooth and wired options.\nGreat sound quality.\nCustom branding available.",
        products: [
          { name: "Bluetooth Speaker", description: "Portable music speaker.", image: "/assets/products/speaker1.jpg" },
          { name: "Mini Speaker", description: "Compact sound device.", image: "/assets/products/speaker2.jpg" },
        ],
      },
      {
        name: "Desktop & Mousepad",
        image: "/assets/categories/mousepad.jpg",
        hoverImage: "",
        tag: "Desktop accessories and mousepads.\nSmooth and comfortable.\nEnhance your workspace.\nCustom branding available.",
        products: [
          { name: "Mousepad", description: "Smooth surface pad.", image: "/assets/products/mousepad1.jpg" },
          { name: "Wrist Mousepad", description: "With wrist support.", image: "/assets/products/mousepad2.jpg" },
        ],
      },
    ],
  },
  {
    name: "Eco-Products",
    image: "/assets/categories/ecoproducts.jpg",
    hoverImage: "/assets/categories/bamboo.jpg",
    tag: "Eco-friendly product range.\nSustainable and reusable.\nPerfect for green gifting.\nCustom branding available.",
    subcategories: [
      {
        name: "Bamboo Products",
        image: "/assets/categories/bambooproducts.jpg",
        hoverImage: "",
        tag: "Bamboo-based eco products.\nPens, notebooks, and more.\nSustainable and stylish.\nCustom branding available.",
        products: [
          { name: "Bamboo Pen", description: "Eco pen with bamboo finish.", image: "/assets/products/bamboo1.jpg" },
          { name: "Bamboo Notebook", description: "Hardcover eco-notebook.", image: "/assets/products/bamboo2.jpg" },
        ],
      },
      {
        name: "Customized Gifting",
        image: "/assets/categories/customizedgifts.jpg",
        hoverImage: "",
        tag: "Personalized gifting options.\nPhoto mugs, keychains, and more.\nUnique and memorable.\nCustom branding available.",
        products: [
          { name: "Photo Mug", description: "Custom printed coffee mug.", image: "/assets/products/gift1.jpg" },
          { name: "Name Keychain", description: "Laser engraved keychain.", image: "/assets/products/gift2.jpg" },
        ],
      },
    ],
  },
  {
    name: "Drink Ware",
    image: "/assets/categories/drinkware.jpeg",
    hoverImage: "/assets/categories/drink.jpg",
    tag: "Premium drinkware collection.\nSippers, mugs, bottles, and more.\nPerfect for daily use and gifting.\nCustom branding available.",
    subcategories: [
      {
        name: "Sipper",
        image: "/assets/categories/sipper.jpg",
        hoverImage: "",
        tag: "Durable sippers for all.\nSports and daily use.\nVarious sizes and styles.\nCustom branding available.",
        products: [
          { name: "Aluminum Sipper", description: "750ml sports bottle.", image: "/assets/products/sipper1.jpg" },
          { name: "Steel Sipper", description: "Insulated bottle.", image: "/assets/products/sipper2.jpg" },
        ],
      },
      {
        name: "Bamboo Bottle",
        image: "/assets/categories/bamboobottle.jpg",
        hoverImage: "",
        tag: "Eco-friendly bamboo bottles.\nThermos and flasks.\nNatural and stylish.\nCustom branding available.",
        products: [
          { name: "Bamboo Thermos", description: "Eco thermos with filter.", image: "/assets/products/bottle1.jpg" },
          { name: "Wood Flask", description: "Natural design flask.", image: "/assets/products/bottle2.jpg" },
        ],
      },
      {
        name: "Coffee Mug",
        image: "/assets/categories/coffeemug.jpg",
        hoverImage: "",
        tag: "Classic coffee mugs.\nCeramic and steel options.\nPerfect for gifting.\nCustom branding available.",
        products: [
          { name: "Printed Mug", description: "Ceramic mug with print.", image: "/assets/products/mug1.jpg" },
          { name: "Steel Mug", description: "Stainless coffee mug.", image: "/assets/products/mug2.jpg" },
        ],
      },
      {
        name: "Ceramic Mug",
        image: "/assets/categories/ceramicmug.jpg",
        hoverImage: "",
        tag: "Premium ceramic mugs.\nVarious designs and colors.\nIdeal for home and office.\nCustom branding available.",
        products: [
          { name: "Classic Mug", description: "350ml white ceramic mug.",  image: "/assets/products/ceramic1.jpg" },
          { name: "Color Handle Mug", description: "Two-tone mug.", image: "/assets/products/ceramic2.jpg" },
        ],
      },
    ],
  },
  {
    name: "Trophy and Momento",
    image: "/assets/categories/trophy.jpg",
    hoverImage: "/assets/categories/trophy1.jpg",
    tag: "Awards and momentos for recognition.\nCrystal, wood, and more.\nPerfect for ceremonies.\nCustom branding available.",
    subcategories: [
      {
        name: "Trophy and Momento",
        image: "/assets/categories/trophymomento.jpg",
        hoverImage: "",
        tag: "Exclusive trophies and momentos.\nCrystal and wooden options.\nIdeal for awards and events.\nCustom branding available.",
        products: [
          { name: "Crystal Trophy", description: "Custom crystal award.", image: "/assets/products/trophy1.jpg" },
          { name: "Wooden Shield", description: "Classic wooden momento.", image: "/assets/products/trophy2.jpg" },
        ],
      },
    ],
  },
];

module.exports = categoryData;
