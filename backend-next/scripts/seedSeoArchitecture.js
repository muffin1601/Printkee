require("dotenv").config();
const mongoose = require("mongoose");
const SeoTaxonomy = require("../models/SeoTaxonomy");
const SeoOpportunity = require("../models/SeoOpportunity");
const { normalizeKeyword } = require("../services/seoQuality");

const taxonomy = [
  ["LOCATION", "Delhi", "delhi"], ["LOCATION", "New Delhi", "new-delhi"], ["LOCATION", "Delhi NCR", "delhi-ncr"],
  ["LOCATION", "Noida", "noida"], ["LOCATION", "Greater Noida", "greater-noida"], ["LOCATION", "Gurgaon", "gurgaon"],
  ["LOCATION", "Ghaziabad", "ghaziabad"], ["LOCATION", "Faridabad", "faridabad"], ["LOCATION", "Mumbai", "mumbai"],
  ["LOCATION", "Pune", "pune"], ["LOCATION", "Bangalore", "bangalore"], ["LOCATION", "Hyderabad", "hyderabad"],
  ["LOCATION", "Chennai", "chennai"], ["LOCATION", "Kolkata", "kolkata"], ["LOCATION", "Ahmedabad", "ahmedabad"], ["LOCATION", "Lucknow", "lucknow"],
  ["BUYER_TYPE", "Employees", "employees"], ["BUYER_TYPE", "Clients", "clients"], ["BUYER_TYPE", "HR Teams", "hr-teams"],
  ["BUYER_TYPE", "Marketing Teams", "marketing-teams"], ["BUYER_TYPE", "Startups", "startups"], ["BUYER_TYPE", "Colleges", "colleges"],
  ["BUYER_TYPE", "Coaching Institutes", "coaching-institutes"], ["BUYER_TYPE", "Schools", "schools"],
  ["USE_CASE", "Employee Onboarding", "employee-onboarding"], ["USE_CASE", "Client Appreciation", "client-appreciation"],
  ["USE_CASE", "Conference Merchandise", "conference-merchandise"], ["USE_CASE", "Corporate Events", "corporate-events"],
  ["OCCASION", "Diwali", "diwali"], ["OCCASION", "New Year", "new-year"], ["OCCASION", "Women's Day", "womens-day"],
  ["INDUSTRY", "Information Technology", "information-technology"], ["INDUSTRY", "Education", "education"], ["INDUSTRY", "Real Estate", "real-estate"],
];

const opportunities = [
  ["corporate gifts delhi", "/delhi/corporate-gifts", "IMPLEMENTED"], ["corporate gifts noida", "/noida/corporate-gifts", "IMPLEMENTED"],
  ["corporate gifts gurgaon", "/gurgaon/corporate-gifts", "IMPLEMENTED"], ["employee welcome kits", "/collection/welcome-kits", "IMPLEMENTED"],
  ["custom corporate gifts", "/collection", "IMPLEMENTED"], ["corporate gifts mumbai", "/corporate-gifts/mumbai", "RESEARCH"],
  ["corporate gifts pune", "/corporate-gifts/pune", "RESEARCH"], ["corporate gifts bangalore", "/corporate-gifts/bangalore", "RESEARCH"],
  ["corporate gifts hyderabad", "/corporate-gifts/hyderabad", "RESEARCH"], ["corporate gifts chennai", "/corporate-gifts/chennai", "RESEARCH"],
  ["employee gifts delhi", "/employee-gifts/delhi", "RESEARCH"], ["employee gifts noida", "/employee-gifts/noida", "RESEARCH"],
  ["welcome kits delhi", "/welcome-kits/delhi", "RESEARCH"], ["welcome kits noida", "/welcome-kits/noida", "RESEARCH"],
  ["corporate diwali gifts delhi", "/corporate-diwali-gifts/delhi", "RESEARCH"], ["corporate diwali gifts noida", "/corporate-diwali-gifts/noida", "RESEARCH"],
  ["custom t shirts delhi", "/custom-tshirts/delhi", "RESEARCH"], ["custom t shirts noida", "/custom-tshirts/noida", "RESEARCH"],
  ["custom hoodies delhi", "/custom-hoodies/delhi", "RESEARCH"], ["custom hoodies noida", "/custom-hoodies/noida", "RESEARCH"],
  ["custom hoodies for coaching institutes", "/custom-hoodies/coaching-institutes", "RESEARCH"],
  ["custom hoodies for coaching institutes delhi", "/custom-hoodies/coaching-institutes/delhi", "RESEARCH"],
];

async function seed() {
  if (!process.env.MONGO_URI) throw new Error("MONGO_URI is required");
  await mongoose.connect(process.env.MONGO_URI);
  for (const [type, name, slug] of taxonomy) {
    await SeoTaxonomy.updateOne({ type, slug }, { $setOnInsert: { type, name, slug, status: "ACTIVE" } }, { upsert: true });
  }
  for (const [keyword, proposedUrl, status] of opportunities) {
    await SeoOpportunity.updateOne(
      { normalizedKeyword: normalizeKeyword(keyword) },
      { $setOnInsert: { keyword, normalizedKeyword: normalizeKeyword(keyword), proposedUrl, status, pageNeeded: status !== "IMPLEMENTED", source: "initial-conservative-seed" } },
      { upsert: true }
    );
  }
  console.log(`Seeded ${taxonomy.length} taxonomy entries and ${opportunities.length} opportunity records. No SEO landing pages were auto-published.`);
  await mongoose.disconnect();
}

seed().catch(async (error) => { console.error(error.message); await mongoose.disconnect(); process.exit(1); });
