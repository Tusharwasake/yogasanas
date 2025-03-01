import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import Sidebar from "../components/Dash/Sidebar";

const MyProgress = () => {
  const [user] = useState({ name: "Sharvari", streak: 15, totalAsanas: 75, goal: 100 });
  
  const progressData = [
    { day: "Mon", asanas: 3 },
    { day: "Tue", asanas: 5 },
    { day: "Wed", asanas: 4 },
    { day: "Thu", asanas: 6 },
    { day: "Fri", asanas: 2 },
    { day: "Sat", asanas: 7 },
    { day: "Sun", asanas: 8 }
  ];

  const asanaLog = [
    { date: "2025-02-28", name: "Tadasana", difficulty: "Easy" },
    { date: "2025-02-27", name: "Bhujangasana", difficulty: "Medium" },
    { date: "2025-02-26", name: "Vrikshasana", difficulty: "Medium" }
  ];

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//         <Sidebar/>
//       {/* Hero Section */}
//       <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-6 rounded-xl shadow-lg text-center">
//         <h1 className="text-2xl font-bold">Keep going, {user.name}! 🌟</h1>
//         <p className="mt-2">🔥 {user.streak}-day streak | 🧘‍♂️ {user.totalAsanas} asanas completed</p>
//       </div>

//       {/* Progress Graph */}
//       <div className="bg-white mt-6 p-4 rounded-xl shadow-lg">
//         <h2 className="text-xl font-semibold mb-2">📊 Weekly Progress</h2>
//         <ResponsiveContainer width="100%" height={200}>
//           <BarChart data={progressData}>
//             <XAxis dataKey="day" />
//             <YAxis />
//             <Tooltip />
//             <Bar dataKey="asanas" fill="#6366F1" radius={[4, 4, 0, 0]} />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>

//       {/* Goal Tracker */}
//       <div className="bg-white mt-6 p-4 rounded-xl shadow-lg">
//         <h2 className="text-xl font-semibold mb-2">🎯 Goal Tracker</h2>
//         <p className="text-gray-600">Progress: {user.totalAsanas}/{user.goal} asanas</p>
//         <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
//           <div className="bg-green-500 h-3 rounded-full" style={{ width: `${(user.totalAsanas / user.goal) * 100}%` }}></div>
//         </div>
//       </div>

//       {/* Achievements */}
//       <div className="bg-white mt-6 p-4 rounded-xl shadow-lg">
//         <h2 className="text-xl font-semibold mb-2">🏆 Achievements</h2>
//         <p className="text-gray-600">🎖️ Rising Yogi (10 Days Streak) ✅</p>
//         <p className="text-gray-600">🔓 Next Badge: "Asana Master" (5 more days!)</p>
//       </div>

//       {/* Asana Log */}
//       <div className="bg-white mt-6 p-4 rounded-xl shadow-lg">
//         <h2 className="text-xl font-semibold mb-2">📜 Asana Log History</h2>
//         <ul className="text-gray-700">
//           {asanaLog.map((asana, index) => (
//             <li key={index} className="border-b py-2">
//               🗓️ {asana.date} – {asana.name} ({asana.difficulty})
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
return (
    <div className="flex min-h-screen">
    {/* Sidebar (Fixed Width) */}
    <div className=" bg-gray-900 text-white">
      <Sidebar />
    </div>

      {/* Main Content */}
      <div className="p-6 flex-1 max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-6 rounded-xl shadow-lg text-center">
          <h1 className="text-2xl font-bold">Keep going, {user.name}! 🌟</h1>
          <p className="mt-2">🔥 {user.streak}-day streak | 🧘‍♂️ {user.totalAsanas} asanas completed</p>
        </div>

        {/* Progress Graph */}
        <div className="bg-white mt-6 p-4 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-2">📊 Weekly Progress</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={progressData}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="asanas" fill="#6366F1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Goal Tracker */}
        <div className="bg-white mt-6 p-4 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-2">🎯 Goal Tracker</h2>
          <p className="text-gray-600">Progress: {user.totalAsanas}/{user.goal} asanas</p>
          <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
            <div className="bg-green-500 h-3 rounded-full" style={{ width: `${(user.totalAsanas / user.goal) * 100}%` }}></div>
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-white mt-6 p-4 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-2">🏆 Achievements</h2>
          <p className="text-gray-600">🎖️ Rising Yogi (10 Days Streak) ✅</p>
          <p className="text-gray-600">🔓 Next Badge: "Asana Master" (5 more days!)</p>
        </div>

        {/* Asana Log */}
        <div className="bg-white mt-6 p-4 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-2">📜 Asana Log History</h2>
          <ul className="text-gray-700">
            {asanaLog.map((asana, index) => (
              <li key={index} className="border-b py-2">
                🗓️ {asana.date} – {asana.name} ({asana.difficulty})
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );

};

export default MyProgress;
