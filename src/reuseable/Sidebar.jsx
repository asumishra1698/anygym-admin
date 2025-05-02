import React, { useState, useEffect } from "react";
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

const Sidebar = ({
  isCollapsed: initialIsCollapsed = false,
  setIsCollapsed,
}) => {
  const navigate = useNavigate();
  const [isGymSubmenuOpen, setIsGymSubmenuOpen] = useState(false);
  const [isSettingSubmenuOpen, setIsSettingSubmenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    // Get user type from local storage
    const storedUserType = localStorage.getItem("userType");
    setUserType(storedUserType);

    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsCollapsed(true);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setIsCollapsed]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity ${
          isSidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
        } md:hidden`}
        onClick={() => setIsSidebarOpen(false)}
      ></div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-gradient-to-br from-green-700 to-green-800 text-white flex flex-col transition-transform duration-300 z-50 ${
          isSidebarOpen || !initialIsCollapsed
            ? "translate-x-0"
            : "-translate-x-full"
        } md:translate-x-0 md:relative ${
          initialIsCollapsed ? "md:w-20" : "w-64"
        }`}
        style={{
          background: "linear-gradient(45deg, #29a643, #1e7d34)",
        }}
      >
        {/* Collapse/Expand Button */}
        <button
          onClick={() => setIsCollapsed(!initialIsCollapsed)}
          className="absolute top-4 right-[-35px] bg-green-700 text-white p-2 rounded-full shadow hover:bg-green-600 transition-all duration-300"
        >
          {initialIsCollapsed ? (
            <ChevronRightIcon className="w-5 h-5" />
          ) : (
            <ChevronLeftIcon className="w-5 h-5" />
          )}
        </button>

        {/* Logo */}
        {!initialIsCollapsed && (
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
                {!initialIsCollapsed && <span className="ml-3">Dashboard</span>}
              </Link>
            </li>

            {/* Show Area Manager menu for Admin only */}
            {userType === "ADMIN" && (
              <li>
                <Link
                  to="/manage-area-manager"
                  className="flex items-center py-2 px-4 rounded hover:bg-green-700"
                >
                  <MapIcon className="w-5 h-5" />
                  {!initialIsCollapsed && (
                    <span className="ml-3">Area Manager</span>
                  )}
                </Link>
              </li>
            )}

            {/* Show Gym Owner menu for Admin and Area Manager */}
            {(userType === "ADMIN" || userType === "AREA_MANAGER") && (
              <li>
                <Link
                  to="/manage-gym-owner"
                  className="flex items-center py-2 px-4 rounded hover:bg-green-700"
                >
                  <OfficeBuildingIcon className="w-5 h-5" />
                  {!initialIsCollapsed && (
                    <span className="ml-3">Gym Owner</span>
                  )}
                </Link>
              </li>
            )}

            {/* Gym Menu with Submenu */}
            {(userType === "ADMIN" || userType === "AREA_MANAGER") && (
              <li>
                <div
                  onClick={() => setIsGymSubmenuOpen(!isGymSubmenuOpen)}
                  className="flex items-center py-2 px-4 rounded hover:bg-green-700 cursor-pointer"
                >
                  <OfficeBuildingIcon className="w-5 h-5" />
                  {!initialIsCollapsed && (
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
                {!initialIsCollapsed && isGymSubmenuOpen && (
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
            )}

            {/* Show Customers menu for Admin and Area Manager */}
            {(userType === "ADMIN" || userType === "AREA_MANAGER") && (
              <li>
                <Link
                  to="/manage-customers"
                  className="flex items-center py-2 px-4 rounded hover:bg-green-700"
                >
                  <UserGroupIcon className="w-5 h-5" />
                  {!initialIsCollapsed && (
                    <span className="ml-3">Customers</span>
                  )}
                </Link>
              </li>
            )}

            {/* Show Settings menu for Admin only */}
            {userType === "ADMIN" && (
              <li>
                <div
                  onClick={() => setIsSettingSubmenuOpen(!isSettingSubmenuOpen)}
                  className="flex items-center py-2 px-4 rounded hover:bg-green-700 cursor-pointer"
                >
                  <CogIcon className="w-5 h-5" />
                  {!initialIsCollapsed && (
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
                {!initialIsCollapsed && isSettingSubmenuOpen && (
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
            )}
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-green-700">
          <button
            onClick={handleLogout}
            className="flex items-center w-full py-2 px-4 bg-black rounded hover:bg-red-600"
          >
            <LogoutIcon className="w-5 h-5" />
            {!initialIsCollapsed && <span className="ml-3">Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
