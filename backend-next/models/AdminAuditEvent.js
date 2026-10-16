const mongoose = require("mongoose");

const adminAuditEventSchema = new mongoose.Schema({
  actor: { type: String, required: true, index: true },
  role: { type: String, required: true },
  operation: { type: String, required: true, index: true },
  requestId: { type: String, required: true, index: true },
  productIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  status: { type: String, enum: ["success", "partial", "failure"], required: true },
  details: { type: mongoose.Schema.Types.Mixed },
}, { timestamps: true });

adminAuditEventSchema.index({ createdAt: -1 });

module.exports = mongoose.model("AdminAuditEvent", adminAuditEventSchema);
