import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  SearchIcon,
  EyeIcon,
  UploadIcon,
  DownloadIcon,
} from "@heroicons/react/solid";
import {
  FaMapMarkerAlt,
  FaClock,
  FaCalendarAlt,
  FaRupeeSign,
  FaBuilding,
  FaCheckCircle,
  FaTimesCircle,
  FaUserFriends,
  FaTimes,
  FaVideo,
  FaImage,
} from "react-icons/fa";
import Layout from "../../reuseable/Layout";
import Swal from "sweetalert2";
import {
  fetchApprovedGymsRequest,
  updateGymStatusRequest,
} from "../../redux/actions/approvedGymActions";
import { fetchAmenitiesRequest } from "../../redux/actions/amenityActions";
import { exportGymDataRequest } from "../../redux/actions/exportDataActions";
import { fetchGymByIdRequest } from "../../redux/actions/allGymActions";
import {
  uploadGalleryRequest,
  deleteMediaRequest,
} from "../../redux/actions/uploadActions";
import { MEDIA_URL } from "../../config";

const ManageApprovedGym = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    gyms: approvedGyms,
    loading,
    error,
    total = 0,
    page: currentPage = 1,
    limit: currentLimit = 10,
    totalPages = 1,
  } = useSelector((state) => state.approvedGyms);

  const { loading: uploadLoading } = useSelector(
    (state) => state.uploadGallery
  );
  const gymsToShow = Array.isArray(approvedGyms)
    ? approvedGyms.filter((gym) => gym.status === "Approved")
    : [];
  const [toolkitOpen, setToolkitOpen] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAnimation, setModalAnimation] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploadModalAnimation, setUploadModalAnimation] = useState(false);
  const selectedGym = useSelector((state) => state.allGyms.selectedGym);
  const { amenities = [] } = useSelector((state) => state.amenity);

  const [selectedFiles, setSelectedFiles] = useState({
    gymFront: [],
    service: [],
    videos: [],
  });

  const [uploadCompleted, setUploadCompleted] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(currentLimit);
  const [search, setSearch] = useState("");
  const userType =
    useSelector((state) => state.auth?.userType) ||
    localStorage.getItem("userType");

  useEffect(() => {
    dispatch(fetchApprovedGymsRequest({ page, limit, search }));
    dispatch(fetchAmenitiesRequest());
  }, [dispatch, page, limit, search]);

  useEffect(() => {
    if (uploadCompleted && isUploadModalOpen && !uploadLoading) {
      setUploadModalAnimation(false);
      setTimeout(() => setIsUploadModalOpen(false), 200);
      setSelectedFiles({
        gymFront: [],
        service: [],
        videos: [],
      });
      setUploadCompleted(false);
    }
  }, [uploadCompleted, isUploadModalOpen, uploadLoading]);

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

  const handleViewDetails = (gym) => {
    dispatch(fetchGymByIdRequest(gym._id));
    setIsModalOpen(true);
    setTimeout(() => setModalAnimation(true), 10);
  };

  const closeModal = () => {
    setModalAnimation(false);
    setTimeout(() => setIsModalOpen(false), 200);
  };

  const handleToggleStatus = (gym) => {
    const newStatus = gym.status === "Active" ? "Inactive" : "Active";
    dispatch(updateGymStatusRequest(gym._id, newStatus));
    setToolkitOpen(null);
  };

  const toggleToolkit = (gymId) => {
    setToolkitOpen((prev) => (prev === gymId ? null : gymId));
  };

  const handleFileChange = (e, type) => {
    const files = Array.from(e.target.files);
    setSelectedFiles((prev) => ({
      ...prev,
      [type]: [...prev[type], ...files],
    }));
  };

  const handleUploadClick = (gym) => {
    dispatch(fetchGymByIdRequest(gym._id));
    setIsUploadModalOpen(true);
    setTimeout(() => setUploadModalAnimation(true), 10);
  };

  const closeUploadModal = () => {
    setUploadModalAnimation(false);
    setTimeout(() => setIsUploadModalOpen(false), 200);
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

    dispatch(uploadGalleryRequest({ formData }));
    setUploadCompleted(true);
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
        dispatch(deleteMediaRequest({ gymId, type, fileUrl }));
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
        <h2 className="text-xl md:text-2xl font-semibold text-gray-700 dark:text-gray-100 mb-4 md:mb-0">
          Approved Gyms
        </h2>
        <div className="flex items-center space-x-4 w-full md:w-auto">
          <div className="relative w-full md:w-auto">
            <SearchIcon className="absolute left-3 top-2.5 w-5 h-5 text-gray-500 dark:text-gray-300" />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:w-auto pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 dark:bg-gray-800 dark:text-gray-100"
            />
          </div>
          {userType === "AREA_MANAGER" && (
            <button
              onClick={() => navigate("/add-gym-by-area-manager")}
              className="px-3 py-3 bg-black dark:bg-gray-800 text-white text-sm font-medium rounded-lg shadow hover:bg-gray-800 dark:hover:bg-gray-700 whitespace-nowrap"
            >
              + Add Gym
            </button>
          )}
          <button
            onClick={handleDownload}
            className="flex items-center px-3 py-3 bg-black dark:bg-gray-800 text-white text-xs font-medium rounded-lg shadow hover:bg-gray-800 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 whitespace-nowrap"
          >
            <DownloadIcon className="w-4 h-4 mr-2" />
            Download GYM
          </button>
        </div>
      </div>

      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && gymsToShow.length === 0 && (
        <p className="text-gray-600 dark:text-gray-300">
          No approved gyms available.
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {gymsToShow.map((gym) => (
          <div
            key={gym._id}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow relative"
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
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              {gym.name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Address: {gym.location.address}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Status: {gym.status}
            </p>
            <div className="absolute bottom-4 right-4 flex space-x-2">
              <button
                onClick={() => handleViewDetails(gym)}
                className="p-2 bg-black dark:bg-gray-700 text-white rounded-full hover:bg-blue-700 dark:hover:bg-blue-600"
                title="View"
              >
                <EyeIcon className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleUploadClick(gym)}
                className="p-2 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-100 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600"
                title="Upload"
              >
                <UploadIcon className="w-4 h-4" />
              </button>
              <div className="relative">
                <button
                  onClick={() => toggleToolkit(gym._id)}
                  className="p-2 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-100 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600"
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
                  <div className="absolute left-0 bottom-8 mt-2 w-40 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg z-10">
                    <button
                      onClick={() => handleToggleStatus(gym)}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
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
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div
            className={`bg-white dark:bg-gray-900 p-0 rounded-3xl shadow-2xl w-full max-w-5xl overflow-y-auto max-h-[90vh] border border-gray-200 dark:border-gray-700 transition-all duration-200
              ${modalAnimation ? "opacity-100 scale-100" : "opacity-0 scale-95"}
            `}
            style={{ transitionProperty: "opacity, transform" }}
          >
            <div className="flex justify-between items-center px-8 py-6 border-b border-gray-100 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-green-50 dark:from-gray-800 dark:to-gray-900 rounded-t-3xl">
              <div className="flex items-center gap-4">
                <FaBuilding className="text-blue-500 w-8 h-8" />
                <h2 className="text-3xl font-extrabold text-gray-800 dark:text-gray-100 tracking-tight capitalize ">
                  {selectedGym.name}
                </h2>
              </div>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-red-500 transition"
                title="Close"
              >
                <FaTimes className="w-7 h-7" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-8 py-8">
              <div className="space-y-5">
                <div className="flex items-center gap-3 text-lg text-gray-700 dark:text-gray-200">
                  <FaMapMarkerAlt className="text-green-600" />
                  <span>
                    <span className="font-semibold">Address:</span>{" "}
                    {selectedGym.location.address}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-lg text-gray-700 dark:text-gray-200">
                  <FaMapMarkerAlt className="text-blue-600" />
                  <span>
                    <span className="font-semibold">Coordinates:</span>{" "}
                    {selectedGym.location.coordinates.join(", ")}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-lg text-gray-700 dark:text-gray-200">
                  <FaClock className="text-yellow-600" />
                  <span>
                    <span className="font-semibold">Schedule:</span>{" "}
                    {selectedGym.schedule.opening_time} -{" "}
                    {selectedGym.schedule.closing_time}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-lg text-gray-700 dark:text-gray-200">
                  <FaCalendarAlt className="text-purple-600" />
                  <span>
                    <span className="font-semibold">Days:</span>{" "}
                    {selectedGym.schedule.day.join(", ")}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-lg text-gray-700 dark:text-gray-200">
                  {selectedGym.status === "Active" && (
                    <FaCheckCircle className="text-green-600" />
                  )}
                  {selectedGym.status === "Approved" && (
                    <FaCheckCircle className="text-blue-600" />
                  )}
                  {selectedGym.status === "Accept" && (
                    <FaCheckCircle className="text-green-400" />
                  )}
                  {selectedGym.status === "Inactive" && (
                    <FaTimesCircle className="text-gray-400" />
                  )}
                  {selectedGym.status === "Reject" && (
                    <FaTimesCircle className="text-red-600" />
                  )}
                  <span>
                    <span className="font-semibold">Status:</span>{" "}
                    {selectedGym.status}
                  </span>
                </div>
                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center gap-2 text-lg text-gray-700 dark:text-gray-200 bg-green-50 dark:bg-gray-800 px-3 py-1 rounded-lg">
                    <FaRupeeSign className="text-green-700" />
                    <span className="font-semibold">Hourly:</span> ₹
                    {selectedGym.charges.hourly}
                  </div>
                  <div className="flex items-center gap-2 text-lg text-gray-700 dark:text-gray-200 bg-green-50 dark:bg-gray-800 px-3 py-1 rounded-lg">
                    <FaRupeeSign className="text-green-700" />
                    <span className="font-semibold">Weekly:</span> ₹
                    {selectedGym.charges.weekly}
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center gap-2 text-lg text-gray-700 dark:text-gray-200 bg-green-50 dark:bg-gray-800 px-3 py-1 rounded-lg">
                    <FaRupeeSign className="text-green-700" />
                    <span className="font-semibold">Monthly:</span> ₹
                    {selectedGym.charges.monthly}
                  </div>
                  <div className="flex items-center gap-2 text-lg text-gray-700 dark:text-gray-200 bg-green-50 dark:bg-gray-800 px-3 py-1 rounded-lg">
                    <FaRupeeSign className="text-green-700" />
                    <span className="font-semibold">Yearly:</span> ₹
                    {selectedGym.charges.yearly}
                  </div>
                </div>
                <div className="flex items-center gap-3 text-lg text-gray-700 dark:text-gray-200">
                  <FaUserFriends className="text-indigo-600" />
                  <span>
                    <span className="font-semibold">Amenities:</span>{" "}
                    {getAmenityNames(selectedGym.amenities)}
                  </span>
                </div>
                <div className="flex items-start gap-3 text-lg text-gray-700 dark:text-gray-200">
                  <FaBuilding className="text-blue-400 mt-1" />
                  <span>
                    <span className="font-semibold">About:</span>{" "}
                    {selectedGym.about_gym}
                  </span>
                </div>
              </div>
              <div className="space-y-8">
                <div>
                  <h3 className="flex items-center gap-2 text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">
                    <FaImage className="text-pink-500" /> GYM Front
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {selectedGym.gallery.gym_front_gallery.map(
                      (image, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={`${MEDIA_URL}${image}`}
                            alt={`Gallery ${index + 1}`}
                            className="w-full h-32 object-cover rounded-xl shadow border border-gray-200 dark:border-gray-700"
                          />
                          <button
                            onClick={() =>
                              handleDeleteMedia(
                                selectedGym._id,
                                "gym_front_gallery",
                                image
                              )
                            }
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center opacity-80 hover:opacity-100 transition"
                            title="Delete"
                          >
                            <FaTimes />
                          </button>
                        </div>
                      )
                    )}
                  </div>
                </div>
                <div>
                  <h3 className="flex items-center gap-2 text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">
                    <FaImage className="text-yellow-500" /> Service Gallery
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {selectedGym.gallery.service_gallery.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={`${MEDIA_URL}${image}`}
                          alt={`Service ${index + 1}`}
                          className="w-full h-32 object-cover rounded-xl shadow border border-gray-200 dark:border-gray-700"
                        />
                        <button
                          onClick={() =>
                            handleDeleteMedia(
                              selectedGym._id,
                              "service_gallery",
                              image
                            )
                          }
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center opacity-80 hover:opacity-100 transition"
                          title="Delete"
                        >
                          <FaTimes />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="flex items-center gap-2 text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">
                    <FaVideo className="text-blue-500" /> Videos
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedGym.gallery.gym_video.map((video, index) => (
                      <div key={index} className="relative group">
                        <video
                          controls
                          className="w-full h-40 object-cover rounded-xl shadow border border-gray-200 dark:border-gray-700"
                        >
                          <source
                            src={`${MEDIA_URL}${video}`}
                            type="video/mp4"
                          />
                        </video>
                        <button
                          onClick={() =>
                            handleDeleteMedia(
                              selectedGym._id,
                              "gym_video",
                              video
                            )
                          }
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center opacity-80 hover:opacity-100 transition"
                          title="Delete"
                        >
                          <FaTimes />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {isUploadModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div
            className={`bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md transition-all duration-200
              ${
                uploadModalAnimation
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-95"
              }
            `}
            style={{ transitionProperty: "opacity, transform" }}
          >
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
              Upload Gym Images and Videos
            </h2>
            <form onSubmit={handleUploadSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
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
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
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
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
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
              onClick={closeUploadModal}
              className="mt-4 w-full bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-100 py-2 px-4 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600 transition duration-300"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-center mt-6 space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="flex items-center space-x-2">
          <label htmlFor="limit" className="text-gray-700 dark:text-gray-100">
            Items per page:
          </label>
          <select
            id="limit"
            value={limit}
            onChange={(e) => {
              setLimit(Number(e.target.value));
              setPage(1);
            }}
            className="border border-gray-300 dark:border-gray-700 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-gray-500 dark:bg-gray-800 dark:text-gray-100"
          >
            {[6, 10, 12, 20, 50, 100, 1000000].map((option) => (
              <option key={option} value={option}>
                {option === 1000000 ? "All" : option}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className={`px-4 py-2 rounded-lg ${
              page === 1
                ? "bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
                : "bg-[#24963d] text-white hover:bg-[#24963d]"
            }`}
          >
            Previous
          </button>
          <span className="text-gray-700 dark:text-gray-100">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages || totalPages === 0}
            className={`px-4 py-2 rounded-lg ${
              page === totalPages || totalPages === 0
                ? "bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
                : "bg-[#24963d] text-white hover:bg-[#24963d]"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default ManageApprovedGym;
