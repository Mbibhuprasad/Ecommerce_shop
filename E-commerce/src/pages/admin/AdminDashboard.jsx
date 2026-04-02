import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  getAllVendors,
  getAllOrders,
  getAllVendorApplications,
} from "../../services/api";
import {
  FiUsers,
  FiShoppingBag,
  FiClock,
  FiDollarSign,
  FiPackage,
  FiTrendingUp,
} from "react-icons/fi";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalVendors: 0,
    totalUsers: 0,
    totalOrders: 0,
    totalRevenue: 0,
    pendingApplications: 0,
    activeProducts: 0,
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [vendorsRes, ordersRes, applicationsRes] = await Promise.all([
        getAllVendors(),
        getAllOrders(),
        getAllVendorApplications(),
      ]);

      const vendors = vendorsRes.data?.vendors || [];
      const orders = ordersRes.data?.orders || [];
      const applications = applicationsRes.data?.applications || [];

      const totalRevenue = orders
        .filter((order) => order.status === "delivered")
        .reduce((sum, order) => sum + order.total, 0);

      setStats({
        totalVendors: vendors.filter((v) => v.role === "vendor").length,
        totalUsers: vendors.filter((v) => v.role === "user").length,
        totalOrders: orders.length,
        totalRevenue: totalRevenue,
        pendingApplications: applications.filter(
          (app) => app.status === "pending",
        ).length,
        activeProducts: 0, // You can add product count endpoint
      });

      setRecentOrders(orders.slice(0, 5));
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: "Total Vendors",
      value: stats.totalVendors,
      icon: FiUsers,
      color: "bg-blue-500",
      link: "/admin/vendors",
    },
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: FiUsers,
      color: "bg-green-500",
      link: "/admin/users",
    },
    {
      title: "Total Orders",
      value: stats.totalOrders,
      icon: FiShoppingBag,
      color: "bg-purple-500",
      link: "/admin/orders",
    },
    {
      title: "Total Revenue",
      value: `$${stats.totalRevenue.toLocaleString()}`,
      icon: FiDollarSign,
      color: "bg-yellow-500",
      link: "/admin/orders",
    },
    {
      title: "Pending Applications",
      value: stats.pendingApplications,
      icon: FiClock,
      color: "bg-red-500",
      link: "/admin/applications",
    },
    {
      title: "Active Products",
      value: stats.activeProducts,
      icon: FiPackage,
      color: "bg-indigo-500",
      link: "/admin/products",
    },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="text-purple-100">
            Here's what's happening with your platform today.
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Link
                key={index}
                to={stat.link}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`${stat.color} p-3 rounded-lg text-white`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-2xl font-bold text-gray-800">
                      {stat.value}
                    </span>
                  </div>
                  <h3 className="text-gray-600 font-medium">{stat.title}</h3>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800">Recent Orders</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentOrders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">
                      #{order._id.slice(-8)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {order.user?.name || "N/A"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      ${order.total}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          order.status === "delivered"
                            ? "bg-green-100 text-green-800"
                            : order.status === "processing"
                              ? "bg-blue-100 text-blue-800"
                              : order.status === "shipped"
                                ? "bg-purple-100 text-purple-800"
                                : order.status === "cancelled"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
                {recentOrders.length === 0 && (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-6 py-8 text-center text-gray-500"
                    >
                      No orders found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
