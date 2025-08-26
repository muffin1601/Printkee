import React from "react";
import { useParams, Link } from "react-router-dom";
import '../styles/BrandsDisplay.css';

const brandProducts = {
  adidas: [
    { name: "Adidas Polo T-Shirt", slug: "adidas-polo-tshirt", category: "Apparel and Accessories", image: "/assets/products/adidas-polo-tshirt.jpg" },
    { name: "Adidas Round Neck T-Shirt", slug: "adidas-round-neck-tshirt", category: "Apparel and Accessories", image: "/assets/products/adidas-round-neck-tshirt.jpg" },
    { name: "Adidas Cap", slug: "adidas-cap", category: "Apparel and Accessories", image: "/assets/products/adidas-cap.jpg" },
    { name: "Adidas Hoodie", slug: "adidas-hoodie", category: "Apparel and Accessories", image: "/assets/products/adidas-hoodie.jpg" },
    { name: "Adidas Sports Backpack", slug: "adidas-backpack", category: "Bags and Travel", image: "/assets/products/adidas-backpack.jpg" },
    { name: "Adidas Keychain", slug: "adidas-keychain", category: "Collection", image: "/assets/products/adidas-keychain.jpg" },
    { name: "Adidas Water Bottle", slug: "adidas-sipper", category: "Drink Ware", image: "/assets/products/adidas-sipper.jpg" },
  ],

  "american-tourister": [
    { name: "American Tourister Backpack", slug: "at-backpack", category: "Bags and Travel", image: "/assets/products/at-backpack.jpg" },
    { name: "American Tourister Duffle Bag", slug: "at-duffle-bag", category: "Bags and Travel", image: "/assets/products/at-duffle-bag.jpg" },
    { name: "American Tourister Tote Bag", slug: "at-tote-bag", category: "Bags and Travel", image: "/assets/products/at-tote-bag.jpg" },
    { name: "American Tourister Luggage", slug: "at-luggage", category: "Bags and Travel", image: "/assets/products/at-luggage.jpg" },
    { name: "American Tourister Travel Organizer", slug: "at-travel-organizer", category: "Bags and Travel", image: "/assets/products/at-travel-organizer.jpg" },
    { name: "American Tourister Accessories Pouch", slug: "at-accessory-pouch", category: "Bags and Travel", image: "/assets/products/at-accessory-pouch.jpg" },
  ],

  portronics: [
    { name: "Portronics Bluetooth Speaker", slug: "portronics-speaker", category: "Technology Accessories", image: "/assets/products/portronics-speaker.jpg" },
    { name: "Portronics Power Bank", slug: "portronics-powerbank", category: "Technology Accessories", image: "/assets/products/portronics-powerbank.jpg" },
    { name: "Portronics Wireless Charger", slug: "portronics-wireless-charger", category: "Technology Accessories", image: "/assets/products/portronics-wireless-charger.jpg" },
    { name: "Portronics Earphones", slug: "portronics-earphones", category: "Technology Accessories", image: "/assets/products/portronics-earphones.jpg" },
    { name: "Portronics USB Hub", slug: "portronics-usb-hub", category: "Technology Accessories", image: "/assets/products/portronics-usb-hub.jpg" },
    { name: "Portronics Mouse Pad", slug: "portronics-mousepad", category: "Technology Accessories", image: "/assets/products/portronics-mousepad.jpg" },
  ],

  noise: [
    { name: "Noise Smart Watch", slug: "noise-watch", category: "Technology Accessories", image: "/assets/products/noise-watch.jpg" },
    { name: "Noise Earbuds", slug: "noise-earbuds", category: "Technology Accessories", image: "/assets/products/noise-earbuds.jpg" },
    { name: "Noise Wireless Charger", slug: "noise-wireless-charger", category: "Technology Accessories", image: "/assets/products/noise-wireless-charger.jpg" },
    { name: "Noise Bluetooth Speaker", slug: "noise-speaker", category: "Technology Accessories", image: "/assets/products/noise-speaker.jpg" },
    { name: "Noise Desktop Accessories", slug: "noise-desktop-accessories", category: "Technology Accessories", image: "/assets/products/noise-desktop-accessories.jpg" },
    { name: "Noise Mouse Pad", slug: "noise-mousepad", category: "Technology Accessories", image: "/assets/products/noise-mousepad.jpg" },
  ],

  puma: [
    { name: "Puma Sneakers", slug: "puma-sneakers", category: "Apparel and Accessories", image: "/assets/products/puma-sneakers.jpg" },
    { name: "Puma Hoodie", slug: "puma-hoodie", category: "Apparel and Accessories", image: "/assets/products/puma-hoodie.jpg" },
    { name: "Puma Cap", slug: "puma-cap", category: "Apparel and Accessories", image: "/assets/products/puma-cap.jpg" },
    { name: "Puma Backpack", slug: "puma-backpack", category: "Bags and Travel", image: "/assets/products/puma-backpack.jpg" },
    { name: "Puma Water Bottle", slug: "puma-sipper", category: "Drink Ware", image: "/assets/products/puma-sipper.jpg" },
    { name: "Puma Keychain", slug: "puma-keychain", category: "Collection", image: "/assets/products/puma-keychain.jpg" },
  ],

  boat: [
    { name: "Boat Earphones", slug: "boat-earphones", category: "Technology Accessories", image: "/assets/products/boat-earphones.jpg" },
    { name: "Boat Bluetooth Speaker", slug: "boat-speaker", category: "Technology Accessories", image: "/assets/products/boat-speaker.jpg" },
    { name: "Boat Power Bank", slug: "boat-powerbank", category: "Technology Accessories", image: "/assets/products/boat-powerbank.jpg" },
    { name: "Boat Wireless Charger", slug: "boat-wireless-charger", category: "Technology Accessories", image: "/assets/products/boat-wireless-charger.jpg" },
    { name: "Boat Mouse Pad", slug: "boat-mousepad", category: "Technology Accessories", image: "/assets/products/boat-mousepad.jpg" },
    { name: "Boat Desktop Accessories", slug: "boat-desktop-accessories", category: "Technology Accessories", image: "/assets/products/boat-desktop-accessories.jpg" },
  ],

  "jack-and-jones": [
    { name: "Jack & Jones Polo T-Shirt", slug: "jack-polo-tshirt", category: "Apparel and Accessories", image: "/assets/products/jack-polo-tshirt.jpg" },
    { name: "Jack & Jones Round Neck T-Shirt", slug: "jack-round-neck-tshirt", category: "Apparel and Accessories", image: "/assets/products/jack-round-neck-tshirt.jpg" },
    { name: "Jack & Jones Cap", slug: "jack-cap", category: "Apparel and Accessories", image: "/assets/products/jack-cap.jpg" },
    { name: "Jack & Jones Hoodie", slug: "jack-hoodie", category: "Apparel and Accessories", image: "/assets/products/jack-hoodie.jpg" },
    { name: "Jack & Jones Tote Bag", slug: "jack-tote-bag", category: "Bags and Travel", image: "/assets/products/jack-tote-bag.jpg" },
    { name: "Jack & Jones Keychain", slug: "jack-keychain", category: "Collection", image: "/assets/products/jack-keychain.jpg" },
  ],

  wildcraft: [
    { name: "Wildcraft Backpack", slug: "wildcraft-backpack", category: "Bags and Travel", image: "/assets/products/wildcraft-backpack.jpg" },
    { name: "Wildcraft Foldable Bag", slug: "wildcraft-foldable-bag", category: "Bags and Travel", image: "/assets/products/wildcraft-foldable-bag.jpg" },
    { name: "Wildcraft Duffle Bag", slug: "wildcraft-duffle-bag", category: "Bags and Travel", image: "/assets/products/wildcraft-duffle-bag.jpg" },
    { name: "Wildcraft Tote Bag", slug: "wildcraft-tote-bag", category: "Bags and Travel", image: "/assets/products/wildcraft-tote-bag.jpg" },
    { name: "Wildcraft Cap", slug: "wildcraft-cap", category: "Apparel and Accessories", image: "/assets/products/wildcraft-cap.jpg" },
    { name: "Wildcraft Keychain", slug: "wildcraft-keychain", category: "Collection", image: "/assets/products/wildcraft-keychain.jpg" },
  ],

  "swiss-military": [
    { name: "Swiss Military Backpack", slug: "swiss-backpack", category: "Bags and Travel", image: "/assets/products/swiss-backpack.jpg" },
    { name: "Swiss Military Watch", slug: "swiss-watch", category: "Technology Accessories", image: "/assets/products/swiss-watch.jpg" },
    { name: "Swiss Military Cap", slug: "swiss-cap", category: "Apparel and Accessories", image: "/assets/products/swiss-cap.jpg" },
    { name: "Swiss Military Keychain", slug: "swiss-keychain", category: "Collection", image: "/assets/products/swiss-keychain.jpg" },
    { name: "Swiss Military Travel Organizer", slug: "swiss-travel-organizer", category: "Bags and Travel", image: "/assets/products/swiss-travel-organizer.jpg" },
  ],

  "rare-rabbit": [
    { name: "Rare Rabbit Polo T-Shirt", slug: "rare-polo-tshirt", category: "Apparel and Accessories", image: "/assets/products/rare-polo-tshirt.jpg" },
    { name: "Rare Rabbit Hoodie", slug: "rare-hoodie", category: "Apparel and Accessories", image: "/assets/products/rare-hoodie.jpg" },
    { name: "Rare Rabbit Tote Bag", slug: "rare-tote-bag", category: "Bags and Travel", image: "/assets/products/rare-tote-bag.jpg" },
    { name: "Rare Rabbit Keychain", slug: "rare-keychain", category: "Collection", image: "/assets/products/rare-keychain.jpg" },
    { name: "Rare Rabbit Water Bottle", slug: "rare-sipper", category: "Drink Ware", image: "/assets/products/rare-sipper.jpg" },
  ],

  fuzo: [
    { name: "Fuzo Bluetooth Speaker", slug: "fuzo-speaker", category: "Technology Accessories", image: "/assets/products/fuzo-speaker.jpg" },
    { name: "Fuzo Power Bank", slug: "fuzo-powerbank", category: "Technology Accessories", image: "/assets/products/fuzo-powerbank.jpg" },
    { name: "Fuzo Wireless Charger", slug: "fuzo-wireless-charger", category: "Technology Accessories", image: "/assets/products/fuzo-wireless-charger.jpg" },
    { name: "Fuzo Earphones", slug: "fuzo-earphones", category: "Technology Accessories", image: "/assets/products/fuzo-earphones.jpg" },
    { name: "Fuzo Mouse Pad", slug: "fuzo-mousepad", category: "Technology Accessories", image: "/assets/products/fuzo-mousepad.jpg" },
  ],

  "scott-international": [
    { name: "Scott International Backpack", slug: "scott-backpack", category: "Bags and Travel", image: "/assets/products/scott-backpack.jpg" },
    { name: "Scott International Duffle Bag", slug: "scott-duffle-bag", category: "Bags and Travel", image: "/assets/products/scott-duffle-bag.jpg" },
    { name: "Scott International Cap", slug: "scott-cap", category: "Apparel and Accessories", image: "/assets/products/scott-cap.jpg" },
    { name: "Scott International Keychain", slug: "scott-keychain", category: "Collection", image: "/assets/products/scott-keychain.jpg" },
  ],
};

const BrandsDisplay = () => {
  const { brand } = useParams();
  const products = brandProducts[brand] || [];

  return (
    <div className="brand-display-container">
      <h1 className="brand-display-heading">
        {brand.replace(/-/g, " ").toUpperCase()} Products
      </h1>

      {products.length === 0 ? (
        <p>No products found for this brand.</p>
      ) : (
        <div className="brand-products-grid">
          {products.map((product, index) => (
            <Link
              to={`/${brand}/${product.slug}`} 
              key={index}
              className="brand-product-card"
            >
              <img
                src={product.image}
                alt={product.name}
                className="brand-product-image"
              />
              <div className="brand-product-name">{product.name}</div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default BrandsDisplay;