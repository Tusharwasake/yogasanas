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

// export const logAsana = async (req, res) => {
//   try {
//     console.log("📩 Incoming request data:", req.body);

//     const { asanaId, name, difficulty } = req.body;
//     const userId = req.user?.userId; // ✅ Check if `req.user` is defined

//     if (!userId) {
//       console.error("🚨 User ID not found in request");
//       return res.status(400).json({ message: "User ID missing from request" });
//     }

//     let progress = await Progress.findOne({ userId });

//     if (!progress) {
//       progress = new Progress({
//         userId,
//         goal: 100, // Default goal
//         progress: { Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0, Sun: 0 },
//         asanaLog: [], // ✅ Ensure `asanaLog` is initialized
//         weeklyStats: {},
//       });
//     }

//     const today = moment();
//     const dayOfWeek = today.format("ddd");

//     if (!progress.asanaLog) {
//       progress.asanaLog = []; // ✅ Ensure it's an array before pushing
//     }

//     progress.totalAsanas += 1;
//     progress.progress[dayOfWeek] += 1;
//     progress.weeklyStats.asanasCompleted += 1;
//     progress.asanaLog.push({ date: today.toDate(), name, difficulty });

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

    const { userId, asanaName, difficulty, date } = req.body; // ✅ Extract request data
    const formattedDate = moment(date, "YYYY-MM-DD"); // ✅ Ensure correct date format

    if (!userId || !asanaName || !difficulty || !date) {
      console.error("🚨 Missing required fields in request");
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Find existing progress document
    let progress = await Progress.findOne({ userId });

    if (!progress) {
      progress = new Progress({
        userId,
        goal: 100, // Default goal
        progress: { Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0, Sun: 0 },
        asanaLog: [], // ✅ Initialize asanaLog array
        weeklyStats: {
          weekStart: formattedDate.startOf("isoWeek").toDate(),
          asanasCompleted: 0,
        },
      });
    }

    const weekStart = formattedDate.startOf("isoWeek").toDate(); // ✅ Get Monday as start of week
    const dayOfWeek = formattedDate.format("ddd"); // ✅ Convert date to "Mon", "Tue", etc.

    // **Reset weekly progress if it's a new week**
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
      }; // Reset daily stats
    }

    // **Update streaks**
    const lastActivityDate = progress.lastActivity
      ? moment(progress.lastActivity)
      : null;
    if (lastActivityDate && lastActivityDate.isSame(formattedDate, "day")) {
      // Same day, no streak increase
    } else if (
      lastActivityDate &&
      lastActivityDate.add(1, "day").isSame(formattedDate, "day")
    ) {
      progress.streak += 1;
    } else {
      progress.streak = 1; // Reset if a day is skipped
    }

    progress.lastActivity = formattedDate.toDate();
    progress.totalAsanas += 1;
    progress.progress[dayOfWeek] += 1; // ✅ Update the correct weekday
    progress.weeklyStats.asanasCompleted += 1; // ✅ Track weekly total

    // **Append to Asana Log**
    progress.asanaLog.push({
      date: formattedDate.toDate(),
      name: asanaName,
      difficulty: difficulty,
    });

    console.log("📌 Updated progress before saving:", progress);

    // **Save the updated progress**
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
