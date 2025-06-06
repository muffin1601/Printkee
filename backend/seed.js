// seedCategories.js
require('dotenv').config(); // loads MONGO_URI from .env
const mongoose = require('mongoose');
const Category = require('./models/product'); // update this path
const categoryData = require('./data/categoryData');   // update this path

async function seedCategories() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // Clear existing categories before seeding
    await Category.deleteMany({});
    console.log('Existing categories cleared');

    // Insert new categories
    await Category.insertMany(categoryData);
    console.log('Categories seeded successfully');

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (err) {
    console.error('Seeding error:', err);
    await mongoose.disconnect();
  }
}

seedCategories();
