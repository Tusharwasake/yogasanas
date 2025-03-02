import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiHome, FiBarChart2, FiUsers, FiAward, FiSettings, FiChevronLeft, FiChevronRight, FiBell, FiTarget, FiBook } from "react-icons/fi";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: <FiHome /> },
    { name: "Leaderboard", path: "/leaderboard", icon: <FiAward /> },
    { name: "Asana Library", path: "/asana-library", icon: <FiBook /> },
    { name: "Settings", path: "/settings", icon: <FiSettings /> },
  ];

  return (
    <div className={`bg-gray-900 text-white h-screen p-4 flex flex-col ${isCollapsed ? "w-16" : "w-64"} transition-all duration-300`}>
      <button className="text-xl mb-4" onClick={() => setIsCollapsed(!isCollapsed)}>
        {isCollapsed ? <FiChevronRight /> : <FiChevronLeft />}
      </button>
      <ul className="space-y-3">
        {menuItems.map((item) => (
          <li key={item.name} className={`p-2 rounded-lg flex items-center space-x-2 hover:bg-gray-700 ${location.pathname === item.path ? "bg-gray-700" : ""}`}>
            <Link to={item.path} className="flex items-center space-x-3">
              {item.icon}
              {!isCollapsed && <span>{item.name}</span>}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
