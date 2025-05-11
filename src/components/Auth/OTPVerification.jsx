import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { verifyOtpRequest } from "../../redux/actions/authActions";

const VerifyOTP = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";

  const [otp, setOtp] = useState(["", "", "", ""]); 
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const { verifyOtpMessage, error: reduxError } = useSelector(
    (state) => state.auth
  );

  // Handle OTP input
  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1); // Keep last digit
    setOtp(newOtp);

    if (value && index < 3) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const otpValue = Number(otp.join(""));

    if (otpValue.toString().length !== 4) {
      setError("Please enter a valid 4-digit OTP");
      return;
    }

    setLoading(true);
    setError("");

    console.log("Payload sent to verify OTP:", { email, otp: otpValue });
    dispatch(verifyOtpRequest({ email, otp: otpValue }));
  };

  React.useEffect(() => {
    if (verifyOtpMessage) {
      alert("OTP Verified Successfully!");
      navigate("/reset-password", { state: { email } });
    }

    if (reduxError) {
      setError(reduxError);
      setLoading(false);
    }
  }, [verifyOtpMessage, reduxError, navigate, email]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-green-800 text-center mb-4">
          OTP Verification
        </h2>
        <p className="text-sm text-green-600 text-center mb-6">
          Enter the OTP sent to <strong>{email}</strong>
        </p>

        {error && (
          <p className="text-sm text-red-600 text-center mb-4">{error}</p>
        )}

        <form onSubmit={handleSubmit}>
          <div className="flex justify-center gap-2 mb-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="number"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 text-center text-lg border border-green-300 rounded-lg focus:ring-green-500 focus:border-green-500"
              />
            ))}
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300"
            disabled={loading || otp.join("").length !== 4}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-green-600">
          <Link
            to="/forgot-password"
            className="text-green-600 hover:underline hover:text-green-700"
          >
            Resend OTP
          </Link>
        </p>
      </div>
    </div>
  );
};

export default VerifyOTP;
