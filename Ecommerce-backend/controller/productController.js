const Product = require("../models/product");
const Category = require("../models/Category");
const AppError = require("../utils/AppError");

// Vendor: Create product
exports.createProduct = async (req, res, next) => {
  try {
    const { category, name, description, price, stock } = req.body;

    // Verify category belongs to vendor
    const categoryExists = await Category.findOne({
      _id: category,
      vendor: req.user.id,
    });
    if (!categoryExists) {
      return next(new AppError("Invalid category", 400));
    }

    const product = await Product.create({
      name,
      description,
      price,
      category,
      stock,
      vendor: req.user.id,
      images: req.files ? req.files.map((file) => file.path) : [],
    });

    res.status(201).json({
      status: "success",
      data: { product },
    });
  } catch (error) {
    next(error);
  }
};

// Vendor: Get my products
exports.getMyProducts = async (req, res, next) => {
  try {
    const { category } = req.query;
    let query = { vendor: req.user.id };

    if (category) {
      query.category = category;
    }

    const products = await Product.find(query)
      .populate("category", "name")
      .sort("-createdAt");

    res.status(200).json({
      status: "success",
      results: products.length,
      data: { products },
    });
  } catch (error) {
    next(error);
  }
};

// Vendor: Update product
exports.updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findOne({ _id: id, vendor: req.user.id });

    if (!product) {
      return next(new AppError("Product not found", 404));
    }

    // If updating category, verify it belongs to vendor
    if (req.body.category) {
      const categoryExists = await Category.findOne({
        _id: req.body.category,
        vendor: req.user.id,
      });
      if (!categoryExists) {
        return next(new AppError("Invalid category", 400));
      }
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    }).populate("category", "name");

    res.status(200).json({
      status: "success",
      data: { product: updatedProduct },
    });
  } catch (error) {
    next(error);
  }
};

// Vendor: Delete product
exports.deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findOne({ _id: id, vendor: req.user.id });

    if (!product) {
      return next(new AppError("Product not found", 404));
    }

    await Product.findByIdAndDelete(id);

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

// Public: Get all products
exports.getAllProducts = async (req, res, next) => {
  try {
    const { category, search, minPrice, maxPrice, vendor, sort } = req.query;
    let query = { isActive: true };

    if (category) {
      query.category = category;
    }

    if (vendor) {
      query.vendor = vendor;
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    let productsQuery = Product.find(query)
      .populate("category", "name")
      .populate("vendor", "name vendorDetails");

    if (sort) {
      const sortBy = sort.split(",").join(" ");
      productsQuery = productsQuery.sort(sortBy);
    } else {
      productsQuery = productsQuery.sort("-createdAt");
    }

    const products = await productsQuery;

    res.status(200).json({
      status: "success",
      results: products.length,
      data: { products },
    });
  } catch (error) {
    next(error);
  }
};

// Public: Get single product
exports.getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("category", "name")
      .populate("vendor", "name vendorDetails");

    if (!product) {
      return next(new AppError("Product not found", 404));
    }

    res.status(200).json({
      status: "success",
      data: { product },
    });
  } catch (error) {
    next(error);
  }
};
