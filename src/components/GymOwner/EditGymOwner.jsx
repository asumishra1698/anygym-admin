import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../../reuseable/Layout";

const EditGymOwner = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const owner = location.state?.owner || {};

  const [formData, setFormData] = useState({
    name: owner.name || "",
    email: owner.email || "",
    phone: owner.phone || "",
    dob: owner.dob || "",
    address: owner.address || "",
    idNumber: owner.idNumber || "",
    profilePicture: owner.profilePicture || null,
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
    console.log("Gym Owner Updated:", formData);
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <Layout>
      <main className="bg-gray-100 overflow-y-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Edit Gym Owner
        </h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md space-y-4"
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
              placeholder="Enter name"
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

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
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
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter address"
              className="mt-1 block w-full border border-gray-300 rounded-lg px-4 py-2"
              required
            />
          </div>

          {/* ID Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              ID Number
            </label>
            <input
              type="text"
              name="idNumber"
              value={formData.idNumber}
              onChange={handleChange}
              placeholder="Enter ID number"
              className="mt-1 block w-full border border-gray-300 rounded-lg px-4 py-2"
              required
            />
          </div>

          {/* Profile Picture */}
          <div>
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
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
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

export default EditGymOwner;
