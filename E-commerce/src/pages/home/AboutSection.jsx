// src/components/home/AboutSection.jsx
import React from "react";
import { motion } from "framer-motion";
import { FiAward, FiUsers, FiGlobe } from "react-icons/fi";

const AboutSection = () => {
  const stats = [
    { icon: FiAward, value: "10+", label: "Years of Excellence" },
    { icon: FiUsers, value: "50K+", label: "Happy Customers" },
    { icon: FiGlobe, value: "100+", label: "Countries Served" },
  ];

  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative z-10">
              <img
                src="https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?w=600&h=400&fit=crop"
                alt="About Us"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-green-600 rounded-xl p-6 shadow-xl">
                <div className="text-white text-center">
                  <div className="text-3xl font-bold">100%</div>
                  <div className="text-sm">Satisfaction</div>
                  <div className="text-sm">Guaranteed</div>
                </div>
              </div>
            </div>
            {/* Background decoration */}
            <div className="absolute -top-4 -left-4 w-32 h-32 bg-green-100 rounded-full opacity-50"></div>
            <div className="absolute -bottom-4 -right-4 w-40 h-40 bg-yellow-100 rounded-full opacity-50"></div>
          </motion.div>

          {/* Right Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm font-semibold mb-4">
                About Us
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Your Trusted Shopping Partner Since 2014
              </h2>
              <p className="text-gray-600 text-lg mb-6">
                At ShopHub, we believe in providing the best shopping experience
                with quality products, competitive prices, and exceptional
                customer service.
              </p>
              <p className="text-gray-600 mb-8">
                We connect thousands of verified vendors with millions of happy
                customers worldwide. Our platform ensures secure transactions,
                fast delivery, and hassle-free returns.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mb-8">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="text-center"
                    >
                      <Icon className="w-8 h-8 text-green-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-gray-900">
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </motion.div>
                  );
                })}
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition shadow-lg"
              >
                Learn More About Us
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
