import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  BsHouseDoor,
  BsMap,
  BsPeople,
  BsBuilding,
  BsBoxArrowRight,
  BsChevronLeft,
  BsChevronRight,
  BsClipboard,
  BsGear,
  BsBarChart,
  BsWallet,
  BsCreditCard,
  BsCardChecklist,
} from "react-icons/bs";

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
    window.location.reload();
  };

  return (
    <>
      {/* Overlay for mobile */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity ${
          isSidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
        } md:hidden`}
        onClick={() => setIsSidebarOpen(false)}
      ></div>

      <aside
        className={`fixed top-0 left-0 h-full bg-[#29a745] dark:bg-gray-800 text-white dark:text-gray-100 flex flex-col transition-transform duration-300 z-50 ${
          isSidebarOpen || !initialIsCollapsed
            ? "translate-x-0"
            : "-translate-x-full"
        } md:translate-x-0 md:relative ${
          initialIsCollapsed ? "md:w-20" : "w-64"
        }`}
        style={{
          boxShadow: "2px 0 8px rgba(0,0,0,0.07)",
        }}
      >
        <button
          onClick={() => setIsCollapsed(!initialIsCollapsed)}
          className="absolute top-4 right-[-42px] bg-green-700 dark:bg-gray-700 text-white p-2 rounded-full shadow hover:bg-green-600 dark:hover:bg-gray-600 transition-all duration-300"
        >
          {initialIsCollapsed ? (
            <BsChevronRight className="w-5 h-5" />
          ) : (
            <BsChevronLeft className="w-5 h-5" />
          )}
        </button>

        {!initialIsCollapsed && (
          <div className="p-4 text-center border-b border-green-500 bg-[#29a745] dark:border-gray-600 bg-white dark:bg-gray-900">
            <img src="/logo.webp" alt="Any Gym Logo" className="mx-auto w-48" />
          </div>
        )}

        <nav className="flex-1 p-4 overflow-y-auto hide-scrollbar">
          <ul className="space-y-4">
            <li>
              <Link
                to="/dashboard"
                className="flex items-center py-2 px-4 rounded hover:bg-green-700 hover:text-white dark:hover:bg-green-800"
              >
                <BsHouseDoor className="w-5 h-5" />
                {!initialIsCollapsed && <span className="ml-3">Dashboard</span>}
              </Link>
            </li>

            {(userType === "ADMIN" || userType === "SUB_ADMIN") && (
              <li>
                <Link
                  to="/manage-area-manager"
                  className="flex items-center py-2 px-4 rounded hover:bg-green-700 hover:text-white dark:hover:bg-green-800"
                >
                  <BsMap className="w-5 h-5" />
                  {!initialIsCollapsed && (
                    <span className="ml-3">Area Manager</span>
                  )}
                </Link>
              </li>
            )}

            {(userType === "ADMIN" ||
              userType === "SUB_ADMIN" ||
              userType === "AREA_MANAGER") && (
              <li>
                <Link
                  to="/manage-gym-owner"
                  className="flex items-center py-2 px-4 rounded hover:bg-green-700 hover:text-white dark:hover:bg-green-800"
                >
                  <BsBuilding className="w-5 h-5" />
                  {!initialIsCollapsed && (
                    <span className="ml-3">Gym Owner</span>
                  )}
                </Link>
              </li>
            )}

            {(userType === "ADMIN" ||
              userType === "SUB_ADMIN" ||
              userType === "AREA_MANAGER") && (
              <li>
                <div
                  onClick={() => setIsGymSubmenuOpen(!isGymSubmenuOpen)}
                  className="flex items-center py-2 px-4 rounded hover:bg-green-700 hover:text-white dark:hover:bg-green-800 cursor-pointer"
                >
                  <BsBuilding className="w-5 h-5" />
                  {!initialIsCollapsed && (
                    <>
                      <span className="ml-3">Gym</span>
                      <BsChevronRight
                        className={`ml-auto w-4 h-4 transition-transform ${
                          isGymSubmenuOpen ? "rotate-90" : ""
                        }`}
                      />
                    </>
                  )}
                </div>
                {!initialIsCollapsed && isGymSubmenuOpen && (
                  <ul className="ml-8 mt-2 space-y-2">
                    {(userType === "ADMIN" || userType === "SUB_ADMIN") && (
                      <li>
                        <Link
                          to="/manage-all-gym"
                          className="flex items-center py-2 px-4 rounded hover:bg-green-700 hover:text-white dark:hover:bg-green-800"
                        >
                          <span>All Gym</span>
                        </Link>
                      </li>
                    )}

                    {userType === "AREA_MANAGER" && (
                      <li>
                        <Link
                          to="/manage-pending-gym"
                          className="flex items-center py-2 px-4 rounded hover:bg-green-700 hover:text-white dark:hover:bg-green-800"
                        >
                          <span>Pending Gym</span>
                        </Link>
                      </li>
                    )}

                    {userType === "AREA_MANAGER" && (
                      <li>
                        <Link
                          to="/manage-approved-gym"
                          className="flex items-center py-2 px-4 rounded hover:bg-green-700 hover:text-white dark:hover:bg-green-800"
                        >
                          <span>Approved Gym</span>
                        </Link>
                      </li>
                    )}

                    {userType === "AREA_MANAGER" && (
                      <li>
                        <Link
                          to="/manage-rejected-gym"
                          className="flex items-center py-2 px-4 rounded hover:bg-green-700 hover:text-white dark:hover:bg-green-800"
                        >
                          <span>Rejected Gym</span>
                        </Link>
                      </li>
                    )}
                  </ul>
                )}
              </li>
            )}

            {(userType === "ADMIN" || userType === "AREA_MANAGER") && (
              <li>
                <Link
                  to="/manage-customers"
                  className="flex items-center py-2 px-4 rounded hover:bg-green-700"
                >
                  <BsPeople className="w-5 h-5" />
                  {!initialIsCollapsed && (
                    <span className="ml-3">Customers</span>
                  )}
                </Link>
              </li>
            )}

            {userType === "ADMIN" && (
              <li>
                <Link
                  to="/manage-products"
                  className="flex items-center py-2 px-4 rounded hover:bg-green-700"
                >
                  <BsClipboard className="w-5 h-5" />
                  {!initialIsCollapsed && (
                    <span className="ml-3">Products</span>
                  )}
                </Link>
              </li>
            )}

            {userType === "ADMIN" && (
              <li>
                <Link
                  to="/manage-reports"
                  className="flex items-center py-2 px-4 rounded hover:bg-green-700"
                >
                  <BsBarChart className="w-5 h-5" />
                  {!initialIsCollapsed && (
                    <span className="ml-3">Analytics and Reports</span>
                  )}
                </Link>
              </li>
            )}

            {(userType === "ADMIN" || userType === "AREA_MANAGER") && (
              <li>
                <Link
                  to="/manage-bookings"
                  className="flex items-center py-2 px-4 rounded hover:bg-green-700"
                >
                  <BsCreditCard className="w-5 h-5" />
                  {!initialIsCollapsed && (
                    <span className="ml-3">Bookings</span>
                  )}
                </Link>
              </li>
            )}

            {(userType === "ADMIN" || userType === "AREA_MANAGER") && (
              <li>
                <Link
                  to="/manage-paymentwallet"
                  className="flex items-center py-2 px-4 rounded hover:bg-green-700"
                >
                  <BsWallet className="w-5 h-5" />
                  {!initialIsCollapsed && (
                    <span className="ml-3">Payments & Wallet</span>
                  )}
                </Link>
              </li>
            )}

            {(userType === "ADMIN" || userType === "AREA_MANAGER") && (
              <li>
                <Link
                  to="/manage-subscriptions"
                  className="flex items-center py-2 px-4 rounded hover:bg-green-700"
                >
                  <BsCardChecklist className="w-5 h-5" />
                  {!initialIsCollapsed && (
                    <span className="ml-3">Subscriptions</span>
                  )}
                </Link>
              </li>
            )}

            {(userType === "ADMIN" || userType === "SUB_ADMIN") && (
              <li>
                <div
                  onClick={() => setIsSettingSubmenuOpen(!isSettingSubmenuOpen)}
                  className="flex items-center py-2 px-4 rounded hover:bg-green-700 hover:text-white dark:hover:bg-green-800 cursor-pointer"
                >
                  <BsGear className="w-5 h-5" />
                  {!initialIsCollapsed && (
                    <>
                      <span className="ml-3">Settings</span>
                      <BsChevronRight
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
                        className="flex items-center py-2 px-4 rounded hover:bg-green-700 hover:text-white dark:hover:bg-green-800"
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

        <div className="p-4 border-t border-green-500 dark:border-gray-600 bg-[#29a745] dark:bg-gray-800">
          <button
            onClick={handleLogout}
            className="flex items-center w-full py-2 px-4 bg-black dark:bg-gray-600 rounded hover:bg-red-600 dark:hover:bg-red-700 text-white"
          >
            <BsBoxArrowRight className="w-5 h-5" />
            {!initialIsCollapsed && <span className="ml-3">Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
