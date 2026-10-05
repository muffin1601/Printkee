const mongoose = require("mongoose");

const linkSchema = new mongoose.Schema(
  { label: { type: String, trim: true }, url: { type: String, trim: true } },
  { _id: false }
);

const seoPageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    path: { type: String, required: true, unique: true, lowercase: true, trim: true },
    slug: { type: String, required: true, lowercase: true, trim: true },
    pageType: {
      type: String,
      enum: ["CORE_CATEGORY", "LOCATION", "CATEGORY_LOCATION", "CATEGORY_BUYER", "CATEGORY_BUYER_LOCATION", "OCCASION", "INDUSTRY", "HUB", "GUIDE"],
      required: true,
      index: true,
    },
    category: { type: String, default: "", trim: true, index: true },
    subcategory: { type: String, default: "", trim: true },
    location: { type: String, default: "", trim: true, index: true },
    buyerType: { type: String, default: "", trim: true, index: true },
    industry: { type: String, default: "", trim: true, index: true },
    occasion: { type: String, default: "", trim: true, index: true },
    useCase: { type: String, default: "", trim: true },
    searchIntent: { type: String, default: "commercial", trim: true },
    primaryKeyword: { type: String, required: true, trim: true },
    normalizedPrimaryKeyword: { type: String, required: true, lowercase: true, trim: true },
    secondaryKeywords: [{ type: String, trim: true }],
    seoTitle: { type: String, default: "", trim: true },
    metaDescription: { type: String, default: "", trim: true },
    h1: { type: String, default: "", trim: true },
    intro: { type: String, default: "", trim: true },
    bodyContent: { type: String, default: "", trim: true },
    contentBlocks: [{ heading: { type: String, trim: true }, body: { type: String, trim: true } }],
    faqs: [{ question: { type: String, trim: true }, answer: { type: String, trim: true } }],
    featuredProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    relatedCategories: [linkSchema],
    relatedPages: [linkSchema],
    relatedLocations: [linkSchema],
    parentPath: { type: String, default: "", lowercase: true, trim: true },
    ctaText: { type: String, default: "Request a Quote", trim: true },
    canonicalUrl: { type: String, default: "", trim: true },
    robots: {
      index: { type: Boolean, default: false },
      follow: { type: Boolean, default: true },
    },
    ogTitle: { type: String, default: "", trim: true },
    ogDescription: { type: String, default: "", trim: true },
    ogImage: { type: String, default: "", trim: true },
    schemaOptions: {
      collectionPage: { type: Boolean, default: true },
      itemList: { type: Boolean, default: true },
      faq: { type: Boolean, default: true },
      breadcrumb: { type: Boolean, default: true },
    },
    status: {
      type: String,
      enum: ["DRAFT", "QUALITY_REVIEW", "INDEXABLE", "NOINDEX", "ARCHIVED"],
      default: "DRAFT",
      index: true,
    },
    priority: { type: Number, min: 0, max: 1, default: 0.5 },
    searchDemandScore: { type: Number, min: 0, default: null },
    contentQualityScore: { type: Number, min: 0, max: 100, default: 0 },
    qualityIssues: [{ type: String }],
    maximumSimilarity: { type: Number, min: 0, max: 1, default: 0 },
    similarPagePath: { type: String, default: "" },
    lastReviewedAt: { type: Date, default: null },
    publishedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

seoPageSchema.index({ normalizedPrimaryKeyword: 1 }, { unique: true });
seoPageSchema.index({ status: 1, pageType: 1, priority: -1 });
seoPageSchema.index({ category: 1, location: 1, buyerType: 1 });

module.exports = mongoose.model("SeoPage", seoPageSchema);
