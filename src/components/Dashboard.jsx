import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { fetchDashboardMetricsRequest } from "../redux/actions/dashboardActions";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const adminLabels = [
  "Total Gym",
  "Area Managers",
  "Gym Owners",
  "Customers",
  "Total Booking",
  "Total Revenue",
];

const Dashboard = () => {
  const dispatch = useDispatch();
  const { loading, error, data } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchDashboardMetricsRequest());
  }, [dispatch]);

  // Fallbacks if data is not loaded yet
  const gyms = data?.gyms || {};
  const owners = data?.owners || {};
  const areaManagers = data?.area_managers || {};

  // Prepare data for charts
  const adminData = {
    yearly: [
      gyms.total || 0,
      areaManagers.total || 0,
      owners.total || 0,
      0, // Customers (not in API)
      0, // Total Booking (not in API)
      0, // Total Revenue (not in API)
    ],
  };

  const areaManagerData = {
    labels: ["Active Area Managers", "Inactive Area Managers"],
    datasets: [
      {
        label: "Area Managers",
        data: [areaManagers.active || 0, areaManagers.inactive || 0],
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
        data: [
          gyms.active || 0,
          gyms.inactive || 0, // Using rejected as "Inactive" if that's your logic
        ],
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
        data: [owners.active || 0, owners.inactive || 0],
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

  const getAdminData = () => ({
    labels: adminLabels,
    datasets: [
      {
        label: "Yearly Admin Metrics",
        data: adminData.yearly,
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

  const getTotalCounts = () => adminData.yearly;

  return (
    <Layout>
      {loading && <div className="text-center py-8">Loading...</div>}
      {error && <div className="text-center text-red-500 py-8">{error}</div>}
      {!loading && !error && (
        <>
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
        </>
      )}
    </Layout>
  );
};

export default Dashboard;
