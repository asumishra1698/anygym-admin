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
import { exportGymDataRequest } from "../../redux/actions/exportDataActions";
import {
  uploadGalleryRequest,
  deleteMediaRequest,
} from "../../redux/actions/uploadActions";
import { fetchGymByIdRequest } from "../../redux/actions/allGymActions";
import { MEDIA_URL } from "../../config";

const userType = localStorage.getItem("userType");

const ManagePendingGym = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux state
  const {
    gyms: pendingGyms,
    loading,
    error,
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

  useEffect(() => {
    dispatch(fetchPendingGymsRequest());
  }, [dispatch]);

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

  // const handleReject = (gymId) => {
  //   dispatch(rejectGymRequest(gymId));
  //   navigate("/manage-rejected-gym");
  // };

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

  // Render
  return (
    <Layout>
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-700 mb-4 md:mb-0">
          Pending Gyms
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

          {userType === "AREA_MANAGER" && (
            <button
              onClick={() => navigate("/add-gym-by-area-manager")}
              className="px-3 py-3 bg-black text-white text-sm font-medium rounded-lg shadow hover:bg-gray-800 whitespace-nowrap"
            >
              + Add Gym
            </button>
          )}
          <button
            onClick={handleDownload}
            className="flex items-center px-3 py-3 bg-black text-white text-xs font-medium rounded-lg shadow hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 whitespace-nowrap"
          >
            <DownloadIcon className="w-4 h-4 mr-2" />
            Download GYM
          </button>
        </div>
      </div>

      {/* Loading, Error, and Empty States */}
      {loading && <p className="text-gray-600">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && pendingGyms.length === 0 && (
        <p className="text-gray-600">No pending gyms available.</p>
      )}

      {/* Gym List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {pendingGyms
          .filter((gym) => gym.status === "Active" || gym.status === "Inactive" || gym.status === "Pending")
          .map((gym) => (
            <div
              key={gym._id}
              className="bg-white p-4 rounded-lg shadow relative"
            >
              {/* Status Badge */}
              <span
                className={`absolute top-2 right-2 text-xs font-medium px-2.5 py-0.5 rounded ${
                  gym.status === "Approved"
                    ? "bg-green-100 text-green-800"
                    : gym.status === "Rejected"
                    ? "bg-red-100 text-red-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {gym.status}
              </span>

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

                <button
                  onClick={() => handleUploadClick(gym)}
                  className="p-2 bg-gray-200 text-gray-600 rounded-full hover:bg-gray-300"
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
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl overflow-y-auto max-h-screen">
            {!selectedGym ? (
              <div className="text-center py-10">Loading...</div>
            ) : (
              <>
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
                      <strong>Schedule:</strong>{" "}
                      {selectedGym.schedule.opening_time} -{" "}
                      {selectedGym.schedule.closing_time}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Days:</strong>{" "}
                      {selectedGym.schedule.day.join(", ")}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Status:</strong> {selectedGym.status}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>About:</strong> {selectedGym.about_gym}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Hourly Charges:</strong> ₹
                      {selectedGym.charges.hourly}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Weekly Charges:</strong> ₹
                      {selectedGym.charges.weekly}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Monthly Charges:</strong> ₹
                      {selectedGym.charges.monthly}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Yearly Charges:</strong> ₹
                      {selectedGym.charges.yearly}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Amenities:</strong>{" "}
                      {Array.isArray(selectedGym.amenities)
                        ? selectedGym.amenities.join(", ")
                        : ""}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
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
    </Layout>
  );
};

export default ManagePendingGym;
