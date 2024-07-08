"use client";
import Link from "next/link";
import { useEffect, useState, useContext } from "react";
import "@stylesheets/header.css";

//Importing TogleSwitch Component
import ToggleSwitch from "./ToggleSwitch";

//Importing AuthButton component
import AuthButton from "./AuthButton";

//Importing FontAwesome for Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faUserCircle,
  faUserLarge,
} from "@fortawesome/free-solid-svg-icons";
import { Context } from "@context/store";
const Header = () => {
  let { theme } = useContext(Context);
  // State to manage mobile menu toggle
  const [isActive, setIsActive] = useState(false);
  // to set the status of show navbar or not
  const [show, setShow] = useState(true);
  let lastScrollTop = 0; // to keep the position of lastscroll

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      if (scrollTop > lastScrollTop) {
        setShow(false);
      } else {
        setShow(true);
      }
      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For negative scrolling
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Effect to load VanillaTilt library for logo animation
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/vanilla-tilt/1.7.0/vanilla-tilt.min.js";
    script.onload = () => {
      // Initialize VanillaTilt on .logo elements
      VanillaTilt.init(document.querySelectorAll(".logo"), {
        max: 25,
        speed: 400,
      });
    };
    document.body.appendChild(script);
  }, []);

  // Function to toggle mobile menu visibility
  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  // Effect to close mobile menu on window resize if screen width > 1024px
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setIsActive(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header
      className={`w-screen ${
        theme ? "bg-transparent" : "transition-all bg-transparent"
      } z-50 fixed top-0  transition-all overflow-hidden py-2 ${
        show ? "top-0" : "top-[-550px]"
      }`}
    >
      <nav className="flex justify-between flex-wrap items-center w-[90%] my-5 mx-auto">
        {/* Logo with VanillaTilt animation */}
        <Link href="/">
          <div data-tilt data-tilt-scale="1.1">
            <img
              src="new/HelpOps-H Fevicon.webp"
              alt="Logo"
              className="w-20 h-20 top-2 max-[400px]:relative max-[400px]:left-36"
              draggable="false"
            />
          </div>
        </Link>

        <div className="flex min-w-[70%] gap-[50px] justify-between max-xl:min-w-0 max-xl:justify-center items-center">
          {/* Main navigation links */}
          <ul
            className={`${
              theme
                ? "bg-white shadow-gray-300"
                : "bg-[#393838] shadow-[#000000a6]"
            } list-none flex gap-5 py-2 px-5 nav_links rounded-3xl flex-wrap justify-center shadow-md  justify-self-end max-xl:hidden transition-colors duration-500`}
          >
            <li
              className={`${
                theme ? "text-black" : "text-white"
              } text-xl font-normal px-4 py-2 relative after:content-[''] after:absolute after:w-full after:transform after:scale-x-0 after:h-[3px] after:bottom-1 after:left-0 after:bg-[#6eb6b95f] after:origin-bottom-right after:transition-transform after:duration-200 hover:after:scale-x-100 hover:after:origin-bottom-left transition-colors duration-500`}
            >
              <Link href="/">Home</Link>
            </li>
            <li
              className={`${
                theme ? "text-black" : "text-white"
              } text-xl font-normal px-4 py-2 relative after:content-[''] after:absolute after:w-full after:transform after:scale-x-0 after:h-[3px] after:bottom-1 after:left-0 after:bg-[#6eb6b95f] after:origin-bottom-right after:transition-transform after:duration-200 hover:after:scale-x-100 hover:after:origin-bottom-left transition-colors duration-500`}
            >
              <Link href="/about">About</Link>
            </li>
            <li
              className={`${
                theme ? "text-black" : "text-white"
              } text-xl font-normal px-4 py-2 relative after:content-[''] after:absolute after:w-full after:transform after:scale-x-0 after:h-[3px] after:bottom-1 after:left-0 after:bg-[#6eb6b95f] after:origin-bottom-right after:transition-transform after:duration-200 hover:after:scale-x-100 hover:after:origin-bottom-left transition-colors duration-500`}
            >
              <Link href="/team">Team</Link>
            </li>
            <li
              className={`${
                theme ? "text-black" : "text-white"
              } text-xl font-normal px-4 py-2 relative after:content-[''] after:absolute after:w-full after:transform after:scale-x-0 after:h-[3px] after:bottom-1 after:left-0 after:bg-[#6eb6b95f] after:origin-bottom-right after:transition-transform after:duration-200 hover:after:scale-x-100 hover:after:origin-bottom-left transition-colors duration-500`}
            >
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
          {/* Navigation actions (sponsor button and toggle switch) */}
          <div className="flex items-center gap-2">
            <a href="https://github.com/sponsors/mdazfar2" target="_blank">
              <button
                className={`${
                  theme
                    ? "bg-gray-100/80 text-black hover:border-[1px] hover:border-whitesmoke"
                    : "bg-[#000] text-white hover:bg-transparent hover:border-[1px] hover:border-white"
                } rounded-2xl shadow-md shadow-black/20  text-xl cursor-pointer text-center transition-transform duration-500 ease-in-out w-30 p-2 hover:transform hover:translate-x-2.5 mr-5 max-[400px]:hidden`}
                style={{ fontFamily: "ubuntu" }}
              >
                <FontAwesomeIcon icon={faHeart} id="heart" width={25} />
                Sponsor
              </button>
            </a>
            <div className="block max-xl:hidden">
              <AuthButton />
            </div>

            <div className="relative flex justify-center items-center flex-row w-[70px] h-[35px] m-0 max-[400px]:fixed max-[400px]:top-12 max-[400px]:left-5">
              <ToggleSwitch />
            </div>
          </div>
        </div>
        {/* Hamburger menu icon for mobile */}
        <div
          className={`hamburger ${isActive ? "open" : ""}`}
          id="hamburger"
          onClick={toggleMenu}
        >
          <div
            className={`${
              theme ? "bg-[#333]" : "bg-white"
            } w-[25px] h-[3px] my-[4px] transition duration-400`}
          ></div>
          <div
            className={`${
              theme ? "bg-[#333]" : "bg-white"
            } w-[25px] h-[3px] my-[4px] transition duration-400`}
          ></div>
          <div
            className={`${
              theme ? "bg-[#333]" : "bg-white"
            } w-[25px] h-[3px] my-[4px] transition duration-400`}
          ></div>
        </div>
      </nav>
      {/* Mobile menu links */}
      <ul
        className={`${
          isActive
            ? `nav_links_mobile list-none flex p-10 flex-col items-center gap-5 navAnimate ease-in-out duration-200 justify-center overflow-hidden ${
                theme ? "bg-gray-200" : "bg-[#2b2b2b]"
              }`
            : "hidden"
        }`}
        id="nav-links1"
      >
        <li
          className={`${
            theme
              ? "text-black after:bg-[#6eb6b95f]"
              : "text-white after:bg-[#ffffff5f]"
          } text-xl font-normal px-4 py-2 relative after:content-[''] after:absolute after:w-full after:transform after:scale-x-0 after:h-[3px] after:bottom-1 after:left-0 after:bg-[#6eb6b95f] after:origin-bottom-right after:transition-transform after:duration-200 hover:after:scale-x-100 hover:after:origin-bottom-left`}
        >
          <Link href="/" onClick={() => setIsActive(false)}>
            Home
          </Link>
        </li>
        <li
          className={`${
            theme
              ? "text-black after:bg-[#6eb6b95f]"
              : "text-white after:bg-[#ffffff5f]"
          } text-xl font-normal px-4 py-2 relative after:content-[''] after:absolute after:w-full after:transform after:scale-x-0 after:h-[3px] after:bottom-1 after:left-0 after:bg-[#6eb6b95f] after:origin-bottom-right after:transition-transform after:duration-200 hover:after:scale-x-100 hover:after:origin-bottom-left`}
        >
          <Link href="/about" onClick={() => setIsActive(false)}>
            About
          </Link>
        </li>
        <li
          className={`${
            theme
              ? "text-black after:bg-[#6eb6b95f]"
              : "text-white after:bg-[#ffffff5f]"
          } text-xl font-normal px-4 py-2 relative after:content-[''] after:absolute after:w-full after:transform after:scale-x-0 after:h-[3px] after:bottom-1 after:left-0 after:bg-[#6eb6b95f] after:origin-bottom-right after:transition-transform after:duration-200 hover:after:scale-x-100 hover:after:origin-bottom-left`}
        >
          <Link href="/team" onClick={() => setIsActive(false)}>
            Team
          </Link>
        </li>
        <li
          className={`${
            theme
              ? "text-black after:bg-[#6eb6b95f]"
              : "text-white after:bg-[#ffffff5f]"
          } text-xl font-normal px-4 py-2 relative after:content-[''] after:absolute after:w-full after:transform after:scale-x-0 after:h-[3px] after:bottom-1 after:left-0 after:bg-[#6eb6b95f] after:origin-bottom-right after:transition-transform after:duration-200 hover:after:scale-x-100 hover:after:origin-bottom-left`}
        >
          <Link href="/contact" onClick={() => setIsActive(false)}>
            Contact
          </Link>
        </li>
        <li>
          <div className="auth-mobile flex gap-1">
            <a href="https://github.com/sponsors/mdazfar2" target="_blank">
              <button
                className={`${
                  theme
                    ? "bg-gray-100/80 text-black hover:border-[1px] hover:border-whitesmoke"
                    : "bg-[#000] text-white hover:bg-transparent hover:border-[1px] hover:border-white"
                } rounded-2xl shadow-md shadow-black/20  text-xl cursor-pointer text-center transition-transform duration-500 ease-in-out w-30 p-2 hover:transform hover:translate-x-2.5 mr-5 min-[400px]:hidden`}
                style={{ fontFamily: "ubuntu" }}
              >
                <FontAwesomeIcon icon={faHeart} id="heart" width={25} />
                Sponsor
              </button>
            </a>
            <AuthButton />
          </div>
        </li>
      </ul>
    </header>
  );
};

export default Header;
