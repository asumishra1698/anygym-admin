import React, { useEffect, useState } from "react";
import Layout from "../../reuseable/Layout";
import { useNavigate } from "react-router-dom";
import { SearchIcon } from "@heroicons/react/solid";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersRequest } from "../../redux/actions/userActions";

const ManageUsers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  const {
  loading,
  users = [],
  error,
} = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUsersRequest({ search: searchQuery, page, limit }));
  }, [dispatch, searchQuery, page, limit]);

  return (
    <Layout>
      <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-700 dark:text-gray-100 mb-4 md:mb-0">
            All users
          </h2>
          <div className="flex items-center space-x-4 w-full md:w-auto">
            {/* Search Input */}
            <div className="relative w-full md:w-auto">
              <SearchIcon className="absolute left-3 top-2.5 w-5 h-5 text-gray-500 dark:text-gray-300" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setPage(1); // Reset to first page on search
                }}
                className="w-full md:w-auto pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 dark:bg-gray-800 dark:text-gray-100"
              />
            </div>
            {/* Add users Button (optional) */}
            {/* <button
              onClick={() => navigate("/add-user")}
              className="px-3 py-3 bg-black dark:bg-gray-800 text-white text-sm font-medium rounded-lg shadow hover:bg-gray-800 dark:hover:bg-gray-700"
            >
              + Add users
            </button> */}
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
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg">
                <thead>
                  <tr>
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Email</th>
                    <th className="px-4 py-2">Mobile</th>
                    <th className="px-4 py-2">Gender</th>
                    <th className="px-4 py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id}>
                      <td className="px-4 py-2">{user.name}</td>
                      <td className="px-4 py-2">{user.email}</td>
                      <td className="px-4 py-2">{user.mobile}</td>
                      <td className="px-4 py-2">{user.gender}</td>
                      <td className="px-4 py-2">{user.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        {/* Pagination */}
        {/* <div className="flex justify-center mt-4">
          <button
            disabled={page <= 1}
            onClick={() => setPage(page - 1)}
            className="px-3 py-1 mx-1 bg-gray-300 dark:bg-gray-700 rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span className="px-3 py-1 mx-1">
            Page {page} of {pagination.totalPages || 1}
          </span>
          <button
            disabled={page >= (pagination.totalPages || 1)}
            onClick={() => setPage(page + 1)}
            className="px-3 py-1 mx-1 bg-gray-300 dark:bg-gray-700 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div> */}
      </div>
    </Layout>
  );
};

export default ManageUsers;
