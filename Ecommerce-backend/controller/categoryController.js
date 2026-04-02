const Category = require("../models/Category");
const Product = require("../models/product");
const AppError = require("../utils/AppError");

// Vendor: Create category
exports.createCategory = async (req, res, next) => {
  try {
    const { name, description } = req.body;

    const existingCategory = await Category.findOne({
      name,
      vendor: req.user.id,
    });
    if (existingCategory) {
      return next(
        new AppError("You already have a category with this name", 400),
      );
    }

    const category = await Category.create({
      name,
      description,
      vendor: req.user.id,
    });

    res.status(201).json({
      status: "success",
      data: { category },
    });
  } catch (error) {
    next(error);
  }
};

// Vendor: Get all my categories
exports.getMyCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({ vendor: req.user.id }).sort(
      "-createdAt",
    );

    res.status(200).json({
      status: "success",
      results: categories.length,
      data: { categories },
    });
  } catch (error) {
    next(error);
  }
};

// Vendor: Update category
exports.updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await Category.findOne({ _id: id, vendor: req.user.id });

    if (!category) {
      return next(new AppError("Category not found", 404));
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { name: req.body.name, description: req.body.description },
      { new: true, runValidators: true },
    );

    res.status(200).json({
      status: "success",
      data: { category: updatedCategory },
    });
  } catch (error) {
    next(error);
  }
};

// Vendor: Delete category
exports.deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await Category.findOne({ _id: id, vendor: req.user.id });

    if (!category) {
      return next(new AppError("Category not found", 404));
    }

    // Check if category has products
    const productsCount = await Product.countDocuments({ category: id });
    if (productsCount > 0) {
      return next(
        new AppError("Cannot delete category with existing products", 400),
      );
    }

    await Category.findByIdAndDelete(id);

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

// Public: Get all categories
exports.getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({ isActive: true })
      .populate("vendor", "name vendorDetails")
      .sort("name");

    res.status(200).json({
      status: "success",
      results: categories.length,
      data: { categories },
    });
  } catch (error) {
    next(error);
  }
};
