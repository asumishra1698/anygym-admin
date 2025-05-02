import React from "react";
import { CircleLoader} from "react-spinners";

const Loader = ({ loading, size = 45, color = "#fff" }) => {
  if (!loading) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <CircleLoader size={size} color={color} loading={loading} />
    </div>
  );
};

export default Loader;
