import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { forgotPasswordRequest } from "../../redux/actions/authActions";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { forgotPasswordMessage, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    dispatch(forgotPasswordRequest(email));
  };

  React.useEffect(() => {
    console.log("Forgot Password Message:", forgotPasswordMessage);
    if (forgotPasswordMessage) {
      setMessage(forgotPasswordMessage);
      setLoading(false);
      navigate("/verify-otp", { state: { email } });
    }

    if (error) {
      setMessage(error);
      setLoading(false);
    }
  }, [forgotPasswordMessage, error, navigate, email]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-green-800 text-center mb-6">
          Forgot Password
        </h2>
        {message && (
          <p
            className={`text-sm mb-4 text-center ${
              message.includes("successfully")
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
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
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your registered email"
              required
              className="mt-1 block w-full px-4 py-2 border border-green-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send OTP"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-green-600">
          <Link
            to="/login"
            className="text-green-600 hover:underline hover:text-green-700"
          >
            Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
