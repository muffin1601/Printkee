const mongoose = require("mongoose");

const seoCandidateSchema = new mongoose.Schema(
  {
    proposedPath: { type: String, required: true, unique: true, lowercase: true, trim: true },
    targetKeyword: { type: String, required: true, trim: true },
    targetKeywordCluster: { type: String, default: "", trim: true, index: true },
    entityType: { type: String, enum: ["CATEGORY", "SUBCATEGORY", "PRODUCT"], required: true, index: true },
    entityKey: { type: String, required: true, trim: true, index: true },
    entityName: { type: String, required: true, trim: true },
    categorySlug: { type: String, default: "", trim: true },
    subcategorySlug: { type: String, default: "", trim: true },
    productSlug: { type: String, default: "", trim: true },
    modifier: { type: String, default: "", trim: true, index: true },
    locationSlug: { type: String, required: true, trim: true, index: true },
    locationName: { type: String, required: true, trim: true },
    locationLevel: { type: String, enum: ["COUNTRY", "STATE", "CITY", "SERVICE_AREA"], required: true },
    commercialIntent: { type: String, default: "COMMERCIAL", trim: true },
    expectedBusinessValue: { type: String, enum: ["HIGH", "MEDIUM", "LOW", "UNKNOWN"], default: "UNKNOWN" },
    canonicalPath: { type: String, default: "", lowercase: true, trim: true, index: true },
    competingUrl: { type: String, default: "", trim: true },
    contentGaps: [{ type: String, trim: true }],
    validationFindings: [{ type: String, trim: true }],
    dispositionReason: { type: String, required: true, trim: true },
    priority: { type: Number, min: 0, max: 100, default: 25, index: true },
    qualityScore: { type: Number, min: 0, max: 100, default: 0 },
    similarityScore: { type: Number, min: 0, max: 1, default: 0 },
    routeConflict: { type: Boolean, default: false, index: true },
    cannibalizationWarning: { type: Boolean, default: false, index: true },
    serviceVerified: { type: Boolean, default: false },
    hasApplicableProducts: { type: Boolean, default: false },
    hasUniqueLocationInformation: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ["CANDIDATE", "REJECTED", "MERGED", "DRAFT", "REVIEW", "APPROVED", "PUBLISHED", "CANONICALIZED", "ARCHIVED"],
      default: "CANDIDATE",
      index: true,
    },
    indexable: { type: Boolean, default: false, index: true },
    sitemapIncluded: { type: Boolean, default: false, index: true },
    lastEvaluatedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

seoCandidateSchema.index({ status: 1, priority: -1, proposedPath: 1 });
seoCandidateSchema.index({ locationSlug: 1, entityType: 1, entityKey: 1 });
seoCandidateSchema.index({ indexable: 1, sitemapIncluded: 1, status: 1 });

module.exports = mongoose.model("SeoCandidate", seoCandidateSchema);
