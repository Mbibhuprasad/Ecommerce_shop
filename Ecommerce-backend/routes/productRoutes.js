const express = require("express");
const {
  createProduct,
  getMyProducts,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
} = require("../controller/productController");
const { protect, verifyVendor } = require("../middleware/auth");
const upload = require("../middleware/upload");

const router = express.Router();

// Public routes
router.get("/", getAllProducts);
router.get("/:id", getProduct);

// Protected vendor routes
router.use(protect, verifyVendor);
router.post("/", upload.array("images", 5), createProduct);
router.get("/my-products", getMyProducts);
router.patch("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
