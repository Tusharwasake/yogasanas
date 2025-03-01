import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaTrophy, FaChartLine, FaUsers, FaBell, FaPlusCircle } from "react-icons/fa";
import Sidebar from "../components/Dash/Sidebar";

const Dashboard = () => {
  const [user, setUser] = useState({ name: "Sharvari", streak: 10, asanas: 120, badges: 5 });
  const [quote, setQuote] = useState("The pose you avoid the most is the one you need the most!");

  useEffect(() => {
    // Fetch user data (mocking Firebase data retrieval)
    setUser((prev) => ({ ...prev, name: "Sharvari", streak: 10, asanas: 120, badges: 5 }));
  }, []);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Dashboard Content */}
      <div className="flex-1 bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-900 dark:to-gray-800 p-6">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white dark:bg-gray-900 shadow-md rounded-xl p-6 text-center"
        >
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Namaste, {user.name}! 🧘‍♂️
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">Ready for today's wellness journey?</p>
          <div className="mt-4 flex justify-center space-x-6">
            <div className="text-center">
              <p className="text-xl font-semibold">{user.asanas}</p>
              <p className="text-gray-600 dark:text-gray-400">Total Asanas</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-semibold text-yellow-500">{user.streak}🔥</p>
              <p className="text-gray-600 dark:text-gray-400">Current Streak</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-semibold text-green-500">{user.badges}🎖️</p>
              <p className="text-gray-600 dark:text-gray-400">Badges Earned</p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-full flex items-center gap-2"
          >
            <FaPlusCircle /> Log a New Asana
          </motion.button>
        </motion.div>

        {/* Progress & Analytics */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md"
          >
            <h2 className="text-xl font-semibold">📊 Weekly Progress</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">50/100 Asanas for March Completed!</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md"
          >
            <h2 className="text-xl font-semibold">🏅 Milestones & Achievements</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">You unlocked the "Yogi Master" badge!</p>
          </motion.div>
        </div>

        {/* Community & Leaderboard */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md"
          >
            <h2 className="text-xl font-semibold">🏆 Leaderboard</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Top-ranked yogis this week!</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md"
          >
            <h2 className="text-xl font-semibold">💬 Community Challenges</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Join the 21-Day Yoga Challenge!</p>
          </motion.div>
        </div>

        {/* Motivation & Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-6 bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md text-center"
        >
          <h2 className="text-xl font-semibold">🌿 Daily Inspiration</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">"{quote}"</p>
        </motion.div>

        {/* Notifications & Shortcuts */}
        <div className="mt-6 flex justify-between items-center">
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="flex items-center space-x-2 bg-yellow-500 text-white px-4 py-2 rounded-full"
          >
            <FaBell />
            <span>Check Notifications</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            className="flex items-center space-x-2 bg-gray-800 text-white px-4 py-2 rounded-full"
          >
            <FaChartLine />
            <span>Go to Analytics</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-full"
          >
            <FaUsers />
            <span>View Community</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
