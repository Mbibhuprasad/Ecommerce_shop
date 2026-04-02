import React, { useState, useEffect } from "react";
import {
  getAllVendorApplications,
  approveVendor,
  rejectVendor,
} from "../../services/api";
import {
  FiCheck,
  FiX,
  FiEye,
  FiClock,
  FiUser,
  FiBriefcase,
  FiMapPin,
  FiPhone,
  FiMail,
} from "react-icons/fi";
import toast from "react-hot-toast";

const AdminApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState(null);
  const [remarks, setRemarks] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [actionType, setActionType] = useState("");

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await getAllVendorApplications();
      setApplications(response.data?.applications || []);
    } catch (error) {
      console.error("Failed to fetch applications:", error);
      toast.error("Failed to load applications");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      await approveVendor(id, remarks);
      toast.success("Vendor application approved successfully!");
      fetchApplications();
      setShowModal(false);
      setRemarks("");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to approve application",
      );
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectVendor(id, remarks);
      toast.success("Vendor application rejected");
      fetchApplications();
      setShowModal(false);
      setRemarks("");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to reject application",
      );
    }
  };

  const openModal = (app, type) => {
    setSelectedApp(app);
    setActionType(type);
    setShowModal(true);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return (
          <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">
            Pending
          </span>
        );
      case "approved":
        return (
          <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
            Approved
          </span>
        );
      case "rejected":
        return (
          <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">
            Rejected
          </span>
        );
      default:
        return (
          <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">
            {status}
          </span>
        );
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
            Vendor Applications
          </h1>
          <p className="text-gray-600 mt-2">
            Review and manage vendor registration requests
          </p>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Applications</p>
                <p className="text-2xl font-bold text-gray-900">
                  {applications.length}
                </p>
              </div>
              <FiBriefcase className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {applications.filter((a) => a.status === "pending").length}
                </p>
              </div>
              <FiClock className="w-8 h-8 text-yellow-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Approved</p>
                <p className="text-2xl font-bold text-green-600">
                  {applications.filter((a) => a.status === "approved").length}
                </p>
              </div>
              <FiCheck className="w-8 h-8 text-green-500" />
            </div>
          </div>
        </div>

        {/* Applications List */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Business
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Owner
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    GST Number
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {applications.map((app) => (
                  <tr key={app._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-gray-900">
                          {app.businessName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {app.description?.slice(0, 50)}...
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {app.user?.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {app.user?.email}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{app.phone}</div>
                      <div className="text-sm text-gray-500">
                        {app.businessAddress?.slice(0, 30)}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {app.gstNumber}
                    </td>
                    <td className="px-6 py-4">{getStatusBadge(app.status)}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(app.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            setSelectedApp(app);
                            setShowModal(true);
                            setActionType("view");
                          }}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <FiEye className="w-5 h-5" />
                        </button>
                        {app.status === "pending" && (
                          <>
                            <button
                              onClick={() => openModal(app, "approve")}
                              className="text-green-600 hover:text-green-800"
                            >
                              <FiCheck className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => openModal(app, "reject")}
                              className="text-red-600 hover:text-red-800"
                            >
                              <FiX className="w-5 h-5" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
                {applications.length === 0 && (
                  <tr>
                    <td
                      colSpan="7"
                      className="px-6 py-8 text-center text-gray-500"
                    >
                      No applications found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal for View/Approve/Reject */}
        {showModal && selectedApp && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {actionType === "view"
                      ? "Application Details"
                      : actionType === "approve"
                        ? "Approve Application"
                        : "Reject Application"}
                  </h2>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <FiX className="w-6 h-6" />
                  </button>
                </div>

                {/* Application Details */}
                <div className="space-y-4 mb-6">
                  <div className="border-b pb-3">
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Business Information
                    </h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="text-gray-600">Business Name:</div>
                      <div className="text-gray-900 font-medium">
                        {selectedApp.businessName}
                      </div>
                      <div className="text-gray-600">GST Number:</div>
                      <div className="text-gray-900">
                        {selectedApp.gstNumber}
                      </div>
                      <div className="text-gray-600">Phone:</div>
                      <div className="text-gray-900">{selectedApp.phone}</div>
                      <div className="text-gray-600">Address:</div>
                      <div className="text-gray-900">
                        {selectedApp.businessAddress}
                      </div>
                      <div className="text-gray-600">Description:</div>
                      <div className="text-gray-900 col-span-1">
                        {selectedApp.description}
                      </div>
                    </div>
                  </div>

                  <div className="border-b pb-3">
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Owner Information
                    </h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="text-gray-600">Name:</div>
                      <div className="text-gray-900">
                        {selectedApp.user?.name}
                      </div>
                      <div className="text-gray-600">Email:</div>
                      <div className="text-gray-900">
                        {selectedApp.user?.email}
                      </div>
                    </div>
                  </div>

                  {selectedApp.adminRemarks && (
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">
                        Admin Remarks
                      </h3>
                      <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                        {selectedApp.adminRemarks}
                      </p>
                    </div>
                  )}
                </div>

                {/* Action Form */}
                {(actionType === "approve" || actionType === "reject") && (
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Remarks (Optional)
                    </label>
                    <textarea
                      value={remarks}
                      onChange={(e) => setRemarks(e.target.value)}
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                      placeholder={`Add remarks for ${actionType}...`}
                    />
                  </div>
                )}

                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  {(actionType === "approve" || actionType === "reject") && (
                    <button
                      onClick={() => {
                        if (actionType === "approve") {
                          handleApprove(selectedApp._id);
                        } else {
                          handleReject(selectedApp._id);
                        }
                      }}
                      className={`px-4 py-2 rounded-lg text-white ${
                        actionType === "approve"
                          ? "bg-green-600 hover:bg-green-700"
                          : "bg-red-600 hover:bg-red-700"
                      }`}
                    >
                      {actionType === "approve" ? "Approve" : "Reject"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminApplications;
