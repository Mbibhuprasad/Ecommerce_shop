// src/components/home/HowItWorks.jsx
import React from "react";
import { motion } from "framer-motion";
import { FiSearch, FiShoppingCart, FiTruck, FiSmile } from "react-icons/fi";

const HowItWorks = () => {
  const steps = [
    {
      icon: FiSearch,
      title: "Browse Products",
      description: "Explore thousands of products from trusted vendors",
      step: "01",
      color: "bg-blue-500",
    },
    {
      icon: FiShoppingCart,
      title: "Add to Cart",
      description: "Select your items and add them to shopping cart",
      step: "02",
      color: "bg-green-500",
    },
    {
      icon: FiTruck,
      title: "Fast Delivery",
      description: "Get your products delivered to your doorstep",
      step: "03",
      color: "bg-purple-500",
    },
    {
      icon: FiSmile,
      title: "Enjoy Your Product",
      description: "Love your purchase with our satisfaction guarantee",
      step: "04",
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Simple steps to get your favorite products delivered to your
            doorstep
          </p>
        </motion.div>

        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-green-200 via-green-400 to-green-600 transform -translate-y-1/2"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                  className="relative bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition"
                >
                  {/* Step Number */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                      {step.step}
                    </div>
                  </div>

                  {/* Icon */}
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className={`${step.color} w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}
                  >
                    <Icon className="w-10 h-10 text-white" />
                  </motion.div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">{step.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
