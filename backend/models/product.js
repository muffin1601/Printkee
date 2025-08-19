const mongoose = require('mongoose');


const AuditSchema = new mongoose.Schema({
  createdBy: { type: String, default: null },
  updatedBy: { type: String, default: null }
}, { _id: false });


const PriceSchema = new mongoose.Schema({
  priceCode: { type: String },
  singlePrice: Number,
  sales_0_50: Number,
  sales_50_100: Number,
  sales_100_above: Number,
  discountPrice: Number,
  discount: {
    type: { type: String, enum: ['flat', 'percentage'], default: null },
    value: Number,
    validUntil: Date
  },
  currency: { type: String, default: 'INR' },
  taxIncluded: { type: Boolean, default: false },
  effectiveFrom: Date,
  effectiveTo: Date
}, { timestamps: true });


const ProductSchema = new mongoose.Schema({
  productCode: { type: String},
  SKU: String,
  name: { type: String, required: true },
  slug: { type: String },
  description: String,
  HSNCode: String,
  type: String,
  quantity: { type: Number, default: 0 },
  GSTRate: Number,
  brand: String,
  fabricType: String,
  size: [String],
  colour: [String],
  weight: Number,
  dimensions: {
    length: Number,
    width: Number,
    height: Number
  },
  minOrderQty: Number,
  maxOrderQty: Number,
  availabilityDate: Date,
  price: PriceSchema,
  image: String,
  subImages: [String],
  tags: [String],
  keywords: [String],
  isFeatured: { type: Boolean, default: false },
  isPublished: { type: Boolean, default: true },
  isDeleted: { type: Boolean, default: false },
  ratings: {
    average: { type: Number, default: 0 },
    count: { type: Number, default: 0 }
  },
  metaTitle: String,
  metaDescription: String,
  audit: AuditSchema
}, { timestamps: true });


const SubcategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String },
  image: String,
  hoverImage: String,
  tag: String,
  products: [ProductSchema],
  isActive: { type: Boolean, default: true },
  isFeatured: { type: Boolean, default: false },
  sortOrder: { type: Number, default: 0 },
  metaTitle: String,
  metaDescription: String,
  audit: AuditSchema
}, { timestamps: true });


const CategorySchema = new mongoose.Schema({
  name: { type: String},
  slug: { type: String },
  image: String,
  hoverImage: String,
  tag: String,
  subcategories: [SubcategorySchema],
  isActive: { type: Boolean, default: true },
  sortOrder: { type: Number, default: 0 },
  metaTitle: String,
  metaDescription: String,
  audit: AuditSchema
}, { timestamps: true });


const Category = mongoose.model('Category', CategorySchema);
module.exports = Category;
