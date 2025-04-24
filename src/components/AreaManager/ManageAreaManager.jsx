import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckIcon, XIcon, EyeIcon, PencilIcon } from "@heroicons/react/solid"; // Import icons
import Sidebar from "../../reuseable/Sidebar";

const ManageAreaManager = () => {
  const navigate = useNavigate();
  const [selectedManager, setSelectedManager] = useState(null); // State to store the selected manager for the popup
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to toggle the popup

  // Sample data for area managers
  const areaManagers = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+91 9876543210",
      dob: "1990-01-01",
      address: "123 Main Street, City, Country",
      idNumber: "1234-5678-9012",
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
      image:
        "https://lh3.googleusercontent.com/a/ACg8ocJ_BishguTsfWBW98VkCxWPreUwk5xCQYlWsTeO6_VqPfyqgbQ=s288-c-no",
    },
  ];

  const handleApprove = (id) => {
    console.log(`Approved Area Manager with ID: ${id}`);
  };

  const handleReject = (id) => {
    console.log(`Rejected Area Manager with ID: ${id}`);
  };

  const handleApproveAll = () => {
    console.log("Approved all area managers");
    // Add logic to approve all area managers
  };

  const handleRejectAll = () => {
    console.log("Rejected all area managers");
    // Add logic to reject all area managers
  };

  const handleView = (manager) => {
    setSelectedManager(manager); // Set the selected manager
    setIsPopupOpen(true); // Open the popup
  };

  const closePopup = () => {
    setIsPopupOpen(false); // Close the popup
    setSelectedManager(null); // Clear the selected manager
  };

  const handleEdit = (manager) => {
    navigate(`/edit-area-manager/${manager.id}`, { state: { manager } });
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-700">Area Manager</h2>
          <div className="flex space-x-4">
            <button
              onClick={handleApproveAll}
              className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              All Approved
            </button>
            <button
              onClick={handleRejectAll}
              className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              All Rejected
            </button>
            <button
              onClick={() => navigate("/add-manager")}
              className="px-4 py-2 bg-black text-white text-sm font-medium rounded-lg shadow hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              + Add Area Manager
            </button>
          </div>
        </div>

        {/* Approve All and Reject All Buttons */}

        {/* Area Manager Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {areaManagers.map((manager) => (
            <div
              key={manager.id}
              className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center"
            >
              <img
                src={manager.image}
                alt={manager.name}
                className="w-24 h-24 rounded-full mb-4"
              />
              <h3 className="text-lg font-bold text-gray-800">
                {manager.name}
              </h3>
              <p className="text-sm text-gray-600">{manager.email}</p>
              <div className="flex space-x-4 mt-4">
                {/* View Button */}
                <button
                  onClick={() => handleView(manager)}
                  className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
                  title="View"
                >
                  <EyeIcon className="w-5 h-5" />
                </button>
                {/* Approve Button */}
                <button
                  onClick={() => handleApprove(manager.id)}
                  className="p-2 bg-green-600 text-white rounded-full hover:bg-green-700"
                  title="Approve"
                >
                  <CheckIcon className="w-5 h-5" />
                </button>
                {/* Reject Button */}
                <button
                  onClick={() => handleReject(manager.id)}
                  className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700"
                  title="Reject"
                >
                  <XIcon className="w-5 h-5" />
                </button>
                {/* Edit Button */}
                <button
                  onClick={() => handleEdit(manager)}
                  className="p-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600"
                  title="Edit"
                >
                  <PencilIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Popup for Viewing Details */}
      {isPopupOpen && selectedManager && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                Manager Details
              </h2>
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
    </div>
  );
};

export default ManageAreaManager;
