import React, { useState } from "react";
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

  return (
    <div className="flex h-screen">
      <Loader loading={isLoading} />
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <div className="flex-1 flex flex-col">
        <header
          className={`p-4 flex justify-between items-center bg-white shadow fixed left-0 right-0 z-10 top-0 ${
            isCollapsed ? "md:left-20" : "md:left-64"
          }`}
        >
          <h1 className="text-xl font-bold text-gray-800 pl-8">Dashboard</h1>
          <div className="flex items-center space-x-6">
            <div
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className="flex items-center space-x-2 cursor-pointer">
                <UserCircleIcon className="w-8 h-8 text-gray-600" />
                <span className="text-gray-800 font-medium">
                  {user?.name || localStorage.getItem("user")}
                </span>
              </div>
              <div
                className={`absolute right-0 mt-2 w-60 bg-white border border-gray-200 rounded-lg shadow-lg z-50 transition-all duration-300 ease-in-out transform ${
                  isDropdownOpen
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-95 pointer-events-none"
                }`}
              >
                <button
                  onClick={handleMyAccount}
                  className="flex items-center w-full py-2 px-4 text-gray-700 hover:bg-gray-100"
                >
                  <UserCircleIcon className="w-5 h-5" />
                  <span className="ml-3">My Account</span>
                </button>

                <button
                  onClick={handleChangePassword}
                  className="flex items-center w-full py-2 px-4 text-gray-700 hover:bg-gray-100"
                >
                  <UserCircleIcon className="w-5 h-5" />
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

        <main className="flex-1 p-6 bg-gray-100 mt-16 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
