import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const storedEmail = localStorage.getItem("resetEmail");
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(
        "https://yogasanas.onrender.com/api/auth/reset-password",
        { email, otp, newPassword },
        { headers: { "Content-Type": "application/json" } }
      );

      setSuccess(response.data.message || "Password reset successful!");
      localStorage.removeItem("resetEmail");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to reset password.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-gray-200">
      <div className="w-full max-w-md bg-gray-800 shadow-lg rounded-lg p-8 border border-gray-700">
        <h2 className="text-2xl font-bold text-center text-white mb-6">Reset Password</h2>

        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
        {success && <p className="text-green-500 text-sm text-center mb-4">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            readOnly
            className="w-full p-3 bg-gray-700 border border-purple-500 rounded opacity-80 cursor-not-allowed text-gray-300"
          />

          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            className="w-full p-3 bg-gray-700 border border-gray-600 rounded focus:ring-2 focus:ring-purple-500 focus:outline-none text-gray-200 placeholder-gray-400"
          />

          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="w-full p-3 bg-gray-700 border border-gray-600 rounded focus:ring-2 focus:ring-purple-500 focus:outline-none text-gray-200 placeholder-gray-400"
          />

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded transition"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;