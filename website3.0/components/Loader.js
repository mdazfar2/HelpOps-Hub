"use client";
import React, { useEffect } from "react";
import "@stylesheets/loader.css";

function Loader() {
  useEffect(() => {
    const handleDOMContentLoaded = () => {
      document.querySelector("body").classList.add("loaded");
    };

    if (document.readyState === "complete") {
      handleDOMContentLoaded();
    } else {
      document.addEventListener("DOMContentLoaded", handleDOMContentLoaded);
    }

    const timeoutId = setTimeout(() => {
      document.querySelector("body").classList.add("loaded");
    }, 1500);

    return () => {
      document.removeEventListener("DOMContentLoaded", handleDOMContentLoaded);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div id="loader-wrapper">
      <div className="loaderbox">
        <svg className="loader" width="240" height="240" viewBox="0 0 240 240">
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
      <div className="loader-section section-left"></div>
      <div className="loader-section section-right"></div>
    </div>
  );
}

export default Loader;
