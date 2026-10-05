const mongoose = require("mongoose");

const seoTaxonomySchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["CATEGORY", "LOCATION", "BUYER_TYPE", "INDUSTRY", "OCCASION", "USE_CASE", "SEARCH_INTENT"],
      required: true,
      index: true,
    },
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, lowercase: true, trim: true },
    aliases: [{ type: String, trim: true }],
    description: { type: String, default: "", trim: true },
    serviceInformation: { type: String, default: "", trim: true },
    nearbyAreas: [{ type: String, trim: true }],
    parent: { type: mongoose.Schema.Types.ObjectId, ref: "SeoTaxonomy", default: null },
    status: { type: String, enum: ["ACTIVE", "INACTIVE"], default: "ACTIVE", index: true },
    priority: { type: Number, min: 0, max: 100, default: 50 },
  },
  { timestamps: true }
);

seoTaxonomySchema.index({ type: 1, slug: 1 }, { unique: true });

module.exports = mongoose.model("SeoTaxonomy", seoTaxonomySchema);
