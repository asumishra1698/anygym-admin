import React from "react";
import Layout from "../reuseable/Layout";

const Dashboard = () => {
  return (
    <Layout>
      {/* <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
      </div> */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-4">
        {/* Card 1 */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-bold text-green-800">Total Gym</h2>
          <p className="text-3xl font-bold text-green-600 mt-4">2256</p>
        </div>
        {/* Card 2 */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-bold text-green-800">
            Total Area Manager
          </h2>
          <p className="text-3xl font-bold text-green-600 mt-4">1285</p>
        </div>
        {/* Card 3 */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-bold text-green-800">Total Gym Owner</h2>
          <p className="text-3xl font-bold text-green-600 mt-4">1987</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-bold text-green-800">Total Members</h2>
          <p className="text-3xl font-bold text-green-600 mt-4">1201</p>
        </div>
        {/* Card 2 */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-bold text-green-800">
            Active Subscriptions
          </h2>
          <p className="text-3xl font-bold text-green-600 mt-4">854</p>
        </div>
        {/* Card 3 */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-bold text-green-800">Trainers</h2>
          <p className="text-3xl font-bold text-green-600 mt-4">1067</p>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
