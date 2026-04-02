import React from "react";
import { Link } from "react-router-dom";
import { FiUser, FiBriefcase, FiShield } from "react-icons/fi";

const RoleSelector = () => {
  const roles = [
    {
      name: "User",
      path: "/login/user",
      icon: FiUser,
      description: "Shop and discover amazing products",
      color: "bg-blue-600",
    },
    {
      name: "Vendor",
      path: "/login/vendor",
      icon: FiBriefcase,
      description: "Sell your products and grow business",
      color: "bg-green-600",
    },
    {
      name: "Admin",
      path: "/login/admin",
      icon: FiShield,
      description: "Manage platform and users",
      color: "bg-purple-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to ShopEase
          </h1>
          <p className="text-xl text-gray-600">Choose your role to continue</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {roles.map((role) => {
            const Icon = role.icon;
            return (
              <Link
                key={role.name}
                to={role.path}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-1"
              >
                <div className={`${role.color} p-6 text-white text-center`}>
                  <Icon className="w-16 h-16 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold">{role.name}</h2>
                </div>
                <div className="p-6 text-center">
                  <p className="text-gray-600 mb-4">{role.description}</p>
                  <span className="inline-block bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition">
                    Continue as {role.name} →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RoleSelector;
