import express from "express";
import { authenticate } from "../middlewares/authMiddleware.js";
import {
  getUserProfile,
  updateUserProfile,
  getUserById,
  updatePrivacySettings,
} from "../controllers/UserController.js";

const router = express.Router();

// ✅ Get Logged-in User Profile (Protected)
router.get("/profile", authenticate, getUserProfile);

// ✅ Update User Profile (Protected)
router.patch("/profile", authenticate, updateUserProfile);

// ✅ Get Another User's Profile
router.get("/:userId", authenticate, getUserById);

// ✅ Update Privacy Settings (Protected)
router.patch("/privacy", authenticate, updatePrivacySettings);

export default router;
