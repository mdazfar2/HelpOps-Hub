"use client";
import { Context } from "@context/store";
import React, { useContext, useCallback, useEffect, useState } from "react";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ScrollToTop() {
  let { theme } = useContext(Context);
  const [isVisible, setIsVisible] = useState(false);

  // Memoize the visibility toggle logic
  const toggleVisibility = useCallback(() => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, [toggleVisibility]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <button
      className={`${
        theme ? "bg-[#63B5C3] text-white" : "bg-gray-100 text-black"
      } fixed right-8 bottom-12 z-10 rounded-full max-sm:w-32 max-sm:px-3 max-sm:py-2 px-5 py-3  transition duration-500 transform hover:scale-105`}
      onClick={scrollToTop}
    >
      <FontAwesomeIcon icon={faArrowUp} bounce />
    </button>
  );
}

export default ScrollToTop;
