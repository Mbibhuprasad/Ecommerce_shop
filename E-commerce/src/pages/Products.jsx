// src/pages/Products.jsx
import React, { useState, useEffect } from "react";
import { getProducts, getCategories } from "../services/api";
import ProductCard from "../components/ProductCard";
import { FiSearch, FiFilter, FiX } from "react-icons/fi";
import toast from "react-hot-toast";

// Dummy Data
const dummyCategories = [
  {
    _id: "1",
    name: "Electronics",
    description: "Latest gadgets and electronics",
  },
  { _id: "2", name: "Clothing", description: "Fashionable clothing for all" },
  { _id: "3", name: "Home & Living", description: "Beautiful home decor" },
  { _id: "4", name: "Books", description: "Best selling books" },
  { _id: "5", name: "Sports", description: "Sports equipment and gear" },
];

const dummyProducts = [
  // Electronics (Category 1)
  {
    _id: "101",
    name: "Wireless Headphones",
    description: "Premium wireless headphones with noise cancellation",
    price: 99.99,
    category: { _id: "1", name: "Electronics" },
    vendor: { _id: "v1", name: "Tech Store" },
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
    ],
    stock: 50,
    ratings: 4.5,
  },
  {
    _id: "102",
    name: "Smart Watch",
    description: "Feature-rich smartwatch with health tracking",
    price: 199.99,
    category: { _id: "1", name: "Electronics" },
    vendor: { _id: "v1", name: "Tech Store" },
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop",
    ],
    stock: 30,
    ratings: 4.8,
  },
  {
    _id: "103",
    name: "Laptop Backpack",
    description: "Water-resistant laptop backpack with USB port",
    price: 49.99,
    category: { _id: "1", name: "Electronics" },
    vendor: { _id: "v1", name: "Tech Store" },
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop",
    ],
    stock: 100,
    ratings: 4.3,
  },
  {
    _id: "104",
    name: "Wireless Mouse",
    description: "Ergonomic wireless mouse with long battery life",
    price: 29.99,
    category: { _id: "1", name: "Electronics" },
    vendor: { _id: "v1", name: "Tech Store" },
    images: [
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=300&fit=crop",
    ],
    stock: 200,
    ratings: 4.6,
  },
  {
    _id: "105",
    name: "Mechanical Keyboard",
    description: "RGB mechanical keyboard with blue switches",
    price: 89.99,
    category: { _id: "1", name: "Electronics" },
    vendor: { _id: "v1", name: "Tech Store" },
    images: [
      "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=300&h=300&fit=crop",
    ],
    stock: 75,
    ratings: 4.7,
  },

  // Clothing (Category 2)
  {
    _id: "201",
    name: "Men's Denim Jacket",
    description: "Classic denim jacket for men",
    price: 79.99,
    category: { _id: "2", name: "Clothing" },
    vendor: { _id: "v2", name: "Fashion Hub" },
    images: [
      "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=300&h=300&fit=crop",
    ],
    stock: 40,
    ratings: 4.4,
  },
  {
    _id: "202",
    name: "Women's Summer Dress",
    description: "Floral summer dress for women",
    price: 59.99,
    category: { _id: "2", name: "Clothing" },
    vendor: { _id: "v2", name: "Fashion Hub" },
    images: [
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=300&h=300&fit=crop",
    ],
    stock: 60,
    ratings: 4.6,
  },
  {
    _id: "203",
    name: "Running Shoes",
    description: "Comfortable running shoes for all terrains",
    price: 89.99,
    category: { _id: "2", name: "Clothing" },
    vendor: { _id: "v2", name: "Fashion Hub" },
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop",
    ],
    stock: 85,
    ratings: 4.7,
  },
  {
    _id: "204",
    name: "Cotton T-Shirt",
    description: "Premium cotton t-shirt (Pack of 3)",
    price: 34.99,
    category: { _id: "2", name: "Clothing" },
    vendor: { _id: "v2", name: "Fashion Hub" },
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop",
    ],
    stock: 150,
    ratings: 4.5,
  },
  {
    _id: "205",
    name: "Winter Hoodie",
    description: "Warm and comfortable hoodie for winter",
    price: 69.99,
    category: { _id: "2", name: "Clothing" },
    vendor: { _id: "v2", name: "Fashion Hub" },
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=300&h=300&fit=crop",
    ],
    stock: 45,
    ratings: 4.8,
  },

  // Home & Living (Category 3)
  {
    _id: "301",
    name: "Table Lamp",
    description: "Modern LED table lamp with dimmer",
    price: 39.99,
    category: { _id: "3", name: "Home & Living" },
    vendor: { _id: "v3", name: "Home Decor" },
    images: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=300&h=300&fit=crop",
    ],
    stock: 55,
    ratings: 4.4,
  },
  {
    _id: "302",
    name: "Throw Pillows",
    description: "Set of 4 decorative throw pillows",
    price: 49.99,
    category: { _id: "3", name: "Home & Living" },
    vendor: { _id: "v3", name: "Home Decor" },
    images: [
      "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=300&h=300&fit=crop",
    ],
    stock: 70,
    ratings: 4.5,
  },
  {
    _id: "303",
    name: "Wall Art",
    description: "Abstract wall art canvas painting",
    price: 89.99,
    category: { _id: "3", name: "Home & Living" },
    vendor: { _id: "v3", name: "Home Decor" },
    images: [
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=300&h=300&fit=crop",
    ],
    stock: 25,
    ratings: 4.7,
  },
  {
    _id: "304",
    name: "Coffee Maker",
    description: "Automatic coffee maker with timer",
    price: 129.99,
    category: { _id: "3", name: "Home & Living" },
    vendor: { _id: "v3", name: "Home Decor" },
    images: [
      "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=300&h=300&fit=crop",
    ],
    stock: 35,
    ratings: 4.8,
  },
  {
    _id: "305",
    name: "Bath Towel Set",
    description: "Luxury 6-piece bath towel set",
    price: 44.99,
    category: { _id: "3", name: "Home & Living" },
    vendor: { _id: "v3", name: "Home Decor" },
    images: [
      "https://images.unsplash.com/photo-1583845112203-04d495e39f1a?w=300&h=300&fit=crop",
    ],
    stock: 90,
    ratings: 4.3,
  },

  // Books (Category 4)
  {
    _id: "401",
    name: "The Great Gatsby",
    description: "Classic American novel by F. Scott Fitzgerald",
    price: 14.99,
    category: { _id: "4", name: "Books" },
    vendor: { _id: "v4", name: "Book Store" },
    images: [
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=300&fit=crop",
    ],
    stock: 120,
    ratings: 4.6,
  },
  {
    _id: "402",
    name: "Atomic Habits",
    description: "Transform your life with small changes",
    price: 19.99,
    category: { _id: "4", name: "Books" },
    vendor: { _id: "v4", name: "Book Store" },
    images: [
      "https://images.unsplash.com/photo-1589998059171-988d887df646?w=300&h=300&fit=crop",
    ],
    stock: 95,
    ratings: 4.9,
  },
  {
    _id: "403",
    name: "Python Programming",
    description: "Complete guide to Python programming",
    price: 39.99,
    category: { _id: "4", name: "Books" },
    vendor: { _id: "v4", name: "Book Store" },
    images: [
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=300&h=300&fit=crop",
    ],
    stock: 80,
    ratings: 4.7,
  },
  {
    _id: "404",
    name: "The Psychology of Money",
    description: "Timeless lessons on wealth and greed",
    price: 16.99,
    category: { _id: "4", name: "Books" },
    vendor: { _id: "v4", name: "Book Store" },
    images: [
      "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=300&h=300&fit=crop",
    ],
    stock: 110,
    ratings: 4.8,
  },
  {
    _id: "405",
    name: "The Silent Patient",
    description: "Psychological thriller bestseller",
    price: 15.99,
    category: { _id: "4", name: "Books" },
    vendor: { _id: "v4", name: "Book Store" },
    images: [
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=300&fit=crop",
    ],
    stock: 130,
    ratings: 4.5,
  },

  // Sports (Category 5)
  {
    _id: "501",
    name: "Yoga Mat",
    description: "Non-slip yoga mat with carrying strap",
    price: 29.99,
    category: { _id: "5", name: "Sports" },
    vendor: { _id: "v5", name: "Sports Gear" },
    images: [
      "https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=300&h=300&fit=crop",
    ],
    stock: 200,
    ratings: 4.4,
  },
  {
    _id: "502",
    name: "Dumbbell Set",
    description: "5-25 lbs adjustable dumbbell set",
    price: 149.99,
    category: { _id: "5", name: "Sports" },
    vendor: { _id: "v5", name: "Sports Gear" },
    images: [
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=300&h=300&fit=crop",
    ],
    stock: 40,
    ratings: 4.7,
  },
  {
    _id: "503",
    name: "Basketball",
    description: "Official size basketball",
    price: 34.99,
    category: { _id: "5", name: "Sports" },
    vendor: { _id: "v5", name: "Sports Gear" },
    images: [
      "https://images.unsplash.com/photo-1519861531473-9200262188bf?w=300&h=300&fit=crop",
    ],
    stock: 85,
    ratings: 4.5,
  },
  {
    _id: "504",
    name: "Resistance Bands",
    description: "Set of 5 resistance bands with handles",
    price: 24.99,
    category: { _id: "5", name: "Sports" },
    vendor: { _id: "v5", name: "Sports Gear" },
    images: [
      "https://images.unsplash.com/photo-1599058917765-a3b875a67cdb?w=300&h=300&fit=crop",
    ],
    stock: 150,
    ratings: 4.6,
  },
  {
    _id: "505",
    name: "Fitness Tracker",
    description: "Waterproof fitness tracker with heart rate monitor",
    price: 59.99,
    category: { _id: "5", name: "Sports" },
    vendor: { _id: "v5", name: "Sports Gear" },
    images: [
      "https://images.unsplash.com/photo-1575311373937-040b8e1fd6b6?w=300&h=300&fit=crop",
    ],
    stock: 65,
    ratings: 4.8,
  },
];

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [sortBy, setSortBy] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [useDummyData, setUseDummyData] = useState(true); // Set to false to use API

  useEffect(() => {
    if (useDummyData) {
      // Use dummy data
      setCategories(dummyCategories);
      filterAndSortProducts();
      setLoading(false);
    } else {
      // Use API data
      fetchProducts();
      fetchCategories();
    }
  }, [selectedCategory, searchTerm, priceRange, sortBy, useDummyData]);

  const filterAndSortProducts = () => {
    let filtered = [...dummyProducts];

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter((p) => p.category._id === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.description.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // Filter by price range
    if (priceRange.min) {
      filtered = filtered.filter((p) => p.price >= parseFloat(priceRange.min));
    }
    if (priceRange.max) {
      filtered = filtered.filter((p) => p.price <= parseFloat(priceRange.max));
    }

    // Sort products
    if (sortBy) {
      switch (sortBy) {
        case "price":
          filtered.sort((a, b) => a.price - b.price);
          break;
        case "-price":
          filtered.sort((a, b) => b.price - a.price);
          break;
        case "-createdAt":
          filtered.sort((a, b) => b._id - a._id);
          break;
        case "name":
          filtered.sort((a, b) => a.name.localeCompare(b.name));
          break;
        default:
          break;
      }
    }

    setProducts(filtered);
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = {};
      if (selectedCategory) params.category = selectedCategory;
      if (searchTerm) params.search = searchTerm;
      if (priceRange.min) params.minPrice = priceRange.min;
      if (priceRange.max) params.maxPrice = priceRange.max;
      if (sortBy) params.sort = sortBy;

      const response = await getProducts(params);
      setProducts(response.data.products);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await getCategories();
      setCategories(response.data.categories);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  const clearFilters = () => {
    setSelectedCategory("");
    setSearchTerm("");
    setPriceRange({ min: "", max: "" });
    setSortBy("");
    toast.success("Filters cleared!");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">All Products</h1>

      {/* Mobile Filter Toggle */}
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="md:hidden w-full mb-4 bg-gray-100 text-gray-700 py-2 rounded-lg flex items-center justify-center gap-2"
      >
        <FiFilter /> {showFilters ? "Hide Filters" : "Show Filters"}
      </button>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar */}
        <div
          className={`${showFilters ? "block" : "hidden"} md:block md:w-64 flex-shrink-0`}
        >
          <div className="bg-white rounded-lg shadow-md p-4 sticky top-24">
            <h3 className="font-semibold text-gray-900 mb-4">Filters</h3>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search
              </label>
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price Range
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={priceRange.min}
                  onChange={(e) =>
                    setPriceRange({ ...priceRange, min: e.target.value })
                  }
                  className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={priceRange.max}
                  onChange={(e) =>
                    setPriceRange({ ...priceRange, max: e.target.value })
                  }
                  className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              >
                <option value="">Default</option>
                <option value="price">Price: Low to High</option>
                <option value="-price">Price: High to Low</option>
                <option value="-createdAt">Newest First</option>
                <option value="name">Name A-Z</option>
              </select>
            </div>

            <button
              onClick={clearFilters}
              className="w-full text-green-600 text-sm hover:text-green-700"
            >
              Clear All Filters
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <p className="text-gray-500 text-lg">No products found</p>
              <button
                onClick={clearFilters}
                className="mt-4 text-green-600 hover:text-green-700"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <>
              <div className="mb-4 text-gray-600">
                Showing {products.length} products
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
