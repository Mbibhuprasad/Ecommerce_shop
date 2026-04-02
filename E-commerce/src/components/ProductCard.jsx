import React from "react";
import { useAuth } from "../context/AuthContext";
import { FiShoppingCart, FiHeart } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { addToCart, requireAuth } = useAuth();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    requireAuth(() => addToCart(product));
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300 group">
      <div
        className="h-48 bg-gray-200 flex items-center justify-center cursor-pointer overflow-hidden"
        onClick={() => navigate(`/product/${product._id}`)}
      >
        {product.images?.[0] ? (
          <img
            src={`http://localhost:5000/${product.images[0]}`}
            alt={product.name}
            className="h-full w-full object-cover group-hover:scale-105 transition duration-300"
          />
        ) : (
          <div className="text-gray-400 flex flex-col items-center">
            <FiShoppingCart size={40} />
            <span className="text-sm mt-2">No Image</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1">
          {product.name}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-indigo-600">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through ml-2">
                ${product.originalPrice}
              </span>
            )}
          </div>
          <button
            onClick={handleAddToCart}
            className="bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 transition transform hover:scale-105"
          >
            <FiShoppingCart size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
