import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SearchIcon, EyeIcon } from "@heroicons/react/solid";
import Layout from "../../reuseable/Layout";
import {
  fetchApprovedGymsRequest,
  updateGymStatusRequest,
} from "../../redux/actions/approvedGymActions";
import { MEDIA_URL } from "../../config";
const userType = localStorage.getItem("userType");

const ManageApprovedGym = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    gyms: approvedGyms,
    loading,
    error,
  } = useSelector((state) => state.approvedGyms);

  const [toolkitOpen, setToolkitOpen] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGym, setSelectedGym] = useState(null);

  useEffect(() => {
    dispatch(fetchApprovedGymsRequest());
  }, [dispatch]);

  const handleViewDetails = (gym) => {
    setSelectedGym(gym);
    setIsModalOpen(true);
  };

  const handleToggleStatus = (gym) => {
    const newStatus = gym.status === "Active" ? "Inactive" : "Active";
    dispatch(updateGymStatusRequest(gym._id, newStatus));
    setToolkitOpen(null);
  };

  const toggleToolkit = (gymId) => {
    setToolkitOpen((prev) => (prev === gymId ? null : gymId)); 
  };

  return (
    <Layout>
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-700 mb-4 md:mb-0">
          Approved Gyms
        </h2>
        <div className="flex items-center space-x-4 w-full md:w-auto">
          <div className="relative w-full md:w-auto">
            <SearchIcon className="absolute left-3 top-2.5 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full md:w-auto pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>
          {userType === "AREA_MANAGER" && (
            <button
              onClick={() => navigate("/add-gym-by-area-manager")}
              className="px-3 py-3 bg-black text-white text-sm font-medium rounded-lg shadow hover:bg-gray-800 whitespace-nowrap"
            >
              + Add Gym by Area Manager
            </button>
          )}
        </div>
      </div>

      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && approvedGyms.length === 0 && (
        <p className="text-gray-600">No approved gyms available.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {approvedGyms.map((gym) => (
          <div
            key={gym._id}
            className="bg-white p-4 rounded-lg shadow relative"
          >
            <span
              className={`absolute top-2 right-2 text-xs font-medium px-2.5 py-0.5 rounded ${
                gym.status === "Active"
                  ? "bg-green-100 text-green-800"
                  : gym.status === "Inactive"
                  ? "bg-red-100 text-red-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {gym.status}
            </span>
            <img
              src={`${MEDIA_URL}${gym.gallery.gym_front_gallery[0]}`}
              alt="Gym Front"
              className="w-full h-40 object-cover rounded-lg mb-2"
            />
            <h3 className="text-lg font-semibold text-gray-800">{gym.name}</h3>
            <p className="text-sm text-gray-600">
              Address: {gym.location.address}
            </p>
            <p className="text-sm text-gray-600">Status: {gym.status}</p>
            <div className="absolute bottom-4 right-4 flex space-x-2">
              <button
                onClick={() => handleViewDetails(gym)}
                className="p-2 bg-black text-white rounded-full hover:bg-blue-700"
                title="View"
              >
                <EyeIcon className="w-4 h-4" />
              </button>
              {/* Three-Dot Menu */}
              <div className="relative">
                <button
                  onClick={() => toggleToolkit(gym._id)}
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

                {toolkitOpen === gym._id && (
                  <div className="absolute left-0 bottom-8 mt-2 w-40 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                    <button
                      onClick={() => handleToggleStatus(gym)}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {gym.status === "Active" ? "Deactivate" : "Activate"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && selectedGym && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl overflow-y-auto max-h-screen">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-gray-800">
                {selectedGym.name}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                ✕
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">
                  <strong>Address:</strong> {selectedGym.location.address}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Coordinates:</strong>{" "}
                  {selectedGym.location.coordinates.join(", ")}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Schedule:</strong> {selectedGym.schedule.opening_time}{" "}
                  - {selectedGym.schedule.closing_time}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Days:</strong> {selectedGym.schedule.day.join(", ")}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Status:</strong> {selectedGym.status}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>About:</strong> {selectedGym.about_gym}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Hourly Charges:</strong> ₹{selectedGym.charges.hourly}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Weekly Charges:</strong> ₹{selectedGym.charges.weekly}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Monthly Charges:</strong> ₹
                  {selectedGym.charges.monthly}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Yearly Charges:</strong> ₹{selectedGym.charges.yearly}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Amenities:</strong> {selectedGym.amenities.join(", ")}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  GYM Front
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {selectedGym.gallery.gym_front_gallery.map((image, index) => (
                    <img
                      key={index}
                      src={`${MEDIA_URL}${image}`}
                      alt={`Gallery ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg shadow"
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Service Gallery
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {selectedGym.gallery.service_gallery.map((image, index) => (
                  <img
                    key={index}
                    src={`${MEDIA_URL}${image}`}
                    alt={`Service ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg shadow"
                  />
                ))}
              </div>
            </div>
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Videos
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedGym.gallery.gym_video.map((video, index) => (
                  <video
                    key={index}
                    controls
                    className="w-full h-40 object-cover rounded-lg shadow"
                  >
                    <source src={`${MEDIA_URL}${video}`} type="video/mp4" />
                  </video>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default ManageApprovedGym;
