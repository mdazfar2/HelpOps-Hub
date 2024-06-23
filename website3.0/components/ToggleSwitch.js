import { useState, useEffect } from "react";
import "@stylesheets/darkmode.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-regular-svg-icons";
const ToggleSwitch = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const darkMode = localStorage.getItem("dark-mode") === "true";
    setIsDarkMode(darkMode);
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, []);

  const toggleMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("dark-mode", newMode);
  };

  return (
    <div className="toggle-switch">
      {isDarkMode ? (
        <svg
          onClick={toggleMode}
          id="sun"
          className="sun1 size-6"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
          />
        </svg>
      ) : (
        <FontAwesomeIcon
          icon={faMoon}
          onClick={toggleMode}
          width={25}
          className="moon"
        />
      )}
    </div>
  );
};

export default ToggleSwitch;
