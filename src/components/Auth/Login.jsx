import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SEO from "../../reuseable/SEO";
import { toast } from "react-toastify";
import { loginRequest } from "../../redux/actions/authActions";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    user_type: "ADMIN",
    login_type: "with_password",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, token, _id, user, message } = useSelector(
    (state) => state.auth
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    dispatch(loginRequest(formData));
  };

  React.useEffect(() => {
    if (isSubmitted && token) {
      localStorage.setItem("user", user);
      localStorage.setItem("_id", _id);
      localStorage.setItem("token", token);
      localStorage.setItem("userType", formData.user_type);
      localStorage.setItem("email", formData.email);
      setIsSubmitted(false);
      navigate("/dashboard");
    }

    if (isSubmitted && error) {
      toast.error(error);
      setIsSubmitted(false);
    }
  }, [isSubmitted, token, error, message, user, formData, _id, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100">
      <SEO
        title="Login Page | AnyGym"
        description="Login to access your AnyGym account."
      />
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        {/* Logo Section */}
        <div className="flex justify-center mb-6">
          <img
            src="https://anygym.in/wp-content/uploads/2025/02/ANYGYM-LOGO-FILE-color-code-29A744-1.png"
            alt="AnyGym Logo"
            className="w-64 h-auto"
          />
        </div>
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

          <div className="mb-4">
            <label
              htmlFor="user_type"
              className="block text-sm font-medium text-green-700"
            >
              User Type
            </label>
            <select
              name="user_type"
              id="user_type"
              value={formData.user_type}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-green-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
            >
              <option value="ADMIN">Admin</option>
              <option value="AREA_MANAGER">Area Manager</option>
              <option value="SUB_ADMIN">Sub Admin</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          <div className="mt-4 text-center">
            <a
              href="/forgot-password"
              className="text-green-600 hover:text-green-800 text-sm font-medium"
            >
              Forgot Password?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;
