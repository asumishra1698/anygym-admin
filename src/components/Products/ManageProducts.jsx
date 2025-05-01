import Layout from "../../reuseable/Layout";
import { useNavigate } from "react-router-dom";
import { SearchIcon } from "@heroicons/react/solid";

const ManageProducts = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="bg-gray-100">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-700 mb-4 md:mb-0">
            All Products
          </h2>
          <div className="flex items-center space-x-4 w-full md:w-auto">
            {/* Search Input */}
            <div className="relative w-full md:w-auto">
              <SearchIcon className="absolute left-3 top-2.5 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full md:w-auto pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
            </div>

            {/* Add Products Button */}
            <button
              onClick={() => navigate("/manage-subscriptions")}
              className="px-3 py-3 bg-black text-white text-sm font-medium rounded-lg shadow hover:bg-gray-800"
            >
              + Add Products
            </button>
          </div>
        </div>
        <p className="text-gray-600 text-center">Coming Soon</p>
      </div>
    </Layout>
  );
};

export default ManageProducts;