import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  CheckIcon,
  XIcon,
  EyeIcon,
  SearchIcon,
  PencilIcon,
} from "@heroicons/react/solid";
import Layout from "../../reuseable/Layout";
import { MEDIA_URL } from "../../config";
import {
  fetchAreaManagersRequest,
  updateAreaManagerStatusRequest,
} from "../../redux/actions/areaManagerActions";

const ManageAreaManager = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedManager, setSelectedManager] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const [toolkitOpen, setToolkitOpen] = useState(null);

  const {
    loading,
    areaManagers = [],
    totalRecords = 0,
    error,
  } = useSelector((state) => state.areaManager);

  useEffect(() => {
    dispatch(fetchAreaManagersRequest(currentPage, limit, searchQuery));
  }, [dispatch, currentPage, limit, searchQuery]);

  const handleView = (manager) => {
    setSelectedManager(manager);
    setIsModalOpen(true);
  };

  const handleEdit = (manager) => {
    navigate(`/edit-area-manager/${manager._id}`);
  };

  const toggleToolkit = (managerId) => {
    setToolkitOpen((prev) => (prev === managerId ? null : managerId));
  };

  const handleStatusChange = (manager, newStatus) => {
    dispatch(updateAreaManagerStatusRequest(manager._id, newStatus));
    setToolkitOpen(null); // Close the toolkit after selecting an option
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedManager(null);
  };

  const totalPages = Math.ceil(totalRecords / limit);
  const itemsPerPageOptions = [5, 10, 20, 50, 100];

  return (
    <Layout>
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Manage Area Managers
        </h2>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-2.5 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>
          <button
            onClick={() => navigate("/add-manager")}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            + Add Manager
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500">{error}</p>}

      {/* No Data Message */}
      {!loading && !error && areaManagers.length === 0 && (
        <p className="text-gray-600">No area managers found.</p>
      )}

      {/* Area Manager Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {areaManagers.map((manager) => (
          <div
            key={manager._id}
            className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center relative"
          >
            {/* Status Badge */}
            <span
              className={`absolute top-2 right-2 text-xs font-medium px-2.5 py-0.5 rounded ${
                manager.status === "Active"
                  ? "bg-green-100 text-green-800"
                  : manager.status === "Rejected"
                  ? "bg-red-100 text-red-800"
                  : manager.status === "Inactive"
                  ? "bg-gray-100 text-gray-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {manager.status}
            </span>

            {/* Profile Image */}
            <img
              src={
                manager.profileImage
                  ? `${MEDIA_URL}${manager.profileImage}`
                  : `${MEDIA_URL}/default-profile.png`
              }
              alt={manager.name}
              className="w-16 h-16 rounded-full mb-4"
            />

            {/* Manager Details */}
            <h3 className="text-lg font-bold text-gray-800">{manager.name}</h3>
            <p className="text-sm text-gray-600">{manager.email}</p>
            <p className="text-sm text-gray-600">Total Gym : 10</p>
            <p className="text-sm text-gray-600">
              Registered on: {new Date(manager.createdAt).toLocaleDateString()}
            </p>

            {/* Action Buttons */}
            <div className="flex space-x-4 mt-4 items-center">
              {/* View Button */}
              <button
                onClick={() => handleView(manager)}
                className="p-2 bg-black text-white rounded-full hover:bg-blue-700"
                title="View"
              >
                <EyeIcon className="w-3 h-3" />
              </button>

              {/* Edit Button */}
              {manager.status === "Inactive" && (
                <button
                  onClick={() => handleEdit(manager)}
                  className="p-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600"
                  title="Edit"
                >
                  <PencilIcon className="w-3 h-3" />
                </button>
              )}

              {/* Three-Dot Menu */}
              <div className="relative">
                <button
                  onClick={() => toggleToolkit(manager._id)}
                  className="p-2 bg-gray-200 text-gray-600 rounded-full hover:bg-gray-300"
                  title="More Actions"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v.01M12 12v.01M12 18v.01"
                    />
                  </svg>
                </button>

                {/* Toolkit Dropdown */}
                {toolkitOpen === manager._id && (
                  <div className="absolute left-0 bottom-8 mt-2 w-40 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                    <button
                      onClick={() => handleStatusChange(manager, "Active")}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Activate
                    </button>
                    <button
                      onClick={() => handleStatusChange(manager, "Inactive")}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Inactive
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center mt-6 space-y-4 md:space-y-0 md:space-x-4">
        {/* Items Per Page Dropdown */}
        <div className="flex items-center space-x-2">
          <label htmlFor="itemsPerPage" className="text-gray-700">
            Items per page:
          </label>
          <select
            id="limit"
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
            className="border border-gray-300 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            {itemsPerPageOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* Pagination Buttons */}
        <div className="flex space-x-4">
          {/* Previous Button */}
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg ${
              currentPage === 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            Previous
          </button>

          {/* Page Indicator */}
          <span className="text-gray-700">
            Page {currentPage} of {totalPages}
          </span>

          {/* Next Button */}
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg ${
              currentPage === totalPages
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            Next
          </button>
        </div>
      </div>

      {/* Modal for Viewing Manager Details */}
      {isModalOpen && selectedManager && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Area Manager Details</h2>
            <img
              src={`${MEDIA_URL}${selectedManager.profileImage}`}
              alt={selectedManager.name}
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <p>
              <strong>Name:</strong> {selectedManager.name}
            </p>
            <p>
              <strong>Email:</strong> {selectedManager.email}
            </p>
            <p>
              <strong>Mobile:</strong> {selectedManager.mobile}
            </p>
            <p>
              <strong>Referral Id:</strong> {selectedManager.referral_id}
            </p>
            <p>
              <strong>Status:</strong> {selectedManager.status}
            </p>
            <p>
              <strong>Registered On:</strong>{" "}
              {new Date(selectedManager.createdAt).toLocaleDateString()}
            </p>
            <button
              onClick={handleCloseModal}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default ManageAreaManager;
