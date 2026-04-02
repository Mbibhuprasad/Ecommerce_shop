const mongoose = require("mongoose");

const vendorApplicationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  businessName: {
    type: String,
    required: true,
  },
  businessAddress: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  gstNumber: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  documents: [
    {
      type: String,
    },
  ],
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  adminRemarks: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  reviewedAt: Date,
  reviewedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("VendorApplication", vendorApplicationSchema);
