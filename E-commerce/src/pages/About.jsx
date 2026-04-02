import React from "react";
import { FiUsers, FiTruck, FiShield, FiAward } from "react-icons/fi";

const About = () => {
  const stats = [
    { number: "10K+", label: "Happy Customers", icon: FiUsers },
    { number: "500+", label: "Trusted Vendors", icon: FiTruck },
    { number: "100%", label: "Secure Shopping", icon: FiShield },
    { number: "24/7", label: "Customer Support", icon: FiAward },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          About ShopEase
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Your trusted shopping destination connecting customers with quality
          products from verified vendors
        </p>
      </div>

      {/* Story Section */}
      <div className="grid md:grid-cols-2 gap-12 mb-16">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Our Story
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Founded in 2024, ShopEase started with a simple mission: to provide
            a seamless shopping experience for customers while empowering
            vendors to grow their business online.
          </p>
          <p className="text-gray-600 leading-relaxed">
            What started as a small marketplace has grown into a trusted
            platform connecting thousands of customers with quality products
            from verified vendors across the globe.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Our Mission
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            To create a transparent, secure, and user-friendly marketplace where
            customers can discover amazing products and vendors can thrive.
          </p>
          <p className="text-gray-600 leading-relaxed">
            We're committed to innovation, quality, and customer satisfaction in
            everything we do.
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center text-white">
                <Icon className="w-8 h-8 mx-auto mb-2" />
                <div className="text-3xl font-bold">{stat.number}</div>
                <div className="text-sm opacity-90">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Values Section */}
      <div>
        <h2 className="text-2xl font-semibold text-center text-gray-900 mb-8">
          Our Values
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiUsers className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Customer First</h3>
            <p className="text-gray-600">
              We prioritize our customers' needs and satisfaction above all
              else.
            </p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiShield className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Trust & Transparency</h3>
            <p className="text-gray-600">
              We believe in honest communication and transparent operations.
            </p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiAward className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Quality Assurance</h3>
            <p className="text-gray-600">
              We ensure all products meet our high quality standards.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
