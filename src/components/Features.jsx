import React, { useState, useEffect } from "react";
import {
  CreditCard,
  Smartphone,
  BarChart,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { useOutletContext } from "react-router-dom";

export default function Features() {
  const { darkMode, setDarkMode } = useOutletContext();

  const [current, setCurrent] = useState(0);
  const featuresData = [
    {
      icon: <CreditCard size={50} />,
      title: "Membership Plans",
      description: "Subscribe to membership plans online",
      bg: "https://via.placeholder.com/1200x600?text=Membership+Plans",
    },
    {
      icon: <Smartphone size={50} />,
      title: "Digital Attendance",
      description: "Digital attendance via QR code",
      bg: "https://via.placeholder.com/1200x600?text=Digital+Attendance",
    },
    {
      icon: <BarChart size={50} />,
      title: "Fitness Analytics",
      description: "Fully customized fitness journey with analytics",
      bg: "https://via.placeholder.com/1200x600?text=Fitness+Analytics",
    },
  ];

  const prevFeature = () => {
    setCurrent(current === 0 ? featuresData.length - 1 : current - 1);
  };

  const nextFeature = () => {
    setCurrent(current === featuresData.length - 1 ? 0 : current + 1);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowLeft") prevFeature();
      if (e.key === "ArrowRight") nextFeature();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [current]);

  return (
    <>
      <section className="py-20 px-[5%] relative min-h-screen w-full">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-50 transition-all duration-500 rounded-xl"
          style={{ backgroundImage: `url(${featuresData[current].bg})` }}
        ></div>

        <div className="relative z-10 flex justify-center md:justify-end items-center h-full">
          {/* Modal */}
          <div
            className={` bg-opacity-90 border-4 rounded-2xl shadow-lg flex flex-col md:flex-row items-start
      w-full sm:w-4/5 md:w-[600px] lg:w-[700px] h-auto md:h-[500px] p-8 transition-all ${
        darkMode
          ? "border-yellow-400 bg-[#181818]"
          : "border-black-400 bg-white"
      }`}
          >
            {/* Left side: icon and text */}
            <div className="flex flex-col md:flex-row items-start md:items-start w-full md:w-auto">
              <div className="flex-shrink-0 mb-6 md:mb-0 md:mr-8">
                {featuresData[current].icon}
              </div>
              <div className="text-left">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4  text-yellow-400">
                  {featuresData[current].title}
                </h3>
                <p
                  className={`text-base sm:text-lg md:text-xl ${
                    darkMode ? "text-white" : "text-black"
                  }`}
                >
                  {featuresData[current].description}
                </p>
              </div>
            </div>
          </div>

          {/* Arrows - desktop only, outside modal */}
          <button
            onClick={prevFeature}
            className="hidden md:flex absolute left-[-60px] top-1/2 -translate-y-1/2 p-3 rounded-full bg-yellow-400 text-black shadow hover:bg-yellow-500 transition"
          >
            <ArrowLeft size={28} />
          </button>
          <button
            onClick={nextFeature}
            className="hidden md:flex absolute right-[-60px] top-1/2 -translate-y-1/2 p-3 rounded-full bg-yellow-400 text-black shadow hover:bg-yellow-500 transition"
          >
            <ArrowRight size={28} />
          </button>
        </div>

        {/* Bubbles */}
        <div className="flex justify-center mt-6 space-x-4 relative z-10">
          {featuresData.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full transition-colors ${
                current === index
                  ? "bg-yellow-500 dark:bg-yellow-400"
                  : "bg-gray-300 dark:bg-gray-600"
              }`}
            ></button>
          ))}
        </div>
      </section>
    </>
  );
}
