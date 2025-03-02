import mongoose from "mongoose";

const progressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  asanasCompleted: [
    {
      asanaId: { type: mongoose.Schema.Types.ObjectId, ref: "Asana" },
      name: String,
      difficulty: String,
      completedAt: { type: Date, default: Date.now },
    },
  ],
  streak: { type: Number, default: 0 }, // 🔹 Consecutive days of activity
  lastActivity: { type: Date },
  badges: [{ type: String }], // 🔹 Achievements for consistency
  totalAsanas: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

const Progress = mongoose.model("Progress", progressSchema);
export default Progress;
