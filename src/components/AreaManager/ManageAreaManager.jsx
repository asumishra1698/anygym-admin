import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  CheckIcon,
  XIcon,
  EyeIcon,
  PencilIcon,
  SearchIcon,
} from "@heroicons/react/solid";
import Sidebar from "../../reuseable/Sidebar";
import { MEDIA_URL } from "../../config";
import { fetchAreaManagersRequest } from "../../redux/actions/areaManagerActions";

const ManageAreaManager = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [selectedManager, setSelectedManager] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);

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

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedManager(null);
  };

  // const handleEdit = (manager) => {
  //   navigate(`/edit-area-manager/${manager._id}`, { state: { manager } });
  // };

  const totalPages = Math.ceil(totalRecords / limit);
  const itemsPerPageOptions = [5, 10, 20, 50, 100];

  return (
    <div className="flex h-screen">     
      <Sidebar onToggle={(collapsed) => setIsSidebarCollapsed(collapsed)} />

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100 overflow-y-auto transition-all duration-300">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-700">Area Manager</h2>
          <div className="flex space-x-4">
            {/* Search Input */}
            <div className="relative">
              <SearchIcon className="absolute left-3 top-2.5 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search by name, email or mobile..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
            </div>

            {/* Add Area Manager Button */}
            <button
              onClick={() => navigate("/add-manager")}
              className="px-4 py-2 bg-black text-white text-sm font-medium rounded-lg shadow hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              + Add Area Manager
            </button>
          </div>
        </div>

        {/* Loading, Error, and Empty States */}
        {loading && <p className="text-gray-600">Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && areaManagers.length === 0 && (
          <p className="text-gray-600">No area managers found.</p>
        )}

        {/* Area Manager Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {areaManagers.map((manager) => (
            <div
              key={manager._id}
              className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center relative"
            >
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
              <h3 className="text-lg font-bold text-gray-800">
                {manager.name}
              </h3>
              <p className="text-sm text-gray-600">{manager.email}</p>
              <p className="text-sm text-gray-600">
                Registered on:{" "}
                {new Date(manager.createdAt).toLocaleDateString()}
              </p>

              {/* Action Buttons */}
              <div className="flex space-x-4 mt-4">
                {/* View Button */}
                <button
                  onClick={() => handleView(manager)}
                  className="p-2 bg-black text-white rounded-full hover:bg-blue-700"
                  title="View"
                >
                  <EyeIcon className="w-3 h-3" />
                </button>

                {/* Approve Button */}
                <button
                  className="p-2 bg-green-600 text-white rounded-full hover:bg-green-700"
                  title="Approve"
                >
                  <CheckIcon className="w-3 h-3" />
                </button>

                {/* Reject Button */}
                <button
                  className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700"
                  title="Reject"
                >
                  <XIcon className="w-3 h-3" />
                </button>

                {/* Edit Button */}
                {/* <button
                  onClick={() => handleEdit(manager)}
                  className="p-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600"
                  title="Edit"
                >
                  <PencilIcon className="w-3 h-3" />
                </button> */}
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-end items-center mt-6 space-x-4">
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

          {/* Page Number Dropdown */}
          <div className="flex items-center space-x-2">
            <label htmlFor="pageNumber" className="text-gray-700">
              Page:
            </label>
            <select
              id="pageNumber"
              value={currentPage}
              onChange={(e) => setCurrentPage(Number(e.target.value))}
              className="border border-gray-300 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              {Array.from({ length: totalPages }, (_, index) => (
                <option key={index + 1} value={index + 1}>
                  {index + 1}
                </option>
              ))}
            </select>
          </div>
        </div>
      </main>

      {/* Modal for Viewing Manager Details */}
      {isModalOpen && selectedManager && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Manager Details</h2>
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
              <strong>DOB:</strong> {selectedManager.dob}
            </p>
            <p>
              <strong>Address:</strong>{" "}
              {selectedManager.location?.address || "N/A"}
            </p>
            <p>
              <strong>Status:</strong> {selectedManager.status}
            </p>
            <p>
              <strong>Referral ID:</strong>{" "}
              {selectedManager.referral_id || "N/A"}
            </p>
            <p>
              <strong>Aadhar Number:</strong>{" "}
              {selectedManager.idNumber || "N/A"}
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
    </div>
  );
};

export default ManageAreaManager;
