import React from "react";
import { useOutletContext } from "react-router-dom";

export default function AboutUs() {
  const { darkMode, setDarkMode } = useOutletContext();

  return (
    <>
      {/* About Us */}
      <section className="py-20 px-4 min-h-[500px]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <iframe
              title="Kudo Fitness Gym Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12..."
              className="w-full h-64 rounded-lg"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
          <div>
            <h3 className="text-3xl font-bold mb-6">About Us</h3>
            <p>
              Kudo Fitness Gym has been serving the community with top-notch
              training facilities since 2010. Our mission is to make fitness
              simple, accessible, and effective for everyone.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
