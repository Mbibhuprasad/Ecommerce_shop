import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { FiShoppingCart, FiUser } from "react-icons/fi";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary">ShopEase</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-primary transition"
            >
              Home
            </Link>
            <Link
              to="/products"
              className="text-gray-700 hover:text-primary transition"
            >
              Products
            </Link>
            <Link
              to="/about"
              className="text-gray-700 hover:text-primary transition"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-gray-700 hover:text-primary transition"
            >
              Contact
            </Link>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            <Link to="/cart" className="relative">
              <FiShoppingCart className="text-2xl text-gray-700 hover:text-primary" />
              <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </Link>

            {user ? (
              <div className="flex items-center space-x-4">
                <Link to="/profile" className="flex items-center space-x-1">
                  <FiUser className="text-xl" />
                  <span>{user.name}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
