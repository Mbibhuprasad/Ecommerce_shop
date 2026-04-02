const jwt = require("jsonwebtoken");
const User = require("../models/User");
const AppError = require("../utils/AppError");

const protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return next(
        new AppError(
          "You are not logged in. Please log in to access this resource",
          401,
        ),
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return next(
        new AppError("The user belonging to this token no longer exists", 401),
      );
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to perform this action", 403),
      );
    }
    next();
  };
};

const verifyVendor = async (req, res, next) => {
  if (req.user.role !== "vendor") {
    return next(new AppError("Only vendors can access this resource", 403));
  }

  if (!req.user.isVendorApproved) {
    return next(new AppError("Your vendor account is not approved yet", 403));
  }

  next();
};

module.exports = { protect, restrictTo, verifyVendor };
