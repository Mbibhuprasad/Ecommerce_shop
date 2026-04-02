import React, { useState, useEffect } from "react";
import { getAllVendors } from "../../services/api";
import {
  FiSearch,
  FiEye,
  FiPackage,
  FiShoppingBag,
  FiMail,
  FiPhone,
  FiMapPin,
} from "react-icons/fi";
import { Link } from "react-router-dom";

const AdminVendors = () => {
  const [vendors, setVendors] = useState([]);
  const [filteredVendors, setFilteredVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedVendor, setSelectedVendor] = useState(null);

  useEffect(() => {
    fetchVendors();
  }, []);

  useEffect(() => {
    filterVendors();
  }, [searchTerm, vendors]);

  const fetchVendors = async () => {
    try {
      const response = await getAllVendors();
      setVendors(response.data?.vendors || []);
      setFilteredVendors(response.data?.vendors || []);
    } catch (error) {
      console.error("Failed to fetch vendors:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterVendors = () => {
    if (!searchTerm) {
      setFilteredVendors(vendors);
    } else {
      const filtered = vendors.filter(
        (vendor) =>
          vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          vendor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          vendor.vendorDetails?.businessName
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()),
      );
      setFilteredVendors(filtered);
    }
  };

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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Vendors Management
          </h1>
          <p className="text-gray-600 mt-2">
            Manage all registered vendors on the platform
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search vendors by name, email, or business..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Vendors</p>
                <p className="text-2xl font-bold text-gray-900">
                  {vendors.length}
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <FiBriefcase className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Active Vendors</p>
                <p className="text-2xl font-bold text-green-600">
                  {vendors.filter((v) => v.isVendorApproved).length}
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <FiCheck className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Pending Approval</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {vendors.filter((v) => !v.isVendorApproved).length}
                </p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-lg">
                <FiClock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Vendors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVendors.map((vendor) => (
            <div
              key={vendor._id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      {vendor.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {vendor.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {vendor.vendorDetails?.businessName || "Business Name"}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      vendor.isVendorApproved
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {vendor.isVendorApproved ? "Approved" : "Pending"}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <FiMail className="w-4 h-4 mr-2" />
                    {vendor.email}
                  </div>
                  {vendor.vendorDetails?.phone && (
                    <div className="flex items-center text-sm text-gray-600">
                      <FiPhone className="w-4 h-4 mr-2" />
                      {vendor.vendorDetails.phone}
                    </div>
                  )}
                  {vendor.vendorDetails?.gstNumber && (
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="font-medium mr-2">GST:</span>
                      {vendor.vendorDetails.gstNumber}
                    </div>
                  )}
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => setSelectedVendor(vendor)}
                    className="flex-1 bg-indigo-600 text-white px-3 py-2 rounded-lg hover:bg-indigo-700 transition text-sm flex items-center justify-center"
                  >
                    <FiEye className="w-4 h-4 mr-1" /> View Details
                  </button>
                  <Link
                    to={`/admin/vendors/products/${vendor._id}`}
                    className="flex-1 border border-gray-300 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-50 transition text-sm flex items-center justify-center"
                  >
                    <FiPackage className="w-4 h-4 mr-1" /> Products
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredVendors.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No vendors found</p>
          </div>
        )}

        {/* Vendor Details Modal */}
        {selectedVendor && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Vendor Details
                  </h2>
                  <button
                    onClick={() => setSelectedVendor(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <FiX className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="border-b pb-3">
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Personal Information
                    </h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="text-gray-600">Name:</div>
                      <div className="text-gray-900">{selectedVendor.name}</div>
                      <div className="text-gray-600">Email:</div>
                      <div className="text-gray-900">
                        {selectedVendor.email}
                      </div>
                      <div className="text-gray-600">Joined:</div>
                      <div className="text-gray-900">
                        {new Date(
                          selectedVendor.createdAt,
                        ).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  {selectedVendor.vendorDetails && (
                    <div className="border-b pb-3">
                      <h3 className="font-semibold text-gray-900 mb-2">
                        Business Information
                      </h3>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="text-gray-600">Business Name:</div>
                        <div className="text-gray-900">
                          {selectedVendor.vendorDetails.businessName}
                        </div>
                        <div className="text-gray-600">Phone:</div>
                        <div className="text-gray-900">
                          {selectedVendor.vendorDetails.phone}
                        </div>
                        <div className="text-gray-600">GST Number:</div>
                        <div className="text-gray-900">
                          {selectedVendor.vendorDetails.gstNumber}
                        </div>
                        <div className="text-gray-600">Address:</div>
                        <div className="text-gray-900">
                          {selectedVendor.vendorDetails.businessAddress}
                        </div>
                        <div className="text-gray-600">Description:</div>
                        <div className="text-gray-900 col-span-1">
                          {selectedVendor.vendorDetails.description}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-end">
                    <button
                      onClick={() => setSelectedVendor(null)}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminVendors;
