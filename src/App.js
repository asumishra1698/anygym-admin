import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Dashboard from "./components/Dashboard";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import ForgotPassword from "./components/Auth/ForgotPassword";
import ResetPassword from "./components/Auth/ResetPassword";
import OTPVerification from "./components/Auth/OTPVerification";

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



const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify-otp" element={<OTPVerification />} />

        <Route path="/manage-area-manager" element={<AreaManager />} />
        <Route path="/edit-area-manager/:id" element={<EditAreaManager />} />
        <Route path="/add-manager" element={<AddAreaManager />} />

        <Route path="/manage-gym-owner" element={<ManageGymOwner />} />
        <Route path="/add-gym-owner" element={<AddGymOwner />} />
        <Route path="/edit-gym-owner/:id" element={<EditGymOwner />} />

        <Route path="/manage-gym" element={<ManageGym />} />

        <Route path="/manage-members" element={<ManageMembers />} />

        <Route path="/manage-subscriptions" element={<ManageSubscriptions />} />

        <Route path="/manage-trainers" element={<ManageTrainers />} />


      </Routes>
      <ToastContainer />
    </Router>
  );
};

export default App;
