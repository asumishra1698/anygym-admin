import React from "react";
import { ClipLoader } from "react-spinners";

const Loader = ({ loading, size = 50, color = "#000" }) => {
  if (!loading) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <ClipLoader size={size} color={color} loading={loading} />
    </div>
  );
};

export default Loader;
