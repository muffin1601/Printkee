import {
  FaLeaf,
  FaRecycle,
  FaTshirt,
  FaTruck,
  FaSuitcase,
  FaGift,
  FaPenNib,
  FaLaptop,
  FaClock,
  FaMugHot,
  FaKey,
  FaMedal,
  FaBoxOpen,
  FaClipboardList,
} from 'react-icons/fa';

const categoryHighlights = {
  "Bags And Travel": {
    heading: "Why Choose Our Bags & Travel Gear?",
    highlights: [
      { icon: <FaSuitcase />, title: "Durable & Stylish", description: "Perfect for travel and corporate gifting." },
      { icon: <FaGift />, title: "Custom Branding", description: "Add your company logo for a branded look." },
      { icon: <FaTruck />, title: "Fast Shipping", description: "Quick turnaround on all bulk orders." }
    ]
  },
  "Eco-Products": {
    heading: "Why Choose Our Eco-Friendly Products?",
    highlights: [
      { icon: <FaLeaf />, title: "Sustainable Choices", description: "Made from recycled or natural materials." },
      { icon: <FaRecycle />, title: "Zero Waste Packaging", description: "We keep packaging eco-conscious." },
      { icon: <FaTruck />, title: "Carbon Neutral Shipping", description: "Offset emissions on all deliveries." }
    ]
  },
  "Apparel And Accessories": {
    heading: "Why Choose Our Custom Apparel?",
    highlights: [
      { icon: <FaTshirt />, title: "Premium Quality", description: "Fabric and stitching built to impress." },
      { icon: <FaGift />, title: "Personalized Styles", description: "Multiple fits, fabrics, and branding options." },
      { icon: <FaTruck />, title: "Quick Delivery", description: "Even on high-volume custom orders." }
    ]
  },
  "Office and Writing": {
    heading: "Why Choose Our Office Essentials?",
    highlights: [
      { icon: <FaPenNib />, title: "Executive Gifts", description: "Elegant writing sets and diaries." },
      { icon: <FaGift />, title: "Custom Branding", description: "Make your stationery truly yours." },
      { icon: <FaTruck />, title: "Ready to Ship", description: "Always stocked for urgent requirements." }
    ]
  },
  "Technology Accessories": {
    heading: "Why Choose Our Tech Gifts?",
    highlights: [
      { icon: <FaLaptop />, title: "Modern & Useful", description: "Power banks, speakers, mousepads, and more." },
      { icon: <FaGift />, title: "Corporate Ready", description: "Great for employee and client appreciation." },
      { icon: <FaTruck />, title: "Safe Packaging", description: "Shipped with care and ready to use." }
    ]
  },
  "Trophy and Momento": {
    heading: "Why Choose Our Awards & Mementos?",
    highlights: [
      { icon: <FaMedal />, title: "Prestigious Designs", description: "Elegant trophies and recognition items." },
      { icon: <FaGift />, title: "Customizable Awards", description: "Engrave names, logos, or messages." },
      { icon: <FaTruck />, title: "Timely Delivery", description: "Delivered safely and on time for your events." }
    ]
  },
  "Collection": {
    heading: "Why Choose Our Curated Gift Collections?",
    highlights: [
      { icon: <FaBoxOpen />, title: "Thoughtful Kits", description: "Ready-to-go welcome and event kits." },
      { icon: <FaClock />, title: "Elegant Timepieces", description: "Promotional clocks with corporate branding." },
      { icon: <FaGift />, title: "Versatile Gifting", description: "Executive gifts, keychains, and more." }
    ]
  },
  "Drink Ware": {
    heading: "Why Choose Our Drinkware?",
    highlights: [
      { icon: <FaMugHot />, title: "Stylish & Practical", description: "Sippers, mugs, and bottles for everyday use." },
      { icon: <FaGift />, title: "Brand Visibility", description: "Your logo on frequently used items." },
      { icon: <FaTruck />, title: "Bulk Availability", description: "Easily available in large quantities." }
    ]
  }
};

export default categoryHighlights;
