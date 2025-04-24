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
// import AddGym from "./components/Gym/AddGym";
// import EditGym from "./components/Gym/EditGym";

import ManageMembers from "./components/Members/ManageMembers";
// import AddMember from "./components/Members/AddMember";
// import EditMember from "./components/Members/EditMember";

import ManageSubscriptions from "./components/Subscriptions/ManageSubscriptions";
// import AddSubscription from "./components/Subscriptions/AddSubscription";
// import EditSubscription from "./components/Subscriptions/EditSubscription";


import ManageTrainers from "./components/Trainers/ManageTrainers";
// import AddTrainer from "./components/Trainers/AddTrainer";
// import EditTrainer from "./components/Trainers/EditTrainer";


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
        {/* <Route path="/add-gym" element={<AddGym />} />
        <Route path="/edit-gym/:id" element={<EditGym />} /> */}

        <Route path="/manage-members" element={<ManageMembers />} />
        {/* <Route path="/add-member" element={<AddMember />} />
        <Route path="/edit-member/:id" element={<EditMember />} /> */}

        <Route path="/manage-subscriptions" element={<ManageSubscriptions />} />
        {/* <Route path="/add-subscription" element={<AddSubscription />} />
        <Route path="/edit-subscription/:id" element={<EditSubscription />} /> */}

        <Route path="/manage-trainers" element={<ManageTrainers />} />
        {/* <Route path="/add-trainer" element={<AddTrainer />} />
        <Route path="/edit-trainer/:id" element={<EditTrainer />} /> */}


      </Routes>
      <ToastContainer />
    </Router>
  );
};

export default App;
