// controllers/authController.js

import {
  createUser,
  loginUser,
  forgotPassword as forgotPasswordService,
  resetPassword as resetPasswordService,
  generateTokens,
} from "../services/authService.js";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Signup controller
export const signup = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    // Validate input
    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // Create user
    const newUser = await createUser({ name, email, password });

    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email },
      process.env.JWT_SECRET, // Ensure this is correct
      { expiresIn: "1h" }
    );

    // Send response
    res.status(201).json({
      message: "User created successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
      token,
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(400).json({ message: error.message });
  }
};

// Login controller (FIXED)
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Call loginUser function to authenticate the user
    const { user, accessToken, refreshToken } = await loginUser(
      email,
      password
    );
    console.log(user, accessToken, refreshToken);
    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      accessToken,
      refreshToken, // Now returning both tokens
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

export const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({ message: "No token provided" });
    }

    // Verify the refresh token
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
    console.log("Decoded Refresh Token:", decoded);

    // Find the user in the database
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the refresh token matches the one in the database
    if (user.refreshToken !== refreshToken) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    // Generate new access & refresh tokens
    const { accessToken, refreshToken: newRefreshToken } = generateTokens(
      user._id,
      user.email
    );

    // ✅ Store new refresh token in the database
    user.refreshToken = newRefreshToken;
    await user.save();

    res.status(200).json({ accessToken, refreshToken: newRefreshToken });
  } catch (error) {
    console.error("Refresh token error:", error);
    res.status(403).json({ message: "Invalid or expired refresh token" });
  }
};
