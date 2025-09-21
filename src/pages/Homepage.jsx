import React, { useState, useEffect, useRef, useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import {
  Sun,
  Moon,
  Menu,
  X,
  CreditCard,
  Smartphone,
  BarChart,
  ArrowLeft,
  ArrowRight,
  User,
  Users,
  Award,
  Facebook,
  Instagram,
  Phone,
  Music,
} from "lucide-react";

import { AppContext } from "../main.jsx"; // adjust the path if needed

// Assets
import logo from "../assets/logo.png";
import featureBG1 from "../assets/featuresBG1.jpg";
import featureBG2 from "../assets/featuresBG2.jpg";
import featureBG3 from "../assets/featuresBG3.jpg";

export default function Homepage() {
  const { darkMode, setDarkMode } = useContext(AppContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [current, setCurrent] = useState(0);
  const [scrolledPastHero, setScrolledPastHero] = useState(false);
  const heroRef = useRef(null);
  const [modal, showModal] = useState({ signup: false, login: false });

  const prices = [
    {
      name: "Beginner",
      price: "₱500/mo",
      benefits: [
        "Access to gym equipment",
        "1 group class per week",
        "Free water bottle",
      ],
    },
    {
      name: "Intermediate",
      price: "₱1000/mo",
      benefits: [
        "All Beginner benefits",
        "3 group classes per week",
        "Fitness assessment monthly",
      ],
    },
    {
      name: "Pro",
      price: "₱2000/mo",
      benefits: [
        "All Intermediate benefits",
        "Personal trainer 2x/week",
        "Nutrition consultation",
      ],
    },
  ];

  const featuresData = [
    {
      icon: <CreditCard size={50} />,
      title: "Membership Plans",
      description:
        "Unlock your potential with our flexible membership plans, accessible online anytime, anywhere! Join from any device and enjoy seamless access from the comfort of your home. Choose the plan that fits you best and start your journey today!",
      bg: featureBG1,
    },
    {
      icon: <Smartphone size={50} />,
      title: "Digital Attendance",
      description:
        "Check in easily and keep track of your sessions with your unique QR code. Every member can scan and log attendance quickly from any device at home. Stay consistent and monitor your progress effortlessly. Make every session count and keep moving toward your goals!",
      bg: featureBG2,
    },
    {
      icon: <BarChart size={50} />,
      title: "Fitness Analytics",
      description:
        "Monitor your progress and reach your goals faster with personalized fitness analytics. Track your workouts, attendance, and performance all in one place. Get insights that help you understand your growth and stay motivated. Turn your hard work into measurable results and make every session count!",
      bg: featureBG3,
    },
  ];

  const prevFeature = () => {
    setCurrent(current === 0 ? featuresData.length - 1 : current - 1);
  };

  const nextFeature = () => {
    setCurrent(current === featuresData.length - 1 ? 0 : current + 1);
  };

  // Keyboard navigation for features
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowLeft") prevFeature();
      if (e.key === "ArrowRight") nextFeature();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [current]);

  // Scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const heroHeight = heroRef.current.offsetHeight;
        const scrollY = window.scrollY;
        setScrolledPastHero(scrollY > heroHeight / 2);
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // initialize on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div
        className={
          darkMode ? "bg-softblack text-white" : "bg-white text-softblack"
        }
      >
        {/* Navigation */}
        <header
          className={`fixed top-0 left-0 w-full z-50 transition-colors ${
            scrolledPastHero
              ? darkMode
                ? "bg-softblack/50 shadow-md backdrop-blur-md"
                : "bg-white/50 shadow-md backdrop-blur-md"
              : darkMode
              ? "bg-softblack "
              : "bg-white "
          }`}
        >
          <nav className="w-full flex items-center justify-between px-[3%] h-24 md:h-20 lg:h-24">
            {/* Logo */}
            <div className="flex items-center space-x-2 sm:space-x-3 h-full">
              <img
                className="h-16 sm:h-20 md:h-24 w-auto object-contain"
                src={logo}
                alt="Kudo Fitness Gym Logo"
              />
            </div>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center space-x-3 lg:space-x-6 h-full">
              {["Home", "Features", "About Us", "Pricing"].map((text) => (
                <a
                  key={text}
                  href={`#${text.toLowerCase().replace(" ", "-")}`}
                  className="text-base sm:text-lg lg:text-xl hover:text-yellow-500 flex items-center"
                >
                  {text}
                </a>
              ))}

              {/* Dark Mode Button */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-full transition cursor-pointer flex items-center justify-center"
              >
                {darkMode ? (
                  <Sun size={24} className="text-mustard-light" />
                ) : (
                  <Moon size={24} className="text-softblack" />
                )}
              </button>
            </div>

            {/* Mobile Hamburger */}
            <button
              className="md:hidden p-2 focus:outline-none flex items-center justify-center"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </nav>

          {/* Mobile Menu */}
          {menuOpen && (
            <div
              className={`md:hidden flex flex-col items-center px-[3%] py-6 space-y-6 transition-colors ${
                darkMode
                  ? "bg-softblack text-white border-[1px] border-white"
                  : "bg-white text-softblack border-[1px] border-softblack"
              }`}
            >
              <button
                onClick={() => {
                  setDarkMode(!darkMode);
                  setMenuOpen(false);
                }}
                className="p-3 rounded-full transition cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                {darkMode ? (
                  <Sun size={28} className="text-mustard-light" />
                ) : (
                  <Moon size={28} className="text-softblack" />
                )}
              </button>
              {["Home", "Features", "Pricing", "About Us"].map((text) => (
                <a
                  key={text}
                  href={`#${text.toLowerCase().replace(" ", "-")}`}
                  className="text-lg sm:text-xl font-semibold hover:text-yellow-500 text-center"
                  onClick={() => setMenuOpen(false)}
                >
                  {text}
                </a>
              ))}
            </div>
          )}
        </header>

        {/* Hero Section */}
        <section
          ref={heroRef}
          id="hero"
          className={`flex items-start justify-start min-h-[700px] pt-30 px-6 md:px-12 shadow-bottom-white ${
            darkMode ? "bg-softblack" : "bg-white"
          }`}
        >
          <div className="max-w-2xl">
            {/* Main Logo / Text */}
            <div className="mb-6">
              <h1
                className={`text-[clamp(3rem,6vw,4.5rem)] font-extrabold leading-tight ${
                  darkMode ? "text-white" : "text-black"
                }`}
              >
                <span className="block">KUDO</span>
                <span className="block">FITNESS</span>
                <span className="block">GYM</span>
              </h1>
            </div>

            {/* Inline Statement */}
            <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-bold mb-6 leading-tight">
              <span className="text-yellow-500">Let's Get Fit</span>{" "}
              <span className="text-gray-600 mr-2">Don't</span>{" "}
              <span className="text-red-800">Quit</span>
            </h2>

            {/* Input + Button */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-2">
              <input
                type="email"
                placeholder="Enter your email"
                className={`w-[clamp(14rem,18vw,16rem)] h-[clamp(3rem,4vw,3.25rem)] px-4 py-3 rounded-lg border focus:outline-none font-bold transition
      ${
        darkMode
          ? "bg-yellow-400 text-softblack hover:bg-yellow-300 shadow-blk"
          : "bg-yellow-500 text-white border-yellow-500 placeholder-white focus:ring-yellow-500 shadow-blk"
      }
    `}
              />
              <Link
                to="login"
                className={`  w-[clamp(10rem,20vw,10rem)] 
  h-[clamp(2.5rem,3.5vw,3.25rem)] flex items-center justify-center rounded-lg font-bold transition
      text-[clamp(1rem,2.5vw,1.25rem)]
      ${
        darkMode
          ? "bg-yellow-400 text-softblack hover:bg-yellow-300 shadow-blk"
          : "bg-yellow-500 text-white shadow-blk hover:bg-yellow-400"
      }
    `}
              >
                Get Started
              </Link>
            </div>

            {/* Helper text */}
            <p
              className={`text-sm mt-1 ${
                darkMode ? "text-white" : "text-softblack"
              }`}
            >
              Enter your email to create or register a new membership
            </p>
          </div>
        </section>

        {/* Features Section */}
        <section
          id="features"
          className="relative px-[5%] h-screen sm:h-screen md:min-h-[700px] w-full py-20 overflow-hidden"
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${featuresData[current].bg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Overlay that blurs background */}
            <div className="absolute inset-0 bg-black/70 backdrop-blur-xs"></div>
          </div>

          {/* Modal + Bubbles container */}
          <div className="relative z-10 flex flex-col items-center md:items-end justify-center h-full">
            {/* Modal */}
            <div
              className={`bg-opacity-30 border-white border-2 rounded-2xl shadow-lg flex flex-col md:flex-row items-start 
      w-full max-w-full sm:w-4/5 md:w-[600px] lg:w-[700px]
      h-[80vh] sm:h-[800px] md:h-[500px] p-4 sm:p-6 md:p-8 transition-all mx-2

    `}
            >
              {/* Icon */}
              <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6 flex justify-center md:justify-start w-full md:w-auto text-white">
                {featuresData[current].icon}
              </div>

              {/* Text */}
              <div className="text-center md:text-left w-full flex flex-col justify-center">
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 text-mustard-light">
                  {featuresData[current].title}
                </h3>
                <p
                  className={`text-justify mt-10 sm:text-2xl md:text-xl lg:text-2xl text-white`}
                >
                  {featuresData[current].description}
                </p>
              </div>
            </div>

            {/* Feature Bubbles */}
            <div className="flex justify-center mt-3">
              {featuresData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-colors mx-1 sm:mx-2 ${
                    current === index
                      ? "bg-yellow-500 dark:bg-yellow-400"
                      : "bg-gray-300 dark:bg-gray-600"
                  }`}
                ></button>
              ))}
            </div>

            {/* Arrows */}
            <button
              onClick={prevFeature}
              className="cursor-pointer hidden md:flex absolute left-[-50px] top-1/2 -translate-y-1/2 p-3 rounded-full bg-yellow-400 text-black shadow hover:bg-yellow-500 transition"
            >
              <ArrowLeft size={28} />
            </button>
            <button
              onClick={nextFeature}
              className="cursor-pointer hidden md:flex absolute right-[-50px] top-1/2 -translate-y-1/2 p-3 rounded-full bg-yellow-400 text-black shadow hover:bg-yellow-500 transition"
            >
              <ArrowRight size={28} />
            </button>
          </div>
        </section>

        {/* About Us Section */}
        <section
          id="about-us"
          className="py-20 px-4 flex justify-center align-middle min-h-[700px]"
        >
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div>
              <iframe
                title="Kudo Fitness Gym Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d485.302331426412!2d121.84554311302166!3d13.324213896661647!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33a33b006380ab13%3A0xca01bad005bbdd59!2sKudo%20Fitness%20Gym!5e0!3m2!1sen!2sph!4v1758138283839!5m2!1sen!2sph"
                width="450"
                height="450"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full lg:h-[400px] h-96 sm:h-80 rounded-lg shadow-softblack shadow-2xl"
                allowFullScreen
              ></iframe>
            </div>
            <div>
              <h3 className="text-[clamp(40px,4vw,60px)] font-bold mb-6">
                About <a className="text-mustard-light">Us</a>
              </h3>
              <p className="sm:text-1xl lg:text-2xl ">
                Kudo Fitness Gym has been serving the community with top-notch
                training facilities since 2010. Our mission is to make fitness
                simple, accessible, and effective for everyone.
              </p>
            </div>
          </div>
        </section>
        {/* Pricing Section */}
        <section
          id="pricing"
          className={`py-16 px-4 flex flex-col items-center justify-center ${
            darkMode ? "bg-softblack" : "bg-white"
          }`}
        >
          <h3 className="text-center font-bold mb-12 text-[clamp(2.5rem,5vw,3rem)] lg:text-[clamp(3rem,5vw,5rem)]">
            Pricing <a className="text-mustard-light">Plans</a>
          </h3>

          <div className="flex flex-wrap justify-center items-center gap-8">
            {prices.map((plan) => (
              <div
                key={plan.name}
                className={`relative flex flex-col justify-between items-center p-6 rounded-xl transition-all
          w-[300px] sm:w-[300px] md:w-[400px] 
          h-[500px] sm:h-[400px] md:h-[500px] ml-2
          ${
            darkMode
              ? "bg-[#1C1C1C] text-white shadow-[4px_4px_15px_#111111,-4px_-4px_15px_#2a2a2a]"
              : "bg-yellow-500 text-white shadow-[-10px_7px_#181818] shadow-softblack"
          }`}
              >
                {/* Icon: Absolute Top-Left */}
                <div className="absolute top-4 left-4">
                  {plan.name === "Beginner" && (
                    <User
                      size={36}
                      className={darkMode ? "text-white" : "text-[#804000]"}
                    />
                  )}
                  {plan.name === "Intermediate" && (
                    <Users
                      size={36}
                      className={darkMode ? "text-white" : "text-[#804000]"}
                    />
                  )}
                  {plan.name === "Pro" && (
                    <Award
                      size={36}
                      className={darkMode ? "text-white" : "text-[#804000]"}
                    />
                  )}
                </div>

                <div className="text-center flex flex-col items-center w-full">
                  {/* Plan Title */}
                  <h4
                    className={`font-bold mb-2 my-4 text-[clamp(2rem,4vw,3rem)] ${
                      darkMode
                        ? plan.name === "Beginner"
                          ? "bg-clip-text text-transparent bg-gradient-to-r from-[#cd7f32] via-[#d18b4b] to-[#b87333] drop-shadow-[0_2px_2px_rgba(0,0,0,0.6)]"
                          : plan.name === "Intermediate"
                          ? "bg-clip-text text-transparent bg-gradient-to-r from-gray-300 via-gray-400 to-gray-100 drop-shadow-[0_2px_2px_rgba(0,0,0,0.6)]"
                          : "bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-200 drop-shadow-[0_2px_2px_rgba(0,0,0,0.6)]"
                        : "text-softblack"
                    }`}
                  >
                    {plan.name}
                  </h4>

                  {/* Price */}
                  <p
                    className={`font-bold mb-4 text-[clamp(1.6rem,3vw,2rem)] ${
                      darkMode ? "text-mustard-light" : "text-softblack"
                    }`}
                  >
                    {plan.price}
                  </p>

                  {/* Benefits */}
                  <ul className="mt-6 mb-6 font-semibold list-disc list-inside text-left text-[clamp(1.1rem,2vw,1.25rem)] space-y-1">
                    {plan.benefits.map((benefit, index) => (
                      <li
                        key={index}
                        className={darkMode ? "text-white" : "text-white"}
                      >
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Choose Button */}
                <button
                  className={`mt-auto px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-semibold transition text-[clamp(1rem,2.5vw,1.25rem)]
            ${
              darkMode
                ? "bg-yellow-400 text-softblack hover:bg-yellow-300"
                : "bg-softblack text-yellow-500 hover:bg-gray-800"
            }`}
                >
                  Choose
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action with Echo Effect */}
        <section
          className={`flex flex-col items-center justify-center min-h-[200px] py-24 px-4 ${
            darkMode
              ? "bg-yellow-400 text-softblack"
              : "bg-yellow-500 text-white"
          }`}
        >
          <div className="relative inline-block mb-12">
            {/* Echo layers */}
            <h3 className="absolute top-0 left-0 text-5xl sm:text-6xl md:text-7xl font-extrabold opacity-20 transform translate-x-2 translate-y-2 select-none pointer-events-none text-black">
              Ready to Get Started?
            </h3>
            <h3 className="absolute top-0 left-0 text-5xl sm:text-6xl md:text-7xl font-extrabold opacity-10 transform translate-x-4 translate-y-4 select-none pointer-events-none text-black">
              Ready to Get Started?
            </h3>

            {/* Main text */}
            <h3 className="relative text-5xl sm:text-6xl md:text-7xl font-extrabold">
              Ready to Get Started?
            </h3>
          </div>

          <button
            className={`cursor-pointer hover:opacity-90 px-8 py-5 sm:px-10 sm:py-6 rounded-lg text-xl sm:text-2xl font-extrabold transition
      ${
        darkMode
          ? "bg-softblack text-mustard-light hover:bg-gray-800"
          : "bg-white text-mustard-dark  hover:bg-gray-100"
      }`}
          >
            Join Now
          </button>
        </section>

        {/* Footer */}
        <footer className="bg-softblack text-gray-400 py-8 px-4">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p>© 2025 Kudo Fitness Gym. All rights reserved.</p>
            <div className="flex space-x-4 text-xl">
              <a href="tel:+1234567890" className="hover:text-mustard-light">
                <Phone size={20} />
              </a>
              <a
                href="https://www.facebook.com/Kudofitnessgym"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-mustard-light"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-mustard-light"
              >
                <Music size={20} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-mustard-light"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
