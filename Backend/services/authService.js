import argon2 from "argon2";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { sendOtpEmail } from "../utils/emailService.js";

  // Function to generate access & refresh tokens
export const generateTokens = (userId, email) => {
  const accessToken = jwt.sign({ userId, email }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  const refreshToken = jwt.sign({ userId, email }, process.env.REFRESH_SECRET, {
    expiresIn: "7d",
  });

  return { accessToken, refreshToken };
};

// Create user
export const createUser = async ({ name, email, password, role = "user" }) => {
  if (await User.findOne({ email })) throw new Error("User already exists");

  const hashedPassword = await argon2.hash(password);
  const newUser = new User({ name, email, password: hashedPassword, role });
  await newUser.save();

  return newUser;
};

// Login user function (ensures refresh token changes)
export const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");

  const isPasswordValid = await argon2.verify(user.password, password);
  if (!isPasswordValid) throw new Error("Invalid password");

  // Generate new access & refresh tokens
  const { accessToken, refreshToken } = generateTokens(user._id, user.email);

  // ✅ Replace old refresh token with new one in database
  user.refreshToken = refreshToken;
  await user.save();

  return { user, accessToken, refreshToken };
};

// Forgot password
export const forgotPassword = async (email) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");

  const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
  user.resetPasswordOtp = otp;
  user.resetPasswordOtpExpires = Date.now() + 3600000;
  await user.save();

  await sendOtpEmail(email, otp);
  return { message: "OTP sent to your email" };
};

// Reset password
export const resetPassword = async (email, otp, newPassword) => {
  const user = await User.findOne({
    email,
    resetPasswordOtp: otp,
    resetPasswordOtpExpires: { $gt: Date.now() },
  });
  if (!user) throw new Error("Invalid or expired OTP");

  user.password = await argon2.hash(newPassword);
  user.resetPasswordOtp = null;
  user.resetPasswordOtpExpires = null;
  await user.save();

  return { message: "Password reset successfully" };
};
