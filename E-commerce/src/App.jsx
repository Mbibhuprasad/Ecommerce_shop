import React from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AuthModal from "./components/AuthModal";
import ProtectedRoute from "./components/ProtectedRoute";
import RoleBasedRoute from "./components/RoleBasedRoute";

// Public Pages
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import About from "./pages/About";
import Contact from "./pages/Contact";

// Auth Pages
import RoleSelector from "./pages/auth/RoleSelector";
import UserLogin from "./pages/auth/UserLogin";
import UserRegister from "./pages/auth/UserRegister";
import VendorLogin from "./pages/auth/VendorLogin";
import VendorRegister from "./pages/auth/VendorRegister";
import AdminLogin from "./pages/auth/AdminLogin";

// Vendor Pages
import VendorDashboard from "./pages/vendor/VendorDashboard";
import VendorProducts from "./pages/vendor/VendorProducts";
import VendorCategories from "./pages/vendor/VendorCategories";
import VendorOrders from "./pages/vendor/VendorOrders";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminVendors from "./pages/admin/AdminVendors";
import AdminApplications from "./pages/admin/AdminApplications";
import AdminOrders from "./pages/admin/AdminOrders";

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <AuthModal />
        <main className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />

            {/* Auth Routes */}
            <Route path="/login" element={<RoleSelector />} />
            <Route path="/login/user" element={<UserLogin />} />
            <Route path="/register" element={<UserRegister />} />
            <Route path="/login/vendor" element={<VendorLogin />} />
            <Route path="/register/vendor" element={<VendorRegister />} />
            <Route path="/login/admin" element={<AdminLogin />} />

            {/* Vendor Routes */}
            <Route
              path="/vendor/dashboard"
              element={
                <RoleBasedRoute allowedRoles={["vendor"]}>
                  <VendorDashboard />
                </RoleBasedRoute>
              }
            />
            <Route
              path="/vendor/products"
              element={
                <RoleBasedRoute allowedRoles={["vendor"]}>
                  <VendorProducts />
                </RoleBasedRoute>
              }
            />
            <Route
              path="/vendor/categories"
              element={
                <RoleBasedRoute allowedRoles={["vendor"]}>
                  <VendorCategories />
                </RoleBasedRoute>
              }
            />
            <Route
              path="/vendor/orders"
              element={
                <RoleBasedRoute allowedRoles={["vendor"]}>
                  <VendorOrders />
                </RoleBasedRoute>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin/dashboard"
              element={
                <RoleBasedRoute allowedRoles={["admin"]}>
                  <AdminDashboard />
                </RoleBasedRoute>
              }
            />
            <Route
              path="/admin/vendors"
              element={
                <RoleBasedRoute allowedRoles={["admin"]}>
                  <AdminVendors />
                </RoleBasedRoute>
              }
            />
            <Route
              path="/admin/applications"
              element={
                <RoleBasedRoute allowedRoles={["admin"]}>
                  <AdminApplications />
                </RoleBasedRoute>
              }
            />
            <Route
              path="/admin/orders"
              element={
                <RoleBasedRoute allowedRoles={["admin"]}>
                  <AdminOrders />
                </RoleBasedRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
