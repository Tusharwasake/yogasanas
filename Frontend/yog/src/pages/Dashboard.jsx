import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import Sidebar from "../components/Dash/Sidebar";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false); // To toggle the form popup
  const [newAsana, setNewAsana] = useState({
    asanaName: "",
    difficulty: "Easy",
    date: new Date().toISOString().split("T")[0], // Default to today’s date
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No authentication token found");
          return;
        }

        const headers = { Authorization: `Bearer ${token}` };

        const [userRes, leaderboardRes, progressRes] = await Promise.all([
          axios.get("https://yogasanas.onrender.com/api/users/profile", { headers }),
          axios.get("https://yogasanas.onrender.com/api/progress/leaderboard", { headers }),
          axios.get("https://yogasanas.onrender.com/api/progress", { headers }),
        ]);

        setUser(userRes.data);
        setLeaderboard(leaderboardRes.data || []);
        setProgress(progressRes.data || {});
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Failed to fetch dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const progressArray = progress?.progress ? Object.entries(progress.progress) : [];

  // 📌 Function to handle logging a new asana
  const handleLogAsana = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No authentication token found");
        return;
      }

      const headers = { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };

      const response = await axios.post("https://yogasanas.onrender.com/api/progress/log", 
        {
          userId: user?._id, 
          asanaName: newAsana.asanaName,
          difficulty: newAsana.difficulty,
          date: newAsana.date,
        },
        { headers }
      );

      // ✅ Updating the progress in state
      setProgress(response.data.progress);
      console.log(response.data.progress)
      setShowModal(false);
    } catch (error) {
      console.error("Error logging asana:", error);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="bg-gray-900 text-white">
        <Sidebar />
      </div>

      {/* Right Section */}
      <div className="flex-1 bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-900 dark:to-gray-800 p-6">
        {loading ? (
          <div className="w-full flex justify-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
          </div>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div className="w-full">
            {/* Hero Section */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white dark:bg-gray-900 shadow-md rounded-xl p-6 text-center"
            >
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                Namaste, {user?.name || "Yogi"}! 🧘‍♂️
              </h1>
              

              <div className="mt-4 flex justify-center space-x-6">
                <div className="text-center">
                <p className="text-gray-600 dark:text-gray-300 mt-2">Ready for today's wellness journey?</p>
             <div className="mt-4 flex justify-center space-x-6">
                 <div className="text-center">
                   <p className="text-xl font-semibold text-black">{progress?.totalAsanas || 0}🧘‍♂️</p>
                   <p className="text-gray-600 dark:text-gray-400">Total Asanas</p>
                 </div>
                 <div className="text-center">
                   <p className="text-xl font-semibold text-yellow-500">{progress?.streak || 0}🔥</p>
                   <p className="text-gray-600 dark:text-gray-400">Current Streak</p>
                 </div>
                 <div className="text-center">
                   <p className="text-xl font-semibold text-green-500">{progress?.badges?.length || 0}🎖️</p>
                   <p className="text-gray-600 dark:text-gray-400">Badges Earned</p>
                 </div>
               </div>
                 
                </div>
              </div>

              {/* ➕ Log a New Asana Button */}
              <button
                onClick={() => setShowModal(true)}
                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              >
                ➕ Log a New Asana
              </button>
            </motion.div>

            {/* Progress Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-6 bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md"
            >
              <h2 className="text-xl font-semibold text-black">📊 My Progress</h2>
              <div className="mt-4">
                {progressArray.length > 0 ? (
                  <Bar
                    data={{
                      labels: progressArray.map(([day]) => day),
                      datasets: [
                        {
                          label: "Asanas Completed",
                          data: progressArray.map(([, count]) => count),
                          backgroundColor: "#4CAF50",
                        },
                      ],
                    }}
                  />
                ) : (
                  <p>No progress data available.</p>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </div>

      {/* 🔥 Popup Modal for Logging Asanas */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-4">Log a New Asana</h2>

            <input
              type="text"
              placeholder="Asana Name"
              className="border p-2 w-full mb-2"
              value={newAsana.asanaName}
              onChange={(e) => setNewAsana({ ...newAsana, asanaName: e.target.value })}
            />

            <select
              className="border p-2 w-full mb-2"
              value={newAsana.difficulty}
              onChange={(e) => setNewAsana({ ...newAsana, difficulty: e.target.value })}
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>

            <input
              type="date"
              className="border p-2 w-full mb-4"
              value={newAsana.date}
              onChange={(e) => setNewAsana({ ...newAsana, date: e.target.value })}
            />

            <div className="flex justify-end space-x-2">
              <button onClick={() => setShowModal(false)} className="bg-gray-400 px-4 py-2 rounded">
                Cancel
              </button>
              <button onClick={handleLogAsana} className="bg-blue-500 text-white px-4 py-2 rounded">
                Log Asana
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;