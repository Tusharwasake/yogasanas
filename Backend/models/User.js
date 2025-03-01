import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["user", "group-admin", "moderator", "super-admin"],
    default: "user",
  },
  resetPasswordOtp: { type: String },
  resetPasswordOtpExpires: { type: Date },
  refreshToken: { type: String }, // Store refresh token
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);
export default User;
