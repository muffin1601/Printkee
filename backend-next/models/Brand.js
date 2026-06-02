const mongoose = require("mongoose");

const BrandSchema = new mongoose.Schema(
  {
    name:        { type: String, required: true, trim: true },
    slug:        { type: String, required: true, unique: true, lowercase: true, trim: true },
    logo:        { type: String, default: "" },
    description: { type: String, default: "" },
    tags:        [{ type: String }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Brand", BrandSchema);
