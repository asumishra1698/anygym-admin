import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateAreaManagerRequest,
  fetchAreaManagerDetailsRequest,
} from "../../redux/actions/areaManagerActions";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../reuseable/Layout";

const EditAreaManager = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { areaManagerDetails, loading } = useSelector(
    (state) => state.areaManager
  );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    dob: "",
    referral_id: "",
    status: "Pending",
    profileImage: null,
    location: {
      address: "",
      coordinates: ["", ""],
    },
    areaPincode: "",
    password: "",
    cpassword: "",
  });

  useEffect(() => {
    dispatch(fetchAreaManagerDetailsRequest(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (areaManagerDetails) {
      setFormData({
        name: areaManagerDetails.name || "",
        email: areaManagerDetails.email || "",
        mobile: areaManagerDetails.mobile || "",
        dob: areaManagerDetails.dob || "",
        referral_id: areaManagerDetails.referral_id || "",
        status: areaManagerDetails.status || "Pending",
        profileImage: null,
        location: {
          address: areaManagerDetails.location?.address || "",
          coordinates: areaManagerDetails.location?.coordinates || ["", ""],
        },
        areaPincode: areaManagerDetails.areaPincode || "",
        password: "",
        cpassword: "",
      });
    }
  }, [areaManagerDetails]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "address") {
      setFormData((prev) => ({
        ...prev,
        location: { ...prev.location, address: value },
      }));
    } else if (name === "longitude" || name === "latitude") {
      const index = name === "longitude" ? 0 : 1;
      setFormData((prev) => ({
        ...prev,
        location: {
          ...prev.location,
          coordinates: prev.location.coordinates.map((coord, i) =>
            i === index ? value : coord
          ),
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, profileImage: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password && formData.password !== formData.cpassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const formDataToSend = new FormData();

      // Split the name into first name and last name
      const [fname, ...lnameParts] = formData.name.trim().split(" ");
      const lname = lnameParts.join(" "); // Join the remaining parts as the last name

      Object.keys(formData).forEach((key) => {
        if (key === "location") {
          formDataToSend.append("address", formData.location.address);
          formDataToSend.append("longitude", formData.location.coordinates[0]);
          formDataToSend.append("latitude", formData.location.coordinates[1]);
        } else if (key === "profileImage" && formData.profileImage) {
          formDataToSend.append("profileImage", formData.profileImage);
        } else if (
          key !== "password" &&
          key !== "cpassword" &&
          key !== "name"
        ) {
          formDataToSend.append(key, formData[key]);
        }
      });

      // Append first name and last name to the payload
      formDataToSend.append("fname", fname || "");
      formDataToSend.append("lname", lname || ""); // Ensure lname is always sent

      if (formData.password) {
        formDataToSend.append("password", formData.password);
      }

      const response = await dispatch(
        updateAreaManagerRequest(id, formDataToSend)
      );
      if (response?.status === 200) {
        toast.success("Area Manager updated successfully!");
        navigate("/manage-area-manager");
      } else {
        toast.error("Failed to update area manager. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <Layout>
      <main className="bg-gray-100 overflow-y-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Edit Area Manager
        </h1>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-lg shadow-md grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter full name"
                className="mt-1 block w-full border border-gray-300 rounded-lg px-4 py-2"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
                className="mt-1 block w-full border border-gray-300 rounded-lg px-4 py-2"
                required
              />
            </div>

            {/* Mobile */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Mobile
              </label>
              <input
                type="text"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="Enter mobile number"
                className="mt-1 block w-full border border-gray-300 rounded-lg px-4 py-2"
                required
              />
            </div>

            {/* DOB */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                DOB
              </label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-lg px-4 py-2"
                required
              />
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <input
                type="text"
                name="address"
                value={formData.location.address}
                onChange={handleChange}
                placeholder="Enter address"
                className="mt-1 block w-full border border-gray-300 rounded-lg px-4 py-2"
                required
              />
            </div>

            {/* Longitude */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Longitude
              </label>
              <input
                type="text"
                name="longitude"
                value={formData.location.coordinates[0]}
                onChange={handleChange}
                placeholder="Enter longitude"
                className="mt-1 block w-full border border-gray-300 rounded-lg px-4 py-2"
                required
              />
            </div>

            {/* Latitude */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Latitude
              </label>
              <input
                type="text"
                name="latitude"
                value={formData.location.coordinates[1]}
                onChange={handleChange}
                placeholder="Enter latitude"
                className="mt-1 block w-full border border-gray-300 rounded-lg px-4 py-2"
                required
              />
            </div>

            {/* Area Pin Code */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Area Pin Code
              </label>
              <input
                type="number"
                name="areaPincode"
                value={formData.areaPincode}
                onChange={handleChange}
                placeholder="Enter Area Pincode"
                className="mt-1 block w-full border border-gray-300 rounded-lg px-4 py-2"
                required
              />
            </div>

            {/* Referral ID */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Referral ID
              </label>
              <input
                type="text"
                name="referral_id"
                value={formData.referral_id}
                onChange={handleChange}
                placeholder="Enter referral ID"
                className="mt-1 block w-full border border-gray-300 rounded-lg px-4 py-2"
              />
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-lg px-4 py-2"
                required
              >
                <option value="Pending">Pending</option>
                <option value="Active">Active</option>
              </select>
            </div>

            {/* Profile Picture */}
            <div className="md:col-span-3">
              <label className="block text-sm font-medium text-gray-700">
                Upload Profile Picture
              </label>
              <input
                type="file"
                name="profileImage"
                onChange={handleFileChange}
                className="mt-1 block w-full border border-gray-300 rounded-lg px-4 py-2"
                accept="image/*"
              />
            </div>

            {/* Submit Button */}
            <div className="md:col-span-3 flex justify-end">
              <button
                type="submit"
                className="bg-black text-white py-2 px-6 rounded-lg hover:bg-gray-800 transition duration-300"
              >
                Update
              </button>
            </div>
          </form>
        )}

        <ToastContainer />
      </main>
    </Layout>
  );
};

export default EditAreaManager;
