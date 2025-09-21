import { useState, useEffect } from "react";
import { Calendar } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Line } from "react-chartjs-2";
import { Link, useNavigate } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {
  Sun,
  Moon,
  Home,
  User,
  Key,
  LogOut,
  AlertCircle,
  Info,
  CheckCircle,
  Trash2,
  ChevronDown,
} from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

import logo from "../assets/logo.png";

const UserDashboard = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(true);
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "info",
      message: "Your subscription renews in 5 days.",
      date: new Date("2025-09-15"),
    },
    {
      id: 2,
      type: "alert",
      message: "New fitness class added: Yoga.",
      date: new Date("2025-09-16"),
    },
    {
      id: 3,
      type: "success",
      message: "Update your profile for personalized plans.",
      date: new Date("2025-09-17"),
    },
  ]);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [sortType, setSortType] = useState("date");
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const toggleTheme = () => setDarkMode(!darkMode);

  const deleteNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    setSelectedNotification(null);
  };

  const sortNotifications = (type) => {
    setSortType(type);
    setNotifications((prev) => {
      const sorted = [...prev];
      if (type === "date") sorted.sort((a, b) => b.date - a.date);
      if (type === "type") sorted.sort((a, b) => a.type.localeCompare(b.type));
      return sorted;
    });
  };

  const getIcon = (type) => {
    if (type === "alert")
      return <AlertCircle className="w-5 h-5 text-red-500" />;
    if (type === "info") return <Info className="w-5 h-5 text-blue-500" />;
    if (type === "success")
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    return null;
  };

  // Close logout modal on ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setShowLogoutModal(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const graphData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Calories Burned",
        data: [1200, 1500, 1800, 2200],
        borderColor: "#FACC15",
        backgroundColor: "transparent",
        tension: 0.3,
      },
      {
        label: "Workouts Completed",
        data: [2, 3, 4, 5],
        borderColor: "#FACC15",
        backgroundColor: "transparent",
        tension: 0.3,
      },
    ],
  };

  const graphOptions = {
    responsive: true,
    plugins: {
      legend: { labels: { color: darkMode ? "#FFFFFF" : "#FACC15" } },
      title: {
        display: true,
        text: "Monthly Progress",
        color: darkMode ? "#FFFFFF" : "#FACC15",
      },
    },
    scales: {
      x: {
        ticks: { color: darkMode ? "#FFFFFF" : "#FACC15" },
        grid: { color: darkMode ? "#333333" : "#E5E7EB" },
      },
      y: {
        ticks: { color: darkMode ? "#FFFFFF" : "#FACC15" },
        grid: { color: darkMode ? "#333333" : "#E5E7EB" },
      },
    },
  };

  const navItems = [
    { name: "Dashboard", icon: <Home className="w-5 h-5" /> },
    { name: "Account", icon: <User className="w-5 h-5" /> },
    { name: "Change Password", icon: <Key className="w-5 h-5" /> },
    {
      name: "Log Out",
      icon: <LogOut className="w-5 h-5" />,
      action: () => setShowLogoutModal(true),
    },
  ];

  return (
    <div
      className={`${
        darkMode ? "bg-softblack text-mustard" : "bg-white text-softblack"
      } min-h-screen transition-colors duration-300 pb-[60px] md:pb-0 relative`}
    >
      {/* Mobile Logo */}
      <div className="md:hidden flex justify-center items-center py-4">
        <span className="text-2xl font-bold text-[#FACC15]">Kudo Fitness</span>
      </div>

      {/* Main layout */}
      <div className="flex flex-col md:flex-row">
        {/* Left Sidebar */}
        <aside
          className={`hidden md:flex md:flex-col md:w-[20vw] h-screen p-6 items-center transition-colors duration-300 ${
            darkMode ? "bg-softblack text-white" : "bg-white text-softblack"
          }`}
        >
          <div className="text-[clamp(20px,4vw,28px)] text-mustard-light font-bold mb-12">
            Kudo Fitness
          </div>
          <ul className="flex flex-col gap-6 w-full items-center text-[clamp(14px,3vw,18px)]">
            {navItems.map((item, idx) => (
              <li
                key={idx}
                className={`flex items-center gap-2 w-full justify-center cursor-pointer hover:text-[#FACC15] ${
                  darkMode ? "text-white" : "text-softblack"
                }`}
                onClick={item.action}
              >
                {item.icon}{" "}
                {item.link ? (
                  <Link to={item.link}>{item.name}</Link>
                ) : (
                  item.name
                )}
              </li>
            ))}
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 overflow-y-auto min-h-screen relative">
          {/* Theme Button */}
          <div className="hidden md:flex justify-end mb-4">
            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 px-3 py-2 rounded hover:bg-[#FACC15] hover:text-softblack transition"
            >
              {darkMode ? (
                <Moon
                  className={`w-5 h-5 ${
                    darkMode ? "text-white" : "text-softblack"
                  }`}
                />
              ) : (
                <Sun className="w-5 h-5" />
              )}{" "}
              <span className={`${darkMode ? "text-white" : "text-softblack"}`}>
                Theme
              </span>
            </button>
          </div>

          {/* Notifications */}
          <section
            className={`mb-6 p-4 rounded-lg  shadow-[4px_4px_15px_#111111,-4px_-4px_15px_#2a2a2a] transition-colors duration-300 ${
              darkMode
                ? "bg-softblack text-white"
                : "bg-[#FFF9E5] text-softblack"
            }`}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-[clamp(18px,4vw,24px)] font-semibold">
                Notifications
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={() => sortNotifications("date")}
                  className="flex items-center gap-1 px-2 py-1 rounded hover:bg-[#FACC15] hover:text-softblack transition"
                >
                  Date <ChevronDown className="w-4 h-4" />
                </button>
                <button
                  onClick={() => sortNotifications("type")}
                  className="flex items-center gap-1 px-2 py-1 rounded hover:bg-[#FACC15] hover:text-softblack transition"
                >
                  Type <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>
            <ul className="flex flex-col gap-4 text-[clamp(14px,3vw,16px)]">
              {notifications.map((n) => (
                <li
                  key={n.id}
                  className={`flex flex-col gap-2 p-3 rounded-lg border transition cursor-pointer ${
                    darkMode
                      ? "border-[#FACC15] hover:bg-[#2a2a2a]"
                      : "border-softblack hover:bg-[#FFF3C4]"
                  }`}
                  onClick={() => setSelectedNotification(n)}
                >
                  <div className="flex items-center gap-2">
                    {getIcon(n.type)}
                    <span className="font-medium">{n.message}</span>
                  </div>
                  <span className="text-xs text-gray-400">
                    {n.date.toLocaleDateString()}{" "}
                    {n.date.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* Progress Analytics */}
          <section
            className={`mb-6 p-4 rounded-lg shadow-[4px_4px_15px_#111111,-4px_-4px_15px_#2a2a2a] transition-colors duration-300 ${
              darkMode
                ? "bg-softblack text-white"
                : "bg-[#FFF9E5] text-softblack"
            }`}
          >
            <h2 className="text-[clamp(18px,4vw,24px)] font-semibold mb-4">
              Progress Analytics
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-[#FACC15] text-softblack rounded-lg p-4 text-center text-[clamp(16px,3vw,18px)]">
                Workouts: 12
              </div>
              <div className="bg-[#FACC15] text-softblack rounded-lg p-4 text-center text-[clamp(16px,3vw,18px)]">
                Calories: 2500
              </div>
              <div className="bg-[#FACC15] text-softblack rounded-lg p-4 text-center text-[clamp(16px,3vw,18px)]">
                Goals: 75%
              </div>
            </div>
            <div className="w-full h-[400px]">
              <Line data={graphData} options={graphOptions} />
            </div>
          </section>
        </main>

        {/* Right Profile Sidebar */}
        <aside
          className={`hidden md:flex md:flex-col md:w-[25vw] h-screen p-6 items-center transition-colors duration-300 ${
            darkMode ? "bg-softblack text-white" : "bg-[#FFF9E5] text-softblack"
          }`}
        >
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#FACC15] mb-4">
            <img
              src="https://via.placeholder.com/150"
              alt="Profile"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div className="text-center mb-4">
            <h2 className="text-[clamp(18px,4vw,24px)] font-semibold">
              John Doe
            </h2>
            <p className="text-[#FACC15] font-medium">Active</p>
          </div>
          <div className="w-full p-4 rounded-lg flex flex-col gap-2 text-sm mb-4">
            <p>
              <span className="font-semibold">Current Plan:</span> Premium
            </p>
            <p>
              <span className="font-semibold">Fitness Type:</span> Cardio &
              Strength
            </p>
            <p>
              <span className="font-semibold">Fitness Goal:</span> Weight Loss
            </p>
          </div>
          <div className="w-full mt-4">
            <Calendar
              onChange={setCalendarDate}
              value={calendarDate}
              className="w-full rounded-lg p-2 text-black"
            />
          </div>
        </aside>
      </div>

      {/* Bottom nav for mobile */}
      <nav
        className={`fixed bottom-0 left-0 w-full h-16 flex justify-around items-center shadow-inner md:hidden transition-colors duration-300 ${
          darkMode ? "bg-softblack text-white" : "bg-white text-softblack"
        }`}
      >
        {navItems.map((item, idx) => (
          <button
            key={idx}
            onClick={item.action}
            className="flex flex-col items-center justify-center text-sm"
          >
            {item.icon}
            <span className="text-[10px]">{item.name}</span>
          </button>
        ))}
        <button
          onClick={toggleTheme}
          className="flex flex-col items-center justify-center text-sm"
        >
          {darkMode ? (
            <Moon className="w-5 h-5" />
          ) : (
            <Sun className="w-5 h-5" />
          )}
          <span className="text-[10px]">Theme</span>
        </button>
      </nav>

      {/* Notification Modal */}
      {selectedNotification && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div
            className={`rounded-lg w-[90%] max-w-md p-6 relative ${
              darkMode
                ? "bg-[#1C1C1C] text-white shadow-[0_0_20px_4px_rgba(250,250,250,0.3)]"
                : "bg-white text-softblack shadow-[2px_2px_10px_#111111]"
            }`}
          >
            <button
              onClick={() => setSelectedNotification(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
            >
              X
            </button>
            <div className="flex items-center gap-2 mb-4">
              {getIcon(selectedNotification.type)}
              <h3 className="text-lg font-semibold">
                {selectedNotification.type.toUpperCase()}
              </h3>
            </div>
            <p className="mb-4">{selectedNotification.message}</p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">
                {selectedNotification.date.toLocaleString()}
              </span>
              <button
                onClick={() => deleteNotification(selectedNotification.id)}
                className="flex items-center gap-1 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                <Trash2 className="w-4 h-4" /> Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50"
          onClick={() => setShowLogoutModal(false)}
        >
          <div
            className={`rounded-lg w-[90%] max-w-sm p-6 relative ${
              darkMode
                ? "bg-[#1C1C1C] text-white shadow-[0_0_20px_4px_rgba(250,250,250,0.3)]"
                : "bg-white text-softblack shadow-[2px_2px_10px_#111111]"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold mb-4">
              Are you sure you want to log out?
            </h3>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowLogoutModal(false)}
                className={`px-4 py-2 rounded transition ${
                  darkMode
                    ? "bg-[#FACC15] text-black hover:bg-yellow-400"
                    : "bg-softblack text-white hover:bg-yellow-300"
                }`}
              >
                No
              </button>
              <button
                onClick={() => {
                  setShowLogoutModal(false);
                  navigate("/");
                }}
                className={`px-4 py-2 rounded transition ${
                  darkMode
                    ? "bg-[#FACC15] text-black hover:bg-yellow-400"
                    : "bg-softblack text-white hover:bg-yellow-300"
                }`}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
