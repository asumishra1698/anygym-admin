import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SearchIcon, EyeIcon } from "@heroicons/react/solid";
import { FaCheck, FaTimes } from "react-icons/fa"; // Import React Icons
import Sidebar from "../../reuseable/Sidebar";
import { fetchPendingGymsRequest } from "../../redux/actions/pendingGymActions";
import { MEDIA_URL } from "../../config";

const ManageGym = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const { gyms, loading, error } = useSelector((state) => state.gym);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGym, setSelectedGym] = useState(null);

  useEffect(() => {
    dispatch(fetchPendingGymsRequest());
  }, [dispatch]);

  const handleViewDetails = (gym) => {
    setSelectedGym(gym);
    setIsModalOpen(true);
  };

  const handleApprove = (gymId) => {
    console.log(`Gym approved: ${gymId}`);
  };

  const handleReject = (gymId) => {
    console.log(`Gym rejected: ${gymId}`);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar onToggle={(collapsed) => setIsSidebarCollapsed(collapsed)} />

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100 overflow-y-auto transition-all duration-300">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-700">Pending Gyms</h2>
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
              onClick={() => navigate("/add-gym")}
              className="px-4 py-2 bg-black text-white text-sm font-medium rounded-lg shadow hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              + Add Gym
            </button>
          </div>
        </div>

        {/* Loading, Error, and Empty States */}
        {loading && <p className="text-gray-600">Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && gyms.length === 0 && (
          <p className="text-gray-600">No pending gyms available.</p>
        )}

        {/* Gym List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gyms.map((gym) => (
            <div
              key={gym._id}
              className="bg-white p-4 rounded-lg shadow relative"
            >
              {/* Gym Image */}
              <img
                src={`${MEDIA_URL}${gym.gallery.gym_front_gallery[0]}`}
                alt="Gym Front"
                className="w-full h-40 object-cover rounded-lg mb-2"
              />

              {/* Gym Details */}
              <h3 className="text-lg font-semibold text-gray-800">
                {gym.name}
              </h3>
              <p className="text-sm text-gray-600">Status: {gym.status}</p>
              <p className="text-sm text-gray-600">
                Address: {gym.location.address}
              </p>

              {/* Action Icons */}
              <div className="absolute bottom-4 right-4 flex space-x-2">
                {/* View Icon */}
                <button
                  onClick={() => handleViewDetails(gym)}
                  className="p-2 bg-black text-white rounded-full hover:bg-blue-700"
                  title="View"
                >
                  <EyeIcon className="w-4 h-4" />
                </button>
                {/* Approve Icon */}
                <button
                  onClick={() => handleApprove(gym._id)}
                  className="p-2 bg-green-600 text-white rounded-full hover:bg-green-700"
                  title="Approve"
                >
                  <FaCheck className="w-4 h-4" />
                </button>

                {/* Reject Icon */}
                <button
                  onClick={() => handleReject(gym._id)}
                  className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700"
                  title="Reject"
                >
                  <FaTimes className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Gym Details Modal */}
      {isModalOpen && selectedGym && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl overflow-y-auto max-h-screen">
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-gray-800">
                {selectedGym.name}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <FaTimes className="h-6 w-6" />
              </button>
            </div>

            {/* Gym Details */}
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

              {/* GYM Front Image*/}
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

            {/* Service Gallery */}
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

            {/* Videos */}
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
    </div>
  );
};

export default ManageGym;
