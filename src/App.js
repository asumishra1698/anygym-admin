import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Dashboard from "./components/Dashboard";
// import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
// import ForgotPassword from "./components/Auth/ForgotPassword";
// import ResetPassword from "./components/Auth/ResetPassword";
// import OTPVerification from "./components/Auth/OTPVerification";

import AreaManager from "./components/AreaManager/ManageAreaManager";
import EditAreaManager from "./components/AreaManager/EditAreaManager";
import AddAreaManager from "./components/AreaManager/AddAreaManager";

import ManageGymOwner from "./components/GymOwner/ManageGymOwner";
import AddGymOwner from "./components/GymOwner/AddGymOwner";
import EditGymOwner from "./components/GymOwner/EditGymOwner";

import ManageGym from "./components/Gym/ManageGym";

import ManageMembers from "./components/Members/ManageMembers";

import ManageSubscriptions from "./components/Subscriptions/ManageSubscriptions";

import ManageTrainers from "./components/Trainers/ManageTrainers";

import PrivateRoute from "./components/PrivateRoute"; 

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        {/* <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify-otp" element={<OTPVerification />} /> */}

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/manage-area-manager"
          element={
            <PrivateRoute>
              <AreaManager />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit-area-manager/:id"
          element={
            <PrivateRoute>
              <EditAreaManager />
            </PrivateRoute>
          }
        />
        <Route
          path="/add-manager"
          element={
            <PrivateRoute>
              <AddAreaManager />
            </PrivateRoute>
          }
        />
        <Route
          path="/manage-gym-owner"
          element={
            <PrivateRoute>
              <ManageGymOwner />
            </PrivateRoute>
          }
        />
        <Route
          path="/add-gym-owner"
          element={
            <PrivateRoute>
              <AddGymOwner />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit-gym-owner/:id"
          element={
            <PrivateRoute>
              <EditGymOwner />
            </PrivateRoute>
          }
        />
        <Route
          path="/manage-gym"
          element={
            <PrivateRoute>
              <ManageGym />
            </PrivateRoute>
          }
        />
        <Route
          path="/manage-members"
          element={
            <PrivateRoute>
              <ManageMembers />
            </PrivateRoute>
          }
        />
        <Route
          path="/manage-subscriptions"
          element={
            <PrivateRoute>
              <ManageSubscriptions />
            </PrivateRoute>
          }
        />
        <Route
          path="/manage-trainers"
          element={
            <PrivateRoute>
              <ManageTrainers />
            </PrivateRoute>
          }
        />
      </Routes>
      <ToastContainer />
    </Router>
  );
};

export default App;