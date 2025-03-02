import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";
import morgan from "morgan";
import cors from "cors";
import { errorHandler } from "./middlewares/errorMiddleware.js";
import asanaRoutes from "./routes/asanaRoutes.js";
import userRoutes from "./routes/userRoutes.js";

import dotenv from "dotenv";
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/asanas", asanaRoutes);
app.use("/api/users", userRoutes);

// Global error handler
app.use(errorHandler);

// Database connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
