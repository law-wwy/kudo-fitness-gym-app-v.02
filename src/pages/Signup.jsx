import { useState, useContext, useRef, useEffect } from "react";
import { AppContext } from "../main.jsx";
import { Sun, Moon } from "lucide-react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({
    personalInfo: {
      username: "",
      email: "",
      password: "",
      retypePassword: "",
      phone: "",
      gender: "",
      nationality: "",
      birthdate: "",
      fitnessType: "",
      fitnessGoal: "",
    },
    healthInfo: {
      weight: "",
      height: "",
      bmi: "",
      hasConditions: "",
      medicalConditions: [],
    },
    generalInfo: {
      contacts: [],
    },
    termsAccepted: false,
  });

  const { darkMode, setDarkMode } = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();
  const healthInfoRef = useRef(null);

  const path = location.pathname.split("/").pop();
  const stepMap = { personalInfo: 1, healthInfo: 2, generalInfo: 3, terms: 4 };
  const step = stepMap[path] || 1;

  const handleChange = (section) => (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => {
      const updatedForm = {
        ...prev,
        [section]: {
          ...prev[section],
          [name]: type === "checkbox" ? checked : value,
        },
      };
      console.log("Updated form:", updatedForm); // safe logging
      return updatedForm;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/api/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form), // send full form
      });
      const data = await res.json();
      if (res.ok) alert(`User ${data.username} registered successfully!`);
      else alert(data.error || "Error registering user");
    } catch (err) {
      alert("Network error");
    }
  };

  const goNext = () => {
    if (step === 2 && healthInfoRef.current) {
      const error = healthInfoRef.current.validateStep();
      if (error) {
        alert(error);
        return;
      }
    }

    if (step === 1) navigate("healthInfo");
    if (step === 2) navigate("generalInfo");
    if (step === 3) navigate("terms");
  };

  const goPrev = () => {
    if (step === 2) navigate("/signup");
    if (step === 3) navigate("healthInfo");
    if (step === 4) navigate("generalInfo");
  };

  const stepLabels = [
    "Personal Information",
    "Health Information",
    "General Information",
    "Terms & Agreements",
  ];

  return (
    <div
      className={`w-full min-h-[625px] max-h-[1200px] ${
        darkMode ? "bg-softblack" : "bg-white"
      } z-50 overflow-auto relative flex justify-center items-center`}
    >
      {/* Dark/light toggle */}
      <div className="absolute right-[1%] top-[1%] flex gap-4 z-20">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="cursor-pointer rounded-full transition transform hover:scale-110"
        >
          {darkMode ? (
            <Sun className="w-[24px] h-[24px] text-mustard-light" />
          ) : (
            <Moon className="w-[24px] h-[24px] text-mustard-dark" />
          )}
        </button>
      </div>

      {/* Modal */}
      <div
        className={`signup-upper-text flex flex-col relative z-10 p-2 rounded-2xl w-[clamp(320px,60vw,600px)] mt-[16px] justify-center items-center transition-colors ${
          darkMode
            ? "bg-softblack text-mustard-light"
            : "bg-white text-softblack"
        }`}
      >
        {/* Header */}
        <section className="w-[clamp(300px,90%,500px)] flex flex-row justify-between mb-4">
          <h1
            className={`${
              darkMode ? "text-white" : "text-softblack"
            } steps font-medium`}
          >
            Step {step}/
            <span className="text-mustard-dark">{stepLabels.length}</span>
          </h1>
          <h2 className="signup-modal-title font-semibold">
            {stepLabels[step - 1]}
          </h2>
        </section>

        {/* Body */}
        <div className="signup-child-modals w-full flex items-center justify-center">
          <Outlet context={{ form, setForm, handleChange, healthInfoRef }} />
        </div>

        {/* Bottom navigation */}
        <section className="w-[clamp(300px,90%,500px)] flex flex-row justify-between mt-6 px-[clamp(8px,2vw,20px)] py-[clamp(8px,1.5vh,16px)]">
          {step > 1 && (
            <button
              onClick={goPrev}
              className={`cursor-pointer px-[clamp(12px,2vw,20px)] py-[clamp(8px,1.5vh,12px)] rounded-lg transition-colors ${
                darkMode
                  ? "bg-mustard-light text-softblack hover:bg-yellow-300"
                  : "bg-softblack text-white hover:bg-gray-800"
              }`}
            >
              Previous
            </button>
          )}

          {step < 4 ? (
            <button
              onClick={goNext}
              className={`cursor-pointer ml-auto px-[clamp(20px,4vw,32px)] py-[clamp(10px,2vh,16px)] rounded-lg transition-colors ${
                darkMode
                  ? "bg-mustard-light text-softblack hover:bg-yellow-300"
                  : "bg-mustard-dark text-white hover:bg-yellow-600"
              }`}
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!form.termsAccepted}
              className={`cursor-pointer ml-auto px-[clamp(20px,4vw,32px)] py-[clamp(10px,2vh,16px)] rounded-lg transition-colors ${
                form.termsAccepted
                  ? darkMode
                    ? "bg-mustard-light text-softblack hover:bg-yellow-300"
                    : "bg-mustard-dark text-white hover:bg-yellow-600"
                  : "opacity-50 cursor-not-allowed bg-gray-400"
              }`}
            >
              Submit
            </button>
          )}
        </section>
      </div>
    </div>
  );
}
