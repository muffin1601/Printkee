const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    subtitle: { type: String, default: "" },
    description: { type: String, default: "" },

    badgeText: { type: String, default: "" },

    image: { type: String, required: true },
    mobileImage: { type: String, default: "" },

    showButton: { type: Boolean, default: true },
    ctaText: { type: String, default: "" },
    ctaUrl: { type: String, default: "" },

    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

bannerSchema.index({ order: 1 });
bannerSchema.index({ isActive: 1 });

module.exports = mongoose.model("Banner", bannerSchema);
