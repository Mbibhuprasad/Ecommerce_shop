const User = require("../models/User");
const VendorApplication = require("../models/VendorApplication");
const Product = require("../models/product");
const Category = require("../models/Category");
const Order = require("../models/Order");
const AppError = require("../utils/AppError");

// Vendor Application
exports.applyForVendor = async (req, res, next) => {
  try {
    const existingApplication = await VendorApplication.findOne({
      user: req.user.id,
    });
    if (existingApplication) {
      return next(
        new AppError("You have already applied for vendor status", 400),
      );
    }

    const application = await VendorApplication.create({
      user: req.user.id,
      ...req.body,
    });

    res.status(201).json({
      status: "success",
      data: { application },
    });
  } catch (error) {
    next(error);
  }
};

exports.getMyApplication = async (req, res, next) => {
  try {
    const application = await VendorApplication.findOne({ user: req.user.id });
    res.status(200).json({
      status: "success",
      data: { application },
    });
  } catch (error) {
    next(error);
  }
};

// Admin: Get all vendor applications
exports.getAllApplications = async (req, res, next) => {
  try {
    const applications = await VendorApplication.find()
      .populate("user", "name email")
      .sort("-createdAt");

    res.status(200).json({
      status: "success",
      results: applications.length,
      data: { applications },
    });
  } catch (error) {
    next(error);
  }
};

// Admin: Approve vendor application
exports.approveVendor = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { adminRemarks } = req.body;

    const application = await VendorApplication.findById(id);
    if (!application) {
      return next(new AppError("Application not found", 404));
    }

    if (application.status !== "pending") {
      return next(new AppError("Application already processed", 400));
    }

    // Update application status
    application.status = "approved";
    application.adminRemarks = adminRemarks;
    application.reviewedAt = Date.now();
    application.reviewedBy = req.user.id;
    await application.save();

    // Update user role to vendor and add vendor details
    await User.findByIdAndUpdate(application.user, {
      role: "vendor",
      isVendorApproved: true,
      vendorDetails: {
        businessName: application.businessName,
        businessAddress: application.businessAddress,
        phone: application.phone,
        gstNumber: application.gstNumber,
        description: application.description,
      },
    });

    res.status(200).json({
      status: "success",
      message: "Vendor application approved successfully",
      data: { application },
    });
  } catch (error) {
    next(error);
  }
};

// Admin: Reject vendor application
exports.rejectVendor = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { adminRemarks } = req.body;

    const application = await VendorApplication.findById(id);
    if (!application) {
      return next(new AppError("Application not found", 404));
    }

    if (application.status !== "pending") {
      return next(new AppError("Application already processed", 400));
    }

    application.status = "rejected";
    application.adminRemarks = adminRemarks;
    application.reviewedAt = Date.now();
    application.reviewedBy = req.user.id;
    await application.save();

    res.status(200).json({
      status: "success",
      message: "Vendor application rejected",
      data: { application },
    });
  } catch (error) {
    next(error);
  }
};

// Admin: Get all vendors
exports.getAllVendors = async (req, res, next) => {
  try {
    const vendors = await User.find({ role: "vendor" })
      .select("-password")
      .sort("-createdAt");

    res.status(200).json({
      status: "success",
      results: vendors.length,
      data: { vendors },
    });
  } catch (error) {
    next(error);
  }
};

// Vendor: Get vendor dashboard stats
exports.getVendorStats = async (req, res, next) => {
  try {
    const products = await Product.countDocuments({ vendor: req.user.id });
    const orders = await Order.countDocuments({ vendor: req.user.id });
    const categories = await Category.countDocuments({ vendor: req.user.id });

    const totalRevenue = await Order.aggregate([
      { $match: { vendor: req.user._id, status: "delivered" } },
      { $group: { _id: null, total: { $sum: "$total" } } },
    ]);

    res.status(200).json({
      status: "success",
      data: {
        stats: {
          products,
          orders,
          categories,
          revenue: totalRevenue[0]?.total || 0,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

// Vendor: Get vendor orders
exports.getVendorOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ vendor: req.user.id })
      .populate("user", "name email")
      .populate("items.product", "name price images")
      .sort("-createdAt");

    res.status(200).json({
      status: "success",
      results: orders.length,
      data: { orders },
    });
  } catch (error) {
    next(error);
  }
};

// Vendor: Update order status
exports.updateOrderStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await Order.findOne({ _id: id, vendor: req.user.id });
    if (!order) {
      return next(new AppError("Order not found", 404));
    }

    order.status = status;
    await order.save();

    res.status(200).json({
      status: "success",
      data: { order },
    });
  } catch (error) {
    next(error);
  }
};
