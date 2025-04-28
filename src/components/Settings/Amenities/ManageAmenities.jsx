import React, { useState, useEffect } from "react";
import Sidebar from "../../../reuseable/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { PencilIcon, TrashIcon } from "@heroicons/react/solid";
import {
  addAmenityRequest,
  fetchAmenitiesRequest,
  updateAmenityRequest,
  deleteAmenityRequest,
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
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedAmenity, setSelectedAmenity] = useState(null);
  const [amenityName, setAmenityName] = useState("");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  useEffect(() => {
    dispatch(fetchAmenitiesRequest());
  }, [dispatch]);

  const handleAddOrEditAmenity = (e) => {
    e.preventDefault();
    if (amenityName.trim()) {
      if (isEditMode) {
        // Dispatch update action
        dispatch(
          updateAmenityRequest({ id: selectedAmenity._id, name: amenityName })
        );
      } else {
        // Dispatch add action
        dispatch(addAmenityRequest({ name: amenityName }));
        toast.success("Amenity added successfully!");
      }
      setIsModalOpen(false);
      setAmenityName("");
      setIsEditMode(false);
      setSelectedAmenity(null);
    } else {
      toast.error("Amenity name cannot be empty!");
    }
  };

  const handleEditClick = (amenity) => {
    setIsEditMode(true);
    setSelectedAmenity(amenity);
    setAmenityName(amenity.name);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (amenityId) => {
    if (window.confirm("Are you sure you want to delete this amenity?")) {
      dispatch(deleteAmenityRequest(amenityId));
      toast.success("Amenity deleted successfully!");
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <div className="flex h-screen">
      <Sidebar onToggle={(collapsed) => setIsSidebarCollapsed(collapsed)} />
      <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-700">
            All Amenities
          </h2>
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
              onClick={() => {
                setIsEditMode(false);
                setAmenityName("");
                setIsModalOpen(true);
              }}
              className="px-4 py-2 bg-black text-white text-sm font-medium rounded-lg shadow hover:bg-gray-800"
            >
              + Add Amenities
            </button>
          </div>
        </div>

        {loading && <p className="text-gray-600">Loading...</p>}
        {!loading && !error && amenities.length === 0 && (
          <p className="text-gray-600">No amenities available.</p>
        )}

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
              <div className="flex justify-end space-x-4 mt-4">
                <button
                  onClick={() => handleEditClick(amenity)}
                  className="p-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600"
                  title="Edit"
                >
                  <PencilIcon className="w-3 h-3" />
                </button>
                <button
                  onClick={() => handleDeleteClick(amenity._id)}
                  className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                  title="Delete"
                >
                  <TrashIcon className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">
              {isEditMode ? "Edit Amenity" : "Add Amenity"}
            </h2>
            <form onSubmit={handleAddOrEditAmenity}>
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
                  onClick={() => {
                    setIsModalOpen(false);
                    setIsEditMode(false);
                    setAmenityName("");
                  }}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  {loading
                    ? isEditMode
                      ? "Updating..."
                      : "Adding..."
                    : isEditMode
                    ? "Update"
                    : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default ManageAmenities;
