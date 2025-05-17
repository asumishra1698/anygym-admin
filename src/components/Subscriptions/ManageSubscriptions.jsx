import Layout from "../../reuseable/Layout";
import { useNavigate } from "react-router-dom";
import { SearchIcon } from "@heroicons/react/solid";

const ManageSubscriptions = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <main className="flex-1 bg-gray-100 dark:bg-gray-900 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-100">
            All Subscriptions
          </h2>
          <div className="flex space-x-4">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-2.5 w-5 h-5 text-gray-500 dark:text-gray-300" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 dark:bg-gray-800 dark:text-gray-100"
              />
            </div>

            <button
              onClick={() => navigate("/manage-subscriptions")}
              className="px-4 py-2 bg-black dark:bg-gray-800 text-white text-sm font-medium rounded-lg shadow hover:bg-gray-800 dark:hover:bg-gray-700"
            >
              + Add Subscriptions
            </button>
          </div>
        </div>
        <p className="text-gray-600 dark:text-gray-300 text-center">
          Coming Soon
        </p>
      </main>
    </Layout>
  );
};

export default ManageSubscriptions;
