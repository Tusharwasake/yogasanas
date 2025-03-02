import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  profilePicture: {
    type: String,
    default: "https://default-avatar.com/user.png",
  },

  bio: { type: String, default: "" }, // 🔹 New - User Bio
  fitnessGoals: { type: String, default: "" }, // 🔹 New - User's personal goals

  role: {
    type: String,
    enum: ["user", "group-admin", "moderator", "super-admin"],
    default: "user",
  },

  isActive: { type: Boolean, default: true },
  lastLogin: { type: Date },

  privacySettings: {
    showStats: { type: Boolean, default: true }, // 🔹 New - Controls visibility of stats
  },

  resetPasswordOtp: { type: String },
  resetPasswordOtpExpires: { type: Date },
  refreshToken: { type: String }, // Store latest refresh token

  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);
export default User;
