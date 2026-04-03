// src/components/home/Features.jsx
import React from "react";
import { motion } from "framer-motion";
import { FiTruck, FiShield, FiCreditCard, FiHeadphones } from "react-icons/fi";

const Features = () => {
  const features = [
    {
      icon: FiTruck,
      title: "Free Shipping",
      description: "Free shipping on all orders over $50",
      color: "bg-blue-500",
    },
    {
      icon: FiShield,
      title: "Secure Payment",
      description: "100% secure payment methods",
      color: "bg-green-500",
    },
    {
      icon: FiCreditCard,
      title: "Money Back Guarantee",
      description: "30 days money back guarantee",
      color: "bg-purple-500",
    },
    {
      icon: FiHeadphones,
      title: "24/7 Support",
      description: "Dedicated customer support",
      color: "bg-orange-500",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Us?
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            We provide the best shopping experience with our premium features
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-xl transition"
              >
                <div
                  className={`${feature.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}
                >
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

export default Features;
