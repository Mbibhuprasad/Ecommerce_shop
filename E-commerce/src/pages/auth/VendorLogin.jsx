import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { loginUser } from "../../services/api";
import toast from "react-hot-toast";

const VendorLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await loginUser(formData);
      console.log("Vendor login response:", response);

      // Fix: Your backend returns { status, token, data: { user } }
      const token = response.token;
      const user = response.data?.user;

      if (!user || !token) {
        console.error("Invalid response structure:", response);
        toast.error("Invalid server response");
        setLoading(false);
        return;
      }

      if (user.role !== "vendor") {
        toast.error(
          "This login is for vendors only. Please use the correct role login.",
        );
        setLoading(false);
        return;
      }

      if (!user.isVendorApproved) {
        toast.error(
          "Your vendor account is pending approval. Please wait for admin approval.",
        );
        setLoading(false);
        return;
      }

      // Store in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Update auth context
      login(user, token);

      toast.success(`Welcome back, ${user.name}!`);
      navigate("/vendor/dashboard");
    } catch (error) {
      console.error("Vendor login error:", error);

      if (!error.response) {
        toast.error(
          "Cannot connect to server. Please check if backend is running.",
        );
      } else if (error.response.status === 401) {
        toast.error("Invalid email or password");
      } else if (error.response.status === 403) {
        toast.error("Your vendor account is pending approval");
      } else {
        toast.error(error.response?.data?.message || "Login failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <div className="bg-green-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Vendor Login</h2>
          <p className="text-gray-600 mt-2">Sign in to your seller dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
              placeholder="vendor@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Want to become a vendor?{" "}
            <Link
              to="/register/vendor"
              className="text-green-600 hover:text-green-700 font-medium"
            >
              Apply Now
            </Link>
          </p>
          <Link
            to="/login"
            className="text-sm text-gray-500 hover:text-gray-600 mt-2 inline-block"
          >
            ← Back to role selection
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VendorLogin;
