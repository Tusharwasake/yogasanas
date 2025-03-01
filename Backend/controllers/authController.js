// controllers/authController.js
import {
  loginUser,
  forgotPassword as forgotPasswordService,
  resetPassword as resetPasswordService,
} from "../services/authService.js";

// Login controller
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { user, token } = await loginUser(email, password);

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(400).json({ message: error.message });
  }
};

// Forgot password controller
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const result = await forgotPasswordService(email);

    res.status(200).json(result);
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(400).json({ message: error.message });
  }
};

// Reset password controller
export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    const result = await resetPasswordService(email, otp, newPassword);

    res.status(200).json(result);
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(400).json({ message: error.message });
  }
};
