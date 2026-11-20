const mongoose = require("mongoose");

const rowSchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, default: "", maxlength: 120 },
  items: [String],
}, { _id: false });

const schema = new mongoose.Schema({
  key: { type: String, default: "new-year-2027", unique: true, immutable: true },
  bannerMode: { type: String, enum: ["default", "custom", "none"], default: "default" },
  banner: {
    url: String,
    alt: String,
    width: Number,
    height: Number,
  },
  customProducts: [{
    name: { type: String, required: true, trim: true, maxlength: 120 },
    image: { type: String, required: true },
  }],
  productOverrides: { type: [new mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, trim: true, maxlength: 120 },
    image: String,
  }, { _id: false })], default: [] },
  // Rows of at most 4 products. `rows` is the earlier three-section format, read only as a fallback.
  layout: { type: [rowSchema], default: undefined },
  deletedProducts: [String],
  rows: {
    gifts: [String],
    diaries: [String],
    calendars: [String],
  },
}, { timestamps: true });

module.exports = mongoose.model("NewYearPage", schema);
