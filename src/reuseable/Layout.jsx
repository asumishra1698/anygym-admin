import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Sidebar from "./Sidebar";
import { UserCircleIcon, LogoutIcon } from "@heroicons/react/solid";
import Loader from "./Loader";

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropdownTimeout, setDropdownTimeout] = useState(null);
  const user = useSelector((state) => state.auth.user);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );

  const { loading: areaManagerLoading } = useSelector(
    (state) => state.areaManager
  );
  const { loading: gymOwnerLoading } = useSelector((state) => state.gymOwner);
  const { loading: pendingGymsLoading } = useSelector(
    (state) => state.pendingGyms
  );
  const { loading: approvedGymsLoading } = useSelector(
    (state) => state.approvedGyms
  );

  const { loading: amenityLoading } = useSelector((state) => state.amenity);

  const isLoading =
    areaManagerLoading ||
    gymOwnerLoading ||
    pendingGymsLoading ||
    approvedGymsLoading ||
    amenityLoading;

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleMyAccount = () => {
    navigate("/area-manager-account");
  };

  const handleChangePassword = () => {
    navigate("/forgot-password");
  };

  const handleMouseEnter = () => {
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout);
      setDropdownTimeout(null);
    }
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 300);
    setDropdownTimeout(timeout);
  };

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);
  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Loader loading={isLoading} />
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <div className="flex-1 flex flex-col">
        <header
          className={`p-4 flex justify-between items-center bg-white dark:bg-gray-800 shadow fixed left-0 right-0 z-10 top-0 ${
            isCollapsed ? "md:left-20" : "md:left-64"
          }`}
        >
          <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100 pl-8">
            Dashboard
          </h1>
          <div className="flex items-center space-x-6">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
              title="Toggle Theme"
            >
              {theme === "dark" ? (
                // Moon SVG
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"
                  />
                </svg>
              ) : (
                // Sun SVG
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="5"
                    stroke="currentColor"
                    strokeWidth={2}
                    fill="none"
                  />
                  <path
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
                  />
                </svg>
              )}
            </button>
            <div
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className="flex items-center space-x-2 cursor-pointer">
                <UserCircleIcon className="w-9 h-9 text-gray-600 dark:text-gray-100" />
                <span className="text-gray-800 dark:text-gray-100 font-medium">
                  {user?.name || localStorage.getItem("user")}
                </span>
              </div>
              <div
                className={`absolute right-0 mt-2 w-60 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 transition-all duration-300 ease-in-out transform ${
                  isDropdownOpen
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-95 pointer-events-none"
                }`}
              >
                <button
                  onClick={handleMyAccount}
                  className="flex items-center w-full py-2 px-4 text-gray-700 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <UserCircleIcon className="w-5 h-5 text-gray-600 dark:text-gray-100" />
                  <span className="ml-3">My Account</span>
                </button>

                <button
                  onClick={handleChangePassword}
                  className="flex items-center w-full py-2 px-4 text-gray-700 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <UserCircleIcon className="w-5 h-5 text-gray-600 dark:text-gray-100" />
                  <span className="ml-3">Change Password</span>
                </button>

                <button
                  onClick={handleLogout}
                  className="flex items-center w-full py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  <LogoutIcon className="w-5 h-5" />
                  <span className="ml-3">Logout</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 bg-gray-100 dark:bg-gray-900 mt-16 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
