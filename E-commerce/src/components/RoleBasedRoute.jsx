import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const RoleBasedRoute = ({ children, allowedRoles }) => {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    toast.error("Please login to access this page");
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user?.role)) {
    toast.error("You do not have permission to access this page");
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RoleBasedRoute;
