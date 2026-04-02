const express = require("express");
const {
  applyForVendor,
  getMyApplication,
  getAllApplications,
  approveVendor,
  rejectVendor,
  getAllVendors,
  getVendorStats,
  getVendorOrders,
  updateOrderStatus,
} = require("../controller/vendorController");
const { protect, restrictTo, verifyVendor } = require("../middleware/auth");

const router = express.Router();

// Protected routes
router.use(protect);

// Vendor application
router.post("/apply", applyForVendor);
router.get("/my-application", getMyApplication);

// Vendor only routes
router.get("/stats", verifyVendor, getVendorStats);
router.get("/orders", verifyVendor, getVendorOrders);
router.patch("/orders/:id", verifyVendor, updateOrderStatus);

// Admin only routes
router.use(restrictTo("admin"));
router.get("/applications", getAllApplications);
router.patch("/applications/:id/approve", approveVendor);
router.patch("/applications/:id/reject", rejectVendor);
router.get("/all", getAllVendors);

module.exports = router;
