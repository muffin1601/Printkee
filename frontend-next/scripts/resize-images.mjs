import sharp from "sharp";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const A = (p) => path.join(root, "public/assets", p);

// [file, maxWidth, quality]
const jobs = [
  // ShopByOccasion cards — displayed ~385×217, allow 2× + mobile full-width
  ["conference.webp", 1000, 72],
  ["festive.webp", 1000, 72],
  ["client.webp", 1000, 72],
  ["onboarding.webp", 1000, 72],
  // Footer logo — displayed ~63×26, allow generous 2×
  ["printkeeLogo.webp", 200, 80],
];

// CategorySlider icons — displayed 68×68, allow 2×
const catDir = path.join(root, "public/assets/categories");
const catFiles = fs.readdirSync(catDir).filter((f) => f.endsWith(".webp"));

const run = async () => {
  for (const [file, maxW, q] of jobs) {
    const p = A(file);
    const src = fs.readFileSync(p);
    const before = src.length;
    const buf = await sharp(src)
      .resize({ width: maxW, withoutEnlargement: true })
      .webp({ quality: q })
      .toBuffer();
    fs.writeFileSync(p, buf);
    console.log(`${file}: ${(before / 1024).toFixed(0)}KiB -> ${(buf.length / 1024).toFixed(0)}KiB`);
  }
  for (const file of catFiles) {
    const p = path.join(catDir, file);
    const src = fs.readFileSync(p);
    const before = src.length;
    const buf = await sharp(src)
      .resize({ width: 160, height: 160, fit: "inside", withoutEnlargement: true })
      .webp({ quality: 80 })
      .toBuffer();
    fs.writeFileSync(p, buf);
    console.log(`categories/${file}: ${(before / 1024).toFixed(0)}KiB -> ${(buf.length / 1024).toFixed(0)}KiB`);
  }
};

run().catch((e) => { console.error(e); process.exit(1); });
