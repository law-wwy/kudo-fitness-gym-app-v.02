import React, { useState, createContext } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Homepage from "./pages/Homepage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import UserDashboard from "./pages/UserDashboard.jsx";

import "./style.css";
import PersonalInfo from "./components/PersonalInfo.jsx";
import HealthInfo from "./components/HealthInfo.jsx";
import GeneralInfo from "./components/GeneralInfo.jsx";
import TermsAndAgreements from "./components/TermsAndAgreements.jsx";

export const AppContext = createContext(); // make sure createContext is imported

// Router setup
const router = createBrowserRouter([
  { path: "/", element: <Homepage /> },
  { path: "/login", element: <Login /> },
  {
    path: "/signup",
    element: <Signup />,
    children: [
      {
        index: true, // 👈 default route = PersonalInfo
        element: <PersonalInfo />,
      },
      {
        path: "healthInfo",
        element: <HealthInfo />,
      },
      {
        path: "generalInfo",
        element: <GeneralInfo />,
      },
      {
        path: "terms",
        element: <TermsAndAgreements />,
      },
    ],
  },

  { path: "/userDashboard", element: <UserDashboard /> },
  { path: "*", element: <NotFoundPage /> },
]);

export default function Main() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <AppContext.Provider value={{ darkMode, setDarkMode, router }}>
      <RouterProvider router={router} />
    </AppContext.Provider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);
