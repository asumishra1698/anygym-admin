import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Sidebar from "../../reuseable/Sidebar";
import { addAreaManagerRequest } from "../../redux/actions/areaManagerActions";

const AddAreaManager = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    mobile: "",
    dob: "",
    address: "",
    latitude: "",
    longitude: "",
    role: "",
    password: "",
    cpassword: "",
    profilePicture: null,
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
  
    // Dispatch the action with plain data
    dispatch(
      addAreaManagerRequest({
        ...formData,
      })
    );
  };

  return (
    <div className="flex h-screen">
      <div className="w-64 bg-gray-800 text-white fixed h-full">
        <Sidebar />
      </div>

      <main className="flex-1 ml-64 p-6 bg-gray-100 overflow-y-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Add Area Manager
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md space-y-4"
        >
          {/* First Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              name="fname"
              value={formData.fname}
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
              name="lname"
              value={formData.lname}
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

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="mt-1 block w-full border border-gray-300 rounded-lg px-4 py-2"
              required
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              name="cpassword"
              value={formData.cpassword}
              onChange={handleChange}
              placeholder="Confirm password"
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

          <div>
            <button
              type="submit"
              className="w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition duration-300"
            >
              Submit
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default AddAreaManager;
