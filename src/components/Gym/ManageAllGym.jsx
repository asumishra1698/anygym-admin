import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  SearchIcon,
  EyeIcon,
  UploadIcon,
  DownloadIcon,
  SelectorIcon,
} from "@heroicons/react/solid";
import Layout from "../../reuseable/Layout";
import {
  fetchGymsRequest,
  fetchGymByIdRequest,
} from "../../redux/actions/allGymActions";
import { updateGymStatusRequest } from "../../redux/actions/approvedGymActions";
import { MEDIA_URL } from "../../config";
import { fetchAmenitiesRequest } from "../../redux/actions/amenityActions";
import Swal from "sweetalert2";
import { exportGymDataRequest } from "../../redux/actions/exportDataActions";
import { fetchAreaManagersRequest } from "../../redux/actions/areaManagerActions";
import {
  uploadGalleryRequest,
  deleteMediaRequest,
} from "../../redux/actions/uploadActions";

const ManageAllGym = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    gyms = [],
    loading,
    error,
    selectedGym,
  } = useSelector((state) => state.allGyms);
  const allGyms = Array.isArray(gyms) ? gyms : [];

  const { areaManagers = [] } = useSelector((state) => state.areaManager);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toolkitOpen, setToolkitOpen] = useState(null);
  const { amenities = [] } = useSelector((state) => state.amenity);

  const { loading: uploadLoading, error: uploadError } = useSelector(
    (state) => state.uploadGallery
  );

  const [Page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const [searchQuery, setSearchQuery] = useState("");

  const [filterStatus, setFilterStatus] = useState("");
  const [areaManagerDropdownOpen, setAreaManagerDropdownOpen] = useState(false);
  const [selectedAreaManagers, setSelectedAreaManagers] = useState([]);
  const areaManagerDropdownRef = useRef(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const [selectedFiles, setSelectedFiles] = useState({
    gymFront: [],
    service: [],
    videos: [],
  });

  const [uploadGymId, setUploadGymId] = useState(null);
  const [uploadStarted, setUploadStarted] = useState(false);

  useEffect(() => {
    dispatch(fetchGymsRequest(1, 1000));
    dispatch(fetchAmenitiesRequest());
    dispatch(fetchAreaManagersRequest(1, 1000, ""));
  }, [dispatch]);

  useEffect(() => {
    setPage(1);
  }, [filterStatus, searchQuery, selectedAreaManagers]);

  useEffect(() => {
    if (uploadStarted && !uploadLoading && isUploadModalOpen && !uploadError) {
      setIsUploadModalOpen(false);
      setSelectedFiles({
        gymFront: [],
        service: [],
        videos: [],
      });
      setUploadGymId(null);
      setUploadStarted(false);
    }
  }, [uploadLoading, uploadError, isUploadModalOpen, uploadStarted]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        areaManagerDropdownRef.current &&
        !areaManagerDropdownRef.current.contains(event.target)
      ) {
        setAreaManagerDropdownOpen(false);
      }
    }
    if (areaManagerDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [areaManagerDropdownOpen]);

  const itemsPerPageOptions = [12, 20, 50, 100, 1000, 2000];
  const userType =
    useSelector((state) => state.auth?.userType) ||
    localStorage.getItem("userType");

  const getAreaManagerName = (id) => {
    const manager = areaManagers.find((am) => am._id === id);
    return manager ? manager.name : id;
  };

  const handleAreaManagerCheckbox = (id) => {
    setSelectedAreaManagers((prev) =>
      prev.includes(id) ? prev.filter((amId) => amId !== id) : [...prev, id]
    );
  };

  const filteredGyms = allGyms
    .filter(
      (gym) =>
        selectedAreaManagers.length === 0 ||
        selectedAreaManagers.includes(gym.assign_id)
    )
    .filter((gym) => !filterStatus || gym.status === filterStatus)
    .filter((gym) =>
      gym.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const totalPages = Math.ceil(filteredGyms.length / limit);
  const paginatedGyms = filteredGyms.slice((Page - 1) * limit, Page * limit);

  const handleViewDetails = (gym) => {
    dispatch(fetchGymByIdRequest(gym._id));
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

  const handleUploadClick = (gym) => {
    setUploadGymId(gym._id);
    setIsUploadModalOpen(true);
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

    setUploadStarted(true);
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
        if (isModalOpen && selectedGym && selectedGym._id === gymId) {
          dispatch(fetchGymByIdRequest(gymId));
        }
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
          All Gyms
        </h2>
        {/* Responsive filter/search/add row */}
        <div className="flex flex-col sm:flex-row w-full md:w-auto gap-2 sm:gap-4">
          {/* Area Manager Filter Dropdown */}
          <div
            className="relative w-full sm:w-auto"
            ref={areaManagerDropdownRef}
          >
            <button
              type="button"
              onClick={() => setAreaManagerDropdownOpen((open) => !open)}
              className="flex items-center border border-gray-300 dark:border-gray-700 rounded-lg px-2 py-2 mr-2 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 w-full sm:w-auto"
            >
              <span className="mr-2 text-gray-700 dark:text-gray-100 text-sm truncate">
                {selectedAreaManagers.length === 0
                  ? "Filter by Area Manager"
                  : areaManagers
                      .filter((am) => selectedAreaManagers.includes(am._id))
                      .map((am) => am.name)
                      .join(", ")}
              </span>
              <SelectorIcon className="w-4 h-4 text-gray-500 dark:text-gray-300" />
            </button>
            {areaManagerDropdownOpen && (
              <div className="absolute left-0 mt-2 w-56 max-h-64 overflow-y-auto bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg z-20">
                <div className="p-2">
                  {areaManagers.length === 0 && (
                    <div className="text-gray-500 dark:text-gray-300 text-sm">
                      No Area Managers
                    </div>
                  )}
                  {areaManagers.map((am) => (
                    <label
                      key={am._id}
                      className="flex items-center px-2 py-1 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                    >
                      <input
                        type="checkbox"
                        checked={selectedAreaManagers.includes(am._id)}
                        onChange={() => handleAreaManagerCheckbox(am._id)}
                        className="mr-2"
                      />
                      <span className="text-gray-700 dark:text-gray-100 text-sm">
                        {am.name}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
          {/* Filter Dropdown */}
          <div className="relative w-full sm:w-auto">
            <select
              className="border border-gray-300 dark:border-gray-700 rounded-lg px-2 py-2 mr-2 focus:outline-none focus:ring-2 focus:ring-gray-500 w-full sm:w-auto dark:bg-gray-800 dark:text-gray-100"
              value={filterStatus}
              onChange={(e) => {
                setFilterStatus(e.target.value);
                setPage(1);
              }}
            >
              <option value="">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Reject">Rejected</option>
            </select>
          </div>
          {/* Search and Download in one line, responsive */}
          <div className="flex w-full sm:w-auto gap-2">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-2.5 w-5 h-5 text-gray-500 dark:text-gray-300" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 dark:bg-gray-800 dark:text-gray-100"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setPage(1);
                }}
              />
            </div>
            <button
              onClick={handleDownload}
              className="flex items-center px-3 py-3 bg-black dark:bg-gray-800 text-white text-xs font-medium rounded-lg shadow hover:bg-gray-800 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 whitespace-nowrap"
            >
              <DownloadIcon className="w-4 h-4 mr-2" />
              Download GYM
            </button>
          </div>
          {userType === "AREA_MANAGER" && (
            <button
              onClick={() => navigate("/add-gym-by-area-manager")}
              className="px-3 py-3 bg-black dark:bg-gray-800 text-white text-sm font-medium rounded-lg shadow hover:bg-gray-800 dark:hover:bg-gray-700 whitespace-nowrap"
            >
              + Add Gym
            </button>
          )}
        </div>
      </div>

      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && filteredGyms.length === 0 && (
        <p className="text-gray-600 dark:text-gray-300">No gyms available.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedGyms.map((gym) => (
          <div
            key={gym._id}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow relative"
          >
            <span
              className={`absolute top-2 right-2 text-xs font-medium px-2.5 py-0.5 rounded ${
                gym.status === "Approved" ||
                gym.status === "Active" ||
                gym.status === "Accept"
                  ? "bg-green-100 text-green-800"
                  : gym.status === "Inactive" || gym.status === "Reject"
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
              Gym Pincode: {gym.gymPincode}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Assign to: {getAreaManagerName(gym.assign_id)}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Schedule: {gym.status}
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
              {/* Three-Dot Menu */}
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-4xl overflow-y-auto max-h-screen">
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
                  <strong>Schedule:</strong> {selectedGym.schedule.opening_time}{" "}
                  - {selectedGym.schedule.closing_time}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  <strong>Days:</strong> {selectedGym.schedule.day.join(", ")}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  <strong>Status:</strong> {selectedGym.status}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  <strong>Hourly Charges:</strong> ₹{selectedGym.charges.hourly}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  <strong>Weekly Charges:</strong> ₹{selectedGym.charges.weekly}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  <strong>Monthly Charges:</strong> ₹
                  {selectedGym.charges.monthly}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  <strong>Yearly Charges:</strong> ₹{selectedGym.charges.yearly}
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
              <p className="text-sm text-gray-600 dark:text-gray-300">
                <strong>About:</strong> {selectedGym.about_gym}
              </p>
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
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={Page === 1}
            className={`px-4 py-2 rounded-lg ${
              Page === 1
                ? "bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
                : "bg-[#24963d] text-white hover:bg-[#24963d]"
            }`}
          >
            Previous
          </button>

          {/* Page Indicator */}
          <span className="text-gray-700 dark:text-gray-100">
            Page {Page} of {totalPages}
          </span>

          {/* Next Button */}
          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={Page === totalPages || totalPages === 0}
            className={`px-4 py-2 rounded-lg ${
              Page === totalPages || totalPages === 0
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

export default ManageAllGym;
