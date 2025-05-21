import React, { useEffect, useState } from "react";
import Layout from "../../reuseable/Layout";
import { useNavigate } from "react-router-dom";
import { SearchIcon } from "@heroicons/react/solid";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersRequest } from "../../redux/actions/userActions";
import {MEDIA_URL} from "../../config"

const ManageUsers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  const { loading, users = [], error } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUsersRequest({ search: searchQuery, page, limit }));
  }, [dispatch, searchQuery, page, limit]);

  return (
    <Layout>
      <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-700 dark:text-gray-100 mb-4 md:mb-0">
            All Users
          </h2>
          <div className="flex items-center space-x-4 w-full md:w-auto">
            <div className="relative w-full md:w-auto">
              <SearchIcon className="absolute left-3 top-2.5 w-5 h-5 text-gray-500 dark:text-gray-300" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setPage(1);
                }}
                className="w-full md:w-auto pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 dark:bg-gray-800 dark:text-gray-100"
              />
            </div>
          </div>
        </div>
        {loading && <p className="text-center">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        <div>
          {users.length === 0 && !loading ? (
            <p className="text-gray-600 dark:text-gray-300 text-center">
              No users found.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
              {users.map((user) => (
                <div
                  key={user._id}
                  className="relative bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex flex-col items-center text-center"
                >
                  {/* Status Badge */}
                  <span
                    className={`absolute top-2 right-2 text-xs font-medium px-2.5 py-0.5 rounded ${
                      user.status.toLowerCase() === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {user.status}
                  </span>
                  {/* Profile Picture */}
                  <img
                    src={
                      user.profile ? `${MEDIA_URL}/${user.profile}` : "/default-profile.png"
                    }
                    alt={user.name}
                    className="w-20 h-20 rounded-full object-cover mx-auto mb-3 border-2 border-gray-300 dark:border-gray-700"
                  />
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
                    {user.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-1">
                    <span className="font-medium">Email:</span> {user.email}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mb-1">
                    <span className="font-medium">Mobile:</span> {user.mobile}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mb-1">
                    <span className="font-medium">Gender:</span> {user.gender}
                  </p>
                  {/* Created At */}
                  <p className="text-gray-500 dark:text-gray-400 text-xs mt-2">
                    Created At: {new Date(user.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ManageUsers;
