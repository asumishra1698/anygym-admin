import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addAreaManagerRequest } from "../../redux/actions/areaManagerActions";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Layout from "../../reuseable/Layout";

const AddAreaManager = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    if (formData.password !== formData.cpassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === "location") {
          formDataToSend.append("address", formData.location.address);
          formDataToSend.append("longitude", formData.location.coordinates[0]);
          formDataToSend.append("latitude", formData.location.coordinates[1]);
        } else {
          formDataToSend.append(key, formData[key]);
        }
      });
      const response = await dispatch(addAreaManagerRequest(formDataToSend));
      if (response?.status === 200) {
        toast.success("Area Manager added successfully!");
        navigate("/manage-area-manager");
      } else {
        toast.error("Failed to add area manager. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <Layout>
      <main className="bg-gray-100 overflow-y-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Add Area Manager
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {/* Name */}
          <InputField
            label="Name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter full name"
            required
          />

          {/* Email */}
          <InputField
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
            required
          />

          {/* Mobile */}
          <InputField
            label="Mobile"
            type="text"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            placeholder="Enter mobile number"
            required
          />

          {/* DOB */}
          <InputField
            label="DOB"
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
          />

          {/* Address */}
          <InputField
            label="Address"
            type="text"
            name="address"
            value={formData.location.address}
            onChange={handleChange}
            placeholder="Enter address"
            required
          />

          {/* Longitude */}
          <InputField
            label="Longitude"
            type="text"
            name="longitude"
            value={formData.location.coordinates[0]}
            onChange={handleChange}
            placeholder="Enter longitude"
            required
          />

          {/* Latitude */}
          <InputField
            label="Latitude"
            type="text"
            name="latitude"
            value={formData.location.coordinates[1]}
            onChange={handleChange}
            placeholder="Enter latitude"
            required
          />

          {/* areaPincode */}
          <InputField
            label="Area Pin Code"
            type="number"
            name="areaPincode"
            value={formData.areaPincode}
            onChange={handleChange}
            placeholder="Enter Area Pincode"
            required
          />

          {/* Referral ID */}
          <InputField
            label="Referral ID"
            type="text"
            name="referral_id"
            value={formData.referral_id}
            onChange={handleChange}
            placeholder="Enter referral ID"
          />

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

          {/* Password */}
          <InputField
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
            required
          />

          {/* Confirm Password */}
          <InputField
            label="Confirm Password"
            type="password"
            name="cpassword"
            value={formData.cpassword}
            onChange={handleChange}
            placeholder="Confirm password"
            required
          />

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
          {/* Submit Button */}
          <div className="md:col-span-3 flex justify-end">
            <button
              type="submit"
              className="bg-black text-white py-2 px-6 rounded-lg hover:bg-gray-800 transition duration-300"
            >
              Submit
            </button>
          </div>
        </form>

        <ToastContainer />
      </main>
    </Layout>
  );
};

const InputField = ({
  label,
  type,
  name,
  value,
  onChange,
  placeholder,
  required,
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="mt-1 block w-full border border-gray-300 rounded-lg px-4 py-2"
      required={required}
    />
  </div>
);

export default AddAreaManager;
