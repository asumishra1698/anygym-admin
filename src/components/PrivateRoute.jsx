import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");
  const userType = localStorage.getItem("userType");

  if (!token) {
    // Redirect to login if no token is found
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(userType)) {
    // Redirect to "Not Authorized" page if the user role is not allowed
    return <Navigate to="/not-authorized" />;
  }

  return children;
};

export default PrivateRoute;
