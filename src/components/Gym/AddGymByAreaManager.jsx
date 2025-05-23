import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addGymRequest } from "../../redux/actions/addGymActions";
import { fetchAmenitiesRequest } from "../../redux/actions/amenityActions";
import Layout from "../../reuseable/Layout";
import { toast, ToastContainer } from "react-toastify";

const AddGymByAreaManager = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, gymData } = useSelector((state) => state.addGym);
  const { amenities = [] } = useSelector((state) => state.amenity);

  const [formData, setFormData] = useState({
    name: "",
    gymOwnerName: "",
    mobile: "",
    email: "",
    address: "",
    coordinates: { longitude: "", latitude: "" },
    opening_time: "",
    closing_time: "",
    days: [],
    amenities: [],
    hourly: "",
    weekly: "",
    monthly: "",
    yearly: "",
    about_gym: "",
    gymPincode: "",
    area_manager: localStorage.getItem("_id") || "",
  });

  useEffect(() => {
    dispatch(fetchAmenitiesRequest());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "longitude" || name === "latitude") {
      setFormData((prev) => ({
        ...prev,
        coordinates: { ...prev.coordinates, [name]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      days: checked
        ? [...prev.days, value]
        : prev.days.filter((day) => day !== value),
    }));
  };

  const handleAmenitiesChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      amenities: checked
        ? [...prev.amenities, value]
        : prev.amenities.filter((id) => id !== value),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const gymData = {
      name: formData.name,
      gymOwnerName: formData.gymOwnerName,
      mobile: formData.mobile,
      email: formData.email,
      address: formData.address,
      schedule: {
        day: formData.days,
        opening_time: formData.opening_time,
        closing_time: formData.closing_time,
      },
      amenities: formData.amenities,
      charges: {
        hourly: parseFloat(formData.hourly),
        weekly: parseFloat(formData.weekly),
        monthly: parseFloat(formData.monthly),
        yearly: parseFloat(formData.yearly),
      },
      about_gym: formData.about_gym,
      area_manager: formData.area_manager,
      latitude: parseFloat(formData.coordinates.latitude),
      longitude: parseFloat(formData.coordinates.longitude),
      gymPincode: parseInt(formData.gymPincode, 10),
    };

    dispatch(addGymRequest(gymData));
  };

  useEffect(() => {
    if (gymData) {
      toast.success("Gym added successfully!");
      navigate("/manage-pending-gym");
    }
    if (error) {
      toast.error(error);
    }
  }, [gymData, error, navigate]);

  return (
    <Layout>
      <main className="bg-gray-100 dark:bg-gray-900 overflow-y-auto min-h-screen">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">
          Add Gym
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {/* Gym Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Gym Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter gym name"
              className="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 dark:bg-gray-900 dark:text-gray-100"
              required
            />
          </div>

          {/* Gym Owner Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Gym Owner Name
            </label>
            <input
              type="text"
              name="gymOwnerName"
              value={formData.gymOwnerName}
              onChange={handleChange}
              placeholder="Enter Gym Owner Name"
              className="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 dark:bg-gray-900 dark:text-gray-100"
              required
            />
          </div>

          {/* Mobile */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Mobile
            </label>
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Enter mobile number"
              className="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 dark:bg-gray-900 dark:text-gray-100"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              className="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 dark:bg-gray-900 dark:text-gray-100"
              required
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter address"
              className="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 dark:bg-gray-900 dark:text-gray-100"
              required
            />
          </div>

          {/* Longitude */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Longitude
            </label>
            <input
              type="text"
              name="longitude"
              value={formData.coordinates.longitude}
              onChange={handleChange}
              placeholder="Enter longitude"
              className="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 dark:bg-gray-900 dark:text-gray-100"
              required
            />
          </div>

          {/* Latitude */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Latitude
            </label>
            <input
              type="text"
              name="latitude"
              value={formData.coordinates.latitude}
              onChange={handleChange}
              placeholder="Enter latitude"
              className="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 dark:bg-gray-900 dark:text-gray-100"
              required
            />
          </div>

          {/* Gym Pincode */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Gym Pincode
            </label>
            <input
              type="text"
              name="gymPincode"
              value={formData.gymPincode}
              onChange={handleChange}
              placeholder="Enter gym pincode"
              className="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 dark:bg-gray-900 dark:text-gray-100"
              required
            />
          </div>

          {/* Opening Time */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Opening Time
            </label>
            <input
              type="time"
              name="opening_time"
              value={formData.opening_time}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 dark:bg-gray-900 dark:text-gray-100"
              required
            />
          </div>

          {/* Closing Time */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Closing Time
            </label>
            <input
              type="time"
              name="closing_time"
              value={formData.closing_time}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 dark:bg-gray-900 dark:text-gray-100"
              required
            />
          </div>

          {/* Days Open */}
          <div className="md:col-span-3">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Days Open
            </label>
            <div className="flex flex-wrap gap-2 mt-2">
              {[
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
              ].map((day) => (
                <label key={day} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value={day}
                    onChange={handleCheckboxChange}
                    className="form-checkbox"
                  />
                  <span className="dark:text-gray-100">{day}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Amenities */}
          <div className="md:col-span-3">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Amenities
            </label>
            <div className="flex flex-wrap gap-2 mt-2">
              {amenities.map((amenity) => (
                <label
                  key={amenity._id}
                  className="flex items-center space-x-2"
                >
                  <input
                    type="checkbox"
                    value={amenity._id}
                    onChange={handleAmenitiesChange}
                    className="form-checkbox"
                  />
                  <span className="dark:text-gray-100">{amenity.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Charges */}
          {["hourly", "weekly", "monthly", "yearly"].map((chargeType) => (
            <div key={chargeType}>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                {`${
                  chargeType.charAt(0).toUpperCase() + chargeType.slice(1)
                } Charges`}
              </label>
              <input
                type="number"
                name={chargeType}
                value={formData[chargeType]}
                onChange={handleChange}
                placeholder={`Enter ${chargeType} charges`}
                className="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 dark:bg-gray-900 dark:text-gray-100"
                required
              />
            </div>
          ))}

          {/* About Gym */}
          <div className="md:col-span-3">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              About Gym
            </label>
            <textarea
              name="about_gym"
              value={formData.about_gym}
              onChange={handleChange}
              placeholder="Enter details about the gym"
              className="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 dark:bg-gray-900 dark:text-gray-100"
              rows="4"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="md:col-span-3 flex justify-end">
            <button
              type="submit"
              className="bg-black dark:bg-gray-600 text-white py-2 px-6 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-700 transition duration-300"
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Gym"}
            </button>
          </div>
        </form>

        <ToastContainer />
      </main>
    </Layout>
  );
};

export default AddGymByAreaManager;
