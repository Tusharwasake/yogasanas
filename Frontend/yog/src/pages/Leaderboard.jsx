import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Dash/Sidebar";

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("🚨 No token found in localStorage!");
        setError("Unauthorized! Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get("https://yogasanas.onrender.com/api/progress/leaderboard", {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("🔹 API Response:", response.data);

        if (Array.isArray(response.data)) {
          setLeaderboard(response.data);
        } else {
          console.error("Unexpected API response format:", response.data);
          setError("Invalid data format received.");
        }
      } catch (err) {
        console.error("🚨 Error fetching leaderboard:", err);
        setError("Failed to load leaderboard.");
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <div className="bg-gray-900 text-white w-64">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-white flex flex-col justify-center items-center flex-1 bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-900 dark:to-gray-800 p-6">
        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
          </div>
        ) : error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : (
          <>
            <h2 className="text-2xl font-semibold text-center mb-5 text-gray-900">🏆 Leaderboard</h2>

            <div className="overflow-x-auto w-full max-w-3xl">
              <table className="min-w-full border border-gray-300 rounded-lg shadow-lg bg-white">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="px-4 py-2 border border-gray-300 text-black">Rank</th>
                    <th className="px-4 py-2 border border-gray-300 text-black">User</th>
                    <th className="px-4 py-2 border border-gray-300 text-black">Weekly Asanas</th>
                    <th className="px-4 py-2 border border-gray-300 text-black">Total Asanas</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard
                    .sort((a, b) => (b.weeklyStats?.asanasCompleted ?? 0) - (a.weeklyStats?.asanasCompleted ?? 0))
                    .map((user, index) => (
                      <tr key={user._id} className="border border-gray-300 bg-white">
                        <td className="px-4 py-2 text-center font-semibold text-black">#{index + 1}</td>
                        <td className="px-4 py-2 text-black font-semibold">{user.userId?.name || "Unknown User"}</td>
                        <td className="px-4 py-2 text-center text-black font-semibold">{user.weeklyStats?.asanasCompleted ?? "N/A"}</td>
                        <td className="px-4 py-2 text-center text-black font-semibold">{user.totalAsanas ?? "N/A"}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
