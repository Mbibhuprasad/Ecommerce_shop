const jwt = require("jsonwebtoken");
const User = require("../models/User");
const VendorApplication = require("../models/VendorApplication");
const AppError = require("../utils/AppError");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: { user },
  });
};

// Admin registration
exports.registerAdmin = async (req, res, next) => {
  try {
    const { name, email, password, adminSecretKey } = req.body;

    console.log("Received adminSecretKey:", adminSecretKey);
    console.log("Expected key:", process.env.ADMIN_SECRET_KEY);
    console.log("Keys match:", adminSecretKey === process.env.ADMIN_SECRET_KEY);

    if (!adminSecretKey || adminSecretKey !== process.env.ADMIN_SECRET_KEY) {
      return next(new AppError("Invalid admin registration key", 403));
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(new AppError("Admin already exists with this email", 400));
    }

    const admin = await User.create({
      name,
      email,
      password,
      role: "admin",
      isVendorApproved: true,
    });

    createSendToken(admin, 201, res);
  } catch (error) {
    next(error);
  }
};

// Regular user registration
exports.register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(new AppError("User already exists with this email", 400));
    }

    const user = await User.create({
      name,
      email,
      password,
      role: role || "user",
    });

    if (role === "vendor") {
      await VendorApplication.create({
        user: user._id,
        businessName: req.body.businessName,
        businessAddress: req.body.businessAddress,
        phone: req.body.phone,
        gstNumber: req.body.gstNumber,
        description: req.body.description,
      });
    }

    createSendToken(user, 201, res);
  } catch (error) {
    next(error);
  }
};

// Login
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new AppError("Please provide email and password", 400));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.comparePassword(password))) {
      return next(new AppError("Invalid email or password", 401));
    }

    if (user.role === "vendor" && !user.isVendorApproved) {
      return next(
        new AppError(
          "Your vendor account is pending approval. Please wait for admin approval.",
          403,
        ),
      );
    }

    createSendToken(user, 200, res);
  } catch (error) {
    next(error);
  }
};

// Get current user
exports.getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({
      status: "success",
      data: { user },
    });
  } catch (error) {
    next(error);
  }
};

// Development only - Create admin without key
exports.devCreateAdmin = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (process.env.NODE_ENV === "production") {
      return next(
        new AppError("This endpoint is not available in production", 403),
      );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(new AppError("Admin already exists with this email", 400));
    }

    const admin = await User.create({
      name,
      email,
      password,
      role: "admin",
      isVendorApproved: true,
    });

    console.log("✅ Admin created via dev endpoint:", admin.email);
    createSendToken(admin, 201, res);
  } catch (error) {
    next(error);
  }
};

// Update user profile
exports.updateMe = async (req, res, next) => {
  try {
    if (req.body.password) {
      return next(
        new AppError(
          "This route is not for password updates. Please use /updatePassword",
          400,
        ),
      );
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { name: req.body.name, email: req.body.email },
      { new: true, runValidators: true },
    );

    res.status(200).json({
      status: "success",
      data: { user: updatedUser },
    });
  } catch (error) {
    next(error);
  }
};

// Update password
exports.updatePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return next(new AppError("Please provide current and new password", 400));
    }

    const user = await User.findById(req.user.id).select("+password");

    if (!(await user.comparePassword(currentPassword))) {
      return next(new AppError("Current password is incorrect", 401));
    }

    user.password = newPassword;
    await user.save();

    createSendToken(user, 200, res);
  } catch (error) {
    next(error);
  }
};

// Get all admins (super admin only)
exports.getAllAdmins = async (req, res, next) => {
  try {
    // Check if requester is super admin (first admin created)
    const requester = await User.findById(req.user.id);
    const adminCount = await User.countDocuments({ role: "admin" });
    const isSuperAdmin =
      adminCount > 0 &&
      requester.createdAt ===
        (await User.findOne({ role: "admin" }).sort("createdAt")).createdAt;

    if (!isSuperAdmin && req.user.role !== "super_admin") {
      return next(new AppError("Only super admin can view all admins", 403));
    }

    const admins = await User.find({ role: "admin" }).select("-password");
    res.status(200).json({
      status: "success",
      results: admins.length,
      data: { admins },
    });
  } catch (error) {
    next(error);
  }
};

// Delete admin (super admin only)
exports.deleteAdmin = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Prevent deleting self
    if (id === req.user.id) {
      return next(
        new AppError("You cannot delete your own admin account", 400),
      );
    }

    const admin = await User.findById(id);
    if (!admin || admin.role !== "admin") {
      return next(new AppError("Admin not found", 404));
    }

    await User.findByIdAndDelete(id);
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};
