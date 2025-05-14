import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  SearchIcon,
  EyeIcon,
  UploadIcon,
  DownloadIcon,
} from "@heroicons/react/solid";
import Layout from "../../reuseable/Layout";
import { fetchGymsRequest } from "../../redux/actions/allGymActions";
import { updateGymStatusRequest } from "../../redux/actions/approvedGymActions";
import { MEDIA_URL } from "../../config";
import { fetchAmenitiesRequest } from "../../redux/actions/amenityActions";
import Swal from "sweetalert2";
import { exportGymDataRequest } from "../../redux/actions/exportDataActions"; 

import {
  uploadGalleryRequest,
  deleteMediaRequest,
} from "../../redux/actions/uploadActions";

const ManageAllGym = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    gyms: allGyms = [],
    totalRecords = 0,
    loading,
    error,
  } = useSelector((state) => state.allGyms);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGym, setSelectedGym] = useState(null);
  const [toolkitOpen, setToolkitOpen] = useState(null);
  const { amenities = [] } = useSelector((state) => state.amenity);
  const { loading: uploadLoading } = useSelector(
    (state) => state.uploadGallery
  );

  // const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(12);

  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState({
    gymFront: [],
    service: [],
    videos: [],
  });

  const userType = localStorage.getItem("userType");

  useEffect(() => {
    dispatch(fetchGymsRequest(currentPage, limit));
    dispatch(fetchAmenitiesRequest());
  }, [dispatch, currentPage, limit]);

  const totalPages = Math.ceil(totalRecords / limit);
  const itemsPerPageOptions = [20, 50, 100];

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

  const getAmenityNames = (amenityIds) => {
    if (!Array.isArray(amenityIds) || amenityIds.length === 0) {
      return "No Amenities Available";
    }
    return amenityIds
      .map((id) => {
        const amenity = amenities.find((item) => item._id === id);
        return amenity ? amenity.name : "Unknown Amenity";
      })
      .join(", ");
  };

  const handleFileChange = (e, type) => {
    const files = Array.from(e.target.files);
    setSelectedFiles((prev) => ({
      ...prev,
      [type]: [...prev[type], ...files],
    }));
  };

  const handleUploadSubmit = (e) => {
    e.preventDefault();

    if (!selectedGym || !selectedGym._id) {
      alert("Gym ID is required.");
      return;
    }

    if (
      selectedFiles.gymFront.length === 0 &&
      selectedFiles.service.length === 0 &&
      selectedFiles.videos.length === 0
    ) {
      alert("Please select files to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("gym_id", selectedGym._id);

    selectedFiles.gymFront.forEach((file) =>
      formData.append("gym_front_gallery", file)
    );
    selectedFiles.service.forEach((file) =>
      formData.append("service_gallery", file)
    );
    selectedFiles.videos.forEach((file) => formData.append("gym_video", file));

    dispatch(
      uploadGalleryRequest({
        formData,
      })
    );
  };

  const handleDeleteFile = (type, index) => {
    setSelectedFiles((prev) => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index),
    }));
  };

  const handleDeleteMedia = (gymId, type, fileUrl) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(
          deleteMediaRequest({
            gymId,
            type,
            fileUrl,
          })
        );

        Swal.fire("Deleted!", "Your media has been deleted.", "success");
      }
    });
  };

  const handleDownload = () => {
    dispatch(exportGymDataRequest());
  };

  return (
    <Layout>
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-700 mb-4 md:mb-0">
          All Gyms
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

          <button
            onClick={handleDownload}
            className="flex items-center px-3 py-3 bg-black text-white text-xs font-medium rounded-lg shadow hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 whitespace-nowrap"
          >
            <DownloadIcon className="w-4 h-4 mr-2" />
            Download GYM
          </button>

          {userType === "AREA_MANAGER" && (
            <button
              onClick={() => navigate("/add-gym-by-area-manager")}
              className="px-3 py-3 bg-black text-white text-sm font-medium rounded-lg shadow hover:bg-gray-800 whitespace-nowrap"
            >
              + Add Gym
            </button>
          )}
        </div>
      </div>

      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && allGyms.length === 0 && (
        <p className="text-gray-600">No gyms available.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {allGyms.map((gym) => (
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
              Gym Pincode: {gym.gymPincode}
            </p>
            <p className="text-sm text-gray-600">Schedule: {gym.status}</p>
            <div className="absolute bottom-4 right-4 flex space-x-2">
              <button
                onClick={() => handleViewDetails(gym)}
                className="p-2 bg-black text-white rounded-full hover:bg-blue-700"
                title="View"
              >
                <EyeIcon className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  setSelectedGym(gym);
                  setIsUploadModalOpen(true);
                }}
                className="p-2 bg-gray-200 text-gray-600 rounded-full hover:bg-gray-300"
                title="Upload"
              >
                <UploadIcon className="w-4 h-4" />
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
                  <strong>Amenities:</strong>{" "}
                  {getAmenityNames(selectedGym.amenities)}
                </p>
                {/* <p className="text-sm text-gray-600">
                  <strong>assign_id:</strong> {selectedGym.assign_id}
                </p> */}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  GYM Front
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {selectedGym.gallery.gym_front_gallery.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={`${MEDIA_URL}${image}`}
                        alt={`Gallery ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg shadow"
                      />
                      <button
                        onClick={() =>
                          handleDeleteMedia(
                            selectedGym._id,
                            "gym_front_gallery",
                            image
                          )
                        }
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-6">
              <p className="text-sm text-gray-600">
                <strong>About:</strong> {selectedGym.about_gym}
              </p>
            </div>
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Service Gallery
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {selectedGym.gallery.service_gallery.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={`${MEDIA_URL}${image}`}
                      alt={`Service ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg shadow"
                    />
                    <button
                      onClick={() =>
                        handleDeleteMedia(
                          selectedGym._id,
                          "service_gallery",
                          image
                        )
                      }
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Videos
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedGym.gallery.gym_video.map((video, index) => (
                  <div key={index} className="relative">
                    <video
                      controls
                      className="w-full h-40 object-cover rounded-lg shadow"
                    >
                      <source src={`${MEDIA_URL}${video}`} type="video/mp4" />
                    </video>
                    <button
                      onClick={() =>
                        handleDeleteMedia(selectedGym._id, "gym_video", video)
                      }
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {isUploadModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Upload Gym Images and Videos
            </h2>
            <form onSubmit={handleUploadSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gym Front Images
                </label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, "gymFront")}
                  className="block w-full mb-2"
                />
                <div className="flex flex-wrap gap-2">
                  {selectedFiles.gymFront.map((file, index) => (
                    <div key={index} className="relative w-20 h-20">
                      <img
                        src={URL.createObjectURL(file)}
                        alt="Preview"
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => handleDeleteFile("gymFront", index)}
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Service Images
                </label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, "service")}
                  className="block w-full mb-2"
                />
                <div className="flex flex-wrap gap-2">
                  {selectedFiles.service.map((file, index) => (
                    <div key={index} className="relative w-20 h-20">
                      <img
                        src={URL.createObjectURL(file)}
                        alt="Preview"
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => handleDeleteFile("service", index)}
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gym Videos
                </label>
                <input
                  type="file"
                  multiple
                  accept="video/*"
                  onChange={(e) => handleFileChange(e, "videos")}
                  className="block w-full mb-2"
                />
                <div className="flex flex-wrap gap-2">
                  {selectedFiles.videos.map((file, index) => (
                    <div key={index} className="relative w-20 h-20">
                      <video
                        src={URL.createObjectURL(file)}
                        controls
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => handleDeleteFile("videos", index)}
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-green-700 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300"
              >
                {uploadLoading ? "Uploading..." : "Upload"}
              </button>
            </form>
            <button
              onClick={() => setIsUploadModalOpen(false)}
              className="mt-4 w-full bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition duration-300"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Pagination Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-6 space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="flex items-center space-x-2">
          <label htmlFor="limit" className="text-gray-700">
            Items per page:
          </label>
          <select
            id="limit"
            value={limit}
            onChange={(e) => {
              setLimit(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="border border-gray-300 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            {itemsPerPageOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center space-x-4">
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
      </div>
    </Layout>
  );
};

export default ManageAllGym;
