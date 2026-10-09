const mongoose = require("mongoose");

const seoAuditEventSchema = new mongoose.Schema(
  {
    batchId: { type: String, required: true, trim: true, index: true },
    actor: { type: String, required: true, trim: true },
    action: { type: String, required: true, trim: true, index: true },
    entityType: { type: String, required: true, trim: true },
    entityIds: [{ type: mongoose.Schema.Types.ObjectId }],
    preview: { type: Boolean, default: false },
    beforeSummary: { type: mongoose.Schema.Types.Mixed, default: {} },
    afterSummary: { type: mongoose.Schema.Types.Mixed, default: {} },
    metadata: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
);

seoAuditEventSchema.index({ createdAt: -1, action: 1 });

module.exports = mongoose.model("SeoAuditEvent", seoAuditEventSchema);
