import moment from "moment";
import Progress from "../models/Progress.js";

// export const logAsana = async (req, res) => {
//   try {
//     const { asanaId, name, difficulty } = req.body;
//     const userId = req.user.userId;

//     let progress = await Progress.findOne({ userId });
//     console.log("Existing Progress Data:", progress);

//     // Create progress if it doesn't exist
//     if (!progress) {
//       progress = new Progress({
//         userId,
//         goal: 100,
//         progress: {
//           Mon: 0,
//           Tue: 0,
//           Wed: 0,
//           Thu: 0,
//           Fri: 0,
//           Sat: 0,
//           Sun: 0,
//         },
//         asanaLog: [],
//         weeklyStats: {},
//       });
//     }

//     const today = moment();
//     const weekStart = today.startOf("isoWeek").toDate();
//     const dayOfWeek = today.format("ddd");

//     // **Reset weekly progress if it's a new week**
//     if (
//       !progress.weeklyStats.weekStart ||
//       moment(progress.weeklyStats.weekStart).isBefore(weekStart)
//     ) {
//       progress.weeklyStats.weekStart = weekStart;
//       progress.weeklyStats.asanasCompleted = 0;
//       progress.progress = {
//         Mon: 0,
//         Tue: 0,
//         Wed: 0,
//         Thu: 0,
//         Fri: 0,
//         Sat: 0,
//         Sun: 0,
//       };
//     }

//     // **Update streaks**
//     const lastActivityDate = progress.lastActivity
//       ? moment(progress.lastActivity)
//       : null;
//     if (lastActivityDate && lastActivityDate.isSame(today, "day")) {
//       // No change
//     } else if (
//       lastActivityDate &&
//       lastActivityDate.add(1, "day").isSame(today, "day")
//     ) {
//       progress.streak += 1;
//     } else {
//       progress.streak = 1;
//     }

//     progress.lastActivity = today.toDate();
//     progress.totalAsanas += 1;
//     progress.progress[dayOfWeek] += 1;
//     progress.weeklyStats.asanasCompleted += 1;

//     // **Append Asana Log**
//     if (!progress.asanaLog) {
//       progress.asanaLog = [];
//     }
//     progress.asanaLog.push({ date: today.toDate(), name, difficulty });

//     console.log("Updated Progress Before Save:", progress);

//     // **Force update in MongoDB**
//     await Progress.updateOne({ userId }, progress, { upsert: true });

//     console.log("Progress Saved Successfully!");

//     res.status(200).json({ message: "Asana logged successfully", progress });
//   } catch (error) {
//     console.error("Log Asana Error:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

// import moment from "moment";
// import Progress from "../models/Progress.js"; // Ensure correct import

// export const logAsana = async (req, res) => {
//   try {
//     console.log("📩 Incoming request data:", req.body);

//     const { userId, asanaName, difficulty, date } = req.body;

//     if (!userId || !asanaName || !difficulty || !date) {
//       return res.status(400).json({ message: "Missing required fields" });
//     }

//     let progress = await Progress.findOne({ userId });

//     if (!progress) {
//       progress = new Progress({
//         userId,
//         goal: 100, // Default goal
//         progress: { Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0, Sun: 0 },
//         asanaLog: [],
//         weeklyStats: {},
//       });
//     }

//     const asanaDate = moment(date, "YYYY-MM-DD"); // Convert frontend date to moment object
//     const weekStart = asanaDate.startOf("isoWeek").toDate(); // Monday as the start of the week
//     const dayOfWeek = asanaDate.format("ddd"); // Convert date to weekday (Mon, Tue, ...)

//     console.log(
//       `🗓️ Logging Asana for: ${asanaDate.format("YYYY-MM-DD")} (${dayOfWeek})`
//     );

//     // **Reset weekly progress if it's a new week**
//     if (
//       !progress.weeklyStats.weekStart ||
//       moment(progress.weeklyStats.weekStart).isBefore(weekStart)
//     ) {
//       progress.weeklyStats.weekStart = weekStart;
//       progress.weeklyStats.asanasCompleted = 0;
//       progress.progress = {
//         Mon: 0,
//         Tue: 0,
//         Wed: 0,
//         Thu: 0,
//         Fri: 0,
//         Sat: 0,
//         Sun: 0,
//       };
//     }

//     // **Update streaks**
//     const lastActivityDate = progress.lastActivity
//       ? moment(progress.lastActivity)
//       : null;
//     if (lastActivityDate && lastActivityDate.isSame(asanaDate, "day")) {
//       // Same day, no streak increase
//     } else if (
//       lastActivityDate &&
//       lastActivityDate.add(1, "day").isSame(asanaDate, "day")
//     ) {
//       progress.streak += 1;
//     } else {
//       progress.streak = 1;
//     }

//     progress.lastActivity = asanaDate.toDate();
//     progress.totalAsanas += 1;
//     progress.progress[dayOfWeek] += 1; // ✅ Updates the correct day from the provided date
//     progress.weeklyStats.asanasCompleted += 1;

