const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  key: { type: String, default: "new-year-2027", unique: true, immutable: true },
  bannerMode: { type: String, enum: ["default", "custom", "none"], default: "default" },
  banner: {
    url: String,
    alt: String,
    width: Number,
    height: Number,
  },
  rows: {
    gifts: [String],
    diaries: [String],
    calendars: [String],
  },
}, { timestamps: true });

module.exports = mongoose.model("NewYearPage", schema);
