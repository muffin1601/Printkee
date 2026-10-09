const mongoose = require("mongoose");

const seoKeywordSchema = new mongoose.Schema(
  {
    sourceKey: { type: String, required: true, unique: true, trim: true },
    sourceRow: { type: Number, required: true, min: 1 },
    originalKeyword: { type: String, required: true, trim: true },
    normalizedKeyword: { type: String, required: true, lowercase: true, trim: true, index: true },
    cluster: { type: String, default: "", trim: true, index: true },
    intent: { type: String, default: "", trim: true, index: true },
    priority: { type: String, default: "P3", trim: true, index: true },
    geography: {
      country: { type: String, default: "", trim: true },
      state: { type: String, default: "", trim: true },
      city: { type: String, default: "", trim: true },
    },
    commercialRelevance: { type: String, enum: ["HIGH", "MEDIUM", "LOW", "UNKNOWN"], default: "UNKNOWN" },
    existingTargetUrl: { type: String, default: "", trim: true },
    assignedCanonicalUrl: { type: String, default: "", trim: true, index: true },
    status: {
      type: String,
      enum: ["UNMAPPED", "MAPPED", "MERGED", "REJECTED", "DEFERRED", "APPROVED"],
      default: "UNMAPPED",
      index: true,
    },
    dispositionReason: { type: String, default: "", trim: true },
    source: { type: String, default: "csv-import", trim: true },
    sourceMetadata: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
);

seoKeywordSchema.index({ status: 1, priority: 1, cluster: 1 });
seoKeywordSchema.index({ "geography.country": 1, "geography.state": 1, "geography.city": 1 });

module.exports = mongoose.model("SeoKeyword", seoKeywordSchema);
