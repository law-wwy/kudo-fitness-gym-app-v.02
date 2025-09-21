import React from "react";
import { useOutletContext } from "react-router-dom";

export default function Pricing() {
  const { darkMode, setDarkMode } = useOutletContext();
  return (
    <>
      {/* Pricing Section */}
      <section className="py-20 px-4 text-center min-h-[600px]">
        <h3 className="text-3xl font-bold mb-12">Pricing Plans</h3>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            { name: "Beginner", price: "₱500/mo" },
            { name: "Intermediate", price: "₱1000/mo" },
            { name: "Pro", price: "₱2000/mo" },
          ].map((plan) => (
            <div
              key={plan.name}
              className={`p-6 rounded-xl ${
                darkMode
                  ? "bg-gray-900 text-white"
                  : "bg-yellow-500 text-white shadow-lg shadow-[#181818]"
              }`}
            >
              <h4 className="text-xl font-semibold mb-2">{plan.name}</h4>
              <p className="text-2xl font-bold mb-4">{plan.price}</p>
              <button
                className={`px-4 py-2 rounded-lg ${
                  darkMode
                    ? "bg-yellow-400 text-[#181818]"
                    : "bg-[#181818] text-yellow-500"
                }`}
              >
                Choose
              </button>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
