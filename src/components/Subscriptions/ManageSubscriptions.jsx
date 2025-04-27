import React, { useState } from "react";
import Sidebar from "../../reuseable/Sidebar";
import { useNavigate } from "react-router-dom";
import { SearchIcon } from "@heroicons/react/solid";

const ManageSubscriptions = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex h-screen">
     <Sidebar onToggle={(collapsed) => setIsSidebarCollapsed(collapsed)} />

      <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-700">
            All Subscriptions
          </h2>
          <div className="flex space-x-4">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-2.5 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
            </div>

            <button
              onClick={() => navigate("/manage-subscriptions")}
              className="px-4 py-2 bg-black text-white text-sm font-medium rounded-lg shadow hover:bg-gray-800"
            >
              + Add Subscriptions
            </button>
          </div>
        </div>
        <p>Coming Soon</p>
      </main>
    </div>
  );
};

export default ManageSubscriptions;
