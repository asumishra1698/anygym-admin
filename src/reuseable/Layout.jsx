import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Sidebar from "./Sidebar";
import { UserCircleIcon, LogoutIcon } from "@heroicons/react/solid";

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const username = useSelector((state) => state.auth.user?.name);

  useEffect(() => {
    if (username) {
      localStorage.setItem("username", username);
    }
  }, [username]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleMyAccount = () => {
    navigate("/my-account");
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <header className="p-4 flex justify-between items-center bg-white shadow fixed top-0 left-64 right-0 z-10">
          <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>
          <div
            className="relative"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <div className="flex items-center space-x-2 cursor-pointer">
              <UserCircleIcon className="w-8 h-8 text-gray-600" />
              <span className="text-gray-800 font-medium">
                {username || localStorage.getItem("username")}
              </span>
            </div>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <button
                  onClick={handleMyAccount}
                  className="flex items-center w-full py-2 px-4 text-gray-700 hover:bg-gray-100"
                >
                  <UserCircleIcon className="w-5 h-5" />
                  <span className="ml-3">My Account</span>
                </button>

                <button
                  onClick={handleLogout}
                  className="flex items-center w-full py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  <LogoutIcon className="w-5 h-5" />
                  <span className="ml-3">Logout</span>
                </button>
              </div>
            )}
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
