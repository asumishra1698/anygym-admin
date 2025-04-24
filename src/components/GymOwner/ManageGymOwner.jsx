import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CheckIcon,
  XIcon,
  EyeIcon,
  PencilIcon,
  SearchIcon,
} from "@heroicons/react/solid";
import Sidebar from "../../reuseable/Sidebar";

const ManageGymOwner = () => {
  const navigate = useNavigate();
  const [selectedOwner, setSelectedOwner] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [statuses, setStatuses] = useState({});
  const [actionPopup, setActionPopup] = useState({
    isOpen: false,
    action: "",
    owner: null,
  });
  const [reason, setReason] = useState("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const gymOwners = [
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      phone: "+91 9876543210",
      dob: "1985-05-15",
      address: "123 Main Street, City, Country",
      idNumber: "1234-5678-9012",
      image:
        "https://lh3.googleusercontent.com/a/ACg8ocJ_BishguTsfWBW98VkCxWPreUwk5xCQYlWsTeO6_VqPfyqgbQ=s288-c-no",
    },
    {
      id: 2,
      name: "Bob Smith",
      email: "bob.smith@example.com",
      phone: "+91 9876543211",
      dob: "1990-08-20",
      address: "456 Elm Street, City, Country",
      idNumber: "2345-6789-0123",
      image:
        "https://lh3.googleusercontent.com/a/ACg8ocJ_BishguTsfWBW98VkCxWPreUwk5xCQYlWsTeO6_VqPfyqgbQ=s288-c-no",
    },
    {
      id: 3,
      name: "Charlie Brown",
      email: "charlie.brown@example.com",
      phone: "+91 9876543212",
      dob: "1980-12-25",
      address: "789 Oak Street, City, Country",
      idNumber: "3456-7890-1234",
      image:
        "https://lh3.googleusercontent.com/a/ACg8ocJ_BishguTsfWBW98VkCxWPreUwk5xCQYlWsTeO6_VqPfyqgbQ=s288-c-no",
    },
    {
      id: 4,
      name: "Charlie Brown",
      email: "charlie.brown@example.com",
      phone: "+91 9876543212",
      dob: "1980-12-25",
      address: "789 Oak Street, City, Country",
      idNumber: "3456-7890-1234",
      image:
        "https://lh3.googleusercontent.com/a/ACg8ocJ_BishguTsfWBW98VkCxWPreUwk5xCQYlWsTeO6_VqPfyqgbQ=s288-c-no",
    },
    {
      id: 5,
      name: "Charlie Brown",
      email: "charlie.brown@example.com",
      phone: "+91 9876543212",
      dob: "1980-12-25",
      address: "789 Oak Street, City, Country",
      idNumber: "3456-7890-1234",
      image:
        "https://lh3.googleusercontent.com/a/ACg8ocJ_BishguTsfWBW98VkCxWPreUwk5xCQYlWsTeO6_VqPfyqgbQ=s288-c-no",
    },
    {
      id: 6,
      name: "Charlie Brown",
      email: "charlie.brown@example.com",
      phone: "+91 9876543212",
      dob: "1980-12-25",
      address: "789 Oak Street, City, Country",
      idNumber: "3456-7890-1234",
      image:
        "https://lh3.googleusercontent.com/a/ACg8ocJ_BishguTsfWBW98VkCxWPreUwk5xCQYlWsTeO6_VqPfyqgbQ=s288-c-no",
    },
    {
      id: 7,
      name: "Charlie Brown",
      email: "charlie.brown@example.com",
      phone: "+91 9876543212",
      dob: "1980-12-25",
      address: "789 Oak Street, City, Country",
      idNumber: "3456-7890-1234",
      image:
        "https://lh3.googleusercontent.com/a/ACg8ocJ_BishguTsfWBW98VkCxWPreUwk5xCQYlWsTeO6_VqPfyqgbQ=s288-c-no",
    },
    {
      id: 8,
      name: "Charlie Brown",
      email: "charlie.brown@example.com",
      phone: "+91 9876543212",
      dob: "1980-12-25",
      address: "789 Oak Street, City, Country",
      idNumber: "3456-7890-1234",
      image:
        "https://lh3.googleusercontent.com/a/ACg8ocJ_BishguTsfWBW98VkCxWPreUwk5xCQYlWsTeO6_VqPfyqgbQ=s288-c-no",
    },
    {
      id: 9,
      name: "Charlie Brown",
      email: "charlie.brown@example.com",
      phone: "+91 9876543212",
      dob: "1980-12-25",
      address: "789 Oak Street, City, Country",
      idNumber: "3456-7890-1234",
      image:
        "https://lh3.googleusercontent.com/a/ACg8ocJ_BishguTsfWBW98VkCxWPreUwk5xCQYlWsTeO6_VqPfyqgbQ=s288-c-no",
    },
    {
      id: 10,
      name: "Charlie Brown",
      email: "charlie.brown@example.com",
      phone: "+91 9876543212",
      dob: "1980-12-25",
      address: "789 Oak Street, City, Country",
      idNumber: "3456-7890-1234",
      image:
        "https://lh3.googleusercontent.com/a/ACg8ocJ_BishguTsfWBW98VkCxWPreUwk5xCQYlWsTeO6_VqPfyqgbQ=s288-c-no",
    },
    {
      id: 11,
      name: "Charlie Brown",
      email: "charlie.brown@example.com",
      phone: "+91 9876543212",
      dob: "1980-12-25",
      address: "789 Oak Street, City, Country",
      idNumber: "3456-7890-1234",
      image:
        "https://lh3.googleusercontent.com/a/ACg8ocJ_BishguTsfWBW98VkCxWPreUwk5xCQYlWsTeO6_VqPfyqgbQ=s288-c-no",
    },
    {
      id: 12,
      name: "Charlie Brown",
      email: "charlie.brown@example.com",
      phone: "+91 9876543212",
      dob: "1980-12-25",
      address: "789 Oak Street, City, Country",
      idNumber: "3456-7890-1234",
      image:
        "https://lh3.googleusercontent.com/a/ACg8ocJ_BishguTsfWBW98VkCxWPreUwk5xCQYlWsTeO6_VqPfyqgbQ=s288-c-no",
    },
    {
      id: 13,
      name: "Charlie Brown",
      email: "charlie.brown@example.com",
      phone: "+91 9876543212",
      dob: "1980-12-25",
      address: "789 Oak Street, City, Country",
      idNumber: "3456-7890-1234",
      image:
        "https://lh3.googleusercontent.com/a/ACg8ocJ_BishguTsfWBW98VkCxWPreUwk5xCQYlWsTeO6_VqPfyqgbQ=s288-c-no",
    },
    {
      id: 14,
      name: "Charlie Brown",
      email: "charlie.brown@example.com",
      phone: "+91 9876543212",
      dob: "1980-12-25",
      address: "789 Oak Street, City, Country",
      idNumber: "3456-7890-1234",
      image:
        "https://lh3.googleusercontent.com/a/ACg8ocJ_BishguTsfWBW98VkCxWPreUwk5xCQYlWsTeO6_VqPfyqgbQ=s288-c-no",
    },
    {
      id: 15,
      name: "Charlie Brown",
      email: "charlie.brown@example.com",
      phone: "+91 9876543212",
      dob: "1980-12-25",
      address: "789 Oak Street, City, Country",
      idNumber: "3456-7890-1234",
      image:
        "https://lh3.googleusercontent.com/a/ACg8ocJ_BishguTsfWBW98VkCxWPreUwk5xCQYlWsTeO6_VqPfyqgbQ=s288-c-no",
    },
    {
      id: 16,
      name: "Charlie Brown",
      email: "charlie.brown@example.com",
      phone: "+91 9876543212",
      dob: "1980-12-25",
      address: "789 Oak Street, City, Country",
      idNumber: "3456-7890-1234",
      image:
        "https://lh3.googleusercontent.com/a/ACg8ocJ_BishguTsfWBW98VkCxWPreUwk5xCQYlWsTeO6_VqPfyqgbQ=s288-c-no",
    },
    {
      id: 17,
      name: "Charlie Brown",
      email: "charlie.brown@example.com",
      phone: "+91 9876543212",
      dob: "1980-12-25",
      address: "789 Oak Street, City, Country",
      idNumber: "3456-7890-1234",
      image:
        "https://lh3.googleusercontent.com/a/ACg8ocJ_BishguTsfWBW98VkCxWPreUwk5xCQYlWsTeO6_VqPfyqgbQ=s288-c-no",
    },
    {
      id: 18,
      name: "Charlie Brown",
      email: "charlie.brown@example.com",
      phone: "+91 9876543212",
      dob: "1980-12-25",
      address: "789 Oak Street, City, Country",
      idNumber: "3456-7890-1234",
      image:
        "https://lh3.googleusercontent.com/a/ACg8ocJ_BishguTsfWBW98VkCxWPreUwk5xCQYlWsTeO6_VqPfyqgbQ=s288-c-no",
    },
  ];

  // Calculate pagination
  const totalPages = Math.ceil(gymOwners.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentOwners = gymOwners.slice(startIndex, startIndex + itemsPerPage);

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

  const handleEdit = (owner) => {
    navigate(`/edit-gym-owner/${owner.id}`, { state: { owner } });
  };

  return (
    <div className="flex h-screen">
      <div className="w-64 bg-gray-800 text-white fixed h-full">
        <Sidebar />
      </div>

      <main className="flex-1 ml-64 p-6 bg-gray-100 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-700">Gym Owners</h2>
          <div className="flex space-x-4">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-2.5 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search..."
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentOwners.map((owner) => (
            <div
              key={owner.id}
              className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center relative"
            >
              <img
                src={owner.image}
                alt={owner.name}
                className="w-16 h-16 rounded-full mb-4"
              />
              <h3 className="text-lg font-bold text-gray-800">{owner.name}</h3>
              <p className="text-sm text-gray-600">{owner.email}</p>
              <div className="flex space-x-4 mt-4">
                <button
                  onClick={() => handleView(owner)}
                  className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
                  title="View"
                >
                  <EyeIcon className="w-5 h-5" />
                </button>
                {!statuses[owner.id] && (
                  <button
                    onClick={() => handleApprove(owner)}
                    className="p-2 bg-green-600 text-white rounded-full hover:bg-green-700"
                    title="Approve"
                  >
                    <CheckIcon className="w-5 h-5" />
                  </button>
                )}
                {!statuses[owner.id] && (
                  <button
                    onClick={() => handleReject(owner)}
                    className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700"
                    title="Reject"
                  >
                    <XIcon className="w-5 h-5" />
                  </button>
                )}
                <button
                  onClick={() => handleEdit(owner)}
                  className="p-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600"
                  title="Edit"
                >
                  <PencilIcon className="w-5 h-5" />
                </button>
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
        <div className="flex justify-end items-center mt-6">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-4 py-2 mr-2 rounded-lg ${
              currentPage === 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            Previous
          </button>
          <span className="text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className={`px-4 py-2 ml-2 rounded-lg ${
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
