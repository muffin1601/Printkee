// seedCategories.js
require("dotenv").config();
const mongoose = require("mongoose");

// Your Category model (with subcategories + products + ProductSchema)
const Category = require("./models/Category"); // <-- make sure this is correct

// Your existing category structure file
const categoryData = require("./data/categoryData"); // <-- path to your big category file

async function seedCategories() {
  try {
    console.log("⏳ Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);

    console.log("✔ Connected to MongoDB");

    console.log("🗑 Clearing previous categories...");
    await Category.deleteMany({});

    console.log("📥 Inserting new categories...");
    await Category.insertMany(categoryData);

    console.log("🎉 Categories + Subcategories + Products Seeded Successfully!");

    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB");
  } catch (error) {
    console.error("❌ Seeding Error:", error);
    await mongoose.disconnect();
  }
}

seedCategories();
