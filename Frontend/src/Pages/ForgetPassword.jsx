import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Styles/ForgetPassword.css"; // Import CSS

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
            localStorage.setItem("resetEmail", email); // Store email in localStorage
            setTimeout(() => navigate("/reset-password"), 2000); // Redirect to Reset Password
        } catch (error) {
            console.error(error);
            setError("Failed to send reset link, please try again.");
        }
    };

    return (
        <div className="forget-password-container">
            <form onSubmit={handleSubmit} className="forget-password-form">
                <h2>Forgot Password</h2>
                {error && <p style={{ color: "red" }}>{error}</p>}
                {success && <p style={{ color: "green" }}>{success}</p>}

                <input
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default ForgetPassword;
