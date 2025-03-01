import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../Styles/ResetPassword.css'

const ResetPassword = () => {
  const navigate = useNavigate();

  // Retrieve email from localStorage
  const [email, setEmail] = useState("");

  useEffect(() => {
    const storedEmail = localStorage.getItem("resetEmail");
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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
      localStorage.removeItem("resetEmail"); // Clear stored email
      setTimeout(() => navigate("/login"), 2000); // Redirect to login
    } catch (err) {
      setError(err.response?.data?.message || "Failed to reset password.");
    }
  };

  return (
    <div className="reset-password-container">
    <form onSubmit={handleSubmit}>
      <h2>Reset Password</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      <input
        type="email"
        value={email}
        readOnly // Prevent user from editing email
      />

      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        required
      />

      <button type="submit">Reset Password</button>
    </form>
    </div>
  );
};

export default ResetPassword;