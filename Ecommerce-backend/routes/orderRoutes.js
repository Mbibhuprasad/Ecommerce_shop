const express = require("express");
const {
  createOrder,
  getMyOrders,
  getOrder,
  cancelOrder,
  getAllOrders,
} = require("../controller/orderController");
const { protect, restrictTo } = require("../middleware/auth");

const router = express.Router();

router.use(protect);

// User routes
router.post("/", createOrder);
router.get("/my-orders", getMyOrders);
router.get("/:id", getOrder);
router.patch("/:id/cancel", cancelOrder);

// Admin routes
router.use(restrictTo("admin"));
router.get("/", getAllOrders);

module.exports = router;
