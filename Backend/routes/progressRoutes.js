import express from "express";
import { authenticate } from "../middlewares/authMiddleware.js";
import {
  logAsana,
  getUserProgress,
  getLeaderboard,
} from "../controllers/progressController.js";

const router = express.Router();

// ✅ Log Completed Asanas
router.post("/log", authenticate, logAsana);

// ✅ Get User's Progress
router.get("/", authenticate, getUserProgress);

// ✅ Get Leaderboard
router.get("/leaderboard", authenticate, getLeaderboard);

export default router;
