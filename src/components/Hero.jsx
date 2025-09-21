import React from "react";
import { useOutletContext } from "react-router-dom";

export default function Hero() {
  const { darkMode, setDarkMode } = useOutletContext();

  return (
    <>
      {/* Hero Section */}
      <section className="flex items-center justify-center min-h-[800px] pt-20 px-4 md:px-6 lg:px-8">
        <div className="text-center max-w-2xl">
          <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-6xl font-bold mb-4 leading-tight text-center">
            Let's Get <span className="text-yellow-500">Fit</span>,{" "}
            <span className="text-gray-600">Don't</span>{" "}
            <span className="text-red-800">Quit</span>
          </h2>
          <button
            className={`mt-4 px-6 py-3 sm:px-8 sm:py-4 md:px-10 md:py-5 rounded-lg font-bold transition ${
              darkMode
                ? "bg-yellow-400 text-[#181818]"
                : "bg-yellow-500 text-white"
            } shadow`}
          >
            Get Started
          </button>
        </div>
      </section>
    </>
  );
}
