import React, { useState } from "react";
import Layout from "../../reuseable/Layout";

const EditAreaManager = ({ manager = {}, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    firstName: manager.firstName || "",
    lastName: manager.lastName || "",
    email: manager.email || "",
    dob: manager.dob || "",
    phone: manager.phone || "",
    address: manager.address || "",
    latitude: manager.latitude || "",
    longitude: manager.longitude || "",
    role: manager.role || "",
    idNumber: manager.idNumber || "",
    referral_id: manager.referral_id || "", // Referral ID field
    status: manager.status || "Active", // Default status
    profilePicture: manager.profilePicture || null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, profilePicture: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Layout>
      <main className="bg-gray-100 overflow-y-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Edit Area Manager
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {/* First Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Enter first name"
              className="mt-1 block w-full border border-gray-300 rounded-lg px-4 py-2"
              required
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Enter last name"
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

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 rounded-l-lg border border-gray-300 bg-gray-100 text-gray-600">
                +91
              </span>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
                className="flex-1 block w-full border border-gray-300 rounded-r-lg px-4 py-2"
                required
              />
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter address"
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
              value={formData.latitude}
              onChange={handleChange}
              placeholder="Enter latitude"
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
              value={formData.longitude}
              onChange={handleChange}
              placeholder="Enter longitude"
              className="mt-1 block w-full border border-gray-300 rounded-lg px-4 py-2"
              required
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              placeholder="Enter role"
              className="mt-1 block w-full border border-gray-300 rounded-lg px-4 py-2"
              required
            />
          </div>

          {/* Aadhar or PAN Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Aadhar or PAN Number
            </label>
            <input
              type="text"
              name="idNumber"
              value={formData.idNumber}
              onChange={handleChange}
              placeholder="Enter Aadhar or PAN number"
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

          {/* Status Dropdown */}
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
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
            </select>
          </div>

          {/* Profile Picture */}
          <div className="md:col-span-3">
            <label className="block text-sm font-medium text-gray-700">
              Upload Profile Picture
            </label>
            <input
              type="file"
              name="profilePicture"
              onChange={handleFileChange}
              className="mt-1 block w-full border border-gray-300 rounded-lg px-4 py-2"
              accept="image/*"
            />
          </div>

          {/* Buttons */}
          <div className="md:col-span-3 flex justify-end space-x-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </main>
    </Layout>
  );
};

export default EditAreaManager;
