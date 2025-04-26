import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SearchIcon } from "@heroicons/react/solid";
import Sidebar from "../../reuseable/Sidebar";
import { fetchPendingGymsRequest } from "../../redux/actions/gymActions";
import { BASE_URL } from "../../config";

const ManageGym = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const { gyms, loading, error } = useSelector((state) => state.gym);
  useEffect(() => {
    dispatch(fetchPendingGymsRequest());
  }, [dispatch]);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar onToggle={(collapsed) => setIsSidebarCollapsed(collapsed)} />

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100 overflow-y-auto transition-all duration-300">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-700">Pending GYM</h2>
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
              + Add GYM
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
            <div key={gym._id} className="bg-white p-4 rounded-lg shadow">
              {/* Gym Details */}
              <h3 className="text-lg font-semibold text-gray-800">
                {gym.name}
              </h3>
              <p className="text-sm text-gray-600">
                Address: {gym.location.address}
              </p>
              <p className="text-sm text-gray-600">
                Coordinates: {gym.location.coordinates.join(", ")}
              </p>
              <p className="text-sm text-gray-600">
                Schedule: {gym.schedule.opening_time} -{" "}
                {gym.schedule.closing_time}
              </p>
              <p className="text-sm text-gray-600">
                Days: {gym.schedule.day.join(", ")}
              </p>
              <p className="text-sm text-gray-600">Status: {gym.status}</p>
              <p className="text-sm text-gray-600">About: {gym.about_gym}</p>
              <p className="text-sm text-gray-600">
                Hourly Charges: ₹{gym.charges.hourly}
              </p>
              <p className="text-sm text-gray-600">
                Weekly Charges: ₹{gym.charges.weekly}
              </p>
              <p className="text-sm text-gray-600">
                Monthly Charges: ₹{gym.charges.monthly}
              </p>
              <p className="text-sm text-gray-600">
                Yearly Charges: ₹{gym.charges.yearly}
              </p>
              <p className="text-sm text-gray-600">
                Amenities: {gym.amenities.join(", ")}
              </p>

              {/* Gallery */}
              <div className="mt-4">
                <h4 className="text-sm font-semibold text-gray-700">
                  Gallery:
                </h4>
                <img
                  src={`${BASE_URL}${gym.gallery.gym_front_gallery[0]}`}
                  alt="Gym Front"
                  className="w-full h-40 object-cover rounded-lg mb-2"
                />

                {/* Videos */}
                <h4 className="text-sm font-semibold text-gray-700">Videos:</h4>
                {gym.gallery.gym_video.map((video, index) => (
                  <video
                    key={index}
                    controls
                    className="w-full h-40 object-cover rounded-lg mb-2"
                  >
                    <source src={`${BASE_URL}${video}`} type="video/mp4" />
                  </video>
                ))}

                {/* Service Gallery */}
                <h4 className="text-sm font-semibold text-gray-700">
                  Service Gallery:
                </h4>
                {gym.gallery.service_gallery.map((image, index) => (
                  <img
                    key={index}
                    src={`${BASE_URL}${image}`}
                    alt={`Service ${index + 1}`}
                    className="w-full h-40 object-cover rounded-lg mb-2"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ManageGym;
