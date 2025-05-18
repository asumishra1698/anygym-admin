import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  SearchIcon,
  EyeIcon,
  UploadIcon,
  DownloadIcon,
} from "@heroicons/react/solid";
import { FaCheck, FaTimes } from "react-icons/fa";
import Layout from "../../reuseable/Layout";
import Swal from "sweetalert2";
import {
  fetchPendingGymsRequest,
  approveGymRequest,
  rejectGymRequest,
} from "../../redux/actions/pendingGymActions";
import { fetchAmenitiesRequest } from "../../redux/actions/amenityActions";
import { exportGymDataRequest } from "../../redux/actions/exportDataActions";
import {
  uploadGalleryRequest,
  deleteMediaRequest,
} from "../../redux/actions/uploadActions";
import { fetchGymByIdRequest } from "../../redux/actions/allGymActions";
import { MEDIA_URL } from "../../config";

const ManagePendingGym = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux state
  const {
    gyms: pendingGyms = [],
    loading,
    error,
    page: currentPage = 1,
    limit: currentLimit = 12,
  } = useSelector((state) => state.pendingGyms);

  const selectedGym = useSelector((state) => state.gymDetails?.selectedGym);
  const { loading: uploadLoading } = useSelector(
    (state) => state.uploadGallery
  );

  // Local state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploadGymId, setUploadGymId] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState({
    gymFront: [],
    service: [],
    videos: [],
  });
  const [uploadCompleted, setUploadCompleted] = useState(false);
  const userType =
    useSelector((state) => state.auth?.userType) ||
    localStorage.getItem("userType");


  const [page, setPage] = useState(currentPage);
  const [limit, setLimit] = useState(currentLimit);
  const [search, setSearch] = useState("");
  const { amenities = [] } = useSelector((state) => state.amenity);

  // Sync local page with API page
  useEffect(() => {
    setPage(currentPage);
  }, [currentPage]);

  useEffect(() => {
    dispatch(fetchPendingGymsRequest({ page, limit, search }));
    dispatch(fetchAmenitiesRequest());
  }, [dispatch, page, limit, search]);

  // Close upload modal after upload completes
  useEffect(() => {
    if (uploadCompleted && isUploadModalOpen && !uploadLoading) {
      setIsUploadModalOpen(false);
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
  };

  const handleApprove = (gymId) => {
    dispatch(approveGymRequest(gymId));
    navigate("/manage-approved-gym");
  };

  const handleReject = (gymId) => {
    Swal.fire({
      title: "Reject Gym",
      input: "textarea",
      inputLabel: "Reason for rejection",
      inputPlaceholder: "Type your message here...",
      inputAttributes: {
        "aria-label": "Type your message here",
      },
      showCancelButton: true,
      confirmButtonText: "Reject",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      preConfirm: (message) => {
        if (!message) {
          Swal.showValidationMessage("Message is required");
        }
        return message;
      },
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        dispatch(rejectGymRequest({ gymId, message: result.value }));
        navigate("/manage-rejected-gym");
      }
    });
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
    setUploadGymId(gym._id);
    setIsUploadModalOpen(true);
    setSelectedFiles({
      gymFront: [],
      service: [],
      videos: [],
    });
  };

  const handleUploadSubmit = (e) => {
    e.preventDefault();

    if (!uploadGymId) {
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
    formData.append("gym_id", uploadGymId);

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

  // Only show gyms with these statuses
  const gymsToShow = Array.isArray(pendingGyms)
    ? pendingGyms.filter(
        (gym) =>
          gym.status === "Pending" ||
          gym.status === "Active" ||
          gym.status === "Inactive"
      )
    : [];

  return (
    <Layout>
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-700 dark:text-gray-100 mb-4 md:mb-0">
          Pending Gyms
        </h2>
        <div className="flex items-center space-x-4 w-full md:w-auto">
          {/* Search Input */}
          <div className="relative w-full md:w-auto">
            <SearchIcon className="absolute left-3 top-2.5 w-5 h-5 text-gray-500 dark:text-gray-300" />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
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

      {/* Loading, Error, and Empty States */}
      {loading && (
        <p className="text-gray-600 dark:text-gray-300">Loading...</p>
      )}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && gymsToShow.length === 0 && (
        <p className="text-gray-600 dark:text-gray-300">
          No pending gyms available.
        </p>
      )}

      {/* Gym List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {gymsToShow.map((gym) => (
          <div
            key={gym._id}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow relative"
          >
            {/* Status Badge */}
            <span
              className={`absolute top-2 right-2 text-xs font-medium px-2.5 py-0.5 rounded ${
                gym.status === "Approved"
                  ? "bg-green-100 text-green-800"
                  : gym.status === "Rejected" || gym.status === "Reject"
                  ? "bg-red-100 text-red-800"
                  : gym.status === "Accept"
                  ? "bg-green-100 text-green-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {gym.status}
            </span>

            {/* Gym Image */}
            <img
              src={
                gym.gallery &&
                gym.gallery.gym_front_gallery &&
                gym.gallery.gym_front_gallery.length > 0
                  ? `${MEDIA_URL}${gym.gallery.gym_front_gallery[0]}`
                  : "/no-image.jpg"
              }
              alt="Gym Front"
              className="w-full h-40 object-cover rounded-lg mb-2"
            />

            {/* Gym Details */}
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              {gym.name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Status: {gym.status}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Address: {gym.location.address}
            </p>

            {/* Action Icons */}
            <div className="absolute bottom-4 right-4 flex space-x-2">
              {/* View Icon */}
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

      {/* Gym Details Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-4xl overflow-y-auto max-h-screen">
            {!selectedGym ? (
              <div className="text-center py-10">Loading...</div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                    {selectedGym.name}
                  </h2>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100 focus:outline-none"
                  >
                    ✕
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      <strong>Address:</strong> {selectedGym.location.address}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      <strong>Coordinates:</strong>{" "}
                      {selectedGym.location.coordinates.join(", ")}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      <strong>Schedule:</strong>{" "}
                      {selectedGym.schedule.opening_time} -{" "}
                      {selectedGym.schedule.closing_time}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      <strong>Days:</strong>{" "}
                      {selectedGym.schedule.day.join(", ")}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      <strong>Status:</strong> {selectedGym.status}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      <strong>About:</strong> {selectedGym.about_gym}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      <strong>Hourly Charges:</strong> ₹
                      {selectedGym.charges.hourly}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      <strong>Weekly Charges:</strong> ₹
                      {selectedGym.charges.weekly}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      <strong>Monthly Charges:</strong> ₹
                      {selectedGym.charges.monthly}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      <strong>Yearly Charges:</strong> ₹
                      {selectedGym.charges.yearly}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                  <strong>Amenities:</strong>{" "}
                  {getAmenityNames(selectedGym.amenities)}
                </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
                      GYM Front
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      {selectedGym.gallery.gym_front_gallery.map(
                        (image, index) => (
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
                        )
                      )}
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
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
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
                    Videos
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedGym.gallery.gym_video.map((video, index) => (
                      <div key={index} className="relative">
                        <video
                          controls
                          className="w-full h-40 object-cover rounded-lg shadow"
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
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Upload Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
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
              onClick={() => setIsUploadModalOpen(false)}
              className="mt-4 w-full bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-100 py-2 px-4 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600 transition duration-300"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Pagination Controls */}
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
            {[6, 10, 20, 50].map((option) => (
              <option key={option} value={option}>
                {option}
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
          <span className="text-gray-700 dark:text-gray-100">Page {page}</span>
          <button
            onClick={() => setPage((prev) => prev + 1)}
            disabled={gymsToShow.length < limit}
            className={`px-4 py-2 rounded-lg ${
              gymsToShow.length < limit
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

export default ManagePendingGym;