//     // ✅ Append Asana Log
//     if (!progress.asanaLog) {
//       progress.asanaLog = [];
//     }
//     progress.asanaLog.push({
//       date: asanaDate.toDate(),
//       name: asanaName,
//       difficulty,
//     });

//     console.log("📌 Updated progress before saving:", progress);

//     await progress.save();
//     console.log("✅ Progress saved successfully!");

//     res.status(200).json({ message: "Asana logged successfully", progress });
//   } catch (error) {
//     console.error("🔥 Log Asana Error:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

export const logAsana = async (req, res) => {
  try {
    console.log("📩 Incoming request data:", req.body);

    const { userId, asanaName, difficulty, date } = req.body;

    if (!userId || !asanaName || !difficulty || !date) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    let progress = await Progress.findOne({ userId });

    if (!progress) {
      progress = new Progress({
        userId,
        goal: 100, // Default goal
        progress: { Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0, Sun: 0 },
        asanaLog: [],
        weeklyStats: {},
      });
    }

    // 🔹 **Convert provided date correctly**
    const asanaDate = moment(date, "YYYY-MM-DD");
    const dayOfWeek = asanaDate.format("ddd"); // ✅ Get correct weekday

    console.log(
      `🗓️ Logging Asana for: ${asanaDate.format("YYYY-MM-DD")} (${dayOfWeek})`
    );

    // 🔹 **Reset weekly progress if it's a new week**
    const weekStart = asanaDate.startOf("isoWeek").toDate(); // Start of the week (Monday)
    if (
      !progress.weeklyStats.weekStart ||
      moment(progress.weeklyStats.weekStart).isBefore(weekStart)
    ) {
      progress.weeklyStats.weekStart = weekStart;
      progress.weeklyStats.asanasCompleted = 0;
      progress.progress = {
        Mon: 0,
        Tue: 0,
        Wed: 0,
        Thu: 0,
        Fri: 0,
        Sat: 0,
        Sun: 0,
      };
    }

    // 🔹 **Update streaks**
    const lastActivityDate = progress.lastActivity
      ? moment(progress.lastActivity)
      : null;
    if (lastActivityDate && lastActivityDate.isSame(asanaDate, "day")) {
      // Same day, no streak increase
    } else if (
      lastActivityDate &&
      lastActivityDate.add(1, "day").isSame(asanaDate, "day")
    ) {
      progress.streak += 1;
    } else {
      progress.streak = 1;
    }

    progress.lastActivity = asanaDate.toDate();
    progress.totalAsanas += 1;
    progress.progress[dayOfWeek] += 1; // ✅ **Now updates the correct weekday**
    progress.weeklyStats.asanasCompleted += 1;

    // ✅ Append Asana Log
    if (!progress.asanaLog) {
      progress.asanaLog = [];
    }
    progress.asanaLog.push({
      date: asanaDate.toDate(),
      name: asanaName,
      difficulty,
    });

    console.log("📌 Updated progress before saving:", progress);

    await progress.save();
    console.log("✅ Progress saved successfully!");

    res.status(200).json({ message: "Asana logged successfully", progress });
  } catch (error) {
    console.error("🔥 Log Asana Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getUserProgress = async (req, res) => {
  try {
    const userId = req.user.userId; // Get authenticated user ID

    const progress = await Progress.findOne({ userId })
      .populate("asanasCompleted.asanaId", "name difficulty") // ✅ Correct field name
      .exec();

    if (!progress) {
      return res.status(404).json({ message: "Progress data not found" });
    }

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

export const getWeeklyProgress = async (req, res) => {
  try {
    const userId = req.user.userId;
    const progress = await Progress.findOne({ userId });

    if (!progress) {
      return res.status(404).json({ message: "No progress found" });
    }

    res.status(200).json({
      totalAsanas: progress.totalAsanas,
      goal: progress.goal,
      progress: progress.progress, // ✅ Daily breakdown (Mon-Sun)
      asanaLog: progress.asanaLog.slice(-10), // ✅ Last 10 asanas
    });
  } catch (error) {
    console.error("Weekly Progress Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getWeeklyLeaderboard = async (req, res) => {
  try {
    const today = moment().startOf("isoWeek").toDate();

    const leaderboard = await Progress.find({ "weeklyStats.weekStart": today })
      .sort({ "weeklyStats.asanasCompleted": -1, streak: -1 })
      .limit(10)
      .populate("userId", "name profilePicture");

    res.status(200).json(leaderboard);
  } catch (error) {
    console.error("Leaderboard Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateGoal = async (req, res) => {
  try {
    const { goal } = req.body;
    const userId = req.user.userId;

    if (!goal || goal < 1)
      return res.status(400).json({ message: "Invalid goal value" });

    const progress = await Progress.findOne({ userId });
    if (!progress)
      return res.status(404).json({ message: "Progress not found" });

    progress.goal = goal;
    await progress.save();

    res.status(200).json({ message: "Goal updated successfully", goal });
  } catch (error) {
    console.error("Update Goal Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
