import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  HomeIcon,
  MapIcon,
  UserGroupIcon,
  OfficeBuildingIcon,
  UsersIcon,
  ClipboardListIcon,
  CogIcon,
  LogoutIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/outline";

const Sidebar = () => {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false); 

  const handleLogout = () => {
    localStorage.clear(); 
    navigate("/login"); 
  };

  return (
    <aside
      className={`${
        isCollapsed ? "w-20" : "w-64"
      } bg-green-800 text-white flex flex-col h-screen transition-all duration-300 relative`}
    >
      
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute top-4 right-[-12px] bg-green-700 text-white p-2 rounded-full shadow hover:bg-green-600 transition-all duration-300"
      >
        {isCollapsed ? (
          <ChevronRightIcon fontSize={200} />
        ) : (
          <ChevronLeftIcon className="w-5 h-5" />
        )}
      </button>

     
      {!isCollapsed && (
        <div className="p-4 text-center border-b border-green-700">
          <img src="/logo.webp" alt="Any Gym Logo" className="mx-auto w-48" />
        </div>
      )}

      
      <nav className="flex-1 p-4">
        <ul className="space-y-4">
          <li>
            <Link
              to="/dashboard"
              className="flex items-center py-2 px-4 rounded hover:bg-green-700"
            >
              <HomeIcon className="w-5 h-5" />
              {!isCollapsed && <span className="ml-3">Dashboard</span>}
            </Link>
          </li>
          <li>
            <Link
              to="/manage-area-manager"
              className="flex items-center py-2 px-4 rounded hover:bg-green-700"
            >
              <MapIcon className="w-5 h-5" />
              {!isCollapsed && <span className="ml-3">Area Manager</span>}
            </Link>
          </li>
          <li>
            <Link
              to="/manage-gym-owner"
              className="flex items-center py-2 px-4 rounded hover:bg-green-700"
            >
              <UserGroupIcon className="w-5 h-5" />
              {!isCollapsed && <span className="ml-3">Gym Owner</span>}
            </Link>
          </li>
          <li>
            <Link
              to="/manage-gym"
              className="flex items-center py-2 px-4 rounded hover:bg-green-700"
            >
              <OfficeBuildingIcon className="w-5 h-5" />
              {!isCollapsed && <span className="ml-3">Gym</span>}
            </Link>
          </li>
          <li>
            <Link
              to="/manage-members"
              className="flex items-center py-2 px-4 rounded hover:bg-green-700"
            >
              <UsersIcon className="w-5 h-5" />
              {!isCollapsed && <span className="ml-3">Members</span>}
            </Link>
          </li>
          <li>
            <Link
              to="/manage-subscriptions"
              className="flex items-center py-2 px-4 rounded hover:bg-green-700"
            >
              <ClipboardListIcon className="w-5 h-5" />
              {!isCollapsed && <span className="ml-3">Subscriptions</span>}
            </Link>
          </li>
          <li>
            <Link
              to="/manage-trainers"
              className="flex items-center py-2 px-4 rounded hover:bg-green-700"
            >
              <UsersIcon className="w-5 h-5" />
              {!isCollapsed && <span className="ml-3">Trainers</span>}
            </Link>
          </li>
          <li>
            <Link
              to="/settings"
              className="flex items-center py-2 px-4 rounded hover:bg-green-700"
            >
              <CogIcon className="w-5 h-5" />
              {!isCollapsed && <span className="ml-3">Settings</span>}
            </Link>
          </li>
        </ul>
      </nav>

     
      <div className="p-4 border-t border-green-700">
        <button
          onClick={handleLogout}
          className="flex items-center w-full py-2 px-4 bg-red-500 rounded hover:bg-red-600"
        >
          <LogoutIcon className="w-5 h-5" />
          {!isCollapsed && <span className="ml-3">Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
