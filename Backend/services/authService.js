// services/authService.js
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { sendOtpEmail } from "../utils/emailService.js";
import crypto from "crypto";

// Hash password
export const hashPassword = async (password) => {
  return await argon2.hash(password);
};

// Compare passwords
export const comparePassword = async (hashedPassword, candidatePassword) => {
  return await argon2.verify(hashedPassword, candidatePassword);
};

// Generate JWT token
export const generateToken = (userId, email) => {
  return jwt.sign({ userId, email }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

// Login user
export const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }

  const isPasswordValid = await comparePassword(user.password, password);
  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }

  const token = generateToken(user._id, user.email);
  return { user, token };
};

// Forgot password service
export const forgotPassword = async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }

  // Generate a 6-digit OTP
  const otp = crypto.randomBytes(3).toString("hex"); // 6-character OTP
  user.resetPasswordOtp = otp;
  user.resetPasswordOtpExpires = Date.now() + 3600000; // OTP expires in 1 hour
  await user.save();

  // Send OTP via email
  await sendOtpEmail(email, otp);

  return { message: "OTP sent to your email" };
};

// Reset password service
export const resetPassword = async (email, otp, newPassword) => {
  const user = await User.findOne({
    email,
    resetPasswordOtp: otp,
    resetPasswordOtpExpires: { $gt: Date.now() }, // Check if OTP is still valid
  });

  if (!user) {
    throw new Error("Invalid or expired OTP");
  }

  // Update password and clear OTP fields
  user.password = await hashPassword(newPassword);
  user.resetPasswordOtp = null;
  user.resetPasswordOtpExpires = null;
  await user.save();

  return { message: "Password reset successfully" };
};
