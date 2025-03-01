import express from "express";
import {
  signup,
  login,
  forgotPassword,
  resetPassword,
  refreshToken,
} from "../controllers/authController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { generateTokens } from "../services/authService.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

router.post("/refresh-token", refreshToken);

export default router;
