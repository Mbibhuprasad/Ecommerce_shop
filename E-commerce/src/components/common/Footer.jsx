import React from "react";
import { Link } from "react-router-dom";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiFacebook,
  FiTwitter,
  FiInstagram,
} from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold text-primary mb-4">ShopEase</h3>
            <p className="text-gray-400">
              Your one-stop shop for all your needs. Quality products at best
              prices.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="text-gray-400 hover:text-primary"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-400 hover:text-primary"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center space-x-2">
                <FiMapPin />
                <span>123 Business St, City, State 12345</span>
              </li>
              <li className="flex items-center space-x-2">
                <FiPhone />
                <span>(555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-2">
                <FiMail />
                <span>info@shopease.com</span>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary text-2xl">
                <FiFacebook />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary text-2xl">
                <FiTwitter />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary text-2xl">
                <FiInstagram />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 ShopEase. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
