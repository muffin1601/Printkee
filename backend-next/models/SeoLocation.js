const mongoose = require("mongoose");

const seoLocationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    country: { type: String, required: true, trim: true, default: "India" },
    state: { type: String, default: "", trim: true },
    city: { type: String, default: "", trim: true },
    slug: { type: String, required: true, lowercase: true, trim: true },
    fullPath: { type: String, required: true, unique: true, lowercase: true, trim: true },
    parentLocation: { type: mongoose.Schema.Types.ObjectId, ref: "SeoLocation", default: null },
    level: { type: String, enum: ["COUNTRY", "STATE", "CITY", "SERVICE_AREA"], required: true, index: true },
    serviceFeasibility: {
      type: String,
      enum: ["VERIFIED", "CONDITIONAL", "NOT_VERIFIED", "UNSUPPORTED"],
      default: "NOT_VERIFIED",
      index: true,
    },
    locationSpecificInformation: { type: String, default: "", trim: true },
    orderingConstraints: { type: String, default: "", trim: true },
    fulfilmentConstraints: { type: String, default: "", trim: true },
    activeStatus: { type: String, enum: ["RESEARCH", "ACTIVE", "INACTIVE"], default: "RESEARCH", index: true },
  },
  { timestamps: true }
);

seoLocationSchema.index({ country: 1, state: 1, city: 1 });
seoLocationSchema.index({ activeStatus: 1, serviceFeasibility: 1 });

module.exports = mongoose.model("SeoLocation", seoLocationSchema);
