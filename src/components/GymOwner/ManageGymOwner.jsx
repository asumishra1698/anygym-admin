import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { EyeIcon, SearchIcon } from "@heroicons/react/solid";
import Layout from "../../reuseable/Layout";
import { fetchGymOwnersRequest, updateGymOwnerStatusRequest } from "../../redux/actions/gymOwnerActions";

const ManageGymOwner = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedOwner, setSelectedOwner] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [toolkitOpen, setToolkitOpen] = useState(null); // Track which owner's toolkit is open
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(12);

  const {
    loading,
    gymOwners = [],
    totalRecords = 0,
    error,
  } = useSelector((state) => state.gymOwner);

  useEffect(() => {
    dispatch(fetchGymOwnersRequest(currentPage, limit, searchQuery));
  }, [dispatch, currentPage, limit, searchQuery]);

  const totalPages = Math.ceil(totalRecords / limit);
  const itemsPerPageOptions = [5, 10, 20, 50, 100];

  const handleView = (owner) => {
    setSelectedOwner(owner);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedOwner(null);
  };

  const handleToggleStatus = (owner) => {
    const newStatus = owner.status === "Active" ? "Inactive" : "Active";
    dispatch(updateGymOwnerStatusRequest(owner._id, newStatus));
    setToolkitOpen(null); 
  };

  const toggleToolkit = (ownerId) => {
    setToolkitOpen((prev) => (prev === ownerId ? null : ownerId)); // Toggle toolkit visibility
  };

  return (
    <Layout>
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-700 mb-4 md:mb-0">
          Gym Owners
        </h2>
        <div className="flex items-center space-x-4 w-full md:w-auto">
          <div className="relative w-full md:w-auto">
            <SearchIcon className="absolute left-3 top-2.5 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-auto pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>

          <button
            onClick={() => navigate("/add-gym-owner")}
            className="px-3 py-3 bg-black text-white text-xs font-medium rounded-lg shadow hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 whitespace-nowrap"
          >
            + Add Gym Owner
          </button>
        </div>
      </div>

      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && gymOwners.length === 0 && (
        <p className="text-gray-600">No gym owners found.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {gymOwners.map((owner) => (
          <div
            key={owner._id}
            className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center relative"
          >
            {/* Badge for Status */}
            <span
              className={`absolute top-2 right-2 text-xs font-medium px-2.5 py-0.5 rounded ${
                owner.status === "Active"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {owner.status}
            </span>

            <h4 className="text-sm font-bold text-gray-800">
              Gym Owner : {owner.name}
            </h4>
            <p className="text-sm text-gray-600">Email: {owner.email}</p>
            <p className="text-sm text-gray-600">
              Number: {owner.mobile}
            </p>
            <p className="text-sm text-gray-600">
              Registered on: {new Date(owner.createdAt).toLocaleDateString()}
            </p>
            <div className="flex space-x-4 mt-4 items-center">
              <button
                onClick={() => handleView(owner)}
                className="p-2 bg-black text-white rounded-full hover:bg-blue-700"
                title="View"
              >
                <EyeIcon className="w-3 h-3" />
              </button>

              {/* Toolkit Dropdown */}
              <div className="relative">
                <button
                  onClick={() => toggleToolkit(owner._id)}
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

                {toolkitOpen === owner._id && (
                  <div className="absolute left-0 bottom-8 mt-2 w-40 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                    <button
                      onClick={() => handleToggleStatus(owner)}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {owner.status === "Active" ? "Deactivate" : "Activate"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-6 space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="flex items-center space-x-2">
          <label htmlFor="limit" className="text-gray-700">
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

        <div className="flex items-center space-x-4">
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

      {/* Owner Details Popup */}
      {isPopupOpen && selectedOwner && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Owner Details</h2>
              <button
                onClick={closePopup}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="flex flex-col items-center">
              <h3 className="text-lg font-bold text-gray-800">
                {selectedOwner.name}
              </h3>
              <p className="text-sm text-gray-600">{selectedOwner.email}</p>
              <p className="text-sm text-gray-600">{selectedOwner.mobile}</p>
              <p className="text-sm text-gray-600">
                Registered on:{" "}
                {new Date(selectedOwner.createdAt).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-600">
                Status: {selectedOwner.status}
              </p>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default ManageGymOwner;