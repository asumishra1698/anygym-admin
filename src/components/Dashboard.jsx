import React, { useState } from "react";
import Layout from "../reuseable/Layout";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  // Data for Admin Metrics Chart
  const adminData = {
    yearly: [500, 300, 400, 1000, 700, 600],
    monthly: [50, 30, 40, 100, 70, 60],
    weekly: [10, 5, 8, 20, 15, 12],
    daily: [2, 1, 3, 5, 4, 2],
  };

  // Data for Booking Reports Chart
  const bookingData = {
    yearly: [120000, 150000, 180000, 200000, 170000],
    monthly: [12000, 15000, 18000, 20000, 17000, 22000],
    weekly: [3000, 4000, 5000, 6000],
    daily: [500, 700, 800, 600, 900, 1000, 1200],
  };

  // Labels for Admin Metrics and Booking Reports
  const adminLabels = [
    "Total Gym",
    "Area Managers",
    "Gym Owners",
    "Customers",
    "Subscriptions",
    "Trainers",
  ];
  const bookingLabels = {
    yearly: ["2020", "2021", "2022", "2023", "2024"],
    monthly: ["January", "February", "March", "April", "May", "June"],
    weekly: ["Week 1", "Week 2", "Week 3", "Week 4"],
    daily: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
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
    scales: {
      x: {
        ticks: {
          font: {
            size: 10,
          },
        },
      },
      y: {
        ticks: {
          font: {
            size: 10,
          },
        },
      },
    },
  };

  // State to manage the selected time period
  const [selectedPeriod, setSelectedPeriod] = useState("yearly");

  // Get Admin Metrics Data for the selected period
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

  // Get Booking Reports Data for the selected period
  const getBookingData = () => ({
    labels: bookingLabels[selectedPeriod],
    datasets: [
      {
        label: `${
          selectedPeriod.charAt(0).toUpperCase() + selectedPeriod.slice(1)
        } Booking Reports`,
        data: bookingData[selectedPeriod],
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  });

  // Get Total Counts for Cards
  const getTotalCounts = () => adminData[selectedPeriod];

  return (
    <Layout>
      {/* Time Period Selector */}
      <div className="flex flex-wrap justify-center gap-1 mb-6">
        {["yearly", "monthly", "weekly", "daily"].map((period) => (
          <button
            key={period}
            onClick={() => setSelectedPeriod(period)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              selectedPeriod === period
                ? "bg-[#333333] text-white shadow-md"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {period.charAt(0).toUpperCase() + period.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Admin Metrics Chart */}
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            Admin Metrics
          </h2>
          <div className="h-64 md:h-80">
            <Bar data={getAdminData()} options={options} />
          </div>
        </div>

        {/* Booking Reports Chart */}
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            Booking Reports
          </h2>
          <div className="h-64 md:h-80">
            <Bar data={getBookingData()} options={options} />
          </div>
        </div>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {adminLabels.map((label, index) => (
          <div
            key={label}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
          >
            <h2 className="text-lg font-bold text-[#333333]">{label}</h2>
            <p className="text-3xl font-bold text-blue-600 mt-4">
              {getTotalCounts()[index]}
            </p>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Dashboard;
