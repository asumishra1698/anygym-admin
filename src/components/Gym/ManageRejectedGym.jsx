import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SearchIcon, EyeIcon } from "@heroicons/react/solid";
import Layout from "../../reuseable/Layout";
import { fetchApprovedGymsRequest } from "../../redux/actions/approvedGymActions"; // Reusing the same action
import { MEDIA_URL } from "../../config";

const ManageRejectedGym = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userType = localStorage.getItem("userType");

  // Fetch gyms from Redux state
  const {
    gyms: allGyms,
    loading,
    error,
  } = useSelector((state) => state.approvedGyms); // Using the same state for approved gyms

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGym, setSelectedGym] = useState(null);

  useEffect(() => {
    dispatch(fetchApprovedGymsRequest()); // Reusing the same action
  }, [dispatch]);

  const handleViewDetails = (gym) => {
    setSelectedGym(gym);
    setIsModalOpen(true);
  };

  return (
    <Layout>
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-700 mb-4 md:mb-0">
          Rejected Gyms
        </h2>
        <div className="flex items-center space-x-4 w-full md:w-auto">
          {/* Search Input */}
          <div className="relative w-full md:w-auto">
            <SearchIcon className="absolute left-3 top-2.5 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full md:w-auto pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>

          {/* Add Gym Button */}
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

      {/* Loading, Error, and Empty States */}
      {loading && <p className="text-gray-600">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && allGyms.filter((gym) => gym.status === "Rejected").length === 0 && (
        <p className="text-gray-600">No rejected gyms available.</p>
      )}

      {/* Gym List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {allGyms
          .filter((gym) => gym.status === "Reject") // Filter gyms with "Rejected" status
          .map((gym) => (
            <div
              key={gym._id}
              className="bg-white p-4 rounded-lg shadow relative"
            >
              {/* Status Badge */}
              <span className="absolute top-2 right-2 text-xs font-medium px-2.5 py-0.5 rounded bg-red-100 text-red-800">
                Rejected
              </span>

              {/* Gym Image */}
              <img
                src={`${MEDIA_URL}${gym.gallery.gym_front_gallery[0]}`}
                alt="Gym Front"
                className="w-full h-40 object-cover rounded-lg mb-2"
              />

              {/* Gym Details */}
              <h3 className="text-lg font-semibold text-gray-800">{gym.name}</h3>
              <p className="text-sm text-gray-600">
                Address: {gym.location.address}
              </p>
              <p className="text-sm text-gray-600">Status: {gym.status}</p>

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
              </div>
            </div>
          ))}
      </div>

      {/* Gym Details Modal */}
      {isModalOpen && selectedGym && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
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
                ✕
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

              {/* GYM Front Image */}
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
          </div>
        </div>
      )}
    </Layout>
  );
};

export default ManageRejectedGym;