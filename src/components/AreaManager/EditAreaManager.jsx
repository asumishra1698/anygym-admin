import React, { useState } from "react";
import Sidebar from "../../reuseable/Sidebar";

const EditAreaManager = ({ manager = {}, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    firstName: manager.firstName || "",
    lastName: manager.lastName || "",
    email: manager.email || "",
    dob: manager.dob || "",
    phone: manager.phone || "",
    address: manager.address || "",
    idNumber: manager.idNumber || "",
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
    onSave(formData); // Pass the updated data to the parent component
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Edit Area Manager
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
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

            {/* Phone No. */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone No.
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
        </div>
      </main>
    </div>
  );
};

export default EditAreaManager;
