import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await axios.post("https://yogasanas.onrender.com/api/auth/forgot-password", { email });

      setSuccess(`Reset link sent to ${email}`);
      localStorage.setItem("resetEmail", email);
      setTimeout(() => navigate("/reset-password"), 2000);
    } catch (error) {
      console.error(error);
      setError("Failed to send reset link, please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-gray-200">
      <div className="w-full max-w-md bg-gray-800 shadow-lg rounded-lg p-8 border border-gray-700">
        <h2 className="text-2xl font-bold text-center text-white mb-6">Forgot Password</h2>

        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
        {success && <p className="text-green-500 text-sm text-center mb-4">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 bg-gray-700 border border-gray-600 rounded focus:ring-2 focus:ring-purple-500 focus:outline-none text-gray-200 placeholder-gray-400"
          />

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
