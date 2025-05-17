import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EyeIcon, SearchIcon, DownloadIcon } from "@heroicons/react/solid";
import Layout from "../../reuseable/Layout";
import {
  fetchGymOwnersRequest,
  updateGymOwnerStatusRequest,
} from "../../redux/actions/gymOwnerActions";
import { exportOwnerDataRequest } from "../../redux/actions/exportDataActions";

const ManageGymOwner = () => {
  const dispatch = useDispatch();

  const [selectedOwner, setSelectedOwner] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [toolkitOpen, setToolkitOpen] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(9);

  const { loading, error, data = {} } = useSelector((state) => state.gymOwner);
  const gymOwners = data.records || [];
  const totalRecords = data.total_records || 0;
  const perPage = data.per_page || limit;
  const totalPages = Math.ceil(totalRecords / perPage);

  useEffect(() => {
    dispatch(
      fetchGymOwnersRequest({ page: currentPage, limit, search: searchQuery })
    );
  }, [dispatch, searchQuery, currentPage, limit]);

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
    const payload = {
      ownerId: owner._id,
      status: newStatus,
    };
    dispatch(updateGymOwnerStatusRequest(payload));
    setToolkitOpen(null);
  };

  const toggleToolkit = (ownerId) => {
    setToolkitOpen((prev) => (prev === ownerId ? null : ownerId));
  };

  const handleExport = () => {
    dispatch(exportOwnerDataRequest());
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleLimitChange = (e) => {
    setLimit(Number(e.target.value));
    setCurrentPage(1);
  };

  return (
    <Layout>
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-700 dark:text-gray-100 mb-4 md:mb-0">
          Gym Owners
        </h2>
        <div className="flex items-center space-x-4 w-full md:w-auto">
          <div className="relative w-full md:w-auto">
            <SearchIcon className="absolute left-3 top-2.5 w-5 h-5 text-gray-500 dark:text-gray-300" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1); // Reset to first page on search
              }}
              className="w-full md:w-auto pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 dark:bg-gray-800 dark:text-gray-100"
            />
          </div>

          {/* Download Button */}
          <button
            onClick={handleExport}
            className="flex items-center px-3 py-3 bg-black dark:bg-gray-800 text-white text-xs font-medium rounded-lg shadow hover:bg-gray-800 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 whitespace-nowrap"
          >
            <DownloadIcon className="w-4 h-4 mr-2" />
            Download Owners
          </button>
        </div>
      </div>

      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && gymOwners.length === 0 && (
        <p className="text-gray-600 dark:text-gray-300">No gym owners found.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {gymOwners.map((owner) => (
          <div
            key={owner._id}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex flex-col items-center relative"
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

            <h4 className="text-sm font-bold text-gray-800 dark:text-gray-100">
              Gym Owner : {owner.name}
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">Email: {owner.email}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">Number: {owner.mobile}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Registered on: {new Date(owner.createdAt).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300">Id on: {owner._id}</p>
            <div className="flex space-x-4 mt-4 items-center">
              <button
                onClick={() => handleView(owner)}
                className="p-2 bg-black dark:bg-gray-700 text-white rounded-full hover:bg-blue-700 dark:hover:bg-blue-600"
                title="View"
              >
                <EyeIcon className="w-3 h-3" />
              </button>

              {/* Toolkit Dropdown */}
              <div className="relative">
                <button
                  onClick={() => toggleToolkit(owner._id)}
                  className="p-2 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-100 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600"
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
                  <div className="absolute left-0 bottom-8 mt-2 w-40 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg z-10">
                    <button
                      onClick={() => handleToggleStatus(owner)}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      {owner.status === "Active" ? "Inactive" : "Activate"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls (bottom, similar to ManageAllGym) */}
      <div className="flex flex-col md:flex-row justify-between items-center mt-8">
        <div className="flex items-center space-x-2">
          <span className="text-gray-700 dark:text-gray-100">Rows per page:</span>
          <select
            value={perPage}
            onChange={handleLimitChange}
            className="border border-gray-300 dark:border-gray-700 rounded px-2 py-1 dark:bg-gray-800 dark:text-gray-100"
          >
            {[5, 10, 20, 50].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center space-x-2 mt-2 md:mt-0">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg ${
              currentPage === 1
                ? "bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
                : "bg-[#24963d] text-white hover:bg-[#24963d]"
            }`}
          >
            Prev
          </button>
          <span className="text-gray-700 dark:text-gray-100">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages || totalPages === 0}
            className={`px-4 py-2 rounded-lg ${
              currentPage === totalPages || totalPages === 0
                ? "bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
                : "bg-[#24963d] text-white hover:bg-[#24963d]"
            }`}
          >
            Next
          </button>
        </div>
      </div>

      {/* Owner Details Popup */}
      {isPopupOpen && selectedOwner && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Owner Details</h2>
              <button
                onClick={closePopup}
                className="text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100"
              >
                ✕
              </button>
            </div>
            <div className="flex flex-col items-center">
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                {selectedOwner.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{selectedOwner.email}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">{selectedOwner.mobile}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Registered on:{" "}
                {new Date(selectedOwner.createdAt).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
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