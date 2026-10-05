import fs from "node:fs/promises";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const apiBase = (process.env.SEO_API_BASE || "https://printkee.com/api").replace(/\/$/, "");
const csv = (value = "") => `"${String(value).replaceAll('"', '""')}"`;
const row = (values) => `${values.map(csv).join(",")}\n`;

const staticPages = [
  ["https://printkee.com/", "HOME", "corporate gifts India", "", "", "", "", "", "INDEXABLE", "https://printkee.com/", "", "", "", "", "", "Existing broad national commercial page"],
  ["https://printkee.com/collection", "CORE_CATEGORY", "custom corporate gifts", "collection", "", "", "", "", "INDEXABLE", "https://printkee.com/collection", "", "", "", "", "", "Existing product-led collection"],
  ["https://printkee.com/collection/welcome-kits", "CORE_CATEGORY", "employee welcome kits", "welcome-kits", "", "employees", "", "", "INDEXABLE", "https://printkee.com/collection/welcome-kits", "", "", "", "", "", "Existing onboarding authority"],
  ["https://printkee.com/locations", "HUB", "corporate gifts Delhi NCR", "", "Delhi NCR", "", "", "", "INDEXABLE", "https://printkee.com/locations", "", "", "", "", "", "Existing location hub"],
  ["https://printkee.com/corporate-gifting", "HUB", "corporate gifting planning", "", "India", "", "", "", "INDEXABLE", "https://printkee.com/corporate-gifting", "", "", "", "", "", "New navigation hub"],
  ["https://printkee.com/industries", "HUB", "corporate gifting by industry", "", "India", "", "", "", "INDEXABLE", "https://printkee.com/industries", "", "", "", "", "", "New navigation hub"],
  ["https://printkee.com/use-cases", "HUB", "corporate gifting use cases", "", "India", "", "", "", "INDEXABLE", "https://printkee.com/use-cases", "", "", "", "", "", "New navigation hub"],
];
const locations = [
  ["Delhi", "/delhi/corporate-gifts", "INDEXABLE", "Existing city page"], ["Noida", "/noida/corporate-gifts", "INDEXABLE", "Existing city page"],
  ["Greater Noida", "/greater-noida/corporate-gifts", "INDEXABLE", "Existing city page"], ["Gurgaon", "/gurgaon/corporate-gifts", "INDEXABLE", "Existing city page"],
  ["Faridabad", "/faridabad/corporate-gifts", "INDEXABLE", "Existing city page"], ["Ghaziabad", "/ghaziabad/corporate-gifts", "INDEXABLE", "Existing city page"],
  ...["Mumbai", "Pune", "Bangalore", "Hyderabad", "Chennai", "Kolkata", "Ahmedabad", "Lucknow"].map((location) => [location, "", "QUALITY_REVIEW", "Requires verified location-specific content and product fit before publication"]),
];

const inventoryHeader = ["URL", "Page Type", "Primary Keyword", "Category", "Location", "Buyer Type", "Industry", "Occasion", "Index Status", "Canonical", "Title", "H1", "Word Count", "Related Products Count", "Internal Links Count", "Last Updated", "Notes"];
const locationHeader = ["Location", "Canonical URL", "Index Status", "Notes"];
const keywordHeader = ["Primary Keyword", "Secondary Keywords", "Intent", "Page Type", "URL", "Category", "Location", "Buyer Type", "Industry", "Index Status", "Priority", "Notes"];
const keywords = [
  ["corporate gifts India", "corporate gifting; promotional merchandise", "Commercial investigation", "HOME", "/", "", "India", "", "", "INDEXABLE", "HIGH", "Existing homepage owns broad national intent"],
  ["custom corporate gifts", "customized corporate gifts; bulk corporate gifts", "Transactional", "CORE_CATEGORY", "/collection", "collection", "India", "", "", "INDEXABLE", "HIGH", "Existing product-led collection"],
  ["employee welcome kits", "joining kits; onboarding kits", "Commercial investigation", "CORE_CATEGORY", "/collection/welcome-kits", "welcome-kits", "India", "employees", "", "INDEXABLE", "HIGH", "Existing authority; avoid duplicate page"],
  ["corporate gifts Delhi", "custom corporate gifts Delhi", "Local commercial", "LOCATION", "/delhi/corporate-gifts", "", "Delhi", "", "", "INDEXABLE", "HIGH", "Existing verified city route"],
  ["corporate gifts Noida", "custom corporate gifts Noida", "Local commercial", "LOCATION", "/noida/corporate-gifts", "", "Noida", "", "", "INDEXABLE", "HIGH", "Existing verified city route"],
  ["corporate gifts Gurgaon", "custom corporate gifts Gurgaon; corporate gifts Gurugram", "Local commercial", "LOCATION", "/gurgaon/corporate-gifts", "", "Gurgaon", "", "", "INDEXABLE", "HIGH", "Existing route; Gurugram redirects here"],
  ["corporate gifts Mumbai", "corporate gifting Mumbai", "Local commercial", "CATEGORY_LOCATION", "/corporate-gifts/mumbai", "corporate-gifts", "Mumbai", "", "", "QUALITY_REVIEW", "MEDIUM", "Do not publish until unique location data/product fit are approved"],
  ["employee gifts Delhi", "employee appreciation gifts Delhi", "Commercial investigation", "CATEGORY_LOCATION", "/employee-gifts/delhi", "employee-gifts", "Delhi", "employees", "", "QUALITY_REVIEW", "MEDIUM", "Candidate only"],
  ["welcome kits Noida", "employee onboarding kits Noida", "Commercial investigation", "CATEGORY_LOCATION", "/welcome-kits/noida", "welcome-kits", "Noida", "employees", "", "QUALITY_REVIEW", "MEDIUM", "Candidate only"],
  ["custom hoodies for coaching institutes", "coaching institute hoodies; printed coaching hoodies", "Transactional", "CATEGORY_BUYER", "/custom-hoodies/coaching-institutes", "custom-hoodies", "", "coaching institutes", "education", "QUALITY_REVIEW", "MEDIUM", "Requires relevant products and approved content"],
  ["custom hoodies for coaching institutes Delhi", "printed coaching hoodies Delhi", "Local commercial", "CATEGORY_BUYER_LOCATION", "/custom-hoodies/coaching-institutes/delhi", "custom-hoodies", "Delhi", "coaching institutes", "education", "QUALITY_REVIEW", "LOW", "Candidate only; strict similarity review required"],
  ["corporate Diwali gifts Delhi", "Diwali gifts for employees Delhi", "Seasonal commercial", "CATEGORY_LOCATION", "/corporate-diwali-gifts/delhi", "diwali-special", "Delhi", "employees", "", "QUALITY_REVIEW", "MEDIUM", "Seasonal content must be current and verified"],
];
await fs.writeFile(path.join(root, "SEO_PAGE_INVENTORY.csv"), inventoryHeader.join(",") + "\n" + staticPages.map((entry) => row([...entry.slice(0, 9), entry[9], entry[10], entry[11], entry[12], entry[13], entry[14], new Date().toISOString().slice(0, 10), entry[15]])).join(""));
await fs.writeFile(path.join(root, "SEO_LOCATION_MATRIX.csv"), locationHeader.join(",") + "\n" + locations.map((entry) => row(entry)).join(""));
await fs.writeFile(path.join(root, "SEO_KEYWORD_MAP_V2.csv"), keywordHeader.join(",") + "\n" + keywords.map(row).join(""));
console.log("Generated SEO_PAGE_INVENTORY.csv, SEO_LOCATION_MATRIX.csv and SEO_KEYWORD_MAP_V2.csv");
