"use client";
import Link from "next/link";
import { useState, useContext, useEffect } from "react";
import "@stylesheets/header.css";

//Importing TogleSwitch Component
import ToggleSwitch from "./ToggleSwitch";

//Importing AuthButton component
import AuthButton from "./AuthButton";
import { usePathname } from "next/navigation";
import { Context } from "@context/store";

const Header = () => {
  const pathname = usePathname(); // Get current path
  const isAdmin = pathname && pathname.startsWith("/admin"); // Check if path starts with '/admin'
  const { theme } = useContext(Context);

  // State to manage mobile menu toggle
  const [isActive, setIsActive] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Function to toggle mobile menu visibility
  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  const textColorClass = isScrolled
    ? theme
      ? "text-[#1f1f1f]"
      : "text-slate-100"
    : theme
      ? "text-black"
      : "text-white";

  const hamburgerBarClass = isScrolled
    ? theme
      ? "bg-[#222]"
      : "bg-white"
    : theme
      ? "bg-[#333]"
      : "bg-white";

  const navScrolledClass = theme
    ? "w-[84%] max-w-[1180px] mt-4 px-6 py-3 rounded-2xl bg-gradient-to-r from-orange-100/70 via-sky-100/65 to-cyan-100/70 border border-white/50 shadow-[0_14px_34px_rgba(82,109,129,0.22)] backdrop-blur-md"
    : "w-[84%] max-w-[1180px] mt-4 px-6 py-3 rounded-2xl bg-gradient-to-r from-[#111a27]/85 via-[#183044]/80 to-[#142636]/85 border border-white/10 shadow-[0_14px_34px_rgba(2,8,23,0.56)] backdrop-blur-md";

  const mobileMenuScrolledClass = theme
    ? "bg-gradient-to-r from-orange-100/70 via-sky-100/65 to-cyan-100/70 border border-white/50 backdrop-blur-md rounded-2xl w-[84%] max-w-[1180px] mx-auto mt-2"
    : "bg-gradient-to-r from-[#111a27]/85 via-[#183044]/80 to-[#142636]/85 border border-white/10 backdrop-blur-md rounded-2xl w-[84%] max-w-[1180px] mx-auto mt-2";

  return (
    <div>
      <header
        className={`w-screen bg-transparent z-50 fixed top-0 ${isAdmin ? "hidden" : "block"}`}
      >
        <nav
          className={`flex justify-between items-center mx-auto transition-all duration-500 ease-out ${
            isScrolled ? navScrolledClass : "w-[92%] py-3"
          }`}
        >
          <Link href="/" className="flex items-center gap-2" onClick={() => setIsActive(false)}>
            <img
              src="/HelpOps-H Fevicon.webp"
              alt="Logo"
              className="w-10 h-10"
              draggable="false"
            />
            <span
              className={`${textColorClass} text-lg font-semibold`}
            >
              HelpOps Hub
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <ul
              className={`${textColorClass} list-none hidden lg:flex items-center gap-6`}
            >
              <li className="text-base font-medium hover:text-[#63b5c3] transition-colors duration-200">
                <Link href="/">Home</Link>
              </li>
              <li className="text-base font-medium hover:text-[#63b5c3] transition-colors duration-200">
                <Link href="/#features">Features</Link>
              </li>
              <li className="text-base font-medium hover:text-[#63b5c3] transition-colors duration-200">
                <Link href="/#how-it-works">How It Works</Link>
              </li>
              <li className="text-base font-medium hover:text-[#63b5c3] transition-colors duration-200">
                <Link href="/about">About</Link>
              </li>
              <li className="text-base font-medium hover:text-[#63b5c3] transition-colors duration-200">
                <Link href="/blogs">Blogs</Link>
              </li>
              <li className="text-base font-medium hover:text-[#63b5c3] transition-colors duration-200">
                <Link href="/devopsforum">Forums</Link>
              </li>
            </ul>

            <div className="hidden lg:block">
                <AuthButton />
            </div>

            <div className="relative flex justify-center items-center flex-row w-[70px] h-[35px] m-0">
              <ToggleSwitch />
            </div>
          </div>

          {/* Hamburger menu icon for mobile */}
          <div
            className={`hamburger ${isActive ? "open" : ""} lg:hidden`}
            id="hamburger"
            onClick={toggleMenu}
          >
            <div
              className={`${hamburgerBarClass} w-[25px] h-[3px] my-[4px] transition duration-400`}
            ></div>
            <div
              className={`${hamburgerBarClass} w-[25px] h-[3px] my-[4px] transition duration-400`}
            ></div>
            <div
              className={`${hamburgerBarClass} w-[25px] h-[3px] my-[4px] transition duration-400`}
            ></div>
          </div>
        </nav>
        {/* Mobile menu */}
        <ul
          className={`${
            isActive
              ? `list-none flex p-6 flex-col items-center gap-5 ease-in-out duration-200 justify-center overflow-hidden ${
                  isScrolled ? mobileMenuScrolledClass : "bg-transparent"
                }`
              : "hidden"
          }`}
          id="nav-links1"
        >
          <li
            className={`${textColorClass} text-lg font-medium`}
          >
            <Link href="/" onClick={() => setIsActive(false)}>
              Home
            </Link>
          </li>
          <li
            className={`${textColorClass} text-lg font-medium`}
          >
            <Link href="/#features" onClick={() => setIsActive(false)}>
              Features
            </Link>
          </li>
          <li
            className={`${textColorClass} text-lg font-medium`}
          >
            <Link href="/#how-it-works" onClick={() => setIsActive(false)}>
              How It Works
            </Link>
          </li>
          <li
            className={`${textColorClass} text-lg font-medium`}
          >
            <Link href="/about" onClick={() => setIsActive(false)}>
              About
            </Link>
          </li>
          <li
            className={`${textColorClass} text-lg font-medium`}
          >
            <Link href="/blogs" onClick={() => setIsActive(false)}>
              Blogs
            </Link>
          </li>
          <li
            className={`${textColorClass} text-lg font-medium`}
          >
            <Link href="/devopsforum" onClick={() => setIsActive(false)}>
              Forums
            </Link>
          </li>
          <li className="pt-2">
            <AuthButton />
          </li>
        </ul>
      </header>
    </div>
  );
};

export default Header;
