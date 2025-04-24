import React from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import {
  HomeIcon,
  MapIcon,
  UserGroupIcon,
  OfficeBuildingIcon,
  UsersIcon,
  ClipboardListIcon,
  CogIcon,
  LogoutIcon,
} from "@heroicons/react/outline";

const Sidebar = () => {
  const navigate = useNavigate(); // Initialize navigate

  const handleLogout = () => {
    // Clear any authentication tokens or session data if needed
    localStorage.removeItem("token"); // Example: Remove token from localStorage
    navigate("/login"); // Navigate to the login page
  };

  return (
    <aside className="w-64 bg-green-800 text-white flex flex-col h-screen">
      <div className="p-4 text-center border-b border-green-700">
        <img
          src="/logo.webp"
          alt="Any Gym Logo"
          className="mx-auto w-48"
        />
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4">
        <ul className="space-y-4">
          <li>
            <Link
              to="/dashboard"
              className="flex items-center py-2 px-4 rounded hover:bg-green-700"
            >
              <HomeIcon className="w-5 h-5 mr-3" />
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/manage-area-manager"
              className="flex items-center py-2 px-4 rounded hover:bg-green-700"
            >
              <MapIcon className="w-5 h-5 mr-3" />
              Area Manager
            </Link>
          </li>
          <li>
            <Link
              to="/manage-gym-owner"
              className="flex items-center py-2 px-4 rounded hover:bg-green-700"
            >
              <UserGroupIcon className="w-5 h-5 mr-3" />
              Gym Owner
            </Link>
          </li>
          <li>
            <Link
              to="/manage-gym"
              className="flex items-center py-2 px-4 rounded hover:bg-green-700"
            >
              <OfficeBuildingIcon className="w-5 h-5 mr-3" />
              Gym
            </Link>
          </li>
          <li>
            <Link
              to="/manage-members"
              className="flex items-center py-2 px-4 rounded hover:bg-green-700"
            >
              <UsersIcon className="w-5 h-5 mr-3" />
              Members
            </Link>
          </li>
          <li>
            <Link
              to="/manage-subscriptions"
              className="flex items-center py-2 px-4 rounded hover:bg-green-700"
            >
              <ClipboardListIcon className="w-5 h-5 mr-3" />
              Subscriptions
            </Link>
          </li>
          <li>
            <Link
              to="/manage-trainers"
              className="flex items-center py-2 px-4 rounded hover:bg-green-700"
            >
              <UsersIcon className="w-5 h-5 mr-3" />
              Trainers
            </Link>
          </li>
          <li>
            <Link
              to="/settings"
              className="flex items-center py-2 px-4 rounded hover:bg-green-700"
            >
              <CogIcon className="w-5 h-5 mr-3" />
              Settings
            </Link>
          </li>
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-green-700">
        <button
          onClick={handleLogout} // Attach the logout handler
          className="flex items-center w-full py-2 px-4 bg-red-500 rounded hover:bg-red-600"
        >
          <LogoutIcon className="w-5 h-5 mr-3" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;