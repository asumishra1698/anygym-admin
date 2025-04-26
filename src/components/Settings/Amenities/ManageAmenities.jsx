import React, { useState, useEffect } from "react";
import Sidebar from "../../../reuseable/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import {
  addAmenityRequest,
  fetchAmenitiesRequest,
} from "../../../redux/actions/amenityActions";
import { SearchIcon } from "@heroicons/react/solid";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManageAmenities = () => {
  const dispatch = useDispatch();
  const {
    amenities = [],
    loading,
    error,
  } = useSelector((state) => state.amenity);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [amenityName, setAmenityName] = useState("");

  // Fetch amenities on component mount
  useEffect(() => {
    dispatch(fetchAmenitiesRequest());
  }, [dispatch]);

  // Handle adding a new amenity
  const handleAddAmenity = (e) => {
    e.preventDefault();
    if (amenityName.trim()) {
      dispatch(addAmenityRequest({ name: amenityName }));
      toast.success("Amenity added successfully!");
      setIsModalOpen(false);
      setAmenityName("");
    } else {
      toast.error("Amenity name cannot be empty!");
    }
  };

  // Show error toast if there's an error in the Redux state
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white fixed h-full">
        <Sidebar />
      </div>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-6 bg-gray-100 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-700">
            All Amenities
          </h2>
          <div className="flex space-x-4">
            {/* Search Input */}
            <div className="relative">
              <SearchIcon className="absolute left-3 top-2.5 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
            </div>

            {/* Add Amenities Button */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 bg-black text-white text-sm font-medium rounded-lg shadow hover:bg-gray-800"
            >
              + Add Amenities
            </button>
          </div>
        </div>

        {/* Loading, Error, and Empty States */}
        {loading && <p className="text-gray-600">Loading...</p>}
        {!loading && !error && amenities.length === 0 && (
          <p className="text-gray-600">No amenities available.</p>
        )}

        {/* Amenities List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {amenities.map((amenity) => (
            <div key={amenity._id} className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-800">
                {amenity.name}
              </h3>
              <p className="text-sm text-gray-600">
                Status: {amenity.status === 1 ? "Active" : "Inactive"}
              </p>
              <p className="text-sm text-gray-600">
                Created At: {new Date(amenity.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </main>

      {/* Add Amenity Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Add Amenity</h2>
            <form onSubmit={handleAddAmenity}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Amenity Name
                </label>
                <input
                  type="text"
                  value={amenityName}
                  onChange={(e) => setAmenityName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                  required
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  {loading ? "Adding..." : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
};

export default ManageAmenities;
