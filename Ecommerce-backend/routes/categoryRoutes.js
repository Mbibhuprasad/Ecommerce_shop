const express = require("express");
const {
  createCategory,
  getMyCategories,
  updateCategory,
  deleteCategory,
  getAllCategories,
} = require("../controller/categoryController");
const { protect, verifyVendor } = require("../middleware/auth");

const router = express.Router();

// Public routes
router.get("/", getAllCategories);

// Protected vendor routes
router.use(protect, verifyVendor);
router.post("/", createCategory);
router.get("/my-categories", getMyCategories);
router.patch("/:id", updateCategory);
router.delete("/:id", deleteCategory);

module.exports = router;
