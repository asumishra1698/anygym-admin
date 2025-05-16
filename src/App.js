import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Dashboard from "./components/Dashboard";
import Login from "./components/Auth/Login";
import AreaManagerAccount from "./components/AreaManager/AreaManagerAccount";
import Forgotpassword from "./components/Auth/ForgotPassword";
import ResetPassword from "./components/Auth/ResetPassword";
import OTPVerification from "./components/Auth/OTPVerification";
import Amenities from "./components/Settings/Amenities/ManageAmenities";
import AreaManager from "./components/AreaManager/ManageAreaManager";
import EditAreaManager from "./components/AreaManager/EditAreaManager";
import AddAreaManager from "./components/AreaManager/AddAreaManager";
import ManageGymOwner from "./components/GymOwner/ManageGymOwner";
import AddGymByAreaManager from "./components/Gym/AddGymByAreaManager";
import AddGymOwner from "./components/GymOwner/AddGymOwner";
import EditGymOwner from "./components/GymOwner/EditGymOwner";
import ManagePendingGym from "./components/Gym/ManagePendingGym";
import ManageApprovedGym from "./components/Gym/ManageApprovedGym";
import ManageRejectedGym from "./components/Gym/ManageRejectedGym";
import ManageAllGym from "./components/Gym/ManageAllGym";
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
        <Route path="/forgot-password" element={<Forgotpassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/otp-verification" element={<OTPVerification />} />

        {/* Protected Routes */}
        <Route
          path="/area-manager-account"
          element={
            <PrivateRoute allowedRoles={["AREA_MANAGER"]}>
              <AreaManagerAccount />
            </PrivateRoute>
          }
        />
        <Route
          path="/manage-area-manager"
          element={
            <PrivateRoute allowedRoles={["ADMIN", "SUB_ADMIN"]}>
              <AreaManager />
            </PrivateRoute>
          }
        />
        <Route
          path="/amenities"
          element={
            <PrivateRoute allowedRoles={["ADMIN", "SUB_ADMIN"]}>
              <Amenities />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit-area-manager/:id"
          element={
            <PrivateRoute allowedRoles={["ADMIN", "SUB_ADMIN"]}>
              <EditAreaManager />
            </PrivateRoute>
          }
        />
        <Route
          path="/add-manager"
          element={
            <PrivateRoute allowedRoles={["ADMIN", "SUB_ADMIN"]}>
              <AddAreaManager />
            </PrivateRoute>
          }
        />
        <Route
          path="/manage-products"
          element={
            <PrivateRoute allowedRoles={["ADMIN", "SUB_ADMIN"]}>
              <ManageProducts />
            </PrivateRoute>
          }
        />
        <Route
          path="/manage-products-category"
          element={
            <PrivateRoute allowedRoles={["ADMIN", "SUB_ADMIN"]}>
              <ManageProductsCategory />
            </PrivateRoute>
          }
        />
        <Route
          path="/manage-reports"
          element={
            <PrivateRoute allowedRoles={["ADMIN", "SUB_ADMIN"]}>
              <ManageReports />
            </PrivateRoute>
          }
        />

        <Route
          path="/manage-gym-owner"
          element={
            <PrivateRoute allowedRoles={["ADMIN", "AREA_MANAGER", "SUB_ADMIN"]}>
              <ManageGymOwner />
            </PrivateRoute>
          }
        />
        <Route
          path="/add-gym-by-area-manager"
          element={
            <PrivateRoute allowedRoles={["AREA_MANAGER", "SUB_ADMIN"]}>
              <AddGymByAreaManager />
            </PrivateRoute>
          }
        />
        <Route
          path="/add-gym-owner"
          element={
            <PrivateRoute allowedRoles={["ADMIN", "AREA_MANAGER", "SUB_ADMIN"]}>
              <AddGymOwner />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit-gym-owner/:id"
          element={
            <PrivateRoute allowedRoles={["ADMIN", "AREA_MANAGER", "SUB_ADMIN"]}>
              <EditGymOwner />
            </PrivateRoute>
          }
        />
        <Route
          path="/manage-pending-gym"
          element={
            <PrivateRoute allowedRoles={["ADMIN", "AREA_MANAGER", "SUB_ADMIN"]}>
              <ManagePendingGym />
            </PrivateRoute>
          }
        />
        <Route
          path="/manage-approved-gym"
          element={
            <PrivateRoute allowedRoles={["ADMIN", "AREA_MANAGER", "SUB_ADMIN"]}>
              <ManageApprovedGym />
            </PrivateRoute>
          }
        />
        <Route
          path="/manage-rejected-gym"
          element={
            <PrivateRoute allowedRoles={["ADMIN", "AREA_MANAGER", "SUB_ADMIN"]}>
              <ManageRejectedGym />
            </PrivateRoute>
          }
        />
        <Route
          path="/manage-all-gym"
          element={
            <PrivateRoute allowedRoles={["ADMIN", "SUB_ADMIN"]}>
              <ManageAllGym />
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
          path="/manage-bookings"
          element={
            <PrivateRoute allowedRoles={["ADMIN", "AREA_MANAGER"]}>
              <ManageBooking />
            </PrivateRoute>
          }
        />
        <Route
          path="/manage-paymentwallet"
          element={
            <PrivateRoute allowedRoles={["ADMIN", "AREA_MANAGER"]}>
              <MangePaymentWallet />
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
          path="/dashboard"
          element={
            <PrivateRoute allowedRoles={["ADMIN", "AREA_MANAGER", "SUB_ADMIN"]}>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/"
          element={
            <PrivateRoute allowedRoles={["ADMIN", "AREA_MANAGER", "SUB_ADMIN"]}>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
      <ToastContainer />
    </Router>
  );
};

export default App;
