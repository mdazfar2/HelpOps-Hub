"use client";
import React, { useEffect } from "react";
import "@stylesheets/loader.css";

function Loader() {
  useEffect(() => {
    // Function to add 'loaded' class to body when DOM content is loaded
    const handleDOMContentLoaded = () => {
      document.querySelector("body").classList.add("loaded");
    };

    // Check if DOMContentLoaded event has already occurred
    if (document.readyState === "complete") {
      handleDOMContentLoaded();
    } else {
      // Add event listener for DOMContentLoaded
      document.addEventListener("DOMContentLoaded", handleDOMContentLoaded);
    }

    // Set a timeout to add 'loaded' class after 1500ms as a fallback
    const timeoutId = setTimeout(() => {
      document.querySelector("body").classList.add("loaded");
    }, 1500);

    // Clean up: remove event listener and clear timeout
    return () => {
      document.removeEventListener("DOMContentLoaded", handleDOMContentLoaded);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div id="loader-wrapper">
      {/* SVG loader animation */}
      <div className="loaderbox">
        <svg className="loader" width="240" height="240" viewBox="0 0 240 240">
          {/* Large outer circle */}
          <circle
            className="loader-ring loader-ring-a"
            cx="120"
            cy="120"
            r="105"
            fill="none"
            stroke="#000"
            strokeWidth="20"
            strokeDasharray="0 660"
            strokeDashoffset="-330"
            strokeLinecap="round"
          ></circle>
          {/* Middle circle */}
          <circle
            className="loader-ring loader-ring-b"
            cx="120"
            cy="120"
            r="35"
            fill="none"
            stroke="#000"
            strokeWidth="20"
            strokeDasharray="0 220"
            strokeDashoffset="-110"
            strokeLinecap="round"
          ></circle>
          {/* Left circle */}
          <circle
            className="loader-ring loader-ring-c"
            cx="85"
            cy="120"
            r="70"
            fill="none"
            stroke="#000"
            strokeWidth="20"
            strokeDasharray="0 440"
            strokeLinecap="round"
          ></circle>
          {/* Right circle */}
          <circle
            className="loader-ring loader-ring-d"
            cx="155"
            cy="120"
            r="70"
            fill="none"
            stroke="#000"
            strokeWidth="20"
            strokeDasharray="0 440"
            strokeLinecap="round"
          ></circle>
        </svg>
      </div>
      {/* Overlay sections for transition effect */}
      <div className="loader-section section-left"></div>
      <div className="loader-section section-right"></div>
    </div>
  );
}

export default Loader;
