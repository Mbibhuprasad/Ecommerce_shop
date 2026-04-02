const Order = require("../models/Order");
const Product = require("../models/product");
const AppError = require("../utils/AppError");

// User: Create order
exports.createOrder = async (req, res, next) => {
  try {
    const { items, shippingAddress, paymentMethod } = req.body;

    // Group items by vendor
    const vendorItems = {};

    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return next(new AppError(`Product not found: ${item.product}`, 404));
      }

      if (!product.isActive) {
        return next(
          new AppError(`Product ${product.name} is not available`, 400),
        );
      }

      if (product.stock < item.quantity) {
        return next(
          new AppError(`Insufficient stock for ${product.name}`, 400),
        );
      }

      const vendorId = product.vendor.toString();
      if (!vendorItems[vendorId]) {
        vendorItems[vendorId] = {
          vendor: vendorId,
          items: [],
          total: 0,
        };
      }

      vendorItems[vendorId].items.push({
        product: item.product,
        quantity: item.quantity,
        price: product.price,
      });

      vendorItems[vendorId].total += product.price * item.quantity;
    }

    // Create separate orders for each vendor
    const orders = [];
    for (const vendorId in vendorItems) {
      const order = await Order.create({
        user: req.user.id,
        vendor: vendorId,
        items: vendorItems[vendorId].items,
        total: vendorItems[vendorId].total,
        shippingAddress,
        paymentMethod,
      });

      // Update stock
      for (const item of order.items) {
        await Product.findByIdAndUpdate(item.product, {
          $inc: { stock: -item.quantity },
        });
      }

      orders.push(order);
    }

    res.status(201).json({
      status: "success",
      data: { orders },
    });
  } catch (error) {
    next(error);
  }
};

// User: Get my orders
exports.getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate("vendor", "name vendorDetails")
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

// User: Get single order
exports.getOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("vendor", "name vendorDetails email")
      .populate("items.product", "name price images")
      .populate("user", "name email");

    if (!order) {
      return next(new AppError("Order not found", 404));
    }

    if (
      order.user._id.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return next(
        new AppError("You do not have permission to view this order", 403),
      );
    }

    res.status(200).json({
      status: "success",
      data: { order },
    });
  } catch (error) {
    next(error);
  }
};

// User: Cancel order
exports.cancelOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return next(new AppError("Order not found", 404));
    }

    if (order.user.toString() !== req.user.id && req.user.role !== "admin") {
      return next(
        new AppError("You do not have permission to cancel this order", 403),
      );
    }

    if (order.status !== "pending") {
      return next(new AppError("Order cannot be cancelled at this stage", 400));
    }

    // Restore stock
    for (const item of order.items) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { stock: item.quantity },
      });
    }

    order.status = "cancelled";
    await order.save();

    res.status(200).json({
      status: "success",
      data: { order },
    });
  } catch (error) {
    next(error);
  }
};

// Admin: Get all orders
exports.getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("vendor", "name vendorDetails")
      .populate("items.product", "name price")
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
