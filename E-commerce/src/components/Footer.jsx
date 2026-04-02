import React from "react";
import { Link } from "react-router-dom";
import {
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiMail,
  FiPhone,
  FiMapPin,
  FiShield,
  FiBriefcase,
} from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              ShopEase
            </h3>
            <p className="text-gray-400 mb-4">
              Your one-stop shop for amazing products from trusted vendors
              worldwide.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition">
                <FiFacebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <FiTwitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <FiInstagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link to="/" className="hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-white transition">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Role Access */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Access Portal</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/login/admin"
                  className="flex items-center space-x-2 text-gray-400 hover:text-purple-400 transition"
                >
                  <FiShield size={16} />
                  <span>Admin Login</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/login/vendor"
                  className="flex items-center space-x-2 text-gray-400 hover:text-green-400 transition"
                >
                  <FiBriefcase size={16} />
                  <span>Vendor Login</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/login/user"
                  className="flex items-center space-x-2 text-gray-400 hover:text-blue-400 transition"
                >
                  <FiMail size={16} />
                  <span>Customer Login</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Contact Info</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center space-x-2">
                <FiMail className="flex-shrink-0" />
                <span>support@shopease.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <FiPhone className="flex-shrink-0" />
                <span>+1 234 567 890</span>
              </li>
              <li className="flex items-center space-x-2">
                <FiMapPin className="flex-shrink-0" />
                <span>New York, USA</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-center text-gray-400 text-sm">
            <p>&copy; 2024 ShopEase. All rights reserved.</p>
            <div className="flex space-x-4 mt-2 md:mt-0">
              <Link to="/privacy" className="hover:text-white transition">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-white transition">
                Terms of Service
              </Link>
              <Link to="/refund" className="hover:text-white transition">
                Refund Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
