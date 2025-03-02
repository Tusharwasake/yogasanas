import mongoose from "mongoose";

const progressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  totalAsanas: { type: Number, default: 0 },
  goal: { type: Number, default: 100 },
  progress: {
    Mon: { type: Number, default: 0 },
    Tue: { type: Number, default: 0 },
    Wed: { type: Number, default: 0 },
    Thu: { type: Number, default: 0 },
    Fri: { type: Number, default: 0 },
    Sat: { type: Number, default: 0 },
    Sun: { type: Number, default: 0 },
  },
  asanasCompleted: [
    // ✅ Fix: Correct field name
    {
      asanaId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Asana",
        required: true,
      },
      date: { type: Date, default: Date.now },
      difficulty: {
        type: String,
        enum: ["Beginner", "Easy", "Medium", "Hard", "Advanced"],
      },
    },
  ],
  streak: { type: Number, default: 0 },
  lastActivity: { type: Date },
  weeklyStats: {
    weekStart: { type: Date },
    asanasCompleted: { type: Number, default: 0 },
  },
  createdAt: { type: Date, default: Date.now },
});

const Progress = mongoose.model("Progress", progressSchema);
export default Progress;
