// services/api.js
import axios from "axios";
import toast from "react-hot-toast";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000, // Add timeout to prevent hanging requests
});

// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log(
      `Making ${config.method.toUpperCase()} request to: ${config.url}`,
    );
    return config;
  },
  (error) => {
    console.error("Request interceptor error:", error);
    return Promise.reject(error);
  },
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log(`Response from ${response.config.url}:`, response.status);
    return response;
  },
  (error) => {
    console.error("Response error:", error);

    if (error.code === "ECONNABORTED") {
      toast.error("Request timeout. Please check your connection.");
    } else if (!error.response) {
      toast.error("Network error. Cannot connect to server.");
      console.error("Network error details:", error.message);
    } else if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
      toast.error("Session expired. Please login again.");
    } else if (error.response?.status === 500) {
      toast.error("Server error. Please try again later.");
    }

    return Promise.reject(error);
  },
);

// Auth APIs
export const registerUser = async (userData) => {
  try {
    const response = await api.post("/auth/register", userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (credentials) => {
  try {
    console.log("Attempting login to:", `${API_URL}/auth/login`);
    const response = await api.post("/auth/login", credentials);
    console.log("Login response received:", response.data);
    return response.data;
  } catch (error) {
    console.error("Login API error:", error);
    throw error;
  }
};

export const getCurrentUser = async () => {
  const response = await api.get("/auth/me");
  return response.data;
};

export const updateProfile = async (userData) => {
  const response = await api.patch("/auth/updateMe", userData);
  return response.data;
};

// Vendor APIs
export const applyForVendor = async (applicationData) => {
  const response = await api.post("/vendors/apply", applicationData);
  return response.data;
};

export const getVendorStats = async () => {
  const response = await api.get("/vendors/stats");
  return response.data;
};

export const getVendorOrders = async () => {
  const response = await api.get("/vendors/orders");
  return response.data;
};

export const updateOrderStatus = async (orderId, status) => {
  const response = await api.patch(`/vendors/orders/${orderId}`, { status });
  return response.data;
};

// Category APIs
export const getCategories = async () => {
  const response = await api.get("/categories");
  return response.data;
};

export const getMyCategories = async () => {
  const response = await api.get("/categories/my-categories");
  return response.data;
};

export const createCategory = async (categoryData) => {
  const response = await api.post("/categories", categoryData);
  return response.data;
};

export const updateCategory = async (id, categoryData) => {
  const response = await api.patch(`/categories/${id}`, categoryData);
  return response.data;
};

export const deleteCategory = async (id) => {
  const response = await api.delete(`/categories/${id}`);
  return response.data;
};

// Product APIs
export const getProducts = async (params = {}) => {
  const response = await api.get("/products", { params });
  return response.data;
};

export const getProduct = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

export const createProduct = async (productData) => {
  const response = await api.post("/products", productData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const getMyProducts = async () => {
  const response = await api.get("/products/my-products");
  return response.data;
};

export const updateProduct = async (id, productData) => {
  const response = await api.patch(`/products/${id}`, productData);
  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await api.delete(`/products/${id}`);
  return response.data;
};

// Order APIs
export const createOrder = async (orderData) => {
  const response = await api.post("/orders", orderData);
  return response.data;
};

export const getMyOrders = async () => {
  const response = await api.get("/orders/my-orders");
  return response.data;
};

export const cancelOrder = async (id) => {
  const response = await api.patch(`/orders/${id}/cancel`);
  return response.data;
};

// Admin APIs
export const getAllVendorApplications = async () => {
  const response = await api.get("/vendors/applications");
  return response.data;
};

export const approveVendor = async (id, remarks) => {
  const response = await api.patch(`/vendors/applications/${id}/approve`, {
    adminRemarks: remarks,
  });
  return response.data;
};

export const rejectVendor = async (id, remarks) => {
  const response = await api.patch(`/vendors/applications/${id}/reject`, {
    adminRemarks: remarks,
  });
  return response.data;
};

export const getAllVendors = async () => {
  const response = await api.get("/vendors/all");
  return response.data;
};

export const getAllOrders = async () => {
  const response = await api.get("/orders");
  return response.data;
};

export default api;
