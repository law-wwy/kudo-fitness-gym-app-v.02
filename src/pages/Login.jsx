import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { X, Sun, Moon, Eye, EyeOff } from "lucide-react";
import { AppContext } from "../main.jsx";

export default function Login() {
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { darkMode, setDarkMode } = useContext(AppContext);

  const handleRememberMe = () => setRememberMe(!rememberMe);
  const togglePassword = () => setShowPassword(!showPassword);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto p-4">
      {/* Overlay */}
      <div
        className={`absolute inset-0 transition-colors ${
          darkMode ? "bg-softblack" : "bg-white"
        }`}
      ></div>

      {/* Top-right dark/light toggle */}
      <div className="absolute top-4 right-4 flex gap-4 z-20">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full transition transform hover:scale-110"
        >
          {darkMode ? (
            <Sun className="w-[clamp(20px,4vw,24px)] h-[clamp(20px,4vw,24px)] text-mustard-light" />
          ) : (
            <Moon className="w-[clamp(20px,4vw,24px)] h-[clamp(20px,4vw,24px)] text-mustard-dark" />
          )}
        </button>
      </div>

      {/* Modal */}
      <div
        className={`relative w-[clamp(280px,80%,500px)] rounded-xl p-[clamp(16px,4vw,32px)] z-10 transition-all
          ${
            darkMode
              ? "bg-softblack text-white shadow-[4px_4px_15px_#111111,-4px_-4px_15px_#2a2a2a]"
              : "bg-mustard-light text-softblack shadow-blk"
          }`}
      >
        {/* Close Button */}
        <Link
          to="/"
          className={`absolute top-[clamp(8px,2vw,16px)] right-[clamp(8px,2vw,16px)] transition ${
            darkMode
              ? "text-white hover:text-mustard-light"
              : "text-softblack hover:text-mustard-dark"
          }`}
        >
          <X className="w-[clamp(20px,4vw,24px)] h-[clamp(20px,4vw,24px)]" />
        </Link>

        {/* Title */}
        <h2 className="text-[clamp(24px,5vw,40px)]  font-extrabold mb-6 text-center">
          Log <span className="text-mustard-dark">in</span>
        </h2>

        {/* Email Input */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block mb-2 font-semibold text-[clamp(14px,3vw,18px)]"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            className={`w-full px-[clamp(12px,3vw,16px)] py-[clamp(12px,3vw,16px)] rounded-lg border focus:outline-none transition
              ${
                darkMode
                  ? "bg-mustard-dark text-white placeholder-white border-mustard-dark hover:bg-mustard-light"
                  : "bg-white text-softblack placeholder-softblack border-mustard-dark focus:ring-mustard-dark"
              }`}
          />
        </div>

        {/* Password */}
        <div className="mb-4 relative">
          <label
            htmlFor="password"
            className="block mb-2 font-semibold text-[clamp(14px,3vw,18px)]"
          >
            Password
          </label>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            className={`w-full pr-10 px-[clamp(12px,3vw,16px)] py-[clamp(12px,3vw,16px)] rounded-lg border focus:outline-none transition
      ${
        darkMode
          ? "bg-mustard-dark text-white placeholder-white border-mustard-dark hover:bg-mustard-light"
          : "bg-white text-softblack placeholder-softblack border-mustard-dark focus:ring-mustard-dark"
      }`}
          />
          <button
            type="button"
            onClick={togglePassword}
            className="absolute top-[30px] inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-800"
          >
            {showPassword ? (
              <EyeOff className="w-[clamp(20px,4vw,24px)] h-[clamp(20px,4vw,24px)]" />
            ) : (
              <Eye className="w-[clamp(20px,4vw,24px)] h-[clamp(20px,4vw,24px)]" />
            )}
          </button>
        </div>

        <div className="flex justify-center">
          <Link to="/userDashboard" className="w-[50%]">
            <button
              className={`w-full py-[clamp(12px,3vw,16px)] rounded-lg font-bold mt-2 transition text-[clamp(16px,3vw,20px)] ${
                darkMode
                  ? "bg-mustard-dark text-white hover:bg-mustard-light"
                  : "bg-softblack text-white"
              }`}
            >
              Get Started
            </button>
          </Link>
        </div>

        {/* Remember Me */}
        <div className="flex items-center mt-4">
          <input
            id="rememberMe"
            type="checkbox"
            checked={rememberMe}
            onChange={handleRememberMe}
            className="mr-2 w-[clamp(18px,4vw,24px)] h-[clamp(18px,4vw,24px)] accent-mustard-dark"
          />
          <label
            htmlFor="rememberMe"
            className={`${
              darkMode ? "text-white" : "text-softblack"
            } font-semibold text-[clamp(14px,3vw,18px)]`}
          >
            Remember Me
          </label>
        </div>

        <p className="text-[clamp(12px,3vw,16px)] text-center mt-6">
          Doesn’t have an account?{" "}
          <Link
            to="/signup"
            className={`${
              darkMode ? "text-white" : "text-softblack"
            } font-semibold hover:underline`}
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
