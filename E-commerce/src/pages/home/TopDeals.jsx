// src/components/home/TopDeals.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiShoppingCart, FiHeart, FiEye } from "react-icons/fi";

const TopDeals = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const deals = [
    {
      id: 1,
      name: "Wireless Headphones",
      price: 49.99,
      originalPrice: 99.99,
      discount: 50,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
      rating: 4.5,
    },
    {
      id: 2,
      name: "Smart Watch",
      price: 199.99,
      originalPrice: 299.99,
      discount: 33,
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop",
      rating: 4.8,
    },
    {
      id: 3,
      name: "Premium Backpack",
      price: 39.99,
      originalPrice: 79.99,
      discount: 50,
      image:
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop",
      rating: 4.6,
    },
    {
      id: 4,
      name: "Sunglasses",
      price: 29.99,
      originalPrice: 59.99,
      discount: 50,
      image:
        "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300&h=300&fit=crop",
      rating: 4.7,
    },
  ];

  useEffect(() => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 7);

    const timer = setInterval(() => {
      const now = new Date();
      const difference = targetDate - now;

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % 86400000) / 3600000);
      const minutes = Math.floor((difference % 3600000) / 60000);
      const seconds = Math.floor((difference % 60000) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            🔥 Hot Deals & Discounts
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Limited time offers - Grab them before they're gone!
          </p>
        </motion.div>

        {/* Countdown Timer */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl p-8 mb-12 text-center text-white"
        >
          <h3 className="text-2xl font-bold mb-4">⏰ Limited Time Offer!</h3>
          <div className="flex justify-center gap-4 flex-wrap">
            {Object.entries(timeLeft).map(([unit, value]) => (
              <div
                key={unit}
                className="bg-white/20 backdrop-blur-sm rounded-lg p-4 min-w-[100px]"
              >
                <div className="text-3xl font-bold">{value}</div>
                <div className="text-sm uppercase">{unit}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {deals.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-xl shadow-md overflow-hidden group"
            >
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition duration-300"
                />
                <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded-lg text-sm font-bold">
                  -{product.discount}%
                </div>
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-4">
                  <button className="bg-white p-2 rounded-full hover:bg-green-600 hover:text-white transition">
                    <FiEye className="w-5 h-5" />
                  </button>
                  <button className="bg-white p-2 rounded-full hover:bg-green-600 hover:text-white transition">
                    <FiHeart className="w-5 h-5" />
                  </button>
                  <button className="bg-white p-2 rounded-full hover:bg-green-600 hover:text-white transition">
                    <FiShoppingCart className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {product.name}
                </h3>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl font-bold text-green-600">
                    ${product.price}
                  </span>
                  <span className="text-gray-400 line-through">
                    ${product.originalPrice}
                  </span>
                </div>
                <div className="flex items-center gap-1 mb-4">
                  {"★".repeat(Math.floor(product.rating))}
                  {"☆".repeat(5 - Math.floor(product.rating))}
                  <span className="text-gray-500 text-sm ml-1">
                    ({product.rating})
                  </span>
                </div>
                <Link
                  to={`/product/${product.id}`}
                  className="block w-full text-center bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition font-semibold"
                >
                  Shop Now
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            to="/products"
            className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition shadow-lg"
          >
            View All Deals
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default TopDeals;
