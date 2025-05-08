import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addGymOwnerRequest } from "../../redux/actions/gymOwnerActions";
import Layout from "../../reuseable/Layout";

const AddGymOwner = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    user_type: "OWNER",
    password: "",
    cpassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addGymOwnerRequest(formData, (success, message) => {
        if (success) {
          navigate("/manage-gym-owner");
        } else {
          console.error(message);
        }
      })
    );
  };

  return (
    <Layout>
      <main className="bg-gray-100 overflow-y-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Add Gym Owner</h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          </div>
          
          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-black text-white py-2 px-6 rounded-lg hover:bg-gray-800 transition duration-300"
            >
              Submit
            </button>
          </div>
        </form>
      </main>
    </Layout>
  );
};

export default AddGymOwner;
