
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import '../Styles/Login.css'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
      
        if (!email || !password) {
          setError("Email and password are required.");
          setLoading(false);
          return;
        }
      
        try {
          const res = await axios.post(
            "https://yogasanas.onrender.com/api/auth/login",
            { email, password },
            { headers: { "Content-Type": "application/json" } }
          );
      
          console.log("Response:", res.data);
      
          localStorage.setItem("token", res.data.accessToken);
          localStorage.setItem("user", JSON.stringify(res.data.user));
      
          navigate("/home");
        } catch (err) {
          console.error("Error:", err.response?.data);
      
          setError(err.response?.data?.msg || "Login failed. Please check your credentials.");
        } finally {
          setLoading(false);
        }
      };
      

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Login</h2>
        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>



          <div>
            <Link to="/forgot-password" className="forgot-password-link">
              Forgot Password?
            </Link>
          </div>

        </form>

        <div className="redirect-container">
          <p>
            Don&apos;t have an account?{' '}
            <Link to="/register" className="signup-link">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;