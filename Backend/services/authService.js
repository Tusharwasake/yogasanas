import argon2 from "argon2";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { sendOtpEmail } from "../utils/emailService.js";

if (!process.env.JWT_SECRET || !process.env.REFRESH_SECRET) {
  throw new Error("JWT_SECRET or REFRESH_SECRET is missing in .env file");
}

export const generateTokens = (userId, email) => {
  if (!process.env.JWT_SECRET || !process.env.REFRESH_SECRET) {
    throw new Error("JWT_SECRET or REFRESH_SECRET is not defined in .env file");
  }

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
  console.log("Checking email:", email);
  const user = await User.findOne({ email });

  if (!user) {
    console.log("User not found in DB!");
    throw new Error("User not found");
  }

  console.log("User found:", user);

  const isPasswordValid = await argon2.verify(user.password, password);
  if (!isPasswordValid) {
    console.log("Invalid password entered");
    throw new Error("Invalid password");
  }

  const { accessToken, refreshToken } = generateTokens(user._id, user.email);
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
