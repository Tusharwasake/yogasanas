import express from "express";
import {
  getAllAsanas,
  getAsanaById,
  addAsana,
  updateAsana,
  deleteAsana,
} from "../controllers/asanaController.js";
import { authenticate, authorizeRole } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Public Routes (No Auth Required)
router.get("/", getAllAsanas);
router.get("/:asanaId", getAsanaById);

// Protected Routes (Restricted to Higher Roles)
router.post(
  "/",
  authenticate,
  authorizeRole(["super-admin", "moderator"]),
  addAsana
);
router.patch(
  "/:asanaId",
  authenticate,
  authorizeRole(["super-admin", "moderator"]),
  updateAsana
);
router.delete(
  "/:asanaId",
  authenticate,
  authorizeRole(["super-admin"]),
  deleteAsana
);

export default router;
