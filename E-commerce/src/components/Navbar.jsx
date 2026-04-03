import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiShoppingCart,
  FiUser,
  FiMenu,
  FiX,
  FiLogIn,
  FiUserPlus,
  FiChevronDown,
  FiPackage,
  FiHeart,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout, isAuthenticated, getCartCount } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
    setShowUserMenu(false);
  }, [location]);

  const handleLogout = () => {
    logout();
    navigate("/");
    setShowUserMenu(false);
  };

  const cartCount = getCartCount();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  // Animation variants
  const navVariants = {
    hidden: { y: -100 },
    visible: {
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 20 },
    },
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, height: 0, transition: { duration: 0.3 } },
    visible: { opacity: 1, height: "auto", transition: { duration: 0.3 } },
  };

  const userMenuVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, y: -10, scale: 0.95, transition: { duration: 0.2 } },
  };

  const linkVariants = {
    hover: { scale: 1.05, color: "#4f46e5", transition: { duration: 0.2 } },
    tap: { scale: 0.95 },
  };

  const cartBadgeVariants = {
    initial: { scale: 0 },
    animate: {
      scale: 1,
      transition: { type: "spring", stiffness: 500, damping: 30 },
    },
    exit: { scale: 0 },
  };

  return (
    <motion.nav
      initial="hidden"
      animate="visible"
      variants={navVariants}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg"
          : "bg-white shadow-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo with Animation */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative group"
          >
            <Link
              to="/"
              className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent"
            >
              Shoplyonix
            </Link>
            <motion.div
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-green-600 to-emerald-600 origin-left"
            />
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <motion.div
                key={link.name}
                variants={linkVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Link
                  to={link.path}
                  className={`relative text-gray-700 hover:text-green-600 transition-colors duration-200 ${
                    location.pathname === link.path
                      ? "text-green-600 font-semibold"
                      : ""
                  }`}
                >
                  {link.name}
                  {location.pathname === link.path && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-green-600"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Right Section */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Cart Icon with Animation */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate("/cart")}
              className="relative p-2 text-gray-600 hover:text-green-600 transition-colors duration-200"
            >
              <FiShoppingCart size={24} />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    key="cart-badge"
                    variants={cartBadgeVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            {/* User Section */}
            {isAuthenticated ? (
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 bg-gradient-to-r from-gray-50 to-gray-100 px-3 py-2 rounded-lg hover:from-gray-100 hover:to-gray-200 transition-all duration-200 border border-gray-200"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center text-white font-semibold">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-gray-700 font-medium">
                    {user?.name?.split(" ")[0]}
                  </span>
                  <motion.div
                    animate={{ rotate: showUserMenu ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FiChevronDown size={16} />
                  </motion.div>
                </motion.button>

                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      variants={userMenuVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl py-2 border border-gray-100 z-50 overflow-hidden"
                    >
                      <div className="px-4 py-3 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                        <p className="text-sm font-semibold text-gray-900">
                          {user?.name}
                        </p>
                        <p className="text-xs text-gray-500">{user?.email}</p>
                        {user?.role && (
                          <span className="inline-block mt-1 px-2 py-0.5 bg-green-100 text-green-600 text-xs rounded-full">
                            {user.role}
                          </span>
                        )}
                      </div>

                      <motion.div whileHover={{ x: 5 }} className="px-4 py-2">
                        <Link
                          to="/profile"
                          className="flex items-center space-x-3 text-gray-700 hover:text-green-600 transition-colors"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <FiUser size={18} />
                          <span>My Profile</span>
                        </Link>
                      </motion.div>

                      <motion.div whileHover={{ x: 5 }} className="px-4 py-2">
                        <Link
                          to="/orders"
                          className="flex items-center space-x-3 text-gray-700 hover:text-green-600 transition-colors"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <FiPackage size={18} />
                          <span>My Orders</span>
                        </Link>
                      </motion.div>

                      <motion.div whileHover={{ x: 5 }} className="px-4 py-2">
                        <Link
                          to="/wishlist"
                          className="flex items-center space-x-3 text-gray-700 hover:text-green-600 transition-colors"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <FiHeart size={18} />
                          <span>Wishlist</span>
                        </Link>
                      </motion.div>

                      {user?.role === "vendor" && (
                        <motion.div
                          whileHover={{ x: 5 }}
                          className="px-4 py-2 border-t border-gray-100"
                        >
                          <Link
                            to="/vendor/dashboard"
                            className="flex items-center space-x-3 text-gray-700 hover:text-green-600 transition-colors"
                            onClick={() => setShowUserMenu(false)}
                          >
                            <FiSettings size={18} />
                            <span>Vendor Dashboard</span>
                          </Link>
                        </motion.div>
                      )}

                      {user?.role === "admin" && (
                        <motion.div
                          whileHover={{ x: 5 }}
                          className="px-4 py-2 border-t border-gray-100"
                        >
                          <Link
                            to="/admin/dashboard"
                            className="flex items-center space-x-3 text-gray-700 hover:text-green-600 transition-colors"
                            onClick={() => setShowUserMenu(false)}
                          >
                            <FiSettings size={18} />
                            <span>Admin Dashboard</span>
                          </Link>
                        </motion.div>
                      )}

                      <motion.div
                        whileHover={{ x: 5 }}
                        className="px-4 py-2 border-t border-gray-100"
                      >
                        <button
                          onClick={handleLogout}
                          className="flex items-center space-x-3 text-red-600 hover:text-red-700 transition-colors w-full"
                        >
                          <FiLogOut size={18} />
                          <span>Logout</span>
                        </button>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/login"
                    className="flex items-center space-x-1 text-gray-700 hover:text-green-600 px-3 py-2 rounded-lg transition-all duration-200"
                  >
                    <FiLogIn size={18} />
                    <span>Login</span>
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/register"
                    className="flex items-center space-x-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-2 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    <FiUserPlus size={18} />
                    <span>Sign Up</span>
                  </Link>
                </motion.div>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate("/cart")}
              className="relative p-2 text-gray-600"
            >
              <FiShoppingCart size={24} />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    variants={cartBadgeVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 p-2"
            >
              <motion.div
                animate={{ rotate: isOpen ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
              </motion.div>
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation with Animation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="md:hidden overflow-hidden"
            >
              <div className="py-4 space-y-3">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      to={link.path}
                      className={`block py-2 text-gray-700 hover:text-green-600 transition-colors ${
                        location.pathname === link.path
                          ? "text-green-600 font-semibold"
                          : ""
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}

                {!isAuthenticated && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="pt-4 space-y-3"
                  >
                    <Link
                      to="/login"
                      className="block w-full text-center bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-2 rounded-lg"
                      onClick={() => setIsOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="block w-full text-center border-2 border-green-600 text-green-600 px-4 py-2 rounded-lg font-semibold"
                      onClick={() => setIsOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </motion.div>
                )}

                {isAuthenticated && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="pt-4 space-y-3 border-t border-gray-200"
                  >
                    <div className="flex items-center space-x-3 pb-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center text-white font-bold">
                        {user?.name?.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">
                          {user?.name}
                        </p>
                        <p className="text-xs text-gray-500">{user?.email}</p>
                      </div>
                    </div>

                    <Link
                      to="/profile"
                      className="flex items-center space-x-2 py-2 text-gray-700 hover:text-green-600"
                      onClick={() => setIsOpen(false)}
                    >
                      <FiUser size={18} />
                      <span>My Profile</span>
                    </Link>

                    <Link
                      to="/orders"
                      className="flex items-center space-x-2 py-2 text-gray-700 hover:text-green-600"
                      onClick={() => setIsOpen(false)}
                    >
                      <FiPackage size={18} />
                      <span>My Orders</span>
                    </Link>

                    <Link
                      to="/wishlist"
                      className="flex items-center space-x-2 py-2 text-gray-700 hover:text-green-600"
                      onClick={() => setIsOpen(false)}
                    >
                      <FiHeart size={18} />
                      <span>Wishlist</span>
                    </Link>

                    <button
                      onClick={() => {
                        handleLogout();
                        setIsOpen(false);
                      }}
                      className="flex items-center space-x-2 w-full py-2 text-red-600 hover:text-red-700"
                    >
                      <FiLogOut size={18} />
                      <span>Logout</span>
                    </button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
