import React, { useState } from "react";
import Layout from "../reuseable/Layout";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard = () => {
  const adminData = {
    yearly: [500, 300, 400, 1000, 700, 600],
    monthly: [50, 30, 40, 100, 70, 60],
    weekly: [10, 5, 8, 20, 15, 12],
    daily: [2, 1, 3, 5, 4, 2],
  };

  const adminLabels = [
    "Total Gym",
    "Area Managers",
    "Gym Owners",
    "Customers",
    "Subscriptions",
    "Trainers",
  ];

  const areaManagerData = {
    labels: ["Active Area Managers", "Inactive Area Managers"],
    datasets: [
      {
        label: "Area Managers",
        data: [120, 30], // Example data
        backgroundColor: ["rgba(75, 192, 192, 0.6)", "rgba(255, 99, 132, 0.6)"],
        borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const gymData = {
    labels: ["Active Gyms", "Inactive Gyms"],
    datasets: [
      {
        label: "Gyms",
        data: [200, 50], // Example data
        backgroundColor: ["rgba(54, 162, 235, 0.6)", "rgba(255, 206, 86, 0.6)"],
        borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const gymOwnerData = {
    labels: ["Active Gym Owners", "Inactive Gym Owners"],
    datasets: [
      {
        label: "Gym Owners",
        data: [80, 20], // Example data
        backgroundColor: [
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
        ],
        borderColor: ["rgba(153, 102, 255, 1)", "rgba(255, 159, 64, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Dashboard Overview",
      },
    },
  };

  const [selectedPeriod, setSelectedPeriod] = useState("yearly");

  const getAdminData = () => ({
    labels: adminLabels,
    datasets: [
      {
        label: `${
          selectedPeriod.charAt(0).toUpperCase() + selectedPeriod.slice(1)
        } Admin Metrics`,
        data: adminData[selectedPeriod],
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 99, 132, 0.6)",
          "rgba(255, 159, 64, 0.6)",
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  });

  const getTotalCounts = () => adminData[selectedPeriod];

  return (
    <Layout>
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {["yearly", "monthly", "weekly", "daily"].map((period) => (
          <button
            key={period}
            onClick={() => setSelectedPeriod(period)}
            className={`px-5 py-2 rounded-lg font-semibold transition-all ${
              selectedPeriod === period
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {period.charAt(0).toUpperCase() + period.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
          <h2 className="text-xl font-bold text-gray-800 mb-6">
            Admin Metrics
          </h2>
          <div className="h-64 md:h-80">
            <Bar data={getAdminData()} options={options} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
          <h2 className="text-xl font-bold text-gray-800 mb-6">
            Active vs Inactive Area Managers
          </h2>
          <div className="h-64 md:h-80">
            <Pie data={areaManagerData} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
          <h2 className="text-xl font-bold text-gray-800 mb-6">
            Active vs Inactive Gyms
          </h2>
          <div className="h-64 md:h-80">
            <Pie data={gymData} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
          <h2 className="text-xl font-bold text-gray-800 mb-6">
            Active vs Inactive Gym Owners
          </h2>
          <div className="h-64 md:h-80">
            <Pie data={gymOwnerData} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {adminLabels.map((label, index) => (
          <div
            key={label}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
          >
            <h2 className="text-lg font-semibold text-gray-700">{label}</h2>
            <p className="text-4xl font-bold text-blue-600 mt-4">
              {getTotalCounts()[index]}
            </p>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Dashboard;
