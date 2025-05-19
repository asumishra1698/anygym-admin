import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SearchIcon, EyeIcon, DownloadIcon } from "@heroicons/react/solid";
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
import { fetchApprovedGymsRequest } from "../../redux/actions/approvedGymActions";
import { exportGymDataRequest } from "../../redux/actions/exportDataActions";
import { fetchGymByIdRequest } from "../../redux/actions/allGymActions";
import { fetchAmenitiesRequest } from "../../redux/actions/amenityActions";
import { deleteMediaRequest } from "../../redux/actions/uploadActions";
import { MEDIA_URL } from "../../config";
import Swal from "sweetalert2";

const ManageRejectedGym = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    gyms: allGyms,
    loading,
    error,
    total = 0,
    page: currentPage = 1,
    limit: currentLimit = 10,
    totalPages = 1,
  } = useSelector((state) => state.approvedGyms);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAnimation, setModalAnimation] = useState(false);
  const selectedGym = useSelector((state) => state.allGyms.selectedGym);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(currentLimit);
  const [search, setSearch] = useState("");
  const { amenities = [] } = useSelector((state) => state.amenity);
  const userType =
    useSelector((state) => state.auth?.userType) ||
    localStorage.getItem("userType");

  useEffect(() => {
    dispatch(fetchApprovedGymsRequest({ page, limit, search }));
    dispatch(fetchAmenitiesRequest());
  }, [dispatch, page, limit, search]);

  const handleViewDetails = (gym) => {
    dispatch(fetchGymByIdRequest(gym._id));
    setIsModalOpen(true);
    setTimeout(() => setModalAnimation(true), 10);
  };

  const closeModal = () => {
    setModalAnimation(false);
    setTimeout(() => setIsModalOpen(false), 200);
  };

  const handleDownload = () => {
    dispatch(exportGymDataRequest());
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

  const rejectedGyms = Array.isArray(allGyms)
    ? allGyms.filter((gym) => gym.status === "Reject")
    : [];

  return (
    <Layout>
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-700 dark:text-gray-100 mb-4 md:mb-0">
          Rejected Gyms
        </h2>
        <div className="flex items-center space-x-4 w-full md:w-auto">
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

      {loading && (
        <p className="text-gray-600 dark:text-gray-300">Loading...</p>
      )}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && rejectedGyms.length === 0 && (
        <p className="text-gray-600 dark:text-gray-300">
          No rejected gyms available.
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {rejectedGyms.map((gym) => (
          <div
            key={gym._id}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow relative"
          >
            <span className="absolute top-2 right-2 text-xs font-medium px-2.5 py-0.5 rounded bg-red-100 text-red-800">
              Rejected
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
                <div className="flex items-center gap-3 text-lg text-gray-700 dark:text-gray-200">
                  <FaClock className="text-yellow-600" />
                  <span>
                    <span className="font-semibold">Reject Reason: </span>
                    {selectedGym.rejection_reason}
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

export default ManageRejectedGym;
