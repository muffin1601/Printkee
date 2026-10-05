const mongoose = require("mongoose");

const seoOpportunitySchema = new mongoose.Schema(
  {
    keyword: { type: String, required: true, trim: true },
    normalizedKeyword: { type: String, required: true, lowercase: true, trim: true, unique: true },
    searchVolume: { type: Number, default: null, min: 0 },
    difficulty: { type: Number, default: null, min: 0 },
    location: { type: String, default: "", trim: true },
    category: { type: String, default: "", trim: true },
    buyerType: { type: String, default: "", trim: true },
    intent: { type: String, default: "", trim: true },
    existingRanking: { type: Number, default: null, min: 0 },
    existingUrl: { type: String, default: "", trim: true },
    proposedUrl: { type: String, default: "", trim: true },
    pageNeeded: { type: Boolean, default: false },
    priority: { type: Number, min: 0, max: 100, default: 50 },
    status: { type: String, enum: ["NEW", "RESEARCH", "APPROVED", "REJECTED", "IMPLEMENTED"], default: "NEW" },
    notes: { type: String, default: "", trim: true },
    source: { type: String, default: "manual", trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SeoOpportunity", seoOpportunitySchema);
