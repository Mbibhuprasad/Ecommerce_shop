// context/AuthContext.js
import React, { createContext, useState, useEffect, useContext } from "react";
import { getCurrentUser } from "../services/api";
import toast from "react-hot-toast";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [cart, setCart] = useState([]);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("guestCart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (!user) {
      localStorage.setItem("guestCart", JSON.stringify(cart));
    }
  }, [cart, user]);

  useEffect(() => {
    if (token) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, [token]);

  const fetchUser = async () => {
    try {
      const response = await getCurrentUser();
      setUser(response.user || response.data?.user);
    } catch (error) {
      console.error("Failed to fetch user:", error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = (userData, authToken) => {
    console.log("Login called with:", { userData, authToken });
    setUser(userData);
    setToken(authToken);
    localStorage.setItem("token", authToken);
    localStorage.setItem("user", JSON.stringify(userData));
    toast.success(`Welcome back, ${userData.name || userData.email}!`);
    setShowAuthModal(false);

    // Execute pending action if any
    if (pendingAction) {
      pendingAction();
      setPendingAction(null);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setCart([]);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("guestCart");
    toast.success("Logged out successfully");
  };

  const addToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.product._id === product._id,
      );
      if (existingItem) {
        return prevCart.map((item) =>
          item.product._id === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }
      return [...prevCart, { product, quantity }];
    });
    toast.success("Added to cart!");
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.product._id !== productId),
    );
    toast.success("Removed from cart");
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product._id === productId ? { ...item, quantity } : item,
      ),
    );
  };

  const getCartTotal = () => {
    return cart.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0,
    );
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("guestCart");
  };

  const requireAuth = (action) => {
    if (user) {
      action();
    } else {
      setPendingAction(() => action);
      setShowAuthModal(true);
      toast.error("Please login to continue");
    }
  };

  const value = {
    user,
    loading,
    token,
    cart,
    showAuthModal,
    setShowAuthModal,
    login,
    logout,
    addToCart: (product, quantity) =>
      requireAuth(() => addToCart(product, quantity)),
    removeFromCart,
    updateQuantity,
    getCartTotal,
    getCartCount,
    clearCart,
    requireAuth,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin",
    isVendor: user?.role === "vendor",
    isUser: user?.role === "user",
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
