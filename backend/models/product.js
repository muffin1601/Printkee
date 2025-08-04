const mongoose = require('mongoose');

const PriceSchema = new mongoose.Schema({
  priceCode: String,
  singlePrice: Number,
  sales_0_50: Number,
  sales_50_100: Number,
  sales_100_above: Number
}, { _id: true, timestamps: true });

const ProductSchema = new mongoose.Schema({
  productCode: String,
  name: String,
  description: String,
  HSNCode: String,
  type: String,
  quantity: Number,
  GSTRate: Number,
  fabricType: String,
  size: [String],
  colour: [String],
  price: PriceSchema,
  image: String,
  subImages: [String],
  tags: [String] 
}, { timestamps: true });

const SubcategorySchema = new mongoose.Schema({
  name: String,
  image: String,
  hoverImage: String,
  tag: String,
  products: [ProductSchema]
}, { timestamps: true });

const CategorySchema = new mongoose.Schema({
  name: String,
  image: String,
  hoverImage: String,
  tag: String,
  subcategories: [SubcategorySchema]
}, { timestamps: true });

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;
