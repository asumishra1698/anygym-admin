import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Dashboard from "./components/Dashboard";
import Login from "./components/Auth/Login";
import Amenities from "./components/Settings/Amenities/ManageAmenities";
import AreaManager from "./components/AreaManager/ManageAreaManager";
import EditAreaManager from "./components/AreaManager/EditAreaManager";
import AddAreaManager from "./components/AreaManager/AddAreaManager";
import ManageGymOwner from "./components/GymOwner/ManageGymOwner";
import AddGymOwner from "./components/GymOwner/AddGymOwner";
import EditGymOwner from "./components/GymOwner/EditGymOwner";
import ManagePendingGym from "./components/Gym/ManagePendingGym";
import ManageApprovedGym from "./components/Gym/ManageApprovedGym";
import ManageRejectedGym from "./components/Gym/ManageRejectedGym";
import ManageCustomers from "./components/Customers/ManageCustomers";
import ManageSubscriptions from "./components/Subscriptions/ManageSubscriptions";
import PrivateRoute from "./components/PrivateRoute";
import ManageBooking from "./components/BookingManagement/ManageBooking";
import ManageProducts from "./components/Products/ManageProducts";
import MangePaymentWallet from "./components/PaymentWallet/MangePaymentWallet";
import ManageProductsCategory from "./components/ProductsCategory/ManageProductsCategory";
import ManageReports from "./components/ReportsAnalytics/ManageReports";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <PrivateRoute allowedRoles={["ADMIN", "AREA_MANAGER", "SUB_ADMIN"]}>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute allowedRoles={["ADMIN", "AREA_MANAGER", "SUB_ADMIN"]}>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/amenities"
          element={
            <PrivateRoute allowedRoles={["ADMIN"]}>
              <Amenities />
            </PrivateRoute>
          }
        />
        <Route
          path="/manage-area-manager"
          element={
            <PrivateRoute allowedRoles={["ADMIN"]}>
              <AreaManager />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit-area-manager/:id"
          element={
            <PrivateRoute allowedRoles={["ADMIN"]}>
              <EditAreaManager />
            </PrivateRoute>
          }
        />
        <Route
          path="/add-manager"
          element={
            <PrivateRoute allowedRoles={["ADMIN"]}>
              <AddAreaManager />
            </PrivateRoute>
          }
        />
        <Route
          path="/manage-gym-owner"
          element={
            <PrivateRoute allowedRoles={["ADMIN", "AREA_MANAGER"]}>
              <ManageGymOwner />
            </PrivateRoute>
          }
        />
        <Route
          path="/add-gym-owner"
          element={
            <PrivateRoute allowedRoles={["ADMIN", "AREA_MANAGER"]}>
              <AddGymOwner />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit-gym-owner/:id"
          element={
            <PrivateRoute allowedRoles={["ADMIN", "AREA_MANAGER"]}>
              <EditGymOwner />
            </PrivateRoute>
          }
        />
        <Route
          path="/manage-pending-gym"
          element={
            <PrivateRoute allowedRoles={["ADMIN", "AREA_MANAGER"]}>
              <ManagePendingGym />
            </PrivateRoute>
          }
        />
        <Route
          path="/manage-approved-gym"
          element={
            <PrivateRoute allowedRoles={["ADMIN", "AREA_MANAGER"]}>
              <ManageApprovedGym />
            </PrivateRoute>
          }
        />
        <Route
          path="/manage-rejected-gym"
          element={
            <PrivateRoute allowedRoles={["ADMIN", "AREA_MANAGER"]}>
              <ManageRejectedGym />
            </PrivateRoute>
          }
        />
        <Route
          path="/manage-customers"
          element={
            <PrivateRoute allowedRoles={["ADMIN", "AREA_MANAGER"]}>
              <ManageCustomers />
            </PrivateRoute>
          }
        />
        <Route
          path="/manage-products"
          element={
            <PrivateRoute allowedRoles={["ADMIN"]}>
              <ManageProducts />
            </PrivateRoute>
          }
        />
        <Route
          path="/manage-booking"
          element={
            <PrivateRoute allowedRoles={["ADMIN", "AREA_MANAGER"]}>
              <ManageBooking />
            </PrivateRoute>
          }
        />
        <Route
          path="/manage-paymentwallet"
          element={
            <PrivateRoute allowedRoles={["ADMIN"]}>
              <MangePaymentWallet />
            </PrivateRoute>
          }
        />
        <Route
          path="/manage-products-category"
          element={
            <PrivateRoute allowedRoles={["ADMIN"]}>
              <ManageProductsCategory />
            </PrivateRoute>
          }
        />
        <Route
          path="/manage-subscriptions"
          element={
            <PrivateRoute allowedRoles={["ADMIN", "AREA_MANAGER"]}>
              <ManageSubscriptions />
            </PrivateRoute>
          }
        />
        <Route
          path="/manage-reports"
          element={
            <PrivateRoute allowedRoles={["ADMIN"]}>
              <ManageReports />
            </PrivateRoute>
          }
        />
      </Routes>
      <ToastContainer />
    </Router>
  );
};

export default App;
