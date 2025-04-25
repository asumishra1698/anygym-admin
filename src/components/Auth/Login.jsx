import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import SEO from "../../reuseable/SEO";
import { toast } from "react-toastify";
import { loginRequest } from "../../redux/actions/authActions";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    login_type: "with_password",
    user_type: "ADMIN",
  });
  const [isSubmitted, setIsSubmitted] = useState(false); 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, token, message } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true); 
    dispatch(loginRequest(formData));
  };

  if (token) {
    toast.success(message || "Login successful!"); 
    navigate("/dashboard");
  }

  if (isSubmitted && error) {
    toast.error(error); 
    setIsSubmitted(false); 
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100">
      <SEO
        title="Login Page | AnyGym"
        description="Login to access your AnyGym account."
      />
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-green-800 text-center mb-6">
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-green-700"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-green-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-green-700"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-green-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-green-600 hover:underline hover:text-green-700"
              >
                Register
              </Link>
            </p>
            <p className="text-sm text-gray-600 mt-2">
              <Link
                to="/forgot-password"
                className="text-green-600 hover:underline hover:text-green-700"
              >
                Forgot Password?
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
