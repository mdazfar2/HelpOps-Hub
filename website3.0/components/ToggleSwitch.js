import { useState, useEffect, useContext } from "react";
import "@stylesheets/darkmode.css";
import "@stylesheets/toggleswitch.css";
import { Context } from "@context/store";

const ToggleSwitch = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  let {theme,setTheme}=useContext(Context)
  useEffect(() => {
    // Check stored preference
    const darkMode = localStorage.getItem("dark-mode") === "true";
    // Set initial state based on stored preference
    setIsDarkMode(darkMode);
    if (darkMode) {
     setTheme(false)
    } else {
      setTheme(true)
    }
  }, []);

  // Function to toggle dark mode
  const toggleMode = () => {
    const newMode = !isDarkMode;
    // Update state with new mode
    setIsDarkMode(newMode);
    // Toggle dark mode class on body
    if (newMode) {
      setTheme(false)
    } else {
setTheme(true)    }
    // Store new mode preference in local storage
    localStorage.setItem("dark-mode", newMode.toString());
  };

  return (
    <div className="switches" onClick={toggleMode}>
      <input type="checkbox" name="toggle" checked={isDarkMode} onChange={toggleMode} />
      <label htmlFor="toggle">
        <i className="bulb">
          <span className="bulb-center"></span>
          <span className="filament-1"></span>
          <span className="filament-2"></span>
          <span className="reflections">
            <span></span>
          </span>
          <span className="sparks">
            <i className="spark1"></i>
            <i className="spark2"></i>
            <i className="spark3"></i>
            <i className="spark4"></i>
          </span>
        </i>
      </label>
    </div>
  );
};

export default ToggleSwitch;