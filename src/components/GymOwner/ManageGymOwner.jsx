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
import { fetchGymOwnersRequest } from "../../redux/actions/gymOwnerActions";

const ManageGymOwner = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedOwner, setSelectedOwner] = useState(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [statuses, setStatuses] = useState({});
  const [actionPopup, setActionPopup] = useState({
    isOpen: false,
    action: "",
    owner: null,
  });
  const [reason, setReason] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);

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

  const handleApprove = (owner) => {
    setActionPopup({ isOpen: true, action: "approve", owner });
  };

  const handleReject = (owner) => {
    setActionPopup({ isOpen: true, action: "reject", owner });
  };

  const handleSubmitAction = () => {
    if (actionPopup.action === "approve") {
      setStatuses((prev) => ({ ...prev, [actionPopup.owner.id]: "approved" }));
    } else if (actionPopup.action === "reject") {
      setStatuses((prev) => ({ ...prev, [actionPopup.owner.id]: "rejected" }));
    }
    setActionPopup({ isOpen: false, action: "", owner: null });
    setReason("");
  };

  const handleView = (owner) => {
    setSelectedOwner(owner);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedOwner(null);
  };

  // const handleEdit = (owner) => {
  //   navigate(`/edit-gym-owner/${owner.id}`, { state: { owner } });
  // };

  return (
    <div className="flex h-screen">
      <Sidebar onToggle={(collapsed) => setIsSidebarCollapsed(collapsed)} />

      <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-700">Gym Owners</h2>
          <div className="flex space-x-4">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-2.5 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
            </div>

            <button
              onClick={() => navigate("/add-gym-owner")}
              className="px-4 py-2 bg-black text-white text-sm font-medium rounded-lg shadow hover:bg-gray-800"
            >
              + Add Gym Owner
            </button>
          </div>
        </div>

        {loading && <p className="text-gray-600">Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && gymOwners.length === 0 && (
          <p className="text-gray-600">No gym owners found.</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gymOwners.map((owner) => (
            <div
              key={owner.id}
              className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center relative"
            >
              <h3 className="text-lg font-bold text-gray-800">
                Name : {owner.name}
              </h3>
              <p className="text-sm text-gray-600">Email : {owner.email}</p>
              <p className="text-sm text-gray-600">
                Contact Number: {owner.mobile}
              </p>
              <p className="text-sm text-gray-600">Status: {owner.status}</p>
              <p className="text-sm text-gray-600">
                Registered on: {new Date(owner.createdAt).toLocaleDateString()}
              </p>
              <div className="flex space-x-4 mt-4">
                <button
                  onClick={() => handleView(owner)}
                  className="p-2 bg-black text-white rounded-full hover:bg-blue-700"
                  title="View"
                >
                  <EyeIcon className="w-3 h-3" />
                </button>
                {!statuses[owner.id] && (
                  <button
                    onClick={() => handleApprove(owner)}
                    className="p-2 bg-green-600 text-white rounded-full hover:bg-green-700"
                    title="Approve"
                  >
                    <CheckIcon className="w-3 h-3" />
                  </button>
                )}
                {!statuses[owner.id] && (
                  <button
                    onClick={() => handleReject(owner)}
                    className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700"
                    title="Reject"
                  >
                    <XIcon className="w-3 h-3" />
                  </button>
                )}
                {/* <button
                  onClick={() => handleEdit(owner)}
                  className="p-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600"
                  title="Edit"
                >
                  <PencilIcon className="w-3 h-3" />
                </button> */}
              </div>
              {statuses[owner.id] === "approved" && (
                <span className="absolute top-2 right-2 bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  Approved
                </span>
              )}
              {statuses[owner.id] === "rejected" && (
                <span className="absolute top-2 right-2 bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  Rejected
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-end items-center mt-6 space-x-4">
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
      </main>

      {/* Owner Details Popup */}
      {isPopupOpen && selectedOwner && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
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
              <img
                src={selectedOwner.image}
                alt={selectedOwner.name}
                className="w-24 h-24 rounded-full mb-4"
              />
              <h3 className="text-lg font-bold text-gray-800">
                {selectedOwner.name}
              </h3>
              <p className="text-sm text-gray-600">{selectedOwner.email}</p>
              <p className="text-sm text-gray-600">{selectedOwner.phone}</p>
              <p className="text-sm text-gray-600">{selectedOwner.dob}</p>
              <p className="text-sm text-gray-600">{selectedOwner.address}</p>
              <p className="text-sm text-gray-600">
                ID: {selectedOwner.idNumber}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Action Popup */}
      {actionPopup.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              {actionPopup.action === "approve"
                ? "Approve Owner"
                : "Reject Owner"}
            </h2>
            <textarea
              className="w-full border border-gray-300 rounded-lg p-2 mb-4"
              placeholder="Enter reason..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={() =>
                  setActionPopup({ isOpen: false, action: "", owner: null })
                }
                className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitAction}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageGymOwner;
