import Progress from "../models/Progress.js";
import User from "../models/User.js";

// ✅ Log Completed Asanas
export const logAsana = async (req, res) => {
  try {
    const { asanaId, name, difficulty } = req.body;
    const userId = req.user.userId;

    let progress = await Progress.findOne({ userId });

    // If no progress exists, create a new record
    if (!progress) {
      progress = new Progress({ userId, asanasCompleted: [], streak: 0 });
    }

    // Check if the user is continuing their streak
    const today = new Date();
    const lastActivityDate = progress.lastActivity
      ? new Date(progress.lastActivity)
      : null;

    if (
      lastActivityDate &&
      today.toDateString() === lastActivityDate.toDateString()
    ) {
      // Same day, no streak increase
    } else if (
      lastActivityDate &&
      today - lastActivityDate <= 86400000 * 1.5 // Within 1.5 days
    ) {
      progress.streak += 1; // 🔥 Increase streak
    } else {
      progress.streak = 1; // Reset streak if a day is skipped
    }

    progress.lastActivity = today;

    // Check for streak-based badges
    if (progress.streak === 3 && !progress.badges.includes("3-Day Streak")) {
      progress.badges.push("3-Day Streak");
    }
    if (progress.streak === 7 && !progress.badges.includes("1-Week Streak")) {
      progress.badges.push("1-Week Streak");
    }
    if (progress.streak === 30 && !progress.badges.includes("1-Month Streak")) {
      progress.badges.push("1-Month Streak");
    }

    // Log asana completion
    progress.asanasCompleted.push({ asanaId, name, difficulty });
    progress.totalAsanas += 1;

    await progress.save();
    res.status(200).json({ message: "Asana logged successfully", progress });
  } catch (error) {
    console.error("Log Asana Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// ✅ Get User's Progress (Stats & Streaks)
export const getUserProgress = async (req, res) => {
  try {
    const userId = req.user.userId;
    const progress = await Progress.findOne({ userId }).populate(
      "asanasCompleted.asanaId"
    );

    if (!progress)
      return res.status(404).json({ message: "No progress found" });

    res.status(200).json(progress);
  } catch (error) {
    console.error("Get Progress Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// ✅ Get Leaderboard (Top Performers)
export const getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await Progress.find()
      .sort({ totalAsanas: -1, streak: -1 })
      .limit(10)
      .populate("userId", "name profilePicture");

    res.status(200).json(leaderboard);
  } catch (error) {
    console.error("Leaderboard Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
