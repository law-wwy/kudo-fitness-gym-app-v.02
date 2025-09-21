import React, { useState, useContext } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { X, Eye, EyeOff, AlertCircle } from "lucide-react";
import { AppContext } from "../main.jsx";

export default function PersonalInfo() {
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRetypePassword, setShowRetypePassword] = useState(false);
  const { darkMode } = useContext(AppContext);
  const { form, handleChange, handleSubmit } = useOutletContext();

  return (
    <div
      className={`relative  h-[clamp(730px,100vh,750px)] w-[clamp(320px,90%,500px)] rounded-xl p-6 z-10 transition-all ${
        darkMode
          ? "bg-softblack text-white shadow-[4px_4px_15px_#111111,-4px_-4px_15px_#2a2a2a]"
          : "bg-mustard-light text-softblack shadow-blk"
      }`}
    >
      {/* Close Button */}
      <Link
        to="/"
        className={`absolute top-4 right-4 transition ${
          darkMode
            ? "text-white hover:text-mustard-light"
            : "text-softblack hover:text-mustard-dark"
        }`}
      >
        <X className="w-6 h-6" />
      </Link>

      {/* Title */}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4 text-center">
        Sign <span className="text-mustard-dark">Up</span>
      </h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4 text-sm sm:text-base">
        {/* Username */}
        <div>
          <label
            htmlFor="username"
            className="block mb-1 font-semibold text-sm sm:text-base"
          >
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            placeholder="Enter your username"
            value={form.personalInfo.username}
            onChange={handleChange("personalInfo")}
            required
            className={`w-full px-4 py-2 rounded-lg border focus:outline-none transition ${
              darkMode
                ? "bg-mustard-dark text-white placeholder-white border-mustard-dark focus:ring-2 focus:ring-mustard-light"
                : "bg-white text-softblack placeholder-softblack border-softblack focus:ring-2 focus:ring-mustard-dark"
            }`}
          />
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block mb-1 font-semibold text-sm sm:text-base"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={form.personalInfo.email}
            onChange={handleChange("personalInfo")}
            required
            className={`w-full px-4 py-2 rounded-lg border focus:outline-none transition ${
              darkMode
                ? "bg-mustard-dark text-white placeholder-white border-mustard-dark focus:ring-2 focus:ring-mustard-light"
                : "bg-white text-softblack placeholder-softblack border-softblack focus:ring-2 focus:ring-mustard-dark"
            }`}
          />
        </div>

        {/* Password */}
        <div className="relative">
          <label
            htmlFor="password"
            className="block mb-1 font-semibold text-sm sm:text-base"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={form.personalInfo.password}
            onChange={handleChange("personalInfo")}
            required
            className={`w-full pr-10 px-4 py-2 rounded-lg border focus:outline-none transition ${
              darkMode
                ? "bg-mustard-dark text-white placeholder-white border-mustard-dark focus:ring-2 focus:ring-mustard-light"
                : "bg-white text-softblack placeholder-softblack border-softblack focus:ring-2 focus:ring-mustard-dark"
            }`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className={`absolute top-[50px] right-[15px] -translate-y-1/2 transition ${
              darkMode
                ? "text-white hover:text-mustard-light"
                : "text-softblack hover:text-mustard-dark"
            }`}
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Retype Password */}
        <div className="relative">
          <label
            htmlFor="retypePassword"
            className="block mb-1 font-semibold text-sm sm:text-base"
          >
            Retype Password
          </label>
          <input
            id="retypePassword"
            name="retypePassword"
            type={showRetypePassword ? "text" : "password"}
            placeholder="Retype your password"
            value={form.personalInfo.retypePassword}
            onChange={handleChange("personalInfo")}
            required
            className={`w-full pr-10 px-4 py-2 rounded-lg border focus:outline-none transition ${
              darkMode
                ? "bg-mustard-dark text-white placeholder-white border-mustard-dark focus:ring-2 focus:ring-mustard-light"
                : "bg-white text-softblack placeholder-softblack border-softblack focus:ring-2 focus:ring-mustard-dark"
            }`}
          />
          <button
            type="button"
            onClick={() => setShowRetypePassword(!showRetypePassword)}
            className={`absolute top-[50px] right-[15px] -translate-y-1/2 transition ${
              darkMode
                ? "text-white hover:text-mustard-light"
                : "text-softblack hover:text-mustard-dark"
            }`}
          >
            {showRetypePassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Extra fields (3 rows × 2 columns) */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            value={form.personalInfo.phone || ""}
            onChange={handleChange("personalInfo")}
            className={`border rounded-lg p-2 w-full ${
              darkMode
                ? "bg-mustard-dark text-white placeholder-white border-mustard-dark focus:ring-2 focus:ring-mustard-light"
                : "bg-white text-softblack placeholder-softblack border-softblack focus:ring-2 focus:ring-mustard-dark"
            }`}
          />

          <select
            name="gender"
            value={form.personalInfo.gender || ""}
            onChange={handleChange("personalInfo")}
            className={`border rounded-lg p-2 w-full ${
              darkMode
                ? "bg-mustard-dark text-white placeholder-white border-mustard-dark focus:ring-2 focus:ring-mustard-light"
                : "bg-white text-softblack placeholder-softblack border-softblack focus:ring-2 focus:ring-mustard-dark"
            }`}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          <input
            type="text"
            name="nationality"
            placeholder="Nationality"
            value={form.personalInfo.nationality || ""}
            onChange={handleChange("personalInfo")}
            className={`border rounded-lg p-2 w-full ${
              darkMode
                ? "bg-mustard-dark text-white placeholder-white border-mustard-dark focus:ring-2 focus:ring-mustard-light"
                : "bg-white text-softblack placeholder-softblack border-softblack focus:ring-2 focus:ring-mustard-dark"
            }`}
          />

          <input
            type="date"
            name="birthdate"
            value={form.personalInfo.birthdate || ""}
            onChange={handleChange("personalInfo")}
            className={`border rounded-lg p-2 w-full ${
              darkMode
                ? "bg-mustard-dark text-white placeholder-white border-mustard-dark focus:ring-2 focus:ring-mustard-light"
                : "bg-white text-softblack placeholder-softblack border-softblack focus:ring-2 focus:ring-mustard-dark"
            }`}
          />

          <input
            type="text"
            name="fitnessType"
            placeholder="Fitness Type"
            value={form.personalInfo.fitnessType || ""}
            onChange={handleChange("personalInfo")}
            className={`border rounded-lg p-2 w-full ${
              darkMode
                ? "bg-mustard-dark text-white placeholder-white border-mustard-dark focus:ring-2 focus:ring-mustard-light"
                : "bg-white text-softblack placeholder-softblack border-softblack focus:ring-2 focus:ring-mustard-dark"
            }`}
          />

          <input
            type="text"
            name="fitnessGoal"
            placeholder="Fitness Goal"
            value={form.personalInfo.fitnessGoal || ""}
            onChange={handleChange("personalInfo")}
            className={`border rounded-lg p-2 w-full ${
              darkMode
                ? "bg-mustard-dark text-white placeholder-white border-mustard-dark focus:ring-2 focus:ring-mustard-light"
                : "bg-white text-softblack placeholder-softblack border-softblack focus:ring-2 focus:ring-mustard-dark"
            }`}
          />
        </div>

        {/* Error message */}
        {message && (
          <div className="flex items-center justify-center mt-2 text-sm text-red-500">
            <AlertCircle className="w-4 h-4 mr-2" />
            <span>{message}</span>
          </div>
        )}

        {/* Register Button
        <button
          type="submit"
          className={`w-full py-2.5 rounded-lg font-bold mt-2 transition text-base sm:text-lg ${
            darkMode
              ? "bg-mustard-dark text-white hover:bg-mustard-light"
              : "bg-softblack text-white hover:bg-mustard-dark"
          }`}
        >
          Register
        </button> */}
      </form>

      {/* Already have account */}
      <p className="text-xs sm:text-sm text-center mt-4">
        Already have an account?{" "}
        <Link
          to="/login"
          className={`font-semibold hover:underline ${
            darkMode ? "text-mustard-light" : "text-softblack"
          }`}
        >
          Login here
        </Link>
      </p>
    </div>
  );
}
