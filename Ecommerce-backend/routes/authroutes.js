const express = require("express");
const {
  register,
  registerAdmin,
  devCreateAdmin,
  login,
  getMe,
  updateMe,
  updatePassword,
} = require("../controller/authController");
const { protect } = require("../middleware/auth");

const router = express.Router();

// Public routes
router.post("/register", register);
router.post("/register-admin", registerAdmin);
router.post("/login", login);

// Development only route (no secret key needed)
if (process.env.NODE_ENV !== "production") {
  router.post("/dev-create-admin", devCreateAdmin);
}

// Protected routes (require authentication)
router.use(protect);
router.get("/me", getMe);
router.patch("/updateMe", updateMe);
router.patch("/updatePassword", updatePassword);

module.exports = router;
