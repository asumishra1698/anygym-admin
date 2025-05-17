import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAreaManagerDetailsRequest } from "../../redux/actions/areaManagerActions";
import Layout from "../../reuseable/Layout";
import { MEDIA_URL } from "../../config";

const AreaManagerAccount = () => {
  const dispatch = useDispatch();
  const id = localStorage.getItem("_id");

  const { areaManagerDetails, loading } = useSelector(
    (state) => state.areaManager
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchAreaManagerDetailsRequest(id));
    } else {
      console.error("Area Manager ID is not found in local storage");
    }
  }, [dispatch, id]);

  return (
    <Layout>
      <main className="bg-gray-100 dark:bg-gray-900 overflow-y-auto min-h-screen">
        <div className="max-w-full mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-8">My Account</h1>

          {loading ? (
            <p className="text-gray-700 dark:text-gray-200">Loading...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Left Side: Profile Picture and Basic Info */}
              <div className="col-span-1 flex flex-col items-center">
                <img
                  src={`${MEDIA_URL}${areaManagerDetails?.profileImage}`}
                  alt="Profile"
                  className="w-48 h-48 rounded-lg object-cover border border-gray-300 dark:border-gray-700 mb-4"
                />
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                  {areaManagerDetails?.name}
                </h2>
                <p className="text-gray-600 dark:text-gray-300">{areaManagerDetails?.email}</p>
              </div>

              {/* Right Side: Other Details */}
              <div className="col-span-2 grid grid-cols-2 gap-6">
                {/* Role */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Role
                  </label>
                  <p className="mt-1 text-gray-800 dark:text-gray-100 font-semibold">
                    {areaManagerDetails?.user_type === "AREA_MANAGER"
                      ? "Area Manager"
                      : "Sub Admin"}
                  </p>
                </div>

                {/* Mobile */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Mobile
                  </label>
                  <p className="mt-1 text-gray-800 dark:text-gray-100 font-semibold">
                    {areaManagerDetails?.mobile}
                  </p>
                </div>

                {/* DOB */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Date of Birth
                  </label>
                  <p className="mt-1 text-gray-800 dark:text-gray-100 font-semibold">
                    {areaManagerDetails?.dob}
                  </p>
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Address
                  </label>
                  <p className="mt-1 text-gray-800 dark:text-gray-100 font-semibold">
                    {areaManagerDetails?.location?.address}
                  </p>
                </div>

                {/* Latitude */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Latitude
                  </label>
                  <p className="mt-1 text-gray-800 dark:text-gray-100 font-semibold">
                    {areaManagerDetails?.location?.coordinates[1]}
                  </p>
                </div>

                {/* Longitude */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Longitude
                  </label>
                  <p className="mt-1 text-gray-800 dark:text-gray-100 font-semibold">
                    {areaManagerDetails?.location?.coordinates[0]}
                  </p>
                </div>

                {/* Pincode */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Pincode
                  </label>
                  <p className="mt-1 text-gray-800 dark:text-gray-100 font-semibold">
                    {areaManagerDetails?.areaPincode}
                  </p>
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Status
                  </label>
                  <p className="mt-1 text-gray-800 dark:text-gray-100 font-semibold">
                    {areaManagerDetails?.status}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </Layout>
  );
};

export default AreaManagerAccount;