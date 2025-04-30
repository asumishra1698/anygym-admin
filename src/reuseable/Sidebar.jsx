import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  HomeIcon,
  MapIcon,
  UserGroupIcon,
  OfficeBuildingIcon,
  LogoutIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClipboardListIcon,
  CogIcon,
  AcademicCapIcon,
} from "@heroicons/react/outline";

const Sidebar = ({ isCollapsed = false, setIsCollapsed = () => {} }) => {
  const navigate = useNavigate();
  const [isGymSubmenuOpen, setIsGymSubmenuOpen] = useState(false);
  const [isSettingSubmenuOpen, setIsSettingSubmenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <aside
      className={`${
        isCollapsed ? "w-20" : "w-64"
      } bg-gradient-to-br from-green-700 to-green-800 text-white flex flex-col h-screen transition-all duration-300 relative z-50`}
      style={{
        background: "linear-gradient(45deg, #29a643, #1e7d34)",
      }}
    >
      {/* Collapse Button */}
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

      {/* Logo */}
      {!isCollapsed && (
        <div className="p-4 text-center border-b border-green-700">
          <img src="/logo.webp" alt="Any Gym Logo" className="mx-auto w-48" />
        </div>
      )}

      {/* Navigation Menu */}
      <nav className="flex-1 p-4 overflow-y-auto hide-scrollbar">
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
              <OfficeBuildingIcon className="w-5 h-5" />
              {!isCollapsed && <span className="ml-3">Gym Owner</span>}
            </Link>
          </li>

          {/* Gym Menu with Submenu */}
          <li>
            <div
              onClick={() => setIsGymSubmenuOpen(!isGymSubmenuOpen)}
              className="flex items-center py-2 px-4 rounded hover:bg-green-700 cursor-pointer"
            >
              <OfficeBuildingIcon className="w-5 h-5" />
              {!isCollapsed && (
                <>
                  <span className="ml-3">Gym</span>
                  <ChevronRightIcon
                    className={`ml-auto w-4 h-4 transition-transform ${
                      isGymSubmenuOpen ? "rotate-90" : ""
                    }`}
                  />
                </>
              )}
            </div>
            {!isCollapsed && isGymSubmenuOpen && (
              <ul className="ml-8 mt-2 space-y-2">
                <li>
                  <Link
                    to="/manage-pending-gym"
                    className="flex items-center py-2 px-4 rounded hover:bg-green-700"
                  >
                    <span>Pending Gym</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/manage-approved-gym"
                    className="flex items-center py-2 px-4 rounded hover:bg-green-700"
                  >
                    <span>Approved Gym</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/manage-rejected-gym"
                    className="flex items-center py-2 px-4 rounded hover:bg-green-700"
                  >
                    <span>Rejected Gym</span>
                  </Link>
                </li>
              </ul>
            )}
          </li>

          <li>
            <Link
              to="/manage-products"
              className="flex items-center py-2 px-4 rounded hover:bg-green-700"
            >
              <AcademicCapIcon className="w-5 h-5" />
              {!isCollapsed && <span className="ml-3">Products</span>}
            </Link>
          </li>
          <li>
            <Link
              to="/manage-products-category"
              className="flex items-center py-2 px-4 rounded hover:bg-green-700"
            >
              <AcademicCapIcon className="w-5 h-5" />
              {!isCollapsed && <span className="ml-3">Products Category</span>}
            </Link>
          </li>

          <li>
            <Link
              to="/manage-customers"
              className="flex items-center py-2 px-4 rounded hover:bg-green-700"
            >
              <UserGroupIcon className="w-5 h-5" />
              {!isCollapsed && <span className="ml-3">Customers</span>}
            </Link>
          </li>

          <li>
            <Link
              to="/manage-booking"
              className="flex items-center py-2 px-4 rounded hover:bg-green-700"
            >
              <ClipboardListIcon className="w-5 h-5" />
              {!isCollapsed && (
                <span className="ml-3">Booking Management </span>
              )}
            </Link>
          </li>

          <li>
            <Link
              to="/manage-payment-wallet"
              className="flex items-center py-2 px-4 rounded hover:bg-green-700"
            >
              <ClipboardListIcon className="w-5 h-5" />
              {!isCollapsed && <span className="ml-3">Payment & Wallet</span>}
            </Link>
          </li>

          <li>
            <Link
              to="/manage-reports"
              className="flex items-center py-2 px-4 rounded hover:bg-green-700"
            >
              <ClipboardListIcon className="w-5 h-5" />
              {!isCollapsed && (
                <span className="ml-3">Reports & Analytics</span>
              )}
            </Link>
          </li>

          {/* Settings Menu with Submenu */}
          <li>
            <div
              onClick={() => setIsSettingSubmenuOpen(!isSettingSubmenuOpen)}
              className="flex items-center py-2 px-4 rounded hover:bg-green-700 cursor-pointer"
            >
              <CogIcon className="w-5 h-5" />
              {!isCollapsed && (
                <>
                  <span className="ml-3">Settings</span>
                  <ChevronRightIcon
                    className={`ml-auto w-4 h-4 transition-transform ${
                      isSettingSubmenuOpen ? "rotate-90" : ""
                    }`}
                  />
                </>
              )}
            </div>
            {!isCollapsed && isSettingSubmenuOpen && (
              <ul className="ml-8 mt-2 space-y-2">
                <li>
                  <Link
                    to="/amenities"
                    className="flex items-center py-2 px-4 rounded hover:bg-green-700"
                  >
                    <span>Amenities</span>
                  </Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-green-700">
        <button
          onClick={handleLogout}
          className="flex items-center w-full py-2 px-4 bg-black rounded hover:bg-red-600"
        >
          <LogoutIcon className="w-5 h-5" />
          {!isCollapsed && <span className="ml-3">Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
