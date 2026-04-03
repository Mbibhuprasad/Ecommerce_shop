// src/components/ProductCard.jsx
import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { FiShoppingCart, FiHeart, FiEye, FiStar } from "react-icons/fi";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-64 overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transform group-hover:scale-110 transition duration-300"
        />

        {/* Overlay with actions */}
        <div
          className={`absolute inset-0 bg-black/50 flex items-center justify-center gap-4 transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <button
            onClick={handleAddToCart}
            className="bg-white p-3 rounded-full hover:bg-green-600 hover:text-white transition transform hover:scale-110"
          >
            <FiShoppingCart className="w-5 h-5" />
          </button>
          <button className="bg-white p-3 rounded-full hover:bg-green-600 hover:text-white transition transform hover:scale-110">
            <FiHeart className="w-5 h-5" />
          </button>
          <Link
            to={`/product/${product._id}`}
            className="bg-white p-3 rounded-full hover:bg-green-600 hover:text-white transition transform hover:scale-110"
          >
            <FiEye className="w-5 h-5" />
          </Link>
        </div>

        {/* Rating badge */}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1">
          <FiStar className="w-4 h-4 text-yellow-400 fill-current" />
          <span className="text-sm font-semibold">{product.ratings}</span>
        </div>

        {/* Stock badge */}
        {product.stock < 20 && (
          <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-semibold">
            Only {product.stock} left
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="text-sm text-green-600 font-semibold mb-1">
          {product.category?.name}
        </div>
        <Link to={`/product/${product._id}`}>
          <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-green-600 transition line-clamp-1">
            {product.name}
          </h3>
        </Link>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-green-600">
              ${product.price}
            </span>
          </div>
          <button
            onClick={handleAddToCart}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition transform hover:scale-105 flex items-center gap-2"
          >
            <FiShoppingCart className="w-4 h-4" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
