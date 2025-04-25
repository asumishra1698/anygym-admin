import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CheckIcon,
  XIcon,
  EyeIcon,
  PencilIcon,
  SearchIcon,
} from "@heroicons/react/solid";
import Sidebar from "../../reuseable/Sidebar";

const ManageAreaManager = () => {
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [selectedManager, setSelectedManager] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [statuses, setStatuses] = useState({});
  const [actionPopup, setActionPopup] = useState({
    isOpen: false,
    action: "",
    manager: null,
  });
  const [reason, setReason] = useState("");

  const areaManagers = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+91 9876543210",
      dob: "1990-01-01",
      address: "123 Main Street, City, Country",
      idNumber: "1234-5678-9012",
      registrationDate: "2023-01-15",
      image:
        "https://lh3.googleusercontent.com/a/ACg8ocJ_BishguTsfWBW98VkCxWPreUwk5xCQYlWsTeO6_VqPfyqgbQ=s288-c-no",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "+91 9876543211",
      dob: "1992-05-15",
      address: "456 Elm Street, City, Country",
      idNumber: "2345-6789-0123",
      registrationDate: "2023-01-15",
      image:
        "https://lh3.googleusercontent.com/a/ACg8ocJ_BishguTsfWBW98VkCxWPreUwk5xCQYlWsTeO6_VqPfyqgbQ=s288-c-no",
    },
    {
      id: 3,
      name: "Michael Johnson",
      email: "michael.johnson@example.com",
      phone: "+91 9876543212",
      dob: "1985-09-20",
      address: "789 Oak Street, City, Country",
      idNumber: "3456-7890-1234",
      registrationDate: "2023-01-15",
      image:
        "https://lh3.googleusercontent.com/a/ACg8ocJ_BishguTsfWBW98VkCxWPreUwk5xCQYlWsTeO6_VqPfyqgbQ=s288-c-no",
    },
  ];

  const handleApprove = (manager) => {
    setActionPopup({ isOpen: true, action: "approve", manager });
  };

  const handleReject = (manager) => {
    setActionPopup({ isOpen: true, action: "reject", manager });
  };

  const handleSubmitAction = () => {
    if (actionPopup.action === "approve") {
      setStatuses((prev) => ({
        ...prev,
        [actionPopup.manager.id]: "approved",
      }));
    } else if (actionPopup.action === "reject") {
      setStatuses((prev) => ({
        ...prev,
        [actionPopup.manager.id]: "rejected",
      }));
    }
    setActionPopup({ isOpen: false, action: "", manager: null });
    setReason("");
  };

  const handleView = (manager) => {
    setSelectedManager(manager);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedManager(null);
  };

  const handleEdit = (manager) => {
    navigate(`/edit-area-manager/${manager.id}`, { state: { manager } });
  };

  return (
    <div className="flex h-screen">
      <Sidebar onToggle={(collapsed) => setIsSidebarCollapsed(collapsed)} />
      <main className="flex-1 p-6 bg-gray-100 overflow-y-auto transition-all duration-300">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-700">Area Manager</h2>
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
              onClick={() => navigate("/add-manager")}
              className="px-4 py-2 bg-black text-white text-sm font-medium rounded-lg shadow hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              + Add Area Manager
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {areaManagers.map((manager) => (
            <div
              key={manager.id}
              className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center relative"
            >
              <img
                src={manager.image}
                alt={manager.name}
                className="w-16 h-16 rounded-full mb-4"
              />
              <h3 className="text-lg font-bold text-gray-800">
                {manager.name}
              </h3>
              <p className="text-sm text-gray-600">{manager.email}</p>
              <p className="text-sm text-gray-600">
                Registered on: {manager.registrationDate}
              </p>
              <div className="flex space-x-4 mt-4">
                {/* View Button */}
                <button
                  onClick={() => handleView(manager)}
                  className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
                  title="View"
                >
                  <EyeIcon className="w-3 h-3" />
                </button>
                {!statuses[manager.id] && (
                  <button
                    onClick={() => handleApprove(manager)}
                    className="p-2 bg-green-600 text-white rounded-full hover:bg-green-700"
                    title="Approve"
                  >
                    <CheckIcon className="w-3 h-3" />
                  </button>
                )}

                {!statuses[manager.id] && (
                  <button
                    onClick={() => handleReject(manager)}
                    className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700"
                    title="Reject"
                  >
                    <XIcon className="w-3 h-3" />
                  </button>
                )}

                <button
                  onClick={() => handleEdit(manager)}
                  className="p-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600"
                  title="Edit"
                >
                  <PencilIcon className="w-3 h-3" />
                </button>
              </div>

              {statuses[manager.id] === "approved" && (
                <span className="absolute top-2 right-2 bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  Approved
                </span>
              )}
              {statuses[manager.id] === "rejected" && (
                <span className="absolute top-2 right-2 bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  Rejected
                </span>
              )}
            </div>
          ))}
        </div>
      </main>
      {/* Owner Details Popup */}
      {isPopupOpen && selectedManager && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Area Manager Details</h2>
              <button
                onClick={closePopup}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="flex flex-col items-center">
              <img
                src={selectedManager.image}
                alt={selectedManager.name}
                className="w-24 h-24 rounded-full mb-4"
              />
              <h3 className="text-lg font-bold text-gray-800">
                {selectedManager.name}
              </h3>
              <p className="text-sm text-gray-600">{selectedManager.email}</p>
              <p className="text-sm text-gray-600">{selectedManager.phone}</p>
              <p className="text-sm text-gray-600">{selectedManager.dob}</p>
              <p className="text-sm text-gray-600">{selectedManager.address}</p>
              <p className="text-sm text-gray-600">
                ID: {selectedManager.idNumber}
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

export default ManageAreaManager;
