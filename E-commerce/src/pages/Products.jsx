import React, { useState } from "react";
import ProductCard from "../components/products/ProductCard";

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = ["all", "electronics", "fashion", "home", "books"];

  const products = [
    {
      id: 1,
      name: "Smartphone X",
      price: 699,
      category: "electronics",
      image:
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500",
      rating: 4.5,
    },
    {
      id: 2,
      name: "Designer Watch",
      price: 199,
      category: "fashion",
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
      rating: 4.8,
    },
    {
      id: 3,
      name: "Coffee Maker",
      price: 89,
      category: "home",
      image:
        "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500",
      rating: 4.3,
    },
    {
      id: 4,
      name: "Best Seller Book",
      price: 24,
      category: "books",
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500",
      rating: 4.9,
    },
    {
      id: 5,
      name: "Laptop Pro",
      price: 1299,
      category: "electronics",
      image:
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500",
      rating: 4.7,
    },
    {
      id: 6,
      name: "Running Shoes",
      price: 79,
      category: "fashion",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
      rating: 4.6,
    },
  ];

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <div className="container-custom py-12">
      <h1 className="text-4xl font-bold mb-8">Our Products</h1>

      {/* Category Filter */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-lg capitalize ${
                selectedCategory === category
                  ? "bg-primary text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              } transition`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
