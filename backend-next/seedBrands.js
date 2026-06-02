/**
 * One-time migration: seeds all brands from the static brandsspl.jsx data
 * into the brands MongoDB collection.
 *
 * Run once:  node seedBrands.js
 *
 * Safe to re-run — uses upsert so existing records are not duplicated.
 */

require("dotenv").config();
const mongoose = require("mongoose");
const Brand = require("./models/Brand");

const brands = [
  {
    name: "Adidas",
    slug: "adidas",
    logo: "/assets/brands/adidas.webp",
    description:
      "Adidas is a global leader in sportswear and accessories, offering premium quality apparel, footwear, and accessories designed for performance and lifestyle.",
    tags: ["adidas", "sportswear", "footwear", "lifestyle clothing", "athletic wear", "sports accessories"],
  },
  {
    name: "American Tourister",
    slug: "american-tourister",
    logo: "/assets/brands/american.webp",
    description:
      "American Tourister is a renowned travel gear brand offering durable and stylish luggage, backpacks, and travel accessories for professionals and travelers.",
    tags: ["american tourister", "luggage", "backpacks", "travel accessories", "suitcases", "bags"],
  },
  {
    name: "Portronics",
    slug: "portronics",
    logo: "/assets/brands/portronics.webp",
    description:
      "Portronics is an innovative Indian brand known for its portable electronics, audio products, and lifestyle gadgets.",
    tags: ["portronics", "electronics", "portable speakers", "power banks", "gadgets", "audio devices"],
  },
  {
    name: "Noise",
    slug: "noise",
    logo: "/assets/brands/noise.webp",
    description:
      "Noise is a leading Indian lifestyle tech brand specializing in smartwatches, wireless earbuds, and connected devices.",
    tags: ["noise", "smartwatches", "wireless earbuds", "wearables", "audio devices", "tech accessories"],
  },
  {
    name: "Puma",
    slug: "puma",
    logo: "/assets/brands/puma.webp",
    description:
      "Puma is a top global sports brand offering stylish and performance-driven footwear, apparel, and accessories for athletes and lifestyle enthusiasts.",
    tags: ["puma", "sportswear", "athletic shoes", "sports apparel", "lifestyle clothing", "footwear"],
  },
  {
    name: "Boat",
    slug: "boat",
    logo: "/assets/brands/boat.webp",
    description:
      "boAt is India's fastest-growing consumer electronics brand, specializing in headphones, speakers, and lifestyle tech products.",
    tags: ["boat", "audio devices", "headphones", "wireless earbuds", "speakers", "lifestyle electronics"],
  },
  {
    name: "Jack & Jones",
    slug: "jack-and-jones",
    logo: "/assets/brands/jackjones.webp",
    description:
      "Jack & Jones is a leading European fashion brand that offers stylish menswear, including jeans, shirts, and accessories.",
    tags: ["jack & jones", "menswear", "denim", "fashion", "casual clothing", "jackets"],
  },
  {
    name: "Wildcraft",
    slug: "wildcraft",
    logo: "/assets/brands/wildcraft.webp",
    description:
      "Wildcraft is an Indian outdoor and adventure gear brand known for backpacks, apparel, and travel accessories.",
    tags: ["wildcraft", "outdoor gear", "backpacks", "travel accessories", "hiking gear", "luggage"],
  },
  {
    name: "Swiss Military",
    slug: "swiss-military",
    logo: "/assets/brands/swiss.webp",
    description:
      "Swiss Military offers premium-quality travel gear, watches, and accessories that blend Swiss engineering with rugged design.",
    tags: ["swiss military", "watches", "luggage", "travel accessories", "backpacks", "outdoor gear"],
  },
  {
    name: "Rare Rabbit",
    slug: "rare-rabbit",
    logo: "/assets/brands/rare-rabbit.webp",
    description:
      "Rare Rabbit is a premium fashion brand offering contemporary and stylish menswear for modern professionals.",
    tags: ["rare rabbit", "menswear", "fashion", "shirts", "jackets", "luxury clothing"],
  },
  {
    name: "Fuzo",
    slug: "fuzo",
    logo: "/assets/brands/fuzo.webp",
    description:
      "Fuzo is a gifting and corporate branding solutions company that specializes in premium tech and lifestyle accessories.",
    tags: ["fuzo", "corporate gifts", "tech accessories", "branding", "gadgets", "custom gifts"],
  },
  {
    name: "Scott International",
    slug: "scott-international",
    logo: "/assets/brands/scott.webp",
    description:
      "Scott International offers casual and stylish apparel, focusing on comfortable fashion for everyday wear.",
    tags: ["scott international", "casual clothing", "menswear", "fashion", "t-shirts", "shirts"],
  },
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("✅ MongoDB connected");

  let inserted = 0;
  let updated = 0;

  for (const brand of brands) {
    const result = await Brand.findOneAndUpdate(
      { slug: brand.slug },
      { $set: brand },
      { upsert: true, new: true, runValidators: true }
    );
    if (result.createdAt && result.createdAt.getTime() === result.updatedAt.getTime()) {
      inserted++;
    } else {
      updated++;
    }
    console.log(`  ${brand.slug}`);
  }

  console.log(`\n✅ Done — ${inserted} inserted, ${updated} updated`);
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
