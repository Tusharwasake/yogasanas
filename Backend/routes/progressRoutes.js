import express from "express";
import { authenticate } from "../middlewares/authMiddleware.js";
import {
  logAsana,
  getUserProgress,
  getWeeklyProgress,
  getLeaderboard,
  getWeeklyLeaderboard,
  updateGoal,
} from "../controllers/progressController.js";

const router = express.Router();

// ✅ Log Completed Asanas
router.post("/log", authenticate, logAsana);

// ✅ Get User's Progress
router.get("/", authenticate, getUserProgress);

// ✅ Get Leaderboard
router.get("/leaderboard", authenticate, getLeaderboard);

// ✅ Get Weekly Progress
router.get("/weekly", authenticate, getWeeklyProgress);

// ✅ Get Weekly Leaderboard
router.get("/leaderboard/weekly", authenticate, getWeeklyLeaderboard);

// Update fitness goal
router.patch("/goal", authenticate, updateGoal);

export default router;
