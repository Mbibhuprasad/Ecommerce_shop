import React, { useState, useEffect } from "react";
import { getProducts } from "../services/api";
import ProductCard from "../components/ProductCard";
import {
  FiTrendingUp,
  FiTruck,
  FiShield,
  FiHeadphones,
  FiArrowRight,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import Hero from "./home/hero";

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const response = await getProducts({ limit: 8 });
      setFeaturedProducts(response.data.products);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  const features = [
    {
      icon: FiTruck,
      title: "Free Shipping",
      description: "On orders over $50",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: FiShield,
      title: "Secure Payment",
      description: "100% secure transactions",
      color: "bg-green-100 text-green-600",
    },
    {
      icon: FiTrendingUp,
      title: "Best Prices",
      description: "Price match guarantee",
      color: "bg-orange-100 text-orange-600",
    },
    {
      icon: FiHeadphones,
      title: "24/7 Support",
      description: "Dedicated customer service",
      color: "bg-purple-100 text-purple-600",
    },
  ];

  return (
    <div>
      <Hero></Hero>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-20 sm:py-24 lg:py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                Shop Smarter, Live Better
              </h1>
              <p className="text-xl mb-8 opacity-90">
                Discover amazing products from trusted vendors at unbeatable
                prices. Start your shopping journey with us today!
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/products"
                  className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition transform hover:scale-105 inline-flex items-center gap-2"
                >
                  Shop Now <FiArrowRight />
                </Link>
                <Link
                  to="/about"
                  className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition"
                >
                  Learn More
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full filter blur-3xl opacity-30"></div>
                <img
                  src="https://via.placeholder.com/500x400?text=Shopping+Illustration"
                  alt="Shopping"
                  className="relative rounded-lg shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why Choose ShopEase?
          </h2>
          <p className="text-gray-600">
            We provide the best shopping experience possible
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="text-center group">
                <div
                  className={`w-16 h-16 ${feature.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition`}
                >
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Featured Products */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Featured Products
          </h2>
          <p className="text-gray-600">
            Discover our hand-picked selection of amazing products
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
            <div className="text-center mt-12">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
              >
                View All Products <FiArrowRight />
              </Link>
            </div>
          </>
        )}
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Shopping?</h2>
          <p className="text-xl opacity-90 mb-8">
            Join thousands of happy customers today
          </p>
          <Link
            to="/products"
            className="inline-block bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition transform hover:scale-105"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
