import React from "react";
import { FiShoppingCart, FiHeart } from "react-icons/fi";

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover"
        />
        <button className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-100">
          <FiHeart className="text-gray-600" />
        </button>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-2">Category: {product.category}</p>
        <div className="flex items-center mb-4">
          <div className="flex text-yellow-400">
            {"★".repeat(Math.floor(product.rating))}
            {"☆".repeat(5 - Math.floor(product.rating))}
          </div>
          <span className="text-gray-600 ml-2">({product.rating})</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-primary">
            ${product.price}
          </span>
          <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition flex items-center space-x-2">
            <FiShoppingCart />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
